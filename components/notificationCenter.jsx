import { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { useShop } from './shopProvider';
import { DoubleButton } from './doubleButton';

export default function NotificationCenter() {
  const { notifs, notify, removeNotif } = useShop();
  const [open, setOpen] = useState(false);

  const act = (id, text, remove) => {
    notify(text);
    if (remove) removeNotif(id);
  };

  return (
    <div className="shrink-0">
      <DoubleButton onConfirm={() => setOpen((value) => !value)} className="relative -mt-3 border-4 border-orange-500 bg-purple-700 p-2 text-white">
        <Bell size={22} />
        <span className="absolute -right-3 -top-3 bg-red-600 px-1 text-[10px] font-black text-yellow-200">{notifs.length > 99 ? '99+' : notifs.length}</span>
      </DoubleButton>
      {open && (
        <div className="fixed right-2 top-32 z-[70] h-28 w-44 rotate-2 overflow-scroll border-4 border-dotted border-lime-300 bg-fuchsia-600 p-1 text-white">
          <div className="sticky top-0 flex items-center justify-between bg-yellow-300 text-black">
            <button type="button" onClick={() => notify()} className="text-[9px] font-black">
              + générer
            </button>
            <button type="button" aria-label="Fermer les notifications" onClick={() => setOpen(false)}>
              <X size={12} />
            </button>
          </div>
          {notifs.length === 0 && <p className="text-xs">Aucune notification. Cela mérite une notification.</p>}
          {notifs.slice(0, 60).map((item) => (
            <div key={item.id} className="mt-1 border-b border-dashed border-white pb-1">
              <p className="whitespace-nowrap text-xl font-black">{item.text}</p>
              <div className="flex gap-1 text-[8px]">
                <button type="button" onClick={() => act(item.id, 'Vous avez consulté une notification.', false)} className="bg-green-500 px-1">
                  voir
                </button>
                <button type="button" onClick={() => act(item.id, 'Vous avez fermé une notification.', true)} className="bg-red-600 px-1">
                  fermer
                </button>
                <button type="button" onClick={() => act(item.id, 'Quelqu’un a aimé votre notification.', false)} className="bg-blue-600 px-1">
                  aimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
