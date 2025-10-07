import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrapbookPage = ({ letters, onClose }) => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const lettersPerPage = 9;

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
      className="fixed inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pet-pink to-pet-purple text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            animate={{ rotate: [0, -2, 2, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-4xl font-bold mb-2"
          >
            💌 Love Letters Scrapbook 💌
          </motion.h1>
          <p className="text-xl">
            {letters.length} of 100 letters collected
          </p>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-white bg-opacity-30 rounded-full h-4 overflow-hidden max-w-md mx-auto">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(letters.length / 100) * 100}%` }}
              transition={{ duration: 1 }}
              className="bg-white h-full rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {letters.length === 0 ? (
          <div className="text-center py-20">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              💌
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-600 mb-4">
              No letters yet!
            </h3>
            <p className="text-xl text-gray-500 mb-8">
              Take care of your pet to receive love letters!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gradient-to-r from-pet-pink to-pet-purple text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Back to Pet
            </motion.button>
          </div>
        ) : (
          <>
            {/* Letters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-200 border-2 border-pink-100"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        className="text-4xl mb-3"
                      >
                        💌
                      </motion.div>
                      <h4 className="text-lg font-bold text-pet-purple mb-2">
                        Letter #{letters.indexOf(letter) + 1}
                      </h4>
                      <p className="text-sm text-gray-500 mb-3">
                        {formatDate(letter.timestamp)}
                      </p>
                      <div className="text-sm text-gray-600 line-clamp-3">
                        {letter.content.substring(0, 80)}...
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="bg-gradient-to-r from-pet-pink to-pet-purple text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </motion.button>
                
                <span className="bg-white rounded-full px-6 py-2 shadow-lg text-sm font-medium">
                  Page {currentPage + 1} of {totalPages}
                </span>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="bg-gradient-to-r from-pet-pink to-pet-purple text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </motion.button>
              </div>
            )}

            {/* Back Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-gradient-to-r from-pet-pink to-pet-purple text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Back to Pet
              </motion.button>
            </div>
          </>
        )}
      </div>

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
                className="bg-gradient-to-r from-pet-pink to-pet-purple text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
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

export default ScrapbookPage;
