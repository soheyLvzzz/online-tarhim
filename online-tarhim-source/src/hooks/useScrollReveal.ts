import { useEffect, useRef, useState } from 'react';

export function useScrollReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reveal, setReveal] = useState<'visible' | 'pending' | 'entered'>('visible');
  useEffect(() => {
    const section = sectionRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!section || preference.matches || !('IntersectionObserver' in window)) return;
    let settled = false;
    setReveal('pending');
    const observer = new IntersectionObserver(([entry]) => {
      if (!settled && entry?.isIntersecting) { setReveal('entered'); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(section);
    // Interaction permanently settles the entrance, so focus/blur cannot replay it.
    const settle = () => {
      settled = true;
      observer.disconnect();
      setReveal('visible');
    };
    section.addEventListener('pointerdown', settle, { capture: true });
    section.addEventListener('focusin', settle, { capture: true });
    const handlePreference = () => {
      if (preference.matches) settle();
    };
    preference.addEventListener('change', handlePreference);
    return () => {
      observer.disconnect();
      section.removeEventListener('pointerdown', settle, { capture: true });
      section.removeEventListener('focusin', settle, { capture: true });
      preference.removeEventListener('change', handlePreference);
    };
  }, []);
  return { sectionRef, reveal };
}
