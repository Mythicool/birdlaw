import { Character, Evidence, DialogueTree, DialogueNode, Case, EvidenceCombination } from '@/types/game';
import { characters } from './sampleData';

// Evidence for Pigeon Property Rights Case
export const pigeonCaseEvidence: Evidence[] = [
  {
    id: 'pigeon-droppings',
    name: 'Pigeon Droppings Sample',
    description: 'Fresh pigeon droppings found on the disputed property. Clear evidence of pigeon habitation.',
    image: '/evidence/pigeon-droppings.svg',
    category: 'physical',
    relevantTo: ['pigeon-habitation', 'property-evidence'],
    combinableWith: ['property-deed'],
    metadata: {
      location: 'Disputed Rooftop',
      dateFound: 'Monday Morning',
      foundBy: 'Charlie Kelly',
      birdLawRelevance: 'Under the Avian Homestead Act, droppings establish territorial claims.',
      charlieLogicRating: 'accidentally_brilliant'
    }
  },
  {
    id: 'property-deed',
    name: 'Property Deed',
    description: 'Legal document showing ownership of the building. Makes no mention of bird rights.',
    image: '/evidence/property-deed.svg',
    category: 'document',
    relevantTo: ['legal-ownership', 'property-dispute'],
    combinableWith: ['pigeon-droppings', 'bird-law-precedent'],
    metadata: {
      location: 'City Hall',
      dateFound: 'Tuesday',
      foundBy: 'Dennis Reynolds',
      birdLawRelevance: 'Human property law conflicts with established bird law precedent.',
    }
  },
  {
    id: 'pigeon-nest',
    name: 'Pigeon Nest',
    description: 'A well-constructed pigeon nest with eggs. Shows long-term habitation.',
    image: '/evidence/pigeon-nest.svg',
    category: 'physical',
    relevantTo: ['pigeon-habitation', 'nesting-rights'],
    unlocks: ['pigeon-family-testimony'],
    metadata: {
      location: 'Building Eaves',
      dateFound: 'Monday',
      foundBy: 'Charlie Kelly',
      birdLawRelevance: 'Nesting rights are sacred in bird law. This is basically pigeon real estate.',
      charlieLogicRating: 'pure_genius'
    }
  },
  {
    id: 'eviction-notice',
    name: 'Pigeon Eviction Notice',
    description: 'A notice posted by the property developer demanding pigeons vacate the premises.',
    image: '/evidence/eviction-notice.svg',
    category: 'document',
    relevantTo: ['illegal-eviction', 'bird-rights-violation'],
    metadata: {
      location: 'Building Entrance',
      dateFound: 'Wednesday',
      foundBy: 'The Waitress',
      birdLawRelevance: 'You cannot evict birds without proper bird court proceedings!',
    }
  },
  {
    id: 'bird-law-precedent',
    name: 'Bird Law Precedent',
    description: 'Charlie\'s research on historical bird law cases. Mostly illegible but passionate.',
    image: '/evidence/bird-law-precedent.svg',
    category: 'document',
    relevantTo: ['legal-precedent', 'charlie-expertise'],
    combinableWith: ['property-deed'],
    metadata: {
      location: 'Charlie\'s Apartment',
      dateFound: 'Sunday',
      foundBy: 'Charlie Kelly',
      birdLawRelevance: 'The case of Pigeon vs. City Hall, 1987. Pigeons won by default when the judge fell asleep.',
      charlieLogicRating: 'bizarre'
    }
  }
];

// Evidence combinations for pigeon case
export const pigeonCaseCombinations: EvidenceCombination[] = [
  {
    id: 'droppings-deed-combo',
    evidence1Id: 'pigeon-droppings',
    evidence2Id: 'property-deed',
    resultEvidenceId: 'territorial-claim-evidence',
    charlieLogic: 'The droppings prove the pigeons were here first! Property law doesn\'t override bird law!',
    difficulty: 'charlie_logic'
  },
  {
    id: 'precedent-deed-combo',
    evidence1Id: 'bird-law-precedent',
    evidence2Id: 'property-deed',
    resultEvidenceId: 'legal-conflict-evidence',
    charlieLogic: 'This creates a legal paradox! Human law vs. bird law! The birds have precedent!',
    difficulty: 'medium'
  }
];

