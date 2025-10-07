import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Pet from './components/Pet';
import Controls from './components/Controls';
import Letter from './components/Letter';
import Scrapbook from './components/Scrapbook';
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

  // Pet needs decay over time
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pet.isSleeping) {
        setPet(prev => ({
          ...prev,
          hunger: Math.max(0, prev.hunger - 1),
          happiness: Math.max(0, prev.happiness - 0.5),
          energy: Math.max(0, prev.energy - 0.8)
        }));
      } else {
        // Restore energy while sleeping
        setPet(prev => ({
          ...prev,
          energy: Math.min(100, prev.energy + 2)
        }));
      }
    }, 2000);

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

  // Spawn love letters
  useEffect(() => {
    const spawnLetter = () => {
      const avgNeeds = (pet.hunger + pet.happiness + pet.energy) / 3;
      const spawnRate = avgNeeds >= 70 ? 25000 : avgNeeds >= 40 ? 35000 : 45000; // 25-45 seconds
      
      const timer = setTimeout(() => {
        if (collectedLetters.length < 100) {
          const newLetter = {
            id: Date.now(),
            x: Math.random() * (window.innerWidth - 100),
            y: -50,
            content: generateLoveLetters()[collectedLetters.length] || "I love you more than words can express! 💕"
          };
          
          setActiveLetters(prev => [...prev, newLetter]);
        }
      }, spawnRate);

      return timer;
    };

    const timer = spawnLetter();
    return () => clearTimeout(timer);
  }, [pet.hunger, pet.happiness, pet.energy, collectedLetters.length]);

  // Handle pet interactions
  const handleFeed = useCallback(() => {
    setPet(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 25),
      happiness: Math.min(100, prev.happiness + 5)
    }));
  }, []);

  const handlePlay = useCallback(() => {
    setPet(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 30),
      energy: Math.max(0, prev.energy - 10),
      hunger: Math.max(0, prev.hunger - 5)
    }));
  }, []);

  const handleSleep = useCallback(() => {
    setPet(prev => ({
      ...prev,
      isSleeping: !prev.isSleeping
    }));
  }, []);

  const handlePet = useCallback(() => {
    setPet(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      energy: Math.min(100, prev.energy + 5)
    }));
  }, []);

  // Handle letter collection
  const handleLetterCollect = useCallback((letterId, content) => {
    setCollectedLetters(prev => [...prev, { id: letterId, content, timestamp: Date.now() }]);
    setActiveLetters(prev => prev.filter(letter => letter.id !== letterId));
  }, []);

  // Handle letter removal (when it falls off screen)
  const handleLetterRemove = useCallback((letterId) => {
    setActiveLetters(prev => prev.filter(letter => letter.id !== letterId));
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Room />
      
      {/* Main Game Container */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Pet */}
        <Pet pet={pet} />
      </div>
      
      {/* Controls */}
      <Controls 
        onFeed={handleFeed}
        onPlay={handlePlay}
        onSleep={handleSleep}
        onPet={handlePet}
        pet={pet}
        collectedCount={collectedLetters.length}
        onShowScrapbook={() => setShowScrapbook(true)}
      />
      
      {/* Active Letters */}
      <AnimatePresence>
        {activeLetters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            onCollect={handleLetterCollect}
            onRemove={handleLetterRemove}
          />
        ))}
      </AnimatePresence>
      
      {/* Scrapbook */}
      {showScrapbook && (
        <Scrapbook 
          letters={collectedLetters}
          onClose={() => setShowScrapbook(false)}
        />
      )}
      
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