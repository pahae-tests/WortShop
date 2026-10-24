import { useCallback, useEffect, useState } from 'react';
import Modal from './modal';
import QuantityPainter from './quantityPainter';
import { useShop } from './shopProvider';
import { formatEuro } from '../data/shopData';

export default function BuyModal() {
  const { buyId, setBuyId, products, purchase, addRage } = useShop();
  const [quantity, setQuantity] = useState(1);
  const handleQuantity = useCallback((value) => setQuantity(value), []);

  const targetIndex = products.findIndex((item) => item.id === buyId);
  const target = targetIndex >= 0 ? products[targetIndex] : null;
  const shown = target ? products[(targetIndex + 5) % products.length] : null;

  useEffect(() => {
    if (buyId) addRage(2);
  }, [buyId, addRage]);

  const cancel = () => {
    addRage(2);
    setBuyId(null);
  };

  const confirm = () => {
    purchase(target, quantity);
    setBuyId(null);
  };

  return (
    <Modal open={Boolean(target)} onClose={cancel} title="Panier (probablement le vôtre)" className="w-[min(96vw,600px)] bg-orange-400">
      {target && (
        <div className="flex flex-row-reverse flex-wrap items-start gap-3">
          <div className="-rotate-2 border-4 border-black bg-white p-2 text-center text-red-600">
            <div className={`flex h-32 w-40 items-center justify-center bg-gradient-to-br ${shown.gradient}`}>
              <span className="text-7xl">{shown.emoji}</span>
            </div>
            <p className="text-2xl font-black uppercase">{shown.name}</p>
            <p className="text-[8px]">Ceci n’est pas ce que vous avez choisi.</p>
          </div>
          <div className="flex-1">
            <p className="text-[9px] text-black">Produit réellement crédité : {target.name} à {formatEuro(target.price)} l’unité.</p>
            <QuantityPainter onQuantity={handleQuantity} />
            <p className="mt-1 text-lg font-black text-white">Crédit à venir : +{formatEuro(target.price * quantity)}</p>
          </div>
        </div>
      )}
      <div className="mt-3 flex items-end justify-between gap-4">
        <button type="button" onClick={cancel} className="border-4 border-black bg-green-500 px-6 py-3 text-2xl font-black text-white">
          CONFIRMER L’ACHAT
        </button>
        <button type="button" onClick={confirm} className="rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold text-white">
          ANNULER L’ACHAT
        </button>
      </div>
      <p className="mt-1 text-[8px] text-black">Rappel : le rouge confirme, le vert annule. Sauf si vous avez oublié.</p>
    </Modal>
  );
}
