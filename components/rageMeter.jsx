import { Flame } from 'lucide-react';
import { useShop } from './shopProvider';
import { DoubleButton } from './doubleButton';

function rageMessage(rage) {
  if (rage >= 100) return 'FATAL ERROR: USER HAS LOST ALL FAITH IN HUMANITY.';
  if (rage >= 80) return 'Veuillez éloigner votre clavier.';
  if (rage >= 60) return 'Un développeur UX vient de frissonner.';
  if (rage >= 40) return 'Votre patience diminue.';
  if (rage >= 20) return 'Vous semblez légèrement confus.';
  return 'Tout va bien (pour l’instant).';
}

export default function RageMeter() {
  const { rage, resetRage } = useShop();
  return (
    <div className="flex w-72 shrink-0 -rotate-1 flex-col gap-0.5 border-4 border-double border-red-700 bg-black p-1 text-lime-300">
      <div className="flex items-center justify-between text-[9px] font-black">
        <span className="flex items-center gap-1 text-sm">
          <Flame size={14} /> RAGE METER
        </span>
        <span className="text-lg">{Math.round(rage)}%</span>
      </div>
      <div className="h-3 w-full border border-white bg-gray-800">
        <div className="h-full bg-gradient-to-r from-green-400 via-yellow-300 to-red-600" style={{ width: `${rage}%` }} />
      </div>
      <p className={`text-[10px] leading-tight ${rage >= 100 ? 'animate-blinkColor font-black uppercase' : ''}`}>{rageMessage(rage)}</p>
      <DoubleButton onConfirm={resetRage} className="self-end bg-cyan-400 px-1 text-[8px] font-bold text-black">
        Respirer
      </DoubleButton>
    </div>
  );
}
