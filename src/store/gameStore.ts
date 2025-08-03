import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, Evidence, DialogueTree, Character, Case, EvidenceCombination } from '@/types/game';

interface GameStore extends GameState {
  // Actions
  setCurrentDialogue: (treeId: string, nodeId: string) => void;
  addEvidence: (evidence: Evidence) => void;
  unlockEvidence: (evidenceId: string) => void;
  takeDamage: (amount: number) => void;
  heal: (amount: number) => void;
  setFlag: (flag: string, value: boolean) => void;
  completeDialogueTree: (treeId: string) => void;
  resetGame: () => void;

  // Evidence combination actions
  combineEvidence: (evidence1: Evidence, evidence2: Evidence, result: Evidence) => void;
  getAvailableCombinations: () => EvidenceCombination[];

  // Enhanced character reactions
  triggerCharacterReaction: (characterId: string, reactionType: 'mild' | 'severe' | 'critical') => string;

  // Game data
  currentDialogueTree: DialogueTree | null;
  currentCharacter: Character | null;
  currentCase: Case | null;
  availableCombinations: EvidenceCombination[];

  // Setters for game data
  setDialogueTree: (tree: DialogueTree) => void;
  setCharacter: (character: Character) => void;
  setCase: (gameCase: Case) => void;
  setAvailableCombinations: (combinations: EvidenceCombination[]) => void;
}

const initialState: GameState = {
  currentDialogueTreeId: '',
  currentNodeId: '',
  evidence: [],
  unlockedEvidence: [],
  health: 100,
  maxHealth: 100,
  flags: {},
  completedDialogueTrees: [],
  currentCase: '',
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      currentDialogueTree: null,
      currentCharacter: null,
      currentCase: null,
      availableCombinations: [],

      setCurrentDialogue: (treeId: string, nodeId: string) =>
        set({ currentDialogueTreeId: treeId, currentNodeId: nodeId }),

      addEvidence: (evidence: Evidence) =>
        set((state) => ({
          evidence: [...state.evidence.filter(e => e.id !== evidence.id), evidence],
          unlockedEvidence: [...state.unlockedEvidence, evidence.id],
        })),

      unlockEvidence: (evidenceId: string) =>
        set((state) => ({
          unlockedEvidence: [...new Set([...state.unlockedEvidence, evidenceId])],
        })),

      takeDamage: (amount: number) =>
        set((state) => ({
          health: Math.max(0, state.health - amount),
        })),

      heal: (amount: number) =>
        set((state) => ({
          health: Math.min(state.maxHealth, state.health + amount),
        })),

      setFlag: (flag: string, value: boolean) =>
        set((state) => ({
          flags: { ...state.flags, [flag]: value },
        })),

      completeDialogueTree: (treeId: string) =>
        set((state) => ({
          completedDialogueTrees: [...new Set([...state.completedDialogueTrees, treeId])],
        })),

      combineEvidence: (evidence1: Evidence, evidence2: Evidence, result: Evidence) =>
        set((state) => ({
          evidence: [...state.evidence, result],
          unlockedEvidence: [...state.unlockedEvidence, result.id],
        })),

      getAvailableCombinations: () => get().availableCombinations,

      triggerCharacterReaction: (characterId: string, reactionType: 'mild' | 'severe' | 'critical') => {
        const state = get();
        const character = state.currentDialogueTree?.characters[characterId];
        if (character?.wrongEvidenceReactions) {
          const reactions = character.wrongEvidenceReactions[reactionType];
          return reactions[Math.floor(Math.random() * reactions.length)];
        }
        return "That doesn't seem right...";
      },

      resetGame: () =>
        set({
          ...initialState,
          currentDialogueTree: null,
          currentCharacter: null,
          currentCase: null,
          availableCombinations: [],
        }),

      setDialogueTree: (tree: DialogueTree) =>
        set({ currentDialogueTree: tree }),

      setCharacter: (character: Character) =>
        set({ currentCharacter: character }),

      setCase: (gameCase: Case) =>
        set({ currentCase: gameCase }),

      setAvailableCombinations: (combinations: EvidenceCombination[]) =>
        set({ availableCombinations: combinations }),
    }),
    {
      name: 'bird-law-game-storage',
      partialize: (state) => ({
        currentDialogueTreeId: state.currentDialogueTreeId,
        currentNodeId: state.currentNodeId,
        evidence: state.evidence,
        unlockedEvidence: state.unlockedEvidence,
        health: state.health,
        maxHealth: state.maxHealth,
        flags: state.flags,
        completedDialogueTrees: state.completedDialogueTrees,
        currentCase: state.currentCase,
      }),
    }
  )
);
