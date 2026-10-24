import { useState } from 'react';
import StepPage from '../components/stepPage';

export default function MoreOptions() {
  const [checks, setChecks] = useState({ a: false, b: true, c: false });
  const toggle = (key) => setChecks((previous) => ({ ...previous, [key]: !previous[key] }));
  return (
    <StepPage step={6} title="Plus d’options" text="Encore des options. Vos données personnelles vous attendent juste après." nextHref="/personalData" nextLabel="Données personnelles">
      <div className="w-72 bg-cyan-300 p-2 text-xs font-bold text-purple-900">
        <label className="block"><input type="checkbox" checked={checks.a} onChange={() => toggle('a')} /> Activer l’option inutile</label>
        <label className="block text-xl"><input type="checkbox" checked={checks.b} onChange={() => toggle('b')} /> Désactiver l’option utile</label>
        <label className="block text-[9px]"><input type="checkbox" checked={checks.c} onChange={() => toggle('c')} /> Cocher pour ne pas cocher</label>
      </div>
    </StepPage>
  );
}
