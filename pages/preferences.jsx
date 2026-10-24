import { useState } from 'react';
import StepPage from '../components/stepPage';
import { DoubleButton } from '../components/doubleButton';
import { useShop } from '../components/shopProvider';

export default function Preferences() {
  const { notify } = useShop();
  const [choice, setChoice] = useState('Rare');
  return (
    <StepPage step={3} title="Préférences" text="Ici se règlent vos préférences. Les vraies options sont plus loin." nextHref="/options" nextLabel="Options">
      <div className="w-72 bg-lime-300 p-2">
        <label className="block text-[10px] font-black">Fréquence des notifications
          <select value={choice} onChange={(event) => setChoice(event.target.value)} className="mt-1 block w-full bg-white p-1 text-sm text-black">
            <option>Rare</option>
            <option>Constante</option>
            <option>Pathologique</option>
          </select>
        </label>
        <DoubleButton onConfirm={() => notify(`Fréquence « ${choice} » appliquée à vos notifications.`)} className="mt-1 bg-blue-700 px-3 py-2 text-xl font-black text-white">
          Appliquer
        </DoubleButton>
      </div>
    </StepPage>
  );
}
