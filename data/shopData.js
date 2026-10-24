export function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function formatEuro(value) {
  const rounded = Math.round(value * 100) / 100;
  if (Number.isInteger(rounded)) return `${rounded} €`;
  return `${rounded.toFixed(2).replace('.', ',')} €`;
}

export const initialUsers = [
  { name: 'Mohamed', password: 'banane123', bio: 'Collectionne les bananes tristes.' },
  { name: 'Fatima', password: 'azerty', bio: 'Aime les claviers sans lettres.' },
  { name: 'Jean-Kevin', password: 'motdepasse', bio: 'Pense que Wi-Fi est un prénom.' },
  { name: 'Brigitte', password: '123456', bio: 'Vend des grille-pains à des footballeurs.' },
  { name: 'Xavier', password: 'qwerty', bio: 'Fan officiel de la chaise gauche.' },
  { name: 'Aïcha', password: 'soleil2000', bio: 'Écrit des avis de 900 caractères pour le plaisir.' }
];

export const initialProducts = [
  { id: 'banane', name: 'Banane de Compétition', emoji: '🍌', gradient: 'from-yellow-300 via-lime-400 to-green-600', price: 2.5, category: 'Alimentation', description: 'Une banane entraînée tous les matins. Courbe garantie à 97 %.', rating: 4.7, likes: 128, stock: 'En stock' },
  { id: 'banane2', name: 'Banane Bio (déjà mangée)', emoji: '🍌', gradient: 'from-orange-300 via-yellow-200 to-amber-600', price: 1.2, category: 'Alimentation', description: 'Livrée avec sa peau, seul vestige de sa gloire passée.', rating: 3.1, likes: 42, stock: 'Plus que 1 (depuis 2009)' },
  { id: 'maillot', name: 'Maillot Barcelone (taille 3 ans)', emoji: '👕', gradient: 'from-blue-600 via-red-500 to-yellow-300', price: 89, category: 'Sport', description: 'Authentique maillot de supporter, taille idéale pour un hamster.', rating: 4.2, likes: 301, stock: 'En stock' },
  { id: 'echarpe', name: 'Écharpe Barça (rétrécie)', emoji: '🧣', gradient: 'from-red-600 via-blue-700 to-yellow-400', price: 24, category: 'Sport', description: 'Lavée à 90 degrés avant expédition pour un style authentique.', rating: 3.9, likes: 77, stock: 'Plus que 3 (en rêve)' },
  { id: 'chaise', name: 'Chaise Gaming Qui Penche', emoji: '🪑', gradient: 'from-fuchsia-500 via-purple-600 to-indigo-700', price: 149.99, category: 'Mobilier', description: 'Penche à gauche pour développer votre sens de la gravité.', rating: 4.9, likes: 512, stock: 'En stock' },
  { id: 'chaise2', name: 'Chaise de Bureau Sans Pieds', emoji: '💺', gradient: 'from-cyan-300 via-sky-500 to-blue-800', price: 79, category: 'Mobilier', description: 'Idéale pour s’asseoir par terre avec style.', rating: 2.8, likes: 19, stock: 'Rupture (achetable quand même)' },
  { id: 'grillepain', name: 'Grille-Pain Footballeur', emoji: '🍞', gradient: 'from-orange-500 via-red-500 to-pink-600', price: 39, category: 'Électroménager', description: 'Marque un but à chaque tartine. Arbitrage vidéo inclus.', rating: 4.4, likes: 240, stock: 'En stock' },
  { id: 'laptop', name: 'Ordinateur Portable en Carton', emoji: '💻', gradient: 'from-stone-300 via-amber-700 to-stone-500', price: 599, category: 'Informatique', description: 'Léger, recyclable et compatible avec absolument aucun logiciel.', rating: 3.5, likes: 64, stock: 'Plus que 2 (en carton)' },
  { id: 'ballon', name: 'Ballon de Football Carré', emoji: '⚽', gradient: 'from-lime-300 via-green-500 to-emerald-800', price: 25, category: 'Sport', description: 'Rebondit dans quatre directions à la fois. Vingt-cinq pour cent plus honnête.', rating: 4.0, likes: 155, stock: 'En stock' },
  { id: 'chaussette', name: 'Chaussette Gauche (vendue seule)', emoji: '🧦', gradient: 'from-pink-300 via-rose-500 to-red-700', price: 12, category: 'Mode', description: 'La droite est restée dans le sèche-linge de 2014.', rating: 3.3, likes: 88, stock: 'Rupture (achetable quand même)' },
  { id: 'parapluie', name: 'Parapluie d’Intérieur Troué', emoji: '☂️', gradient: 'from-sky-300 via-indigo-400 to-purple-700', price: 18.5, category: 'Mode', description: 'Protège de la pluie imaginaire uniquement.', rating: 2.9, likes: 31, stock: 'En stock' },
  { id: 'oreiller', name: 'Oreiller en Béton Cellulaire', emoji: '🛏️', gradient: 'from-gray-200 via-slate-400 to-zinc-700', price: 74, category: 'Mobilier', description: 'Ferme, durable et sans aucune pitié pour les cervicales.', rating: 1.9, likes: 12, stock: 'Plus que 1 (depuis 2009)' },
  { id: 'lunettes', name: 'Lunettes de Soleil Nocturnes', emoji: '🕶️', gradient: 'from-violet-500 via-fuchsia-600 to-black', price: 31, category: 'Mode', description: 'Indispensables pour ne rien voir à partir de 22 heures.', rating: 4.1, likes: 97, stock: 'En stock' },
  { id: 'tapis', name: 'Tapis de Souris de 4 m²', emoji: '🟪', gradient: 'from-purple-400 via-pink-500 to-orange-400', price: 55, category: 'Informatique', description: 'Pour les souris qui voient grand et les bureaux qui ne suivent pas.', rating: 3.8, likes: 51, stock: 'En stock' },
  { id: 'plante', name: 'Plante Artificielle Vivante', emoji: '🪴', gradient: 'from-green-300 via-emerald-500 to-teal-800', price: 22, category: 'Maison', description: 'Fausse mais arrosable. Meurt quand même en deux semaines.', rating: 4.3, likes: 203, stock: 'En stock' },
  { id: 'horloge', name: 'Horloge Qui Retarde Volontairement', emoji: '⏰', gradient: 'from-red-400 via-orange-300 to-yellow-500', price: 45, category: 'Maison', description: 'Garantie de vous faire arriver en retard avec une régularité scientifique.', rating: 4.6, likes: 176, stock: 'Rupture (achetable quand même)' }
];

