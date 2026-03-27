
import React, { useMemo } from 'react';

export const LOGO_URL = "https://i.ibb.co/ymRw3mjX/kedu-logo-new.png";
export const PILOT_1_URL = "https://i.ibb.co/pvry1Mv3/comandante1.png";
export const PILOT_2_URL = "https://i.ibb.co/cS3kNj0p/comandante2.png";
export const PILOT_3_URL = "https://i.postimg.cc/bSJv955X/Ativo-3.png";
export const PILOT_4_URL = "https://iili.io/qQQVtgp.png";
export const ROCKET_URL = "https://iili.io/qQt6dNe.png";
export const SUCCESS_ICON_URL = "https://iili.io/qttLDoN.png";

export const RealisticRocket: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 200 }) => (
  <div className={className} style={{ width: size, height: 'auto' }}>
    <img 
      src={ROCKET_URL} 
      alt="Rocket" 
      className="w-full h-auto object-contain"
      referrerPolicy="no-referrer"
    />
  </div>
);

export const SpaceBackground: React.FC = () => {
  const starLayers = useMemo(() => {
    return [1, 2, 3].map(layer => ({
      layer,
      stars: [...Array(layer * 40)].map(() => ({
        top: Math.random() * 200 + '%',
        left: Math.random() * 100 + '%',
        opacity: Math.random() * 0.7 + 0.3,
        twinkle: Math.random() > 0.8,
      }))
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
      <style>{`
        @keyframes starMove {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes alertBlink {
          0%, 100% { background-color: transparent; }
          50% { background-color: rgba(239, 68, 68, 0.3); }
        }
        .star-layer {
          position: absolute;
          inset: -100% 0;
          display: flex;
          flex-wrap: wrap;
        }
        .animate-star-slow { animation: starMove 80s linear infinite; }
        .animate-star-medium { animation: starMove 40s linear infinite; }
        .animate-star-fast { animation: starMove 20s linear infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-alert-blink { animation: alertBlink 0.5s ease-in-out infinite; }
      `}</style>
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-[#0B0B1E] to-black"></div>
      
      {/* Star Layers */}
      {starLayers.map(({ layer, stars }) => (
        <div 
          key={layer} 
          className={`star-layer ${layer === 1 ? 'animate-star-slow' : layer === 2 ? 'animate-star-medium' : 'animate-star-fast'}`}
        >
          {stars.map((star, i) => (
            <div 
              key={i}
              className={`absolute rounded-full bg-white ${star.twinkle ? 'animate-twinkle' : ''}`}
              style={{
                width: (layer * 0.7) + 'px',
                height: (layer * 0.7) + 'px',
                top: star.top,
                left: star.left,
                opacity: star.opacity,
                boxShadow: layer === 3 ? '0 0 8px rgba(255,255,255,0.6)' : 'none',
                animationDelay: star.twinkle ? Math.random() * 5 + 's' : '0s'
              }}
            />
          ))}
        </div>
      ))}

      {/* Nebulas */}
      <div className="absolute top-0 left-0 w-full h-full bg-purple-600/5 blur-[150px] rounded-full mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-blue-600/5 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export const HeaderLogo: React.FC = () => (
  <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-700 w-full flex justify-center px-8">
    <img 
      src={LOGO_URL} 
      alt="Kedu Logo" 
      className="max-h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]" 
      onError={(e) => {
        (e.target as HTMLImageElement).src = "https://kedu.com.br/wp-content/uploads/2021/08/logo-kedu-horizontal-azul.png";
      }}
      referrerPolicy="no-referrer"
    />
  </div>
);

export const StaticHeaderLogo: React.FC = () => (
  <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-8">
    <img 
      src={LOGO_URL} 
      alt="Kedu Logo" 
      className="max-h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]" 
      onError={(e) => {
        (e.target as HTMLImageElement).src = "https://kedu.com.br/wp-content/uploads/2021/08/logo-kedu-horizontal-azul.png";
      }}
      referrerPolicy="no-referrer"
    />
  </div>
);

export const FooterLogo: React.FC = () => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full flex justify-center px-8">
    <img 
      src={LOGO_URL} 
      alt="Kedu Logo" 
      className="max-h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]" 
      onError={(e) => {
        (e.target as HTMLImageElement).src = "https://kedu.com.br/wp-content/uploads/2021/08/logo-kedu-horizontal-azul.png";
      }}
      referrerPolicy="no-referrer"
    />
  </div>
);

export const BoletoMeteorShower: React.FC = () => {
  const boletos = useMemo(() => {
    return [...Array(7)].map((_, i) => ({
      id: i,
      left: Math.random() * 120 - 10 + '%',
      delay: Math.random() * 5 + 's',
      duration: Math.random() * 1.5 + 1.5 + 's',
      size: Math.random() * 20 + 35 + 'px',
      opacity: Math.random() * 0.6 + 0.4,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes boletoFall {
          0% { transform: translateY(-150px) translateX(150px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) translateX(-110vh); opacity: 0; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1) translateY(-2px); }
        }
        @keyframes strobe {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.1; }
        }
        .animate-boleto { animation: boletoFall linear infinite; }
        .animate-flicker { animation: flicker 0.2s ease-in-out infinite; }
        .animate-strobe { animation: strobe 0.1s linear infinite; }
      `}</style>
      {boletos.map(b => (
        <div 
          key={b.id}
          className="absolute animate-boleto"
          style={{
            left: b.left,
            top: '-10%',
            width: b.size,
            height: 'auto',
            animationDelay: b.delay,
            animationDuration: b.duration,
            opacity: b.opacity,
          }}
        >
          {/* Flame Tail */}
          <div className="absolute -top-full left-1/2 -translate-x-1/2 w-full h-[200%] bg-gradient-to-b from-transparent via-orange-500 to-red-600 blur-md opacity-60 rounded-full animate-flicker origin-bottom" style={{ transform: 'rotate(180deg)' }}></div>
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[60%] h-full bg-gradient-to-b from-transparent via-yellow-300 to-orange-400 blur-sm opacity-80 rounded-full animate-flicker" style={{ animationDelay: '0.1s', transform: 'rotate(180deg)' }}></div>
          
          {/* Boleto SVG */}
          <div className="relative z-10" style={{ transform: 'rotate(-45deg)' }}>
            <svg viewBox="0 0 40 55" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
              <rect x="2" y="2" width="36" height="51" rx="2" fill="white" stroke="#EF4444" strokeWidth="2"/>
              <rect x="6" y="8" width="28" height="4" rx="1" fill="#EF4444" fillOpacity="0.3"/>
              <rect x="6" y="16" width="20" height="2" rx="0.5" fill="#EF4444" fillOpacity="0.2"/>
              <rect x="6" y="22" width="28" height="2" rx="0.5" fill="#EF4444" fillOpacity="0.2"/>
              <rect x="6" y="28" width="28" height="2" rx="0.5" fill="#EF4444" fillOpacity="0.2"/>
              <rect x="6" y="38" width="28" height="8" rx="1" fill="#EF4444" fillOpacity="0.1"/>
              <path d="M8 40V44M12 40V44M16 40V44M20 40V44M24 40V44M28 40V44M32 40V44" stroke="#EF4444" strokeWidth="1"/>
            </svg>
          </div>
          
          {/* Sparks */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full blur-[2px] animate-ping" style={{ animationDuration: '0.5s' }}></div>
        </div>
      ))}
    </div>
  );
};
