import React from 'react';
import { motion } from 'framer-motion';

const Controls = ({ onFeed, onPlay, onSleep, onPet, pet, collectedCount, onShowScrapbook }) => {
  const buttons = [
    { 
      action: onFeed, 
      emoji: '🍎', 
      label: 'Feed', 
      disabled: pet.isSleeping,
      tooltip: 'Feed your pet (+25 hunger, +5 happiness)'
    },
    { 
      action: onPlay, 
      emoji: '🎾', 
      label: 'Play', 
      disabled: pet.energy < 20 || pet.isSleeping,
      tooltip: 'Play with your pet (+30 happiness, -10 energy, -5 hunger)'
    },
    { 
      action: onSleep, 
      emoji: pet.isSleeping ? '😴' : '🛏️', 
      label: pet.isSleeping ? 'Wake Up' : 'Sleep', 
      disabled: false,
      tooltip: pet.isSleeping ? 'Wake up your pet' : 'Put your pet to sleep (+energy over time)'
    },
    { 
      action: onPet, 
      emoji: '🤗', 
      label: 'Pet', 
      disabled: pet.isSleeping,
      tooltip: 'Give your pet love (+15 happiness, +5 energy)'
    }
  ];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      {/* Scrapbook Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onShowScrapbook}
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pet-purple to-pet-pink text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
      >
        📖 Scrapbook ({collectedCount}/100)
      </motion.button>

      {/* Control Buttons */}
      <div className="flex space-x-4 bg-white rounded-2xl p-4 shadow-xl">
        {buttons.map((button, index) => (
          <motion.div
            key={button.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <motion.button
              whileHover={{ scale: button.disabled ? 1 : 1.05 }}
              whileTap={{ scale: button.disabled ? 1 : 0.95 }}
              onClick={button.action}
              disabled={button.disabled}
              className={`pet-button ${button.disabled ? 'opacity-50 cursor-not-allowed' : ''} flex flex-col items-center space-y-1 min-w-16`}
              title={button.tooltip}
            >
              <span className="text-2xl">{button.emoji}</span>
              <span className="text-xs font-semibold">{button.label}</span>
            </motion.button>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                {button.tooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-4 text-sm text-gray-600"
      >
        <p>Keep your pet happy to receive love letters! 💌</p>
        <p className="text-xs mt-1">Letters appear faster when needs are balanced</p>
      </motion.div>
    </div>
  );
};

export default Controls;
