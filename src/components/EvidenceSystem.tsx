'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Evidence } from '@/types/game';
import { useGameStore } from '@/store/gameStore';
import { Search, X, Eye } from 'lucide-react';

interface EvidenceSystemProps {
  isOpen: boolean;
  onClose: () => void;
  onEvidenceSelect: (evidence: Evidence) => void;
  mode: 'inventory' | 'presentation'; // inventory for viewing, presentation for selecting
}

export const EvidenceSystem: React.FC<EvidenceSystemProps> = ({
  isOpen,
  onClose,
  onEvidenceSelect,
  mode
}) => {
  const { evidence } = useGameStore();
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvidence = evidence.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEvidenceClick = (evidenceItem: Evidence) => {
    if (mode === 'presentation') {
      onEvidenceSelect(evidenceItem);
      onClose();
    } else {
      setSelectedEvidence(evidenceItem);
    }
  };

  const getCategoryColor = (category: Evidence['category']) => {
    switch (category) {
      case 'physical': return 'bg-amber-500';
      case 'testimony': return 'bg-blue-500';
      case 'document': return 'bg-green-500';
      case 'photo': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: Evidence['category']) => {
    switch (category) {
      case 'physical': return '🔍';
      case 'testimony': return '💬';
      case 'document': return '📄';
      case 'photo': return '📸';
      default: return '❓';
    }
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
            className="bg-gray-800 rounded-lg w-11/12 max-w-4xl h-5/6 overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gray-700 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {mode === 'presentation' ? 'Present Evidence' : 'Evidence Inventory'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex h-full">
              {/* Evidence List */}
              <div className="w-1/2 p-4 border-r border-gray-600">
                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search evidence..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Evidence Grid */}
                <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-96">
                  {filteredEvidence.map((evidenceItem) => (
                    <motion.div
                      key={evidenceItem.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedEvidence?.id === evidenceItem.id
                          ? 'border-blue-500 bg-blue-900/30'
                          : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                      }`}
                      onClick={() => handleEvidenceClick(evidenceItem)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Category Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded text-xs text-white ${getCategoryColor(evidenceItem.category)}`}>
                          {getCategoryIcon(evidenceItem.category)} {evidenceItem.category}
                        </span>
                        {mode === 'inventory' && (
                          <Eye size={16} className="text-gray-400" />
                        )}
                      </div>

                      {/* Evidence Image */}
                      <div className="w-full h-20 bg-gray-600 rounded mb-2 flex items-center justify-center">
                        {evidenceItem.image ? (
                          <img 
                            src={evidenceItem.image} 
                            alt={evidenceItem.name}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <span className="text-gray-400 text-2xl">
                            {getCategoryIcon(evidenceItem.category)}
                          </span>
                        )}
                      </div>

                      {/* Evidence Name */}
                      <h3 className="text-white font-semibold text-sm truncate">
                        {evidenceItem.name}
                      </h3>
                    </motion.div>
                  ))}
                </div>

                {filteredEvidence.length === 0 && (
                  <div className="text-center text-gray-400 mt-8">
                    <p>No evidence found</p>
                    {searchTerm && (
                      <p className="text-sm mt-2">Try a different search term</p>
                    )}
                  </div>
                )}
              </div>

              {/* Evidence Details */}
              <div className="w-1/2 p-4">
                {selectedEvidence ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="h-full"
                  >
                    {/* Evidence Image */}
                    <div className="w-full h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                      {selectedEvidence.image ? (
                        <img 
                          src={selectedEvidence.image} 
                          alt={selectedEvidence.name}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-400 text-6xl">
                          {getCategoryIcon(selectedEvidence.category)}
                        </span>
                      )}
                    </div>

                    {/* Evidence Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {selectedEvidence.name}
                        </h3>
                        <span className={`px-3 py-1 rounded text-sm text-white ${getCategoryColor(selectedEvidence.category)}`}>
                          {getCategoryIcon(selectedEvidence.category)} {selectedEvidence.category}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-300 mb-2">Description</h4>
                        <p className="text-gray-400 leading-relaxed">
                          {selectedEvidence.description}
                        </p>
                      </div>

                      {/* Charlie's Bird Law Analysis */}
                      {selectedEvidence.metadata?.birdLawRelevance && (
                        <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-3">
                          <h4 className="text-lg font-semibold text-yellow-300 mb-2">
                            🐦 Charlie's Bird Law Analysis
                          </h4>
                          <p className="text-yellow-200 text-sm italic">
                            "{selectedEvidence.metadata.birdLawRelevance}"
                          </p>
                        </div>
                      )}

                      {/* Metadata */}
                      {selectedEvidence.metadata && (
                        <div className="space-y-2">
                          {selectedEvidence.metadata.location && (
                            <p className="text-sm text-gray-400">
                              <span className="font-semibold">Location:</span> {selectedEvidence.metadata.location}
                            </p>
                          )}
                          {selectedEvidence.metadata.dateFound && (
                            <p className="text-sm text-gray-400">
                              <span className="font-semibold">Date Found:</span> {selectedEvidence.metadata.dateFound}
                            </p>
                          )}
                          {selectedEvidence.metadata.foundBy && (
                            <p className="text-sm text-gray-400">
                              <span className="font-semibold">Found By:</span> {selectedEvidence.metadata.foundBy}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Present Button for presentation mode */}
                    {mode === 'presentation' && (
                      <motion.button
                        className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
                        onClick={() => handleEvidenceClick(selectedEvidence)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Present This Evidence
                      </motion.button>
                    )}
                  </motion.div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Eye size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Select evidence to view details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
