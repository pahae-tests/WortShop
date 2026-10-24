import { useState } from 'react';
import { useRouter } from 'next/router';
import HSection from '../components/hSection';
import ConfirmDialog from '../components/confirmDialog';
import { DoubleButton } from '../components/doubleButton';
import { useShop } from '../components/shopProvider';

export default function Login() {
  const router = useRouter();
  const { login, addRage } = useShop();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const attempt = () => {
    if (!username.trim() || !password) {
      setMessage('Champ vide détecté : veuillez inventer quelque chose.');
      addRage(2);
      return;
    }
    setMessage('');
    setConfirmOpen(true);
  };

  const confirmLogin = () => {
    login(username.trim());
    setPassword('');
    setConfirmOpen(false);
    router.push('/');
  };

  const cancelLogin = () => {
    setConfirmOpen(false);
    addRage(3);
    setMessage('Connexion annulée en confirmant. Logique implacable.');
  };

  return (
    <>
      <HSection className="w-[150vw] bg-gradient-to-r from-red-600 via-yellow-300 to-green-500">
        <h1 className="text-[9px] font-light text-black">Connexion</h1>
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off" className="mt-4 flex items-start gap-24">
          <label className="block -rotate-2 bg-black p-2 text-lime-300">
            <span className="block text-xs font-black">Nom d’utilisateur</span>
            <input value={username} onChange={(event) => setUsername(event.target.value)} className="mt-1 w-40 bg-white p-1 text-sm text-black" />
          </label>
          <label className="mt-16 block rotate-3 bg-purple-800 p-2 text-yellow-200">
            <span className="block text-3xl font-black">Mot de passe</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="off" className="mt-1 w-64 bg-white p-1 text-sm text-black" />
          </label>
          <div className="mt-6 w-72 shrink-0">
            <DoubleButton onConfirm={attempt} className="bg-blue-700 px-8 py-4 text-3xl font-black text-white">
              Se connecter
            </DoubleButton>
            {message && <p className="mt-2 text-2xl font-black text-red-700">{message}</p>}
            <p className="mt-2 text-[8px] text-black">N’importe quel identifiant non vide est accepté. Rien n’est stocké ni envoyé.</p>
          </div>
        </form>
      </HSection>
      <ConfirmDialog
        open={confirmOpen}
        question="Voulez-vous vraiment vous connecter ?"
        detail="Le rouge annule la connexion, le vert la valide. Bonne chance."
        redLabel="CONFIRMER"
        greenLabel="ANNULER"
        onRed={cancelLogin}
        onGreen={confirmLogin}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
}
