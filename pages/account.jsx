import { useState } from 'react';
import StepPage from '../components/stepPage';
import { DoubleButton } from '../components/doubleButton';
import { useShop } from '../components/shopProvider';

export default function Account() {
  const { notify } = useShop();
  const [label, setLabel] = useState('');
  return (
    <StepPage step={2} title="Compte" text="Votre compte existe. Pour le prouver, continuez vers Préférences." nextHref="/preferences" nextLabel="Préférences">
      <div className="w-72 bg-yellow-300 p-2">
        <label className="block text-2xl font-black">Surnom préféré
          <input value={label} onChange={(event) => setLabel(event.target.value)} className="mt-1 w-full bg-white p-1 text-sm text-black" />
        </label>
        <DoubleButton onConfirm={() => notify(`Votre surnom « ${label || 'rien'} » a été noté puis oublié.`)} className="mt-1 bg-red-600 px-2 text-xs font-black text-white">
          Enregistrer
        </DoubleButton>
      </div>
    </StepPage>
  );
}
