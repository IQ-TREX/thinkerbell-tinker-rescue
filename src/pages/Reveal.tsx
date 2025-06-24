
import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import GlitchText from '../components/GlitchText';
import PixelatedFairy from '../components/PixelatedFairy';
import DraggableWidget from '../components/DraggableWidget';

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
  const [focusedWidget, setFocusedWidget] = useState<string>('');

  const projects: Project[] = [
    {
      title: "The Big Issue Rebrand",
      description: "Bold, dynamic brand identity tackling homelessness. Balances strength with accessibility, transforming perceptions and inspiring action for meaningful social change.",
      image: "🏠",
      link: "https://dribbble.com/shots/24372290-Rebranding-The-Big-Issue"
    },
    {
      title: "Rijksmuseum Pop Concept", 
      description: "Dutch masterpieces meet modern twists. Pop-culture vibes with bold colors and comic-book graphics make classic art fresh and inviting for younger generations.",
      image: "🎨",
      link: "https://dribbble.com/shots/24373197-Rebranding-the-Rijksmuseum"
    },
    {
      title: "DrinkUP Social App",
      description: "Social drinking app connecting people through bars, theme parties, and new friendships. Features safety tools, drinking games, and inclusive social experiences.",
      image: "🍻",
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
        {/* Monitor Screen with proper padding */}
        <div className="monitor-screen p-4">
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

          {/* Desktop Area - Main Content Container */}
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

            {/* Content Area with safe boundaries */}
            <div className="relative w-full h-full overflow-hidden">
              {/* Floating Pixelated Fairy - Safe positioning */}
              <div className="absolute top-2 right-2 z-50">
                <PixelatedFairy />
              </div>

              {/* Widget 1: Success Status Dialog */}
              <DraggableWidget
                title="System Status"
                titleIcon="🔔"
                initialPosition={{ x: 100, y: 50 }}
                zIndex={40}
                width="300px"
                onFocus={() => setFocusedWidget('status')}
              >
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-3">⚠️</div>
                    <div>
                      <div className="font-bold text-red-800 text-sm">CRITICAL SYSTEM FAILURE!!!</div>
                      <div className="text-xs"><span className="font-bold text-yellow-600">404</span>: MAGIC SIGNAL LOST</div>
                    </div>
                  </div>
                  <div className="win95-button text-center py-2 text-xs font-bold bg-green-200 mb-4">
                    SYSTEM RESTORED - MAGIC HOUR COMMENCED!
                  </div>
                  
                  {/* Terminal Status */}
                  <div className="bg-black text-green-400 p-3 font-mono text-xs border-2 inset">
                    <div>&gt;&gt; TINKER KIT #4 (DIGITAL CORE) CORRUPTED</div>
                    <div>&gt;&gt; MEASURED MAGIC MACHINE: OFFLINE</div>
                    <div className="text-red-400">&gt;&gt; LAB CREDENTIALS REQUIRED</div>
                    <div>&gt;&gt; Enter Lab Credentials:</div>
                    <div className="text-white font-bold">&gt;&gt; ACCESS GRANTED</div>
                    <div className="text-cyan-400">&gt;&gt; ✨ TINKER TIP</div>
                    <div>&gt;&gt; Remember how we create magic:</div>
                    <div>&gt;&gt; Fuel → Build → Delight</div>
                    <div>&gt;&gt; The order never changes!</div>
                    <div className="text-cyan-400">&gt;&gt; TINKERUP!</div>
                  </div>
                </div>
              </DraggableWidget>

              {/* Widget 2: Portfolio Showcase */}
              <DraggableWidget
                title="Portfolio Terminal"
                titleIcon="💻"
                initialPosition={{ x: 200, y: 200 }}
                zIndex={30}
                width="400px"
                onFocus={() => setFocusedWidget('portfolio')}
              >
                <div className="p-4">
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

                  {/* Project Display */}
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
                    
                    <div className="text-xs text-center leading-relaxed">
                      {projects[currentProject].description}
                    </div>
                    <div className="text-xs text-center text-blue-600 mt-2">
                      Click to view project
                    </div>
                  </div>

                  {/* Status */}
                  <div className="win95-info-box">
                    <div className="text-xs">
                      THINKERBELL DIGITAL TINKER KIT v4.0 • MAGIC MEASURED • IMPACT AMPLIFIED
                    </div>
                  </div>
                </div>
              </DraggableWidget>

              {/* Widget 3: Manifesto & Protocol */}
              <DraggableWidget
                title="Thinkerbell Protocol"
                titleIcon="🚨"
                initialPosition={{ x: 300, y: 100 }}
                zIndex={35}
                width="350px"
                onFocus={() => setFocusedWidget('protocol')}
              >
                <div className="p-4">
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
                  <div className="text-center space-y-3">
                    <div className="text-xs font-bold">READY FOR MAGIC HOUR?</div>
                    
                    <button
                      onClick={handleContactClick}
                      className="win95-button text-xs px-4 py-2 font-bold w-full"
                    >
                      🚨 ACTIVATE THINKERBELL PROTOCOL
                    </button>
                    
                    <div className="text-xs text-gray-600">
                      This will open your email client with activation sequence
                    </div>
                  </div>
                </div>
              </DraggableWidget>
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
