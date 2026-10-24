import HSection from '../components/hSection';
import { DoubleLink } from '../components/doubleButton';
import { useShop } from '../components/shopProvider';
import { formatEuro } from '../data/shopData';

export default function Cart() {
  const { purchases, balance } = useShop();
  return (
    <HSection className="w-max min-w-[140vw] bg-gradient-to-r from-yellow-300 via-red-500 to-purple-700">
      <h1 className="text-[9px] font-light text-black">Historique des achats (panier)</h1>
      <p className="text-7xl font-black">Solde actuel : {formatEuro(balance)}</p>
      {purchases.length === 0 && <p className="mt-4 w-96 text-3xl font-black text-black">Vous n’avez rien acheté, donc rien gagné.</p>}
      <div className="mt-4 flex items-start gap-4">
        {purchases.map((item, index) => (
          <div key={item.id} className={`${index % 2 ? 'mt-12' : ''} w-52 shrink-0 border-4 border-dashed border-white bg-blue-800 p-2 text-white`}>
            <p className="text-6xl">{item.emoji}</p>
            <p className="text-[10px]">{item.name}</p>
            <p className="text-2xl font-black text-lime-300">× {item.qty}</p>
            <p className="text-sm font-black text-yellow-300">+{formatEuro(item.gain)}</p>
          </div>
        ))}
      </div>
      <DoubleLink href="/" className="mt-6 bg-black px-3 py-2 text-xl font-black text-lime-300">
        Continuer à s’enrichir
      </DoubleLink>
    </HSection>
  );
}
