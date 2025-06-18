
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioManager from '../components/AudioManager';

const Puzzle2 = () => {
  const [input, setInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '> THINKERBELL PROTOCOL v7.3',
    '> INITIALIZING MAGIC HOUR SEQUENCE...',
    '> ERROR: BELL MODULE OFFLINE',
    '> ACTION REQUIRED: ACTIVATE_MAGIC_HOUR_SEQUENCE',
    '> SYSTEM PROMPT: RING_WHEN_MAGIC_HOUR_NEARS',
    '> type_command_here'
  ]);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.toLowerCase().trim();
    
    setTerminalHistory(prev => [...prev, `> ${input}`]);
    
    if (command === 'bellthink') {
      setTerminalHistory(prev => [
        ...prev,
        '> COMMAND ACCEPTED',
        '> BELL MODULE: ACTIVATING...',
        '> MAGIC HOUR SEQUENCE: INITIATED',
        '> COUNTDOWN TO MAGIC HOUR: STARTING'
      ]);
      
      AudioManager.playBellChime();
      setShowCountdown(true);
      
      setTimeout(() => {
        navigate('/reveal');
      }, 5000);
    } else {
      setTerminalHistory(prev => [
        ...prev,
        '> COMMAND NOT RECOGNIZED',
        '> HINT: THE BELL NEEDS TO THINK...'
      ]);
      AudioManager.playError();
    }
    
    setInput('');
  };

  // Countdown timer
  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showCountdown, countdown]);

  // Auto-focus input
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
    <div className="min-h-screen bg-black crt-monitor">
      <div className="crt-screen min-h-screen p-6">
        <div className="relative z-20 max-w-4xl mx-auto">
          {/* Terminal Header */}
          <div className="terminal-box p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm terminal-text-dim ml-4">THINKERBELL_TERMINAL.exe</span>
            </div>
            
            {/* Terminal Output */}
            <div className="terminal-output space-y-2 mb-6 h-96 overflow-y-auto p-4">
              {terminalHistory.map((line, index) => (
                <div 
                  key={index} 
                  className={`font-mono ${
                    line.includes('ERROR') ? 'terminal-error flickering' : 
                    line.includes('COMMAND ACCEPTED') || line.includes('ACTIVATED') ? 'terminal-text-bright' :
                    'terminal-text'
                  }`}
                >
                  {line}
                </div>
              ))}
              <div className="terminal-cursor">█</div>
            </div>
            
            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center terminal-box p-3">
              <span className="terminal-text-bright mr-2">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type_command_here"
                className="flex-1 terminal-input bg-transparent border-none outline-none"
                autoComplete="off"
              />
              <div className="terminal-cursor ml-1">█</div>
            </form>
          </div>

          {/* Magic Hour Countdown */}
          {showCountdown && (
            <div className="terminal-box p-6 text-center mb-6">
              <h2 className="text-2xl font-bold terminal-text-bright mb-4">
                MAGIC_HOUR_ACTIVATED
              </h2>
              <div className="text-6xl font-bold countdown-display mb-4">
                {formatTime(countdown)}
              </div>
              <p className="text-lg terminal-text">
                &gt; THE BELL RESONATES... MAGIC HOUR APPROACHES...
              </p>
            </div>
          )}

          {/* Help Section */}
          <div className="terminal-box p-4 mb-6">
            <details>
              <summary className="terminal-text-bright cursor-pointer hover:text-shadow transition-colors font-mono">
                [SYSTEM_HELP]
              </summary>
              <div className="mt-4 space-y-2 terminal-text-dim font-mono">
                <div>&gt; Available commands: Unknown - discover through experimentation</div>
                <div>&gt; Hint: What makes a bell think?</div>
                <div>&gt; Case sensitivity: Disabled for user convenience</div>
                <div>&gt; Emergency protocol: Contact system administrator</div>
              </div>
            </details>
          </div>

          {/* Progress */}
          <div className="text-center">
            <div className="terminal-box p-3">
              <div className="text-sm terminal-text-dim font-mono">
                PUZZLE_2_OF_2 | STATUS: {showCountdown ? 'MAGIC_HOUR_INITIATED' : 'AWAITING_COMMAND'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Puzzle2;
