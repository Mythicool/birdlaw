'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Evidence, EvidenceCombination } from '@/types/game';
import { useGameStore } from '@/store/gameStore';
import { X, Plus, Lightbulb, Zap } from 'lucide-react';

interface EvidenceCombinationProps {
  isOpen: boolean;
  onClose: () => void;
  onCombinationSuccess: (newEvidence: Evidence) => void;
  availableCombinations: EvidenceCombination[];
}

export const EvidenceCombinationComponent: React.FC<EvidenceCombinationProps> = ({
  isOpen,
  onClose,
  onCombinationSuccess,
  availableCombinations
}) => {
  const { evidence } = useGameStore();
  const [selectedEvidence1, setSelectedEvidence1] = useState<Evidence | null>(null);
  const [selectedEvidence2, setSelectedEvidence2] = useState<Evidence | null>(null);
  const [combinationResult, setCombinationResult] = useState<{
    success: boolean;
    newEvidence?: Evidence;
    charlieLogic?: string;
  } | null>(null);

  const handleEvidenceSelect = (evidenceItem: Evidence, slot: 1 | 2) => {
    if (slot === 1) {
      setSelectedEvidence1(evidenceItem);
      if (selectedEvidence2?.id === evidenceItem.id) {
        setSelectedEvidence2(null);
      }
    } else {
      setSelectedEvidence2(evidenceItem);
      if (selectedEvidence1?.id === evidenceItem.id) {
        setSelectedEvidence1(null);
      }
    }
    setCombinationResult(null);
  };

  const attemptCombination = () => {
    if (!selectedEvidence1 || !selectedEvidence2) return;

    // Find matching combination
    const combination = availableCombinations.find(combo => 
      (combo.evidence1Id === selectedEvidence1.id && combo.evidence2Id === selectedEvidence2.id) ||
      (combo.evidence1Id === selectedEvidence2.id && combo.evidence2Id === selectedEvidence1.id)
    );

    if (combination) {
      // Success! Create new evidence
      const newEvidence: Evidence = {
        id: combination.resultEvidenceId,
        name: `Combined Evidence: ${selectedEvidence1.name} + ${selectedEvidence2.name}`,
        description: `Charlie's brilliant combination of ${selectedEvidence1.name} and ${selectedEvidence2.name}`,
        image: '/evidence/combo-evidence.svg',
        category: 'document',
        relevantTo: [...selectedEvidence1.relevantTo, ...selectedEvidence2.relevantTo],
        isComboEvidence: true,
        comboComponents: [selectedEvidence1.id, selectedEvidence2.id],
        metadata: {
          birdLawRelevance: combination.charlieLogic,
          charlieLogicRating: 'accidentally_brilliant'
        }
      };

      setCombinationResult({
        success: true,
        newEvidence,
        charlieLogic: combination.charlieLogic
      });
    } else {
      // Check if it's a "Charlie Logic" combination (bizarre but somehow works)
      const charlieLogicCombos = [
        {
          items: ['bird-seed-bag', 'feather-evidence'],
          logic: "The feather proves the bag was opened by someone with bird-like characteristics! It's basic bird forensics!"
        },
        {
          items: ['security-footage', 'bird-law-book'],
          logic: "The footage becomes admissible evidence when cross-referenced with subsection 12 of my bird law notes!"
        }
      ];

      const charlieCombo = charlieLogicCombos.find(combo =>
        combo.items.includes(selectedEvidence1.id) && combo.items.includes(selectedEvidence2.id)
      );

      if (charlieCombo) {
        const newEvidence: Evidence = {
          id: `charlie-combo-${Date.now()}`,
          name: `Charlie's Logic: ${selectedEvidence1.name} + ${selectedEvidence2.name}`,
          description: "A combination that only makes sense to Charlie, but somehow works in bird law.",
          image: '/evidence/charlie-logic.svg',
          category: 'document',
          relevantTo: [...selectedEvidence1.relevantTo, ...selectedEvidence2.relevantTo],
          isComboEvidence: true,
          comboComponents: [selectedEvidence1.id, selectedEvidence2.id],
          metadata: {
            birdLawRelevance: charlieCombo.logic,
            charlieLogicRating: 'pure_genius'
          }
        };

        setCombinationResult({
          success: true,
          newEvidence,
          charlieLogic: charlieCombo.logic
        });
      } else {
        setCombinationResult({
          success: false,
          charlieLogic: "These pieces of evidence don't combine in any meaningful way... even by bird law standards."
        });
      }
    }
  };

  const confirmCombination = () => {
    if (combinationResult?.success && combinationResult.newEvidence) {
      onCombinationSuccess(combinationResult.newEvidence);
      setSelectedEvidence1(null);
      setSelectedEvidence2(null);
      setCombinationResult(null);
    }
  };

  const resetCombination = () => {
    setSelectedEvidence1(null);
    setSelectedEvidence2(null);
    setCombinationResult(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-800 rounded-lg w-11/12 max-w-5xl h-5/6 overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-yellow-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lightbulb className="text-yellow-100" size={24} />
                <h2 className="text-xl font-bold text-yellow-100">Charlie's Evidence Combination Lab</h2>
              </div>
              <button
                onClick={onClose}
                className="text-yellow-100 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 h-full overflow-y-auto">
              {/* Combination Area */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Combine Evidence</h3>
                <div className="flex items-center justify-center space-x-4 mb-4">
                  {/* Evidence Slot 1 */}
                  <div className={`w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center ${
                    selectedEvidence1 ? 'border-blue-500 bg-blue-900/30' : 'border-gray-500 bg-gray-700'
                  }`}>
                    {selectedEvidence1 ? (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-600 rounded mb-2 mx-auto"></div>
                        <p className="text-xs text-white">{selectedEvidence1.name}</p>
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">Select Evidence 1</p>
                    )}
                  </div>

                  <Plus className="text-yellow-400" size={32} />

                  {/* Evidence Slot 2 */}
                  <div className={`w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center ${
                    selectedEvidence2 ? 'border-blue-500 bg-blue-900/30' : 'border-gray-500 bg-gray-700'
                  }`}>
                    {selectedEvidence2 ? (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-600 rounded mb-2 mx-auto"></div>
                        <p className="text-xs text-white">{selectedEvidence2.name}</p>
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">Select Evidence 2</p>
                    )}
                  </div>

                  <motion.button
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      selectedEvidence1 && selectedEvidence2
                        ? 'bg-yellow-600 hover:bg-yellow-500 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={attemptCombination}
                    disabled={!selectedEvidence1 || !selectedEvidence2}
                    whileHover={selectedEvidence1 && selectedEvidence2 ? { scale: 1.05 } : {}}
                    whileTap={selectedEvidence1 && selectedEvidence2 ? { scale: 0.95 } : {}}
                  >
                    <Zap className="inline mr-2" size={20} />
                    Combine!
                  </motion.button>
                </div>

                {/* Combination Result */}
                <AnimatePresence>
                  {combinationResult && (
                    <motion.div
                      className={`p-4 rounded-lg border-2 ${
                        combinationResult.success 
                          ? 'border-green-500 bg-green-900/30' 
                          : 'border-red-500 bg-red-900/30'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <h4 className={`font-semibold mb-2 ${
                        combinationResult.success ? 'text-green-300' : 'text-red-300'
                      }`}>
                        {combinationResult.success ? '🐦 Charlie\'s Genius Strikes Again!' : '❌ Combination Failed'}
                      </h4>
                      <p className="text-gray-300 italic mb-3">
                        "{combinationResult.charlieLogic}"
                      </p>
                      {combinationResult.success && (
                        <div className="flex space-x-2">
                          <button
                            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded transition-colors"
                            onClick={confirmCombination}
                          >
                            Add to Evidence
                          </button>
                          <button
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
                            onClick={resetCombination}
                          >
                            Try Again
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Evidence Selection Grid */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Available Evidence</h3>
                <div className="grid grid-cols-4 gap-3">
                  {evidence.filter(e => !e.isComboEvidence).map((evidenceItem) => (
                    <motion.div
                      key={evidenceItem.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedEvidence1?.id === evidenceItem.id || selectedEvidence2?.id === evidenceItem.id
                          ? 'border-blue-500 bg-blue-900/30'
                          : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                      }`}
                      onClick={() => {
                        if (!selectedEvidence1) {
                          handleEvidenceSelect(evidenceItem, 1);
                        } else if (!selectedEvidence2) {
                          handleEvidenceSelect(evidenceItem, 2);
                        } else {
                          handleEvidenceSelect(evidenceItem, 1);
                        }
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-full h-16 bg-gray-600 rounded mb-2"></div>
                      <h4 className="text-white font-semibold text-sm truncate">
                        {evidenceItem.name}
                      </h4>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
