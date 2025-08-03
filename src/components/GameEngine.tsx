'use client';

import React, { useState, useEffect } from 'react';
import { DialogueEngine } from './DialogueEngine';
import { EvidenceSystem } from './EvidenceSystem';
import { EvidenceCombinationComponent } from './EvidenceCombination';
import { CaseSelection } from './CaseSelection';
import { useGameStore } from '@/store/gameStore';
import { sampleDialogueTree, sampleCase, evidence } from '@/data/sampleData';
import { allNewCases, pigeonCaseCombinations } from '@/data/newCases';
import { DialogueChoice, Evidence, Case } from '@/types/game';
import { motion } from 'framer-motion';
import { Package, Scale, FileText, Lightbulb } from 'lucide-react';

export const GameEngine: React.FC = () => {
  const {
    currentDialogueTree,
    currentCharacter,
    currentNodeId,
    setCurrentDialogue,
    setDialogueTree,
    setCharacter,
    setCase,
    addEvidence,
    takeDamage,
    health,
    completedDialogueTrees,
    combineEvidence,
    getAvailableCombinations,
    setAvailableCombinations,
    triggerCharacterReaction,
  } = useGameStore();

  const [showEvidenceSystem, setShowEvidenceSystem] = useState(false);
  const [evidenceMode, setEvidenceMode] = useState<'inventory' | 'presentation'>('inventory');
  const [showCombinationSystem, setShowCombinationSystem] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCaseSelection, setShowCaseSelection] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  // All available cases
  const allCases = [sampleCase, ...allNewCases];

  // Initialize game data when case is selected
  useEffect(() => {
    if (!selectedCase) return;

    const firstDialogueTree = selectedCase.phases.investigation[0] || selectedCase.phases.trial[0];
    if (firstDialogueTree) {
      setDialogueTree(firstDialogueTree);
      setCase(selectedCase);
      setCurrentDialogue(firstDialogueTree.id, firstDialogueTree.startNodeId);

      // Add case evidence to inventory
      selectedCase.evidence.forEach(evidenceItem => {
        addEvidence(evidenceItem);
      });

      // Set up evidence combinations for this case
      if (selectedCase.id === 'pigeon-property-case') {
        setAvailableCombinations(pigeonCaseCombinations);
      } else {
        setAvailableCombinations([]);
      }
    }
  }, [selectedCase, setDialogueTree, setCase, setCurrentDialogue, addEvidence, setAvailableCombinations]);

  // Set current character based on current node
  useEffect(() => {
    if (currentDialogueTree && currentNodeId) {
      const currentNode = currentDialogueTree.nodes[currentNodeId];
      if (currentNode) {
        const character = currentDialogueTree.characters[currentNode.characterId];
        if (character) {
          setCharacter(character);
        }
      }
    }
  }, [currentDialogueTree, currentNodeId, setCharacter]);

  const handleChoiceSelect = (choice: DialogueChoice) => {
    // Apply character reaction effects
    if (choice.characterReaction === 'negative') {
      takeDamage(choice.healthChange || 10);
    } else if (choice.characterReaction === 'positive') {
      takeDamage(choice.healthChange || -5); // Heal for positive reactions
    } else if (choice.healthChange) {
      takeDamage(-choice.healthChange); // Direct health modification
    }

    // Charlie's Logic Bonus
    if (choice.charlieLogicBonus) {
      takeDamage(-15); // Big health boost for Charlie's bizarre but effective logic
    }

    // Unlock evidence if specified
    if (choice.unlocks) {
      choice.unlocks.forEach(unlock => {
        // Handle unlocking logic here - could unlock evidence or dialogue nodes
      });
    }

    // Navigate to next node
    setCurrentDialogue(currentDialogueTree!.id, choice.nextNodeId);
  };

  const handleEvidencePresent = (evidenceItem: Evidence) => {
    const currentNode = currentDialogueTree?.nodes[currentNodeId];

    if (currentNode?.acceptedEvidence?.includes(evidenceItem.id)) {
      // Correct evidence presented
      takeDamage(-10); // Heal for correct evidence
      console.log('Correct evidence!');

      // Unlock any evidence this piece unlocks
      if (evidenceItem.unlocks) {
        evidenceItem.unlocks.forEach(unlock => {
          // Handle unlocking new evidence or dialogue options
        });
      }
    } else {
      // Wrong evidence - trigger character-specific reaction
      const reactionSeverity = health > 70 ? 'mild' : health > 30 ? 'severe' : 'critical';
      const reaction = triggerCharacterReaction(currentCharacter?.id || 'judge', reactionSeverity);

      takeDamage(15);
      console.log('Wrong evidence!', reaction);
    }

    setShowEvidenceSystem(false);
  };

  const handleEvidenceCombination = (newEvidence: Evidence) => {
    addEvidence(newEvidence);
    setShowCombinationSystem(false);
  };

  const handleCaseSelect = (gameCase: Case) => {
    setSelectedCase(gameCase);
    setShowCaseSelection(false);
    setGameStarted(true);
  };

  const handleAdvance = () => {
    const currentNode = currentDialogueTree?.nodes[currentNodeId];
    if (currentNode?.nextNodeId) {
      setCurrentDialogue(currentDialogueTree!.id, currentNode.nextNodeId);
    }
  };

  const openEvidencePresentation = () => {
    setEvidenceMode('presentation');
    setShowEvidenceSystem(true);
  };

  const openEvidenceInventory = () => {
    setEvidenceMode('inventory');
    setShowEvidenceSystem(true);
  };

  // Show case selection screen
  if (showCaseSelection) {
    return (
      <CaseSelection
        cases={allCases}
        completedCases={completedDialogueTrees}
        onCaseSelect={handleCaseSelect}
        onBack={() => setShowCaseSelection(false)}
      />
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-300 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl font-bold text-amber-900 mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            🐦 BIRD LAW! 🐦
          </motion.h1>
          <motion.p
            className="text-xl text-amber-800 mb-8 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            A Phoenix Wright-style courtroom adventure featuring Charlie Kelly's expertise in bird law
          </motion.p>

          <div className="space-y-4">
            <motion.button
              className="block mx-auto px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xl rounded-lg shadow-lg transition-colors"
              onClick={() => setShowCaseSelection(true)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Select Case
            </motion.button>

            <motion.button
              className="block mx-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-xl rounded-lg shadow-lg transition-colors"
              onClick={() => {
                setSelectedCase(allCases[0]); // Start with first case
                setGameStarted(true);
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Quick Start
            </motion.button>
          </div>

          <motion.div
            className="mt-8 text-sm text-amber-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <p>"Bird law in this country is not governed by reason!"</p>
            <p className="italic">- Charlie Kelly, Bird Law Expert</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (!currentDialogueTree || !currentCharacter || !currentNodeId) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading game...</div>
      </div>
    );
  }

  const currentNode = currentDialogueTree.nodes[currentNodeId];

  if (!currentNode) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Error: Node not found</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Game UI Overlay */}
      <div className="absolute top-4 left-4 z-10 flex space-x-2">
        <motion.button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center space-x-2"
          onClick={openEvidenceInventory}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Package size={20} />
          <span>Evidence</span>
        </motion.button>

        <motion.button
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg flex items-center space-x-2"
          onClick={openEvidencePresentation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Scale size={20} />
          <span>Present</span>
        </motion.button>

        <motion.button
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg flex items-center space-x-2"
          onClick={() => setShowCombinationSystem(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Lightbulb size={20} />
          <span>Combine</span>
        </motion.button>

        <motion.button
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg flex items-center space-x-2"
          onClick={() => setShowCaseSelection(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileText size={20} />
          <span>Cases</span>
        </motion.button>
      </div>

      {/* Main Game */}
      <DialogueEngine
        currentNode={currentNode}
        character={currentCharacter}
        onChoiceSelect={handleChoiceSelect}
        onEvidencePresent={handleEvidencePresent}
        onAdvance={handleAdvance}
      />

      {/* Evidence System */}
      <EvidenceSystem
        isOpen={showEvidenceSystem}
        onClose={() => setShowEvidenceSystem(false)}
        onEvidenceSelect={handleEvidencePresent}
        mode={evidenceMode}
      />

      {/* Evidence Combination System */}
      <EvidenceCombinationComponent
        isOpen={showCombinationSystem}
        onClose={() => setShowCombinationSystem(false)}
        onCombinationSuccess={handleEvidenceCombination}
        availableCombinations={getAvailableCombinations()}
      />

      {/* Game Over Screen */}
      {health <= 0 && (
        <motion.div
          className="absolute inset-0 bg-black/80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Case Dismissed!</h2>
            <p className="text-xl mb-8">Charlie's bird law expertise wasn't enough this time...</p>
            <button
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
