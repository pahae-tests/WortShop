import { useMemo } from 'react';
import HSection from '../components/hSection';
import ProductCard from '../components/productCard';
import { DoubleButton } from '../components/doubleButton';
import { useShop } from '../components/shopProvider';
import { absurdSearch, categories } from '../data/shopData';

export default function Home() {
  const { products, query, setQuery, category, setCategory, notify } = useShop();
  const search = useMemo(() => absurdSearch(query, products), [query, products]);
  const shown = category ? products.filter((item) => item.category === category) : products;

  return (
    <>
      <HSection className="w-[130vw] bg-gradient-to-r from-lime-400 via-fuchsia-600 to-cyan-300">
        <h1 className="text-[9px] font-light uppercase text-black">Bienvenue sur WorstShop</h1>
        <p className="mt-2 animate-blinkColor whitespace-nowrap text-[9rem] font-black italic leading-none">SOLDES PERPÉTUELS</p>
        <p className="mt-4 text-[10px] text-white">Achetez pour vous enrichir. Chaque produit vous rapporte de l’argent. Cliquez deux fois sur tout. Oui, tout.</p>
      </HSection>
      {query && (
        <HSection className="w-max bg-gradient-to-b from-yellow-300 to-red-500 text-purple-900">
          <h2 className="text-[10px] font-bold">Résultats pour « {query} »</h2>
          <p className="text-4xl font-black">{search.explanation}</p>
          <div className="mt-3 flex items-start">
            {search.results.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index + 2} />
            ))}
          </div>
          <DoubleButton onConfirm={() => { setQuery(''); notify('Recherche effacée, mais pas oubliée.'); }} className="mt-4 bg-black px-2 text-[9px] text-white">
            Effacer la recherche
          </DoubleButton>
        </HSection>
      )}
      <HSection className="w-max bg-gradient-to-br from-orange-400 via-pink-500 to-purple-700">
        <div className="flex items-center gap-4">
          <h2 className="text-[10px] font-bold uppercase text-black">Tous nos produits {category ? `(filtre : ${category})` : ''}</h2>
          {category && (
            <DoubleButton onConfirm={() => setCategory('')} className="bg-white px-2 text-[9px] font-bold text-black">
              Retirer le filtre
            </DoubleButton>
          )}
        </div>
        {shown.length === 0 && <p className="mt-6 w-96 text-5xl font-black">Plus aucun produit. Bravo. Réinitialisez l’univers dans le pied de page.</p>}
        <div className="mt-4 flex items-start pr-24">
          {shown.map((item, index) => (
            <ProductCard key={item.id} product={item} index={index} />
          ))}
        </div>
      </HSection>
      <HSection className="w-[110vw] bg-gradient-to-l from-blue-600 via-green-400 to-yellow-300">
        <p className="text-[8px] text-black">Catégories</p>
        <div className="mt-2 flex flex-wrap gap-6">
          {categories.map((name, index) => (
            <DoubleButton key={name} onConfirm={() => setCategory(name)} className={`${index % 2 ? 'rotate-3 text-6xl' : '-rotate-2 text-3xl'} bg-fuchsia-700 px-4 font-black uppercase text-lime-300`}>
              {name}
            </DoubleButton>
          ))}
        </div>
      </HSection>
    </>
  );
}
