
'use client';

const skills = [
  "C", "C++", "Java", "Python", "JavaScript", "C#", "SQL", "PHP",
  "React.js", "Node.js", "ASP.Net",
  "MySQL", "MongoDB", "Vercel",
  "App Development", "Image Processing"
];

const PANEL_COUNT = skills.length;
const PANEL_SIZE = 200; // Panel width
const RADIUS = PANEL_SIZE / 2 / Math.tan(Math.PI / PANEL_COUNT) + 50; // Add some padding

export function SkillsCarousel() {
  return (
    <div className="carousel-container">
      <div className="carousel">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="carousel-panel"
            style={{
              width: `${PANEL_SIZE}px`,
              transform: `rotateY(${index * (360 / PANEL_COUNT)}deg) translateZ(${RADIUS}px)`,
            }}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}
