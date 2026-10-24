import HSection from './hSection';
import { DoubleButton, DoubleLink } from './doubleButton';
import { useShop } from './shopProvider';

export default function SiteFooter() {
  const { resetAll } = useShop();
  return (
    <HSection className="w-[220vw] bg-gradient-to-br from-black via-fuchsia-700 to-lime-400">
      <p className="animate-blinkColor whitespace-nowrap text-[11rem] font-black uppercase leading-none">© WorstShop 2000-2099</p>
      <p className="mt-6 whitespace-nowrap text-7xl font-black text-cyan-200">Mentions légales : tout ce que vous cliquez nous appartient, y compris votre solde.</p>
      <p className="mt-4 whitespace-nowrap text-6xl font-black text-orange-300">Conditions générales : rien n’est vrai, tout est local, aucune donnée ne part nulle part.</p>
      <div className="mt-8 flex items-center gap-4 text-[10px]">
        <DoubleLink href="/" className="bg-yellow-300 px-2 py-1 font-bold text-black">
          Retour au début
        </DoubleLink>
        <DoubleLink href="/register" className="bg-white px-2 py-1 font-bold text-black">
          Inscription
        </DoubleLink>
        <DoubleLink href="/login" className="bg-white px-2 py-1 font-bold text-black">
          Connexion
        </DoubleLink>
        <DoubleButton onConfirm={resetAll} className="bg-red-600 px-2 py-1 font-bold text-white">
          Réinitialiser l’univers
        </DoubleButton>
      </div>
    </HSection>
  );
}
