import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function GlassCard({ children, className = '', hoverEffect = true, delay = 0 }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (!hoverEffect || !cardRef.current || shouldReduceMotion) return;
    
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Offset from card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max 4 degrees tilt for premium, subtle luxury effect
    const rotateX = (-mouseY / (height / 2)) * 4;
    const rotateY = (mouseX / (width / 2)) * 4;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const cardContent = (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: hoverEffect && !shouldReduceMotion ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` : 'none',
        transition: 'transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
        transformStyle: 'preserve-3d'
      }}
      className={`glass-panel rounded-2xl p-6 transition-shadow duration-300 luxury-shadow ${
        hoverEffect ? 'hover:shadow-2xl hover:bg-white/60 hover:-translate-y-1' : ''
      } ${className}`}
    >
      <div style={{ transform: hoverEffect && !shouldReduceMotion ? 'translateZ(10px)' : 'none' }}>
        {children}
      </div>
    </div>
  );

  if (hoverEffect) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}
