import { useRouter } from 'next/router';
import { Heart, Star } from 'lucide-react';
import HSection from '../../components/hSection';
import CommentSection from '../../components/commentSection';
import ProductAdmin from '../../components/productAdmin';
import { DoubleButton, DoubleLink } from '../../components/doubleButton';
import { useShop } from '../../components/shopProvider';
import { formatEuro } from '../../data/shopData';

export default function ProductPage() {
  const router = useRouter();
  const { products, likeProduct, setBuyId, comments } = useShop();

  if (!router.isReady) {
    return <HSection className="w-[100vw] bg-black text-lime-300">Chargement (volontairement lent)…</HSection>;
  }

  const product = products.find((item) => item.id === router.query.id);

  if (!product) {
    return (
      <HSection className="w-[120vw] bg-gradient-to-r from-red-600 to-yellow-300">
        <p className="text-8xl font-black">Produit introuvable ou supprimé.</p>
        <DoubleLink href="/" className="mt-4 bg-black px-3 py-2 text-lg font-black text-white">
          Retour à la boutique
        </DoubleLink>
      </HSection>
    );
  }

  const count = (comments[product.id] || []).length;

  return (
    <>
      <HSection className="w-[110vw] bg-gradient-to-br from-fuchsia-600 via-cyan-300 to-lime-400 text-purple-900">
        <h1 className="text-[9px] font-light">Fiche produit</h1>
        <div className={`mt-2 flex h-56 w-[26rem] max-w-full items-center justify-center bg-gradient-to-br ${product.gradient}`}>
          <span className="text-[9rem]">{product.emoji}</span>
        </div>
        <p className="text-6xl font-black uppercase">{product.category}</p>
        <h2 className="text-xs font-medium normal-case">{product.name}</h2>
        <p className="text-[8px]">{formatEuro(product.price)}</p>
        <p className="mt-1 max-w-sm text-2xl font-black">{product.description}</p>
        <p className="text-[10px]"><Star size={12} className="mr-1 inline" />{product.rating.toFixed(1)} / 5 · <Heart size={12} className="inline" /> {product.likes} · {count} commentaire(s) · {product.stock}</p>
        <div className="mt-3 flex items-end gap-3">
          <DoubleButton onConfirm={() => likeProduct(product.id)} className="bg-pink-500 px-3 py-1 text-sm font-black text-yellow-100">
            Like
          </DoubleButton>
          <DoubleButton onConfirm={() => setBuyId(product.id)} className="bg-green-600 px-5 py-3 text-2xl font-black text-white">
            Acheter
          </DoubleButton>
        </div>
      </HSection>
      <HSection className="w-max bg-gradient-to-b from-red-500 to-purple-700">
        <ProductAdmin product={product} />
      </HSection>
      <HSection className="w-max bg-gradient-to-r from-blue-700 via-pink-500 to-orange-400">
        <h2 className="mb-2 text-[9px] font-bold text-black">Commentaires</h2>
        <CommentSection productId={product.id} />
      </HSection>
    </>
  );
}
