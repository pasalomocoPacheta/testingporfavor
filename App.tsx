
import React, { useState, useEffect } from 'react';
import { getKeystaticData } from './lib/keystatic';

// Global UI Elements
import { Cursor } from './components/ui/Cursor';
import { Background } from './components/ui/Background';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';

// Pages & Sections
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { TriviaGame } from './components/TriviaGame';
import { SectionRenderer } from './components/cms/SectionRenderer';

const App: React.FC = () => {
  const [view, setView] = useState('home');
  const [showGame, setShowGame] = useState(true);
  const [cmsData, setCmsData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar si estamos en modo admin vía URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }

    // Cargar datos del CMS
    getKeystaticData().then(data => setCmsData(data));
  }, []);

  const handleNavigation = (target: string) => {
    setView(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-2xl w-full text-center border-4 border-[#1C0445]">
          <h1 className="text-4xl font-display font-black text-[#1C0445] mb-4">BELUGA ADMIN</h1>
          <p className="text-lg mb-8 opacity-70">Aquí se montaría la interfaz de <b>Keystatic</b> para editar archivos locales o en GitHub.</p>
          <div className="space-y-4">
             <button onClick={() => window.location.search = ''} className="w-full py-4 bg-[#1C0445] text-white rounded-full font-bold hover:bg-[#CF0072] transition-colors">VOLVER A LA WEB</button>
             <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 text-sm text-yellow-800">
               Nota: En un entorno productivo, Keystatic requiere una configuración de servidor (Next.js/Astro) para guardar archivos.
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cmsData) return null;

  const activePage = cmsData.pages[view] || cmsData.pages['home'];

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans selection:bg-[#FFD100] selection:text-[#1C0445] flex flex-col">
      
      {/* Estilos Dinámicos desde CMS */}
      <style>{`
        :root {
          --primary-color: ${cmsData.settings.primaryColor};
          --accent-color: ${cmsData.settings.accentColor};
          --secondary-color: ${cmsData.settings.secondaryColor};
        }
      `}</style>

      <Background view={view as any} />
      <Cursor />

      {showGame ? (
        <TriviaGame onComplete={() => setShowGame(false)} />
      ) : (
        <>
          <Menu 
            onNavigate={handleNavigation} 
            links={cmsData.navigation.links}
          />

          <main className="relative z-40 flex-grow">
              {/* Si la página tiene secciones definidas en CMS, las renderizamos */}
              {activePage?.sections ? (
                <div className="pt-20">
                  {activePage.sections.map((section: any, idx: number) => (
                    <SectionRenderer key={idx} section={section} />
                  ))}
                </div>
              ) : (
                <>
                  {view === 'home' && <Home />}
                  {view === 'services' && <Services />}
                  {view === 'contact' && <Contact />}
                </>
              )}
          </main>

          <Footer 
            text={cmsData.settings.footerText} 
            color={cmsData.settings.accentColor} 
          />

          {/* Botón flotante para editores (Solo visible en desarrollo o con truco) */}
          <button 
            onClick={() => window.location.search = '?admin=true'}
            className="fixed bottom-4 right-4 z-[100] w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 hover:opacity-100 transition-opacity"
          >
            ⚙️
          </button>
        </>
      )}

    </div>
  );
};

export default App;
