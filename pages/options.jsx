import StepPage from '../components/stepPage';
import { DoubleButton } from '../components/doubleButton';
import { useShop } from '../components/shopProvider';

export default function Options() {
  const { rgb, setRgb } = useShop();
  return (
    <StepPage step={4} title="Options" text="Des options, enfin. Les avancées sont encore plus loin." nextHref="/advanced" nextLabel="Avancé">
      <div className="w-72 bg-fuchsia-700 p-2 text-white">
        <p className="text-4xl font-black">Mode RGB : {rgb ? 'activé' : 'désactivé'}</p>
        <DoubleButton onConfirm={() => setRgb(!rgb)} className="mt-1 bg-yellow-300 px-3 py-1 text-sm font-black text-black">
          Basculer
        </DoubleButton>
      </div>
    </StepPage>
  );
}
