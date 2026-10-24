import { useState } from 'react';
import HSection from '../components/hSection';
import CaptchaPuzzle from '../components/captchaPuzzle';
import { DoubleButton, DoubleLink } from '../components/doubleButton';
import { useShop } from '../components/shopProvider';
import { avatars, mockPassword } from '../data/shopData';

const fieldDefs = [
  ['password', 'Mot de passe', 'password'],
  ['birth', 'Date de naissance', 'date'],
  ['address', 'Adresse actuelle', 'text'],
  ['postal', 'Code postal', 'text'],
  ['phone', 'Téléphone', 'text'],
  ['motherPhone', 'Téléphone de votre mère', 'text'],
  ['sisterPhone', 'Téléphone de votre sœur', 'text']
];

const emptyForm = fieldDefs.reduce((acc, [key]) => ({ ...acc, [key]: '' }), {});
const absurd = {
  password: 'votre mot de passe (le néant ne suffit pas)',
  birth: 'votre date de naissance (même approximative)',
  address: 'votre adresse (la lune compte)',
  postal: 'votre code postal (inventez-en un)',
  phone: 'votre téléphone (le pigeon voyageur est refusé)',
  motherPhone: 'le téléphone de votre mère (elle sera ravie)',
  sisterPhone: 'le téléphone de votre sœur (elle aussi)'
};

export default function Profile() {
  const { chain, avatar, setAvatar, addRage, notify } = useShop();
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [captchaOpen, setCaptchaOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const skipped = Math.max(0, 7 - chain);

  const update = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  const unlock = () => {
    const missing = fieldDefs.filter(([key]) => !form[key].trim()).map(([key]) => absurd[key]);
    if (missing.length > 0) {
      setMessage(`Dossier incomplet : il manque ${missing.join(', ')}. Sans cela, votre photo restera floue.`);
      addRage(3);
      return;
    }
    if (form.password !== mockPassword) {
      setMessage('Mot de passe incorrect. Indice : relisez la page des données personnelles, étape précédente.');
      addRage(3);
      return;
    }
    setMessage('');
    setCaptchaOpen(true);
  };

  const chooseAvatar = (emoji) => {
    setAvatar(emoji);
    setUnlocked(false);
    setForm(emptyForm);
    addRage(5);
    notify('Votre photo de profil a changé. Tout le dossier est à refaire pour la prochaine.');
  };

  return (
    <>
      {skipped > 0 && (
        <HSection className="w-[110vw] bg-gradient-to-r from-red-700 via-black to-yellow-300">
          <p className="animate-blinkColor text-7xl font-black uppercase">Alerte administrative</p>
          <p className="mt-2 max-w-xl text-3xl font-black">Vous avez sauté sept étapes bureaucratiques. Le formulaire vous regarde avec déception.</p>
          <p className="text-[9px] text-white">Parcours officiel : Paramètres, Compte, Préférences, Options, Avancé, Plus d’options, Données personnelles, Profil.</p>
          <DoubleLink href="/settings" className="mt-4 bg-white px-3 py-2 text-lg font-black text-red-700">
            Retourner au début, comme il se doit
          </DoubleLink>
        </HSection>
      )}
      <HSection className="w-max bg-gradient-to-br from-cyan-400 via-pink-500 to-yellow-300">
        <h1 className="text-[9px] font-light text-black">Profil</h1>
        <p className="text-6xl font-black">Photo actuelle : {avatar}</p>
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off" className="mt-3 flex items-start gap-3">
          {fieldDefs.map(([key, label, type], index) => (
            <label key={key} className={`${index % 2 ? 'mt-8 w-60' : 'w-48'} block shrink-0 border-4 border-black bg-white p-2 text-purple-800`}>
              <span className={`${index % 3 === 0 ? 'text-xl' : 'text-[9px]'} block font-black`}>{label}</span>
              <input type={type} value={form[key]} onChange={(event) => update(key, event.target.value)} autoComplete="off" className="mt-1 w-full bg-yellow-100 p-1 text-xs text-black" />
            </label>
          ))}
          <div className="mt-4 w-72 shrink-0">
            <DoubleButton onConfirm={unlock} className="bg-red-600 px-4 py-3 text-2xl font-black text-white">
              Changer ma photo
            </DoubleButton>
            {message && <p className="mt-2 text-xl font-black text-black">{message}</p>}
            {unlocked && <p className="mt-2 text-xs font-black text-green-800">CAPTCHA validé : choisissez une photo, une seule fois.</p>}
          </div>
        </form>
      </HSection>
      {unlocked && (
        <HSection className="w-max bg-gradient-to-b from-lime-300 to-purple-700">
          <p className="text-[9px] text-black">Choisissez votre nouvelle photo</p>
          <div className="mt-2 flex items-start gap-3">
            {avatars.map((emoji, index) => (
              <DoubleButton key={emoji} onConfirm={() => chooseAvatar(emoji)} className={`${index % 2 ? 'mt-6 text-5xl' : 'text-7xl'} border-4 border-black bg-white p-2`}>
                {emoji}
              </DoubleButton>
            ))}
          </div>
        </HSection>
      )}
      <CaptchaPuzzle
        open={captchaOpen}
        onClose={() => setCaptchaOpen(false)}
        onSolved={() => {
          setCaptchaOpen(false);
          setUnlocked(true);
        }}
      />
    </>
  );
}
