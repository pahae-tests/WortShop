import StepPage from '../components/stepPage';
import { mockPassword } from '../data/shopData';

export default function PersonalData() {
  return (
    <StepPage step={7} title="Données personnelles" text="Voici vos données personnelles. Enfin, celles que nous avons inventées." nextHref="/profile" nextLabel="Profil">
      <div className="w-72 bg-white p-2 text-red-700">
        <p className="text-2xl font-black">Mot de passe de vérification (fictif) :</p>
        <p className="text-4xl font-black">{mockPassword}</p>
        <p className="text-[8px]">Conservez-le précieusement pour le profil. Il ne sert à rien d’autre et n’est stocké nulle part.</p>
      </div>
    </StepPage>
  );
}
