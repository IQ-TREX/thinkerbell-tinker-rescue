
import { useState, useEffect } from 'react';

const PixelatedFairy = () => {
  const [isFlying, setIsFlying] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number}>>([]);

  useEffect(() => {
    const flyInterval = setInterval(() => {
      setIsFlying(prev => !prev);
    }, 2000);

    const sparkleInterval = setInterval(() => {
      const newSparkle = {
        id: Date.now(),
        x: Math.random() * 50,
        y: Math.random() * 50
      };
      setSparkles(prev => [...prev, newSparkle]);
      
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 1500);
    }, 800);

    return () => {
      clearInterval(flyInterval);
      clearInterval(sparkleInterval);
    };
  }, []);

  return (
    <div className="relative inline-block">
      {/* Pixelated Fairy */}
      <div className={`pixel-fairy ${isFlying ? 'fairy-fly' : ''}`}>
        <div className="fairy-body">
          {/* Head */}
          <div className="fairy-head">
            <div className="pixel-row">
              <div className="pixel bg-pink-300"></div>
              <div className="pixel bg-pink-200"></div>
              <div className="pixel bg-pink-200"></div>
              <div className="pixel bg-pink-300"></div>
            </div>
            <div className="pixel-row">
              <div className="pixel bg-pink-200"></div>
              <div className="pixel bg-black"></div>
              <div className="pixel bg-black"></div>
              <div className="pixel bg-pink-200"></div>
            </div>
            <div className="pixel-row">
              <div className="pixel bg-pink-200"></div>
              <div className="pixel bg-pink-100"></div>
              <div className="pixel bg-pink-100"></div>
              <div className="pixel bg-pink-200"></div>
            </div>
          </div>
          
          {/* Wings */}
          <div className="fairy-wings">
            <div className="wing-left">
              <div className="pixel-row">
                <div className="pixel bg-cyan-200"></div>
                <div className="pixel bg-cyan-300"></div>
              </div>
              <div className="pixel-row">
                <div className="pixel bg-cyan-300"></div>
                <div className="pixel bg-cyan-200"></div>
              </div>
            </div>
            <div className="wing-right">
              <div className="pixel-row">
                <div className="pixel bg-cyan-300"></div>
                <div className="pixel bg-cyan-200"></div>
              </div>
              <div className="pixel-row">
                <div className="pixel bg-cyan-200"></div>
                <div className="pixel bg-cyan-300"></div>
              </div>
            </div>
          </div>
          
          {/* Body */}
          <div className="fairy-torso">
            <div className="pixel-row">
              <div className="pixel bg-purple-300"></div>
              <div className="pixel bg-purple-400"></div>
              <div className="pixel bg-purple-300"></div>
            </div>
            <div className="pixel-row">
              <div className="pixel bg-purple-400"></div>
              <div className="pixel bg-purple-300"></div>
              <div className="pixel bg-purple-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Magic Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute pixel-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
        >
          <div className="pixel bg-yellow-300 sparkle-anim"></div>
        </div>
      ))}
    </div>
  );
};

export default PixelatedFairy;
