import React from 'react';
import { motion } from 'framer-motion';

const PetAccessoryRenderer = ({ accessories }) => {
  const getAccessoryStyle = (accessoryId) => {
    switch (accessoryId) {
      case 'bow':
        return {
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '1.5rem',
          zIndex: 10
        };
      case 'glasses':
        return {
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '2rem',
          zIndex: 10
        };
      case 'hat':
        return {
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '2rem',
          zIndex: 10
        };
      case 'flower':
        return {
          position: 'absolute',
          top: '10px',
          right: '20px',
          fontSize: '1.2rem',
          zIndex: 10
        };
      case 'crown':
        return {
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '1.8rem',
          zIndex: 10
        };
      case 'scarf':
        return {
          position: 'absolute',
          top: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '1.5rem',
          zIndex: 10
        };
      default:
        return {};
    }
  };

  const getAccessoryEmoji = (accessoryId) => {
    switch (accessoryId) {
      case 'bow': return '🎀';
      case 'glasses': return '👓';
      case 'hat': return '👒';
      case 'flower': return '🌸';
      case 'crown': return '👑';
      case 'scarf': return '🧣';
      default: return '';
    }
  };

  return (
    <>
      {accessories.map((accessoryId) => (
        <motion.div
          key={accessoryId}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          style={getAccessoryStyle(accessoryId)}
        >
          {getAccessoryEmoji(accessoryId)}
        </motion.div>
      ))}
    </>
  );
};

export default PetAccessoryRenderer;
