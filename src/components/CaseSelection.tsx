'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Case } from '@/types/game';
import { Scale, FileText, Users, CheckCircle } from 'lucide-react';

interface CaseSelectionProps {
  cases: Case[];
  completedCases: string[];
  onCaseSelect: (selectedCase: Case) => void;
  onBack: () => void;
}

export const CaseSelection: React.FC<CaseSelectionProps> = ({
  cases,
  completedCases,
  onCaseSelect,
  onBack
}) => {
  const getCaseIcon = (caseId: string) => {
    switch (caseId) {
      case 'case-001': return '🌰'; // Bird seed case
      case 'pigeon-property-case': return '🏠'; // Property case
      case 'bird-flu-case': return '🏥'; // Health case
      case 'seagull-harassment-case': return '🏖️'; // Beach case
      default: return '⚖️';
    }
  };

  const getDifficultyColor = (caseId: string) => {
    switch (caseId) {
      case 'case-001': return 'bg-green-600'; // Easy
      case 'pigeon-property-case': return 'bg-yellow-600'; // Medium
      case 'bird-flu-case': return 'bg-orange-600'; // Hard
      case 'seagull-harassment-case': return 'bg-red-600'; // Expert
      default: return 'bg-gray-600';
    }
  };

  const getDifficultyText = (caseId: string) => {
    switch (caseId) {
      case 'case-001': return 'Beginner';
      case 'pigeon-property-case': return 'Intermediate';
      case 'bird-flu-case': return 'Advanced';
      case 'seagull-harassment-case': return 'Expert';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-300 p-8">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-5xl font-bold text-amber-900 mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            🐦 Charlie's Case Files 🐦
          </motion.h1>
          <motion.p 
            className="text-xl text-amber-800 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Select a case to demonstrate your bird law expertise
          </motion.p>
          
          <motion.button
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            onClick={onBack}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Main Menu
          </motion.button>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((caseItem, index) => {
            const isCompleted = completedCases.includes(caseItem.id);
            
            return (
              <motion.div
                key={caseItem.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  isCompleted 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-amber-300 hover:border-amber-500 hover:shadow-xl'
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCaseSelect(caseItem)}
              >
                {/* Case Header */}
                <div className={`p-4 text-white ${getDifficultyColor(caseItem.id)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{getCaseIcon(caseItem.id)}</span>
                      <div>
                        <h3 className="text-lg font-bold">{caseItem.title}</h3>
                        <p className="text-sm opacity-90">{getDifficultyText(caseItem.id)} Level</p>
                      </div>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="text-green-200" size={24} />
                    )}
                  </div>
                </div>

                {/* Case Content */}
                <div className="p-6">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {caseItem.description}
                  </p>

                  {/* Case Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <Scale className="mx-auto mb-1 text-amber-600" size={20} />
                      <p className="text-xs text-gray-600">Evidence</p>
                      <p className="font-semibold text-amber-800">{caseItem.evidence.length}</p>
                    </div>
                    <div className="text-center">
                      <Users className="mx-auto mb-1 text-amber-600" size={20} />
                      <p className="text-xs text-gray-600">Characters</p>
                      <p className="font-semibold text-amber-800">{caseItem.characters.length}</p>
                    </div>
                    <div className="text-center">
                      <FileText className="mx-auto mb-1 text-amber-600" size={20} />
                      <p className="text-xs text-gray-600">Phases</p>
                      <p className="font-semibold text-amber-800">
                        {caseItem.phases.investigation.length + caseItem.phases.trial.length}
                      </p>
                    </div>
                  </div>

                  {/* Victory Conditions */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Victory Conditions:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {caseItem.victoryConditions.slice(0, 3).map((condition, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                          {condition}
                        </li>
                      ))}
                      {caseItem.victoryConditions.length > 3 && (
                        <li className="text-xs text-gray-500 italic">
                          +{caseItem.victoryConditions.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      isCompleted
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isCompleted ? 'Play Again' : 'Start Case'}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charlie's Wisdom */}
        <motion.div 
          className="mt-12 text-center bg-yellow-100 border-2 border-yellow-400 rounded-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <h3 className="text-lg font-bold text-yellow-800 mb-2">Charlie's Legal Advice</h3>
          <p className="text-yellow-700 italic">
            "Remember, bird law is not governed by reason, but by passion, dedication, and an 
            understanding of our feathered friends' constitutional rights!"
          </p>
          <p className="text-sm text-yellow-600 mt-2">- Charlie Kelly, Esq. (Self-Certified)</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