// Dialogue nodes for Pigeon Property Rights Case
const pigeonDialogueNodes: Record<string, DialogueNode> = {
  'pigeon-case-intro': {
    id: 'pigeon-case-intro',
    characterId: 'charlie',
    text: 'Your Honor, we are here today to address a grave injustice against the pigeon community. These noble birds have established a rightful claim to their roost, and now some developer wants to kick them out without due process!',
    emotion: 'objection',
    choices: [
      {
        id: 'present-nest-evidence',
        text: 'Present the pigeon nest as evidence of habitation',
        nextNodeId: 'nest-presentation',
        requiresEvidence: 'pigeon-nest',
        characterReaction: 'positive',
        healthChange: 5
      },
      {
        id: 'cite-bird-law',
        text: 'Cite bird law precedent for nesting rights',
        nextNodeId: 'bird-law-lecture',
        requiresEvidence: 'bird-law-precedent',
        characterReaction: 'impressed'
      },
      {
        id: 'question-developer',
        text: 'Question the developer about the eviction notice',
        nextNodeId: 'developer-questioning',
        characterReaction: 'neutral'
      }
    ]
  },
  'nest-presentation': {
    id: 'nest-presentation',
    characterId: 'charlie',
    text: 'As you can see, Your Honor, this nest represents months of careful construction. These pigeons have invested time, energy, and... pigeon sweat into building their home. You can\'t just tear down someone\'s house!',
    emotion: 'thinking',
    nextNodeId: 'dennis-objects'
  },
  'dennis-objects': {
    id: 'dennis-objects',
    characterId: 'dennis',
    text: 'OBJECTION! Your Honor, pigeons are not people! They don\'t have property rights! This is absurd, even for Charlie. I am a five-star lawyer, and I know the law!',
    emotion: 'objection',
    flags: { isObjection: true },
    choices: [
      {
        id: 'counter-objection',
        text: 'Counter with bird law constitutional rights',
        nextNodeId: 'charlie-counter',
        charlieLogicBonus: true,
        characterReaction: 'outraged'
      },
      {
        id: 'present-droppings',
        text: 'Present pigeon droppings as territorial evidence',
        nextNodeId: 'droppings-evidence',
        requiresEvidence: 'pigeon-droppings',
        characterReaction: 'confused'
      }
    ]
  },
  'charlie-counter': {
    id: 'charlie-counter',
    characterId: 'charlie',
    text: 'OBJECTION TO YOUR OBJECTION! The Constitution clearly states that all creatures have the right to life, liberty, and the pursuit of happiness! These pigeons are pursuing happiness through quality nesting!',
    emotion: 'objection',
    flags: { isObjection: true },
    nextNodeId: 'judge-confused'
  },
  'judge-confused': {
    id: 'judge-confused',
    characterId: 'judge',
    text: 'Mr. Kelly, I don\'t think the Constitution applies to... pigeons. But your passion is... noted. Mr. Reynolds, please continue.',
    emotion: 'confused',
    nextNodeId: 'dennis-smugness'
  },
  'dennis-smugness': {
    id: 'dennis-smugness',
    characterId: 'dennis',
    text: 'Thank you, Your Honor. As I was saying, this is a simple matter of property law. My client owns the building, therefore he owns everything on it, including any... bird constructions.',
    emotion: 'smug',
    choices: [
      {
        id: 'challenge-ownership',
        text: 'Challenge the concept of ownership over living beings',
        nextNodeId: 'ownership-challenge',
        charlieLogicBonus: true
      },
      {
        id: 'present-eviction-notice',
        text: 'Present the illegal eviction notice',
        nextNodeId: 'eviction-evidence',
        requiresEvidence: 'eviction-notice',
        characterReaction: 'negative'
      }
    ]
  },
  'ownership-challenge': {
    id: 'ownership-challenge',
    characterId: 'charlie',
    text: 'Your Honor, you can\'t own a living creature\'s home! That\'s like... like slavery, but for birds! These pigeons have established squatter\'s rights through continuous habitation!',
    emotion: 'angry',
    nextNodeId: 'frank-testimony'
  },
  'frank-testimony': {
    id: 'frank-testimony',
    characterId: 'frank',
    text: 'I seen them pigeons! They been there longer than most of the tenants! Hell, I tried to charge them rent once, but they just cooed at me. Seemed fair.',
    emotion: 'confused',
    choices: [
      {
        id: 'follow-up-frank',
        text: 'Ask Frank about pigeon tenant rights',
        nextNodeId: 'frank-tenant-rights',
        characterReaction: 'positive'
      },
      {
        id: 'object-to-frank',
        text: 'Object to Frank\'s unreliable testimony',
        nextNodeId: 'frank-objection',
        characterReaction: 'negative',
        healthChange: -5
      }
    ]
  },
  'frank-tenant-rights': {
    id: 'frank-tenant-rights',
    characterId: 'frank',
    text: 'Well, they never missed a payment... mostly because I never figured out how to collect from pigeons. But they kept the place clean! Well, except for the droppings, but that\'s just... bird rent.',
    emotion: 'thinking',
    nextNodeId: 'waitress-testimony'
  },
  'waitress-testimony': {
    id: 'waitress-testimony',
    characterId: 'waitress',
    text: 'Look, I work near that building, and those pigeons have been there for months. They\'re actually pretty well-behaved compared to... some people I know.',
    emotion: 'sarcastic',
    choices: [
      {
        id: 'ask-about-behavior',
        text: 'Ask about the pigeons\' good behavior',
        nextNodeId: 'pigeon-behavior',
        characterReaction: 'neutral'
      },
      {
        id: 'cross-examine-waitress',
        text: 'Cross-examine about pigeon interactions',
        nextNodeId: 'waitress-cross-exam',
        characterReaction: 'negative'
      }
    ]
  },
  'pigeon-behavior': {
    id: 'pigeon-behavior',
    characterId: 'waitress',
    text: 'They don\'t harass customers, they clean up after themselves mostly, and they\'ve never once stalked me or left weird notes. They\'re model citizens compared to certain... bird law experts.',
    emotion: 'sarcastic',
    nextNodeId: 'case-climax'
  },
  'case-climax': {
    id: 'case-climax',
    characterId: 'charlie',
    text: 'Your Honor, the evidence is clear! These pigeons have established residency, they\'re good tenants, and they have constitutional rights under bird law! I move for a dismissal of all eviction proceedings!',
    emotion: 'objection',
    isEvidencePresentation: true,
    acceptedEvidence: ['territorial-claim-evidence', 'pigeon-nest', 'bird-law-precedent'],
    choices: [
      {
        id: 'final-argument',
        text: 'Make final argument for pigeon rights',
        nextNodeId: 'victory-ending',
        charlieLogicBonus: true
      },
      {
        id: 'compromise-solution',
        text: 'Propose a compromise solution',
        nextNodeId: 'compromise-ending',
        characterReaction: 'positive'
      }
    ]
  },
  'victory-ending': {
    id: 'victory-ending',
    characterId: 'judge',
    text: 'Well... Mr. Kelly, your arguments are unconventional, but your passion for... bird law... is undeniable. I hereby grant the pigeons continued residency rights. Case dismissed.',
    emotion: 'thinking',
    nextNodeId: 'charlie-celebration'
  },
  'charlie-celebration': {
    id: 'charlie-celebration',
    characterId: 'charlie',
    text: 'YES! Another victory for bird law! The pigeons can keep their home, and justice has been served! Bird law prevails again!',
    emotion: 'happy',
    flags: { isVerdict: true }
  }
};

