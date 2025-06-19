
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioManager from '../components/AudioManager';
import ParticleExplosion from '../components/ParticleExplosion';

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
    console.log('Drag over drop zone');
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Drag enter drop zone');
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

  return (
    <div className="min-h-screen bg-black crt-monitor">
      <div className="crt-screen min-h-screen">
        {showParticles && <ParticleExplosion />}
        
        <div className="relative z-20 max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-mono font-bold terminal-text mb-4">
              REBUILD_THE_MACHINE
            </h1>
            <div className="terminal-box p-4">
              <div className="terminal-text text-lg">
                &gt; DRAG COMPONENTS IN CORRECT SEQUENCE
              </div>
              <div className="terminal-text">
                &gt; RESTORE MEASURED_MAGIC_MACHINE
              </div>
            </div>
          </div>

          {/* Machine Parts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {machineParts.map((part) => (
              <div
                key={part.id}
                draggable={!sequence.includes(part.type)}
                onDragStart={(e) => handleDragStart(e, part.type)}
                className={`machine-part p-6 rounded cursor-move transition-all duration-300 ${
                  sequence.includes(part.type) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-105 cursor-grab active:cursor-grabbing'
                }`}
                style={{
                  userSelect: 'none',
                  touchAction: 'none'
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2 terminal-text">{part.icon}</div>
                  <h3 className="text-xl font-mono font-bold terminal-text-bright mb-1">{part.type}</h3>
                  <p className="text-sm font-mono terminal-text mb-2">{part.name}</p>
                  <p className="text-xs terminal-text-dim">{part.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
            className="terminal-box p-8 min-h-32 mb-6 border-dashed border-2 border-cyan-400 hover:border-cyan-300 transition-colors"
          >
            <h3 className="text-xl font-mono font-bold terminal-text-bright mb-4 text-center">
              MACHINE_SEQUENCE
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {sequence.length === 0 ? (
                <p className="terminal-text-dim font-mono">&gt; DROP COMPONENTS HERE IN CORRECT ORDER...</p>
              ) : (
                sequence.map((item, index) => (
                  <div key={index} className="terminal-button px-4 py-2 font-mono font-bold">
                    {index + 1}. {item}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="text-center space-y-4">
            <button
              onClick={resetSequence}
              className="terminal-button py-2 px-6 font-mono font-bold"
            >
              [RESET_SEQUENCE]
            </button>
            
            {showSuccess && (
              <div className="terminal-box p-4">
                <div className="text-2xl font-mono font-bold terminal-text-bright flickering">
                  &gt; MACHINE RESTORED! PROCEEDING TO NEXT PHASE...
                </div>
              </div>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 text-center">
            <div className="terminal-box p-3">
              <div className="text-sm font-mono terminal-text-dim">
                PUZZLE_1_OF_2 | SEQUENCE: {sequence.length}/{correctSequence.length}
              </div>
            </div>
          </div>

          {/* Debug Info */}
          <div className="mt-4 text-center">
            <div className="terminal-box p-2">
              <div className="text-xs font-mono terminal-text-dim">
                DEBUG: Current sequence [{sequence.join(', ')}] | Target: [{correctSequence.join(', ')}]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Puzzle1;
