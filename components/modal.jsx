import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, className = '' }) {
  useEffect(() => {
    if (!open) return undefined;
    const handler = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-fuchsia-700/80 p-2">
      <div className={`max-h-[92dvh] max-w-[96vw] overflow-auto border-8 border-dashed border-lime-300 bg-cyan-500 p-3 text-purple-900 ${className}`}>
        <div className="mb-2 flex items-start justify-between gap-6">
          <h3 className="text-[11px] font-black uppercase text-red-700">{title}</h3>
          <button type="button" aria-label="Fermer" onClick={onClose} className="border-2 border-black bg-yellow-300 p-0.5 text-black">
            <X size={14} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
