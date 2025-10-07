import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Letter = ({ letter, onCollect, onRemove }) => {
  const [isFalling, setIsFalling] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMovingToScrapbook, setIsMovingToScrapbook] = useState(false);
  const [showAnimatedLetter, setShowAnimatedLetter] = useState(false);
  const [currentY, setCurrentY] = useState(letter.y);
  const [isPageVisible, setIsPageVisible] = useState(true);

  // CRITICAL FIX: Track page visibility to pause falling when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Make the letter fall - FIXED to respect page visibility
  useEffect(() => {
    if (!isFalling || !isPageVisible) return;

    const fallInterval = setInterval(() => {
      setCurrentY(prevY => {
        const newY = prevY + 2;
        if (newY > window.innerHeight + 100) {
          onRemove(letter.id);
          return prevY;
        }
        return newY;
      });
    }, 50);

    return () => clearInterval(fallInterval);
  }, [isFalling, isPageVisible, letter.id, onRemove]);

  // Auto-fall after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFalling(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (isFalling) {
      setIsFalling(false);
      // CRITICAL FIX: Hide the "Click me" letter immediately
      setShowContent(true);
    }
  };

  const handleCollect = () => {
    setShowContent(false); // Close the modal first
    setShowAnimatedLetter(true); // Show the animated letter from center
    
    // Wait for animation to complete before actually collecting
    setTimeout(() => {
      setShowAnimatedLetter(false);
      onCollect(letter.id, letter.content);
    }, 2500); // 2.5 second animation
  };

  return (
    <>
      {/* Falling Letter - CRITICAL FIX: Hide immediately when clicked */}
      {!showContent && (
        <motion.div
          initial={{ 
            x: letter.x, 
            y: letter.y,
            scale: 0,
            rotate: -180
          }}
          animate={{ 
            x: isMovingToScrapbook ? window.innerWidth - 150 : letter.x,
            y: isMovingToScrapbook ? 50 : currentY,
            scale: isMovingToScrapbook ? 0.3 : 1,
            rotate: isMovingToScrapbook ? 360 : (isFalling ? [0, -5, 5, 0] : 0),
          }}
          transition={{
            scale: { duration: 0.5, type: "spring" },
            rotate: { duration: 2, repeat: isFalling ? Infinity : 0 },
            x: { duration: 2.5, ease: "easeInOut" },
            y: { duration: 0, ease: "linear" }
          }}
          data-letter-id={letter.id}
          whileHover={{ scale: isMovingToScrapbook ? 0.5 : 1.1 }}
          whileTap={{ scale: isMovingToScrapbook ? 0.5 : 0.9 }}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`fixed z-50 cursor-pointer ${isFalling ? 'animate-bounce-gentle' : ''}`}
          style={{ left: letter.x, top: currentY }}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, -10, 10, 0] : 0
            }}
            transition={{ duration: 0.3 }}
            className="letter-envelope p-4 text-center"
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
              border: '2px solid #FFB6C1',
              minWidth: '80px',
              minHeight: '80px'
            }}
          >
            <div className="text-4xl mb-2">💌</div>
            <div className="text-sm font-bold text-pet-purple">
              {isFalling ? 'Click me!' : 'Open me!'}
            </div>
          </motion.div>
          
          {/* Sparkle effect */}
          {isHovered && (
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-2 right-2 text-yellow-400">✨</div>
              <div className="absolute bottom-2 left-2 text-pink-400">💕</div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Letter Content Modal */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowContent(false);
            }
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-4 text-center"
          >
            {/* Letter Header */}
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              💌
            </motion.div>
            
            <h2 className="text-2xl font-bold text-pet-purple mb-4">
              A Love Letter
            </h2>
            
            {/* Letter Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-pink-50 rounded-2xl p-6 mb-6 text-left"
            >
              <p className="text-gray-700 text-lg leading-relaxed">
                {letter.content}
              </p>
            </motion.div>
            
            {/* Heart decoration */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-4xl mb-4"
            >
              ❤️
            </motion.div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCollect}
                className="pet-button"
              >
                💖 Add to Scrapbook
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowContent(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-full transition-all duration-200"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Animated Letter from Center */}
      {showAnimatedLetter && (
        <motion.div
          initial={{ 
            x: window.innerWidth / 2 - 20,
            y: window.innerHeight / 2 - 20,
            scale: 1,
            rotate: 0
          }}
          animate={{ 
            x: window.innerWidth - 150,
            y: 50,
            scale: 0.5,
            rotate: 360
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut"
          }}
          className="fixed z-50 pointer-events-none"
        >
          <div className="text-6xl">💌</div>
        </motion.div>
      )}
    </>
  );
};

export default Letter;
