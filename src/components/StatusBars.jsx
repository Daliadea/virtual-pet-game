import React from 'react';
import { motion } from 'framer-motion';

const StatusBars = ({ pet }) => {
  const getBarColor = (type, value) => {
    if (value >= 70) {
      switch (type) {
        case 'hunger': return '#10B981'; // green
        case 'happiness': return '#F59E0B'; // yellow
        case 'energy': return '#3B82F6'; // blue
        default: return '#10B981';
      }
    } else if (value >= 40) {
      switch (type) {
        case 'hunger': return '#F59E0B'; // yellow
        case 'happiness': return '#F59E0B'; // yellow
        case 'energy': return '#F59E0B'; // yellow
        default: return '#F59E0B';
      }
    } else {
      return '#EF4444'; // red
    }
  };

  const getBarIcon = (type) => {
    switch (type) {
      case 'hunger': return '🍎';
      case 'happiness': return '😊';
      case 'energy': return '⚡';
      default: return '❤️';
    }
  };

  const getBarLabel = (type) => {
    switch (type) {
      case 'hunger': return 'Hunger';
      case 'happiness': return 'Happiness';
      case 'energy': return 'Energy';
      default: return 'Status';
    }
  };

  const statusBars = [
    { type: 'hunger', value: pet.hunger },
    { type: 'happiness', value: pet.happiness },
    { type: 'energy', value: pet.energy }
  ];

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className="bg-white rounded-2xl p-4 shadow-xl">
        <h3 className="text-center text-lg font-bold text-gray-800 mb-3">Pet Status</h3>
        <div className="space-y-3">
          {statusBars.map((bar, index) => (
            <motion.div
              key={bar.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <span className="text-2xl">{getBarIcon(bar.type)}</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {getBarLabel(bar.type)}
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {Math.round(bar.value)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.value}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: getBarColor(bar.type, bar.value) }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusBars;
