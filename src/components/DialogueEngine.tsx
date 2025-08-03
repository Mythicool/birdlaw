'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DialogueNode, DialogueChoice, Character, Evidence } from '@/types/game';
import { useGameStore } from '@/store/gameStore';
import { CharacterSprite } from './CharacterSprite';
import { ObjectionAnimation } from './ObjectionAnimation';

interface DialogueEngineProps {
  currentNode: DialogueNode;
  character: Character;
  onChoiceSelect: (choice: DialogueChoice) => void;
  onEvidencePresent: (evidence: Evidence) => void;
  onAdvance: () => void;
}

export const DialogueEngine: React.FC<DialogueEngineProps> = ({
  currentNode,
  character,
  onChoiceSelect,
  onEvidencePresent,
  onAdvance
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showChoices, setShowChoices] = useState(false);
  const [characterAnimation, setCharacterAnimation] = useState<'normal' | 'pointing' | 'objection' | 'thinking' | 'shocked'>('normal');
  const [showObjection, setShowObjection] = useState(false);
  const [objectionType, setObjectionType] = useState<'objection' | 'hold-it' | 'take-that' | 'gotcha'>('objection');
  const { evidence, health } = useGameStore();

  // Typewriter effect for dialogue text and character animations
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    setShowChoices(false);

    // Determine character animation based on dialogue flags
    if (currentNode.flags?.isObjection) {
      setCharacterAnimation('objection');
      setShowObjection(true);
      setObjectionType('objection');
    } else if (currentNode.flags?.isTestimony) {
      setCharacterAnimation('pointing');
    } else if (currentNode.flags?.isThinking) {
      setCharacterAnimation('thinking');
    } else if (currentNode.flags?.isShocked) {
      setCharacterAnimation('shocked');
    } else {
      setCharacterAnimation('normal');
    }

    let index = 0;
    const text = currentNode.text;

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        setShowChoices(true);
        clearInterval(typeInterval);
      }
    }, 30); // Typing speed

    return () => clearInterval(typeInterval);
  }, [currentNode.text, currentNode.flags]);

  const handleChoiceClick = (choice: DialogueChoice) => {
    // Check if choice requires evidence
    if (choice.requiresEvidence) {
      const hasEvidence = evidence.some(e => e.id === choice.requiresEvidence);
      if (!hasEvidence) {
        // Show feedback that evidence is required
        return;
      }
    }

    // Trigger special animations for dramatic choices
    if (choice.text.toLowerCase().includes('objection')) {
      setCharacterAnimation('objection');
      setShowObjection(true);
      setObjectionType('objection');
      setTimeout(() => onChoiceSelect(choice), 1500);
    } else if (choice.text.toLowerCase().includes('hold it')) {
      setCharacterAnimation('pointing');
      setShowObjection(true);
      setObjectionType('hold-it');
      setTimeout(() => onChoiceSelect(choice), 1500);
    } else if (choice.text.toLowerCase().includes('take that')) {
      setCharacterAnimation('pointing');
      setShowObjection(true);
      setObjectionType('take-that');
      setTimeout(() => onChoiceSelect(choice), 1500);
    } else {
      onChoiceSelect(choice);
    }
  };

  const handleObjectionComplete = () => {
    setShowObjection(false);
    setCharacterAnimation('normal');
  };

  const getDialogueBoxStyle = () => {
    if (currentNode.flags?.isObjection) {
      return 'bg-red-600 border-red-400 text-white';
    }
    if (currentNode.flags?.isTestimony) {
      return 'bg-blue-600 border-blue-400 text-white';
    }
    return 'bg-gray-800 border-gray-600 text-white';
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-amber-100 to-amber-200">
      {/* Courtroom Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 to-amber-700/30" />
      
      {/* Character Sprite with Animations */}
      <CharacterSprite
        character={character}
        emotion={currentNode.emotion || 'neutral'}
        animation={characterAnimation}
        position="left"
        onAnimationComplete={() => setCharacterAnimation('normal')}
      />

      {/* Health/Confidence Bar */}
      <div className="absolute top-4 right-4 w-48">
        <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
          <motion.div 
            className="bg-green-500 h-full"
            initial={{ width: '100%' }}
            animate={{ width: `${(health / 100) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-sm text-gray-700 mt-1">Confidence: {health}/100</p>
      </div>

      {/* Dialogue Box */}
      <motion.div 
        className={`absolute bottom-0 left-0 right-0 p-6 border-t-4 ${getDialogueBoxStyle()}`}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Character Name */}
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-bold">{character.name}</h3>
          {character.title && (
            <span className="ml-2 text-sm opacity-75">({character.title})</span>
          )}
        </div>

        {/* Dialogue Text */}
        <div className="mb-4 min-h-[60px]">
          <p className="text-lg leading-relaxed">
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-1"
              >
                ▋
              </motion.span>
            )}
          </p>
        </div>

        {/* Choices */}
        <AnimatePresence>
          {showChoices && currentNode.choices && (
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentNode.choices.map((choice, index) => (
                <motion.button
                  key={choice.id}
                  className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-500"
                  onClick={() => handleChoiceClick(choice)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-amber-300 mr-2">▶</span>
                  {choice.text}
                  {choice.requiresEvidence && (
                    <span className="ml-2 text-xs text-blue-300">[Evidence Required]</span>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Evidence Presentation Button */}
        {showChoices && currentNode.isEvidencePresentation && (
          <motion.button
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => {/* Open evidence menu */}}
          >
            Present Evidence
          </motion.button>
        )}

        {/* Auto-advance button */}
        {showChoices && !currentNode.choices && !currentNode.isEvidencePresentation && (
          <motion.button
            className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onAdvance}
          >
            Continue
          </motion.button>
        )}
      </motion.div>

      {/* Objection Animation Overlay */}
      <ObjectionAnimation
        isVisible={showObjection}
        type={objectionType}
        onComplete={handleObjectionComplete}
      />
    </div>
  );
};
