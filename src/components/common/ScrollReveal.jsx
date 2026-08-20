import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Premium cubic-bezier easing
const PREMIUM_EASE = [0.25, 0.1, 0.25, 1];

export default function ScrollReveal({ 
  children, 
  variant = 'fadeUp', 
  delay = 0, 
  duration = 0.6,
  once = true, // default to once for premium feel (doesn't repeat and lag)
  className = '',
  amount = 0.15
}) {
  const shouldReduceMotion = useReducedMotion();

  const getVariants = () => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } }
      };
    }

    const presets = {
      fadeUp: {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      },
      fadeDown: {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0 }
      },
      fadeLeft: {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 }
      },
      fadeRight: {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 }
      },
      scaleIn: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
      },
      blurIn: {
        hidden: { opacity: 0, filter: 'blur(8px)' },
        visible: { opacity: 1, filter: 'blur(0px)' }
      }
    };

    return {
      hidden: presets[variant]?.hidden || presets.fadeUp.hidden,
      visible: {
        ...(presets[variant]?.visible || presets.fadeUp.visible),
        transition: {
          duration,
          delay,
          ease: PREMIUM_EASE
        }
      }
    };
  };

  const animationVariants = getVariants();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={animationVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Reusable Stagger Container for list animations
export function StaggerContainer({ children, delayChildren = 0, staggerChildren = 0.08, className = '', once = true, amount = 0.1 }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Reusable Stagger Item to go inside StaggerContainer
export function StaggerItem({ children, variant = 'fadeUp', className = '' }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const presets = {
    fadeUp: {
      hidden: { opacity: 0, y: 25 },
      visible: { opacity: 1, y: 0, transition: { ease: PREMIUM_EASE, duration: 0.5 } }
    },
    fadeDown: {
      hidden: { opacity: 0, y: -25 },
      visible: { opacity: 1, y: 0, transition: { ease: PREMIUM_EASE, duration: 0.5 } }
    },
    fadeLeft: {
      hidden: { opacity: 0, x: 25 },
      visible: { opacity: 1, x: 0, transition: { ease: PREMIUM_EASE, duration: 0.5 } }
    },
    fadeRight: {
      hidden: { opacity: 0, x: -25 },
      visible: { opacity: 1, x: 0, transition: { ease: PREMIUM_EASE, duration: 0.5 } }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { ease: PREMIUM_EASE, duration: 0.5 } }
    }
  };

  const itemVariants = presets[variant] || presets.fadeUp;

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