// Pigeon Property Rights Case
export const pigeonPropertyCase: Case = {
  id: 'pigeon-property-case',
  title: 'The Pigeon Property Rights Dispute',
  description: 'Charlie defends a family of pigeons facing eviction from their longtime roost.',
  phases: {
    investigation: [{
      id: 'pigeon-investigation',
      title: 'Investigating the Pigeon Eviction',
      description: 'Gather evidence about the pigeons\' rightful claim to their home.',
      startNodeId: 'pigeon-case-intro',
      nodes: pigeonDialogueNodes,
      characters,
      requiredEvidence: ['pigeon-nest', 'pigeon-droppings']
    }],
    trial: [{
      id: 'pigeon-trial',
      title: 'The Pigeon Rights Trial',
      description: 'Defend the pigeons\' constitutional rights in court.',
      startNodeId: 'pigeon-case-intro',
      nodes: pigeonDialogueNodes,
      characters,
      requiredEvidence: ['pigeon-nest', 'bird-law-precedent']
    }]
  },
  evidence: pigeonCaseEvidence,
  characters: Object.values(characters),
  victoryConditions: [
    'Successfully present pigeon nest evidence',
    'Establish bird law precedent',
    'Prove pigeon territorial rights',
    'Achieve victory or compromise ending'
  ]
};

