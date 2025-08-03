import { Character, Evidence, DialogueTree, DialogueNode, Case } from '@/types/game';

// Characters from It's Always Sunny
export const characters: Record<string, Character> = {
  charlie: {
    id: 'charlie',
    name: 'Charlie Kelly',
    title: 'Bird Law Expert',
    sprites: {
      neutral: '/sprites/charlie-normal.svg',
      happy: '/sprites/charlie-normal.svg',
      angry: '/sprites/charlie-pointing.svg',
      confused: '/sprites/charlie-normal.svg',
      thinking: '/sprites/charlie-normal.svg',
      objection: '/sprites/charlie-pointing.svg',
    },
    personality: 'chaotic',
    wrongEvidenceReactions: {
      mild: ["Wait, let me think about this bird law angle..."],
      severe: ["This doesn't fit my bird law theory at all!"],
      critical: ["The birds are telling me this is all wrong!"]
    },
    catchphrases: [
      "Bird law in this country is not governed by reason!",
      "I'm well versed in bird law.",
      "Filibuster!",
      "Wildcard, bitches!"
    ],
  },
  mac: {
    id: 'mac',
    name: 'Mac',
    title: 'Security Expert',
    sprites: {
      neutral: '/sprites/charlie-normal.svg',
      happy: '/sprites/charlie-normal.svg',
      angry: '/sprites/charlie-pointing.svg',
      confused: '/sprites/charlie-normal.svg',
      thinking: '/sprites/charlie-normal.svg',
      objection: '/sprites/charlie-pointing.svg',
    },
    personality: 'serious',
    wrongEvidenceReactions: {
      mild: ["Charlie, that's not how evidence works."],
      severe: ["Dude, you're completely off base here."],
      critical: ["This is why nobody takes you seriously, Charlie!"]
    },
  },
  dee: {
    id: 'dee',
    name: 'Dee Reynolds',
    title: 'The Defendant',
    sprites: {
      neutral: '/sprites/charlie-normal.svg',
      happy: '/sprites/charlie-normal.svg',
      angry: '/sprites/charlie-pointing.svg',
      confused: '/sprites/charlie-normal.svg',
      thinking: '/sprites/charlie-normal.svg',
      objection: '/sprites/charlie-pointing.svg',
    },
    personality: 'sarcastic',
    wrongEvidenceReactions: {
      mild: ["Charlie, you're being ridiculous."],
      severe: ["This is exactly why nobody listens to you!"],
      critical: ["You're insane! I am NOT a bird!"]
    },
  },
  judge: {
    id: 'judge',
    name: 'Judge',
    title: 'Honorable Judge',
    sprites: {
      neutral: '/sprites/judge-normal.svg',
      happy: '/sprites/judge-normal.svg',
      angry: '/sprites/judge-normal.svg',
      confused: '/sprites/judge-shocked.svg',
      thinking: '/sprites/judge-normal.svg',
      objection: '/sprites/judge-shocked.svg',
    },
    personality: 'serious',
    wrongEvidenceReactions: {
      mild: ["Mr. Kelly, please stay focused on the matter at hand."],
      severe: ["This is highly irregular, Mr. Kelly."],
      critical: ["I'm considering holding you in contempt!"]
    },
  },
  dennis: {
    id: 'dennis',
    name: 'Dennis Reynolds',
    title: 'Prosecuting Attorney',
    sprites: {
      neutral: '/sprites/prosecutor-normal.svg',
      happy: '/sprites/prosecutor-normal.svg',
      angry: '/sprites/prosecutor-pointing.svg',
      confused: '/sprites/prosecutor-normal.svg',
      thinking: '/sprites/prosecutor-normal.svg',
      objection: '/sprites/prosecutor-pointing.svg',
      smug: '/sprites/prosecutor-normal.svg',
    },
    personality: 'narcissistic',
    wrongEvidenceReactions: {
      mild: ["Charlie, your legal acumen is... questionable at best."],
      severe: ["This is exactly the kind of incompetence I expected from you."],
      critical: ["You're embarrassing yourself, Charlie. I'm a five-star lawyer!"]
    },
    catchphrases: [
      "I am a five-star man!",
      "I'm a golden god!",
      "Because of the implication...",
      "I haven't even begun to peak!"
    ],
  },
  frank: {
    id: 'frank',
    name: 'Frank Reynolds',
    title: 'Witness',
    sprites: {
      neutral: '/sprites/charlie-normal.svg',
      happy: '/sprites/charlie-normal.svg',
      angry: '/sprites/charlie-pointing.svg',
      confused: '/sprites/charlie-normal.svg',
      thinking: '/sprites/charlie-normal.svg',
      objection: '/sprites/charlie-pointing.svg',
    },
    personality: 'chaotic',
    wrongEvidenceReactions: {
      mild: ["What? That don't make no sense!"],
      severe: ["You're as confused as I am, and that's saying something!"],
      critical: ["This whole thing's gone to hell! Where's my gun?"]
    },
    catchphrases: [
      "So anyway, I started blasting...",
      "Can I offer you an egg in this trying time?",
      "I don't know how many years on this Earth I got left...",
      "Rum ham!"
    ],
  },
  waitress: {
    id: 'waitress',
    name: 'The Waitress',
    title: 'Reluctant Witness',
    sprites: {
      neutral: '/sprites/waitress-neutral.svg',
      happy: '/sprites/waitress-happy.svg',
      angry: '/sprites/waitress-angry.svg',
      confused: '/sprites/waitress-confused.svg',
      thinking: '/sprites/waitress-thinking.svg',
      objection: '/sprites/waitress-objection.svg',
    },
    personality: 'sarcastic',
    wrongEvidenceReactions: {
      mild: ["Charlie, that makes absolutely no sense."],
      severe: ["Why am I even here? This is insane!"],
      critical: ["I can't take this anymore! You're all crazy!"]
    },
  },
  cricket: {
    id: 'cricket',
    name: 'Rickety Cricket',
    title: 'Street Witness',
    sprites: {
      neutral: '/sprites/cricket-neutral.svg',
      happy: '/sprites/cricket-happy.svg',
      angry: '/sprites/cricket-angry.svg',
      confused: '/sprites/cricket-confused.svg',
      thinking: '/sprites/cricket-thinking.svg',
      objection: '/sprites/cricket-objection.svg',
    },
    personality: 'unhinged',
    wrongEvidenceReactions: {
      mild: ["That's... that's not how I remember it, but then again..."],
      severe: ["My mind's been through a lot, Charlie. Are you sure about that?"],
      critical: ["The birds... they speak to me sometimes. They're not happy about this."]
    },
  },
  artemis: {
    id: 'artemis',
    name: 'Artemis',
    title: 'Court Clerk',
    sprites: {
      neutral: '/sprites/artemis-neutral.svg',
      happy: '/sprites/artemis-happy.svg',
      angry: '/sprites/artemis-angry.svg',
      confused: '/sprites/artemis-confused.svg',
      thinking: '/sprites/artemis-thinking.svg',
      objection: '/sprites/artemis-objection.svg',
    },
    personality: 'eccentric',
    wrongEvidenceReactions: {
      mild: ["That evidence has no artistic merit whatsoever."],
      severe: ["This is like a bad performance art piece, Charlie."],
      critical: ["I once incorporated a sandwich into my act. This is worse."]
    },
  },
};

