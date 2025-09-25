
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SKILL_STYLES = {
  container: {
    width: '100%',
    height: '450px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  } as React.CSSProperties,
  pill: {
    position: 'absolute',
    padding: '10px 20px',
    borderRadius: '9999px',
    border: '1px solid hsl(var(--primary) / 0.2)',
    backgroundColor: 'hsl(var(--secondary) / 0.5)',
    color: 'hsl(var(--primary))',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'default',
    userSelect: 'none',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  } as React.CSSProperties,
};

const DAMPING = 0.02;
const MOUSE_PULL = 0.05;
const BOUNDS_PULL = 0.005;

type SkillPillProps = {
  skill: string;
  mousePos: { x: number; y: number } | null;
  bounds: DOMRect | null;
};

const SkillPill = ({ skill, mousePos, bounds }: SkillPillProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bounds) {
      setPosition({
        x: Math.random() * bounds.width * 0.5 + bounds.width * 0.25,
        y: Math.random() * bounds.height * 0.5 + bounds.height * 0.25,
      });
    }
  }, [bounds]);

  useEffect(() => {
    const update = () => {
      let dxMouse = 0;
      let dyMouse = 0;

      if (mousePos && pillRef.current && bounds) {
        const pillRect = pillRef.current.getBoundingClientRect();
        const pillCenterX = pillRect.left + pillRect.width / 2;
        const pillCenterY = pillRect.top + pillRect.height / 2;

        const dist = Math.hypot(pillCenterX - mousePos.x, pillCenterY - mousePos.y);
        
        if (dist < 100) {
          dxMouse = (pillCenterX - mousePos.x) * MOUSE_PULL;
          dyMouse = (pillCenterY - mousePos.y) * MOUSE_PULL;
        }
      }
      
      const centerX = bounds ? bounds.width / 2 : 0;
      const centerY = bounds ? bounds.height / 2 : 0;
      const dxBounds = (centerX - position.x) * BOUNDS_PULL;
      const dyBounds = (centerY - position.y) * BOUNDS_PULL;


      const newVelocity = {
        x: (velocity.x + dxMouse + dxBounds) * (1 - DAMPING),
        y: (velocity.y + dyMouse + dyBounds) * (1 - DAMPING),
      };

      setVelocity(newVelocity);
      setPosition((pos) => ({
        x: pos.x + newVelocity.x,
        y: pos.y + newVelocity.y,
      }));
    };

    const animationFrame = requestAnimationFrame(function animate() {
      update();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [position, velocity, mousePos, bounds]);

  return (
    <motion.div
      ref={pillRef}
      style={{
        ...SKILL_STYLES.pill,
        x: position.x,
        y: position.y,
      }}
    >
      {skill}
    </motion.div>
  );
};


export function SkillCloud({ skills }: { skills: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [bounds, setBounds] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (containerRef.current) {
        setBounds(containerRef.current.getBoundingClientRect());
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseLeave = () => {
    setMousePos(null);
  }

  return (
    <div 
        ref={containerRef}
        style={SKILL_STYLES.container} 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    >
      {skills.map((skill) => (
        <SkillPill key={skill} skill={skill} mousePos={mousePos} bounds={bounds} />
      ))}
    </div>
  );
}