// Evidence for Bird Flu Case
export const birdFluCaseEvidence: Evidence[] = [
  {
    id: 'health-report',
    name: 'Health Inspector\'s Report',
    description: 'Official report claiming Charlie\'s bird law practice poses a public health risk.',
    image: '/evidence/health-report.svg',
    category: 'document',
    relevantTo: ['health-claims', 'inspector-testimony'],
    combinableWith: ['charlie-credentials'],
    metadata: {
      location: 'Health Department',
      dateFound: 'Thursday',
      foundBy: 'Dennis Reynolds',
      birdLawRelevance: 'This report is clearly biased against bird law practitioners!',
    }
  },
  {
    id: 'charlie-credentials',
    name: 'Charlie\'s Bird Law Credentials',
    description: 'Charlie\'s self-made certificate in bird law. Crayon on construction paper.',
    image: '/evidence/charlie-credentials.svg',
    category: 'document',
    relevantTo: ['charlie-expertise', 'legal-standing'],
    combinableWith: ['health-report', 'bird-behavior-study'],
    metadata: {
      location: 'Charlie\'s Apartment',
      dateFound: 'Monday',
      foundBy: 'Charlie Kelly',
      birdLawRelevance: 'This proves I\'m qualified to practice bird law! I made it myself!',
      charlieLogicRating: 'pure_genius'
    }
  },
  {
    id: 'bird-behavior-study',
    name: 'Charlie\'s Bird Behavior Study',
    description: 'Extensive notes on bird behavior. Mostly observations of pigeons eating garbage.',
    image: '/evidence/bird-study.svg',
    category: 'document',
    relevantTo: ['scientific-evidence', 'bird-expertise'],
    combinableWith: ['charlie-credentials'],
    unlocks: ['expert-testimony'],
    metadata: {
      location: 'Paddy\'s Pub',
      dateFound: 'Tuesday',
      foundBy: 'Mac',
      birdLawRelevance: 'This proves birds are not disease vectors! They\'re just... hungry.',
      charlieLogicRating: 'accidentally_brilliant'
    }
  },
  {
    id: 'conspiracy-evidence',
    name: 'Anti-Bird Law Conspiracy',
    description: 'Charlie\'s evidence of a conspiracy against bird law practitioners. Red string included.',
    image: '/evidence/conspiracy-board.svg',
    category: 'document',
    relevantTo: ['conspiracy-theory', 'persecution-claims'],
    metadata: {
      location: 'Charlie\'s Apartment Wall',
      dateFound: 'Sunday',
      foundBy: 'Charlie Kelly',
      birdLawRelevance: 'They\'re trying to silence bird law because it threatens the establishment!',
      charlieLogicRating: 'bizarre'
    }
  },
  {
    id: 'bird-flu-research',
    name: 'Actual Bird Flu Research',
    description: 'Real scientific research about bird flu. Contradicts the health inspector\'s claims.',
    image: '/evidence/real-research.svg',
    category: 'document',
    relevantTo: ['scientific-rebuttal', 'expert-evidence'],
    metadata: {
      location: 'Library',
      dateFound: 'Wednesday',
      foundBy: 'The Waitress',
      birdLawRelevance: 'This proves the health inspector doesn\'t know what he\'s talking about!',
    }
  }
];

