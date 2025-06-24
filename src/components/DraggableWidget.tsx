
import React, { useState, useRef, useEffect } from 'react';

interface DraggableWidgetProps {
  title: string;
  titleIcon: string;
  children: React.ReactNode;
  initialPosition: { x: number; y: number };
  zIndex?: number;
  width?: string;
  onFocus?: () => void;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  title,
  titleIcon,
  children,
  initialPosition,
  zIndex = 30,
  width = "320px",
  onFocus
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentZ, setCurrentZ] = useState(zIndex);
  const [isFocused, setIsFocused] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    setCurrentZ(1000); // High z-index while dragging
    setIsFocused(true);
    onFocus && onFocus();
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Get screen boundaries (accounting for monitor bezel and taskbar)
    const screenPadding = 80; // Monitor bezel padding
    const taskbarHeight = 30;
    const screenWidth = window.innerWidth - screenPadding * 2;
    const screenHeight = window.innerHeight - screenPadding - taskbarHeight;

    const widgetWidth = widgetRef.current?.offsetWidth || 320;
    const widgetHeight = widgetRef.current?.offsetHeight || 200;

    // Constrain to boundaries with some margin
    const margin = 10;
    const constrainedX = Math.max(margin, Math.min(newX, screenWidth - widgetWidth - margin));
    const constrainedY = Math.max(margin, Math.min(newY, screenHeight - widgetHeight - margin));

    setPosition({ x: constrainedX, y: constrainedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setCurrentZ(isFocused ? 100 : zIndex); // Higher z-index for focused widgets
  };

  const handleWidgetClick = () => {
    setIsFocused(true);
    setCurrentZ(100);
    onFocus && onFocus();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, position]);

  return (
    <div
      ref={widgetRef}
      className={`absolute select-none ${isFocused ? 'widget-focused' : 'widget-unfocused'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: width,
        maxWidth: '90vw',
        zIndex: currentZ,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onClick={handleWidgetClick}
    >
      {/* Window Frame */}
      <div className="win95-window-frame">
        {/* Title Bar */}
        <div 
          className={`win95-titlebar ${isFocused ? 'titlebar-active' : 'titlebar-inactive'}`}
          onMouseDown={handleMouseDown}
        >
          <div className="titlebar-content">
            <div className="titlebar-icon">{titleIcon}</div>
            <div className="titlebar-text">{title}</div>
          </div>
          <div className="window-controls">
            <button className="control-btn minimize-btn">_</button>
            <button className="control-btn maximize-btn">□</button>
            <button className="control-btn close-btn">×</button>
          </div>
        </div>
        
        {/* Window Content */}
        <div className="win95-window-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DraggableWidget;
