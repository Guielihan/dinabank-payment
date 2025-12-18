import React, { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  rightIcon?: React.ReactNode;
  isValid?: boolean;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  icon: Icon, 
  rightIcon, 
  className = '', 
  isValid,
  ...props 
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-300 pl-1">
        {label}
      </label>
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-gray-400 pointer-events-none">
            <Icon size={20} />
          </div>
        )}
        <input
          className={`w-full bg-[#1e293b] border ${
            isValid ? 'border-green-500/50' : 'border-gray-700'
          } rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm`}
          autoComplete="off"
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;