import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Scrapbook = ({ letters, onClose }) => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const lettersPerPage = 12;

  const totalPages = Math.ceil(letters.length / lettersPerPage);
  const currentLetters = letters.slice(
    currentPage * lettersPerPage,
    (currentPage + 1) * lettersPerPage
  );

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pet-pink to-pet-purple text-white p-6 text-center">
          <motion.h1
            animate={{ rotate: [0, -2, 2, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-3xl font-bold mb-2"
          >
            💌 Love Letters Scrapbook 💌
          </motion.h1>
          <p className="text-lg">
            {letters.length} of 100 letters collected
          </p>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-white bg-opacity-30 rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(letters.length / 100) * 100}%` }}
              transition={{ duration: 1 }}
              className="bg-white h-full rounded-full"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {letters.length === 0 ? (
            <div className="text-center py-12">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                💌
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No letters yet!
              </h3>
              <p className="text-gray-500">
                Take care of your pet to receive love letters!
              </p>
            </div>
          ) : (
            <>
              {/* Letters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <AnimatePresence>
                  {currentLetters.map((letter, index) => (
                    <motion.div
                      key={letter.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedLetter(letter)}
                      className="letter-envelope p-4 cursor-pointer group"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          className="text-3xl mb-2 group-hover:scale-110 transition-transform"
                        >
                          💌
                        </motion.div>
                        <p className="text-sm text-gray-600 font-medium">
                          Letter #{letters.indexOf(letter) + 1}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(letter.timestamp)}
                        </p>
                        <div className="mt-2 text-xs text-gray-400 truncate">
                          {letter.content.substring(0, 50)}...
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="pet-button disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </motion.button>
                  
                  <span className="flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium">
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="pet-button disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Close Button */}
        <div className="p-6 text-center border-t border-pink-200">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="pet-button"
          >
            Close Scrapbook
          </motion.button>
        </div>
      </motion.div>

      {/* Letter Detail Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-60"
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 10 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-2xl max-w-lg mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                💌
              </motion.div>
              
              <h3 className="text-2xl font-bold text-pet-purple mb-2">
                Letter #{letters.indexOf(selectedLetter) + 1}
              </h3>
              
              <p className="text-sm text-gray-500 mb-6">
                Collected on {formatDate(selectedLetter.timestamp)}
              </p>
              
              <div className="bg-pink-50 rounded-2xl p-6 mb-6 text-left">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedLetter.content}
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedLetter(null)}
                className="pet-button"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Scrapbook;
