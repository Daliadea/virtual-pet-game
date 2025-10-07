import React from 'react';
import { motion } from 'framer-motion';

const Room = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pet-blue via-pet-pink to-pet-purple opacity-80" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute text-2xl text-white opacity-30"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`
            }}
          >
            💕
          </motion.div>
        ))}
        
        {/* Floating Stars */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
            className="absolute text-xl text-pet-yellow opacity-40"
            style={{
              left: `${15 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
      
      {/* Room Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner Decorations */}
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-8 left-8 text-4xl opacity-60"
        >
          🌸
        </motion.div>
        
        <motion.div
          animate={{
            rotate: [0, -5, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-8 right-8 text-4xl opacity-60"
        >
          🌸
        </motion.div>
        
        <motion.div
          animate={{
            rotate: [0, 8, -8, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-8 left-8 text-4xl opacity-60"
        >
          🌺
        </motion.div>
        
        <motion.div
          animate={{
            rotate: [0, -8, 8, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-8 right-8 text-4xl opacity-60"
        >
          🌺
        </motion.div>
        
        {/* Side Decorations */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-4 text-3xl opacity-50"
        >
          🎀
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/3 right-4 text-3xl opacity-50"
        >
          🎀
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 left-4 text-3xl opacity-50"
        >
          🦋
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, -12, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-1/3 right-4 text-3xl opacity-50"
        >
          🦋
        </motion.div>
      </div>
      
      {/* Soft Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-pet-pink opacity-20" />
    </div>
  );
};

export default Room;
