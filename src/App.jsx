import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PetSprite from './components/PetSprite';
import StatusBars from './components/StatusBars';
import ActionMenu from './components/ActionMenu';
import Letter from './components/Letter';
import ScrapbookPage from './components/ScrapbookPage';
import Room from './components/Room';
import Confetti from './components/Confetti';
import { generateLoveLetters } from './utils/loveLetters';

function App() {
  // Pet state
  const [pet, setPet] = useState({
    hunger: 80,
    happiness: 80,
    energy: 80,
    mood: 'happy',
    isSleeping: false
  });

  // Game state
  const [collectedLetters, setCollectedLetters] = useState([]);
  const [showScrapbook, setShowScrapbook] = useState(false);
  const [allLettersUnlocked, setAllLettersUnlocked] = useState(false);
  const [showFinalSurprise, setShowFinalSurprise] = useState(false);
  const [activeLetters, setActiveLetters] = useState([]);
  const [lastUserInteractionTime, setLastUserInteractionTime] = useState(Date.now());
  const [scrapbookGlow, setScrapbookGlow] = useState(false);
  const [isLetterOnScreen, setIsLetterOnScreen] = useState(false);
  const lastLetterIndexRef = useRef(-1);

  // Load saved data from localStorage
  useEffect(() => {
    const savedLetters = localStorage.getItem('collectedLetters');
    const savedPet = localStorage.getItem('petState');
    
    if (savedLetters) {
      setCollectedLetters(JSON.parse(savedLetters));
    }
    
    if (savedPet) {
      setPet(JSON.parse(savedPet));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('collectedLetters', JSON.stringify(collectedLetters));
    localStorage.setItem('petState', JSON.stringify(pet));
  }, [collectedLetters, pet]);

  // Check if all letters are unlocked
  useEffect(() => {
    if (collectedLetters.length >= 100 && !allLettersUnlocked) {
      setAllLettersUnlocked(true);
      setShowFinalSurprise(true);
    }
  }, [collectedLetters.length, allLettersUnlocked]);

  // Pet needs decay over time (MUCH SLOWER for better game balance)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pet.isSleeping) {
        setPet(prev => ({
          ...prev,
          hunger: Math.max(0, prev.hunger - 0.3), // Reduced from 1 to 0.3
          happiness: Math.max(0, prev.happiness - 0.2), // Reduced from 0.5 to 0.2
          energy: Math.max(0, prev.energy - 0.25) // Reduced from 0.8 to 0.25
        }));
      } else {
        // Restore energy while sleeping
        setPet(prev => ({
          ...prev,
          energy: Math.min(100, prev.energy + 2)
        }));
      }
    }, 3000); // Increased from 2000ms to 3000ms (slower tick rate)

    return () => clearInterval(interval);
  }, [pet.isSleeping]);

  // Update pet mood based on needs
  useEffect(() => {
    const avgNeeds = (pet.hunger + pet.happiness + pet.energy) / 3;
    
    if (avgNeeds >= 80) {
      setPet(prev => ({ ...prev, mood: 'happy' }));
    } else if (avgNeeds >= 50) {
      setPet(prev => ({ ...prev, mood: 'content' }));
    } else if (avgNeeds >= 25) {
      setPet(prev => ({ ...prev, mood: 'sad' }));
    } else {
      setPet(prev => ({ ...prev, mood: 'critical' }));
    }
  }, [pet.hunger, pet.happiness, pet.energy]);

  // CRITICAL FIX: Mood-based letter spawning - PROPERLY FIXED to not restart on every stat change
  useEffect(() => {
    // Don't spawn letters if all are collected
    if (collectedLetters.length >= 100) {
      console.log('All letters collected - not spawning more');
      return;
    }

    let cancelled = false;
    let timerRef = null;

    const spawnLetterBasedOnMood = () => {
      if (cancelled) return;

      // Read current pet stats at spawn time (not from dependencies)
      const currentAvgNeeds = (pet.hunger + pet.happiness + pet.energy) / 3;
      
      // Calculate spawn chance and interval based on pet's mood
      let spawnChance = 1.0;
      let baseInterval = 15000;
      
      if (currentAvgNeeds >= 80) {
        baseInterval = 15000;
        spawnChance = 1.0;
      } else if (currentAvgNeeds >= 60) {
        baseInterval = 20000;
        spawnChance = 0.9;
      } else if (currentAvgNeeds >= 40) {
        baseInterval = 30000;
        spawnChance = 0.7;
      } else if (currentAvgNeeds >= 20) {
        baseInterval = 45000;
        spawnChance = 0.4;
      } else {
        baseInterval = 60000;
        spawnChance = 0.2;
      }

      // Add randomness to interval (±30%)
      const randomVariation = baseInterval * 0.3;
      const actualInterval = baseInterval + (Math.random() * randomVariation * 2 - randomVariation);

      console.log('Letter spawn scheduled in', (actualInterval/1000).toFixed(1), 'seconds. Pet mood:', currentAvgNeeds.toFixed(1), 'Spawn chance:', (spawnChance*100) + '%');

      // Schedule next spawn check
      timerRef = setTimeout(() => {
        if (cancelled) return;

        // CRITICAL FIX: Check if a letter is already on screen
        if (isLetterOnScreen) {
          console.log('⏸️ Letter already on screen - skipping spawn, will check again soon');
          // Retry in 5 seconds instead of the full interval
          timerRef = setTimeout(() => spawnLetterBasedOnMood(), 5000);
          return;
        }

        const roll = Math.random();
        console.log('Letter spawn check - rolled:', roll.toFixed(2), 'need <', spawnChance.toFixed(2));
        
        // Check if letter should spawn based on chance
        if (roll < spawnChance) {
          const allLetters = generateLoveLetters();
          
          // CRITICAL FIX: Prevent duplicate consecutive messages
          let nextLetterIndex;
          const maxAttempts = 10; // Prevent infinite loop
          let attempts = 0;
          
          do {
            nextLetterIndex = Math.floor(Math.random() * allLetters.length);
            attempts++;
          } while (nextLetterIndex === lastLetterIndexRef.current && attempts < maxAttempts && allLetters.length > 1);
          
          // Remember this index for next time
          lastLetterIndexRef.current = nextLetterIndex;
          
          const newLetter = {
            id: Date.now(),
            x: Math.random() * (window.innerWidth - 100),
            y: -50,
            content: allLetters[nextLetterIndex] || "I love you more than words can express! 💕"
          };
          
          console.log('✉️ SPAWNING LETTER #' + nextLetterIndex + ' at x:', newLetter.x.toFixed(0), 'y:', newLetter.y);
          setActiveLetters(prev => [...prev, newLetter]);
          setIsLetterOnScreen(true); // CRITICAL: Mark that a letter is now on screen
        } else {
          console.log('❌ Letter spawn failed chance check');
        }

        // Chain next spawn check
        spawnLetterBasedOnMood();
      }, actualInterval);
    };

    // Start the spawn loop
    console.log('🚀 Starting letter spawn loop');
    spawnLetterBasedOnMood();

    // Cleanup
    return () => {
      console.log('🛑 Cleaning up letter spawn loop');
      cancelled = true;
      if (timerRef) {
        clearTimeout(timerRef);
      }
    };
  }, [collectedLetters.length]); // ONLY depend on collectedLetters.length, NOT pet stats!

  // Handle pet interactions
  const handleFeed = useCallback(() => {
    setLastUserInteractionTime(Date.now());
    setPet(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 25),
      happiness: Math.min(100, prev.happiness + 5),
      isSleeping: false // CRITICAL: Wake up the pet when feeding
    }));
  }, []);

  const handlePlay = useCallback(() => {
    setLastUserInteractionTime(Date.now());
    setPet(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 30),
      energy: Math.max(0, prev.energy - 10),
      hunger: Math.max(0, prev.hunger - 5),
      isSleeping: false // CRITICAL: Wake up the pet when playing
    }));
  }, []);

  const handleSleep = useCallback(() => {
    setLastUserInteractionTime(Date.now());
    setPet(prev => ({
      ...prev,
      isSleeping: !prev.isSleeping
    }));
  }, []);

  const handlePet = useCallback(() => {
    setLastUserInteractionTime(Date.now());
    setPet(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      energy: Math.min(100, prev.energy + 5),
      isSleeping: false // CRITICAL: Wake up the pet when petting
    }));
  }, []);

  const handlePetClick = useCallback(() => {
    setLastUserInteractionTime(Date.now());
  }, []);

  // Handle letter collection
  const handleLetterCollect = useCallback((letterId, content) => {
    setCollectedLetters(prev => [...prev, { id: letterId, content, timestamp: Date.now() }]);
    setActiveLetters(prev => prev.filter(letter => letter.id !== letterId));
    
    // CRITICAL FIX: Mark that letter is no longer on screen (allow new spawns)
    setIsLetterOnScreen(false);
    
    // Trigger scrapbook glow animation
    setScrapbookGlow(true);
    setTimeout(() => setScrapbookGlow(false), 1000);
  }, []);

  // Handle letter removal (when it falls off screen)
  const handleActiveLetterRemove = useCallback((letterId) => {
    setActiveLetters(prev => prev.filter(letter => letter.id !== letterId));
    // CRITICAL FIX: Mark that letter is no longer on screen (allow new spawns)
    setIsLetterOnScreen(false);
  }, []);

  // Handle letter removal from scrapbook
  const handleLetterRemove = useCallback((letterId) => {
    if (window.confirm('Are you sure you want to remove this letter? You can get it back by playing the game!')) {
      setCollectedLetters(prev => prev.filter(letter => letter.id !== letterId));
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Room />
      
      {/* Status Bars */}
      <StatusBars pet={pet} />
      
      {/* Pet Sprite */}
      <PetSprite pet={pet} onPetClick={handlePetClick} />
      
      {/* Action Menu */}
      <ActionMenu 
        onFeed={handleFeed}
        onPlay={handlePlay}
        onSleep={handleSleep}
        onPet={handlePet}
        pet={pet}
      />
      
      {/* Scrapbook Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowScrapbook(true)}
        className={`fixed top-4 right-4 bg-gradient-to-r from-pet-purple to-pet-pink text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40 ${
          scrapbookGlow ? 'animate-pulse shadow-2xl shadow-pink-400' : ''
        }`}
      >
        📖 Scrapbook ({collectedLetters.length}/100)
      </motion.button>
      
      {/* Spawn Letter Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          // Respect the isLetterOnScreen check
          if (isLetterOnScreen) {
            console.log('Cannot spawn - letter already on screen');
            return;
          }
          
          // Use a real love letter from the list
          const allLetters = generateLoveLetters();
          
          // Prevent duplicate consecutive messages
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * allLetters.length);
          } while (randomIndex === lastLetterIndexRef.current && allLetters.length > 1);
          
          lastLetterIndexRef.current = randomIndex;
          
          const newLetter = {
            id: Date.now(),
            x: Math.random() * (window.innerWidth - 100),
            y: -50,
            content: allLetters[randomIndex] || "I love you more than words can express! 💕"
          };
          setActiveLetters(prev => [...prev, newLetter]);
          setIsLetterOnScreen(true);
        }}
        className="fixed top-4 left-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40"
      >
        Spawn Letter
      </motion.button>
      
      {/* Active Letters */}
      <AnimatePresence>
        {activeLetters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            onCollect={handleLetterCollect}
            onRemove={handleActiveLetterRemove}
          />
        ))}
      </AnimatePresence>
      
      {/* Scrapbook Page */}
      <AnimatePresence>
        {showScrapbook && (
          <ScrapbookPage 
            letters={collectedLetters}
            onClose={() => setShowScrapbook(false)}
            onRemoveLetter={handleLetterRemove}
          />
        )}
      </AnimatePresence>
      
      {/* Final Surprise */}
      <AnimatePresence>
        {showFinalSurprise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-pink-200 bg-opacity-90"
          >
            <Confetti />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1 }}
              className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md mx-4"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎂
              </motion.div>
              <h1 className="text-3xl font-bold text-pet-pink mb-4">
                Happy Birthday! 🎉
              </h1>
              <p className="text-lg text-gray-700 mb-4">
                You've collected all 100 love letters! 💌
              </p>
              <p className="text-xl font-semibold text-pet-purple">
                I love you forever! ❤️
              </p>
              <button
                onClick={() => setShowFinalSurprise(false)}
                className="pet-button mt-6"
              >
                Close
        </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
  );
}

export default App;