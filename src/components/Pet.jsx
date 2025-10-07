import React from 'react';
import { motion } from 'framer-motion';

const Pet = ({ pet }) => {
  const getPetEmoji = () => {
    if (pet.isSleeping) return '😴';
    
    switch (pet.mood) {
      case 'happy': return '😊';
      case 'content': return '😌';
      case 'sad': return '😢';
      case 'critical': return '😵';
      default: return '😊';
    }
  };

  const getPetColor = () => {
    switch (pet.mood) {
      case 'happy': return 'from-pet-green to-pet-blue';
      case 'content': return 'from-pet-yellow to-pet-green';
      case 'sad': return 'from-pet-pink to-pet-purple';
      case 'critical': return 'from-red-400 to-red-600';
      default: return 'from-pet-green to-pet-blue';
    }
  };

  const getPetSize = () => {
    const avgNeeds = (pet.hunger + pet.happiness + pet.energy) / 3;
    if (avgNeeds >= 80) return 'text-8xl';
    if (avgNeeds >= 50) return 'text-7xl';
    if (avgNeeds >= 25) return 'text-6xl';
    return 'text-5xl';
  };

  return (
    <div className="flex flex-col items-center justify-center" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '2rem'
    }}>
      {/* Pet Shadow */}
      <motion.div
        animate={{
          scale: pet.isSleeping ? 0.8 : 1,
          opacity: pet.isSleeping ? 0.6 : 0.3
        }}
        transition={{ duration: 0.5 }}
        className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-black rounded-full blur-sm"
      />
      
      {/* Pet Body */}
      <motion.div
        animate={{
          y: pet.isSleeping ? 0 : [0, -10, 0],
          rotate: pet.isSleeping ? 0 : [0, -2, 2, 0],
        }}
        transition={{
          duration: pet.isSleeping ? 0 : 2,
          repeat: pet.isSleeping ? 0 : Infinity,
          ease: "easeInOut"
        }}
        className={`relative bg-gradient-to-br ${getPetColor()} rounded-full p-6 shadow-xl`}
        style={{
          position: 'relative',
          borderRadius: '50%',
          padding: '1.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          background: `linear-gradient(135deg, ${getPetColor().includes('pet-green') ? '#98FB98, #87CEEB' : 
                      getPetColor().includes('pet-yellow') ? '#FFE4B5, #98FB98' : 
                      getPetColor().includes('pet-pink') ? '#FFB6C1, #DDA0DD' : '#FFB6C1, #87CEEB'})`
        }}
      >
        {/* Pet Face */}
        <div className="text-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={getPetSize()}
          >
            {getPetEmoji()}
          </motion.div>
          
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
        </div>
        
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
      </motion.div>
      
      {/* Needs Indicators */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 space-y-2">
        {/* Hunger */}
        <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-md">
          <span className="text-sm">🍎</span>
          <div className="progress-bar w-16">
            <motion.div
              animate={{ width: `${pet.hunger}%` }}
              transition={{ duration: 0.5 }}
              className={`progress-fill ${pet.hunger > 60 ? 'bg-green-400' : pet.hunger > 30 ? 'bg-yellow-400' : 'bg-red-400'}`}
            />
          </div>
        </div>
        
        {/* Happiness */}
        <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-md">
          <span className="text-sm">😊</span>
          <div className="progress-bar w-16">
            <motion.div
              animate={{ width: `${pet.happiness}%` }}
              transition={{ duration: 0.5 }}
              className={`progress-fill ${pet.happiness > 60 ? 'bg-pink-400' : pet.happiness > 30 ? 'bg-orange-400' : 'bg-red-400'}`}
            />
          </div>
        </div>
        
        {/* Energy */}
        <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-md">
          <span className="text-sm">⚡</span>
          <div className="progress-bar w-16">
            <motion.div
              animate={{ width: `${pet.energy}%` }}
              transition={{ duration: 0.5 }}
              className={`progress-fill ${pet.energy > 60 ? 'bg-blue-400' : pet.energy > 30 ? 'bg-yellow-400' : 'bg-red-400'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pet;
