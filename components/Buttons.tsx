
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
  const baseStyles = "w-full min-h-[120px] text-3xl font-black uppercase tracking-widest rounded-[2rem] transition-all duration-200 active:scale-95 flex items-center justify-center text-center px-10 shadow-2xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-700 border-4 border-blue-400/30 text-white shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] font-nasa",
    alert: "bg-gradient-to-r from-red-600 to-orange-700 border-4 border-red-400/30 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] font-nasa",
    neutral: "bg-slate-800/80 backdrop-blur-md border-4 border-slate-600 text-slate-200 hover:bg-slate-700 font-nasa",
    success: "bg-gradient-to-r from-emerald-600 to-teal-700 border-4 border-emerald-400/30 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] font-nasa",
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      <span className="relative z-10 flex items-center gap-2 md:gap-4 whitespace-nowrap">{children}</span>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 z-0"></div>
    </button>
  );
};
