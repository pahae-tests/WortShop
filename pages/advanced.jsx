import { useState } from 'react';
import StepPage from '../components/stepPage';
import { DoubleButton } from '../components/doubleButton';
import { useShop } from '../components/shopProvider';

export default function Advanced() {
  const { notify, addRage } = useShop();
  const [level, setLevel] = useState(5);
  const burst = () => {
    for (let i = 0; i < level; i += 1) notify();
    addRage(level);
  };
  return (
    <StepPage step={5} title="Avancé" text="Paramètres avancés : plus il y en a, moins ils servent." nextHref="/moreOptions" nextLabel="Plus d’options">
      <div className="w-72 bg-orange-400 p-2">
        <label className="block text-xl font-black">Niveau de chaos : {level}
          <input type="range" min="1" max="20" value={level} onChange={(event) => setLevel(Number(event.target.value))} className="mt-1 block w-full" />
        </label>
        <DoubleButton onConfirm={burst} className="mt-1 bg-red-600 px-3 py-1 text-sm font-black text-white">
          Générer {level} notification(s)
        </DoubleButton>
      </div>
    </StepPage>
  );
}
