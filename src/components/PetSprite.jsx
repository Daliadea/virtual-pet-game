import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PetSprite = ({ pet, onPetClick }) => {
  const [petName, setPetName] = useState('My Love');
  const [isJiggling, setIsJiggling] = useState(false);
  const [petPosition, setPetPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const petContainerRef = useRef(null);
  const getChiikawaColor = () => {
    // Chiikawa is always white, but we can add a subtle tint based on mood
    switch (pet.mood) {
      case 'happy': return '#FFFFFF';
      case 'content': return '#FFF8F0';
      case 'sad': return '#F5F5F5';
      case 'critical': return '#F0F0F0';
      default: return '#FFFFFF';
    }
  };

  const getEyeExpression = () => {
    if (pet.isSleeping) return 'closed';
    switch (pet.mood) {
      case 'happy': return 'happy';
      case 'content': return 'normal';
      case 'sad': return 'sad';
      case 'critical': return 'worried';
      default: return 'normal';
    }
  };

  const eyeExpression = getEyeExpression();

  const handleNameClick = () => {
    const newName = prompt('Enter a new name for your pet:', petName);
    if (newName && newName.trim()) {
      setPetName(newName.trim());
    }
  };

  const handlePetClick = (e) => {
    if (!isDragging) {
      setIsJiggling(true);
      setTimeout(() => setIsJiggling(false), 600);
      if (onPetClick) onPetClick();
    }
  };

  // Drag and drop functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - petPosition.x,
      y: e.clientY - petPosition.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Keep pet within screen bounds (avoiding UI elements)
    const maxX = window.innerWidth - 200; // Leave space for UI
    const maxY = window.innerHeight - 200; // Leave space for UI
    const minX = 100; // Leave space for UI
    const minY = 100; // Leave space for UI
    
    const constrainedX = Math.max(minX, Math.min(maxX, newX));
    const constrainedY = Math.max(minY, Math.min(maxY, newY));
    
    setPetPosition({ x: constrainedX, y: constrainedY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Position is already set in handleMouseMove, so it will stick
    }
  };

  // Add event listeners for drag and drop
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, petPosition]);

  return (
    <div 
      ref={petContainerRef}
      className="absolute cursor-move"
      style={{
        left: petPosition.x,
        top: petPosition.y,
        transform: 'translate(-50%, -50%)'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Pet Shadow */}
      <motion.div
        animate={{
          scale: pet.isSleeping ? 0.8 : 1,
          opacity: pet.isSleeping ? 0.6 : 0.3
        }}
        transition={{ duration: 0.5 }}
        className="absolute top-20 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-black rounded-full blur-sm"
      />
      
      {/* Chiikawa Body */}
      <motion.div
        animate={{
          rotate: pet.isSleeping ? 0 : [0, -1, 1, 0],
          scale: isJiggling ? [1, 1.2, 1] : 1,
        }}
        transition={{
          rotate: { duration: 2, repeat: pet.isSleeping ? 0 : Infinity, ease: "easeInOut" },
          scale: { duration: 0.6, ease: "easeOut" }
        }}
        className="relative cursor-pointer"
        style={{
          width: '140px',
          height: '140px',
          backgroundColor: getChiikawaColor(),
          borderRadius: '50%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          border: '2px solid #E5E5E5',
          position: 'relative'
        }}
        onClick={handlePetClick}
      >
        {/* Chiikawa Ears */}
        <div className="absolute -top-4 left-6 w-8 h-8 bg-white rounded-full border-2 border-gray-200 transform rotate-12"></div>
        <div className="absolute -top-4 right-6 w-8 h-8 bg-white rounded-full border-2 border-gray-200 transform -rotate-12"></div>
        
        {/* Inner ear details */}
        <div className="absolute -top-2 left-7 w-4 h-4 bg-pink-100 rounded-full"></div>
        <div className="absolute -top-2 right-7 w-4 h-4 bg-pink-100 rounded-full"></div>
        {/* Chiikawa Eyes */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex space-x-6">
          {eyeExpression === 'closed' ? (
            // Sleeping eyes
            <>
              <div className="w-4 h-2 bg-black rounded-full"></div>
              <div className="w-4 h-2 bg-black rounded-full"></div>
            </>
          ) : eyeExpression === 'happy' ? (
            // Happy eyes (big and sparkly like Chiikawa)
            <>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </>
          ) : eyeExpression === 'sad' ? (
            // Sad eyes (droopy)
            <>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </>
          ) : (
            // Normal eyes (Chiikawa's big round eyes)
            <>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </>
          )}
        </div>

        {/* Chiikawa Blushing Cheeks */}
        {pet.mood === 'happy' && !pet.isSleeping && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-16 left-4 w-5 h-5 bg-pink-200 rounded-full opacity-80"
          />
        )}
        {pet.mood === 'happy' && !pet.isSleeping && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute top-16 right-4 w-5 h-5 bg-pink-200 rounded-full opacity-80"
          />
        )}


        {/* Chiikawa Mouth */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          {eyeExpression === 'closed' ? (
            // Sleeping mouth (small line)
            <div className="w-4 h-1 bg-black rounded-full"></div>
          ) : eyeExpression === 'happy' ? (
            // Happy mouth (small smile like Chiikawa)
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-3 border-2 border-black rounded-full border-t-0"
            />
          ) : eyeExpression === 'sad' ? (
            // Sad mouth (small frown)
            <div className="w-4 h-2 border-2 border-black rounded-full border-b-0"></div>
          ) : (
            // Normal mouth (small neutral)
            <div className="w-4 h-1 bg-black rounded-full"></div>
          )}
        </div>

        {/* Sleep Z's */}
        {pet.isSleeping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-4 right-2 text-2xl"
          >
            💤
          </motion.div>
        )}
        
        {/* Heart Sparkles when happy */}
        {pet.mood === 'happy' && !pet.isSleeping && (
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl"
          >
            💕
          </motion.div>
        )}
      </motion.div>
      
        {/* Pet Name Tag */}
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleNameClick}
          title="Click to change name"
        >
          <span className="text-sm font-bold text-pet-purple">{petName}</span>
        </motion.div>
    </div>
  );
};

export default PetSprite;
