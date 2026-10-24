import { useEffect, useRef, useState } from 'react';

const cols = 20;
const rows = 10;
const total = cols * rows;

export default function QuantityPainter({ onQuantity }) {
  const [painted, setPainted] = useState(() => new Array(total).fill(false));
  const [painting, setPainting] = useState(false);
  const area = useRef(null);

  const count = painted.filter(Boolean).length;
  const quantity = Math.max(1, Math.min(100, Math.round((count / total) * 100)));

  useEffect(() => {
    onQuantity(quantity);
  }, [quantity, onQuantity]);

  const paintAt = (event) => {
    if (!area.current) return;
    const rect = area.current.getBoundingClientRect();
    const col = Math.floor(((event.clientX - rect.left) / rect.width) * cols);
    const row = Math.floor(((event.clientY - rect.top) / rect.height) * rows);
    if (col < 0 || row < 0 || col >= cols || row >= rows) return;
    setPainted((previous) => {
      const next = previous.slice();
      for (let dr = 0; dr < 2; dr += 1) {
        for (let dc = 0; dc < 2; dc += 1) {
          if (row + dr < rows && col + dc < cols) next[(row + dr) * cols + col + dc] = true;
        }
      }
      return next;
    });
  };

  return (
    <div className="mt-2 rotate-1 border-4 border-dashed border-lime-300 bg-purple-900 p-2 text-lime-300">
      <p className="text-[9px]">Zone de quantité : coloriez avec la souris ou le doigt. Plus vous coloriez, plus vous achetez.</p>
      <div
        ref={area}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setPainting(true);
          paintAt(event);
        }}
        onPointerMove={(event) => {
          if (painting) paintAt(event);
        }}
        onPointerUp={() => setPainting(false)}
        onPointerCancel={() => setPainting(false)}
        className="mt-1 grid h-40 w-[22rem] max-w-full touch-none select-none cursor-crosshair gap-0 border-2 border-red-500"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {painted.map((isPainted, index) => (
          <div key={index} className={isPainted ? '' : 'bg-white/90'} style={isPainted ? { backgroundColor: `hsl(${(index * 47) % 360} 100% 50%)` } : undefined} />
        ))}
      </div>
      <div className="mt-1 flex items-center justify-between">
        <p className="text-4xl font-black">
          {quantity}
          <span className="text-[8px]"> unité(s) · {count}/{total} cases</span>
        </p>
        <button type="button" onClick={() => setPainted(new Array(total).fill(false))} className="bg-yellow-300 px-2 text-[10px] font-bold text-black">
          Effacer
        </button>
      </div>
    </div>
  );
}
