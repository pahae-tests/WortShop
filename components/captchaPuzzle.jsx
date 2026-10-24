import { useEffect, useRef, useState } from 'react';
import Modal from './modal';
import { useShop } from './shopProvider';
import { puzzleImage, puzzleCols, puzzleRows, puzzleCell, puzzlePad, puzzleVertex, pick, wrongDropMessages } from '../data/shopData';

const total = puzzleCols * puzzleRows;
const boxSize = puzzleCell + puzzlePad * 2;
const boardWidth = puzzleCols * puzzleCell;
const boardHeight = puzzleRows * puzzleCell;

function geometry(index) {
  const row = Math.floor(index / puzzleCols);
  const col = index % puzzleCols;
  const ox = col * puzzleCell - puzzlePad;
  const oy = row * puzzleCell - puzzlePad;
  const corners = [puzzleVertex(col, row), puzzleVertex(col + 1, row), puzzleVertex(col + 1, row + 1), puzzleVertex(col, row + 1)];
  const polygon = corners.map(([x, y]) => `${x - ox}px ${y - oy}px`).join(',');
  return { row, col, ox, oy, polygon };
}

function PieceFace({ index }) {
  const g = geometry(index);
  return (
    <div
      style={{
        width: boxSize,
        height: boxSize,
        backgroundImage: `url("${puzzleImage}")`,
        backgroundSize: `${boardWidth}px ${boardHeight}px`,
        backgroundPosition: `${-g.ox}px ${-g.oy}px`,
        backgroundRepeat: 'no-repeat',
        clipPath: `polygon(${g.polygon})`
      }}
    />
  );
}

function makeTray() {
  const list = Array.from({ length: total }, (_, i) => i);
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list.map((i) => ({ i, rot: Math.floor(Math.random() * 40) - 20, dx: Math.floor(Math.random() * 30) - 15, dy: Math.floor(Math.random() * 20) - 10 }));
}

const startMessage = 'Consigne : posez chaque morceau là où il ne se sent pas chez lui (ou l’inverse). Cliquez un morceau puis une case si le glisser vous fatigue.';

function PuzzleBody({ onSolved }) {
  const { addRage, notify } = useShop();
  const [tray, setTray] = useState(makeTray);
  const [placed, setPlaced] = useState({});
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(startMessage);
  const [shake, setShake] = useState(0);
  const dragRef = useRef(null);
  const placedCount = Object.keys(placed).length;
  const solved = placedCount === total;

  useEffect(() => {
    if (solved) notify('CAPTCHA résolu : vous êtes officiellement un humain patient.');
  }, [solved, notify]);

  const place = (slot, piece) => {
    if (piece === null || piece === undefined || placed[slot]) return;
    if (slot === piece) {
      setPlaced((previous) => ({ ...previous, [piece]: true }));
      setMessage(`Pièce ${piece + 1} acceptée. Par accident, sans doute.`);
    } else {
      const g = geometry(piece);
      addRage(3);
      setShake((value) => value + 1);
      setMessage(`Refusé : la pièce ${piece + 1} (colonne ${g.col + 1}, ligne ${g.row + 1}) ne va pas dans la case ${slot + 1}. ${pick(wrongDropMessages)}`);
    }
    setSelected(null);
  };

  const reset = () => {
    addRage(5);
    setTray(makeTray());
    setPlaced({});
    setSelected(null);
    setMessage('Puzzle réinitialisé. Tout est à refaire, comme dans la vie.');
  };

  const validate = () => {
    if (solved) onSolved();
    else setMessage(`Validation impossible : il reste ${total - placedCount} pièces à placer.`);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="w-full text-[10px] font-bold text-yellow-100">{message}</p>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="h-3 flex-1 border-2 border-black bg-white">
          <div className="h-full bg-red-600" style={{ width: `${(placedCount / total) * 100}%` }} />
        </div>
        <span className="text-xs font-black text-black">{placedCount}/{total} pièces (selon nos calculs)</span>
      </div>
      <div className="flex items-start gap-2">
        <div className="w-[84px] shrink-0 rotate-180 border-2 border-black" title="Modèle (à l’envers)" style={{ height: 56, backgroundImage: `url("${puzzleImage}")`, backgroundSize: '84px 56px' }} />
        <p className="text-[8px] text-black">Modèle à l’envers, pour votre confort.</p>
      </div>
      <div key={shake} className={shake > 0 ? 'animate-shake' : ''}>
        <div className="relative border-4 border-black bg-white" style={{ width: boardWidth, height: boardHeight }}>
          <div className="absolute inset-0 opacity-25 grayscale" style={{ backgroundImage: `url("${puzzleImage}")`, backgroundSize: `${boardWidth}px ${boardHeight}px` }} />
          {Array.from({ length: total }, (_, slot) => (
            <div
              key={slot}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const raw = event.dataTransfer.getData('text/plain');
                place(slot, raw === '' ? dragRef.current : Number(raw));
              }}
              onClick={() => place(slot, selected)}
              className="absolute border border-fuchsia-700/60"
              style={{ left: (slot % puzzleCols) * puzzleCell, top: Math.floor(slot / puzzleCols) * puzzleCell, width: puzzleCell, height: puzzleCell }}
            />
          ))}
          {Object.keys(placed).map((key) => {
            const g = geometry(Number(key));
            return (
              <div key={key} className="pointer-events-none absolute" style={{ left: g.ox, top: g.oy }}>
                <PieceFace index={Number(key)} />
              </div>
            );
          })}
        </div>
      </div>
      {solved ? (
        <div className="w-full bg-lime-300 p-3 text-center text-black">
          <p className="text-4xl font-black">RÉSOLU !</p>
          <button type="button" onClick={onSolved} className="mt-1 border-4 border-black bg-white px-4 py-1 text-lg font-black">
            Continuer
          </button>
        </div>
      ) : (
        <div className="flex w-full flex-wrap justify-center bg-fuchsia-700/60 py-2">
          {tray.filter((item) => !placed[item.i]).map((item) => (
            <div
              key={item.i}
              draggable
              onDragStart={(event) => {
                dragRef.current = item.i;
                event.dataTransfer.setData('text/plain', String(item.i));
                event.dataTransfer.effectAllowed = 'move';
              }}
              onClick={() => setSelected(item.i)}
              className={`cursor-grab ${selected === item.i ? 'outline outline-2 outline-red-600' : ''}`}
              style={{ transform: `translate(${item.dx}px, ${item.dy}px) rotate(${item.rot}deg)`, margin: '-12px', filter: 'drop-shadow(0 0 1px #000)' }}
            >
              <PieceFace index={item.i} />
            </div>
          ))}
        </div>
      )}
      <div className="flex w-full items-end justify-between gap-2">
        <button type="button" onClick={validate} className="bg-green-500 px-2 py-1 text-[10px] font-black text-white">
          ABANDONNER (pour de faux)
        </button>
        <button type="button" onClick={reset} className="rounded-full bg-red-600 px-4 py-3 text-sm font-black text-white">
          RÉSOUDRE AUTOMATIQUEMENT
        </button>
        <button type="button" onClick={reset} className="text-[8px] text-black underline">
          Recommencer
        </button>
      </div>
    </div>
  );
}

export default function CaptchaPuzzle({ open, onClose, onSolved }) {
  return (
    <Modal open={open} onClose={onClose} title="CAPTCHA (très facile, 24 pièces)" className="w-[min(96vw,460px)]">
      <PuzzleBody onSolved={onSolved} />
    </Modal>
  );
}
