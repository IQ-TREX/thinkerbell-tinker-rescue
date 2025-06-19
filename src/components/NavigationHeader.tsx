
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ArrowLeft, ArrowRight } from 'lucide-react';

const NavigationHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/puzzle1':
        return { title: 'Puzzle 1', prev: '/', next: '/puzzle2', canGoNext: false };
      case '/puzzle2':
        return { title: 'Puzzle 2', prev: '/puzzle1', next: '/reveal', canGoNext: false };
      case '/reveal':
        return { title: 'Reveal', prev: '/puzzle2', next: null, canGoNext: false };
      default:
        return { title: 'Home', prev: null, next: '/puzzle1', canGoNext: true };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center">
      <div className="flex gap-2">
        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          className="terminal-button p-2 flex items-center gap-2 hover:bg-cyan-800 transition-colors"
          title="Go to Home"
        >
          <Home size={16} className="terminal-text-bright" />
          <span className="font-mono text-sm hidden sm:inline">HOME</span>
        </button>

        {/* Previous Button */}
        {pageInfo.prev && (
          <button
            onClick={() => navigate(pageInfo.prev)}
            className="terminal-button p-2 flex items-center gap-2 hover:bg-cyan-800 transition-colors"
            title="Previous Page"
          >
            <ArrowLeft size={16} className="terminal-text-bright" />
            <span className="font-mono text-sm hidden sm:inline">PREV</span>
          </button>
        )}
      </div>

      {/* Page Title */}
      <div className="terminal-box px-3 py-1">
        <span className="font-mono text-sm terminal-text-bright">{pageInfo.title}</span>
      </div>

      <div className="flex gap-2">
        {/* Next Button (only show on home page) */}
        {pageInfo.next && pageInfo.canGoNext && (
          <button
            onClick={() => navigate(pageInfo.next)}
            className="terminal-button p-2 flex items-center gap-2 hover:bg-cyan-800 transition-colors"
            title="Next Page"
          >
            <span className="font-mono text-sm hidden sm:inline">NEXT</span>
            <ArrowRight size={16} className="terminal-text-bright" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationHeader;
