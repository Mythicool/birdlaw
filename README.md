# 🐦 Bird Law! - A Phoenix Wright Style Courtroom Adventure

A hilarious Phoenix Wright-style visual novel game featuring Charlie Kelly from It's Always Sunny in Philadelphia and his expertise in bird law. Experience dramatic courtroom battles, objection sequences, and Charlie's unique legal theories in this interactive adventure!

![Bird Law Game](https://img.shields.io/badge/Game-Bird%20Law!-yellow) ![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-purple)

## 🎮 Game Features

### 🎭 Phoenix Wright-Style Gameplay
- **Dramatic Objection Sequences** with full-screen animations
- **Evidence Presentation System** with interactive inventory
- **Cross-Examination Mechanics** for interrogating witnesses
- **Character Reaction System** with health/confidence tracking
- **Multiple Dialogue Paths** leading to different outcomes

### 🎨 Visual & Audio Experience
- **Custom Character Sprites** in Phoenix Wright style
- **Dramatic Animations** including pointing gestures and objections
- **Courtroom Backgrounds** with authentic legal atmosphere
- **Typewriter Text Effects** for immersive dialogue
- **Smooth Transitions** and visual effects

### 👥 Characters
- **Charlie Kelly** - Bird law expert with chaotic legal theories
- **Judge** - Confused but authoritative courtroom presence
- **Dee Reynolds** - The defendant (definitely not a bird)
- **Dennis Reynolds** - Narcissistic prosecuting attorney
- **Frank Reynolds** - Unreliable witness with questionable testimony

### 📋 Case: "The Great Bird Seed Heist"
Investigate the theft of bird seed from behind Paddy's Pub in this absurd legal adventure where Charlie must prove his bird law expertise while defending the rights of the avian community.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Mythicool/birdlaw.git
cd birdlaw
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open the game**
Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Play

1. **Start the Game** - Click "Quick Start" or "Select Case"
2. **Read Dialogue** - Click to advance through conversations
3. **Make Choices** - Select dialogue options to progress the story
4. **Present Evidence** - Use the evidence system to support your arguments
5. **Object!** - Trigger dramatic objection sequences with special choices
6. **Cross-Examine** - Question witnesses about their testimony
7. **Solve the Case** - Use Charlie's bird law expertise to reach a conclusion

### 🎮 Controls
- **Click** to advance dialogue
- **Evidence Button** - View your evidence inventory
- **Present Button** - Present evidence during testimony
- **Combine Button** - Combine evidence pieces for new insights

## 🛠️ Technical Stack

- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

## 📁 Project Structure

```
bird-law-game/
├── src/
│   ├── app/                 # Next.js app router
│   ├── components/          # React components
│   │   ├── CharacterSprite.tsx
│   │   ├── DialogueEngine.tsx
│   │   ├── EvidenceSystem.tsx
│   │   ├── GameEngine.tsx
│   │   └── ObjectionAnimation.tsx
│   ├── data/               # Game data and dialogue
│   │   ├── sampleData.ts
│   │   └── newCases.ts
│   ├── store/              # State management
│   │   └── gameStore.ts
│   └── types/              # TypeScript definitions
│       └── game.ts
├── public/
│   ├── sprites/            # Character sprites
│   └── evidence/           # Evidence images
└── GAME_FEATURES.md        # Detailed feature documentation
```

## 🎨 Game Development Features

### Dialogue System
- **Branching Conversations** with multiple paths
- **Character Emotions** affecting sprite display
- **Evidence Requirements** for certain choices
- **Health/Confidence System** with consequences

### Animation System
- **Character Animations** (normal, pointing, objection, shocked)
- **Objection Overlays** with dramatic effects
- **Smooth Transitions** between game states
- **Visual Feedback** for player actions

### Evidence System
- **Interactive Inventory** with detailed descriptions
- **Evidence Combination** mechanics
- **Presentation System** for courtroom moments
- **Relevance Tracking** for case progression

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain the Phoenix Wright aesthetic
- Test all dialogue paths
- Ensure animations are smooth and performant

## 📜 License

This project is for educational and entertainment purposes. It's a fan-made tribute to Phoenix Wright: Ace Attorney and It's Always Sunny in Philadelphia.

## 🎭 Credits

- **Inspired by**: Phoenix Wright: Ace Attorney series by Capcom
- **Characters**: It's Always Sunny in Philadelphia
- **Development**: Built with modern web technologies
- **Art Style**: Phoenix Wright visual novel aesthetic

## 🐛 Known Issues

- None currently! All dialogue nodes are properly connected
- All animations work smoothly
- Evidence system is fully functional

## 🔮 Future Enhancements

- **Sound Effects** - Phoenix Wright-style audio
- **More Cases** - Additional bird law adventures
- **Voice Acting** - Character voice lines
- **Mobile Support** - Touch-friendly controls
- **Save System** - Progress persistence

---

*"Bird law in this country is not governed by reason!"* - Charlie Kelly, Bird Law Expert
