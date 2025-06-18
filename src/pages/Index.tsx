
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlitchText from '../components/GlitchText';
import AudioManager from '../components/AudioManager';

const Index = () => {
  const [password, setPassword] = useState('');
  const [coffeeClicks, setCoffeeClicks] = useState(0);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'tinker // magic' || password.toLowerCase() === 'tinker//magic') {
      AudioManager.playSuccess();
      navigate('/puzzle1');
    } else {
      setShowError(true);
      AudioManager.playError();
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleCoffeeClick = () => {
    setCoffeeClicks(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        AudioManager.playCoffeeBrewing();
      }
      return newCount;
    });
  };

  useEffect(() => {
    // Start background ambience
    AudioManager.startBackgroundMusic();
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* VHS Distortion Overlay */}
      <div className="vhs-overlay"></div>
      
      {/* Scanlines */}
      <div className="scanlines"></div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-2xl">
          {/* System Error Header */}
          <div className="space-y-4">
            <GlitchText 
              text="CRITICAL SYSTEM FAILURE" 
              className="text-4xl md:text-6xl font-mono font-bold text-[#E62E2E]"
            />
            <GlitchText 
              text="404: MAGIC SIGNAL LOST" 
              className="text-2xl md:text-3xl font-mono text-[#00F0FF] flickering"
            />
          </div>

          {/* Description */}
          <div className="bg-black/80 border border-[#0055FF] p-6 glitch-border">
            <p className="text-[#00F0FF] font-mono text-lg leading-relaxed">
              Tinker Kit #4 (DIGITAL CORE) is corrupted.<br/>
              Without it, the Measured Magic Machine cannot function.<br/>
              <span className="text-[#E62E2E] font-bold">LAB CREDENTIALS REQUIRED</span>
            </p>
          </div>

          {/* Password Form */}
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Lab Credentials"
                className="w-full bg-black border-2 border-[#0055FF] text-[#00F0FF] font-mono text-xl p-4 focus:border-[#00F0FF] focus:outline-none glitch-input"
              />
              {showError && (
                <div className="absolute -bottom-8 left-0 text-[#E62E2E] font-mono text-sm flickering">
                  ACCESS DENIED
                </div>
              )}
            </div>
            
            <button
              id="unlock-btn"
              type="submit"
              className="bg-[#0055FF] hover:bg-[#00F0FF] text-black font-mono font-bold py-3 px-8 border-2 border-[#00F0FF] transition-all duration-300 hover:shadow-glow"
            >
              UNLOCK SYSTEM
            </button>
          </form>

          {/* Coffee Easter Egg */}
          <div className="flex justify-center pt-8">
            <div 
              onClick={handleCoffeeClick}
              className="cursor-pointer hover:scale-110 transition-transform duration-300"
            >
              <div className="text-6xl coffee-cup">
                ☕
                {coffeeClicks >= 1 && <div className="steam"></div>}
              </div>
              {coffeeClicks >= 5 && (
                <div className="text-[#00F0FF] font-mono text-sm mt-2 flickering">
                  CREATIVE FUEL DETECTED
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
