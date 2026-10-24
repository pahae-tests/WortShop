import { useState } from 'react';
import { useRouter } from 'next/router';
import { Moon, Palette, Search, ShoppingCart, User } from 'lucide-react';
import { useShop } from './shopProvider';
import { DoubleButton, DoubleLink } from './doubleButton';
import NotificationCenter from './notificationCenter';
import RageMeter from './rageMeter';
import { categories, formatEuro } from '../data/shopData';

export default function SiteHeader() {
  const router = useRouter();
  const { balance, cartCount, session, avatar, dark, setDark, rgb, setRgb, setQuery, setCategory, addRage, notify, logout } = useShop();
  const [text, setText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const search = () => {
    setQuery(text);
    setCategory('');
    addRage(3);
    notify(`Votre recherche « ${text} » a été comprise de travers.`);
    router.push('/');
  };

  const pickCategory = (name) => {
    setCategory(name);
    setQuery('');
    router.push('/');
  };

  return (
    <header className="flex h-36 shrink-0 flex-col overflow-x-auto overflow-y-hidden border-b-8 border-dashed border-cyan-300 bg-gradient-to-r from-green-500 via-purple-600 to-orange-500">
      <div className="flex w-max min-w-full flex-1 flex-nowrap items-center gap-6 px-3">
        <DoubleLink href="/" className="shrink-0 -rotate-3 bg-black px-2 text-5xl font-black italic">
          <span className="animate-blinkColor">Worst</span>
          <span className="text-[10px] text-lime-300">Shop</span>
        </DoubleLink>
        <div className="flex shrink-0 items-center gap-1 bg-yellow-300 p-1 text-red-700">
          <Search size={14} />
          <input value={text} onChange={(event) => setText(event.target.value)} placeholder="Chercher (ou pas)" aria-label="Recherche" className="w-28 bg-white px-1 text-[10px] text-black" />
          <DoubleButton onConfirm={search} className="bg-red-600 px-2 text-[9px] font-black text-white">
            OK
          </DoubleButton>
        </div>
        <nav className="flex shrink-0 items-end gap-3">
          <DoubleLink href="/" chaos className="bg-pink-600 px-2 text-xl font-black uppercase text-lime-200">
            Produits
          </DoubleLink>
          <DoubleLink href="/cart" chaos className="px-1 text-[9px] font-bold text-white underline">
            Historique
          </DoubleLink>
          <DoubleLink href="/settings" chaos className="rotate-2 bg-blue-700 px-3 py-2 text-sm font-black text-yellow-200">
            Paramètres
          </DoubleLink>
          {categories.map((name, index) => (
            <DoubleButton key={name} onConfirm={() => pickCategory(name)} className={`${index % 2 ? 'text-[8px]' : 'text-lg'} bg-lime-300 px-1 font-bold text-purple-800`}>
              {name}
            </DoubleButton>
          ))}
        </nav>
        <div className="shrink-0 border-4 border-yellow-300 bg-black px-3 py-1 text-3xl font-black text-lime-300">
          <span className="mr-1 text-[8px] text-white">SOLDE</span>
          {formatEuro(balance)}
        </div>
        <DoubleLink href="/cart" className="relative shrink-0 border-4 border-pink-300 bg-red-600 p-2 text-white">
          <ShoppingCart size={24} />
          <span className="absolute -right-3 -top-3 bg-yellow-300 px-1 text-xs font-black text-red-700">{cartCount}</span>
        </DoubleLink>
        <NotificationCenter />
        <DoubleButton onConfirm={() => setDark(!dark)} className="escapeDark shrink-0 border-4 border-white bg-white p-2 text-black">
          <Moon size={20} />
        </DoubleButton>
        <DoubleButton onConfirm={() => setRgb(!rgb)} className={`shrink-0 border-4 ${rgb ? 'animate-rgbCard' : 'border-black'} bg-black p-2 text-white`}>
          <Palette size={20} />
        </DoubleButton>
        <div className="shrink-0">
          <DoubleButton onConfirm={() => setMenuOpen(!menuOpen)} className="flex items-center gap-1 bg-cyan-300 px-2 py-1 text-[10px] font-bold text-red-700">
            <span className="text-xl">{avatar}</span>
            <User size={12} />
            {session ? session.name : 'Invité'}
          </DoubleButton>
          {menuOpen && (
            <div className="fixed right-4 top-36 z-[70] flex w-40 flex-col gap-1 border-4 border-black bg-orange-400 p-2 text-sm text-black">
              {!session && (
                <DoubleLink href="/login" className="bg-white px-1 text-left">
                  Connexion
                </DoubleLink>
              )}
              {!session && (
                <DoubleLink href="/register" className="bg-white px-1 text-left">
                  Inscription
                </DoubleLink>
              )}
              <DoubleLink href="/settings" className="bg-white px-1 text-left">
                Paramètres
              </DoubleLink>
              {session && (
                <DoubleButton onConfirm={logout} className="bg-red-500 px-1 text-left text-white">
                  Déconnexion
                </DoubleButton>
              )}
              <button type="button" onClick={() => setMenuOpen(false)} className="bg-black px-1 text-[9px] text-white">
                fermer le menu
              </button>
            </div>
          )}
        </div>
        <RageMeter />
      </div>
      <div className="w-[2400px] shrink-0 overflow-hidden bg-yellow-300">
        <div className="flex w-[4800px] animate-marquee whitespace-nowrap text-xs font-black uppercase text-red-600">
          <span className="w-[2400px]">PROMO : -99 % sur tout sauf ce que vous voulez ★ livraison gratuite dans une autre ville ★ chaque achat vous enrichit ★ chaque clic compte double</span>
          <span className="w-[2400px]">PROMO : -99 % sur tout sauf ce que vous voulez ★ livraison gratuite dans une autre ville ★ chaque achat vous enrichit ★ chaque clic compte double</span>
        </div>
      </div>
    </header>
  );
}
