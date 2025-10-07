import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PetAccessories = ({ pet, accessories, onAccessoryToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const accessoryOptions = [
    { id: 'bow', name: 'Bow', emoji: '🎀', description: 'A cute pink bow' },
    { id: 'glasses', name: 'Glasses', emoji: '👓', description: 'Stylish glasses' },
    { id: 'hat', name: 'Hat', emoji: '👒', description: 'A lovely hat' },
    { id: 'flower', name: 'Flower', emoji: '🌸', description: 'A beautiful flower' },
    { id: 'crown', name: 'Crown', emoji: '👑', description: 'A royal crown' },
    { id: 'scarf', name: 'Scarf', emoji: '🧣', description: 'A cozy scarf' }
  ];

  return (
    <>
      {/* Customize Button */}
      <div className="fixed bottom-4 left-4 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
          }}
        >
          <span className="text-2xl">🎨</span>
        </motion.button>
      </div>

      {/* Accessories Modal */}
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
              className="bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Customize Your Pet</h2>
                <p className="text-gray-600">Choose accessories for your pet!</p>
              </div>

              {/* Accessory Options */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {accessoryOptions.map((accessory, index) => (
                  <motion.button
                    key={accessory.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAccessoryToggle(accessory.id)}
                    className={`flex flex-col items-center space-y-2 p-4 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 ${
                      accessories.includes(accessory.id) 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                        : 'bg-gradient-to-r from-gray-400 to-gray-600'
                    }`}
                    title={accessory.description}
                  >
                    <span className="text-3xl">{accessory.emoji}</span>
                    <span className="text-sm">{accessory.name}</span>
                    {accessories.includes(accessory.id) && (
                      <span className="text-xs">✓</span>
                    )}
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

export default PetAccessories;
