import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import GlitchText from '../components/GlitchText';
import NavigationHeader from '../components/NavigationHeader';

interface Project {
  title: string;
  description: string;
  image: string;
  figmaEmbed?: string;
}

const Reveal = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [showManifesto, setShowManifesto] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const projects: Project[] = [
    {
      title: "Measured Magic Interface",
      description: "A revolutionary UX framework that quantifies creative impact through user engagement metrics.",
      image: "🎨",
      figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/example1"
    },
    {
      title: "Creative Friction Analyzer",
      description: "AI-powered tool that identifies optimal resistance points in the design process for maximum innovation.",
      image: "⚡",
      figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/example2"
    },
    {
      title: "Mind Expansion Protocols",
      description: "Systematic approach to client participation in transformative design thinking sessions.",
      image: "🧠",
      figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/example3"
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
    window.location.href = `mailto:hello@thinkerbell.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-black text-[#00F0FF] relative overflow-hidden">
      <NavigationHeader />
      {/* VHS Overlay */}
      <div className="vhs-overlay"></div>
      <div className="scanlines"></div>
      
      <div className="relative z-10 min-h-screen p-4">
        {/* Header with Hint Button */}
        <div className="flex justify-between items-start mb-8 pt-20">
          <div className="text-center flex-1">
            <GlitchText 
              text="THE MISSING TINKER" 
              className="text-4xl md:text-6xl font-mono font-bold text-[#0055FF] mb-4"
            />
            <p className="text-xl font-mono text-[#00F0FF] font-bold">
              DIGITAL CORE RESTORED • MAGIC HOUR COMMENCED
            </p>
          </div>
          
          <button
            onClick={() => setShowHint(!showHint)}
            className="bg-[#0055FF] hover:bg-[#00F0FF] text-black font-mono font-bold py-2 px-4 rounded flex items-center gap-2 transition-all duration-300"
            title="About This Experience"
          >
            <Lightbulb size={20} />
            <span>INFO</span>
          </button>
        </div>

        {/* Info Panel */}
        {showHint && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-black/90 border border-[#0055FF] p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <Lightbulb size={24} className="text-[#00F0FF] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-mono font-bold text-[#00F0FF] mb-3">
                    🎉 CONGRATULATIONS!
                  </h3>
                  <div className="text-gray-300 font-mono space-y-2">
                    <p>• You've successfully completed all puzzles in the Missing Tinker Kit</p>
                    <p>• This is the final reveal showing Thinkerbell's "Measured Magic" portfolio</p>
                    <p>• Use the navigation buttons to explore different projects</p>
                    <p>• Click the activation button to contact Thinkerbell directly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-black/80 border border-[#00F0FF] p-6 rounded-lg text-center glitch-border">
            <h2 className="text-2xl font-mono font-bold text-[#00F0FF] mb-4">
              CONGRATULATIONS, MAGIC MAKER!
            </h2>
            <p className="text-lg font-mono text-gray-300 leading-relaxed font-medium">
              You've successfully restored the Measured Magic Machine and activated the Thinkerbell Protocol. 
              The digital tinker kit is now complete, and magic hour has begun. 
              Prepare to witness the fusion of design thinking and systematic enchantment.
            </p>
          </div>
        </div>

        {/* Portfolio Carousel */}
        <div className="max-w-5xl mx-auto mb-12">
          <h3 className="text-2xl font-mono font-bold text-[#0055FF] text-center mb-8">
            MEASURED MAGIC PORTFOLIO
          </h3>
          
          <div className="bg-black/90 border border-[#0055FF] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={prevProject}
                className="bg-[#0055FF] hover:bg-[#00F0FF] text-black font-mono font-bold py-2 px-4 transition-all duration-300"
              >
                ← PREV
              </button>
              
              <div className="text-center">
                <div className="text-6xl mb-2">{projects[currentProject].image}</div>
                <h4 className="text-xl font-mono font-bold text-[#00F0FF]">
                  {projects[currentProject].title}
                </h4>
                <p className="text-sm text-gray-400 font-mono">
                  {currentProject + 1} / {projects.length}
                </p>
              </div>
              
              <button 
                onClick={nextProject}
                className="bg-[#0055FF] hover:bg-[#00F0FF] text-black font-mono font-bold py-2 px-4 transition-all duration-300"
              >
                NEXT →
              </button>
            </div>
            
            {/* Project Description */}
            <div className="text-center mb-6">
              <p className="text-lg font-mono text-gray-300 leading-relaxed font-medium">
                {projects[currentProject].description}
              </p>
            </div>
            
            {/* Figma Embed Placeholder */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🎨</div>
                <p className="text-gray-400 font-mono font-bold">
                  FIGMA PROTOTYPE PREVIEW
                </p>
                <p className="text-sm text-gray-500 mt-2 font-mono">
                  Interactive design would be embedded here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Manifesto Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <details 
            className="bg-black/90 border border-[#E62E2E] rounded-lg p-6"
            onToggle={(e) => setShowManifesto((e.target as HTMLDetailsElement).open)}
          >
            <summary className="text-2xl font-mono font-bold text-[#E62E2E] cursor-pointer hover:text-[#00F0FF] transition-colors mb-4">
              THE THINKERBELL MANIFESTO
            </summary>
            
            {showManifesto && (
              <div className="space-y-6 font-mono text-gray-300 animate-fade-in">
                <div>
                  <h4 className="text-xl font-bold text-[#0055FF] mb-3">
                    3 MEASURED MAGIC UPGRADES:
                  </h4>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-[#00F0FF] mr-2">•</span>
                      <span className="font-medium">Client participation in Magic Hour sessions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00F0FF] mr-2">•</span>
                      <span className="font-medium">MMI 'Creative Friction' metrics for innovation optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00F0FF] mr-2">•</span>
                      <span className="font-medium">Tinker-led Mind Expansion Projects</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-[#0055FF] mb-2">
                    THE PHILOSOPHY:
                  </h4>
                  <p className="leading-relaxed font-medium">
                    Magic without measurement is chaos. Measurement without magic is sterile. 
                    At Thinkerbell, we believe the future of design lies in the systematic 
                    application of creative forces. Every pixel placed, every interaction 
                    crafted, every user journey mapped - all guided by data, all infused 
                    with wonder.
                  </p>
                </div>
                
                <div className="text-center py-4">
                  <a 
                    href="/manifesto.pdf" 
                    className="text-[#00F0FF] hover:text-white underline transition-colors font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DOWNLOAD FULL MANIFESTO (PDF)
                  </a>
                </div>
              </div>
            )}
          </details>
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h3 className="text-2xl font-mono font-bold text-[#0055FF] mb-6">
            READY FOR MAGIC HOUR?
          </h3>
          
          <button
            onClick={handleContactClick}
            className="bg-gradient-to-r from-[#0055FF] to-[#00F0FF] hover:from-[#00F0FF] hover:to-[#0055FF] text-black font-mono font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 hover:shadow-glow transform hover:scale-105"
          >
            🚨 ACTIVATE THINKERBELL PROTOCOL
          </button>
          
          <p className="text-sm font-mono text-gray-400 mt-4 font-medium">
            This will open your email client with the activation sequence
          </p>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-sm font-mono text-gray-500 font-medium">
            THINKERBELL DIGITAL TINKER KIT v4.0 • MAGIC MEASURED • IMPACT AMPLIFIED
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reveal;