// Bird Law Evidence
export const evidence: Evidence[] = [
  {
    id: 'bird-seed-bag',
    name: 'Empty Bird Seed Bag',
    description: 'A torn bag that once contained premium sunflower seeds. Shows clear signs of being pecked open by a large bird.',
    image: '/evidence/bird-seed-bag.svg',
    category: 'physical',
    relevantTo: ['seed-theft-testimony', 'cross-examine-dee'],
    metadata: {
      location: 'Paddy\'s Pub Alley',
      dateFound: 'Tuesday Morning',
      foundBy: 'Charlie Kelly',
      birdLawRelevance: 'This bag represents a clear violation of the Avian Nutrition Rights Act of... well, it\'s definitely illegal to steal bird food. I think.',
    },
  },
  {
    id: 'feather-evidence',
    name: 'Suspicious Feather',
    description: 'A large, blonde feather found at the crime scene. Appears to be from a large bird, possibly a crane or... something else.',
    image: '/evidence/feather.svg',
    category: 'physical',
    relevantTo: ['dee-identity-crisis', 'bird-transformation'],
    metadata: {
      location: 'Crime Scene',
      dateFound: 'Tuesday Morning',
      foundBy: 'Mac',
      birdLawRelevance: 'According to subsection 12 of the Bird Identity Protection Act, this feather could be evidence of illegal bird impersonation.',
    },
  },
  {
    id: 'witness-testimony',
    name: 'Frank\'s Testimony',
    description: 'Frank claims he saw "a giant bird" stealing the seed. His testimony is... questionable at best.',
    image: '/evidence/testimony.svg',
    category: 'testimony',
    relevantTo: ['frank-cross-examination'],
    metadata: {
      dateFound: 'Tuesday Afternoon',
      foundBy: 'Charlie Kelly',
      birdLawRelevance: 'Eyewitness testimony is crucial in bird law cases, even if the witness might have been drinking.',
    },
  },
  {
    id: 'security-footage',
    name: 'Blurry Security Footage',
    description: 'Grainy footage from Paddy\'s security camera showing a tall, bird-like figure near the bird seed.',
    image: '/evidence/security-footage.svg',
    category: 'photo',
    relevantTo: ['video-analysis', 'dee-identification'],
    metadata: {
      location: 'Paddy\'s Pub Security System',
      dateFound: 'Tuesday Evening',
      foundBy: 'Mac',
      birdLawRelevance: 'Video evidence is admissible in bird court, especially when it shows clear bird-like behavior.',
    },
  },
  {
    id: 'bird-law-book',
    name: 'Charlie\'s Bird Law Notes',
    description: 'A collection of Charlie\'s handwritten notes on bird law. Mostly illegible, but contains important legal precedents.',
    image: '/evidence/bird-law-book.svg',
    category: 'document',
    relevantTo: ['legal-precedent', 'charlie-expertise'],
    metadata: {
      location: 'Charlie\'s Apartment',
      dateFound: 'Monday',
      foundBy: 'Charlie Kelly',
      birdLawRelevance: 'These notes contain years of bird law research and definitely prove that I know what I\'m talking about.',
    },
  },
];