// Bird Flu Case dialogue nodes
const birdFluDialogueNodes: Record<string, DialogueNode> = {
  'bird-flu-intro': {
    id: 'bird-flu-intro',
    characterId: 'charlie',
    text: 'Your Honor, I stand before you today as a victim of persecution! The health inspector claims my bird law practice is dangerous, but this is clearly a conspiracy to silence the truth about bird rights!',
    emotion: 'objection',
    choices: [
      {
        id: 'present-credentials',
        text: 'Present your bird law credentials',
        nextNodeId: 'credentials-presentation',
        requiresEvidence: 'charlie-credentials',
        characterReaction: 'confused'
      },
      {
        id: 'expose-conspiracy',
        text: 'Expose the anti-bird law conspiracy',
        nextNodeId: 'conspiracy-theory',
        requiresEvidence: 'conspiracy-evidence',
        charlieLogicBonus: true
      },
      {
        id: 'challenge-inspector',
        text: 'Challenge the health inspector\'s qualifications',
        nextNodeId: 'inspector-challenge',
        characterReaction: 'positive'
      }
    ]
  },
  'credentials-presentation': {
    id: 'credentials-presentation',
    characterId: 'charlie',
    text: 'As you can see, Your Honor, I am fully certified in bird law! I spent weeks creating this certificate, and it clearly states that I am an expert in all matters avian!',
    emotion: 'thinking',
    nextNodeId: 'dennis-mocks-credentials'
  },
  'dennis-mocks-credentials': {
    id: 'dennis-mocks-credentials',
    characterId: 'dennis',
    text: 'Your Honor, this "credential" is written in crayon on construction paper! This is not a real certification! Charlie has no actual qualifications in anything, let alone bird law!',
    emotion: 'smug',
    choices: [
      {
        id: 'defend-credentials',
        text: 'Defend the validity of self-certification',
        nextNodeId: 'self-certification-defense',
        charlieLogicBonus: true
      },
      {
        id: 'present-study',
        text: 'Present your bird behavior study',
        nextNodeId: 'study-presentation',
        requiresEvidence: 'bird-behavior-study',
        characterReaction: 'impressed'
      }
    ]
  },
  'self-certification-defense': {
    id: 'self-certification-defense',
    characterId: 'charlie',
    text: 'Your Honor, who better to certify someone in bird law than someone who truly understands birds? The government doesn\'t offer bird law degrees because they\'re afraid of the truth!',
    emotion: 'angry',
    nextNodeId: 'inspector-testimony'
  },
  'inspector-testimony': {
    id: 'inspector-testimony',
    characterId: 'artemis',
    text: 'As the health inspector, I must say that Mr. Kelly\'s... interactions with birds pose a significant public health risk. He talks to pigeons, feeds them by hand, and claims they give him legal advice.',
    emotion: 'serious',
    choices: [
      {
        id: 'cross-examine-inspector',
        text: 'Cross-examine about bird flu knowledge',
        nextNodeId: 'inspector-cross-exam',
        characterReaction: 'negative'
      },
      {
        id: 'present-real-research',
        text: 'Present actual bird flu research',
        nextNodeId: 'research-presentation',
        requiresEvidence: 'bird-flu-research',
        characterReaction: 'positive'
      }
    ]
  },
  'research-presentation': {
    id: 'research-presentation',
    characterId: 'charlie',
    text: 'Your Honor, this real scientific research proves that bird flu transmission requires specific conditions that don\'t apply to my bird law practice! The inspector is fear-mongering!',
    emotion: 'objection',
    nextNodeId: 'waitress-support'
  },
  'waitress-support': {
    id: 'waitress-support',
    characterId: 'waitress',
    text: 'Look, I hate to admit this, but Charlie actually found legitimate research. The health inspector\'s claims are... well, they\'re wrong. I can\'t believe I\'m saying this.',
    emotion: 'confused',
    nextNodeId: 'cricket-testimony'
  },
  'cricket-testimony': {
    id: 'cricket-testimony',
    characterId: 'cricket',
    text: 'Charlie\'s been talking to birds for years, and I\'ve never seen him get sick! Well, sicker than usual. The birds seem to like him. They tell me things sometimes...',
    emotion: 'thinking',
    choices: [
      {
        id: 'follow-cricket-testimony',
        text: 'Ask Cricket about bird communications',
        nextNodeId: 'cricket-bird-talk',
        charlieLogicBonus: true
      },
      {
        id: 'redirect-to-facts',
        text: 'Redirect to factual evidence',
        nextNodeId: 'factual-argument',
        characterReaction: 'positive'
      }
    ]
  },
  'cricket-bird-talk': {
    id: 'cricket-bird-talk',
    characterId: 'cricket',
    text: 'The pigeons told me Charlie understands them better than most humans understand each other. They respect him. They wouldn\'t make him sick - that would be... impolite.',
    emotion: 'confused',
    nextNodeId: 'frank-supports'
  },
  'frank-supports': {
    id: 'frank-supports',
    characterId: 'frank',
    text: 'I seen Charlie with them birds! He\'s like a bird whisperer! And he ain\'t never gotten me sick, and I\'ve eaten things that would kill a horse!',
    emotion: 'happy',
    nextNodeId: 'case-climax-flu'
  },
  'case-climax-flu': {
    id: 'case-climax-flu',
    characterId: 'charlie',
    text: 'Your Honor, the evidence is clear! I am a qualified bird law practitioner, the health risks are exaggerated, and this is clearly an attempt to suppress bird law! I demand vindication!',
    emotion: 'objection',
    isEvidencePresentation: true,
    acceptedEvidence: ['charlie-credentials', 'bird-flu-research', 'bird-behavior-study'],
    choices: [
      {
        id: 'demand-vindication',
        text: 'Demand complete vindication',
        nextNodeId: 'victory-flu-ending',
        charlieLogicBonus: true
      },
      {
        id: 'accept-oversight',
        text: 'Accept minimal health oversight',
        nextNodeId: 'compromise-flu-ending',
        characterReaction: 'positive'
      }
    ]
  },
  'victory-flu-ending': {
    id: 'victory-flu-ending',
    characterId: 'judge',
    text: 'Mr. Kelly, while your methods are... unconventional, the evidence suggests your bird law practice poses no significant health risk. The health inspector\'s claims are dismissed.',
    emotion: 'thinking',
    nextNodeId: 'charlie-vindication'
  },
  'charlie-vindication': {
    id: 'charlie-vindication',
    characterId: 'charlie',
    text: 'YES! Bird law is vindicated! The conspiracy has been exposed! I can continue my important work protecting the rights of our feathered friends!',
    emotion: 'happy',
    flags: { isVerdict: true }
  }
};

