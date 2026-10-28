// ============================================================================
// Google Cloud Certified Associate Data Practitioner - PWA Mobile App
// ============================================================================

const { useState, useEffect, useMemo, useRef } = React;

// Helper de Vibración Háptica para iPhone/Android
const triggerHaptic = (pattern = 15) => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try { navigator.vibrate(pattern); } catch (e) {}
  }
};

// ==================== ICONOS SVG LIGEROS ====================
const Icon = ({ name, className = "w-5 h-5" }) => {
  switch (name) {
    case 'home':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>;
    case 'book':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>;
    case 'award':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>;
    case 'alert':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>;
    case 'chart':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>;
    case 'check':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>;
    case 'x':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>;
    case 'bookmark':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>;
    case 'bookmark-filled':
      return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>;
    case 'clock':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
    case 'sparkles':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>;
    case 'flag':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>;
    case 'flag-filled':
      return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>;
    case 'chevron-right':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>;
    case 'chevron-left':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>;
    case 'info':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
    case 'phone-install':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>;
    case 'refresh':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>;
    case 'share':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>;
    default:
      return null;
  }
};

// ==================== APP PRINCIPAL ====================
function App() {
  const [tab, setTab] = useState('home'); // home | practice | exam | mistakes | stats | guide
  const [selectedDomain, setSelectedDomain] = useState('all');
  
  // Estados de persistencia
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('gcp_quiz_history');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [mistakes, setMistakes] = useState(() => {
    try {
      const saved = localStorage.getItem('gcp_quiz_mistakes');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('gcp_quiz_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [examResults, setExamResults] = useState(() => {
    try {
      const saved = localStorage.getItem('gcp_quiz_exams');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  // Guardar cambios en LocalStorage
  useEffect(() => {
    localStorage.setItem('gcp_quiz_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('gcp_quiz_mistakes', JSON.stringify(mistakes));
  }, [mistakes]);

  useEffect(() => {
    localStorage.setItem('gcp_quiz_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('gcp_quiz_exams', JSON.stringify(examResults));
  }, [examResults]);

  // Cálculos estadísticos globales
  const stats = useMemo(() => {
    const totalAnswered = Object.keys(history).length;
    const correctCount = Object.values(history).filter(h => h.isCorrect).length;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    // Precisión por dominio
    const domainStats = {};
    Object.keys(DOMAINS).forEach(dKey => {
      if (dKey === 'all') return;
      const domainQuestions = QUESTIONS.filter(q => q.domain === dKey);
      const answeredInDomain = domainQuestions.filter(q => history[q.id]);
      const correctInDomain = answeredInDomain.filter(q => history[q.id].isCorrect);
      
      domainStats[dKey] = {
        total: domainQuestions.length,
        answered: answeredInDomain.length,
        correct: correctInDomain.length,
        accuracy: answeredInDomain.length > 0 
          ? Math.round((correctInDomain.length / answeredInDomain.length) * 100) 
          : 0
      };
    });

    return { totalAnswered, correctCount, accuracy, domainStats };
  }, [history]);

  // Handler para alternar Favoritos
  const toggleBookmark = (qId) => {
    triggerHaptic(20);
    setBookmarks(prev => 
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  // Handler para registrar respuesta
  const recordAnswer = (qId, optionId, isCorrect) => {
    triggerHaptic(isCorrect ? [20, 50] : [50, 40, 50]);
    
    setHistory(prev => ({
      ...prev,
      [qId]: { optionId, isCorrect, answeredAt: Date.now() }
    }));

    if (!isCorrect) {
      setMistakes(prev => prev.includes(qId) ? prev : [...prev, qId]);
    } else {
      // Si acierta una que estaba en fallos, podemos mantenerla o sugerir retirarla
    }
  };

  // Remover de fallos
  const removeMistake = (qId) => {
    triggerHaptic(15);
    setMistakes(prev => prev.filter(id => id !== qId));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 pb-20 select-none">
      {/* HEADER SUPERIOR CON LOGO Y BADGES */}
      <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2.5" onClick={() => setTab('home')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-400 p-0.5 shadow-md shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-xs tracking-tighter">GCP</span>
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              Data Practitioner
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h1>
            <p className="text-[10px] text-slate-400">Google Cloud Associate Exam</p>
          </div>
        </div>

        {/* Acciones rápidas en header */}
        <div className="flex items-center space-x-2">
          {mistakes.length > 0 && (
            <button 
              onClick={() => setTab('mistakes')} 
              className="flex items-center gap-1 bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold px-2.5 py-1 rounded-full active:scale-95 transition-transform"
            >
              <Icon name="alert" className="w-3.5 h-3.5" />
              <span>{mistakes.length}</span>
            </button>
          )}

          <button 
            onClick={() => setTab('guide')}
            className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60 active:scale-95 transition-transform"
            title="Instalar en iPhone"
          >
            <Icon name="phone-install" className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL SEGÚN TAB */}
      <main className="flex-1 max-w-lg w-full mx-auto p-4 animate-fade-in">
        {tab === 'home' && (
          <HomeView 
            stats={stats} 
            mistakesCount={mistakes.length}
            bookmarksCount={bookmarks.length}
            onSelectPractice={(domain) => {
              setSelectedDomain(domain);
              setTab('practice');
            }}
            onStartExam={() => setTab('exam')}
            onOpenMistakes={() => setTab('mistakes')}
            onOpenGuide={() => setTab('guide')}
          />
        )}

        {tab === 'practice' && (
          <PracticeView 
            selectedDomain={selectedDomain}
            onSelectDomain={setSelectedDomain}
            history={history}
            bookmarks={bookmarks}
            mistakes={mistakes}
            onAnswer={recordAnswer}
            onToggleBookmark={toggleBookmark}
            onRemoveMistake={removeMistake}
          />
        )}

        {tab === 'exam' && (
          <ExamSimulationView 
            onSaveExam={(result) => setExamResults(prev => [result, ...prev])}
            onAddToMistakes={(wrongIds) => {
              setMistakes(prev => Array.from(new Set([...prev, ...wrongIds])));
            }}
            onFinish={() => setTab('stats')}
          />
        )}

        {tab === 'mistakes' && (
          <MistakesView 
            mistakes={mistakes}
            onRemoveMistake={removeMistake}
            onStartMistakesQuiz={() => {
              setSelectedDomain('mistakes_only');
              setTab('practice');
            }}
          />
        )}

        {tab === 'stats' && (
          <StatsView 
            stats={stats}
            examResults={examResults}
            onResetProgress={() => {
              if (confirm('¿Estás seguro de que deseas reiniciar todo tu progreso y estadísticas?')) {
                setHistory({});
                setMistakes([]);
                setExamResults([]);
                localStorage.clear();
              }
            }}
          />
        )}

        {tab === 'guide' && <GuideView />}
      </main>

      {/* BARRA DE NAVEGACIÓN INFERIOR (ESTILO IOS) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 px-2 pt-2 pb-6 max-w-lg mx-auto">
        <div className="flex items-center justify-around">
          <NavButton 
            active={tab === 'home'} 
            onClick={() => { triggerHaptic(10); setTab('home'); }} 
            icon="home" 
            label="Inicio" 
          />
          <NavButton 
            active={tab === 'practice'} 
            onClick={() => { triggerHaptic(10); setTab('practice'); }} 
            icon="book" 
            label="Práctica" 
          />
          <NavButton 
            active={tab === 'exam'} 
            onClick={() => { triggerHaptic(10); setTab('exam'); }} 
            icon="award" 
            label="Simulador" 
          />
          <NavButton 
            active={tab === 'mistakes'} 
            onClick={() => { triggerHaptic(10); setTab('mistakes'); }} 
            icon="alert" 
            label="Fallos" 
            badge={mistakes.length}
          />
          <NavButton 
            active={tab === 'stats'} 
            onClick={() => { triggerHaptic(10); setTab('stats'); }} 
            icon="chart" 
            label="Progreso" 
          />
        </div>
      </nav>
    </div>
  );
}

// Botón de barra inferior
function NavButton({ active, onClick, icon, label, badge }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 active:scale-90 ${
        active ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      <div className="relative">
        <Icon name={icon} className="w-5 h-5 mb-0.5" />
        {badge > 0 && (
          <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full min-w-[14px] text-center shadow-sm">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] tracking-tight">{label}</span>
      {active && (
        <span className="absolute -bottom-1 w-5 h-1 bg-blue-500 rounded-full"></span>
      )}
    </button>
  );
}

// ==================== VISTA 1: HOME ====================
function HomeView({ stats, mistakesCount, bookmarksCount, onSelectPractice, onStartExam, onOpenMistakes, onOpenGuide }) {
  return (
    <div className="space-y-5">
      {/* BANNER PRINCIPAL DE PROGRESO */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border border-slate-800 p-5 shadow-xl">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
              Preparación Oficial
            </span>
            <h2 className="text-xl font-extrabold text-white mt-1">Associate Data Practitioner</h2>
            <p className="text-xs text-slate-400">Banco de {QUESTIONS.length} preguntas de nivel de examen</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-slate-950/80 border border-slate-800 w-16 h-16 rounded-2xl shadow-inner">
            <span className="text-lg font-black text-emerald-400">{stats.accuracy}%</span>
            <span className="text-[9px] font-medium text-slate-400 uppercase">Aciertos</span>
          </div>
        </div>

        {/* Barra de progreso global */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Respondidas: {stats.totalAnswered} de {QUESTIONS.length}</span>
            <span>{Math.round((stats.totalAnswered / QUESTIONS.length) * 100)}% Completado</span>
          </div>
          <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (stats.totalAnswered / QUESTIONS.length) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Botones de acción rápida */}
        <div className="grid grid-cols-2 gap-2.5 mt-5">
          <button 
            onClick={() => onSelectPractice('all')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/25 active:scale-95 transition-all text-xs"
          >
            <Icon name="book" className="w-4 h-4" />
            <span>Modo Práctica</span>
          </button>

          <button 
            onClick={onStartExam}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 text-white font-semibold py-3 px-4 rounded-xl border border-slate-700 active:scale-95 transition-all text-xs"
          >
            <Icon name="award" className="w-4 h-4 text-amber-400" />
            <span>Simulador Examen</span>
          </button>
        </div>
      </div>

      {/* BANNER SMART REVIEW (SI HAY ERRORES) */}
      {mistakesCount > 0 && (
        <div 
          onClick={onOpenMistakes}
          className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/30 active:scale-98 transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Icon name="alert" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Banco de Fallos
                <span className="text-[10px] bg-rose-500 text-white font-bold px-1.5 py-0.2 rounded-full">
                  {mistakesCount} pendientes
                </span>
              </h3>
              <p className="text-xs text-slate-400">Repasa únicamente las preguntas que has errado</p>
            </div>
          </div>
          <Icon name="chevron-right" className="w-5 h-5 text-slate-500" />
        </div>
      )}

      {/* GUÍA DE INSTALACIÓN EN IPHONE */}
      <div 
        onClick={onOpenGuide}
        className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 active:scale-98 transition-all cursor-pointer"
      >
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Icon name="phone-install" className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200">¿Usar como App en tu iPhone?</h4>
            <p className="text-[11px] text-slate-400">Toca aquí para ver cómo agregar a pantalla de inicio</p>
          </div>
        </div>
        <Icon name="chevron-right" className="w-4 h-4 text-slate-500" />
      </div>

      {/* SECCIÓN DOMINIOS DEL EXAMEN */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Dominios del Examen Oficial</h3>
          <span className="text-[11px] text-slate-400">Toca para practicar</span>
        </div>

        <div className="space-y-2.5">
          {Object.entries(DOMAINS).map(([key, domain]) => {
            if (key === 'all') return null;
            const domainStat = stats.domainStats[key] || { answered: 0, total: 0, accuracy: 0 };
            
            return (
              <div 
                key={key}
                onClick={() => onSelectPractice(key)}
                className="group p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all active:scale-98 cursor-pointer flex items-center justify-between"
              >
                <div className="flex-1 mr-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                      {domain.name}
                    </h4>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {domainStat.answered}/{domainStat.total}
                    </span>
                  </div>

                  {/* Barra por dominio */}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        domainStat.accuracy >= 70 ? 'bg-emerald-500' : domainStat.accuracy > 0 ? 'bg-amber-500' : 'bg-slate-700'
                      }`}
                      style={{ width: `${domainStat.total > 0 ? (domainStat.answered / domainStat.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {domainStat.answered > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      domainStat.accuracy >= 70 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {domainStat.accuracy}%
                    </span>
                  )}
                  <Icon name="chevron-right" className="w-4 h-4 text-slate-600 group-hover:text-slate-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==================== VISTA 2: MODO PRÁCTICA ====================
function PracticeView({ selectedDomain, onSelectDomain, history, bookmarks, mistakes, onAnswer, onToggleBookmark, onRemoveMistake }) {
  // Filtrar preguntas según dominio
  const filteredQuestions = useMemo(() => {
    if (selectedDomain === 'mistakes_only') {
      return QUESTIONS.filter(q => mistakes.includes(q.id));
    }
    if (selectedDomain === 'all') {
      return QUESTIONS;
    }
    return QUESTIONS.filter(q => q.domain === selectedDomain);
  }, [selectedDomain, mistakes]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Reiniciar índice si cambia el filtro
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedDomain]);

  if (filteredQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <Icon name="check" className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white">¡No hay preguntas pendientes!</h3>
        <p className="text-xs text-slate-400 max-w-xs">
          {selectedDomain === 'mistakes_only' 
            ? '¡Felicitaciones! Has corregido todos los fallos acumulados.'
            : 'No hay preguntas disponibles para este filtro.'}
        </p>
        <button 
          onClick={() => onSelectDomain('all')}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
        >
          Ver Todas las Preguntas
        </button>
      </div>
    );
  }

  const currentQ = filteredQuestions[currentIndex];
  const userRecord = history[currentQ.id];
  const isAnswered = !!userRecord;
  const isBookmarked = bookmarks.includes(currentQ.id);
  const isInMistakes = mistakes.includes(currentQ.id);

  const handleSelectOption = (optId) => {
    if (isAnswered) return; // Ya respondida
    const isCorrect = currentQ.options.find(o => o.id === optId)?.isCorrect || false;
    onAnswer(currentQ.id, optId, isCorrect);
  };

  const handleNext = () => {
    triggerHaptic(10);
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    triggerHaptic(10);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* SELECTOR HORIZONTAL DE DOMINIOS (SCROLLABLE TÁCTIL) */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
        {Object.entries(DOMAINS).map(([key, dom]) => (
          <button
            key={key}
            onClick={() => { triggerHaptic(10); onSelectDomain(key); }}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedDomain === key 
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30' 
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {dom.name}
          </button>
        ))}
      </div>

      {/* BARRA DE PROGRESO Y CONTROLES */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span className="font-medium">
          Pregunta <strong className="text-white">{currentIndex + 1}</strong> de {filteredQuestions.length}
        </span>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => toggleBookmark(currentQ.id)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked 
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Guardar en favoritos"
          >
            <Icon name={isBookmarked ? "bookmark-filled" : "bookmark"} className="w-4 h-4" />
          </button>

          {isInMistakes && isAnswered && userRecord.isCorrect && (
            <button 
              onClick={() => onRemoveMistake(currentQ.id)}
              className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-1 rounded-lg text-[11px] font-semibold"
            >
              <Icon name="check" className="w-3.5 h-3.5" />
              <span>Marcar Superada</span>
            </button>
          )}
        </div>
      </div>

      {/* TARJETA DE LA PREGUNTA */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
            {DOMAINS[currentQ.domain]?.name || currentQ.domain}
          </span>
          <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
            {currentQ.difficulty}
          </span>
        </div>

        <p className="text-sm font-medium text-slate-100 leading-relaxed">
          {currentQ.question}
        </p>

        {/* LISTA DE OPCIONES */}
        <div className="space-y-2 pt-1">
          {currentQ.options.map(opt => {
            let optStyle = "bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700";
            let badgeStyle = "bg-slate-800 text-slate-300";

            if (isAnswered) {
              if (opt.isCorrect) {
                optStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50";
                badgeStyle = "bg-emerald-500 text-slate-950 font-bold";
              } else if (userRecord.optionId === opt.id) {
                optStyle = "bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500/50";
                badgeStyle = "bg-rose-500 text-white font-bold";
              } else {
                optStyle = "bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60";
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isAnswered}
                className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start space-x-3 active:scale-99 ${optStyle}`}
              >
                <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 transition-colors ${badgeStyle}`}>
                  {isAnswered && opt.isCorrect ? (
                    <Icon name="check" className="w-3.5 h-3.5" />
                  ) : isAnswered && userRecord.optionId === opt.id ? (
                    <Icon name="x" className="w-3.5 h-3.5" />
                  ) : (
                    opt.id
                  )}
                </span>
                <span className="leading-snug flex-1">{opt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PANEL DE EXPLICACIÓN DETALLADA (APARECE AL RESPONDER) */}
      {isAnswered && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-xl space-y-3 animate-fade-in">
          {/* Encabezado del resultado */}
          <div className="flex items-center space-x-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              userRecord.isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
            }`}>
              <Icon name={userRecord.isCorrect ? 'check' : 'x'} className="w-4 h-4" />
            </div>
            <h4 className={`text-xs font-bold ${userRecord.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
              {userRecord.isCorrect ? '¡Excelente! Respuesta Correcta' : 'Respuesta Incorrecta'}
            </h4>
          </div>

          {/* Concepto Clave Badge */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Concepto GCP:</span>
            <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
              {currentQ.explanation.keyConcept}
            </span>
          </div>

          {/* Explicación General */}
          <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <strong className="text-blue-400 block mb-1">Fundamento Teórico:</strong>
            {currentQ.explanation.whyCorrect}
          </div>

          {/* Desglose de Distractores */}
          <div className="space-y-1.5 pt-1">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Desglose de opciones:</h5>
            <div className="space-y-1 text-[11px]">
              {Object.entries(currentQ.explanation.optionsBreakdown).map(([optKey, desc]) => (
                <div key={optKey} className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/60 text-slate-300">
                  <strong className={optKey === currentQ.options.find(o => o.isCorrect)?.id ? 'text-emerald-400' : 'text-slate-400'}>
                    Opción {optKey}:
                  </strong>{' '}
                  <span className="text-slate-400">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tip de Examen Google Cloud */}
          {currentQ.explanation.docTip && (
            <div className="flex items-start space-x-2 p-2.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-[11px] text-blue-300">
              <Icon name="sparkles" className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-blue-200">Tip de Examen Google:</strong> {currentQ.explanation.docTip}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CONTROLES ANTERIOR / SIGUIENTE */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
            currentIndex > 0 
              ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 active:scale-95' 
              : 'opacity-40 bg-slate-950 border-slate-900 text-slate-600'
          }`}
        >
          <Icon name="chevron-left" className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === filteredQuestions.length - 1}
          className={`flex items-center gap-1 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            currentIndex < filteredQuestions.length - 1
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 active:scale-95'
              : 'opacity-40 bg-slate-900 text-slate-600'
          }`}
        >
          <span>Siguiente</span>
          <Icon name="chevron-right" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ==================== VISTA 3: SIMULADOR DE EXAMEN ====================
function ExamSimulationView({ onSaveExam, onAddToMistakes, onFinish }) {
  const [examState, setExamState] = useState('config'); // config | running | result
  const [examQuestions, setExamQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qId]: optionId }
  const [flagged, setFlagged] = useState([]); // [qIds]
  const [timeLeft, setTimeLeft] = useState(0); // segundos
  const [totalTime, setTotalTime] = useState(0);
  const [examResult, setExamResult] = useState(null);

  // Opciones de configuración
  const [selectedCount, setSelectedCount] = useState(20);
  const [selectedDurationMins, setSelectedDurationMins] = useState(30);

  // Iniciar examen
  const startExam = () => {
    triggerHaptic(20);
    // Barajar preguntas de todos los dominios
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, selectedCount);
    setExamQuestions(shuffled);
    setCurrentIndex(0);
    setAnswers({});
    setFlagged([]);
    const seconds = selectedDurationMins * 60;
    setTimeLeft(seconds);
    setTotalTime(seconds);
    setExamState('running');
  };

  // Temporizador en vivo
  useEffect(() => {
    if (examState !== 'running') return;

    if (timeLeft <= 0) {
      finishExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [examState, timeLeft]);

  // Finalizar examen y calcular métricas
  const finishExam = () => {
    triggerHaptic([30, 60, 30]);
    let correctCount = 0;
    const wrongIds = [];
    const domainBreakdown = {};

    examQuestions.forEach(q => {
      const userChoice = answers[q.id];
      const isCorrect = q.options.find(o => o.id === userChoice)?.isCorrect || false;

      if (!domainBreakdown[q.domain]) {
        domainBreakdown[q.domain] = { total: 0, correct: 0 };
      }
      domainBreakdown[q.domain].total += 1;

      if (isCorrect) {
        correctCount += 1;
        domainBreakdown[q.domain].correct += 1;
      } else {
        wrongIds.push(q.id);
      }
    });

    const scorePercentage = Math.round((correctCount / examQuestions.length) * 100);
    const passed = scorePercentage >= 70; // Google passing score ~70%
    const timeSpentSeconds = totalTime - timeLeft;

    const result = {
      date: new Date().toLocaleDateString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      score: scorePercentage,
      totalQuestions: examQuestions.length,
      correctCount,
      wrongCount: examQuestions.length - correctCount,
      passed,
      timeSpentSeconds,
      domainBreakdown
    };

    setExamResult(result);
    onSaveExam(result);
    onAddToMistakes(wrongIds);
    setExamState('result');

    // Confetti si aprueba
    if (passed && typeof confetti === 'function') {
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  // Formato mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // PANTALLA 1: CONFIGURACIÓN PREVIA
  if (examState === 'config') {
    return (
      <div className="space-y-5">
        <div className="text-center space-y-2 py-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 mx-auto flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
            <Icon name="award" className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-white">Simulador de Examen Oficial</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Pon a prueba tus conocimientos en condiciones similares al examen real: temporizador activo, sin explicaciones durante el test y reporte final detallado.
          </p>
        </div>

        {/* Parámetros */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">Cantidad de Preguntas:</label>
            <div className="grid grid-cols-3 gap-2">
              {[10, 20, 35].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => { triggerHaptic(10); setSelectedCount(cnt); }}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedCount === cnt 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm' 
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {cnt} preguntas
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">Tiempo Límite:</label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 30, 50].map(mins => (
                <button
                  key={mins}
                  onClick={() => { triggerHaptic(10); setSelectedDurationMins(mins); }}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedDurationMins === mins 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm' 
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {mins} minutos
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <Icon name="info" className="w-3.5 h-3.5 text-blue-400" />
              <span>Reglas del Simulador:</span>
            </div>
            <p>• Puntuación mínima para aprobar: <strong>70%</strong>.</p>
            <p>• Puedes marcar preguntas con la bandera para revisarlas antes de enviar.</p>
            <p>• Las preguntas falladas se guardarán en tu <em>Banco de Fallos</em>.</p>
          </div>
        </div>

        <button
          onClick={startExam}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/25 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Icon name="award" className="w-5 h-5 text-amber-300" />
          <span>Comenzar Simulación Ahora</span>
        </button>
      </div>
    );
  }

  // PANTALLA 2: EXAMEN EN VIVO
  if (examState === 'running') {
    const currentQ = examQuestions[currentIndex];
    const isFlagged = flagged.includes(currentQ.id);
    const answeredCount = Object.keys(answers).length;

    return (
      <div className="space-y-4">
        {/* Barra superior del examen */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center space-x-2">
            <Icon name="clock" className={`w-4 h-4 ${timeLeft < 300 ? 'text-rose-500 animate-pulse' : 'text-blue-400'}`} />
            <span className={`text-xs font-mono font-bold ${timeLeft < 300 ? 'text-rose-400' : 'text-slate-200'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="text-xs text-slate-400">
            <span>{answeredCount}/{examQuestions.length} Respondidas</span>
          </div>

          <button
            onClick={() => {
              if (confirm('¿Deseas finalizar la simulación y ver tu calificación?')) {
                finishExam();
              }
            }}
            className="text-[11px] font-bold bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500/25 px-2.5 py-1 rounded-lg transition-colors"
          >
            Finalizar
          </button>
        </div>

        {/* Tarjeta de Pregunta en Examen */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
              Pregunta {currentIndex + 1} de {examQuestions.length}
            </span>

            {/* Botón Marcar para revisión */}
            <button
              onClick={() => {
                triggerHaptic(15);
                setFlagged(prev => 
                  prev.includes(currentQ.id) ? prev.filter(id => id !== currentQ.id) : [...prev, currentQ.id]
                );
              }}
              className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border transition-colors ${
                isFlagged 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
            >
              <Icon name={isFlagged ? "flag-filled" : "flag"} className="w-3.5 h-3.5" />
              <span>{isFlagged ? 'Marcada' : 'Marcar para revisión'}</span>
            </button>
          </div>

          <p className="text-sm font-medium text-slate-100 leading-relaxed">
            {currentQ.question}
          </p>

          {/* Opciones */}
          <div className="space-y-2 pt-1">
            {currentQ.options.map(opt => {
              const isSelected = answers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    triggerHaptic(15);
                    setAnswers(prev => ({ ...prev, [currentQ.id]: opt.id }));
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start space-x-3 active:scale-99 ${
                    isSelected 
                      ? 'bg-blue-600/20 border-blue-500 text-blue-200 ring-1 ring-blue-500/50' 
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 ${
                    isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {opt.id}
                  </span>
                  <span className="leading-snug flex-1">{opt.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MATRIZ SELECTORA DE PREGUNTAS (QUICK NAVIGATOR) */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Navegador de Preguntas:</span>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar">
            {examQuestions.map((q, idx) => {
              const isAns = !!answers[q.id];
              const isFlg = flagged.includes(q.id);
              const isCur = idx === currentIndex;

              let btnClass = "bg-slate-950 text-slate-400 border-slate-800";
              if (isCur) btnClass = "ring-2 ring-blue-400 font-bold text-white";
              if (isAns) btnClass += " bg-blue-600/30 text-blue-300 border-blue-500/50";
              if (isFlg) btnClass += " border-amber-500 text-amber-300";

              return (
                <button
                  key={q.id}
                  onClick={() => { triggerHaptic(10); setCurrentIndex(idx); }}
                  className={`w-7 h-7 rounded-lg text-[10px] border flex items-center justify-center transition-all ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* NAVEGACIÓN ANTERIOR / SIGUIENTE */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => { triggerHaptic(10); if (currentIndex > 0) setCurrentIndex(prev => prev - 1); }}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40"
          >
            Anterior
          </button>

          {currentIndex === examQuestions.length - 1 ? (
            <button
              onClick={() => {
                if (confirm('¿Estás listo para finalizar y calificar la simulación?')) finishExam();
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
            >
              Finalizar y Calificar
            </button>
          ) : (
            <button
              onClick={() => { triggerHaptic(10); if (currentIndex < examQuestions.length - 1) setCurrentIndex(prev => prev + 1); }}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    );
  }

  // PANTALLA 3: RESULTADOS DE LA SIMULACIÓN
  if (examState === 'result' && examResult) {
    return (
      <div className="space-y-4 animate-fade-in">
        {/* Banner de Calificación */}
        <div className={`p-5 rounded-2xl border text-center space-y-3 ${
          examResult.passed 
            ? 'bg-gradient-to-br from-emerald-950/60 to-slate-900 border-emerald-500/40 shadow-xl shadow-emerald-500/10' 
            : 'bg-gradient-to-br from-rose-950/60 to-slate-900 border-rose-500/40 shadow-xl shadow-rose-500/10'
        }`}>
          <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full ${
            examResult.passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
          }`}>
            {examResult.passed ? '¡Aprobado!' : 'Requiere Refuerzo'}
          </span>

          <div className="text-4xl font-black text-white">
            {examResult.score}%
          </div>

          <p className="text-xs text-slate-300 max-w-xs mx-auto">
            {examResult.passed 
              ? 'Has superado el umbral estimado del 70% requerido en la certificación oficial de Google Cloud.' 
              : 'El examen oficial requiere aproximadamente 70%. Revisa tus fallos a continuación para reforzar tus puntos débiles.'}
          </p>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 block">Aciertos</span>
              <strong className="text-sm text-emerald-400">{examResult.correctCount}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Fallos</span>
              <strong className="text-sm text-rose-400">{examResult.wrongCount}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Tiempo</span>
              <strong className="text-sm text-slate-200">{formatTime(examResult.timeSpentSeconds)}</strong>
            </div>
          </div>
        </div>

        {/* Desglose por Dominios */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Rendimiento por Dominio</h4>
          <div className="space-y-2.5">
            {Object.entries(examResult.domainBreakdown).map(([dKey, dStat]) => {
              const pct = dStat.total > 0 ? Math.round((dStat.correct / dStat.total) * 100) : 0;
              return (
                <div key={dKey} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{DOMAINS[dKey]?.name || dKey}</span>
                    <span className={`font-bold ${pct >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {pct}% ({dStat.correct}/{dStat.total})
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${pct >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Botones de acción posterior */}
        <div className="space-y-2">
          <button
            onClick={() => setExamState('config')}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            <Icon name="refresh" className="w-4 h-4" />
            <span>Realizar Otra Simulación</span>
          </button>

          <button
            onClick={onFinish}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold text-xs transition-all text-center"
          >
            Volver a Estadísticas
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// ==================== VISTA 4: BANCO DE FALLOS ====================
function MistakesView({ mistakes, onRemoveMistake, onStartMistakesQuiz }) {
  const mistakeQuestions = useMemo(() => {
    return QUESTIONS.filter(q => mistakes.includes(q.id));
  }, [mistakes]);

  if (mistakes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
          <Icon name="check" className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-white">¡Banco de Fallos Limpio!</h3>
        <p className="text-xs text-slate-400 max-w-xs">
          No tienes preguntas erradas en este momento. Conforme practiques o realices simulaciones, los fallos se guardarán aquí automáticamente.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            Banco de Fallos
            <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full">
              {mistakes.length}
            </span>
          </h2>
          <p className="text-xs text-slate-400">Preguntas en las que has tenido dificultad</p>
        </div>

        <button
          onClick={onStartMistakesQuiz}
          className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg shadow-rose-600/30 active:scale-95 transition-all flex items-center gap-1"
        >
          <Icon name="book" className="w-3.5 h-3.5" />
          <span>Practicar Fallos</span>
        </button>
      </div>

      <div className="space-y-3">
        {mistakeQuestions.map(q => (
          <div key={q.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                {DOMAINS[q.domain]?.name || q.domain}
              </span>
              <button
                onClick={() => onRemoveMistake(q.id)}
                className="text-[10px] font-semibold text-slate-400 hover:text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800 transition-colors"
                title="Quitar de fallos"
              >
                Superada ✓
              </button>
            </div>
            <p className="text-xs font-medium text-slate-200 leading-relaxed">
              {q.question}
            </p>
            <div className="text-[11px] text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
              <strong>Concepto clave:</strong> {q.explanation.keyConcept}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== VISTA 5: ESTADÍSTICAS Y PROGRESO ====================
function StatsView({ stats, examResults, onResetProgress }) {
  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-base font-bold text-white">Tu Rendimiento y Progreso</h2>
        <p className="text-xs text-slate-400">Métricas detalladas por dominio temático</p>
      </div>

      {/* Tarjetas Principales */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Total Respondidas</span>
          <strong className="text-2xl font-black text-blue-400">{stats.totalAnswered}</strong>
          <span className="text-[10px] text-slate-400 block mt-0.5">de {QUESTIONS.length} preguntas</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Precisión General</span>
          <strong className={`text-2xl font-black ${stats.accuracy >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {stats.accuracy}%
          </strong>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            {stats.accuracy >= 70 ? 'Nivel Aprobatorio' : 'Meta: 70%'}
          </span>
        </div>
      </div>

      {/* Dominio por Dominio */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Progreso por Dominio</h3>
        <div className="space-y-3">
          {Object.entries(stats.domainStats).map(([dKey, dStat]) => (
            <div key={dKey} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-200 font-medium">{DOMAINS[dKey]?.name || dKey}</span>
                <span className="font-bold text-slate-300">
                  {dStat.accuracy}% ({dStat.correct}/{dStat.total})
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    dStat.accuracy >= 70 ? 'bg-emerald-500' : dStat.accuracy > 0 ? 'bg-amber-500' : 'bg-slate-700'
                  }`}
                  style={{ width: `${(dStat.answered / dStat.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historial de Simulaciones */}
      {examResults.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Historial de Simulaciones</h3>
          <div className="space-y-2">
            {examResults.map((res, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                <div>
                  <span className="font-semibold text-slate-200 block">{res.date}</span>
                  <span className="text-[10px] text-slate-400">{res.totalQuestions} preguntas • {res.correctCount} aciertos</span>
                </div>
                <div className={`font-black text-sm px-2 py-0.5 rounded-md ${
                  res.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {res.score}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reiniciar Progreso */}
      <button
        onClick={onResetProgress}
        className="w-full py-2.5 rounded-xl border border-slate-800 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 text-xs transition-colors"
      >
        Reiniciar Todo el Progreso
      </button>
    </div>
  );
}

// ==================== VISTA 6: GUÍA DE INSTALACIÓN IPHONE ====================
function GuideView() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-center py-2 space-y-1">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 mx-auto flex items-center justify-center text-blue-400">
          <Icon name="phone-install" className="w-6 h-6" />
        </div>
        <h2 className="text-base font-bold text-white">Instalar en tu iPhone sin App Store</h2>
        <p className="text-xs text-slate-400">Sigue estos 3 pasos para tener la app a pantalla completa y 100% offline</p>
      </div>

      <div className="space-y-3">
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
          <div className="text-xs text-slate-300">
            <strong className="text-white block mb-0.5">Abre el enlace en Safari</strong>
            Asegúrate de estar utilizando el navegador <strong>Safari</strong> en tu iPhone (Chrome en iOS no permite añadir con experiencia nativa completa).
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
          <div className="text-xs text-slate-300">
            <strong className="text-white block mb-0.5">Toca el botón Compartir</strong>
            En la barra inferior de Safari, toca el ícono de <strong>Compartir</strong> (el cuadrado con la flecha apuntando hacia arriba <Icon name="share" className="inline w-3.5 h-3.5 text-blue-400" />).
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
          <div className="text-xs text-slate-300">
            <strong className="text-white block mb-0.5">Selecciona "Añadir a pantalla de inicio"</strong>
            Desliza hacia abajo en las opciones y toca <strong>"Añadir a pantalla de inicio"</strong> (Add to Home Screen). ¡Listo! Aparecerá con su ícono en tu iPhone y abrirá a pantalla completa.
          </div>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
        <strong className="text-emerald-200 flex items-center gap-1">
          <Icon name="check" className="w-4 h-4 text-emerald-400" />
          <span>Ventajas de esta PWA:</span>
        </strong>
        <p>• Funciona completamente <strong>offline</strong> (sin internet).</p>
        <p>• No expira a los 7 días como las apps compiladas en Xcode.</p>
        <p>• Guarda tus resultados en tu propio iPhone con privacidad absoluta.</p>
      </div>
    </div>
  );
}

// Render en el DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
