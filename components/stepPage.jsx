import { useEffect } from 'react';
import HSection from './hSection';
import { DoubleLink } from './doubleButton';
import { useShop } from './shopProvider';

const looks = [
  'from-blue-600 via-pink-500 to-yellow-300',
  'from-lime-400 via-purple-600 to-red-500',
  'from-orange-400 via-cyan-300 to-fuchsia-600',
  'from-green-500 via-yellow-200 to-pink-600',
  'from-purple-700 via-red-500 to-lime-300',
  'from-cyan-400 via-blue-800 to-orange-500',
  'from-yellow-300 via-fuchsia-600 to-green-600'
];

export default function StepPage({ step, title, text, nextHref, nextLabel, children }) {
  const { setChain } = useShop();

  useEffect(() => {
    setChain((value) => (value === step - 1 ? step : value));
  }, [step, setChain]);

  return (
    <>
      <HSection className={`w-[110vw] bg-gradient-to-br ${looks[(step - 1) % 7]}`}>
        <h1 className="text-[9px] font-light text-black">Étape {step} sur 8 : {title}</h1>
        <p className="mt-2 max-w-xl text-5xl font-black leading-tight">{text}</p>
        <DoubleLink href={nextHref} className="mt-6 rotate-2 bg-black px-4 py-3 text-xl font-black text-lime-300">
          {nextLabel}
        </DoubleLink>
      </HSection>
      {children && <HSection className="w-max min-w-[90vw] bg-gradient-to-b from-gray-200 via-pink-400 to-blue-700 text-purple-900">{children}</HSection>}
    </>
  );
}
