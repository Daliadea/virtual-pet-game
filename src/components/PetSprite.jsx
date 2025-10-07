import React from 'react';
import { motion } from 'framer-motion';

const PetSprite = ({ pet }) => {
  const getPetColor = () => {
    switch (pet.mood) {
      case 'happy': return '#98FB98';
      case 'content': return '#FFE4B5';
      case 'sad': return '#FFB6C1';
      case 'critical': return '#FF6B6B';
      default: return '#98FB98';
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

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {/* Pet Shadow */}
      <motion.div
        animate={{
          scale: pet.isSleeping ? 0.8 : 1,
          opacity: pet.isSleeping ? 0.6 : 0.3
        }}
        transition={{ duration: 0.5 }}
        className="absolute top-20 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-black rounded-full blur-sm"
      />
      
      {/* Pet Body */}
      <motion.div
        animate={{
          y: pet.isSleeping ? 0 : [0, -8, 0],
          rotate: pet.isSleeping ? 0 : [0, -1, 1, 0],
        }}
        transition={{
          duration: pet.isSleeping ? 0 : 2,
          repeat: pet.isSleeping ? 0 : Infinity,
          ease: "easeInOut"
        }}
        className="relative"
        style={{
          width: '120px',
          height: '120px',
          backgroundColor: getPetColor(),
          borderRadius: '50%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          border: '3px solid white'
        }}
      >
        {/* Eyes */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {eyeExpression === 'closed' ? (
            // Sleeping eyes
            <>
              <div className="w-3 h-1 bg-black rounded-full"></div>
              <div className="w-3 h-1 bg-black rounded-full"></div>
            </>
          ) : eyeExpression === 'happy' ? (
            // Happy eyes
            <>
              <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </>
          ) : eyeExpression === 'sad' ? (
            // Sad eyes
            <>
              <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </>
          ) : (
            // Normal eyes
            <>
              <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </>
          )}
        </div>

        {/* Blushing Cheeks */}
        {pet.mood === 'happy' && !pet.isSleeping && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-12 left-2 w-4 h-4 bg-pink-300 rounded-full opacity-70"
          />
        )}
        {pet.mood === 'happy' && !pet.isSleeping && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute top-12 right-2 w-4 h-4 bg-pink-300 rounded-full opacity-70"
          />
        )}

        {/* Mouth */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          {eyeExpression === 'closed' ? (
            // Sleeping mouth
            <div className="w-6 h-1 bg-black rounded-full"></div>
          ) : eyeExpression === 'happy' ? (
            // Happy mouth
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-4 border-2 border-black rounded-full border-t-0"
            />
          ) : eyeExpression === 'sad' ? (
            // Sad mouth
            <div className="w-6 h-3 border-2 border-black rounded-full border-b-0"></div>
          ) : (
            // Normal mouth
            <div className="w-6 h-1 bg-black rounded-full"></div>
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
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg"
      >
        <span className="text-sm font-bold text-pet-purple">My Love</span>
      </motion.div>
    </div>
  );
};

export default PetSprite;
