
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Wifi, 
  Battery, 
  Zap, 
  User, 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Loader2 
} from 'lucide-react';
import { SpaceBackground, HeaderLogo, StaticHeaderLogo, FooterLogo, BoletoMeteorShower, RealisticRocket, LOGO_URL, PILOT_1_URL, PILOT_2_URL, PILOT_3_URL, PILOT_4_URL, PILOT_5_URL, CABIN_IMAGE_URL, FINAL_FOOTER_URL } from './components/Visuals';
import { ActionButton } from './components/Buttons';
import { PilotType } from './types';
import { motion } from 'motion/react';

const App: React.FC = () => {
  const [stage, setStage] = useState(0);
  const [nextStageAfterCockpit, setNextStageAfterCockpit] = useState(4);
  const [pilot, setPilot] = useState<PilotType>(null);
  const [showError, setShowError] = useState(false);
  const [containerScale, setContainerScale] = useState(1);

  // Hook para calcular a escala e manter proporção perfeita 53:94
  useEffect(() => {
    const updateScale = () => {
      const container = document.getElementById('main-container');
      if (container) {
        // Base de design: 1080px de largura
        const scale = container.offsetWidth / 1080;
        setContainerScale(scale);
      }
    };

    window.addEventListener('resize', updateScale);
    updateScale();
    // Pequeno delay para garantir que o layout renderizou
    const timeout = setTimeout(updateScale, 100);

    return () => {
      window.removeEventListener('resize', updateScale);
      clearTimeout(timeout);
    };
  }, []);

  const [introText, setIntroText] = useState(`Toda escola que cresce 
passa por grandes desafios. 
Agora é a sua vez
de assumir o comando.

Sua missão de crescimento 
começa agora.`);
  const [outroText, setOutroText] = useState(`Pilotar a gestão escolar
não é uma missão simples.

Mas com parceiros que
oferecem estabilidade no
fluxo de caixa, crescimento
de alunos e expansão nos
investimentos, tudo fica
mais leve e com resultados
mais expressivos.`);

  useEffect(() => {
    if (stage === 3) {
      const timer = setTimeout(() => {
        setNextStageAfterCockpit(4);
        setStage(31);
      }, 4000);
      return () => clearTimeout(timer);
    }
    if (stage === 31) {
      const timer = setTimeout(() => setStage(nextStageAfterCockpit), 3000);
      return () => clearTimeout(timer);
    }
    if (stage === 15) {
      const timer = setTimeout(() => {
        setNextStageAfterCockpit(7);
        setStage(31);
      }, 4000);
      return () => clearTimeout(timer);
    }
    if (stage === 16) {
      const timer = setTimeout(() => {
        setNextStageAfterCockpit(10);
        setStage(31);
      }, 4000);
      return () => clearTimeout(timer);
    }
    if (stage === 17) {
      const timer = setTimeout(() => setStage(13), 4000);
      return () => clearTimeout(timer);
    }
  }, [stage, nextStageAfterCockpit]);

  const handleCoverStart = () => setStage(1);
  const handleStart = () => setStage(2);

  useEffect(() => {
    // Preload critical images for final stages to ensure they load fast
    const imagesToPreload = [
      CABIN_IMAGE_URL, 
      FINAL_FOOTER_URL, 
      LOGO_URL,
      PILOT_1_URL,
      PILOT_2_URL,
      PILOT_3_URL,
      PILOT_4_URL,
      PILOT_5_URL
    ];
    imagesToPreload.forEach((url) => {
      const img = new Image();
      img.src = url;
      // Force decoding in background
      img.decode?.().catch(() => {});
    });
  }, []);

  // Preloader component to ensure images are in DOM but hidden
  const ImagePreloader = () => (
    <div 
      className="fixed -left-[9999px] -top-[9999px] opacity-0 pointer-events-none invisible" 
      aria-hidden="true"
    >
      <img src={CABIN_IMAGE_URL} loading="eager" fetchPriority="high" decoding="sync" alt="preload" />
      <img src={FINAL_FOOTER_URL} loading="eager" fetchPriority="high" decoding="sync" alt="preload" />
      <img src={LOGO_URL} loading="eager" fetchPriority="high" alt="preload" />
    </div>
  );
  const handleSelectPilot = (p: string) => {
    setPilot(p);
    setTimeout(() => setStage(3), 600);
  };
  const handleDecision = (isCorrect: boolean, nextStageId: number) => {
    if (isCorrect) {
      setStage(nextStageId);
    } else {
      setShowError(true);
    }
  };

  const getPilotUrl = () => {
    switch(pilot) {
      case 'alpha': return PILOT_1_URL;
      case 'beta': return PILOT_2_URL;
      case 'gamma': return PILOT_3_URL;
      case 'delta': return PILOT_4_URL;
      case 'epsilon': return PILOT_5_URL;
      default: return PILOT_1_URL;
    }
  };

  const getPilotName = () => {
    switch(pilot) {
      case 'alpha': return 'Comandante Paulo Freire';
      case 'beta': return 'Comandante Rachel de Queiroz';
      case 'gamma': return 'Comandante José Saramago';
      case 'delta': return 'Comandante Darcy Ribeiro';
      case 'epsilon': return 'Comandante Anísio Teixeira';
      default: return 'Comandante';
    }
  };

  const PilotAvatar = () => (
    <div className="flex flex-col items-center gap-6 mb-12 w-full">
      <div className="w-40 h-40 rounded-full overflow-hidden border-[6px] border-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.6)]">
        <img 
          src={getPilotUrl()} 
          alt="Pilot" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="text-center">
        <p className="text-white font-black uppercase text-3xl tracking-tighter">{getPilotName()}</p>
      </div>
    </div>
  );

  const ErrorOverlay = () => (
    <div className="absolute inset-0 z-[100] bg-red-950/90 backdrop-blur-md flex flex-col items-center justify-center p-12 animate-in fade-in zoom-in duration-300">
      <style>{`
        @keyframes errorGlitch {
          0% { transform: translate(0); clip-path: inset(0 0 0 0); }
          20% { transform: translate(-4px, 2px); clip-path: inset(10% 0 20% 0); }
          40% { transform: translate(4px, -2px); clip-path: inset(30% 0 10% 0); }
          60% { transform: translate(-2px, 4px); clip-path: inset(20% 0 30% 0); }
          80% { transform: translate(2px, -4px); clip-path: inset(40% 0 5% 0); }
          100% { transform: translate(0); clip-path: inset(0 0 0 0); }
        }
        .animate-error-glitch { animation: errorGlitch 0.2s infinite; opacity: 0.3; }
      `}</style>
      <div className="absolute inset-0 bg-red-600/10 animate-error-glitch pointer-events-none"></div>
      <div className="bg-black/40 p-12 rounded-full mb-10 border-8 border-red-500 animate-bounce relative z-10">
        <AlertTriangle size={150} className="text-red-500" />
      </div>
      <h2 className="text-7xl md:text-9xl font-black text-white mb-6 text-center uppercase tracking-tighter drop-shadow-2xl relative z-10 leading-none">Impacto!</h2>
      <p className="text-[32px] md:text-4xl text-red-100 text-center mb-16 max-w-[800px] leading-relaxed relative z-10 whitespace-pre-line">
        Essa decisão pode 
comprometer o fluxo da missão.
Ajuste a rota, comandante.
      </p>
      <div className="w-full max-w-xl relative z-10">
        <ActionButton onClick={() => setShowError(false)} variant="primary" className="min-h-[140px] text-xl px-12">
          <Zap className="mr-6" size={40} /> Tentar Novamente
        </ActionButton>
      </div>
    </div>
  );

  const renderCover = () => (
    <div className="flex flex-col items-center justify-center h-full py-12 px-6 text-center relative z-10 overflow-y-auto w-full">
      <div className="z-10 flex flex-col items-center w-full h-full max-w-[950px] border-2 border-blue-500/30 rounded-[3rem] bg-blue-950/20 backdrop-blur-md shadow-[0_0_60px_rgba(59,130,246,0.2)] p-12 justify-center">
        <div className="mb-12 animate-in zoom-in duration-1000 -mt-20">
          <img 
            src={LOGO_URL} 
            alt="Kedu Logo" 
            className="w-[650px] h-[650px] object-contain drop-shadow-[0_0_80px_rgba(59,130,246,0.6)]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="mb-20">
          <p className="text-[48px] text-white font-nasa tracking-wider leading-relaxed uppercase text-center font-bold">
            Descubra como<br/>
            levar sua escola<br/>
            <span className="text-blue-400 text-[46px] font-bold">para o próximo nível.</span>
          </p>
        </div>

        <div className="w-full max-w-[700px]">
          <ActionButton onClick={handleCoverStart} variant="primary" className="min-h-[150px] text-4xl shadow-[0_0_50px_rgba(59,130,246,0.5)]">
            INICIAR MISSÃO
          </ActionButton>
        </div>
      </div>
    </div>
  );

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-between h-full py-20 px-6 text-center relative z-10 overflow-y-auto w-full">
      <div className="w-full flex flex-col items-center gap-10">
        <div className="animate-in zoom-in duration-1000 w-full flex justify-center h-[200px]">
          <img 
            src={LOGO_URL} 
            alt="Kedu Logo" 
            className="max-w-[700px] h-auto object-contain drop-shadow-[0_0_60px_rgba(59,130,246,0.4)]"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-[100px] font-black text-white uppercase tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] leading-tight mb-6 font-nasa text-center">
          Base Espacial<br/><span className="text-[140px] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-nasa">KEDU</span>
        </h1>
      </div>

      <div className="bg-slate-900/70 backdrop-blur-md p-16 rounded-[3rem] border-4 border-slate-700 shadow-2xl my-12 w-full max-w-[850px]">
        <p className="text-[48px] text-slate-100 font-normal leading-relaxed animate-in fade-in duration-700 font-sans whitespace-pre-line text-center">{introText}</p>
      </div>

      <div className="w-full max-w-[700px] mt-12 pb-20">
        <ActionButton 
          onClick={handleStart} 
          variant="primary" 
          className="min-h-[150px] text-4xl shadow-[0_0_50px_rgba(59,130,246,0.5)]"
        >
          INICIAR MISSÃO
        </ActionButton>
      </div>
    </div>
  );

  const renderPilotSelection = () => {
    const pilots = [
      { id: 'alpha', name: 'Comandante Paulo Freire', url: PILOT_1_URL },
      { id: 'beta', name: 'Comandante Rachel de Queiroz', url: PILOT_2_URL },
      { id: 'gamma', name: 'Comandante José Saramago', url: PILOT_3_URL },
      { id: 'delta', name: 'Comandante Darcy Ribeiro', url: PILOT_4_URL },
      { id: 'epsilon', name: 'Comandante Anísio Teixeira', url: PILOT_5_URL },
    ];

    return (
      <div className="flex flex-col items-center h-full py-8 px-6 relative z-10 overflow-y-auto">
        <div className="mt-12 mb-16 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-widest font-nasa leading-tight">O Piloto</h2>
          <p className="text-[42px] text-[#5da4f5] font-nasa uppercase tracking-widest leading-normal font-bold">Quem assume o comando?</p>
        </div>
        <div className="flex-1 w-full flex flex-col gap-10 justify-start mt-20 max-w-[850px] pb-32">
          {pilots.map((p) => (
            <button 
              key={p.id} 
              onClick={() => handleSelectPilot(p.id)}
              className={`relative rounded-[2rem] border-4 transition-all duration-300 flex items-center gap-10 p-8
                ${pilot === p.id ? 'bg-blue-900/80 border-blue-400 shadow-[0_0_50px_rgba(59,130,246,0.4)] scale-[1.02]' : 'bg-slate-800/40 border-slate-700 opacity-80'}`}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-400/30 bg-slate-700 flex-shrink-0">
                <img 
                  src={p.url} 
                  alt={p.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left flex-1">
                <span className="text-2xl md:text-4xl font-black text-white uppercase tracking-wider leading-tight">{p.name}</span>
                <p className="text-blue-300 font-bold uppercase text-sm mt-2">Status: Pronto</p>
              </div>
              {pilot === p.id && <CheckCircle className="text-blue-400" size={40} />}
            </button>
          ))}
        </div>
        <FooterLogo />
      </div>
    );
  };

  const renderLaunch = (title = "Decolando") => (
    <div className="flex flex-col items-center justify-center h-full relative z-10 overflow-hidden px-10">
      <div className="absolute inset-0 flex items-end justify-center pb-40 animate-rocket-launch">
        <div className="relative flex flex-col items-center">
          <RealisticRocket size={400} className="drop-shadow-[0_0_80px_rgba(255,255,255,0.4)]" />
        </div>
      </div>
      <div className="relative z-20 text-center mt-[-20%]">
        <h2 className="text-6xl md:text-8xl font-black text-white mb-8 animate-pulse uppercase tracking-widest font-nasa">{title}</h2>
        <p className="text-3xl text-blue-200 uppercase font-bold tracking-tighter opacity-80">Protocolo Ativo...</p>
      </div>
      <FooterLogo />
    </div>
  );

  const renderCockpit = () => (
    <div className="flex flex-col items-center justify-center h-full relative z-10 overflow-hidden bg-black">
      <style>{`
        @keyframes cockpit-vibration {
          0% { transform: translate(0, 0) scale(1.1); }
          5% { transform: translate(-2px, 2px) scale(1.1); }
          10% { transform: translate(2px, -2px) scale(1.1); }
          15% { transform: translate(-2px, -2px) scale(1.1); }
          20% { transform: translate(2px, 2px) scale(1.1); }
          25% { transform: translate(0, 0) scale(1.1); }
          100% { transform: translate(0, 0) scale(1.1); }
        }
        .animate-cockpit {
          animation: cockpit-vibration 0.15s infinite;
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.1), transparent);
          animation: scanline 4s linear infinite;
        }
      `}</style>
      <div className="absolute inset-0 w-full h-full animate-cockpit overflow-hidden">
        <img 
          src="https://iili.io/BPKZ4Bj.png" 
          alt="Cockpit View" 
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>
        <div className="scanline"></div>
      </div>
      
      <div className="relative z-20 text-center px-10">
        <div className="bg-black/60 backdrop-blur-md p-10 rounded-[2rem] border-4 border-blue-400/50 mb-10 animate-pulse shadow-[0_0_40px_rgba(59,130,246,0.3)]">
          <p className="text-blue-400 font-nasa text-2xl tracking-[0.3em] uppercase font-bold">Protocolo de Aceleração Ativo</p>
          <div className="mt-6 h-3 w-full bg-blue-900/50 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 animate-[progress_3s_linear_infinite]" style={{width: '60%'}}></div>
          </div>
        </div>
      </div>
      <FooterLogo />
    </div>
  );

  const renderAlert = (icon: React.ReactNode, title: string, text: string, next: number) => (
    <div className="flex flex-col items-center justify-center h-full py-16 px-10 relative z-10 overflow-y-auto w-full">
      <style>{`
        @keyframes redAlert {
          0%, 100% { background-color: rgba(220, 38, 38, 0); }
          50% { background-color: rgba(220, 38, 38, 0.3); }
        }
        .animate-red-alert { animation: redAlert 0.8s ease-in-out infinite; }
      `}</style>
      <div className="absolute inset-0 animate-red-alert pointer-events-none z-0"></div>
      {stage === 4 && <BoletoMeteorShower />}
      <div className="z-10 flex flex-col items-center text-center mt-10 w-full max-w-[900px] pb-32">
        <PilotAvatar />
        <div className="mb-14 relative">
           <div className="absolute inset-0 bg-red-500 blur-[60px] opacity-30 animate-ping"></div>
           {React.cloneElement(icon as React.ReactElement, { size: 140 })}
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-red-500 mb-14 uppercase tracking-tighter leading-none font-nasa">{title}</h2>
        <div className="bg-slate-900/90 border-4 border-red-500/50 p-10 md:p-14 rounded-[3rem] mb-12 shadow-2xl text-center">
          <p className="text-3xl md:text-5xl text-white leading-relaxed font-medium whitespace-pre-line">{text}</p>
        </div>
        <div className="w-full max-w-md mt-16">
          <ActionButton onClick={() => setStage(next)} variant="alert" className="min-h-[120px] text-3xl">ACESSAR PAINEL</ActionButton>
        </div>
      </div>
      <FooterLogo />
    </div>
  );

  const renderDecision = (question: string, options: string[], correctIndex: number, next: number) => (
    <div className="flex flex-col h-full py-16 px-10 relative z-10 overflow-y-auto">
      <div className="mt-8 relative z-10 flex flex-col items-center">
        <PilotAvatar />
      </div>
      <div className="mb-14 relative z-10 flex flex-col items-center">
        <h2 className="text-3xl font-black text-blue-400 uppercase tracking-widest font-nasa">Controle</h2>
        <div className="h-2 w-24 bg-blue-500 rounded-full mt-4"></div>
      </div>
      <div className="mb-16 text-center">
        <h3 className="text-4xl md:text-6xl font-black text-white leading-relaxed whitespace-pre-line">{question}</h3>
      </div>
      <div className="flex flex-col gap-10 w-full max-w-[900px] mx-auto pb-32 mt-16">
        {options.map((opt, idx) => (
          <button 
            key={idx} 
            onClick={() => handleDecision(idx === correctIndex, next)}
            className="w-full p-8 md:p-10 rounded-[2.5rem] bg-slate-800/80 border-4 border-slate-600 hover:border-blue-400 text-left transition-all active:scale-95 group"
          >
            <div className="flex items-start gap-8">
              <div className="mt-1 w-12 h-12 rounded-full border-4 border-slate-500 flex-shrink-0 flex items-center justify-center text-xl text-white font-black group-hover:bg-blue-500/20">{idx + 1}</div>
              <span className="text-2xl md:text-4xl text-slate-100 font-bold leading-relaxed">{opt}</span>
            </div>
          </button>
        ))}
      </div>
      <FooterLogo />
    </div>
  );

  const renderSuccess = (icon: React.ReactNode, title: string, text: string, next: number, isFinal = false) => (
    <div className="flex flex-col items-center justify-center h-full py-16 px-10 relative z-10 overflow-y-auto w-full border-[12px] border-emerald-500/30 animate-[successPulse_2s_infinite]">
      <style>{`
        @keyframes successPulse {
          0%, 100% { border-color: rgba(16, 185, 129, 0.2); box-shadow: inset 0 0 40px rgba(16, 185, 129, 0.1); }
          50% { border-color: rgba(16, 185, 129, 0.5); box-shadow: inset 0 0 80px rgba(16, 185, 129, 0.3); }
        }
      `}</style>
      <div className="z-10 flex flex-col items-center text-center mt-10 w-full max-w-[900px] pb-32">
        <PilotAvatar />
        <div className="mb-14 p-10 bg-emerald-500/20 rounded-full shadow-2xl">
           {React.cloneElement(icon as React.ReactElement, { size: 140 })}
        </div>
        <h2 className="text-5xl font-black text-emerald-400 mb-14 uppercase tracking-widest leading-none font-nasa">{title}</h2>
        <p className="text-3xl md:text-5xl text-white leading-relaxed mb-14 mt-10 font-medium whitespace-pre-line">{text}</p>
        <div className="w-full max-w-md mt-16">
          <ActionButton onClick={() => setStage(next)} variant="success" className="min-h-[120px] text-3xl">
            {isFinal ? "CONCLUIR" : "PRÓXIMO"} <ArrowRight className="ml-4" size={40} />
          </ActionButton>
        </div>
      </div>
      <FooterLogo />
    </div>
  );

  const renderFinal = () => {
    // Componente de fogos de artifício expandido
    const Fireworks = () => {
      return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(8)].map((_, i) => {
            const randomTop = Math.random() * 70 + 10;
            const randomLeft = Math.random() * 100;
            const colors = ['rgba(96, 165, 250, 0.5)', 'rgba(52, 211, 153, 0.5)', 'rgba(244, 114, 182, 0.5)', 'rgba(251, 191, 36, 0.5)'];
            const color = colors[i % colors.length];
            
            return (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1.4],
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeOut"
                }}
                style={{
                  position: 'absolute',
                  top: `${randomTop}%`,
                  left: `${randomLeft}%`,
                  width: '10px',
                  height: '10px'
                }}
              >
                {[...Array(12)].map((_, j) => (
                  <motion.div
                    key={j}
                    style={{
                      position: 'absolute',
                      width: '3px',
                      height: '20px',
                      backgroundColor: color,
                      borderRadius: '2px',
                      transformOrigin: 'bottom center',
                      transform: `rotate(${j * (360/12)}deg) translateY(-20px)`
                    }}
                  />
                ))}
              </motion.div>
            );
          })}
        </div>
      );
    };

    return (
      <div className="flex flex-col items-center h-full pt-48 text-center relative z-10 overflow-y-auto overflow-x-hidden w-full">
        <Fireworks />
        
        <div className="absolute top-10 z-20">
           <StaticHeaderLogo />
        </div>

        <div className="w-full max-w-[950px] z-20 px-10 mt-24 relative mb-40">
          <h1 className="text-7xl md:text-9xl font-black text-white uppercase mb-12 tracking-tighter leading-none font-nasa">Missão Cumprida!</h1>
          <div className="bg-white/10 backdrop-blur-md p-14 rounded-[3.5rem] border-4 border-white/20 shadow-2xl mb-12">
            <div className="font-black text-blue-300 text-4xl md:text-5xl uppercase tracking-widest font-nasa mb-10">Escola em Órbita</div>
            <p className="text-3xl md:text-5xl text-slate-100 font-medium leading-relaxed whitespace-pre-line">{outroText}</p>
          </div>
          <div className="w-full max-w-md mx-auto mt-12 px-6">
            <ActionButton onClick={() => setStage(14)} variant="primary" className="min-h-[120px] text-3xl">FINALIZAR</ActionButton>
          </div>
        </div>

        {/* Imagem de rodapé fixa no fundo */}
        <div className="fixed bottom-0 left-0 w-full z-10 pointer-events-none">
          <img
            src={FINAL_FOOTER_URL}
            alt="Victory Footer"
            className="w-full h-auto object-cover object-top"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  };

  const renderCabin = () => (
    <div className="flex flex-col items-center justify-center h-full py-20 px-10 relative z-10 overflow-y-auto bg-indigo-950/40 w-full">
       <div className="z-10 text-center mt-10 w-full max-w-[950px] pb-32">
         <div className="mb-12 flex justify-center">
           <img 
             src={CABIN_IMAGE_URL} 
             alt="Cabin" 
             className="w-full max-w-[800px] h-auto object-contain rounded-[2rem] shadow-2xl"
             loading="eager"
             referrerPolicy="no-referrer"
           />
         </div>
         <h2 className="text-4xl md:text-5xl font-black text-blue-500 mb-12 uppercase tracking-tighter font-nasa whitespace-nowrap leading-tight">Cabine de fotos</h2>
         <p className="text-3xl md:text-5xl text-slate-200 mb-20 leading-relaxed whitespace-pre-line">Sua escola agora brilha em{"\n"}uma nova galáxia de resultados.</p>
         <div className="w-full max-w-md mx-auto mt-20">
            <ActionButton onClick={() => window.location.reload()} variant="primary" className="min-h-[120px] text-3xl">NOVA MISSÃO</ActionButton>
         </div>
       </div>
       <FooterLogo />
    </div>
  );

  const renderVictoryLaunch = (title: string) => (
    <div className="flex flex-col items-center justify-center h-full relative z-10 overflow-hidden px-6 bg-blue-400/30 backdrop-blur-md">
      <style>{`
        @keyframes celebrate {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(1); opacity: 0; }
        }
        .celebration-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: celebrate 2s ease-out infinite;
        }
      `}</style>
      
      {/* Particles */}
      {[...Array(30)].map((_, i) => {
        const tx = (Math.random() - 0.5) * 400;
        const ty = (Math.random() - 0.5) * 400;
        return (
          <div 
            key={i}
            className="celebration-particle"
            style={{
              top: '50%',
              left: '50%',
              '--tw-translate-x': `${tx}px`,
              '--tw-translate-y': `${ty}px`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#34d399' : '#fbbf24'
            } as React.CSSProperties}
          />
        );
      })}

      <div className="absolute inset-0 flex items-end justify-center pb-20 animate-rocket-launch">
        <div className="relative flex flex-col items-center">
          <RealisticRocket size={200} className="drop-shadow-[0_0_50px_rgba(96,165,250,0.6)]" />
        </div>
      </div>
      
      <div className="relative z-20 text-center mt-[-20%] p-14 bg-blue-400/10 border-4 border-blue-300/30 rounded-[3.5rem] backdrop-blur-xl shadow-[0_0_80px_rgba(59,130,246,0.3)] max-w-[800px]">
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-snug font-nasa animate-in zoom-in duration-500">{title}</h2>
        <div className="flex justify-center gap-6 mb-8">
           <Star className="text-yellow-400 fill-yellow-400 animate-pulse" size={60} />
           <Star className="text-yellow-400 fill-yellow-400 animate-pulse delay-75" size={60} />
           <Star className="text-yellow-400 fill-yellow-400 animate-pulse delay-150" size={60} />
        </div>
        <p className="text-3xl text-blue-100 uppercase font-bold tracking-[0.2em] opacity-80">Missão Consolidada</p>
      </div>
      <FooterLogo />
    </div>
  );

  const renderCurrentStage = () => {
    switch(stage) {
      case 0: return renderCover();
      case 1: return renderIntro();
      case 2: return renderPilotSelection();
      case 3: return renderLaunch();
      case 31: return renderCockpit();
      case 15: return renderLaunch("Saltando no Hiperespaço");
      case 16: return renderLaunch("Acelerando Missão");
      case 17: return renderVictoryLaunch(`Rota de 
crescimento 
ativada com 
sucesso!`);
      case 4: return renderAlert(<AlertTriangle className="text-red-500" />, "Atenção!", `Chuva de meteoros detectada: 
Fluxo de caixa instável 
e recebimento de 
mensalidades em atraso.`, 5);
      case 5: return renderDecision(
        "Para estabilizar a nave, qual decisão você toma?", 
        ["Adiar pagamento da folha.", "Adiar pagamento de fornecedores.", "Usar a kedu para a previsibilidade financeira."], 
        2, 6
      );
      case 6: return renderSuccess(<Shield className="text-emerald-400" />, "Escudos OK!", `Agora sua escola não precisa mais 
lidar com fluxo de caixa instável.`, 15);
      case 7: return renderAlert(<Wifi className="text-red-500 animate-pulse" />, "Sem Sinal", `Seu foguete está paralisado.
Sua escola está captando 
o mesmo número de alunos 
que está perdendo.`, 8);
      case 8: return renderDecision(
        "Para sair dessa situação, \nqual ação você toma?", 
        ["Esperar indicações.", "Marketing estratégico para captação de novos alunos.", "Reduzir custos de marketing."], 
        1, 9
      );
      case 9: return renderSuccess(<Wifi className="text-emerald-400" />, "Sinal Forte", `Captação de matrículas
atingiu a velocidade da luz!`, 16);
      case 10: return renderAlert(<Zap className="text-red-500 animate-pulse" />, "Atenção!", `Sem crédito rápido 
e aprovado para investir.
A expansão da escola
está paralisada.`, 11);
      case 11: return renderDecision(
        "Como obter potência \npara crescer?", 
        ["Crédito estruturado para investir.", "Parar projetos.", "Esperar sobra de caixa."], 
        0, 12
      );
      case 12: return renderSuccess(<Zap className="text-yellow-400 fill-yellow-400" />, "Impulso!", `Combustível reabastecido.
Potência total para dominar o setor!`, 17, true);
      case 13: return renderFinal();
      case 14: return renderCabin();
      default: return renderCover();
    }
  };

  return (
    <div className="w-full h-[100dvh] bg-black flex items-center justify-center overflow-hidden font-sans">
      <ImagePreloader />
      {/* Container na proporção exata 53cm x 94cm (53:94) */}
      <div 
        id="main-container"
        className="relative bg-slate-950 overflow-hidden shadow-2xl flex flex-col items-center"
        style={{
          height: '100dvh',
          width: 'calc(100dvh * (53/94))',
          maxHeight: '100dvh',
          maxWidth: '100vw',
        }}
      >
        <SpaceBackground />
        
        {/* Wrapper de Escala: Mantém proporção de 1080x1916 (53:94) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="relative z-10 origin-center pointer-events-auto shrink-0"
            style={{
              width: '1080px',
              height: '1916px',
              transform: `scale(${containerScale})`,
            }}
          >
            {renderCurrentStage()}
            {showError && <ErrorOverlay />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
