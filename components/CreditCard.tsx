import React, { useMemo } from 'react';
import { Wifi } from 'lucide-react';
import { CardData, CardBrand } from '../types';

interface CreditCardProps {
  data: CardData;
  cardBrand: CardBrand;
  isFlipped: boolean;
}

const CreditCard: React.FC<CreditCardProps> = ({ data, cardBrand, isFlipped }) => {
  // Format display number
  const { formattedNumber } = useMemo(() => {
    const raw = data.cardNumber.replace(/\s/g, '');
    const parts: { text: string; isMask: boolean }[] = [];
    const maxLength = cardBrand === 'amex' ? 15 : 16;
    
    for (let i = 0; i < 16; i++) {
        const char = raw[i];
        if (cardBrand === 'amex') {
            if (i === 4 || i === 10) parts.push({ text: ' ', isMask: false });
        } else {
            if (i > 0 && i % 4 === 0) parts.push({ text: ' ', isMask: false });
        }
        
        if (i < maxLength) {
             if (char) {
                parts.push({ text: char, isMask: false });
            } else {
                parts.push({ text: '•', isMask: true });
            }
        }
    }
    return { formattedNumber: parts };
  }, [data.cardNumber, cardBrand]);

  const displayExpiry = useMemo(() => {
    if (!data.expiryDate) return 'MM/YY';
    const [year, month] = data.expiryDate.split('-');
    if (!year || !month) return 'MM/YY';
    return `${month}/${year.slice(2)}`;
  }, [data.expiryDate]);

  const renderLogo = () => {
    switch(cardBrand) {
      case 'visa':
        return (
          <svg className="w-16 h-8" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.78 15.6H16.63L18.6 3.44H21.75L19.78 15.6ZM34.23 3.65C33.62 3.42 32.54 3.25 31.18 3.25C27.7 3.25 25.26 5.09 25.23 7.82C25.21 9.84 27.02 10.97 28.38 11.64C29.78 12.33 30.25 12.76 30.25 13.37C30.25 14.33 29.11 14.77 28.06 14.77C27.08 14.77 26.54 14.5 26.09 14.3L25.61 14.09L25.08 17.07C25.96 17.47 27.58 17.82 29.25 17.83C32.96 17.83 35.4 16 35.42 13.16C35.43 11.28 34.31 10.27 32.06 9.18C31.06 8.68 30.45 8.35 30.45 7.63C30.45 6.94 31.2 6.64 31.95 6.64C32.91 6.64 33.72 6.88 34.19 7.09L34.23 3.65ZM43.91 3.44H41.05C40.15 3.44 39.4 3.96 39.06 4.77L33.37 17.89H36.68L37.34 16.08H41.56L41.95 17.89H44.89L43.91 3.44ZM38.25 13.62L39.93 9.07C40.16 8.37 40.24 8.08 40.24 8.08C40.2 8.16 40.29 8.24 40.41 8.84L40.91 13.62H38.25ZM12.78 3.44H9.36L6.5 10.98C6.34 11.68 6.2 12.01 6.07 11.53L5.23 7.27C4.78 5.12 2.87 3.55 0.5 3.44V3.44L0.86 5.16C2.64 5.56 3.68 6.56 4.24 8.69L6.5 17.89H9.95L15.93 3.44H12.78Z" fill="white"/>
          </svg>
        );
      case 'mastercard':
        return (
          <svg className="w-16 h-10" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="10" r="10" fill="#EB001B" fillOpacity="0.9"/>
            <circle cx="21" cy="10" r="10" fill="#F79E1B" fillOpacity="0.9"/>
            <path d="M16 3.5A9.95 9.95 0 0 0 11 10c0 2.57.97 4.92 2.56 6.67A9.96 9.96 0 0 0 21 10a9.96 9.96 0 0 0-5-6.5z" fill="#FF5F00"/>
          </svg>
        );
      case 'elo':
        return (
          <div className="flex items-center gap-1">
             <div className="w-12 h-12 bg-black rounded-full border-2 border-white flex items-center justify-center relative overflow-hidden">
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 border-red-500 transform rotate-45"></div>
                <div className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="absolute bottom-2 left-3 w-5 h-2 bg-green-500 rounded-sm transform -rotate-12"></div>
                <span className="text-white font-bold text-xs z-10">elo</span>
             </div>
          </div>
        );
      case 'hipercard':
        return (
           <div className="bg-[#b91c1c] px-2 py-1 rounded skew-x-[-10deg]">
             <span className="text-white font-bold text-lg italic skew-x-[10deg]">Hiper</span>
           </div>
        );
      case 'amex':
        return (
          <div className="bg-[#006fcf] px-2 py-1 rounded flex items-center justify-center border border-white/50 w-14 h-10">
            <span className="text-white font-bold text-xs text-center leading-tight">AMERICAN<br/>EXPRESS</span>
          </div>
        );
      default:
        return <span className="text-white font-bold tracking-wider text-lg drop-shadow-md">DINABANK</span>;
    }
  };

  const matrixBg = `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='15' fill='%2322c55e' font-family='monospace' font-size='10' opacity='0.4'%3E10110 01001%3C/text%3E%3Ctext x='60' y='15' fill='%2322c55e' font-family='monospace' font-size='10' opacity='0.3'%3E01 1101%3C/text%3E%3C/svg%3E")`;

  return (
    <div className="w-full max-w-[380px] h-[220px] relative perspective-1000 animate-float z-10">
      
      {/* Container that flips */}
      <div className={`w-full h-full relative transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* ================= CARD FRONT ================= */}
        <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617] shadow-2xl p-7 border border-white/10 overflow-hidden backface-hidden">
             {/* Matrix Rain Effect Background (Front Only) */}
            <div 
                className="absolute inset-0 z-0 animate-matrix opacity-30 pointer-events-none"
                style={{ backgroundImage: matrixBg, backgroundSize: '150px 30px' }}
            ></div>
            
            {/* Glows */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl z-0"></div>

            <div className="flex flex-col h-full justify-between relative z-10">
                <div className="flex justify-between items-start">
                    {/* Dinabank Logo */}
                    <div className="w-16 h-16 rounded-full overflow-hidden relative shadow-2xl flex items-center justify-center bg-gradient-to-br from-emerald-900 via-green-800 to-teal-700">
                        <img 
                            src="/dinacoin.png" 
                            alt="Dinacoin Logo" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Brand */}
                    <div className="flex flex-col items-end">
                        {renderLogo()}
                        {cardBrand !== 'unknown' && <Wifi className="w-6 h-6 text-white/60 rotate-90 mt-2" />}
                    </div>
                </div>

                {/* Number */}
                <div className="mt-2">
                    <p className="font-mono text-[26px] tracking-widest drop-shadow-md flex items-center h-10">
                    {formattedNumber.map((item, index) => (
                        <span 
                        key={index} 
                        className={`${item.isMask ? 'text-white/20' : 'text-white text-shadow-sm'} transition-colors duration-200`}
                        >
                        {item.text}
                        </span>
                    ))}
                    </p>
                </div>

                {/* Footer Info */}
                <div className="flex justify-between items-end text-sm text-gray-300">
                    <div className="flex flex-col max-w-[65%]">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5 font-semibold">Titular</span>
                        <span className="uppercase font-medium text-white tracking-wide truncate text-shadow">
                            {data.holderName || 'NOME DO TITULAR'}
                        </span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5 font-semibold">Validade</span>
                        <span className="font-mono text-white font-medium text-base text-shadow">
                            {displayExpiry}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* ================= CARD BACK ================= */}
        <div className="absolute inset-0 w-full h-full rounded-2xl bg-[#0f172a] shadow-2xl border border-white/10 overflow-hidden backface-hidden rotate-y-180">
             {/* Back Texture */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
             
             {/* Magnetic Strip */}
             <div className="w-full h-12 bg-black mt-6 relative z-10"></div>

             <div className="p-6 relative z-10 mt-2">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider mr-1">Código de Segurança</span>
                    <div className="flex items-center gap-3 w-full justify-end">
                        {/* Signature Area */}
                        <div className="h-10 bg-gray-700/50 flex-1 rounded opacity-50"></div>
                        
                        {/* CVV Box */}
                        <div className="w-16 h-10 bg-white text-gray-900 font-mono font-bold text-lg flex items-center justify-center rounded border-2 border-red-500/50">
                            {data.cvv || '***'}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center opacity-50">
                    <div className="flex gap-2">
                        <div className="w-12 h-6 bg-gray-600/30 rounded"></div>
                        <div className="w-8 h-6 bg-gray-600/30 rounded"></div>
                    </div>
                    <span className="text-[8px] text-gray-500 max-w-[150px] text-right leading-tight">
                        Este cartão é propriedade do DinaBank. O uso está sujeito ao contrato.
                    </span>
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default CreditCard;