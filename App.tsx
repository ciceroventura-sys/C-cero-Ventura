
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
import { SpaceBackground, HeaderLogo, StaticHeaderLogo, FooterLogo, BoletoMeteorShower, RealisticRocket, LOGO_URL, PILOT_1_URL, PILOT_2_URL, PILOT_3_URL, PILOT_4_URL } from './components/Visuals';
import { ActionButton } from './components/Buttons';
import { PilotType } from './types';

const App: React.FC = () => {
  const [stage, setStage] = useState(0);
  const [pilot, setPilot] = useState<PilotType>(null);
  const [showError, setShowError] = useState(false);
  const [introText, setIntroText] = useState(`Toda escola que cresce passa por grandes desafios. Agora é a sua vez de assumir o comando.

Sua missão de crescimento começa agora.`);
  const [outroText, setOutroText] = useState(`Pilotar a gestão escolar não 
é uma missão simples. 

Mas com parceiros  que oferecem 
estabilidade, previsibilidade  e suporte, 
tudo fica mais leve.`);

  useEffect(() => {
    if (stage === 3) {
      const timer = setTimeout(() => setStage(4), 4000);
      return () => clearTimeout(timer);
    }
    if (stage === 15) {
      const timer = setTimeout(() => setStage(7), 4000);
      return () => clearTimeout(timer);
    }
    if (stage === 16) {
      const timer = setTimeout(() => setStage(10), 4000);
      return () => clearTimeout(timer);
    }
    if (stage === 17) {
      const timer = setTimeout(() => setStage(13), 4000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleCoverStart = () => setStage(1);
  const handleStart = () => setStage(2);
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
      default: return PILOT_1_URL;
    }
  };

  const getPilotName = () => {
    switch(pilot) {
      case 'alpha': return 'Comandante Alpha';
      case 'beta': return 'Comandante Beta';
      case 'gamma': return 'Comandante Gamma';
      case 'delta': return 'Comandante Delta';
      default: return 'Comandante';
    }
  };

  const PilotAvatar = () => (
    <div className="flex flex-col items-center gap-4 mb-10 w-full">
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.6)]">
        <img 
          src={getPilotUrl()} 
          alt="Pilot" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="text-center">
        <p className="text-white font-black uppercase text-xl tracking-tighter">{getPilotName()}</p>
      </div>
    </div>
  );

  const ErrorOverlay = () => (
    <div className="fixed inset-0 z-[100] bg-red-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-300 overflow-hidden">
      <style>{`
        @keyframes errorGlitch {
          0% { transform: translate(0); clip-path: inset(0 0 0 0); }
          20% { transform: translate(-2px, 1px); clip-path: inset(10% 0 20% 0); }
          40% { transform: translate(2px, -1px); clip-path: inset(30% 0 10% 0); }
          60% { transform: translate(-1px, 2px); clip-path: inset(20% 0 30% 0); }
          80% { transform: translate(1px, -2px); clip-path: inset(40% 0 5% 0); }
          100% { transform: translate(0); clip-path: inset(0 0 0 0); }
        }
        .animate-error-glitch { animation: errorGlitch 0.2s infinite; opacity: 0.3; }
      `}</style>
      <div className="absolute inset-0 bg-red-600/10 animate-error-glitch pointer-events-none"></div>
      <div className="bg-black/40 p-8 rounded-full mb-6 border-4 border-red-500 animate-bounce relative z-10">
        <AlertTriangle size={80} className="text-red-500" />
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-white mb-4 text-center uppercase tracking-tighter drop-shadow-2xl relative z-10">Impacto!</h2>
      <p className="text-[19px] md:text-2xl text-red-100 text-center mb-10 max-w-md leading-relaxed relative z-10">
        Essa decisão pode comprometer o fluxo da missão. <br/>Ajuste a rota, comandante.
      </p>
      <div className="w-full max-w-xs relative z-10">
        <ActionButton onClick={() => setShowError(false)} variant="primary" className="min-h-[80px]">
          <Zap className="mr-2" size={24} /> Tentar Novamente
        </ActionButton>
      </div>
    </div>
  );

  const renderCover = () => (
    <div className="flex flex-col items-center justify-center h-full py-12 px-6 text-center relative z-10 overflow-y-auto">
      <div className="z-10 flex flex-col items-center w-full h-full max-w-2xl border-2 border-blue-500/30 rounded-[2.5rem] bg-blue-950/20 backdrop-blur-sm shadow-[0_0_50px_rgba(59,130,246,0.2)] p-8 md:p-12 justify-center">
        <div className="mb-12 animate-in zoom-in duration-1000">
          <img 
            src={LOGO_URL} 
            alt="Kedu Logo" 
            className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.5)]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="mb-12">
          <p className="text-[34px] text-white font-nasa tracking-wider leading-[50px] uppercase text-center font-bold">
            descubra como levar sua escola<br/>
            <span className="text-blue-400 text-[33px] font-bold">para o próximo nível.</span>
          </p>
        </div>

        <div className="w-full max-w-xs">
          <ActionButton onClick={handleCoverStart} variant="primary" className="min-h-[80px] shadow-[0_0_20px_rgba(59,130,246,0.4)] !text-[17px]">
            ACESSAR<br/>ESTAÇÃO ESPACIAL
          </ActionButton>
        </div>
      </div>
    </div>
  );

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-between h-full py-4 md:py-8 px-6 text-center relative z-10 overflow-y-auto">
      <div className="w-full flex flex-col items-center gap-10">
        <div className="animate-in zoom-in duration-1000 w-full flex justify-center h-[61px] leading-[52px]">
          <img 
            src={LOGO_URL} 
            alt="Kedu Logo" 
            className="max-w-[180px] md:max-w-[280px] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-[72px] font-black text-white uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] leading-[84px] h-[214px] mb-[56px] font-nasa text-center">
          Base Espacial<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-nasa">KEDU</span>
        </h1>
      </div>

      <div className="bg-slate-900/70 backdrop-blur-md p-6 md:p-10 rounded-[2rem] border-2 border-slate-700 shadow-2xl my-12 w-full max-w-lg">
        <p className="text-[28px] text-slate-100 font-normal leading-[36px] animate-in fade-in duration-700 font-sans whitespace-pre-line text-center">{introText}</p>
      </div>

      <div className="w-full max-w-xs mt-12">
        <ActionButton onClick={handleStart} variant="primary" className="min-h-[80px]">INICIAR MISSÃO</ActionButton>
      </div>
    </div>
  );

  const renderPilotSelection = () => {
    const pilots = [
      { id: 'alpha', name: 'Comandante Alpha', url: PILOT_1_URL },
      { id: 'beta', name: 'Comandante Beta', url: PILOT_2_URL },
      { id: 'gamma', name: 'Comandante Gamma', url: PILOT_3_URL },
      { id: 'delta', name: 'Comandante Delta', url: PILOT_4_URL },
    ];

    return (
      <div className="flex flex-col items-center h-full py-8 px-6 relative z-10 overflow-y-auto">
        <div className="mt-6 mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest font-nasa">O Piloto</h2>
          <p className="text-[28px] text-[#5da4f5] font-nasa uppercase tracking-widest leading-[39px] font-bold">Quem assume o comando?</p>
        </div>
        <div className="flex-1 w-full flex flex-col gap-8 justify-start mt-12 max-w-md pb-32">
          {pilots.map((p) => (
            <button 
              key={p.id} 
              onClick={() => handleSelectPilot(p.id)}
              className={`relative rounded-[1.5rem] border-2 transition-all duration-300 flex items-center gap-6 p-6
                ${pilot === p.id ? 'bg-blue-900/80 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.4)] scale-[1.02]' : 'bg-slate-800/40 border-slate-700 opacity-80'}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-blue-400/30 bg-slate-700 flex-shrink-0">
                <img 
                  src={p.url} 
                  alt={p.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left flex-1">
                <span className="text-lg md:text-xl font-black text-white uppercase tracking-wider leading-tight">{p.name}</span>
                <p className="text-blue-300 font-bold uppercase text-[10px]">Status: Pronto</p>
              </div>
              {pilot === p.id && <CheckCircle className="text-blue-400" size={24} />}
            </button>
          ))}
        </div>
        <FooterLogo />
      </div>
    );
  };

  const renderLaunch = (title = "Decolando") => (
    <div className="flex flex-col items-center justify-center h-full relative z-10 overflow-hidden px-6">
      <div className="absolute inset-0 flex items-end justify-center pb-20 animate-rocket-launch">
        <div className="relative flex flex-col items-center">
          <RealisticRocket size={200} className="drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]" />
        </div>
      </div>
      <div className="relative z-20 text-center mt-[-20%]">
        <h2 className="text-2xl md:text-4xl font-black text-white mb-4 animate-pulse uppercase tracking-widest font-nasa">{title}</h2>
        <p className="text-lg text-blue-200 uppercase font-bold tracking-tighter opacity-80">Protocolo Ativo...</p>
      </div>
      <FooterLogo />
    </div>
  );

  const renderAlert = (icon: React.ReactNode, title: string, text: string, next: number) => (
    <div className="flex flex-col items-center justify-center h-full py-8 px-6 relative z-10 overflow-y-auto">
      <style>{`
        @keyframes redAlert {
          0%, 100% { background-color: rgba(220, 38, 38, 0); }
          50% { background-color: rgba(220, 38, 38, 0.3); }
        }
        .animate-red-alert { animation: redAlert 0.8s ease-in-out infinite; }
      `}</style>
      <div className="absolute inset-0 animate-red-alert pointer-events-none z-0"></div>
      {stage === 4 && <BoletoMeteorShower />}
      <div className="z-10 flex flex-col items-center text-center mt-4 w-full max-w-lg pb-32">
        <PilotAvatar />
        <div className="mb-10 relative">
           <div className="absolute inset-0 bg-red-500 blur-[40px] opacity-30 animate-ping"></div>
           {React.cloneElement(icon as React.ReactElement, { size: 80 })}
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-red-500 mb-10 uppercase tracking-tighter leading-none font-nasa">{title}</h2>
        <div className="bg-slate-900/90 border-2 border-red-500/50 p-6 md:p-8 rounded-[1.5rem] mb-8 shadow-2xl">
          <p className="text-lg md:text-2xl text-white leading-tight font-medium whitespace-pre-line">{text}</p>
        </div>
        <div className="w-full max-w-xs mt-12">
          <ActionButton onClick={() => setStage(next)} variant="alert" className="min-h-[80px]">ACESSAR PAINEL</ActionButton>
        </div>
      </div>
      <FooterLogo />
    </div>
  );

  const renderDecision = (question: string, options: string[], correctIndex: number, next: number) => (
    <div className="flex flex-col h-full py-8 px-6 relative z-10 overflow-y-auto">
      <div className="mt-4 relative z-10 flex flex-col items-center">
        <PilotAvatar />
      </div>
      <div className="mb-10 relative z-10 flex flex-col items-center">
        <h2 className="text-xl font-black text-blue-400 uppercase tracking-widest font-nasa">Controle</h2>
        <div className="h-1.5 w-16 bg-blue-500 rounded-full mt-2"></div>
      </div>
      <div className="mb-12 text-center">
        <h3 className="text-2xl md:text-4xl font-black text-white leading-tight whitespace-pre-line">{question}</h3>
      </div>
      <div className="flex flex-col gap-6 w-full max-w-lg mx-auto pb-32 mt-12">
        {options.map((opt, idx) => (
          <button 
            key={idx} 
            onClick={() => handleDecision(idx === correctIndex, next)}
            className="w-full p-5 md:p-6 rounded-[1.5rem] bg-slate-800/80 border-2 border-slate-600 hover:border-blue-400 text-left transition-all active:scale-95 group"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 w-8 h-8 rounded-full border-2 border-slate-500 flex-shrink-0 flex items-center justify-center text-sm text-white font-black group-hover:bg-blue-500/20">{idx + 1}</div>
              <span className="text-lg md:text-xl text-slate-100 font-bold leading-snug">{opt}</span>
            </div>
          </button>
        ))}
      </div>
      <FooterLogo />
    </div>
  );

  const renderSuccess = (icon: React.ReactNode, title: string, text: string, next: number, isFinal = false) => (
    <div className="flex flex-col items-center justify-center h-full py-8 px-6 relative z-10 overflow-y-auto">
      <div className="z-10 flex flex-col items-center text-center mt-4 w-full max-w-lg pb-32">
        <PilotAvatar />
        <div className="mb-10 p-6 bg-emerald-500/20 rounded-full shadow-xl">
           {React.cloneElement(icon as React.ReactElement, { size: 80 })}
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-emerald-400 mb-10 uppercase tracking-widest leading-none font-nasa">{title}</h2>
        <p className="text-lg md:text-2xl text-white leading-relaxed mb-10 mt-5 font-medium whitespace-pre-line">{text}</p>
        <div className="w-full max-w-xs mt-12">
          <ActionButton onClick={() => setStage(next)} variant="success" className="min-h-[80px]">
            {isFinal ? "CONCLUIR" : "PRÓXIMO"} <ArrowRight className="ml-2" size={24} />
          </ActionButton>
        </div>
      </div>
      <FooterLogo />
    </div>
  );

  const renderFinal = () => (
    <div className="flex flex-col items-center justify-between h-full pt-6 pb-12 px-6 text-center relative z-10 overflow-y-auto">
      <div className="mt-0 mb-8 animate-bounce">
         <Star size={88} className="text-[#92fb92] fill-[#92fb92] drop-shadow-[0_0_40px_rgba(146,251,146,0.5)]" />
      </div>
      <div className="w-full max-w-lg pb-32">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase mb-6 tracking-tighter leading-none font-nasa">Missão Cumprida!</h1>
        <div className="bg-white/10 backdrop-blur-md p-6 md:p-10 rounded-[2rem] border-2 border-white/20 shadow-2xl mb-8">
          <p className="text-lg md:text-2xl text-slate-100 font-medium leading-tight mb-6 whitespace-pre-line">{outroText}</p>
          <div className="font-black text-blue-300 text-2xl md:text-3xl uppercase tracking-widest">Escola em Órbita</div>
        </div>
        <div className="w-full max-w-xs mx-auto mt-12">
          <ActionButton onClick={() => setStage(14)} variant="primary" className="min-h-[80px]">FINALIZAR</ActionButton>
        </div>
      </div>
      <FooterLogo />
    </div>
  );

  const renderCabin = () => (
    <div className="flex flex-col items-center justify-center h-full py-12 px-6 relative z-10 overflow-y-auto bg-indigo-950/40">
       <div className="z-10 text-center mt-4 w-full max-w-lg pb-32">
         <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter font-nasa">Cabine</h2>
         <p className="text-lg md:text-2xl text-slate-200 mb-16 leading-relaxed whitespace-pre-line">Sua escola agora brilha em{"\n"}uma nova galáxia de resultados.</p>
         <div className="w-full max-w-xs mx-auto mt-12">
            <ActionButton onClick={() => window.location.reload()} variant="primary" className="min-h-[80px]">NOVA MISSÃO</ActionButton>
         </div>
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
      case 15: return renderLaunch("Saltando no Hiperespaço");
      case 16: return renderLaunch("Acelerando Missão");
      case 17: return renderLaunch("Rumo à Vitória");
      case 4: return renderAlert(<AlertTriangle className="text-red-500" />, "Atenção!", "Chuva de meteoros detectada: Inadimplência à vista!", 5);
      case 5: return renderDecision(
        "Para estabilizar a nave, qual decisão você toma?", 
        ["Adiar pagamentos da equipe", "Ignorar e seguir rota", "Usar KEDU para previsibilidade financeira"], 
        2, 6
      );
      case 6: return renderSuccess(<Shield className="text-emerald-400" />, "Escudos OK!", "Agora sua escola não precisa mais lidar com fluxo de caixa instável.", 15);
      case 7: return renderAlert(<Wifi className="text-red-500 animate-pulse" />, "Sem Sinal", "Seu foguete não está sendo detectado. Sua escola está invisível para o universo.", 8);
      case 8: return renderDecision(
        "Para sair dessa situação, \nqual ação você toma?", 
        ["Esperar indicações", "Marketing estratégico e posicionamento", "Reduzir custos de marketing"], 
        1, 9
      );
      case 9: return renderSuccess(<Wifi className="text-emerald-400" />, "Sinal Forte", "Captação de matrículas \natingiu a velocidade da luz!", 16);
      case 10: return renderAlert(<Battery className="text-red-500 rotate-90" />, "Baixa Energia", "Sem investimento, a expansão da escola está paralisada.", 11);
      case 11: return renderDecision(
        "Como obter potência \npara crescer?", 
        ["Parar projetos", "Crédito estruturado para investir", "Esperar sobra de caixa"], 
        1, 12
      );
      case 12: return renderSuccess(<Zap className="text-yellow-400 fill-yellow-400" />, "Impulso!", "Combustível reabastecido.\nPotência total para dominar o setor!", 17, true);
      case 13: return renderFinal();
      case 14: return renderCabin();
      default: return renderCover();
    }
  };

  return (
    <div className="w-full h-[100dvh] bg-black flex items-center justify-center overflow-hidden font-sans">
      {/* Dynamic responsive container */}
      <div className="relative w-full h-full max-w-2xl bg-slate-950 overflow-hidden shadow-2xl">
        <SpaceBackground />
        <div className="relative z-10 w-full h-full">
          {renderCurrentStage()}
        </div>
        {showError && <ErrorOverlay />}
      </div>
    </div>
  );
};

export default App;
