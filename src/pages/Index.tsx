
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlitchText from '../components/GlitchText';
import AudioManager from '../components/AudioManager';

const Index = () => {
  const [password, setPassword] = useState('');
  const [coffeeClicks, setCoffeeClicks] = useState(0);
  const [showError, setShowError] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
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
    
    // Boot sequence timer
    setTimeout(() => setBootSequence(false), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-black crt-monitor">
      <div className="crt-screen min-h-screen">
        {/* Main Content */}
        <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-6">
          <div className="text-center space-y-8 max-w-4xl w-full">
            {/* Boot Sequence */}
            {bootSequence && (
              <div className="terminal-box p-6 boot-sequence">
                <div className="terminal-text space-y-2">
                  <div>THINKERBELL OS v2.1</div>
                  <div>BOOTING SYSTEM...</div>
                  <div>LOADING MAGIC PROTOCOLS...</div>
                  <div className="terminal-cursor">█</div>
                </div>
              </div>
            )}

            {!bootSequence && (
              <>
                {/* System Error Header */}
                <div className="space-y-4">
                  <GlitchText 
                    text="CRITICAL SYSTEM FAILURE" 
                    className="text-4xl md:text-6xl font-mono font-bold terminal-text"
                  />
                  <GlitchText 
                    text="404: MAGIC SIGNAL LOST" 
                    className="text-2xl md:text-3xl font-mono terminal-text-bright flickering"
                  />
                </div>

                {/* Description */}
                <div className="terminal-box p-6">
                  <div className="terminal-text text-lg leading-relaxed space-y-2">
                    <div>&gt; TINKER KIT #4 (DIGITAL CORE) CORRUPTED</div>
                    <div>&gt; MEASURED MAGIC MACHINE: OFFLINE</div>
                    <div className="terminal-error font-bold">&gt; LAB CREDENTIALS REQUIRED</div>
                  </div>
                </div>

                {/* Password Form */}
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="relative">
                    <div className="flex items-center terminal-box p-4">
                      <span className="terminal-text mr-3">&gt;</span>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="ENTER_LAB_CREDENTIALS"
                        className="flex-1 terminal-input bg-transparent border-none outline-none text-xl"
                      />
                      <div className="terminal-cursor ml-2">█</div>
                    </div>
                    {showError && (
                      <div className="absolute -bottom-8 left-0 terminal-error font-mono text-sm flickering">
                        ACCESS DENIED
                      </div>
                    )}
                  </div>
                  
                  <button
                    id="unlock-btn"
                    type="submit"
                    className="terminal-button py-3 px-8 text-lg font-bold"
                  >
                    [UNLOCK_SYSTEM]
                  </button>
                </form>

                {/* Coffee Easter Egg */}
                <div className="flex justify-center pt-8">
                  <div 
                    onClick={handleCoffeeClick}
                    className="cursor-pointer hover:scale-110 transition-transform duration-300"
                  >
                    <div className="text-6xl terminal-text">
                      ☕
                    </div>
                    {coffeeClicks >= 5 && (
                      <div className="terminal-text-bright font-mono text-sm mt-2 flickering">
                        CREATIVE_FUEL_DETECTED
                      </div>
                    )}
                  </div>
                </div>

                {/* System Info */}
                <div className="terminal-box p-4">
                  <div className="terminal-text-dim text-sm font-mono space-y-1">
                    <div>SYSTEM: THINKERBELL_WORKSTATION</div>
                    <div>STATUS: AWAITING_INPUT</div>
                    <div>UPTIME: {new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
