
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
  const [glitchText, setGlitchText] = useState(text);

  useEffect(() => {
    const glitchChars = '!<>-_\\/[]{}—=+*^?#01_____';
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        const newText = text
          .split('')
          .map(char => 
            Math.random() > 0.9 
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join('');
        
        setGlitchText(newText);
        
        setTimeout(() => setGlitchText(text), 150);
      }
    }, 300);

    return () => clearInterval(glitchInterval);
  }, [text]);

  return (
    <div className={`glitch-text ${className}`}>
      <span className="glitch-text-main">{glitchText}</span>
      <span className="glitch-text-copy" aria-hidden="true">{glitchText}</span>
      <span className="glitch-text-copy" aria-hidden="true">{glitchText}</span>
    </div>
  );
};

export default GlitchText;
