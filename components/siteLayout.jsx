import SiteHeader from './siteHeader';
import SiteFooter from './siteFooter';
import BuyModal from './buyModal';
import { useShop } from './shopProvider';

export default function SiteLayout({ children }) {
  const { dark, rgb, toast, hint } = useShop();
  return (
    <div className={`${dark ? 'dark' : ''} ${rgb ? 'animate-rgbOverdose' : ''} flex h-[100dvh] w-screen flex-col overflow-hidden bg-pink-400 font-[family-name:Comic_Sans_MS,Papyrus,cursive] text-yellow-300`}>
      <SiteHeader />
      <main className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full w-max flex-nowrap items-stretch">
          {children}
          <SiteFooter />
        </div>
      </main>
      <BuyModal />
      {toast && (
        <div key={toast.id} className={`fixed z-[100] -rotate-6 border-4 px-3 py-1 text-sm font-black ${toast.spot} ${toast.color}`}>
          Enregistré avec succès !
        </div>
      )}
      {hint && <div key={hint.id} className="fixed bottom-3 left-1/4 z-[95] max-w-xs rotate-1 border-2 border-white bg-blue-700 px-2 py-1 text-[11px] font-bold text-white">{hint.text}</div>}
    </div>
  );
}
