import { useState } from 'react';
import { useShop } from './shopProvider';
import { DoubleButton, DoubleLink } from './doubleButton';

export default function UserAdmin() {
  const { users, session, updateUser, notify } = useShop();
  const [target, setTarget] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  if (!session) {
    return (
      <div className="w-72 shrink-0 bg-white p-2 text-red-600">
        <p className="text-2xl font-black">Modifier le profil des autres : réservé aux connectés.</p>
        <DoubleLink href="/login" className="mt-1 bg-red-600 px-2 text-xs font-bold text-white">
          Se connecter
        </DoubleLink>
      </div>
    );
  }

  const choose = (userName) => {
    const user = users.find((item) => item.name === userName);
    setTarget(userName);
    setName(user ? user.name : '');
    setBio(user ? user.bio : '');
  };

  const save = () => {
    if (!target || !name.trim()) return;
    updateUser(target, { name: name.trim(), bio });
    setTarget(name.trim());
    notify(`Le profil de ${target} a été réécrit par un inconnu.`);
  };

  return (
    <div className="flex shrink-0 items-start gap-3">
      <div className="w-64 shrink-0 border-4 border-dashed border-black bg-yellow-200 p-2">
        <h3 className="text-[9px] font-bold">Utilisateurs fictionnels (modifiables par tous)</h3>
        <div className="mt-1 flex flex-wrap gap-1">
          {users.map((user) => (
            <button key={user.name} type="button" onClick={() => choose(user.name)} className={`${target === user.name ? 'bg-red-600 text-white' : 'bg-cyan-300 text-black'} px-1 text-xs font-bold`}>
              {user.name}
            </button>
          ))}
        </div>
      </div>
      {target && (
        <div className="w-72 shrink-0 rotate-1 border-4 border-black bg-lime-300 p-2">
          <label className="block text-xs font-black">Nom affiché
            <input value={name} onChange={(event) => setName(event.target.value)} className="mt-1 w-full bg-white p-1 text-sm text-black" />
          </label>
          <label className="block text-xl font-black">Bio
            <textarea value={bio} onChange={(event) => setBio(event.target.value)} rows={3} className="mt-1 w-full bg-white p-1 text-xs text-black" />
          </label>
          <DoubleButton onConfirm={save} className="mt-1 bg-purple-700 px-3 py-1 text-sm font-black text-white">
            Enregistrer pour eux
          </DoubleButton>
        </div>
      )}
    </div>
  );
}
