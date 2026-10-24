import { useEffect, useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useShop } from './shopProvider';
import { DoubleButton } from './doubleButton';
import ConfirmDialog from './confirmDialog';
import { autoPairs } from '../data/shopData';

const minChars = 900;
const minEmojis = 14;
const minSymbols = 7;
const minAts = 4;

function countStats(text) {
  const emojis = (text.match(/\p{Extended_Pictographic}/gu) || []).length;
  const symbols = (text.match(/[!#$%^&*()_+\-=[\]{}|;:<>?/~§€£¥°]/g) || []).length;
  const ats = (text.match(/@/g) || []).length;
  return { chars: text.length, emojis, symbols, ats };
}

function autocorrect(value) {
  if (!/[\s.,!?]$/.test(value)) return null;
  const trimmed = value.replace(/[\s.,!?]+$/, '');
  const tail = value.slice(trimmed.length);
  const lower = trimmed.toLowerCase();
  for (const [from, to] of autoPairs) {
    if (!lower.endsWith(from)) continue;
    const before = lower.length - from.length - 1;
    if (before >= 0 && !/[\s.,!?]/.test(lower[before])) continue;
    return { value: trimmed.slice(0, trimmed.length - from.length) + to + tail, from, to };
  }
  return null;
}

export default function CommentSection({ productId }) {
  const { comments, addComment, deleteComment, session, addRage, notify } = useShop();
  const [text, setText] = useState('');
  const [note, setNote] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);
  const hits = useRef(0);
  const areaRef = useRef(null);
  const caretRef = useRef(null);
  const list = comments[productId] || [];
  const stats = countStats(text);
  const ok = stats.chars >= minChars && stats.emojis >= minEmojis && stats.symbols >= minSymbols && stats.ats >= minAts;

  const errors = [];
  if (stats.chars < minChars) errors.push(`Ce formulaire exige encore ${minChars - stats.chars} caractères et il n’a aucune pitié pour votre clavier.`);
  if (stats.emojis < minEmojis) errors.push(`Il manque ${minEmojis - stats.emojis} émojis. Le formulaire est un cimetière sans visages.`);
  if (stats.symbols < minSymbols) errors.push(`Il manque ${minSymbols - stats.symbols} symboles spéciaux. Ce formulaire a la grammaire d’une pierre.`);
  if (stats.ats < minAts) errors.push(`Il manque ${minAts - stats.ats} arobases. Ce formulaire se prend pour un annuaire.`);

  useEffect(() => {
    if (caretRef.current !== null && areaRef.current) {
      areaRef.current.setSelectionRange(caretRef.current, caretRef.current);
      caretRef.current = null;
    }
  }, [text]);

  const change = (event) => {
    const next = event.target.value;
    if (next.length > text.length) {
      const caret = event.target.selectionStart;
      const fixed = autocorrect(next.slice(0, caret));
      if (fixed) hits.current += 1;
      if (fixed && hits.current % 4 !== 0) {
        addRage(2);
        setNote(`Autocorrection : « ${fixed.from} » devient « ${fixed.to} ». Vous êtes bien trop aimable.`);
        caretRef.current = fixed.value.length;
        setText(fixed.value + next.slice(caret));
        return;
      }
    }
    setText(next);
  };

  const submit = () => {
    if (!ok) return;
    addComment(productId, session ? session.name : 'Invité', text);
    setText('');
    setNote('');
  };

  const counter = (label, value, min) => (
    <span className={`${value >= min ? 'bg-green-500 text-black' : 'bg-red-600 text-white'} border border-black px-1 text-[10px] font-black`}>
      {label} {value}/{min}
    </span>
  );

  return (
    <div className="flex items-start gap-4">
      <div className="w-96 shrink-0 -rotate-1 border-4 border-dashed border-yellow-300 bg-purple-800 p-2 text-white">
        <h3 className="text-[9px] font-bold">Votre avis (obligatoirement long)</h3>
        <textarea ref={areaRef} value={text} onChange={change} rows={8} aria-label="Commentaire" className="mt-1 w-full bg-yellow-100 p-1 text-xs text-black" />
        <div className="flex flex-wrap gap-1">
          {counter('Caractères', stats.chars, minChars)}
          {counter('Émojis', stats.emojis, minEmojis)}
          {counter('Symboles', stats.symbols, minSymbols)}
          {counter('@', stats.ats, minAts)}
        </div>
        {note && <p className="mt-1 text-[10px] text-lime-300">{note}</p>}
        {errors.map((message) => (
          <p key={message} className="mt-1 text-[11px] font-bold text-orange-300">{message}</p>
        ))}
        <DoubleButton onConfirm={submit} disabled={!ok} className="mt-2 bg-lime-400 px-3 py-1 text-xl font-black text-black">
          Publier
        </DoubleButton>
      </div>
      {list.length === 0 && <p className="w-60 text-3xl font-black">Aucun commentaire. Le silence est une critique.</p>}
      {list.map((item, index) => (
        <div key={item.id} className={`${index % 2 ? 'mt-10 w-52' : 'w-72'} shrink-0 border-4 border-dotted border-cyan-300 bg-blue-800 p-2 text-white`}>
          <p className="text-2xl font-black text-yellow-300">{item.user}</p>
          <p className="max-h-40 overflow-y-auto break-words text-[9px]">{item.text}</p>
          <DoubleButton
            onConfirm={() => (session ? setPendingDelete(item.id) : notify('Connectez-vous pour devenir administrateur.'))}
            className="mt-1 bg-red-600 p-1 text-white"
          >
            <Trash2 size={12} />
          </DoubleButton>
        </div>
      ))}
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        question="Supprimer ce commentaire pour toujours (ou presque) ?"
        detail="Le rouge confirme la suppression. Le vert l’annule. Respirez."
        redLabel="SUPPRIMER"
        greenLabel="Garder"
        onRed={() => {
          deleteComment(productId, pendingDelete);
          setPendingDelete(null);
        }}
        onGreen={() => setPendingDelete(null)}
        onClose={() => setPendingDelete(null)}
      />
    </div>
  );
}
