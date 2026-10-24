import StepPage from '../components/stepPage';
import UserAdmin from '../components/userAdmin';
import { DoubleButton } from '../components/doubleButton';
import { useShop } from '../components/shopProvider';

export default function Settings() {
  const { dark, setDark, rgb, setRgb } = useShop();
  return (
    <StepPage step={1} title="Paramètres" text="Bienvenue dans les paramètres. Le profil se mérite : passez par Compte." nextHref="/account" nextLabel="Compte">
      <div className="flex items-start gap-4">
        <div className="w-60 shrink-0 bg-black p-2 text-white">
          <p className="text-xs font-black">Thème : {dark ? 'sombre' : 'clair'}</p>
          <DoubleButton onConfirm={() => setDark(!dark)} className="escapeDark mt-1 bg-white px-2 py-1 text-xs font-black text-black">
            Basculer le mode sombre
          </DoubleButton>
        </div>
        <div className="w-60 shrink-0 bg-purple-800 p-2 text-white">
          <p className="text-3xl font-black">RGB : {rgb ? 'ON' : 'OFF'}</p>
          <DoubleButton onConfirm={() => setRgb(!rgb)} className="mt-1 bg-lime-300 px-2 py-1 text-[10px] font-black text-black">
            Basculer le RGB
          </DoubleButton>
        </div>
        <UserAdmin />
      </div>
    </StepPage>
  );
}
