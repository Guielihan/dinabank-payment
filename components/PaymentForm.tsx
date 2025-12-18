import React, { useState, useRef, useEffect } from 'react';
import { CreditCard as CardIcon, User, Calendar, Lock, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import CreditCard from './CreditCard';
import Input from './Input';
import { CardData, CardBrand } from '../types';

// --- ICONS ---
const VisaIcon = () => (
  <svg className="h-6 w-auto" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.78 15.6H16.63L18.6 3.44H21.75L19.78 15.6ZM34.23 3.65C33.62 3.42 32.54 3.25 31.18 3.25C27.7 3.25 25.26 5.09 25.23 7.82C25.21 9.84 27.02 10.97 28.38 11.64C29.78 12.33 30.25 12.76 30.25 13.37C30.25 14.33 29.11 14.77 28.06 14.77C27.08 14.77 26.54 14.5 26.09 14.3L25.61 14.09L25.08 17.07C25.96 17.47 27.58 17.82 29.25 17.83C32.96 17.83 35.4 16 35.42 13.16C35.43 11.28 34.31 10.27 32.06 9.18C31.06 8.68 30.45 8.35 30.45 7.63C30.45 6.94 31.2 6.64 31.95 6.64C32.91 6.64 33.72 6.88 34.19 7.09L34.23 3.65ZM43.91 3.44H41.05C40.15 3.44 39.4 3.96 39.06 4.77L33.37 17.89H36.68L37.34 16.08H41.56L41.95 17.89H44.89L43.91 3.44ZM38.25 13.62L39.93 9.07C40.16 8.37 40.24 8.08 40.24 8.08C40.2 8.16 40.29 8.24 40.41 8.84L40.91 13.62H38.25ZM12.78 3.44H9.36L6.5 10.98C6.34 11.68 6.2 12.01 6.07 11.53L5.23 7.27C4.78 5.12 2.87 3.55 0.5 3.44V3.44L0.86 5.16C2.64 5.56 3.68 6.56 4.24 8.69L6.5 17.89H9.95L15.93 3.44H12.78Z" fill="#3b82f6"/>
  </svg>
);
const MastercardIcon = () => (
  <svg className="h-6 w-auto" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="10" r="10" fill="#EB001B"/>
    <circle cx="21" cy="10" r="10" fill="#F79E1B"/>
    <path d="M16 3.5A9.95 9.95 0 0 0 11 10c0 2.57.97 4.92 2.56 6.67A9.96 9.96 0 0 0 21 10a9.96 9.96 0 0 0-5-6.5z" fill="#FF5F00"/>
  </svg>
);
const AmexIcon = () => (
  <div className="h-5 w-8 bg-[#006fcf] rounded flex items-center justify-center">
      <span className="text-[6px] text-white font-bold leading-none text-center">AMERICAN<br/>EXPRESS</span>
  </div>
);
const EloIcon = () => (
  <div className="h-6 w-6 bg-black rounded-full flex items-center justify-center relative border border-white/20">
      <span className="text-[8px] text-white font-bold z-10">elo</span>
  </div>
);
const HipercardIcon = () => (
  <div className="h-5 px-1 bg-[#b91c1c] rounded skew-x-[-10deg] flex items-center">
    <span className="text-white text-[9px] font-bold skew-x-[10deg]">Hiper</span>
  </div>
);

// --- HELPER COMPONENTS ---

const BrandBadge: React.FC<{ active: boolean; children: React.ReactNode; label: string }> = ({ active, children, label }) => (
    <div className={`flex flex-col items-center gap-1 transition-opacity duration-300 ${active ? 'opacity-100 grayscale-0 scale-105' : 'opacity-30 grayscale'}`}>
        {children}
    </div>
);

// Custom CustomMonthPicker
interface MonthPickerProps {
    value: string;
    onChange: (val: string) => void;
    label: string;
    className?: string;
    isValid?: boolean;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ value, onChange, label, className, isValid }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewYear, setViewYear] = useState(new Date().getFullYear());
    const pickerRef = useRef<HTMLDivElement>(null);

    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    // Parse current value
    const [selectedYearStr, selectedMonthStr] = value ? value.split('-') : [];
    const selectedYear = selectedYearStr ? parseInt(selectedYearStr) : null;
    const selectedMonth = selectedMonthStr ? parseInt(selectedMonthStr) : null;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (monthIndex: number) => {
        const month = (monthIndex + 1).toString().padStart(2, '0');
        onChange(`${viewYear}-${month}`);
        setIsOpen(false);
    };

    const displayValue = value ? (() => {
        const [y, m] = value.split('-');
        return `${months[parseInt(m) - 1]} / ${y}`;
    })() : '';

    return (
        <div className={`flex flex-col gap-2 ${className}`} ref={pickerRef}>
             <label className="text-sm font-medium text-gray-300 pl-1">
                {label}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full bg-[#1e293b] border ${
                        isValid === false ? 'border-red-500/50' : (isValid && value) ? 'border-green-500/50' : 'border-gray-700'
                      } rounded-xl py-3.5 pl-12 pr-4 text-left text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 flex items-center shadow-sm h-[52px]`}
                >
                    <div className="absolute left-4 text-gray-400 pointer-events-none">
                        <Calendar size={20} />
                    </div>
                    {displayValue || <span className="text-gray-500">MM / AAAA</span>}
                </button>

                {isOpen && (
                    <div className="absolute bottom-full mb-2 left-0 w-full bg-[#1e293b] border border-gray-700 rounded-xl shadow-2xl z-50 p-4 animate-fade-in">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <button 
                                onClick={(e) => { e.preventDefault(); setViewYear(y => y - 1); }}
                                className="p-1 hover:bg-white/10 rounded-full text-gray-300"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="font-bold text-white text-lg">{viewYear}</span>
                            <button 
                                onClick={(e) => { e.preventDefault(); setViewYear(y => y + 1); }}
                                className="p-1 hover:bg-white/10 rounded-full text-gray-300"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        
                        {/* Grid */}
                        <div className="grid grid-cols-4 gap-2">
                            {months.map((m, idx) => {
                                const isSelected = selectedYear === viewYear && selectedMonth === (idx + 1);
                                const isPast = viewYear < new Date().getFullYear() || (viewYear === new Date().getFullYear() && idx < new Date().getMonth());
                                
                                return (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.preventDefault(); !isPast && handleSelect(idx); }}
                                        disabled={isPast}
                                        className={`
                                            py-2 text-sm rounded-lg font-medium transition-colors
                                            ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                                            ${isPast ? 'opacity-30 cursor-not-allowed' : ''}
                                        `}
                                    >
                                        {m}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState<CardData>({
    cardNumber: '',
    holderName: '',
    expiryDate: '',
    cvv: ''
  });

  const [cardBrand, setCardBrand] = useState<CardBrand>('unknown');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const [validation, setValidation] = useState({
    cardNumber: false,
    holderName: false,
    expiryDate: false,
    cvv: false
  });

  const detectBrand = (number: string): CardBrand => {
    const clean = number.replace(/\D/g, '');
    if (clean.startsWith('4')) return 'visa';
    if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return 'mastercard';
    if (/^3[47]/.test(clean)) return 'amex';
    if (/^(4011|4389|4514|4576|5041|5067|5090|6277|6362|6363)/.test(clean)) return 'elo';
    if (/^6062/.test(clean)) return 'hipercard';
    return 'unknown';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 16) value = value.slice(0, 16); 

    const currentBrand = detectBrand(value);
    setCardBrand(currentBrand);

    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    setFormData(prev => ({ ...prev, cardNumber: formatted }));
    const isValidLength = currentBrand === 'amex' ? value.length === 15 : value.length === 16;
    setValidation(prev => ({ ...prev, cardNumber: isValidLength }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validChars = /^[a-zA-Z\s\.]*$/;
    if (validChars.test(value)) {
        setFormData(prev => ({ ...prev, holderName: value }));
        const parts = value.trim().split(/\s+/);
        const isValid = parts.length >= 2 && parts.every(p => p.length >= 2);
        setValidation(prev => ({ ...prev, holderName: isValid }));
    }
  };

  const handleExpiryChange = (value: string) => {
    setFormData(prev => ({ ...prev, expiryDate: value }));
    if (value) {
        const [year, month] = value.split('-').map(Number);
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;
        const isValid = year > currentYear || (year === currentYear && month >= currentMonth);
        setValidation(prev => ({ ...prev, expiryDate: isValid }));
    } else {
        setValidation(prev => ({ ...prev, expiryDate: false }));
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength = cardBrand === 'amex' ? 4 : 3;
    const value = e.target.value.replace(/\D/g, '').slice(0, maxLength);
    setFormData(prev => ({ ...prev, cvv: value }));
    setValidation(prev => ({ ...prev, cvv: value.length === maxLength }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isFormValid = Object.values(validation).every(Boolean);
    if (isFormValid) {
      setTimeout(() => {
        setIsSuccess(true);
      }, 500);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto h-[600px] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20 animate-bounce-slow">
          <CheckCircle2 size={48} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Pagamento Realizado!</h2>
        <p className="text-gray-400 mb-8 max-w-xs">
          Seu pagamento de <span className="text-white font-semibold">R$ 125,00</span> foi processado com sucesso.
        </p>
        <button 
          onClick={() => {
            setIsSuccess(false);
            setFormData({ cardNumber: '', holderName: '', expiryDate: '', cvv: '' });
            setValidation({ cardNumber: false, holderName: false, expiryDate: false, cvv: false });
            setCardBrand('unknown');
            setIsCardFlipped(false);
          }}
          className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-xl transition-colors w-full max-w-xs"
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-10">
      
      {/* Sticky Visualization Section */}
      <div className="sticky top-0 z-20 py-6 bg-gray-900/95 backdrop-blur-sm transition-all duration-300 flex justify-center">
        {/* Fixed width wrapper to prevent flex collapse */}
        <div className="pt-2 pb-4 w-full max-w-[380px]">
            <CreditCard data={formData} cardBrand={cardBrand} isFlipped={isCardFlipped} />
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 text-xs text-blue-400/80 bg-blue-500/10 py-1.5 px-4 rounded-full mx-auto w-fit border border-blue-500/20 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-medium tracking-wide">AMBIENTE SEGURO 256-BIT SSL</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-2">
        
        <div>
            <Input
              label="Número do Cartão"
              placeholder="0000 0000 0000 0000"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              icon={CardIcon}
              isValid={validation.cardNumber}
              maxLength={19} 
              type="tel"
            />
            {/* Supported Brands Visual Indicator */}
            <div className="flex gap-4 mt-3 px-1 justify-start overflow-x-auto no-scrollbar pb-1">
                <BrandBadge active={cardBrand === 'visa'} label="Visa"><VisaIcon /></BrandBadge>
                <BrandBadge active={cardBrand === 'mastercard'} label="Master"><MastercardIcon /></BrandBadge>
                <BrandBadge active={cardBrand === 'elo'} label="Elo"><EloIcon /></BrandBadge>
                <BrandBadge active={cardBrand === 'amex'} label="Amex"><AmexIcon /></BrandBadge>
                <BrandBadge active={cardBrand === 'hipercard'} label="Hiper"><HipercardIcon /></BrandBadge>
            </div>
        </div>

        <Input
          label="Nome do Titular"
          placeholder="NOME E SOBRENOME"
          value={formData.holderName}
          onChange={handleNameChange}
          icon={User}
          isValid={validation.holderName}
          style={{ textTransform: 'uppercase' }}
        />

        <div className="flex gap-4 items-start">
          <MonthPicker 
             label="Validade"
             value={formData.expiryDate}
             onChange={handleExpiryChange}
             className="flex-1"
             isValid={validation.expiryDate}
          />

          <div className="w-1/3 relative group">
            <Input
                label="CVV"
                type="password"
                placeholder={cardBrand === 'amex' ? "••••" : "•••"}
                value={formData.cvv}
                onChange={handleCvvChange}
                onFocus={() => setIsCardFlipped(true)}
                onBlur={() => setIsCardFlipped(false)}
                icon={Lock}
                className="w-full"
                maxLength={cardBrand === 'amex' ? 4 : 3}
                isValid={validation.cvv}
            />
            {/* Tooltip Icon & Popup */}
            <div className="absolute top-0 right-0">
                <div className="relative group/tooltip">
                    <HelpCircle className="w-4 h-4 text-gray-400 hover:text-white cursor-help transition-colors" />
                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-gray-800 text-xs text-gray-200 p-3 rounded-lg shadow-xl border border-gray-700 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                        <p className="mb-1 font-bold text-white">Código de Segurança</p>
                        Geralmente 3 dígitos no verso do cartão. Para Amex, são 4 dígitos na frente.
                        <div className="absolute bottom-[-4px] right-1 w-2 h-2 bg-gray-800 border-b border-r border-gray-700 transform rotate-45"></div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Amount Summary */}
        <div className="flex justify-between items-center py-5 border-t border-white/10 mt-8">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Total a pagar</span>
            <span className="text-xs text-gray-500">Incluindo taxas</span>
          </div>
          <span className="text-3xl font-bold text-white tracking-tight">R$ 125,00</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!Object.values(validation).every(Boolean)}
          className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group relative overflow-hidden
            ${Object.values(validation).every(Boolean) 
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25 cursor-pointer transform hover:-translate-y-0.5' 
              : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-80'}`}
        >
          <span className="relative z-10">Pagar Agora</span>
          {Object.values(validation).every(Boolean) && (
            <ArrowRight className="group-hover:translate-x-1 transition-transform relative z-10" />
          )}
        </button>

      </form>
    </div>
  );
};

export default PaymentForm;