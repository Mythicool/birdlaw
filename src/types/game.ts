// Core game type definitions for Bird Law!

export interface Character {
  id: string;
  name: string;
  title?: string;
  sprites: {
    neutral: string;
    happy: string;
    angry: string;
    confused: string;
    thinking: string;
    objection: string;
    smug?: string;
    defeated?: string;
    scheming?: string;
  };
  personality: 'chaotic' | 'serious' | 'sarcastic' | 'nervous' | 'arrogant' | 'narcissistic' | 'eccentric' | 'unhinged';
  wrongEvidenceReactions: {
    mild: string[];
    severe: string[];
    critical: string[];
  };
  catchphrases?: string[];
}

export interface Evidence {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'physical' | 'testimony' | 'document' | 'photo';
  relevantTo: string[]; // Array of dialogue node IDs where this evidence is relevant
  combinableWith?: string[]; // Evidence IDs this can be combined with
  isComboEvidence?: boolean; // True if this evidence was created by combining others
  comboComponents?: string[]; // Original evidence IDs used to create this combo
  unlocks?: string[]; // Evidence or dialogue nodes this evidence unlocks when presented
  metadata?: {
    location?: string;
    dateFound?: string;
    foundBy?: string;
    birdLawRelevance?: string; // Charlie's interpretation of bird law relevance
    charlieLogicRating?: 'nonsensical' | 'bizarre' | 'accidentally_brilliant' | 'pure_genius';
  };
}

export interface EvidenceCombination {
  id: string;
  evidence1Id: string;
  evidence2Id: string;
  resultEvidenceId: string;
  charlieLogic: string; // Charlie's explanation for why this combination makes sense
  difficulty: 'easy' | 'medium' | 'hard' | 'charlie_logic'; // How obvious the combination is
}

export interface DialogueChoice {
  id: string;
  text: string;
  nextNodeId: string;
  requiresEvidence?: string; // Evidence ID required to unlock this choice
  requiresCombinedEvidence?: string[]; // Multiple evidence IDs required
  characterReaction?: 'positive' | 'negative' | 'neutral' | 'confused' | 'impressed' | 'outraged';
  unlocks?: string[]; // Evidence or dialogue nodes this choice unlocks
  healthChange?: number; // Direct health modification for this choice
  charlieLogicBonus?: boolean; // If true, Charlie's bizarre logic actually works
}

export interface DialogueNode {
  id: string;
  characterId: string;
  text: string;
  emotion: keyof Character['sprites'];
  choices?: DialogueChoice[];
  isEvidencePresentation?: boolean; // If true, player can present evidence
  acceptedEvidence?: string[]; // Evidence IDs that are accepted at this node
  wrongEvidencePenalty?: number; // Health/confidence penalty for wrong evidence
  nextNodeId?: string; // Auto-advance to next node if no choices
  flags?: {
    isObjection?: boolean;
    isTestimony?: boolean;
    isCrossExamination?: boolean;
    isVerdict?: boolean;
  };
}

export interface DialogueTree {
  id: string;
  title: string;
  description: string;
  startNodeId: string;
  nodes: Record<string, DialogueNode>;
  characters: Record<string, Character>;
  requiredEvidence?: string[]; // Evidence needed to complete this dialogue tree
}

export interface GameState {
  currentDialogueTreeId: string;
  currentNodeId: string;
  evidence: Evidence[];
  unlockedEvidence: string[];
  health: number; // Player's confidence/health (like Phoenix Wright)
  maxHealth: number;
  flags: Record<string, boolean>; // Story flags
  completedDialogueTrees: string[];
  currentCase: string;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  phases: {
    investigation: DialogueTree[];
    trial: DialogueTree[];
  };
  evidence: Evidence[];
  characters: Character[];
  victoryConditions: string[];
}

// Charlie's Bird Law Expertise Levels
export type BirdLawExpertise = 
  | 'novice' // "I'm not saying I'm an expert..."
  | 'intermediate' // "I've been studying bird law for years"
  | 'expert' // "Bird law in this country is not governed by reason"
  | 'master'; // "I am the foremost expert in bird law"

export interface CharlieLogic {
  confidence: BirdLawExpertise;
  reasoning: string;
  actualAccuracy: 'completely_wrong' | 'accidentally_right' | 'surprisingly_accurate';
}
