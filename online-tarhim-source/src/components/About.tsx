import { useEffect, useRef, useState } from 'react';
import './About.css';

/** Landing / About-us, Figma node 21:229. Immediately follows the 1024px hero. */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reveal, setReveal] = useState<'visible' | 'pending' | 'entered'>('visible');

  useEffect(() => {
    const section = sectionRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!section || preference.matches || !('IntersectionObserver' in window)) return;

    setReveal('pending');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setReveal('entered');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(section);
    const handlePreference = () => {
      if (preference.matches) {
        setReveal('visible');
        observer.disconnect();
      }
    };
    preference.addEventListener('change', handlePreference);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', handlePreference);
    };
  }, []);

  return (
    <section ref={sectionRef} className="memorial-about" lang="fa" dir="rtl" aria-labelledby="about-title" data-node-id="21:229" data-reveal={reveal}>
      <div className="section-backdrop" aria-hidden="true">
        <img className="memorial-about__background" src="./assets/about-background.jpg" alt="" />
        <div className="memorial-about__shade" />
      </div>
      <div className="memorial-about__content">
        <div className="memorial-about__eyebrow" data-node-id="4:214">
          <span>درباره آنلاین ترحیم</span>
          <img src="./assets/eyebrow-line.svg" alt="" aria-hidden="true" />
        </div>
        <h2 id="about-title">همراه شما، حتی در فاصله‌ها</h2>
        <p className="memorial-about__intro">
          آنلاین ترحیم با هدف فراهم‌کردن امکان برگزاری مراسم یادبود به‌صورت آنلاین شکل گرفته است تا خانواده‌ها و عزیزانشان، حتی زمانی که امکان حضور در کنار یکدیگر را ندارند، بتوانند در لحظات سوگواری و یادبود همراه هم باشند.
        </p>
        <p className="memorial-about__details">
          ما تلاش می‌کنیم با فراهم‌کردن بستری ساده و قابل‌اعتماد برای هماهنگی مراسم، انتخاب مداح و مجری، پخش زنده و دعوت از مهمانان، شرایطی فراهم کنیم تا خانواده‌ها با آرامش بیشتری مراسم عزیزان خود را برگزار کنند. باور داریم فاصله‌ها نباید مانع همدلی، همدردی و زنده نگه‌داشتن یاد عزیزانمان شوند.
        </p>
        <p className="memorial-about__closing">فاصله ها ، مانع همدلی نیستند.</p>
      </div>
    </section>
  );
}
