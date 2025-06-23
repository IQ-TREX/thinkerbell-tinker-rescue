
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import AudioManager from '../components/AudioManager';
import PixelatedFairy from '../components/PixelatedFairy';

const Puzzle2 = () => {
  const [input, setInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '>> THINKERBELL PROTOCOL v7.3',
    '>> INITIALIZING MAGIC HOUR SEQUENCE...',
    '>> ERROR: BELL MODULE OFFLINE',
    '>> ACTION REQUIRED: ACTIVATE_MAGIC_HOUR_SEQUENCE',
    '>> SYSTEM PROMPT: RING_WHEN_MAGIC_HOUR_NEARS',
    '>> type_command_here'
  ]);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.toLowerCase().trim();
    
    setTerminalHistory(prev => [...prev, `>> ${input}`]);
    
    if (command === 'bellthink') {
      setTerminalHistory(prev => [
        ...prev,
        '>> COMMAND ACCEPTED',
        '>> BELL MODULE: ACTIVATING...',
        '>> MAGIC HOUR SEQUENCE: INITIATED',
        '>> COUNTDOWN TO MAGIC HOUR: STARTING'
      ]);
      
      AudioManager.playBellChime();
      setShowCountdown(true);
      
      setTimeout(() => {
        navigate('/reveal');
      }, 5000);
    } else {
      setTerminalHistory(prev => [
        ...prev,
        '>> COMMAND NOT RECOGNIZED',
        '>> HINT: THE BELL NEEDS TO THINK...'
      ]);
      AudioManager.playError();
    }
    
    setInput('');
  };

  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showCountdown, countdown]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
            </div>

            {/* Floating Pixelated Fairy */}
            <div className="absolute top-16 right-16 z-30">
              <PixelatedFairy />
            </div>

            {/* Main Terminal Window */}
            <div className="win95-window">
              {/* Window Title Bar */}
              <div className="window-titlebar">
                <div className="window-title">
                  <span className="title-icon">💻</span>
                  Terminal
                </div>
                <div className="window-controls">
                  <button className="control-btn">_</button>
                  <button className="control-btn">□</button>
                  <button className="control-btn">×</button>
                </div>
              </div>

              {/* Window Content */}
              <div className="window-content">
                {/* Terminal Header Info */}
                <div className="win95-info-box mb-4">
                  <div className="space-y-1 text-xs">
                    <div>&gt;&gt; TINKER KIT #4 (DIGITAL CORE) CORRUPTED</div>
                    <div>&gt;&gt; MEASURED MAGIC MACHINE: OFFLINE</div>
                    <div className="font-bold text-red-800">&gt;&gt; LAB CREDENTIALS REQUIRED</div>
                    <div>&gt;&gt; Enter Lab Credentials:</div>
                  </div>
                </div>

                {/* Hint Button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="win95-button text-xs flex items-center gap-1"
                  >
                    <Lightbulb size={12} />
                    HINT
                  </button>
                </div>

                {/* Hint Panel */}
                {showHint && (
                  <div className="win95-dialog mb-4">
                    <div className="text-xs space-y-1">
                      <div className="font-bold">💡 TERMINAL HINTS:</div>
                      <div>• The bell needs to think - combine these concepts</div>
                      <div>• Look at the error for clues about what's needed</div>
                      <div>• Try a command that makes a bell "think"</div>
                      <div>• Commands are case-insensitive</div>
                    </div>
                  </div>
                )}

                {/* Terminal Output */}
                <div className="bg-black text-green-400 p-4 h-48 overflow-y-auto font-mono text-xs mb-4 border-2 inset">
                  {terminalHistory.map((line, index) => (
                    <div 
                      key={index} 
                      className={
                        line.includes('ERROR') ? 'text-red-400 flickering' : 
                        line.includes('ACCEPTED') || line.includes('ACTIVATED') ? 'text-white font-bold' :
                        'text-green-400'
                      }
                    >
                      {line}
                    </div>
                  ))}
                  <div className="terminal-cursor">█</div>
                </div>
                
                {/* Input */}
                <form onSubmit={handleSubmit} className="mb-4">
                  <div className="flex items-center">
                    <span className="text-xs mr-2">&gt;&gt;</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="type_command_here"
                      className="win95-input flex-1 text-xs"
                      autoComplete="off"
                    />
                  </div>
                </form>

                {/* Magic Hour Countdown */}
                {showCountdown && (
                  <div className="win95-dialog text-center mb-4">
                    <div className="text-xs font-bold mb-2">MAGIC_HOUR_ACTIVATED</div>
                    <div className="text-2xl font-bold mb-2">{formatTime(countdown)}</div>
                    <div className="text-xs">&gt;&gt; THE BELL RESONATES... MAGIC HOUR APPROACHES...</div>
                  </div>
                )}

                {/* Status */}
                <div className="win95-info-box">
                  <div className="text-xs">
                    STATUS: PUZZLE_2_OF_2 | {showCountdown ? 'MAGIC_HOUR_INITIATED' : 'AWAITING_COMMAND'}
                  </div>
                </div>
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

export default Puzzle2;
