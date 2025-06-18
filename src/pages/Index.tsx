
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlitchText from '../components/GlitchText';
import AudioManager from '../components/AudioManager';
import PixelatedFairy from '../components/PixelatedFairy';

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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-8">
      {/* Windows XP Monitor Frame */}
      <div className="winxp-monitor mx-auto">
        {/* Monitor Stand */}
        <div className="monitor-stand"></div>
        
        {/* Monitor Screen */}
        <div className="monitor-screen">
          {/* Windows XP Taskbar */}
          <div className="winxp-taskbar">
            <div className="start-button">
              <span className="start-text">start</span>
            </div>
            <div className="taskbar-items">
              <div className="system-tray">
                <div className="tray-icons">
                  <span className="tray-icon">🔊</span>
                  <span className="tray-icon">📶</span>
                  <span className="clock">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Area */}
          <div className="winxp-desktop">
            {/* Desktop Icons */}
            <div className="desktop-icons">
              <div className="desktop-icon">
                <div className="icon-image">💻</div>
                <div className="icon-label">My Computer</div>
              </div>
              <div className="desktop-icon">
                <div className="icon-image">🗂️</div>
                <div className="icon-label">My Documents</div>
              </div>
              <div className="desktop-icon">
                <div className="icon-image">🗑️</div>
                <div className="icon-label">Recycle Bin</div>
              </div>
            </div>

            {/* Floating Pixelated Fairy */}
            <div className="absolute top-20 right-20 z-30">
              <PixelatedFairy />
            </div>

            {/* Main Application Window */}
            <div className="winxp-window">
              {/* Window Title Bar */}
              <div className="window-titlebar">
                <div className="window-title">
                  <span className="title-icon">🔒</span>
                  System Recovery Console
                </div>
                <div className="window-controls">
                  <button className="control-btn minimize">_</button>
                  <button className="control-btn maximize">□</button>
                  <button className="control-btn close">×</button>
                </div>
              </div>

              {/* Window Content */}
              <div className="window-content">
                {/* Boot Sequence */}
                {bootSequence && (
                  <div className="winxp-dialog p-6 boot-sequence">
                    <div className="dialog-content space-y-2">
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
                        className="text-3xl md:text-5xl font-bold winxp-error-text"
                      />
                      <GlitchText 
                        text="404: MAGIC SIGNAL LOST" 
                        className="text-xl md:text-2xl winxp-warning-text flickering"
                      />
                    </div>

                    {/* Description */}
                    <div className="winxp-info-box p-4 my-6">
                      <div className="info-content space-y-2">
                        <div>&gt; TINKER KIT #4 (DIGITAL CORE) CORRUPTED</div>
                        <div>&gt; MEASURED MAGIC MACHINE: OFFLINE</div>
                        <div className="font-bold text-red-600">&gt; LAB CREDENTIALS REQUIRED</div>
                      </div>
                    </div>

                    {/* Password Form */}
                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                      <div className="relative">
                        <div className="winxp-input-group">
                          <label className="input-label">Enter Lab Credentials:</label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="ENTER_LAB_CREDENTIALS"
                            className="winxp-input"
                          />
                        </div>
                        {showError && (
                          <div className="winxp-error-msg">
                            ❌ ACCESS DENIED
                          </div>
                        )}
                      </div>
                      
                      <button
                        id="unlock-btn"
                        type="submit"
                        className="winxp-button"
                      >
                        Unlock System
                      </button>
                    </form>

                    {/* Coffee Easter Egg */}
                    <div className="flex justify-center pt-6">
                      <div 
                        onClick={handleCoffeeClick}
                        className="cursor-pointer hover:scale-110 transition-transform duration-300 winxp-icon-large"
                      >
                        <div className="text-4xl">
                          ☕
                        </div>
                        {coffeeClicks >= 5 && (
                          <div className="text-blue-600 text-sm mt-2 animate-pulse">
                            CREATIVE_FUEL_DETECTED
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
