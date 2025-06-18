
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioManager from '../components/AudioManager';

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
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.toLowerCase().trim();
    
    setTerminalHistory(prev => [...prev, `> ${input}`]);
    
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

  // Matrix-style typing effect
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 100);
    }
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
    <div className="min-h-screen bg-black text-[#00F0FF] p-4 font-mono relative overflow-hidden">
      {/* VHS Overlay */}
      <div className="vhs-overlay"></div>
      <div className="scanlines"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Terminal Header */}
        <div className="border border-[#0055FF] bg-black/90 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-[#E62E2E] rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-400 ml-4">THINKERBELL_TERMINAL.exe</span>
          </div>
          
          {/* Terminal Output */}
          <div className="terminal-output space-y-2 mb-4 h-96 overflow-y-auto">
            {terminalHistory.map((line, index) => (
              <div 
                key={index} 
                className={`${
                  line.startsWith('>>') ? 'text-[#0055FF]' : 
                  line.startsWith('> ') ? 'text-[#00F0FF]' :
                  'text-gray-300'
                } ${line.includes('ERROR') ? 'text-[#E62E2E] flickering' : ''}`}
              >
                {line}
              </div>
            ))}
            
            {isTyping && (
              <div className="text-[#00F0FF]">
                {Array.from({ length: Math.floor(Math.random() * 10) + 5 }).map((_, i) => (
                  <span key={i} className="inline-block animate-pulse">
                    {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-[#0055FF] mr-2">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="type_command_here"
              className="flex-1 bg-transparent border-none outline-none text-[#00F0FF] placeholder-gray-500"
              autoComplete="off"
            />
            <div className="w-2 h-5 bg-[#00F0FF] animate-pulse ml-1"></div>
          </form>
        </div>

        {/* Magic Hour Countdown */}
        {showCountdown && (
          <div className="border border-[#00F0FF] bg-black/90 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-[#0055FF] mb-4 glitch-text">
              MAGIC HOUR ACTIVATED
            </h2>
            <div className="text-6xl font-bold text-[#00F0FF] mb-4 countdown-display">
              {formatTime(countdown)}
            </div>
            <p className="text-lg text-gray-300">
              The bell resonates... Magic hour approaches...
            </p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 text-center">
          <details className="border border-[#0055FF] bg-black/90 rounded-lg p-4">
            <summary className="text-[#0055FF] cursor-pointer hover:text-[#00F0FF] transition-colors">
              SYSTEM HELP
            </summary>
            <div className="mt-4 text-left space-y-2 text-gray-300">
              <p>• Available commands: Unknown - discover through experimentation</p>
              <p>• Hint: What makes a bell think?</p>
              <p>• Case sensitivity: Disabled for user convenience</p>
              <p>• Emergency protocol: Contact system administrator</p>
            </div>
          </details>
        </div>

        {/* Progress */}
        <div className="mt-8 text-center text-sm text-gray-400">
          PUZZLE 2 OF 2 | STATUS: {showCountdown ? 'MAGIC HOUR INITIATED' : 'AWAITING COMMAND'}
        </div>
      </div>
    </div>
  );
};

export default Puzzle2;