export const categories = Array.from(new Set(initialProducts.map((product) => product.category)));

const seedTexts = [
  'Excellent produit mais je ne sais toujours pas à quoi il sert.',
  'Reçu avant même de le commander. Inquiétant.',
  'Mon chat l’a adopté et m’a déshérité.',
  'Cinq étoiles, une pour chaque doigt que je n’ai plus.',
  'Livraison rapide, produit lent, vendeur absent.',
  'Je recommande pour les gens qui détestent les recommandations.'
];

export const initialComments = initialProducts.reduce((acc, product, index) => {
  acc[product.id] = [0, 1].map((offset) => ({
    id: `${product.id}-seed-${offset}`,
    user: initialUsers[(index + offset) % initialUsers.length].name,
    text: seedTexts[(index + offset * 3) % seedTexts.length]
  }));
  return acc;
}, {});

export const notificationTemplates = [
  'Vous avez reçu une notification.',
  'Vous avez consulté une notification.',
  'Vous avez fermé une notification.',
  'Votre notification a reçu une notification.',
  'Quelqu’un a aimé votre notification.',
  'Votre notification n’a pas aimé votre notification.',
  'Une notification vous a demandé en mariage.',
  'Votre solde a changé, sans que vous sachiez pourquoi.',
  'Nous vous notifions que vous avez été notifié.',
  'Une notification importante est arrivée mais elle est restée dehors.',
  'Votre rage a été notée avec bienveillance.',
  'Ceci est la notification numéro un million (au moins).'
];

export const toastSpots = [
  'top-28 right-1',
  'bottom-2 left-1/3',
  'top-1/2 left-2',
  'bottom-24 right-10',
  'top-36 left-1/2',
  'bottom-10 left-0'
];

export const toastColors = [
  'bg-lime-300 text-fuchsia-700 border-red-600',
  'bg-black text-yellow-300 border-cyan-400',
  'bg-red-600 text-green-300 border-yellow-300',
  'bg-cyan-300 text-orange-600 border-purple-700',
  'bg-yellow-300 text-pink-600 border-blue-700'
];

export const hintMessages = [
  'Veuillez cliquer une deuxième fois pour confirmer votre existence.',
  'Un seul clic ne suffit pas : prouvez que vous le pensez.',
  'Cliquez encore. Le bouton doute de votre sincérité.',
  'Deuxième clic requis. Le premier était un brouillon.'
];

export const autoPairs = [
  ['excellent produit', 'Potato excellent'],
  ['je recommande', 'Je décommande'],
  ['très pratique', 'Très problématique'],
  ['bonjour', 'Bananier']
];

