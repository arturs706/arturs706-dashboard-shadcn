import React, { useEffect, useRef, ReactNode, useState } from 'react';

export interface CustomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onOpenChange,
  children,
  className = ''
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setTimeout(() => {
        setIsAnimating(true);
        setShowContent(true);
      }, 10);
    } else {
      setIsAnimating(false);
      setShowContent(false);
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
          onOpenChange(false);
        }
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`
          modal-backdrop
          fixed inset-0 bg-white transition-opacity duration-200 ease-in-out
          ${isAnimating ? 'opacity-50' : 'opacity-0'}
        `} 
      />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={`
          relative
          bg-white
          rounded-lg
          shadow-lg
          w-full
          max-w-md
          max-h-[68.6vh]  
          overflow-y-auto
          p-6
          m-4
          transition-all
          duration-200
          ease-in-out
          ${isAnimating 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
          }
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 text-2xl"
        >
          &times;
        </button>
        
        {showContent && children}
      </div>
    </div>
  );
};

export { CustomModal };
