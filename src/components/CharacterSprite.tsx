'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '@/types/game';

interface CharacterSpriteProps {
  character: Character;
  emotion: string;
  animation?: 'normal' | 'pointing' | 'objection' | 'thinking' | 'shocked';
  position?: 'left' | 'right' | 'center';
  onAnimationComplete?: () => void;
}

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  character,
  emotion,
  animation = 'normal',
  position = 'left',
  onAnimationComplete
}) => {
  const [currentSprite, setCurrentSprite] = useState<string>('');
  const [showObjectionEffect, setShowObjectionEffect] = useState(false);
  const [showPointingEffect, setShowPointingEffect] = useState(false);

  // Get sprite path based on character and animation
  const getSpriteUrl = () => {
    const characterName = character.name.toLowerCase().replace(/\s+/g, '-');

    // Use our new SVG sprites
    if (characterName === 'charlie-kelly' || characterName === 'charlie') {
      if (animation === 'pointing' || animation === 'objection') {
        return '/sprites/charlie-pointing.svg';
      }
      return '/sprites/charlie-normal.svg';
    }

    if (characterName === 'judge') {
      if (animation === 'shocked') {
        return '/sprites/judge-shocked.svg';
      }
      return '/sprites/judge-normal.svg';
    }

    if (characterName === 'prosecutor' || characterName.includes('prosecutor') || characterName === 'dennis-reynolds' || characterName === 'dennis') {
      if (animation === 'pointing' || animation === 'objection') {
        return '/sprites/prosecutor-pointing.svg';
      }
      return '/sprites/prosecutor-normal.svg';
    }

    // Fallback to original sprite system, but ensure we never return empty string
    const fallbackSprite = character.sprites?.[emotion] || character.sprites?.neutral || '/sprites/charlie-normal.svg';
    return fallbackSprite || '/sprites/charlie-normal.svg';
  };

  // Update sprite when animation changes
  useEffect(() => {
    const spriteUrl = getSpriteUrl();
    // Only set sprite if we have a valid URL
    if (spriteUrl && spriteUrl.trim() !== '') {
      setCurrentSprite(spriteUrl);
    }

    // Trigger special effects for dramatic animations
    if (animation === 'objection') {
      setShowObjectionEffect(true);
      setTimeout(() => {
        setShowObjectionEffect(false);
        onAnimationComplete?.();
      }, 1500);
    }

    if (animation === 'pointing') {
      setShowPointingEffect(true);
      setTimeout(() => {
        setShowPointingEffect(false);
        onAnimationComplete?.();
      }, 1000);
    }
  }, [animation, character, emotion, onAnimationComplete]);

  // Position variants
  const positionVariants = {
    left: { x: 0 },
    center: { x: '50%' },
    right: { x: '100%' }
  };

  // Animation variants
  const animationVariants = {
    normal: {
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      transition: { duration: 0.3 }
    },
    pointing: {
      scale: 1.1,
      rotate: -2,
      x: 20,
      y: -10,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 300
      }
    },
    objection: {
      scale: 1.2,
      rotate: 0,
      x: 0,
      y: -20,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 400
      }
    },
    thinking: {
      scale: 1,
      rotate: 1,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    },
    shocked: {
      scale: 1.1,
      rotate: 3,
      y: -5,
      transition: {
        duration: 0.5,
        repeat: 2,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className={`absolute ${position === 'left' ? 'left-1/4' : position === 'right' ? 'right-1/4' : 'left-1/2'} top-1/4`}>
      {/* Main Character Sprite */}
      <motion.div
        className="relative w-64 h-80"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentSprite && currentSprite.trim() !== '' && (
          <motion.img
            src={currentSprite}
            alt={character.name}
            className="w-full h-full object-contain drop-shadow-lg"
            variants={animationVariants}
            animate={animation}
            onAnimationComplete={onAnimationComplete}
          />
        )}
        
        {/* Objection Effect */}
        <AnimatePresence>
          {showObjectionEffect && (
            <>
              {/* Flash effect */}
              <motion.div
                className="absolute inset-0 bg-red-500 mix-blend-multiply rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, repeat: 2 }}
              />
              
              {/* OBJECTION! text */}
              <motion.div
                className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-xl shadow-lg border-4 border-red-800">
                  OBJECTION!
                </div>
              </motion.div>
              
              {/* Speed lines */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-white h-1 origin-left"
                    style={{
                      top: `${20 + i * 10}%`,
                      left: '10%',
                      width: '80%',
                      transform: `rotate(${-10 + i * 3}deg)`
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  />
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        {/* Pointing Effect */}
        <AnimatePresence>
          {showPointingEffect && (
            <>
              {/* Dramatic pointing lines */}
              <motion.div
                className="absolute right-0 top-1/3 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-yellow-400 h-0.5"
                    style={{
                      top: `${i * 8}px`,
                      right: `-${20 + i * 10}px`,
                      width: `${30 + i * 15}px`,
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  />
                ))}
              </motion.div>
              
              {/* Pointing emphasis */}
              <motion.div
                className="absolute right-0 top-1/3 w-8 h-8 bg-yellow-400 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1.5 }}
                exit={{ scale: 0 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 400
                }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Character name plate */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="font-semibold">{character.name}</span>
        {character.title && (
          <span className="text-sm text-gray-300 ml-2">({character.title})</span>
        )}
      </motion.div>
    </div>
  );
};
