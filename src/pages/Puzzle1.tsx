
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import AudioManager from '../components/AudioManager';
import ParticleExplosion from '../components/ParticleExplosion';
import PixelatedFairy from '../components/PixelatedFairy';

interface MachinePart {
  id: string;
  type: string;
  name: string;
  icon: string;
  description: string;
}

const Puzzle1 = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [sequence, setSequence] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const navigate = useNavigate();

  const correctSequence = ['INPUT', 'PROCESS', 'OUTPUT', 'MEASURE'];
  
  const machineParts: MachinePart[] = [
    { id: '1', type: 'INPUT', name: 'CREATIVE_FUEL', icon: '☕', description: 'Raw inspiration and ideas' },
    { id: '2', type: 'PROCESS', name: 'DESIGN_ENGINE', icon: '⚙️', description: 'Transform concepts into reality' },
    { id: '3', type: 'OUTPUT', name: 'MAGIC_WAND', icon: '🪄', description: 'Deliver enchanting solutions' },
    { id: '4', type: 'MEASURE', name: 'IMPACT_GAUGE', icon: '📊', description: 'Quantify the magic created' }
  ];

  const handleDragStart = (e: React.DragEvent, partType: string) => {
    console.log('Drag started for:', partType);
    setDraggedItem(partType);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', partType);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Drop event triggered');
    
    const droppedType = e.dataTransfer.getData('text/plain') || draggedItem;
    console.log('Dropped item:', droppedType);
    
    if (droppedType && !sequence.includes(droppedType)) {
      const newSequence = [...sequence, droppedType];
      setSequence(newSequence);
      console.log('New sequence:', newSequence);
      
      // Check if sequence is correct
      if (newSequence.length === correctSequence.length) {
        const isCorrect = newSequence.every((item, index) => item === correctSequence[index]);
        console.log('Sequence complete. Is correct:', isCorrect);
        if (isCorrect) {
          setShowSuccess(true);
          setShowParticles(true);
          AudioManager.playSuccess();
          setTimeout(() => {
            navigate('/puzzle2');
          }, 3000);
        } else {
          AudioManager.playError();
          setTimeout(() => {
            setSequence([]);
          }, 1000);
        }
      }
    }
    setDraggedItem(null);
  };

  const resetSequence = () => {
    setSequence([]);
    setShowSuccess(false);
    setShowParticles(false);
    console.log('Sequence reset');
  };

  useEffect(() => {
    AudioManager.startBackgroundMusic();
  }, []);

  return (
    <div className="win95-monitor">
      {showParticles && <ParticleExplosion />}
      
      {/* Monitor Bezel */}
      <div className="monitor-bezel">
        {/* Monitor Screen */}
        <div className="monitor-screen p-2 sm:p-4">
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
            <div className="absolute top-4 right-4 z-30">
              <PixelatedFairy />
            </div>

            {/* Main Terminal Window - Responsive sizing */}
            <div className="win95-window max-w-[calc(100vw-120px)] max-h-[calc(100vh-120px)] overflow-auto">
              {/* Window Title Bar */}
              <div className="window-titlebar">
                <div className="window-title">
                  <span className="title-icon">🔧</span>
                  Puzzle #1 - Machine Assembly
                </div>
                <div className="window-controls">
                  <button className="control-btn">_</button>
                  <button className="control-btn">□</button>
                  <button className="control-btn">×</button>
                </div>
              </div>

              {/* Window Content - Scrollable */}
              <div className="window-content overflow-y-auto max-h-[calc(100vh-200px)]">
                {/* Terminal Header */}
                <div className="win95-info-box mb-4">
                  <div className="space-y-1 text-xs">
                    <div>&gt;&gt; TINKER KIT #4 (DIGITAL CORE) CORRUPTED</div>
                    <div>&gt;&gt; MEASURED MAGIC MACHINE: OFFLINE</div>
                    <div className="font-bold text-red-800">&gt;&gt; REBUILD REQUIRED - DRAG COMPONENTS IN ORDER</div>
                    <div>&gt;&gt; Enter Sequence: INPUT → PROCESS → OUTPUT → MEASURE</div>
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
                      <div className="font-bold">💡 ASSEMBLY HINTS:</div>
                      <div>• Think about the logical flow of creation</div>
                      <div>• Start with gathering, then processing, then delivering</div>
                      <div>• Finally measure the impact</div>
                      <div>• Drag each component to the assembly area below</div>
                    </div>
                  </div>
                )}

                {/* Machine Parts Grid - Responsive */}
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3 mb-4">
                  {machineParts.map((part) => (
                    <div
                      key={part.id}
                      draggable={!sequence.includes(part.type)}
                      onDragStart={(e) => handleDragStart(e, part.type)}
                      className={`win95-button p-2 sm:p-3 text-center cursor-move ${
                        sequence.includes(part.type) 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-blue-100'
                      }`}
                      style={{ userSelect: 'none' }}
                    >
                      <div className="text-sm sm:text-lg mb-1">{part.icon}</div>
                      <div className="text-xs font-bold">{part.type}</div>
                      <div className="text-xs hidden sm:block">{part.name}</div>
                    </div>
                  ))}
                </div>

                {/* Assembly Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDrop={handleDrop}
                  className="win95-info-box p-3 sm:p-4 min-h-16 mb-4 border-dashed border-2 border-blue-500"
                >
                  <div className="text-xs font-bold mb-2">ASSEMBLY_SEQUENCE:</div>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {sequence.length === 0 ? (
                      <div className="text-xs text-gray-600">DROP COMPONENTS HERE IN ORDER...</div>
                    ) : (
                      sequence.map((item, index) => (
                        <div key={index} className="text-xs bg-blue-200 px-2 py-1 border border-blue-400">
                          {index + 1}. {item}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-2">
                  <button
                    onClick={resetSequence}
                    className="win95-button text-xs"
                  >
                    [RESET_ASSEMBLY]
                  </button>
                  
                  {showSuccess && (
                    <div className="win95-dialog">
                      <div className="text-xs font-bold text-green-800 flickering">
                        &gt;&gt; MACHINE RESTORED! PROCEEDING TO NEXT PHASE...
                      </div>
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="win95-info-box mt-4">
                  <div className="text-xs">
                    STATUS: PUZZLE_1_OF_2 | PROGRESS: {sequence.length}/{correctSequence.length}
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

export default Puzzle1;
