import React from 'react';
import { motion } from 'framer-motion';

const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10,
    rotation: Math.random() * 360,
    color: ['#FFB6C1', '#DDA0DD', '#87CEEB', '#98FB98', '#FFE4B5', '#FF69B4', '#FFD700'][Math.floor(Math.random() * 7)],
    size: Math.random() * 10 + 5,
    delay: Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: `${piece.x}vw`,
            y: `${piece.y}vh`,
            rotate: piece.rotation,
            scale: 0
          }}
          animate={{
            x: `${piece.x + (Math.random() - 0.5) * 20}vw`,
            y: '110vh',
            rotate: piece.rotation + 720,
            scale: [0, 1, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: piece.delay,
            ease: "easeOut"
          }}
          className="absolute"
          style={{
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%'
          }}
        />
      ))}
      
      {/* Additional Heart Confetti */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`heart-${i}`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            rotate: 0,
            scale: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            rotate: [0, 360, 720],
            scale: [0, 1, 1, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 3,
            ease: "easeOut"
          }}
          className="absolute text-2xl"
        >
          {['💖', '💕', '💗', '💝', '💘'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
      
      {/* Sparkle Effects */}
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute text-3xl"
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

export default Confetti;
