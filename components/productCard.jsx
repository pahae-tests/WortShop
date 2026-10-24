import { useState } from 'react';
import { Heart, MessageCircle, Star } from 'lucide-react';
import { useShop } from './shopProvider';
import { DoubleButton, DoubleLink } from './doubleButton';
import { formatEuro, pick } from '../data/shopData';

const spins = ['hover:rotate-180', 'hover:rotate-[360deg]', 'hover:-rotate-[360deg]', 'hover:rotate-[540deg]', 'hover:-rotate-180', 'hover:rotate-[720deg]'];
const touchSpins = ['rotate-180', 'rotate-[360deg]', '-rotate-[360deg]', 'rotate-[540deg]', '-rotate-180', 'rotate-[720deg]'];
const widths = ['w-56', 'w-72', 'w-48', 'w-80', 'w-60', 'w-64'];
const offsets = ['mt-0', 'mt-10', '-ml-6 mt-4', 'mt-24', '-ml-10 -mt-2', 'ml-4 mt-14'];
const borders = ['border-4 border-dashed', 'border-8 border-double', 'border-2 border-dotted', 'border-[6px] border-solid'];
const radii = ['rounded-none', 'rounded-3xl', 'rounded-tl-[60px]', 'rounded-full'];
const fontSizes = ['text-[7px]', 'text-[10px]', 'text-sm', 'text-[9px]'];
const likeMessages = ['Like retiré (non, en fait ajouté).', 'Merci d’avoir déçu ce produit !', '+1, ou -1, qui sait.', 'Votre like vaut 0,00 €.'];

export default function ProductCard({ product, index }) {
  const { likeProduct, comments, setBuyId, rgb } = useShop();
  const [burst, setBurst] = useState(0);
  const [likeText, setLikeText] = useState('');
  const [spun, setSpun] = useState(false);
  const commentCount = (comments[product.id] || []).length;

  const like = () => {
    likeProduct(product.id);
    setBurst((value) => value + 1);
    setLikeText(pick(likeMessages));
  };

  const k = index % 6;

  return (
    <article
      onTouchStart={() => setSpun((value) => !value)}
      className={`relative shrink-0 self-start bg-gradient-to-b from-white to-fuchsia-300 p-2 text-purple-800 shadow-[8px_8px_0_#00ff00] transition-transform duration-700 ${widths[k]} ${offsets[k]} ${borders[index % 4]} ${radii[(index + 1) % 4]} border-red-500 ${spins[k]} ${spun ? touchSpins[k] : ''} ${rgb ? 'animate-rgbCard' : ''}`}
    >
      <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${product.gradient} ${index % 2 ? 'rounded-full' : ''}`}>
        <span className="text-7xl">{product.emoji}</span>
      </div>
      <p className="animate-blinkColor text-3xl font-black uppercase leading-none">{product.category}</p>
      <h2 className={`${fontSizes[index % 4]} font-medium normal-case`}>{product.name}</h2>
      <p className="text-[7px] font-light">{formatEuro(product.price)}</p>
      <p className={`${index % 3 === 0 ? 'text-2xl' : 'text-[9px]'} font-bold`}>
        <Star size={12} className="mr-1 inline" />
        {product.rating.toFixed(1)} / 5
      </p>
      <p className="text-xl font-black uppercase text-orange-600">Stock : <span className="text-[8px] normal-case">{product.stock}</span></p>
      <p className="flex items-center gap-2 text-[10px]">
        <Heart size={12} /> {product.likes}
        <MessageCircle size={12} /> {commentCount}
      </p>
      <div className="relative mt-1 flex flex-wrap items-end gap-1">
        <DoubleButton onConfirm={like} className="relative bg-pink-500 px-2 py-1 text-xs font-black text-yellow-200">
          <Heart size={14} className="inline" /> Like
        </DoubleButton>
        {burst > 0 && (
          <span key={burst} className="pointer-events-none absolute -top-8 left-2 animate-ping text-3xl">
            ❤️
          </span>
        )}
        <DoubleButton onConfirm={() => setBuyId(product.id)} className="bg-green-600 px-3 py-2 text-lg font-black text-white">
          Acheter
        </DoubleButton>
        <DoubleLink href={`/products/${product.id}`} className="bg-blue-700 px-1 text-[9px] text-white">
          Voir
        </DoubleLink>
      </div>
      {likeText && <p className="text-[8px] italic text-red-600">{likeText}</p>}
    </article>
  );
}
