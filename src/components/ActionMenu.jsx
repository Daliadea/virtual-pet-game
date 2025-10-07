import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ActionMenu = ({ onFeed, onPlay, onSleep, onPet, pet }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { 
      action: onFeed, 
      emoji: '🍎', 
      label: 'Feed', 
      disabled: pet.isSleeping,
      tooltip: 'Feed your pet (+25 hunger, +5 happiness)',
      color: 'from-red-400 to-red-600'
    },
    { 
      action: onPlay, 
      emoji: '🎾', 
      label: 'Play', 
      disabled: pet.energy < 20 || pet.isSleeping,
      tooltip: 'Play with your pet (+30 happiness, -10 energy, -5 hunger)',
      color: 'from-green-400 to-green-600'
    },
    { 
      action: onSleep, 
      emoji: pet.isSleeping ? '😴' : '🛏️', 
      label: pet.isSleeping ? 'Wake Up' : 'Sleep', 
      disabled: false,
      tooltip: pet.isSleeping ? 'Wake up your pet' : 'Put your pet to sleep (+energy over time)',
      color: 'from-blue-400 to-blue-600'
    },
    { 
      action: onPet, 
      emoji: '🤗', 
      label: 'Pet', 
      disabled: pet.isSleeping,
      tooltip: 'Give your pet love (+15 happiness, +5 energy)',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  const handleAction = (action) => {
    action();
    setIsOpen(false);
  };

  return (
    <>
      {/* Main Menu Button */}
      <div className="fixed bottom-4 right-4 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-pet-pink to-pet-purple text-white font-bold p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #FFB6C1, #DDA0DD)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
          }}
        >
          <span className="text-2xl">💖</span>
        </motion.button>
      </div>

      {/* Action Menu Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Take Care of Your Pet</h2>
                <p className="text-gray-600">Choose an action to help your pet!</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {actions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: action.disabled ? 1 : 1.05 }}
                    whileTap={{ scale: action.disabled ? 1 : 0.95 }}
                    onClick={() => handleAction(action.action)}
                    disabled={action.disabled}
                    className={`flex flex-col items-center space-y-2 p-4 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 ${
                      action.disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{
                      background: action.disabled 
                        ? 'linear-gradient(135deg, #d1d5db, #9ca3af)' 
                        : `linear-gradient(135deg, ${action.color.split(' ')[1]}, ${action.color.split(' ')[3]})`,
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
                    }}
                    title={action.tooltip}
                  >
                    <span className="text-3xl">{action.emoji}</span>
                    <span className="text-sm">{action.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl transition-all duration-200"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ActionMenu;
