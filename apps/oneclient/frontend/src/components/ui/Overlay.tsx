import React, { type ReactNode } from 'react';
import ReactDOM from 'react-dom';

export interface OverlayProps {
  /**
   * Whether the overlay is visible
   */
  visible: boolean;
  /**
   * Function to set the visibility state
   */
  setVisible: (visible: boolean) => void;
  /**
   * The content to render inside the overlay
   */
  children: ReactNode;
  /**
   * Optional mount point for the portal
   */
  mount?: Element;
  /**
   * Optional z-index for the overlay
   */
  zIndex?: number;
  /**
   * Optional backdrop color/opacity
   */
  backdropClass?: string;
  /**
   * Whether to close the overlay when clicking outside the content
   */
  closeOnBackdropClick?: boolean;
}

/**
 * A reusable overlay component that renders content in a portal with a backdrop.
 * Supports z-index control, backdrop customization, and click-outside behavior.
 */
const Overlay: React.FC<OverlayProps> = ({
  visible,
  setVisible,
  children,
  mount = document.body,
  zIndex = 1000,
  backdropClass = 'bg-black/60 backdrop-blur-sm',
  closeOnBackdropClick = true,
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      setVisible(false);
    }
  };
  
  React.useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (visible && e.key === 'Escape') {
        setVisible(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [visible, setVisible]);

  return ReactDOM.createPortal(
    <div
      className={`fixed top-0 left-0 w-screen h-screen ${backdropClass} transition-opacity ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      style={{ zIndex }}
    >
      <div 
        className="absolute left-0 top-0 h-screen w-screen flex items-center justify-center"
        onClick={handleBackdropClick}
      >
        {children}
      </div>
    </div>,
    mount
  );
};

export default Overlay;