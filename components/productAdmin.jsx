import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useShop } from './shopProvider';
import { DoubleButton, DoubleLink } from './doubleButton';
import ConfirmDialog from './confirmDialog';

export default function ProductAdmin({ product }) {
  const router = useRouter();
  const { session, updateProduct, deleteProduct, notify } = useShop();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [description, setDescription] = useState(product.description);
  const [rating, setRating] = useState(String(product.rating));
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    setName(product.name);
    setPrice(String(product.price));
    setDescription(product.description);
    setRating(String(product.rating));
  }, [product.id]);

  if (!session) {
    return (
      <div className="w-72 shrink-0 border-4 border-black bg-white p-2 text-red-600">
        <p className="text-2xl font-black">Administration réservée aux connectés.</p>
        <p className="text-[9px]">Tout visiteur connecté est administrateur, c’est la sécurité à la WorstShop.</p>
        <DoubleLink href="/login" className="mt-2 bg-red-600 px-2 text-xs font-bold text-white">
          Se connecter
        </DoubleLink>
      </div>
    );
  }

  const save = () => {
    const parsedPrice = parseFloat(String(price).replace(',', '.'));
    const parsedRating = parseFloat(String(rating).replace(',', '.'));
    updateProduct(product.id, {
      name: name.trim() || product.name,
      price: Number.isFinite(parsedPrice) && parsedPrice >= 0 ? parsedPrice : product.price,
      description,
      rating: Number.isFinite(parsedRating) ? Math.min(5, Math.max(0, parsedRating)) : product.rating
    });
    notify('Un produit a été modifié par quelqu’un qui n’y connaît rien.');
  };

  const field = 'mt-1 w-full bg-white p-1 text-xs text-black';

  return (
    <div className="w-80 shrink-0 rotate-1 border-8 border-double border-lime-300 bg-red-700 p-2 text-white">
      <h3 className="text-[9px] font-bold">Administration pour tout le monde</h3>
      <label className="block text-2xl font-black">Nom
        <input value={name} onChange={(event) => setName(event.target.value)} className={field} />
      </label>
      <label className="block text-[9px]">Prix (€)
        <input value={price} onChange={(event) => setPrice(event.target.value)} className={field} />
      </label>
      <label className="block text-lg font-black">Description
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} className={field} />
      </label>
      <label className="block text-[10px]">Note (0 à 5)
        <input value={rating} onChange={(event) => setRating(event.target.value)} className={field} />
      </label>
      <div className="mt-2 flex items-end justify-between">
        <DoubleButton onConfirm={save} className="bg-green-500 px-2 py-1 text-xs font-black text-black">
          Enregistrer
        </DoubleButton>
        <DoubleButton onConfirm={() => setConfirmOpen(true)} className="bg-black px-3 py-2 text-lg font-black text-red-500">
          Supprimer le produit
        </DoubleButton>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        question={`Détruire « ${product.name} » à jamais, ou presque ?`}
        detail="Le rouge confirme la destruction. Le vert vous sauve. Réfléchissez longuement."
        redLabel="DÉTRUIRE"
        greenLabel="Épargner"
        onRed={() => {
          setConfirmOpen(false);
          deleteProduct(product.id);
          router.push('/');
        }}
        onGreen={() => setConfirmOpen(false)}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
}