// Bird Flu Case
export const birdFluCase: Case = {
  id: 'bird-flu-case',
  title: 'Charlie vs. The Health Inspector\'s Bird Flu Claims',
  description: 'Charlie must defend his bird law practice against health department persecution.',
  phases: {
    investigation: [{
      id: 'flu-investigation',
      title: 'Investigating the Health Claims',
      description: 'Gather evidence to refute the health inspector\'s accusations.',
      startNodeId: 'bird-flu-intro',
      nodes: birdFluDialogueNodes,
      characters,
      requiredEvidence: ['health-report', 'charlie-credentials']
    }],
    trial: [{
      id: 'flu-trial',
      title: 'The Bird Law Persecution Trial',
      description: 'Defend your right to practice bird law in court.',
      startNodeId: 'bird-flu-intro',
      nodes: birdFluDialogueNodes,
      characters,
      requiredEvidence: ['charlie-credentials', 'bird-flu-research']
    }]
  },
  evidence: birdFluCaseEvidence,
  characters: Object.values(characters),
  victoryConditions: [
    'Present legitimate research evidence',
    'Defend bird law credentials',
    'Expose health inspector\'s ignorance',
    'Achieve vindication or compromise'
  ]
};

// Evidence for Seagull Harassment Case
export const seagullCaseEvidence: Evidence[] = [
  {
    id: 'beach-footage',
    name: 'Beach Security Footage',
    description: 'Video evidence of seagulls "harassing" beachgoers by trying to get food.',
    image: '/evidence/beach-footage.svg',
    category: 'photo',
    relevantTo: ['seagull-behavior', 'harassment-claims'],
    combinableWith: ['feeding-behavior-study'],
    metadata: {
      location: 'Beach Security Office',
      dateFound: 'Friday',
      foundBy: 'Mac',
      birdLawRelevance: 'This footage shows natural feeding behavior, not harassment!',
    }
  },
  {
    id: 'food-scraps',
    name: 'Beach Food Scraps',
    description: 'Evidence of food left behind by beachgoers. Clearly attracting seagulls.',
    image: '/evidence/food-scraps.svg',
    category: 'physical',
    relevantTo: ['human-negligence', 'feeding-attraction'],
    combinableWith: ['beach-footage'],
    metadata: {
      location: 'Beach Trash Area',
      dateFound: 'Saturday',
      foundBy: 'The Waitress',
      birdLawRelevance: 'Humans are creating the problem by leaving food around!',
      charlieLogicRating: 'accidentally_brilliant'
    }
  },
  {
    id: 'seagull-behavior-study',
    name: 'Seagull Behavior Study',
    description: 'Charlie\'s detailed observations of seagull feeding patterns and social behavior.',
    image: '/evidence/seagull-study.svg',
    category: 'document',
    relevantTo: ['natural-behavior', 'scientific-evidence'],
    combinableWith: ['beach-footage', 'constitutional-rights'],
    metadata: {
      location: 'Beach Observation Post',
      dateFound: 'Thursday',
      foundBy: 'Charlie Kelly',
      birdLawRelevance: 'Seagulls are just exercising their natural right to forage for food!',
      charlieLogicRating: 'pure_genius'
    }
  },
  {
    id: 'harassment-complaints',
    name: 'Tourist Harassment Complaints',
    description: 'Official complaints from tourists about aggressive seagull behavior.',
    image: '/evidence/complaints.svg',
    category: 'document',
    relevantTo: ['prosecution-case', 'tourist-claims'],
    metadata: {
      location: 'Beach Management Office',
      dateFound: 'Monday',
      foundBy: 'Dennis Reynolds',
      birdLawRelevance: 'These complaints show human ignorance of seagull rights!',
    }
  },
  {
    id: 'constitutional-rights',
    name: 'Seagull Constitutional Rights',
    description: 'Charlie\'s interpretation of how the Constitution applies to seagull feeding rights.',
    image: '/evidence/seagull-constitution.svg',
    category: 'document',
    relevantTo: ['legal-precedent', 'constitutional-argument'],
    combinableWith: ['seagull-behavior-study'],
    metadata: {
      location: 'Charlie\'s Legal Research',
      dateFound: 'Sunday',
      foundBy: 'Charlie Kelly',
      birdLawRelevance: 'The pursuit of happiness includes the pursuit of french fries!',
      charlieLogicRating: 'bizarre'
    }
  },
  {
    id: 'expert-testimony-prep',
    name: 'Expert Testimony Notes',
    description: 'Charlie\'s preparation for testifying as a seagull behavior expert.',
    image: '/evidence/expert-notes.svg',
    category: 'document',
    relevantTo: ['expert-witness', 'charlie-testimony'],
    unlocks: ['expert-witness-status'],
    metadata: {
      location: 'Charlie\'s Apartment',
      dateFound: 'Tuesday',
      foundBy: 'Charlie Kelly',
      birdLawRelevance: 'I am the foremost expert on seagull law in Philadelphia!',
      charlieLogicRating: 'pure_genius'
    }
  }
];

