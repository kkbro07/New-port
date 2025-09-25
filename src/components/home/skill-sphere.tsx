
'use client';

import React, { useEffect, useRef, useState } from 'react';

const SKILL_SPHERE_STYLES = {
  container: {
    width: '100%',
    height: '450px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  } as React.CSSProperties,
  skill: {
    position: 'absolute',
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: 'hsl(var(--secondary) / 0.8)',
    color: 'hsl(var(--primary))',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'default',
    userSelect: 'none',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    border: '1px solid hsl(var(--primary) / 0.1)',
    willChange: 'transform, opacity',
    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
  } as React.CSSProperties,
};

const calculatePosition = (
  index: number,
  total: number,
  radius: number,
  rotationX: number,
  rotationY: number
) => {
  const phi = Math.acos(-1 + (2 * index + 1) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;

  const sinPhi = Math.sin(phi);
  const cosPhi = Math.cos(phi);
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);

  // Raw 3D coordinates
  let x = sinPhi * cosTheta;
  let y = sinPhi * sinTheta;
  let z = cosPhi;

  // Rotate around Y-axis
  const newX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
  const newZ = x * Math.sin(rotationY) + z * Math.cos(rotationY);
  x = newX;
  z = newZ;

  // Rotate around X-axis
  const newY = y * Math.cos(rotationX) - z * Math.sin(rotationX);
  const newZ2 = y * Math.sin(rotationX) + z * Math.cos(rotationX);
  y = newY;
  z = newZ2;

  const scale = (z + 2) / 3;
  const transform = `translateX(-50%) translateY(-50%) translate3d(${x * radius}px, ${y * radius}px, 0) scale(${scale})`;
  const opacity = (z + 1.5) / 2.5;

  return { transform, opacity };
};

export function SkillSphere({ skills }: { skills: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const isInteracting = useRef(false);
  const [radius, setRadius] = useState(150);
  const [isMounted, setIsMounted] = useState(false);
  const dampingFactor = 0.95;

  useEffect(() => {
    if (containerRef.current) {
      setRadius(containerRef.current.offsetWidth / 3.5);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setRotation((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (isInteracting.current) {
          // While dragging, velocity is directly tied to mouse movement (handled in onMouseMove)
          newX += velocityRef.current.x;
          newY += velocityRef.current.y;
        } else {
          // Apply inertia
          newX += velocityRef.current.x;
          newY += velocityRef.current.y;
          
          // Apply damping (friction)
          velocityRef.current.x *= dampingFactor;
          velocityRef.current.y *= dampingFactor;

          // Stop animation when velocity is negligible
          if (Math.abs(velocityRef.current.x) < 0.0001 && Math.abs(velocityRef.current.y) < 0.0001) {
            velocityRef.current.x = 0;
            velocityRef.current.y = 0;
          }
        }
        
        // Add a slow, constant rotation when not interacting and velocity is near zero
        if (!isInteracting.current && velocityRef.current.x === 0 && velocityRef.current.y === 0) {
            newX -= 0.0002;
            newY += 0.0004;
        }

        return { x: newX, y: newY };
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isInteracting.current = true;
    mousePosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
  };
  
  const handleMouseUp = () => {
    isInteracting.current = false;
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isInteracting.current) {
      const dx = e.clientX - mousePosRef.current.x;
      const dy = e.clientY - mousePosRef.current.y;
      
      const newRotationX = -dy * 0.001;
      const newRotationY = dx * 0.001;

      velocityRef.current = { x: newRotationX, y: newRotationY };
      
      setRotation(prev => ({
        x: prev.x + newRotationX,
        y: prev.y + newRotationY,
      }));

      mousePosRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseLeave = () => {
    isInteracting.current = false;
  }

  return (
    <div
      ref={containerRef}
      style={SKILL_SPHERE_STYLES.container}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ transformStyle: 'preserve-3d' }}>
        {isMounted && skills.map((skill, index) => {
          const { transform, opacity } = calculatePosition(
            index,
            skills.length,
            radius,
            rotation.x,
            rotation.y
          );

          return (
            <div
              key={skill}
              style={{
                ...SKILL_SPHERE_STYLES.skill,
                transform,
                opacity,
              }}
            >
              {skill}
            </div>
          );
        })}
      </div>
    </div>
  );
}