export const wrongDropMessages = [
  'Cette pièce a refusé la case.',
  'Mauvais endroit. La pièce vous juge.',
  'Presque. Enfin non.',
  'Le puzzle soupire profondément.'
];

export const searchExplanations = [
  'Notre algorithme comprend vos intentions mieux que vous.',
  'Ces résultats ont été choisis par un comité de grille-pains.',
  'Vous ne cherchiez pas ça, mais vous en avez besoin.',
  'Notre intelligence artificielle a lu votre requête à l’envers.'
];

const keywordMap = {
  barcelona: ['banane', 'banane2'],
  laptop: ['chaise', 'chaise2'],
  football: ['grillepain'],
  banana: ['maillot', 'echarpe'],
  banane: ['maillot', 'echarpe']
};

function hashText(text) {
  let value = 7;
  for (let i = 0; i < text.length; i += 1) {
    value = (value * 31 + text.charCodeAt(i)) % 100003;
  }
  return value;
}

export function absurdSearch(query, products) {
  const text = query.trim().toLowerCase();
  if (!text) return { results: [], explanation: '' };
  const ids = [];
  Object.keys(keywordMap).forEach((key) => {
    if (text.includes(key)) {
      keywordMap[key].forEach((id) => {
        if (!ids.includes(id)) ids.push(id);
      });
    }
  });
  const results = ids.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  const start = hashText(text);
  for (let step = 0; step < products.length && results.length < 3; step += 1) {
    const candidate = products[(start + step) % products.length];
    if (!results.includes(candidate)) results.push(candidate);
  }
  const explanation = ids.length > 0 ? searchExplanations[0] : searchExplanations[start % searchExplanations.length];
  return { results, explanation };
}

export const puzzleCols = 6;
export const puzzleRows = 4;
export const puzzleCell = 56;
export const puzzlePad = 14;

function noise(seed) {
  const raw = Math.sin(seed * 12.9898) * 43758.5453;
  return raw - Math.floor(raw);
}

export function puzzleVertex(col, row) {
  const edgeX = col === 0 || col === puzzleCols;
  const edgeY = row === 0 || row === puzzleRows;
  const jitterX = edgeX ? 0 : (noise(col * 7 + row * 13 + 1) - 0.5) * 24;
  const jitterY = edgeY ? 0 : (noise(col * 11 + row * 5 + 2) - 0.5) * 24;
  return [col * puzzleCell + jitterX, row * puzzleCell + jitterY];
}

const puzzleSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='336' height='224' viewBox='0 0 336 224'><defs><linearGradient id='sky' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#ff2fa0'/><stop offset='0.5' stop-color='#ff9a1f'/><stop offset='1' stop-color='#ffe83a'/></linearGradient><linearGradient id='sea' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#00e5ff'/><stop offset='1' stop-color='#1a2cff'/></linearGradient></defs><rect width='336' height='224' fill='url(#sky)'/><circle cx='252' cy='58' r='38' fill='#fff200' stroke='#ff0000' stroke-width='6'/><polygon points='0,150 60,70 120,150' fill='#7a00ff'/><polygon points='90,150 170,50 250,150' fill='#00b84a'/><polygon points='200,150 270,90 336,150' fill='#e60073'/><rect y='150' width='336' height='74' fill='url(#sea)'/><path d='M40 186 Q90 120 150 178 Q96 160 40 186Z' fill='#ffe600' stroke='#3b2a00' stroke-width='5'/><rect x='200' y='170' width='60' height='20' fill='#ff2200'/><rect x='214' y='158' width='32' height='14' fill='#ffffff'/><circle cx='20' cy='20' r='9' fill='#00ff6a'/><circle cx='120' cy='30' r='6' fill='#0044ff'/><circle cx='170' cy='18' r='8' fill='#ffffff'/><circle cx='300' cy='200' r='10' fill='#ff00ff'/><circle cx='320' cy='120' r='7' fill='#00ffff'/><circle cx='10' cy='210' r='8' fill='#ffff00'/><text x='96' y='215' font-size='26' font-family='Impact, sans-serif' fill='#ff0000' stroke='#000' stroke-width='1.5'>WORST</text><rect x='0' y='96' width='30' height='10' fill='#00ffcc'/><rect x='306' y='60' width='30' height='14' fill='#8800ff'/></svg>`;

export const puzzleImage = `data:image/svg+xml;utf8,${encodeURIComponent(puzzleSvg)}`;

export const mockPassword = 'oignon42';

export const avatars = ['🙂', '🦆', '🥔', '🤖', '👽', '🐸', '🧀', '🦄'];
