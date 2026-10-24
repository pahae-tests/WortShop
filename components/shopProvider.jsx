import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { initialProducts, initialUsers, initialComments, notificationTemplates, toastSpots, toastColors, hintMessages, pick, formatEuro } from '../data/shopData';

const ShopContext = createContext(null);
const storageKey = 'worstShopState';

export function useShop() {
  return useContext(ShopContext);
}

export function ShopProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [users, setUsers] = useState(initialUsers);
  const [comments, setComments] = useState(initialComments);
  const [balance, setBalance] = useState(26);
  const [purchases, setPurchases] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const [rage, setRage] = useState(3);
  const [dark, setDark] = useState(false);
  const [rgb, setRgb] = useState(false);
  const [session, setSession] = useState(null);
  const [avatar, setAvatar] = useState('🙂');
  const [chain, setChain] = useState(0);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [toast, setToast] = useState(null);
  const [hint, setHint] = useState(null);
  const [buyId, setBuyId] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const counter = useRef(1);
  const toastTimer = useRef(null);
  const hintTimer = useRef(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.products)) setProducts(saved.products);
        if (saved.comments && typeof saved.comments === 'object') setComments(saved.comments);
        if (typeof saved.balance === 'number') setBalance(saved.balance);
        if (Array.isArray(saved.purchases)) setPurchases(saved.purchases);
        if (typeof saved.dark === 'boolean') setDark(saved.dark);
        if (typeof saved.rgb === 'boolean') setRgb(saved.rgb);
        if (saved.session) setSession(saved.session);
        if (saved.avatar) setAvatar(saved.avatar);
      }
    } catch (error) {
      window.localStorage.removeItem(storageKey);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ products, comments, balance, purchases, dark, rgb, session, avatar }));
    } catch (error) {
      return;
    }
  }, [hydrated, products, comments, balance, purchases, dark, rgb, session, avatar]);

  const showToast = useCallback(() => {
    setToast({ id: counter.current++, spot: pick(toastSpots), color: pick(toastColors) });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1100);
  }, []);

  const showHint = useCallback((text) => {
    setHint({ id: counter.current++, text: text || pick(hintMessages) });
    clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setHint(null), 2200);
  }, []);

  const addRage = useCallback((amount) => {
    setRage((value) => Math.min(100, Math.max(0, value + amount)));
  }, []);

  const resetRage = useCallback(() => setRage(0), []);

  const notify = useCallback((text) => {
    const id = counter.current++;
    const message = text || pick(notificationTemplates);
    setNotifs((list) => [{ id, text: message }, ...list].slice(0, 300));
  }, []);

  const removeNotif = useCallback((id) => {
    setNotifs((list) => list.filter((item) => item.id !== id));
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (event.target instanceof Element && event.target.closest('button')) showToast();
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [showToast]);

  useEffect(() => {
    const timer = setInterval(() => setRage((value) => Math.max(0, value - 1)), 5000);
    return () => {
      clearInterval(timer);
      clearTimeout(toastTimer.current);
      clearTimeout(hintTimer.current);
    };
  }, []);

  const likeProduct = useCallback((id) => {
    setProducts((list) => list.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item)));
    notify('Quelqu’un a aimé votre notification.');
  }, [notify]);

  const updateProduct = useCallback((id, patch) => {
    setProducts((list) => list.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((list) => list.filter((item) => item.id !== id));
    notify('Un produit a quitté la boutique sans prévenir.');
  }, [notify]);

  const addComment = useCallback((productId, user, text) => {
    const id = `c-${counter.current++}`;
    setComments((map) => ({ ...map, [productId]: [{ id, user, text }, ...(map[productId] || [])] }));
    notify('Votre commentaire de 900 caractères a été à peine lu.');
  }, [notify]);

  const deleteComment = useCallback((productId, commentId) => {
    setComments((map) => ({ ...map, [productId]: (map[productId] || []).filter((item) => item.id !== commentId) }));
    notify('Un commentaire a été supprimé par un inconnu tout-puissant.');
  }, [notify]);

  const purchase = useCallback((product, quantity) => {
    const gain = Math.round(product.price * quantity * 100) / 100;
    setBalance((value) => Math.round((value + gain) * 100) / 100);
    const id = counter.current++;
    setPurchases((list) => [{ id, name: product.name, emoji: product.emoji, qty: quantity, gain }, ...list].slice(0, 50));
    notify(`Achat confirmé : votre solde augmente de ${formatEuro(gain)}.`);
    notify('Votre achat vous a acheté une notification.');
    notify('Félicitations, vous êtes plus riche à cause de votre dépense.');
    notify('Votre panier a reçu un panier.');
    notify('Merci de votre achat, de rien.');
  }, [notify]);

  const login = useCallback((name) => {
    setSession({ name });
    notify(`Bienvenue ${name}, vous êtes administrateur de tout.`);
  }, [notify]);

  const logout = useCallback(() => {
    setSession(null);
    notify('Vous êtes déconnecté, mais vous reviendrez.');
  }, [notify]);

  const registerUser = useCallback((user) => {
    setUsers((list) => [...list, user]);
  }, []);

  const updateUser = useCallback((name, patch) => {
    setUsers((list) => list.map((item) => (item.name === name ? { ...item, ...patch } : item)));
  }, []);

  const resetAll = useCallback(() => {
    setProducts(initialProducts);
    setUsers(initialUsers);
    setComments(initialComments);
    setBalance(26);
    setPurchases([]);
    setNotifs([]);
    setRage(3);
    setDark(false);
    setRgb(false);
    setSession(null);
    setAvatar('🙂');
    setChain(0);
    setQuery('');
    setCategory('');
    setBuyId(null);
    try {
      window.localStorage.removeItem(storageKey);
    } catch (error) {
      return;
    }
  }, []);

  const cartCount = purchases.reduce((sum, item) => sum + item.qty, 0);

  const value = {
    products, users, comments, balance, purchases, notifs, rage, dark, rgb, session, avatar, chain, query, category, toast, hint, buyId, cartCount,
    setDark, setRgb, setAvatar, setChain, setQuery, setCategory, setBuyId,
    showToast, showHint, addRage, resetRage, notify, removeNotif, likeProduct, updateProduct, deleteProduct, addComment, deleteComment, purchase, login, logout, registerUser, updateUser, resetAll
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