// Sample Dialogue Nodes
const dialogueNodes: Record<string, DialogueNode> = {
  'case-intro': {
    id: 'case-intro',
    characterId: 'charlie',
    text: 'Your Honor, we are here today to address a most serious crime against the avian community. Someone has stolen bird seed from the alley behind Paddy\'s Pub, and I have reason to believe the defendant is not entirely... human.',
    emotion: 'thinking',
    choices: [
      {
        id: 'present-evidence',
        text: 'Present the empty bird seed bag as evidence',
        nextNodeId: 'evidence-presentation',
        requiresEvidence: 'bird-seed-bag',
        characterReaction: 'positive',
      },
      {
        id: 'question-defendant',
        text: 'Question the defendant about her whereabouts',
        nextNodeId: 'dee-questioning',
        characterReaction: 'neutral',
      },
      {
        id: 'bird-law-explanation',
        text: 'Explain the relevant bird law statutes',
        nextNodeId: 'charlie-law-lecture',
        characterReaction: 'positive',
      },
    ],
  },
  'evidence-presentation': {
    id: 'evidence-presentation',
    characterId: 'charlie',
    text: 'As you can see, Your Honor, this bag has been clearly pecked open by a large bird. The bite marks are consistent with someone who has... bird-like tendencies.',
    emotion: 'objection',
    nextNodeId: 'judge-response',
  },
  'judge-response': {
    id: 'judge-response',
    characterId: 'judge',
    text: 'Mr. Kelly, are you suggesting that the defendant is... a bird?',
    emotion: 'confused',
    choices: [
      {
        id: 'confirm-bird-theory',
        text: 'OBJECTION! Yes, Your Honor. The evidence clearly shows bird behavior.',
        nextNodeId: 'charlie-bird-theory',
        characterReaction: 'negative',
      },
      {
        id: 'clarify-statement',
        text: 'HOLD IT! Not exactly, but she exhibits bird-like characteristics.',
        nextNodeId: 'charlie-clarification',
        characterReaction: 'neutral',
      },
    ],
  },
  'charlie-bird-theory': {
    id: 'charlie-bird-theory',
    characterId: 'charlie',
    text: 'Your Honor, bird law clearly states that anyone who exhibits bird-like behavior in the commission of a crime against birds should be tried under avian jurisdiction. It\'s in the constitution... probably.',
    emotion: 'objection',
    nextNodeId: 'dee-objection',
  },
  'dee-objection': {
    id: 'dee-objection',
    characterId: 'dee',
    text: 'OBJECTION! I am NOT a bird! This is ridiculous! Charlie, you can\'t just accuse people of being birds!',
    emotion: 'angry',
    flags: { isObjection: true },
    choices: [
      {
        id: 'present-feather',
        text: 'Present the suspicious feather found at the scene',
        nextNodeId: 'feather-evidence',
        requiresEvidence: 'feather-evidence',
        characterReaction: 'negative',
      },
      {
        id: 'cross-examine',
        text: 'Cross-examine the defendant about her bird-like behavior',
        nextNodeId: 'dee-cross-examination',
        characterReaction: 'neutral',
      },
    ],
  },
  'charlie-dramatic-objection': {
    id: 'charlie-dramatic-objection',
    characterId: 'charlie',
    text: 'OBJECTION! Your Honor, this entire case hinges on a fundamental misunderstanding of bird law!',
    emotion: 'objection',
    flags: { isObjection: true },
    choices: [
      {
        id: 'explain-bird-law',
        text: 'Explain the Bird Rights Amendment of 1987',
        nextNodeId: 'bird-law-lecture',
        charlieLogicBonus: true,
      },
      {
        id: 'present-bird-evidence',
        text: 'TAKE THAT! Present the feather evidence',
        nextNodeId: 'feather-revelation',
        requiresEvidence: 'feather-evidence',
      },
    ],
  },
  'prosecutor-counter': {
    id: 'prosecutor-counter',
    characterId: 'dennis',
    text: 'HOLD IT! Mr. Kelly, there is no such thing as the "Bird Rights Amendment of 1987"!',
    emotion: 'objection',
    flags: { isObjection: true },
    choices: [
      {
        id: 'charlie-filibuster',
        text: 'Filibuster! Demand to see their bird law credentials',
        nextNodeId: 'charlie-filibuster',
        charlieLogicBonus: true,
      },
      {
        id: 'present-notes',
        text: 'Present Charlie\'s bird law notes as proof',
        nextNodeId: 'notes-presentation',
        requiresEvidence: 'bird-law-notes',
      },
    ],
  },
  'judge-shocked-reaction': {
    id: 'judge-shocked-reaction',
    characterId: 'judge',
    text: 'What in the world is happening in my courtroom?! Mr. Kelly, are you making up laws?',
    emotion: 'shocked',
    flags: { isShocked: true },
    choices: [
      {
        id: 'charlie-confident',
        text: 'Your Honor, bird law is very real and very serious',
        nextNodeId: 'charlie-explanation',
        characterReaction: 'neutral',
      },
      {
        id: 'wildcard',
        text: 'WILDCARD! *throws papers in the air*',
        nextNodeId: 'charlie-wildcard',
        charlieLogicBonus: true,
        characterReaction: 'negative',
      },
    ],
  },
  // Missing dialogue nodes - Part 1
  'dee-questioning': {
    id: 'dee-questioning',
    characterId: 'charlie',
    text: 'Dee, where were you on Tuesday morning when the bird seed was stolen? And don\'t give me some bird-brained excuse!',
    emotion: 'thinking',
    choices: [
      {
        id: 'dee-alibi',
        text: 'Listen to Dee\'s alibi',
        nextNodeId: 'dee-alibi-response',
        characterReaction: 'neutral',
      },
      {
        id: 'press-harder',
        text: 'Press her harder about her whereabouts',
        nextNodeId: 'dee-defensive',
        characterReaction: 'negative',
      },
    ],
  },
  'charlie-law-lecture': {
    id: 'charlie-law-lecture',
    characterId: 'charlie',
    text: 'Your Honor, according to the Bird Protection Act of 1976, any theft of bird sustenance is a federal crime punishable by up to 20 years in bird prison. Also, I\'m pretty sure there\'s something about this in the Magna Carta.',
    emotion: 'objection',
    nextNodeId: 'judge-confused-response',
  },
  'charlie-clarification': {
    id: 'charlie-clarification',
    characterId: 'charlie',
    text: 'What I mean, Your Honor, is that the defendant has been observed making bird-like sounds, eating seeds, and attempting to fly. These are clear indicators of bird identity fraud.',
    emotion: 'thinking',
    nextNodeId: 'dee-indignant-response',
  },
  // Missing dialogue nodes - Part 2
  'feather-evidence': {
    id: 'feather-evidence',
    characterId: 'charlie',
    text: 'TAKE THAT! This feather was found at the crime scene, and it matches the defendant\'s... uh... hair color! This proves she was there in her bird form!',
    emotion: 'objection',
    flags: { isObjection: true },
    nextNodeId: 'dennis-objects-feather',
  },
  'dee-cross-examination': {
    id: 'dee-cross-examination',
    characterId: 'charlie',
    text: 'Dee, isn\'t it true that you\'ve been seen pecking at things, making squawking noises, and generally acting like a large, annoying bird?',
    emotion: 'thinking',
    choices: [
      {
        id: 'dee-denies',
        text: 'Let Dee deny the accusations',
        nextNodeId: 'dee-denial',
        characterReaction: 'neutral',
      },
      {
        id: 'present-witness',
        text: 'Call Frank as a witness to her bird behavior',
        nextNodeId: 'frank-testimony',
        characterReaction: 'positive',
      },
    ],
  },
  'bird-law-lecture': {
    id: 'bird-law-lecture',
    characterId: 'charlie',
    text: 'The Bird Rights Amendment clearly states that all birds have the right to their food, their nests, and their dignity. When someone steals from birds, they become subject to bird law jurisdiction!',
    emotion: 'objection',
    nextNodeId: 'prosecutor-counter',
  },
  // Missing dialogue nodes - Part 3
  'feather-revelation': {
    id: 'feather-revelation',
    characterId: 'charlie',
    text: 'This feather is the smoking gun! Or should I say... the smoking wing! It proves that Dee was at the scene of the crime in her true bird form!',
    emotion: 'objection',
    flags: { isObjection: true },
    nextNodeId: 'dee-final-objection',
  },
  'charlie-filibuster': {
    id: 'charlie-filibuster',
    characterId: 'charlie',
    text: 'FILIBUSTER! I demand to see your bird law credentials! I bet you don\'t even know about the Great Pigeon Accord of 1823 or the Sparrow Sovereignty Act!',
    emotion: 'objection',
    flags: { isObjection: true },
    nextNodeId: 'dennis-frustrated',
  },
  'notes-presentation': {
    id: 'notes-presentation',
    characterId: 'charlie',
    text: 'These are my extensive bird law notes, compiled over years of rigorous study. As you can see, everything I\'ve said is backed up by legitimate bird law precedent!',
    emotion: 'thinking',
    nextNodeId: 'judge-examines-notes',
  },
  'charlie-explanation': {
    id: 'charlie-explanation',
    characterId: 'charlie',
    text: 'Your Honor, bird law is a complex and nuanced field. Just because it\'s not taught in regular law school doesn\'t mean it\'s not real. Birds have rights too!',
    emotion: 'thinking',
    nextNodeId: 'case-conclusion',
  },
  'charlie-wildcard': {
    id: 'charlie-wildcard',
    characterId: 'charlie',
    text: 'WILDCARD! *throws papers everywhere* Your Honor, sometimes you have to think outside the cage! Bird law doesn\'t follow human logic - it follows bird logic!',
    emotion: 'objection',
    flags: { isObjection: true },
    nextNodeId: 'courtroom-chaos',
  },
  // Supporting nodes for complete dialogue flow
  'dee-alibi-response': {
    id: 'dee-alibi-response',
    characterId: 'dee',
    text: 'I was at the gym, obviously. Working on my perfect human body that is definitely not bird-like in any way!',
    emotion: 'angry',
    nextNodeId: 'charlie-suspicious',
  },
  'dee-defensive': {
    id: 'dee-defensive',
    characterId: 'dee',
    text: 'Stop harassing me, Charlie! I don\'t have to answer your stupid bird questions!',
    emotion: 'angry',
    nextNodeId: 'judge-intervention',
  },
  'judge-confused-response': {
    id: 'judge-confused-response',
    characterId: 'judge',
    text: 'Mr. Kelly, I\'m not sure any of what you just said is actual law. Are you making this up as you go along?',
    emotion: 'confused',
    nextNodeId: 'charlie-defensive',
  },
  // Final supporting nodes
  'dee-indignant-response': {
    id: 'dee-indignant-response',
    characterId: 'dee',
    text: 'That is the most ridiculous thing I\'ve ever heard! I am a human woman, not a bird! This whole trial is insane!',
    emotion: 'angry',
    nextNodeId: 'case-conclusion',
  },
  'dennis-objects-feather': {
    id: 'dennis-objects-feather',
    characterId: 'dennis',
    text: 'OBJECTION! That feather could have come from any bird! This proves nothing except that Charlie has lost his mind!',
    emotion: 'objection',
    flags: { isObjection: true },
    nextNodeId: 'charlie-counter-objection',
  },
  'dee-denial': {
    id: 'dee-denial',
    characterId: 'dee',
    text: 'I absolutely deny all of these ridiculous accusations! I am not a bird and I never stole any bird seed!',
    emotion: 'angry',
    nextNodeId: 'charlie-presents-more-evidence',
  },
  'frank-testimony': {
    id: 'frank-testimony',
    characterId: 'frank',
    text: 'Yeah, I seen her! She was out there making weird noises and pecking at stuff. Looked like a big, ugly bird to me!',
    emotion: 'thinking',
    nextNodeId: 'dee-outraged',
  },
  'case-conclusion': {
    id: 'case-conclusion',
    characterId: 'judge',
    text: 'This has been... the most unusual case I\'ve ever presided over. I\'m not sure what bird law is, but I\'m declaring this case... dismissed due to confusion.',
    emotion: 'confused',
    // This is an ending node
  },
  // Additional supporting nodes to complete all paths
  'dee-final-objection': {
    id: 'dee-final-objection',
    characterId: 'dee',
    text: 'ENOUGH! This is harassment! I demand this case be thrown out immediately!',
    emotion: 'angry',
    flags: { isObjection: true },
    nextNodeId: 'case-conclusion',
  },
  'dennis-frustrated': {
    id: 'dennis-frustrated',
    characterId: 'dennis',
    text: 'Your Honor, this is getting ridiculous. Mr. Kelly is clearly making up laws that don\'t exist!',
    emotion: 'angry',
    nextNodeId: 'judge-final-decision',
  },
  'judge-examines-notes': {
    id: 'judge-examines-notes',
    characterId: 'judge',
    text: 'These appear to be... crayon drawings of birds with legal terminology written underneath. Mr. Kelly, this is not legitimate legal documentation.',
    emotion: 'confused',
    nextNodeId: 'charlie-insists',
  },
  'courtroom-chaos': {
    id: 'courtroom-chaos',
    characterId: 'judge',
    text: 'ORDER! ORDER IN THE COURT! Mr. Kelly, please stop throwing papers and sit down!',
    emotion: 'angry',
    nextNodeId: 'case-conclusion',
  },
  'charlie-suspicious': {
    id: 'charlie-suspicious',
    characterId: 'charlie',
    text: 'The gym? That\'s exactly where a bird would go to practice flying! Your alibi only makes you more suspicious!',
    emotion: 'thinking',
    nextNodeId: 'dee-exasperated',
  },
  // Final completion nodes
  'judge-intervention': {
    id: 'judge-intervention',
    characterId: 'judge',
    text: 'Mr. Kelly, please conduct yourself properly in my courtroom. Ms. Reynolds, please answer the question.',
    emotion: 'serious',
    nextNodeId: 'dee-reluctant-answer',
  },
  'charlie-defensive': {
    id: 'charlie-defensive',
    characterId: 'charlie',
    text: 'I am not making this up! Bird law is a legitimate field of study! Just because you don\'t understand it doesn\'t mean it\'s not real!',
    emotion: 'angry',
    nextNodeId: 'judge-final-decision',
  },
  'charlie-counter-objection': {
    id: 'charlie-counter-objection',
    characterId: 'charlie',
    text: 'OBJECTION TO YOUR OBJECTION! The feather is clearly from the defendant! Look at the blonde coloring!',
    emotion: 'objection',
    flags: { isObjection: true },
    nextNodeId: 'case-conclusion',
  },
  'charlie-presents-more-evidence': {
    id: 'charlie-presents-more-evidence',
    characterId: 'charlie',
    text: 'Then explain THIS! *dramatically points* You were seen making bird noises just yesterday!',
    emotion: 'objection',
    nextNodeId: 'dee-final-objection',
  },
  'dee-outraged': {
    id: 'dee-outraged',
    characterId: 'dee',
    text: 'FRANK! You\'re supposed to be on my side! I am NOT a bird!',
    emotion: 'angry',
    nextNodeId: 'frank-shrugs',
  },
  'judge-final-decision': {
    id: 'judge-final-decision',
    characterId: 'judge',
    text: 'I\'ve heard enough. This case is dismissed due to... whatever this was. Court adjourned!',
    emotion: 'confused',
    // Ending node
  },
  // Final completion nodes
  'charlie-insists': {
    id: 'charlie-insists',
    characterId: 'charlie',
    text: 'Those aren\'t crayon drawings! They\'re detailed legal diagrams! The bird with the little hat is clearly representing judicial authority!',
    emotion: 'angry',
    nextNodeId: 'case-conclusion',
  },
  'dee-exasperated': {
    id: 'dee-exasperated',
    characterId: 'dee',
    text: 'Charlie, you are absolutely insane! Going to the gym doesn\'t make me a bird!',
    emotion: 'angry',
    nextNodeId: 'charlie-final-argument',
  },
  'dee-reluctant-answer': {
    id: 'dee-reluctant-answer',
    characterId: 'dee',
    text: 'Fine! I was at the gym, then I went home. I did NOT steal any bird seed because I am NOT a bird!',
    emotion: 'angry',
    nextNodeId: 'charlie-final-argument',
  },
  'frank-shrugs': {
    id: 'frank-shrugs',
    characterId: 'frank',
    text: 'Hey, I calls \'em like I sees \'em. You looked like a bird to me, bird.',
    emotion: 'neutral',
    nextNodeId: 'case-conclusion',
  },
  'charlie-final-argument': {
    id: 'charlie-final-argument',
    characterId: 'charlie',
    text: 'Your Honor, the evidence is clear! The defendant exhibits all the classic signs of being a bird in disguise! I rest my case!',
    emotion: 'objection',
    nextNodeId: 'judge-final-decision',
  },
};

// Sample Dialogue Tree
export const sampleDialogueTree: DialogueTree = {
  id: 'bird-seed-trial',
  title: 'The Case of the Stolen Bird Seed',
  description: 'Charlie defends the rights of birds against Dee, who may or may not be a bird herself.',
  startNodeId: 'case-intro',
  nodes: dialogueNodes,
  characters,
  requiredEvidence: ['bird-seed-bag', 'feather-evidence'],
};

// Sample Case
export const sampleCase: Case = {
  id: 'case-001',
  title: 'The Great Bird Seed Heist',
  description: 'Someone has been stealing bird seed from behind Paddy\'s Pub. Charlie must use his extensive bird law knowledge to solve the case.',
  phases: {
    investigation: [sampleDialogueTree],
    trial: [sampleDialogueTree],
  },
  evidence,
  characters: Object.values(characters),
  victoryConditions: [
    'Present all evidence correctly',
    'Successfully cross-examine Dee',
    'Prove bird law violations',
  ],
};
