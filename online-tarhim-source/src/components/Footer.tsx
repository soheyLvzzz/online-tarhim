import { useScrollReveal } from '../hooks/useScrollReveal';
import './Footer.css';

const quickLinks = [
  { id: 'ceremonies', label: 'مراسم ها' }, { id: 'services', label: 'خدمات' },
  { id: 'archive', label: 'آرشیو مجالس' }, { id: 'plans', label: 'پلن ها' },
];
const serviceLinks = [
  { id: 'ceremony', label: 'برگزاری مراسم' }, { id: 'poster', label: 'طراحی یادبود' },
  { id: 'live', label: 'پخش انلاین' }, { id: 'video', label: 'تدوین ویدیو' },
];

export function Footer({ onQuickLink, onService, onSocial }: {
  onQuickLink: (id: string) => void;
  onService: (id: string) => void;
  onSocial: (id: string) => void;
}) {
  const { sectionRef, reveal } = useScrollReveal();
  return (
    <footer ref={sectionRef} className="site-footer" lang="fa" dir="rtl" data-node-id="42:507" data-reveal={reveal}>
      <div className="site-footer__brand">
        <span className="site-footer__logo"><img src="./assets/logo.png" alt="" /></span>
        <div className="site-footer__brand-copy"><strong>آنلاین ترحیم</strong><p>برگزاری مراسم ترحیم و یادبود، با احترام به خاطره‌ها و همراهی عزیزان.</p></div>
      </div>
      <div className="site-footer__columns">
        <nav className="site-footer__column" aria-labelledby="footer-quick-title">
          <h2 id="footer-quick-title">دسترسی سریع</h2>
          <ul>{quickLinks.map(link => <li key={link.id}><button className="site-footer__link" type="button" onClick={() => onQuickLink(link.id)}>{link.label}</button></li>)}</ul>
        </nav>
        <nav className="site-footer__column" aria-labelledby="footer-services-title">
          <h2 id="footer-services-title">خدمات ما</h2>
          <ul>{serviceLinks.map(link => <li key={link.id}><button className="site-footer__link" type="button" onClick={() => onService(link.id)}>{link.label}</button></li>)}</ul>
        </nav>
        <div className="site-footer__column site-footer__contact">
          <h2>ارتباط با ما</h2>
          <p>تلفن : <a href="tel:09157362755"><bdi dir="ltr">09157362755</bdi></a></p>
          <p>ایمیل : <a href="mailto:online.tarhim@gmail.com"><bdi dir="ltr">online.tarhim@gmail.com</bdi></a></p>
          <div className="site-footer__socials">
            <button className="site-footer__social" type="button" aria-label="اینستاگرام آنلاین ترحیم" onClick={() => onSocial('instagram')}><img src="./assets/footer-instagram.svg" alt="" /></button>
            <button className="site-footer__social" type="button" aria-label="واتساپ آنلاین ترحیم" onClick={() => onSocial('whatsapp')}><img src="./assets/footer-whatsapp.svg" alt="" /></button>
          </div>
        </div>
      </div>
      <p className="site-footer__copyright">آنلاین ترحیم © 1399 قدرت گرفته از تیم جوان شرکت آریانا و با افتخار محصولی ایرانی</p>
    </footer>
  );
}
