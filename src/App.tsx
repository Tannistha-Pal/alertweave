import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Activity, AlertTriangle, Layers, SlidersHorizontal, Cpu, BookOpen, Award, HelpCircle, Lock, User, LogOut, ChevronRight, Menu, X, Bell, Home, ArrowLeft, Bot } from 'lucide-react';

// Import subcomponents
import LandingPage from './components/LandingPage';
import DashboardView from './components/DashboardView';
import IncidentListView from './components/IncidentListView';
import IncidentDetailsView from './components/IncidentDetailsView';
import NetworkGraphView from './components/NetworkGraphView';
import MitreMatrixView from './components/MitreMatrixView';
import AnalyticsView from './components/AnalyticsView';
import ResearchView from './components/ResearchView';
import PatentView from './components/PatentView';
import AboutContactView from './components/AboutContactView';
import AuthView from './components/AuthView';
import WeaveAIChatbot from './components/WeaveAIChatbot';
import WeaveAIChatWorkspace from './components/WeaveAIChatWorkspace';
import AlertWeaveLogo from './components/AlertWeaveLogo';

// Import store
import { useAlertWeaveStore, ViewState } from './data/store';

export default function App() {
  const {
    currentView,
    activeIncidentId,
    isLoggedIn,
    userEmail,
    sidebarOpen,
    notificationsOpen,
    notifications,
    incidents,
    setCurrentView,
    goBack,
    setActiveIncidentId,
    setIsLoggedIn,
    setUserEmail,
    setSidebarOpen,
    setNotificationsOpen,
    triggerTelemetryPing
  } = useAlertWeaveStore();

  const mainRef = React.useRef<HTMLDivElement>(null);

  // Periodic Telemetry Ingestion Loop for a "Living" SOC dashboard
  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      triggerTelemetryPing();
    }, 3500);
    return () => clearInterval(telemetryInterval);
  }, [triggerTelemetryPing]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView]);

  const selectedIncident = incidents.find((inc) => inc.id === activeIncidentId) || incidents[0];

  const handleNavigate = (view: ViewState, pushToHistory = true) => {
    setCurrentView(view, pushToHistory);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleGoBack = () => {
    goBack();
  };

  const handleSelectIncident = (incId: string) => {
    setActiveIncidentId(incId);
    handleNavigate('details');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    handleNavigate('dashboard');
  };


  const menuItems = [
    { view: 'dashboard', label: 'SOC Cockpit', icon: Activity },
    { view: 'chat', label: 'WeaveAI Co-pilot', icon: Bot },
    { view: 'incidents', label: 'Incident Hub', icon: AlertTriangle },
    { view: 'graph', label: 'Causal Graph', icon: Layers },
    { view: 'mitre', label: 'MITRE Matrix', icon: Shield },
    { view: 'analytics', label: 'Threat Metrics', icon: SlidersHorizontal },
    { view: 'patent', label: 'Patent IP', icon: Award },
    { view: 'research', label: 'Academic Core', icon: BookOpen },
    { view: 'about', label: 'Company & Contact', icon: HelpCircle }
  ] as const;

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 font-sans select-none overflow-x-hidden antialiased">
      
      {/* 1. LANDING PAGE VIEW COVER */}
      {currentView === 'landing' ? (
        <LandingPage 
          onEnterDashboard={() => handleNavigate('dashboard')} 
          onEnterAuth={() => handleNavigate('auth')} 
          onEnterAbout={() => handleNavigate('about')}
        />
      ) : (
        
        /* 2. SECURITY COCKPIT MAIN SHELL (SIDEBAR & HEADER FRAME) */
        <div className="min-h-screen flex flex-col relative">
          
          {/* Cyber scanner grids background */}
          <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyber-blue/5 rounded-full blur-[140px] pointer-events-none" />

          {/* Top Global Navigation Bar */}
          <header className="sticky top-0 z-40 glass-navbar px-6 py-3.5 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              {/* Sidebar collapse button */}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded-lg border border-white/5 text-slate-400 hover:text-white transition-colors"
                title="Toggle Navigation Rails"
              >
                {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

              {/* Universal Back button (Arrow sign, no text) */}
              <button 
                onClick={handleGoBack}
                className="p-1.5 bg-[#151B2F] hover:bg-cyber-blue hover:text-slate-950 rounded-lg border border-cyber-blue/20 text-cyber-blue transition-all flex items-center justify-center cursor-pointer active:scale-95"
                title="Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div 
                className="flex items-center gap-2.5 cursor-pointer group ml-1"
                onClick={() => {
                  handleNavigate('dashboard');
                  if (mainRef.current) {
                    mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                title="Return to SOC Cockpit & Scroll to Top"
              >
                <div className="w-8 h-8 bg-[#050816] border border-cyber-blue/30 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <AlertWeaveLogo className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-display font-bold text-sm tracking-wide text-white group-hover:text-cyber-blue transition-colors">AlertWeave</span>
                  <span className="block text-[8px] font-mono tracking-widest text-cyber-blue uppercase font-bold">Causal XDR</span>
                </div>
              </div>
            </div>

            {/* Right Tools HUD */}
            <div className="flex items-center gap-3">
              {/* Return to Showcase Hub Button */}
              <button
                id="btn-header-showcase"
                onClick={() => handleNavigate('landing')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/40 hover:bg-slate-800 text-xs text-cyber-blue hover:text-white border border-cyber-blue/30 rounded-xl transition-all cursor-pointer font-mono"
                title="Return to Landing Page & Showcase"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline font-bold">Showcase Hub</span>
              </button>

              {/* UTC Clock */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-950/60 rounded-xl border border-white/5 font-mono text-[10px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                <span>UTC: {new Date().toISOString().slice(11, 19)}</span>
              </div>

              {/* Notification Pulse */}
              <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl border border-white/5 text-slate-400 hover:text-white transition-colors relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-cyber-red rounded-full animate-ping" />
                </button>

                {/* Notifications panel toggle */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#0b0f19]/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl z-50 space-y-3 font-mono text-[11px] text-left">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-white font-bold">SYSTEM TELEMETRY ALERTS</span>
                      <span className="text-[9px] text-cyber-red font-bold animate-pulse">
                        {notifications.length} ACTIVE
                      </span>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="text-center py-4 text-slate-500 text-[10px]">
                          NO ACTIVE THREAT DETECTED
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`p-2.5 bg-slate-950/80 rounded-xl border border-white/5 ${
                              notif.severity === 'critical' ? 'border-l-2 border-l-cyber-red' :
                              notif.severity === 'high' ? 'border-l-2 border-l-cyber-orange' : 'border-l-2 border-l-cyber-blue'
                            }`}
                          >
                            <div className="flex justify-between text-[8px] text-slate-500 mb-0.5">
                              <span>{notif.title}</span>
                              <span>{notif.timestamp}</span>
                            </div>
                            <p className="text-white font-bold leading-tight">{notif.description}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <button 
                      onClick={() => {
                        setNotificationsOpen(false);
                        handleNavigate('incidents');
                      }}
                      className="w-full text-center py-1 text-cyber-blue hover:underline text-[10px] font-bold"
                    >
                      View All in Incident Queue
                    </button>
                  </div>
                )}
              </div>

              {/* Profile controller */}
              <button
                id="btn-header-profile"
                onClick={() => handleNavigate('auth')}
                className={`flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 rounded-xl border border-white/5 text-xs text-slate-300 hover:text-white transition-all ${
                  currentView === 'auth' ? 'border-cyber-blue text-cyber-blue' : ''
                }`}
              >
                <User className="w-4 h-4 text-cyber-blue" />
                <span className="hidden md:inline font-mono truncate max-w-[120px]">{userEmail}</span>
              </button>
            </div>
          </header>

          {/* Main Body with collapsible sidebar */}
          <div className="flex-1 flex min-h-0 relative">
            
            {/* Mobile Sidebar Backdrop */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 top-[71px] bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-all duration-300"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Collapsible Left Rail / Sidebar */}
            <aside 
              className={`fixed lg:relative top-[71px] lg:top-0 left-0 bottom-0 z-40 shrink-0 transition-all duration-300 flex flex-col justify-between ${
                sidebarOpen ? 'w-60 translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0 lg:w-16'
              } overflow-hidden bg-[#050816]/95 lg:bg-[#111220]/40 backdrop-blur-md border-r border-white/10 lg:border-white/5`}
            >
              {/* Menu items */}
              <nav className="p-3 space-y-1 text-xs">
                {/* Special Return to Showcase Button */}
                <button
                  id="sidebar-item-showcase"
                  onClick={() => handleNavigate('landing')}
                  className="w-full px-3.5 py-3 rounded-xl flex items-center gap-3 transition-all text-left hover:bg-slate-900 border border-transparent text-cyber-purple hover:text-white cursor-pointer"
                  title="Return to Main Showcase"
                >
                  <Home className="w-4.5 h-4.5 shrink-0 text-cyber-purple" />
                  <span className={`font-mono tracking-wide text-[11px] whitespace-nowrap transition-opacity ${
                    sidebarOpen ? 'opacity-100' : 'lg:opacity-0 pointer-events-none'
                  }`}>
                    Showcase Hub
                  </span>
                </button>
                <div className="h-px bg-white/5 my-2" />

                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.view || (item.view === 'incidents' && currentView === 'details');
                  
                  return (
                    <button
                      key={item.view}
                      id={`sidebar-item-${item.view}`}
                      onClick={() => handleNavigate(item.view)}
                      className={`w-full px-3.5 py-3 rounded-xl flex items-center gap-3 transition-all text-left ${
                        isActive 
                          ? 'bg-[#151B2F] border border-cyber-blue/30 text-cyber-blue font-bold shadow-[0_0_15px_rgba(0,229,255,0.05)]' 
                          : 'hover:bg-slate-900 border border-transparent text-slate-400 hover:text-white'
                      }`}
                      title={item.label}
                    >
                      <Icon className="w-4.5 h-4.5 shrink-0" />
                      <span className={`font-mono tracking-wide text-[11px] whitespace-nowrap transition-opacity ${
                        sidebarOpen ? 'opacity-100' : 'lg:opacity-0 pointer-events-none'
                      }`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar footer branding */}
              <div className="p-4 border-t border-white/5 text-[9px] font-mono text-slate-600 text-center">
                <span className={`block uppercase ${sidebarOpen ? '' : 'lg:hidden'}`}>AlertWeave Engine</span>
                <span className={`block ${sidebarOpen ? '' : 'lg:hidden'}`}>v2.4.0-COGNITIVE</span>
              </div>
            </aside>

            {/* Central content canvas viewport */}
            <main ref={mainRef} className="flex-1 overflow-y-auto px-4 md:px-10 py-6 md:py-8 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-7xl mx-auto"
                >
                  
                  {/* VIEW DISPATCHER */}
                  {currentView === 'dashboard' && (
                    <DashboardView 
                      onSelectIncident={handleSelectIncident} 
                      onNavigateToView={(view) => handleNavigate(view)}
                    />
                  )}

                  {currentView === 'incidents' && (
                    <IncidentListView 
                      activeIncidentId={activeIncidentId}
                      onSelectIncident={setActiveIncidentId}
                      onNavigateToDetails={() => handleNavigate('details')}
                      onBack={handleGoBack}
                    />
                  )}

                  {currentView === 'details' && (
                    <IncidentDetailsView 
                      incidentId={activeIncidentId}
                      onBackToList={handleGoBack}
                    />
                  )}

                  {currentView === 'graph' && (
                    <NetworkGraphView 
                      nodes={selectedIncident.nodes} 
                      edges={selectedIncident.edges} 
                      onBack={handleGoBack}
                    />
                  )}

                  {currentView === 'mitre' && (
                    <MitreMatrixView onBack={handleGoBack} />
                  )}

                  {currentView === 'analytics' && (
                    <AnalyticsView onBack={handleGoBack} />
                  )}

                  {currentView === 'research' && (
                    <ResearchView onBack={handleGoBack} />
                  )}

                  {currentView === 'patent' && (
                    <PatentView onBack={handleGoBack} />
                  )}

                  {currentView === 'chat' && (
                    <WeaveAIChatWorkspace onBack={handleGoBack} />
                  )}

                  {currentView === 'about' && (
                    <AboutContactView onBack={handleGoBack} />
                  )}

                  {currentView === 'auth' && (
                    <AuthView 
                      userEmail={userEmail}
                      isLoggedIn={isLoggedIn}
                      onLoginSuccess={handleLoginSuccess}
                      onLogout={() => {
                        setIsLoggedIn(false);
                        handleNavigate('landing');
                      }}
                      onUpdateEmail={(email) => setUserEmail(email)}
                      onBack={handleGoBack}
                    />
                  )}

                </motion.div>
              </AnimatePresence>
            </main>

          </div>

        </div>
      )}

      {/* Global AI Copilot Chatbot */}
      <WeaveAIChatbot />

    </div>
  );
}
