import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false,
  isLoading = false,
  hasShine = false
}) {
  const shouldReduceMotion = useReducedMotion();
  const baseStyle = "relative overflow-hidden px-6 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 select-none transition-shadow duration-300";
  
  const variants = {
    primary: "bg-brand-navy text-white hover:bg-brand-slate luxury-shadow",
    secondary: "bg-brand-gold text-brand-navy hover:bg-brand-goldlight luxury-shadow",
    accent: "bg-brand-royal text-white hover:bg-blue-700 luxury-shadow",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  };

  const hoverAnimation = shouldReduceMotion ? {} : { y: -2, scale: 1.02 };
  const tapAnimation = shouldReduceMotion ? {} : { scale: 0.98 };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {hasShine && !shouldReduceMotion && (
        <span className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <span className="animate-shine-glow" />
        </span>
      )}
      <span className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <>
            <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
            <span>Loading...</span>
          </>
        ) : children}
      </span>
    </motion.button>
  );
}
