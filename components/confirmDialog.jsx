import { useEffect } from 'react';
import Modal from './modal';
import { useShop } from './shopProvider';

export default function ConfirmDialog({ open, question, detail, redLabel, greenLabel, onRed, onGreen, onClose }) {
  const { addRage } = useShop();

  useEffect(() => {
    if (open) addRage(2);
  }, [open, addRage]);

  return (
    <Modal open={open} onClose={onClose} title="Confirmation (obligatoire)" className="w-[min(92vw,420px)]">
      <p className="text-3xl font-black leading-none text-yellow-200">{question}</p>
      {detail && <p className="mt-2 text-[9px] text-black">{detail}</p>}
      <div className="mt-4 flex items-end justify-between gap-2">
        <button type="button" onClick={onGreen} className="rounded-none border-4 border-black bg-green-500 px-3 py-1 text-xs font-black text-white">
          {greenLabel}
        </button>
        <button type="button" onClick={onRed} className="rounded-3xl border-2 border-yellow-300 bg-red-600 px-8 py-5 text-xl font-black text-white">
          {redLabel}
        </button>
      </div>
    </Modal>
  );
}
