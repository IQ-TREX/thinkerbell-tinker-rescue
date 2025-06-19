
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
    <div className="win95-monitor">
      {/* Monitor Bezel */}
      <div className="monitor-bezel">
        {/* Monitor Screen */}
        <div className="monitor-screen">
          {/* Windows 95 Taskbar */}
          <div className="win95-taskbar">
            <div className="start-button">
              <div className="start-logo"></div>
              <span>Start</span>
            </div>
            <div className="system-tray">
              <div className="tray-icons">
                <span>🔊</span>
                <span>📶</span>
              </div>
              <div className="clock">{new Date().toLocaleTimeString().slice(0, 5)}</div>
            </div>
          </div>

          {/* Desktop Area */}
          <div className="win95-desktop">
            {/* Desktop Icons */}
            <div className="desktop-icons">
              <div className="desktop-icon">
                <div className="icon-image">💻</div>
                <div className="icon-label">My Computer</div>
              </div>
              <div className="desktop-icon">
                <div className="icon-image">📁</div>
                <div className="icon-label">My Documents</div>
              </div>
              <div className="desktop-icon">
                <div className="icon-image">🗑️</div>
                <div className="icon-label">Recycle Bin</div>
              </div>
              <div className="desktop-icon">
                <div className="icon-image">🌐</div>
                <div className="icon-label">Network Neighborhood</div>
              </div>
            </div>

            {/* Floating Pixelated Fairy */}
            <div className="absolute top-16 right-16 z-30">
              <PixelatedFairy />
            </div>

            {/* Main Application Window */}
            <div className="win95-window">
              {/* Window Title Bar */}
              <div className="window-titlebar">
                <div className="window-title">
                  <span className="title-icon">🔒</span>
                  System Recovery Console
                </div>
                <div className="window-controls">
                  <button className="control-btn">_</button>
                  <button className="control-btn">□</button>
                  <button className="control-btn">×</button>
                </div>
              </div>

              {/* Window Content */}
              <div className="window-content">
                {/* Boot Sequence */}
                {bootSequence && (
                  <div className="win95-dialog boot-sequence">
                    <div className="space-y-1 text-xs">
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
                    <div className="space-y-3">
                      <GlitchText 
                        text="CRITICAL SYSTEM FAILURE" 
                        className="text-2xl font-bold win95-error-text"
                      />
                      <GlitchText 
                        text="404: MAGIC SIGNAL LOST" 
                        className="text-lg win95-warning-text flickering"
                      />
                    </div>

                    {/* Description */}
                    <div className="win95-info-box my-4">
                      <div className="space-y-1 text-xs">
                        <div>&gt; TINKER KIT #4 (DIGITAL CORE) CORRUPTED</div>
                        <div>&gt; MEASURED MAGIC MACHINE: OFFLINE</div>
                        <div className="font-bold text-red-800">&gt; LAB CREDENTIALS REQUIRED</div>
                      </div>
                    </div>

                    {/* Password Form */}
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="relative">
                        <div className="win95-input-group">
                          <label className="input-label">Enter Lab Credentials:</label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="ENTER_LAB_CREDENTIALS"
                            className="win95-input"
                          />
                        </div>
                        {showError && (
                          <div className="win95-error-msg">
                            ❌ ACCESS DENIED
                          </div>
                        )}
                      </div>
                      
                      <button
                        id="unlock-btn"
                        type="submit"
                        className="win95-button"
                      >
                        Unlock System
                      </button>
                    </form>

                    {/* Coffee Easter Egg */}
                    <div className="flex justify-center pt-4">
                      <div 
                        onClick={handleCoffeeClick}
                        className="cursor-pointer hover:bg-blue-200 p-2 transition-colors duration-300"
                      >
                        <div className="text-2xl">
                          ☕
                        </div>
                        {coffeeClicks >= 5 && (
                          <div className="text-blue-800 text-xs mt-1">
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

      {/* Monitor Controls */}
      <div className="monitor-controls">
        <div className="monitor-control-knob"></div>
        <div className="monitor-control-knob"></div>
      </div>

      {/* Monitor Brand */}
      <div className="monitor-brand">
        THINKERBELL CRT-95
      </div>
    </div>
  );
};

export default Index;
