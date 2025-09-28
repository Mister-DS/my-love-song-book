import React, { useState, useEffect } from 'react';

interface ShootingStar {
  id: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
}

const StarryBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  
  useEffect(() => {
    // Fonction pour créer une étoile filante
    const createShootingStar = (): ShootingStar => ({
      id: Date.now() + Math.random(),
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 30}%`, // Commencer à gauche
      delay: `${Math.random() * 2}s`,
      duration: `${1 + Math.random() * 3}s`
    });
    
    // Créer quelques étoiles filantes initiales
    setShootingStars(Array.from({ length: 3 }, createShootingStar));
    
    // Ajouter de nouvelles étoiles filantes périodiquement
    const interval = setInterval(() => {
      setShootingStars(prev => {
        // Limiter à 5 étoiles filantes à la fois
        if (prev.length > 4) {
          const newStars = [...prev];
          newStars.shift(); // Supprimer la plus ancienne
          newStars.push(createShootingStar());
          return newStars;
        }
        return [...prev, createShootingStar()];
      });
    }, 4000); // Nouvelle étoile toutes les 4 secondes
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="starry-background relative min-h-screen overflow-hidden">
      {/* Style CSS pour le fond étoilé et les étoiles filantes */}
      <style>
        {`
          .starry-background {
            background-color: #0f172a; /* Couleur de fond sombre */
            background-image: 
              radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
            background-size: 100px 100px, 120px 120px, 80px 80px;
            background-position: 0 0, 0 0, 0 0;
            position: relative;
          }
          
          .star {
            position: absolute;
            width: 1px;
            height: 1px;
            background-color: white;
            border-radius: 50%;
            animation: twinkle 4s infinite ease-in-out;
            opacity: 0;
          }
          
          .star:nth-child(2n) {
            animation-delay: 1s;
          }
          
          .star:nth-child(3n) {
            animation-delay: 2s;
          }
          
          .star:nth-child(4n) {
            animation-delay: 3s;
          }
          
          .shooting-star {
            position: absolute;
            width: 100px;
            height: 1px;
            background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
            animation: shooting-star 4s linear forwards;
            opacity: 0;
            transform: rotate(-45deg) translateX(-100%);
          }
          
          @keyframes twinkle {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
          
          @keyframes shooting-star {
            0% {
              opacity: 0;
              transform: rotate(-45deg) translateX(-100%);
            }
            10% {
              opacity: 1;
            }
            40% {
              opacity: 1;
            }
            60% {
              opacity: 0;
              transform: rotate(-45deg) translateX(2000%);
            }
            100% {
              opacity: 0;
              transform: rotate(-45deg) translateX(2000%);
            }
          }
        `}
      </style>
      
      {/* Étoiles fixes */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
          }}
        />
      ))}
      
      {/* Étoiles filantes */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
      
      {/* Contenu de la page */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default StarryBackground;