// Seagull Case dialogue nodes
const seagullDialogueNodes: Record<string, DialogueNode> = {
  'seagull-case-intro': {
    id: 'seagull-case-intro',
    characterId: 'charlie',
    text: 'Your Honor, we are here today because of a grave miscarriage of justice! These noble seagulls are being persecuted for simply exercising their constitutional right to pursue happiness through french fry acquisition!',
    emotion: 'objection',
    choices: [
      {
        id: 'present-footage',
        text: 'Present beach security footage',
        nextNodeId: 'footage-analysis',
        requiresEvidence: 'beach-footage',
        characterReaction: 'neutral'
      },
      {
        id: 'constitutional-argument',
        text: 'Argue seagull constitutional rights',
        nextNodeId: 'constitutional-defense',
        requiresEvidence: 'constitutional-rights',
        charlieLogicBonus: true
      },
      {
        id: 'challenge-complaints',
        text: 'Challenge the harassment complaints',
        nextNodeId: 'complaint-challenge',
        characterReaction: 'positive'
      }
    ]
  },
  'footage-analysis': {
    id: 'footage-analysis',
    characterId: 'charlie',
    text: 'As you can see in this footage, Your Honor, the seagulls are not harassing anyone! They are simply engaging in natural foraging behavior. The humans are the ones creating the problem by leaving food around!',
    emotion: 'thinking',
    nextNodeId: 'dennis-prosecution'
  },
  'dennis-prosecution': {
    id: 'dennis-prosecution',
    characterId: 'dennis',
    text: 'Your Honor, the defendant seagulls have been terrorizing innocent tourists! They swoop down, steal food, and create a hostile environment. This is clearly aggressive behavior that must be stopped!',
    emotion: 'angry',
    choices: [
      {
        id: 'object-to-terrorizing',
        text: 'Object to the word "terrorizing"',
        nextNodeId: 'terrorism-objection',
        charlieLogicBonus: true
      },
      {
        id: 'present-food-scraps',
        text: 'Present evidence of human negligence',
        nextNodeId: 'human-negligence',
        requiresEvidence: 'food-scraps',
        characterReaction: 'impressed'
      }
    ]
  },
  'terrorism-objection': {
    id: 'terrorism-objection',
    characterId: 'charlie',
    text: 'OBJECTION! Your Honor, Dennis is using inflammatory language! These seagulls are not terrorists - they\'re just hungry! You can\'t criminalize hunger!',
    emotion: 'objection',
    flags: { isObjection: true },
    nextNodeId: 'judge-considers'
  },
  'judge-considers': {
    id: 'judge-considers',
    characterId: 'judge',
    text: 'Mr. Kelly has a point about the language, Mr. Reynolds. Please stick to the facts of the case.',
    emotion: 'thinking',
    nextNodeId: 'tourist-testimony'
  },
  'tourist-testimony': {
    id: 'tourist-testimony',
    characterId: 'frank',
    text: 'I was just trying to eat my sandwich when this seagull came outta nowhere! Grabbed the whole thing right out of my hands! It was like a feathered mugging!',
    emotion: 'angry',
    choices: [
      {
        id: 'cross-examine-frank',
        text: 'Cross-examine about food protection',
        nextNodeId: 'frank-cross-exam',
        characterReaction: 'negative'
      },
      {
        id: 'explain-natural-behavior',
        text: 'Explain natural seagull behavior',
        nextNodeId: 'behavior-explanation',
        requiresEvidence: 'seagull-behavior-study',
        characterReaction: 'positive'
      }
    ]
  },
  'behavior-explanation': {
    id: 'behavior-explanation',
    characterId: 'charlie',
    text: 'Your Honor, my extensive research shows that seagulls are opportunistic feeders. They see food, they take food. It\'s not malicious - it\'s survival! Frank should have protected his sandwich better!',
    emotion: 'thinking',
    nextNodeId: 'waitress-testimony-seagull'
  },
  'waitress-testimony-seagull': {
    id: 'waitress-testimony-seagull',
    characterId: 'waitress',
    text: 'Look, I work near the beach, and the seagulls only go after food when people leave it unattended or wave it around. If you don\'t want seagulls to take your food, don\'t make it available to them.',
    emotion: 'sarcastic',
    nextNodeId: 'cricket-seagull-testimony'
  },
  'cricket-seagull-testimony': {
    id: 'cricket-seagull-testimony',
    characterId: 'cricket',
    text: 'The seagulls... they speak to me sometimes. They say they\'re just trying to feed their families. They don\'t understand why the humans get so angry about sharing food.',
    emotion: 'confused',
    choices: [
      {
        id: 'follow-cricket-communication',
        text: 'Ask Cricket about seagull communications',
        nextNodeId: 'cricket-translation',
        charlieLogicBonus: true
      },
      {
        id: 'focus-on-family-aspect',
        text: 'Focus on seagulls feeding their families',
        nextNodeId: 'family-defense',
        characterReaction: 'positive'
      }
    ]
  },
  'family-defense': {
    id: 'family-defense',
    characterId: 'charlie',
    text: 'Your Honor, these seagulls are just trying to feed their families! They have chicks to care for, and the beach is their natural habitat. Humans are the invaders here!',
    emotion: 'angry',
    nextNodeId: 'artemis-intervention'
  },
  'artemis-intervention': {
    id: 'artemis-intervention',
    characterId: 'artemis',
    text: 'As someone who appreciates the artistic nature of all creatures, I must say that seagull behavior is quite beautiful in its simplicity. They see, they want, they take. It\'s very... honest.',
    emotion: 'thinking',
    nextNodeId: 'case-climax-seagull'
  },
  'case-climax-seagull': {
    id: 'case-climax-seagull',
    characterId: 'charlie',
    text: 'Your Honor, the evidence is clear! Seagulls are not harassers - they\'re just exercising their natural rights! The real problem is human ignorance of proper beach etiquette around our feathered friends!',
    emotion: 'objection',
    isEvidencePresentation: true,
    acceptedEvidence: ['beach-footage', 'seagull-behavior-study', 'food-scraps'],
    choices: [
      {
        id: 'demand-dismissal',
        text: 'Demand complete dismissal of charges',
        nextNodeId: 'victory-seagull-ending',
        charlieLogicBonus: true
      },
      {
        id: 'propose-education',
        text: 'Propose tourist education program',
        nextNodeId: 'education-ending',
        characterReaction: 'impressed'
      }
    ]
  },
  'victory-seagull-ending': {
    id: 'victory-seagull-ending',
    characterId: 'judge',
    text: 'Mr. Kelly, your arguments about natural behavior are... surprisingly compelling. The charges against the seagulls are dismissed. They are simply being seagulls.',
    emotion: 'thinking',
    nextNodeId: 'charlie-seagull-victory'
  },
  'charlie-seagull-victory': {
    id: 'charlie-seagull-victory',
    characterId: 'charlie',
    text: 'YES! Another victory for bird law! The seagulls are free to continue their natural feeding behavior! Justice has been served, just like a nice fish sandwich!',
    emotion: 'happy',
    flags: { isVerdict: true }
  },
  'education-ending': {
    id: 'education-ending',
    characterId: 'judge',
    text: 'Mr. Kelly, your proposal for a beach education program is reasonable. The seagulls will not be prosecuted, but tourists will be educated about proper beach behavior.',
    emotion: 'happy',
    nextNodeId: 'charlie-education-victory'
  },
  'charlie-education-victory': {
    id: 'charlie-education-victory',
    characterId: 'charlie',
    text: 'A compromise that serves both humans and seagulls! I volunteer to lead the education program. Bird law wins again through understanding and cooperation!',
    emotion: 'happy',
    flags: { isVerdict: true }
  }
};

