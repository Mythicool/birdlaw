'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ObjectionAnimationProps {
  isVisible: boolean;
  text?: string;
  type?: 'objection' | 'hold-it' | 'take-that' | 'gotcha';
  onComplete?: () => void;
}

export const ObjectionAnimation: React.FC<ObjectionAnimationProps> = ({
  isVisible,
  text,
  type = 'objection',
  onComplete
}) => {
  const getObjectionText = () => {
    switch (type) {
      case 'hold-it':
        return text || 'HOLD IT!';
      case 'take-that':
        return text || 'TAKE THAT!';
      case 'gotcha':
        return text || 'GOTCHA!';
      default:
        return text || 'OBJECTION!';
    }
  };

  const getObjectionColor = () => {
    switch (type) {
      case 'hold-it':
        return 'from-orange-600 to-red-600';
      case 'take-that':
        return 'from-blue-600 to-purple-600';
      case 'gotcha':
        return 'from-green-600 to-emerald-600';
      default:
        return 'from-red-600 to-red-800';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'hold-it':
        return 'border-orange-800';
      case 'take-that':
        return 'border-blue-800';
      case 'gotcha':
        return 'border-green-800';
      default:
        return 'border-red-900';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onComplete}
        >
          {/* Background flash */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.3, times: [0, 0.1, 1] }}
          />
          
          {/* Speed lines background */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-black h-1 origin-center"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${50 + Math.random() * 100}px`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.3 }}
                transition={{ 
                  delay: i * 0.02,
                  duration: 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
          
          {/* Main objection text */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0, rotate: -10 }}
            animate={{
              scale: 1,
              rotate: 0
            }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 300
            }}
          >
            <div className={`bg-gradient-to-br ${getObjectionColor()} text-white px-12 py-6 rounded-2xl font-bold text-6xl shadow-2xl border-8 ${getBorderColor()} transform -skew-x-3`}>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {getObjectionText()}
              </motion.span>
            </div>
            
            {/* Glow effect */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${getObjectionColor()} rounded-2xl blur-xl opacity-50 -z-10`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          
          {/* Dramatic impact lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) - 15;
              return (
                <motion.div
                  key={i}
                  className="absolute bg-yellow-400 h-2 origin-left"
                  style={{
                    top: '50%',
                    left: '50%',
                    width: '200px',
                    transform: `rotate(${angle}deg) translateY(-50%)`
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ 
                    delay: 0.3 + i * 0.03,
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                />
              );
            })}
          </motion.div>
          
          {/* Particle effects */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                style={{
                  top: `${45 + Math.random() * 10}%`,
                  left: `${45 + Math.random() * 10}%`,
                }}
                initial={{ 
                  scale: 0,
                  x: 0,
                  y: 0
                }}
                animate={{
                  scale: 1,
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  opacity: 0
                }}
                transition={{
                  delay: 0.4 + i * 0.02,
                  duration: 1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
          
          {/* Sound effect text */}
          <motion.div
            className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-gray-800"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.4,
              type: "tween"
            }}
          >
            *SLAM!*
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
