
import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import GlitchText from '../components/GlitchText';
import PixelatedFairy from '../components/PixelatedFairy';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

const Reveal = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [showManifesto, setShowManifesto] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const projects: Project[] = [
    {
      title: "Measured Magic Interface",
      description: "Revolutionary UX framework that quantifies creative impact",
      image: "🎨",
      link: "https://dribbble.com/shots/24372290-Rebranding-The-Big-Issue"
    },
    {
      title: "Creative Friction Analyzer", 
      description: "AI-powered tool for optimal design resistance points",
      image: "⚡",
      link: "https://dribbble.com/shots/24373197-Rebranding-the-Rijksmuseum"
    },
    {
      title: "Mind Expansion Protocols",
      description: "Systematic approach to transformative design thinking",
      image: "🧠",
      link: "https://dribbble.com/shots/24373424-DrinkUP"
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleContactClick = () => {
    const subject = "🚨 THINKERBELL TINKER PROTOCOL ACTIVATED";
    const body = "Hello! I've completed the Missing Tinker Kit challenge and I'm excited to discuss how we can create some measured magic together.";
    window.location.href = `mailto:asaini1507@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleProjectClick = () => {
    window.open(projects[currentProject].link, '_blank');
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

            {/* Success Dialog - Fixed positioning */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-40">
              <div className="win95-window" style={{ width: '320px' }}>
                <div className="window-titlebar">
                  <div className="window-title">
                    <span className="title-icon">🔔</span>
                    Tinkerbell
                  </div>
                  <div className="window-controls">
                    <button className="control-btn">_</button>
                    <button className="control-btn">□</button>
                    <button className="control-btn">×</button>
                  </div>
                </div>
                <div className="window-content p-4">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-3">⚠️</div>
                    <div>
                      <div className="font-bold text-red-800 text-sm">CRITICAL SYSTEM FAILURE!!!</div>
                      <div className="text-xs"><span className="font-bold text-yellow-600">404</span>: MAGIC SIGNAL LOST</div>
                    </div>
                  </div>
                  <div className="win95-button text-center py-2 text-xs font-bold bg-green-200">
                    SYSTEM RESTORED - MAGIC HOUR COMMENCED!
                  </div>
                </div>
              </div>
            </div>

            {/* Main Portfolio Window - Repositioned to avoid overlap */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
              <div className="win95-window" style={{ width: '600px', maxWidth: '90vw' }}>
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
                  {/* Terminal Header */}
                  <div className="bg-black text-green-400 p-3 font-mono text-xs mb-4 border-2 inset">
                    <div>&gt;&gt; TINKER KIT #4 (DIGITAL CORE) CORRUPTED</div>
                    <div>&gt;&gt; MEASURED MAGIC MACHINE: OFFLINE</div>
                    <div className="text-red-400">&gt;&gt; LAB CREDENTIALS REQUIRED</div>
                    <div>&gt;&gt; Enter Lab Credentials:</div>
                    <div className="text-white font-bold">&gt;&gt; ACCESS GRANTED</div>
                    <div className="text-cyan-400">&gt;&gt; ✨ TINKER TIP</div>
                    <div>&gt;&gt; Remember how we create magic:</div>
                    <div>&gt;&gt; Fuel</div>
                    <div>&gt;&gt; Build</div>
                    <div>&gt;&gt; Delight</div>
                    <div>&gt;&gt; The order never changes!</div>
                    <div className="text-cyan-400">&gt;&gt; TINKERUP!</div>
                  </div>

                  {/* Hint Button */}
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="win95-button text-xs flex items-center gap-1"
                    >
                      <Lightbulb size={12} />
                      INFO
                    </button>
                  </div>

                  {/* Info Panel */}
                  {showHint && (
                    <div className="win95-dialog mb-4">
                      <div className="text-xs space-y-1">
                        <div className="font-bold">🎉 CONGRATULATIONS!</div>
                        <div>• You've completed all puzzles successfully</div>
                        <div>• This shows Thinkerbell's "Measured Magic" portfolio</div>
                        <div>• Use buttons to explore different projects</div>
                        <div>• Click activation button to contact directly</div>
                      </div>
                    </div>
                  )}

                  {/* Project Icons Display */}
                  <div className="bg-white border-2 inset p-4 mb-4 min-h-32 cursor-pointer" onClick={handleProjectClick}>
                    <div className="flex items-center justify-between mb-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          prevProject();
                        }}
                        className="win95-button text-xs px-2 py-1"
                      >
                        ← PREV
                      </button>
                      
                      <div className="text-center">
                        <div className="text-4xl mb-2">{projects[currentProject].image}</div>
                        <div className="text-xs font-bold">{projects[currentProject].title}</div>
                        <div className="text-xs text-gray-600">{currentProject + 1} / {projects.length}</div>
                      </div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          nextProject();
                        }}
                        className="win95-button text-xs px-2 py-1"
                      >
                        NEXT →
                      </button>
                    </div>
                    
                    <div className="text-xs text-center">
                      {projects[currentProject].description}
                    </div>
                    <div className="text-xs text-center text-blue-600 mt-1">
                      Click to view project
                    </div>
                  </div>

                  {/* Manifesto Section */}
                  <details 
                    className="win95-dialog mb-4"
                    onToggle={(e) => setShowManifesto((e.target as HTMLDetailsElement).open)}
                  >
                    <summary className="text-xs font-bold cursor-pointer text-red-800">
                      THE THINKERBELL MANIFESTO
                    </summary>
                    
                    {showManifesto && (
                      <div className="mt-3 space-y-2 text-xs">
                        <div>
                          <div className="font-bold text-blue-800">3 MEASURED MAGIC UPGRADES:</div>
                          <div>• Client participation in Magic Hour sessions</div>
                          <div>• MMI 'Creative Friction' metrics optimization</div>
                          <div>• Tinker-led Mind Expansion Projects</div>
                        </div>
                        
                        <div>
                          <div className="font-bold text-blue-800">THE PHILOSOPHY:</div>
                          <div>Magic without measurement is chaos. At Thinkerbell, we believe the future lies in systematic application of creative forces.</div>
                        </div>
                      </div>
                    )}
                  </details>

                  {/* Contact Section */}
                  <div className="text-center space-y-2">
                    <div className="text-xs font-bold">READY FOR MAGIC HOUR?</div>
                    
                    <button
                      onClick={handleContactClick}
                      className="win95-button text-xs px-4 py-2 font-bold"
                    >
                      🚨 ACTIVATE THINKERBELL PROTOCOL
                    </button>
                    
                    <div className="text-xs text-gray-600">
                      This will open your email client with activation sequence
                    </div>
                  </div>

                  {/* Status */}
                  <div className="win95-info-box mt-4">
                    <div className="text-xs">
                      THINKERBELL DIGITAL TINKER KIT v4.0 • MAGIC MEASURED • IMPACT AMPLIFIED
                    </div>
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

export default Reveal;