// Seagull Harassment Case
export const seagullHarassmentCase: Case = {
  id: 'seagull-harassment-case',
  title: 'The Great Seagull Harassment Case',
  description: 'Charlie defends seagulls accused of harassing beachgoers.',
  phases: {
    investigation: [{
      id: 'seagull-investigation',
      title: 'Investigating Seagull Behavior',
      description: 'Gather evidence about natural seagull feeding behavior.',
      startNodeId: 'seagull-case-intro',
      nodes: seagullDialogueNodes,
      characters,
      requiredEvidence: ['beach-footage', 'seagull-behavior-study']
    }],
    trial: [{
      id: 'seagull-trial',
      title: 'The Seagull Rights Trial',
      description: 'Defend seagulls\' natural feeding rights in court.',
      startNodeId: 'seagull-case-intro',
      nodes: seagullDialogueNodes,
      characters,
      requiredEvidence: ['seagull-behavior-study', 'constitutional-rights']
    }]
  },
  evidence: seagullCaseEvidence,
  characters: Object.values(characters),
  victoryConditions: [
    'Present seagull behavior evidence',
    'Prove natural feeding rights',
    'Expose human negligence',
    'Achieve dismissal or education compromise'
  ]
};

// Export all new cases
export const allNewCases = [pigeonPropertyCase, birdFluCase, seagullHarassmentCase];
