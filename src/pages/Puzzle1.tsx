
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
    { id: '1', type: 'INPUT', name: 'Creative Fuel', icon: '☕', description: 'Raw inspiration and ideas' },
    { id: '2', type: 'PROCESS', name: 'Design Engine', icon: '⚙️', description: 'Transform concepts into reality' },
    { id: '3', type: 'OUTPUT', name: 'Magic Wand', icon: '🪄', description: 'Deliver enchanting solutions' },
    { id: '4', type: 'MEASURE', name: 'Impact Gauge', icon: '📊', description: 'Quantify the magic created' }
  ];

  const handleDragStart = (e: React.DragEvent, partType: string) => {
    setDraggedItem(partType);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && !sequence.includes(draggedItem)) {
      const newSequence = [...sequence, draggedItem];
      setSequence(newSequence);
      
      // Check if sequence is correct
      if (newSequence.length === correctSequence.length) {
        const isCorrect = newSequence.every((item, index) => item === correctSequence[index]);
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
  };

  return (
    <div className="min-h-screen bg-black text-[#00F0FF] p-4 relative overflow-hidden">
      {/* VHS Overlay */}
      <div className="vhs-overlay"></div>
      <div className="scanlines"></div>
      
      {showParticles && <ParticleExplosion />}
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-mono font-bold text-[#0055FF] mb-4 glitch-text">
            REBUILD THE MACHINE
          </h1>
          <p className="text-xl font-mono text-[#00F0FF]">
            Drag components in the correct sequence to restore the Measured Magic Machine
          </p>
        </div>

        {/* Machine Parts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {machineParts.map((part) => (
            <div
              key={part.id}
              draggable
              onDragStart={(e) => handleDragStart(e, part.type)}
              className={`machine-part bg-black border-2 border-[#0055FF] p-6 rounded-lg cursor-move hover:border-[#00F0FF] hover:shadow-glow transition-all duration-300 ${
                sequence.includes(part.type) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">{part.icon}</div>
                <h3 className="text-xl font-mono font-bold text-[#0055FF] mb-1">{part.type}</h3>
                <p className="text-sm font-mono text-[#00F0FF] mb-2">{part.name}</p>
                <p className="text-xs text-gray-400">{part.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="machine-sequence bg-black border-2 border-dashed border-[#E62E2E] p-8 rounded-lg min-h-32 mb-6"
        >
          <h3 className="text-xl font-mono font-bold text-[#E62E2E] mb-4 text-center">
            MACHINE SEQUENCE
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {sequence.length === 0 ? (
              <p className="text-gray-500 font-mono">Drop components here in correct order...</p>
            ) : (
              sequence.map((item, index) => (
                <div key={index} className="bg-[#0055FF] text-black px-4 py-2 rounded font-mono font-bold">
                  {index + 1}. {item}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="text-center space-x-4">
          <button
            onClick={resetSequence}
            className="bg-[#E62E2E] hover:bg-red-600 text-white font-mono font-bold py-2 px-6 border-2 border-[#E62E2E] transition-all duration-300"
          >
            RESET
          </button>
          
          {showSuccess && (
            <div className="mt-4 text-center">
              <div className="text-2xl font-mono font-bold text-[#00F0FF] flickering">
                MACHINE RESTORED! PROCEEDING TO NEXT PHASE...
              </div>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="text-sm font-mono text-gray-400">
            PUZZLE 1 OF 2 | SEQUENCE: {sequence.length}/{correctSequence.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Puzzle1;
