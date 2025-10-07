import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const PetSprite = ({ pet, onPetClick }) => {
  const [petName, setPetName] = useState('My Love');
  const [isJiggling, setIsJiggling] = useState(false);
  const [petPosition, setPetPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const petContainerRef = useRef(null);
  const movementTimerRef = useRef(null);
  const isSleepingRef = useRef(pet.isSleeping);
  const isDraggingRef = useRef(false);

  // CRITICAL FIX: Load pet name from localStorage on mount
  useEffect(() => {
    const savedPetName = localStorage.getItem('petName');
    if (savedPetName) {
      setPetName(savedPetName);
      console.log('Loaded pet name from localStorage:', savedPetName);
    }
  }, []);

  // Keep refs in sync
  useEffect(() => {
    isSleepingRef.current = pet.isSleeping;
  }, [pet.isSleeping]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);
  const getChiikawaColor = () => {
    // Chiikawa is always white, but we can add a subtle tint based on mood
    switch (pet.mood) {
      case 'happy': return '#FFFFFF';
      case 'content': return '#FFF8F0';
      case 'sad': return '#F5F5F5';
      case 'critical': return '#F0F0F0';
      default: return '#FFFFFF';
    }
  };

  const getEyeExpression = () => {
    if (pet.isSleeping) return 'closed';
    switch (pet.mood) {
      case 'happy': return 'happy';
      case 'content': return 'normal';
      case 'sad': return 'sad';
      case 'critical': return 'worried';
      default: return 'normal';
    }
  };

  const eyeExpression = getEyeExpression();

  const handleNameClick = () => {
    const newName = prompt('Enter a new name for your pet:', petName);
    if (newName && newName.trim()) {
      const trimmedName = newName.trim();
      setPetName(trimmedName);
      // CRITICAL FIX: Save pet name to localStorage
      localStorage.setItem('petName', trimmedName);
      console.log('Saved pet name to localStorage:', trimmedName);
    }
  };

  const handlePetClick = (e) => {
    if (!isDragging) {
      setIsJiggling(true);
      setTimeout(() => setIsJiggling(false), 600);
      if (onPetClick) onPetClick();
    }
  };

  // Autonomous movement and scheduling - FIXED to use refs and avoid dependency issues
  const movePetRandomly = useCallback(() => {
    console.log('🐾 movePetRandomly called - sleeping:', isSleepingRef.current, 'dragging:', isDraggingRef.current);
    
    // CRITICAL: Don't move when sleeping or being dragged (use refs!)
    if (isSleepingRef.current || isDraggingRef.current) {
      console.log('⏸️ Not moving - waiting...');
      return;
    }
    
    // Calculate safe boundaries to avoid UI elements
    const minX = 15;
    const maxX = 85;
    const minY = 20;
    const maxY = 75;
    
    // Move pet to a new random position within safe boundaries
    const newX = minX + Math.random() * (maxX - minX);
    const newY = minY + Math.random() * (maxY - minY);
    
    console.log('✅ Moving pet to:', newX.toFixed(1) + '%', newY.toFixed(1) + '%');
    setPetPosition({ x: newX, y: newY });
  }, []); // No dependencies - uses refs!

  const scheduleNextMovement = useCallback((immediate = false) => {
    // Clear any existing timer
    if (movementTimerRef.current) {
      clearTimeout(movementTimerRef.current);
      movementTimerRef.current = null;
    }
    
    // Don't schedule if sleeping or dragging (use refs!)
    if (isSleepingRef.current || isDraggingRef.current) {
      console.log('⏸️ Not scheduling - sleeping:', isSleepingRef.current, 'dragging:', isDraggingRef.current);
      return;
    }
    
    // If immediate (after drag), use short delay. Otherwise use normal delay
    const nextMoveDelay = immediate 
      ? 1000 + Math.random() * 1000
      : 8000 + Math.random() * 12000;
    
    console.log('⏰ Scheduling next movement in', (nextMoveDelay/1000).toFixed(1), 'seconds');
    movementTimerRef.current = setTimeout(() => {
      movePetRandomly();
      // After moving, schedule the next one
      scheduleNextMovement(false);
    }, nextMoveDelay);
  }, [movePetRandomly]); // Only depends on movePetRandomly which has no dependencies!

  // Start autonomous movement on component mount ONLY ONCE
  useEffect(() => {
    console.log('🚀 Initial mount - starting movement loop');
    const timer = setTimeout(() => {
      scheduleNextMovement(false);
    }, 3000); // Start after 3 seconds
    
    return () => {
      console.log('🛑 Component unmounting - cleaning up timer');
      clearTimeout(timer);
      if (movementTimerRef.current) {
        clearTimeout(movementTimerRef.current);
        movementTimerRef.current = null;
      }
    };
  }, [scheduleNextMovement]);

  // CRITICAL FIX: Stop/restart movement when sleeping state changes
  useEffect(() => {
    if (pet.isSleeping) {
      // Pet is going to sleep - STOP ALL MOVEMENT
      console.log('😴 Pet going to sleep - stopping movement');
      if (movementTimerRef.current) {
        clearTimeout(movementTimerRef.current);
        movementTimerRef.current = null;
      }
    } else {
      // Pet is waking up - RESTART MOVEMENT
      console.log('👀 Pet waking up - restarting movement');
      // Only restart if not currently dragging and no timer is active
      if (!isDraggingRef.current && !movementTimerRef.current) {
        scheduleNextMovement(true);
      }
    }
  }, [pet.isSleeping, scheduleNextMovement]);

  // CRITICAL FIX: Ensure movement restarts after dragging ends
  useEffect(() => {
    // When dragging ends, make sure movement restarts (if not sleeping)
    if (!isDragging && !isSleepingRef.current && !movementTimerRef.current) {
      console.log('🖱️ Drag ended - restarting movement');
      scheduleNextMovement(true);
    }
  }, [isDragging, scheduleNextMovement]);

  return (
    <motion.div 
      id="pet-container"
      ref={petContainerRef}
      className="fixed cursor-move"
      style={{
        left: `${petPosition.x || 50}%`,
        top: `${petPosition.y || 50}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 10
      }}
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        left: -window.innerWidth * 0.35,
        right: window.innerWidth * 0.35,
        top: -window.innerHeight * 0.30,
        bottom: window.innerHeight * 0.25
      }}
      whileDrag={{ scale: 1.05 }}
      onDragStart={() => {
        if (movementTimerRef.current) {
          clearTimeout(movementTimerRef.current);
          movementTimerRef.current = null;
        }
        setIsDragging(true);
      }}
      onDragEnd={(e, info) => {
        setIsDragging(false);
        // Reset any drag offset applied by Framer Motion to ensure left/top take effect next move
        // This prevents the element from appearing "stuck" after user drag
        if (petContainerRef.current) {
          petContainerRef.current.style.transform = 'translate(-50%, -50%)';
        }
        // Resume autonomous movement quickly - CRITICAL FIX
        scheduleNextMovement(true);
      }}
    >
      {/* Pet Shadow */}
      <motion.div
        animate={{
          scale: pet.isSleeping ? 0.8 : 1,
          opacity: pet.isSleeping ? 0.6 : 0.3
        }}
        transition={{ duration: 0.5 }}
        className="absolute top-20 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-black rounded-full blur-sm"
      />
      
      {/* Chiikawa Body */}
      <motion.div
        animate={{
          rotate: pet.isSleeping ? 0 : [0, -1, 1, 0],
          scale: isJiggling ? [1, 1.2, 1] : 1,
        }}
        transition={{
          rotate: { duration: 2, repeat: pet.isSleeping ? 0 : Infinity, ease: "easeInOut" },
          scale: { duration: 0.6, ease: "easeOut" }
        }}
        className="relative cursor-pointer"
        style={{
          width: '140px',
          height: '140px',
          backgroundColor: getChiikawaColor(),
          borderRadius: '50%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          border: '2px solid #E5E5E5',
          position: 'relative'
        }}
        onClick={handlePetClick}
      >
        {/* Chiikawa Ears */}
        <div className="absolute -top-4 left-6 w-8 h-8 bg-white rounded-full border-2 border-gray-200 transform rotate-12"></div>
        <div className="absolute -top-4 right-6 w-8 h-8 bg-white rounded-full border-2 border-gray-200 transform -rotate-12"></div>
        
        {/* Inner ear details */}
        <div className="absolute -top-2 left-7 w-4 h-4 bg-pink-100 rounded-full"></div>
        <div className="absolute -top-2 right-7 w-4 h-4 bg-pink-100 rounded-full"></div>
        {/* Chiikawa Eyes */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex space-x-6">
          {eyeExpression === 'closed' ? (
            // Sleeping eyes
            <>
              <div className="w-4 h-2 bg-black rounded-full"></div>
              <div className="w-4 h-2 bg-black rounded-full"></div>
            </>
          ) : eyeExpression === 'happy' ? (
            // Happy eyes (big and sparkly like Chiikawa)
            <>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </>
          ) : eyeExpression === 'sad' ? (
            // Sad eyes (droopy)
            <>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </>
          ) : (
            // Normal eyes (Chiikawa's big round eyes)
            <>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center relative">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </>
          )}
        </div>

        {/* Chiikawa Blushing Cheeks */}
        {pet.mood === 'happy' && !pet.isSleeping && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-16 left-4 w-5 h-5 bg-pink-200 rounded-full opacity-80"
          />
        )}
        {pet.mood === 'happy' && !pet.isSleeping && (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute top-16 right-4 w-5 h-5 bg-pink-200 rounded-full opacity-80"
          />
        )}


        {/* Chiikawa Mouth */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          {eyeExpression === 'closed' ? (
            // Sleeping mouth (small line)
            <div className="w-4 h-1 bg-black rounded-full"></div>
          ) : eyeExpression === 'happy' ? (
            // Happy mouth (small smile like Chiikawa)
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-3 border-2 border-black rounded-full border-t-0"
            />
          ) : eyeExpression === 'sad' ? (
            // Sad mouth (small frown)
            <div className="w-4 h-2 border-2 border-black rounded-full border-b-0"></div>
          ) : (
            // Normal mouth (small neutral)
            <div className="w-4 h-1 bg-black rounded-full"></div>
          )}
        </div>

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
      </motion.div>
      
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
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={handleNameClick}
          title="Click to change name"
        >
        <span className="text-sm font-bold text-pet-purple">{petName}</span>
      </motion.div>
    </motion.div>
  );
};

export default PetSprite;
