
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
  const widgetRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    setCurrentZ(100);
    onFocus && onFocus();
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Get monitor screen boundaries (accounting for padding and bezel)
    const monitorPadding = 60; // Total monitor bezel + padding
    const screenWidth = window.innerWidth - monitorPadding * 2;
    const screenHeight = window.innerHeight - monitorPadding * 2 - 30; // Account for taskbar

    const widgetWidth = widgetRef.current?.offsetWidth || 320;
    const widgetHeight = widgetRef.current?.offsetHeight || 200;

    // Constrain to boundaries
    const constrainedX = Math.max(20, Math.min(newX, screenWidth - widgetWidth - 20));
    const constrainedY = Math.max(20, Math.min(newY, screenHeight - widgetHeight - 20));

    setPosition({ x: constrainedX, y: constrainedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setCurrentZ(zIndex);
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
      className="win95-window absolute select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: width,
        maxWidth: '90vw',
        zIndex: currentZ,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      <div 
        className="window-titlebar cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="window-title">
          <span className="title-icon">{titleIcon}</span>
          {title}
        </div>
        <div className="window-controls">
          <button className="control-btn">_</button>
          <button className="control-btn">□</button>
          <button className="control-btn">×</button>
        </div>
      </div>
      <div className="window-content overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default DraggableWidget;
