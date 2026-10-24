import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useShop } from './shopProvider';
import { pick } from '../data/shopData';

const detours = ['/cart', '/login', '/register', '/settings', '/'];

export function DoubleButton({ onConfirm, children, className = '', hintText, disabled = false, title }) {
  const { showHint, addRage, notify } = useShop();
  const [armed, setArmed] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = (event) => {
    if (disabled) return;
    if (!armed) {
      setArmed(true);
      showHint(hintText);
      addRage(1);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setArmed(false), 2600);
      return;
    }
    clearTimeout(timer.current);
    setArmed(false);
    notify();
    if (onConfirm) onConfirm(event);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      title={title}
      onClick={handleClick}
      className={`${className} ${armed ? 'animate-wobble outline outline-4 outline-offset-2 outline-yellow-300' : ''} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {children}
    </button>
  );
}

export function DoubleLink({ href, children, className = '', chaos = false }) {
  const router = useRouter();
  const { notify, addRage } = useShop();

  const go = () => {
    let target = href;
    if (chaos && Math.random() < 0.15) {
      target = pick(detours);
      addRage(3);
      notify('Navigation imprévue : vous alliez quelque part, nous avons décidé autrement.');
    }
    router.push(target);
  };

  return (
    <DoubleButton onConfirm={go} className={className}>
      {children}
    </DoubleButton>
  );
}
