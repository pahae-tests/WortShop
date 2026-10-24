import { useState } from 'react';
import HSection from '../components/hSection';
import CaptchaPuzzle from '../components/captchaPuzzle';
import { DoubleButton, DoubleLink } from '../components/doubleButton';
import { useShop } from '../components/shopProvider';

const fieldDefs = [
  ['username', 'Nom d’utilisateur', 'text'],
  ['email', 'Email', 'text'],
  ['password', 'Mot de passe', 'password'],
  ['confirmPassword', 'Confirmer le mot de passe', 'password'],
  ['firstName', 'Prénom', 'text'],
  ['lastName', 'Nom', 'text'],
  ['birth', 'Date de naissance', 'date'],
  ['address', 'Adresse actuelle', 'text'],
  ['postal', 'Code postal', 'text'],
  ['phone', 'Téléphone', 'text'],
  ['motherPhone', 'Téléphone de votre mère', 'text'],
  ['sisterPhone', 'Téléphone de votre sœur', 'text'],
  ['parentsAddress', 'Adresses de vos parents', 'text'],
  ['diploma', 'Note du baccalauréat', 'text'],
  ['nameLetters', 'Nombre de lettres de votre nom', 'text'],
  ['favColor', 'Couleur préférée', 'text'],
  ['favFood', 'Nourriture préférée', 'text'],
  ['favAnimal', 'Animal préféré', 'text'],
  ['favKey', 'Touche de clavier préférée', 'text'],
  ['shoe', 'Pointure', 'text'],
  ['favTeam', 'Équipe de football préférée', 'text'],
  ['favBrowser', 'Navigateur préféré', 'text'],
  ['siblings', 'Nombre de frères et sœurs', 'text'],
  ['favLanguage', 'Langage de programmation préféré', 'text'],
  ['why', 'Expliquez pourquoi vous méritez un compte', 'textarea']
];

const emptyForm = fieldDefs.reduce((acc, [key]) => ({ ...acc, [key]: '' }), {});

const cardStyles = [
  'w-56 rotate-1 bg-yellow-300 text-purple-800',
  'w-72 -rotate-2 bg-cyan-300 text-red-700 mt-10',
  'w-48 bg-lime-300 text-fuchsia-700 -ml-6',
  'w-80 rotate-2 bg-orange-300 text-blue-800 mt-4',
  'w-60 -rotate-1 bg-pink-200 text-green-800 mt-20'
];
const labelSizes = ['text-[9px]', 'text-2xl', 'text-xs', 'text-lg', 'text-[8px]'];

export default function Register() {
  const { users, registerUser, login, addRage, notify } = useShop();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [captchaOpen, setCaptchaOpen] = useState(false);
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [done, setDone] = useState('');

  const update = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  const finish = () => {
    registerUser({ name: form.username.trim(), password: form.password, bio: 'Nouvel utilisateur très fier.' });
    login(form.username.trim());
    setDone(`Compte « ${form.username.trim()} » créé. Votre mot de passe est désormais une clé primaire. Bravo.`);
    setError('');
    setForm(emptyForm);
    setCaptchaSolved(false);
  };

  const submit = () => {
    setDone('');
    if (!form.password) {
      setError('Mot de passe vide : même le vide doit être unique.');
      addRage(2);
      return;
    }
    const owner = users.find((user) => user.password === form.password);
    if (owner) {
      setError(`ERREUR : ce mot de passe est déjà utilisé par ${owner.name}. Voulez-vous essayer le mot de passe de quelqu’un d’autre ?`);
      setForm({ ...emptyForm, password: form.password });
      setCaptchaSolved(false);
      addRage(5);
      return;
    }
    if (!form.username.trim()) {
      setError('Nom d’utilisateur manquant : nous refusons les fantômes.');
      addRage(2);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Les deux mots de passe ne sont pas identiques. Ils ne se sont jamais compris.');
      addRage(2);
      return;
    }
    setError('');
    if (!captchaSolved) {
      setCaptchaOpen(true);
      return;
    }
    finish();
  };

  const solved = () => {
    setCaptchaSolved(true);
    setCaptchaOpen(false);
    finish();
  };

  return (
    <HSection className="w-max bg-gradient-to-r from-pink-500 via-yellow-300 to-cyan-400">
      <form onSubmit={(event) => event.preventDefault()} autoComplete="off" className="flex items-start gap-4">
        <div className="w-64 shrink-0 border-4 border-red-600 bg-white p-2 text-red-600">
          <h1 className="text-[9px] font-bold">Inscription</h1>
          {error && <p className="text-xl font-black">{error}</p>}
          {done && (
            <div>
              <p className="text-xl font-black text-green-700">{done}</p>
              <DoubleLink href="/" className="mt-1 bg-green-600 px-2 text-xs font-bold text-white">
                Aller à la boutique
              </DoubleLink>
            </div>
          )}
          {!error && !done && <p className="text-[9px]">Aucune erreur pour l’instant. Cela ne durera pas.</p>}
        </div>
        {fieldDefs.map(([key, label, type], index) => (
          <label key={key} className={`block shrink-0 border-4 border-black p-2 ${cardStyles[index % 5]}`}>
            <span className={`${labelSizes[(index + 2) % 5]} block font-black`}>{label}</span>
            {type === 'textarea' ? (
              <textarea value={form[key]} onChange={(event) => update(key, event.target.value)} rows={4} className="mt-1 w-full bg-white p-1 text-xs text-black" />
            ) : (
              <input type={type} value={form[key]} onChange={(event) => update(key, event.target.value)} autoComplete="off" className="mt-1 w-full bg-white p-1 text-xs text-black" />
            )}
          </label>
        ))}
        <div className="mt-24 w-64 shrink-0 -rotate-2 bg-black p-3">
          <DoubleButton onConfirm={submit} className="bg-red-600 px-4 py-2 text-2xl font-black text-white">
            Créer mon compte
          </DoubleButton>
          <p className="mt-2 text-[8px] text-lime-300">Mots de passe déjà pris, par transparence : banane123, azerty, motdepasse, 123456, qwerty, soleil2000.</p>
          <p className="text-[8px] text-white">Rien n’est envoyé nulle part. Le mot de passe n’est jamais sauvegardé durablement.</p>
        </div>
      </form>
      <CaptchaPuzzle open={captchaOpen} onClose={() => setCaptchaOpen(false)} onSolved={solved} />
    </HSection>
  );
}
