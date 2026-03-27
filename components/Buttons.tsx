
import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'alert' | 'success' | 'neutral';
  className?: string;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className = '',
  disabled = false
}) => {
  const baseStyles = "w-full min-h-[70px] md:min-h-[100px] text-xl md:text-2xl font-black uppercase tracking-widest rounded-2xl md:rounded-3xl transition-all duration-200 active:scale-95 flex items-center justify-center text-center px-6 md:px-10 shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-700 border-2 md:border-4 border-blue-400/30 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]",
    alert: "bg-gradient-to-r from-red-600 to-orange-700 border-2 md:border-4 border-red-400/30 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]",
    neutral: "bg-slate-800/80 backdrop-blur-md border-2 md:border-4 border-slate-600 text-slate-200 hover:bg-slate-700",
    success: "bg-gradient-to-r from-emerald-600 to-teal-700 border-2 md:border-4 border-emerald-400/30 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]",
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      <span className="relative z-10 flex items-center gap-2 md:gap-4">{children}</span>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 z-0"></div>
    </button>
  );
};
