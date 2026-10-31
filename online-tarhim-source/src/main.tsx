import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Hero } from './components/Hero';
import { Header, type NavigationTarget } from './components/Header';
import { About } from './components/About';
import { Plans } from './components/Plans';
import { Services } from './components/Services';
import { Archive } from './components/Archive';
import { News } from './components/News';
import { TrackRecord } from './components/TrackRecord';
import { Footer } from './components/Footer';
import './styles.css';
import './motion.css';

// The hero preview exposes integration events; destination screens are outside its scope.
function navigate(target: NavigationTarget) {
  if (target === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
  window.dispatchEvent(new CustomEvent('tarhim:navigate', { detail: { target } }));
}

function footerNavigate(target: string) {
  if (target === 'ceremonies') { navigate('live'); return; }
  const sections: Record<string, string> = { services: '.memorial-services', archive: '.memorial-archive', plans: '.memorial-plans' };
  if (!sections[target]) return;
  const section = document.querySelector(sections[target]);
  section?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="landing-preview">
      <Header onNavigate={navigate} />
      <Hero onRequestCeremony={() => navigate('request')} onViewLiveCeremonies={() => navigate('live')} />
      <About />
      <Plans onRequestPlan={planId => window.dispatchEvent(new CustomEvent('tarhim:request-plan', { detail: { planId } }))} />
      <Services onMore={serviceId => window.dispatchEvent(new CustomEvent('tarhim:service-details', { detail: { serviceId } }))} />
      <Archive onView={ceremonyId => window.dispatchEvent(new CustomEvent('tarhim:view-archive', { detail: { ceremonyId } }))} />
      <News onRead={articleId => window.dispatchEvent(new CustomEvent('tarhim:read-article', { detail: { articleId } }))} />
      <TrackRecord />
      <Footer onQuickLink={footerNavigate}
        onService={serviceId => window.dispatchEvent(new CustomEvent('tarhim:service-details', { detail: { serviceId } }))}
        onSocial={platform => window.dispatchEvent(new CustomEvent('tarhim:social', { detail: { platform } }))} />
    </main>
  </StrictMode>,
);
