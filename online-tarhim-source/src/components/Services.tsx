import { useScrollReveal } from '../hooks/useScrollReveal';
import './Services.css';

export type ServiceId = 'ceremony' | 'host' | 'live' | 'poster' | 'video' | 'archive';
interface Service { id: ServiceId; icon: string; title: string; description: string; }
const services: Service[] = [
  { id: 'ceremony', icon: './assets/service-ceremony.svg', title: 'برگزاری مراسم ترحیم', description: 'برنامه‌ریزی و اجرای کامل مجالس ختم، سوم، هفتم، چهلم و سالگرد با رعایت کامل آداب اصیل ایرانی و اسلامی در فضایی آرام و درخور شأن.' },
  { id: 'host', icon: './assets/service-host.svg', title: 'انتخاب مجری و مداح', description: 'امکان انتخاب از میان قاریان، سخنرانان و مداحان خوش‌نام و باسابقه متناسب با سلیقه، فرهنگ و سنت خانوادگی شما.' },
  { id: 'live', icon: './assets/service-live.svg', title: 'پخش آنلاین مراسم', description: 'پوشش تصویری و صوتی پایدار با لینک اختصاصی دعوت، جهت حضور آسان اقوام و دوستانی که در شهرها یا کشورهای دیگر سکونت دارند.' },
  { id: 'poster', icon: './assets/service-poster.svg', title: 'طراحی پوستر یادبود', description: 'طراحی اختصاصی اعلامیه ترحیم، کتیبه و دعوت‌نامه دیجیتال با تایپوگرافی فاخر فارسی و صفحه‌آرایی متین برای ارسال به بستگان.' },
  { id: 'video', icon: './assets/service-video.svg', title: 'تدوین ویدیوی یادبود', description: 'ساخت و تدوین فیلم کوتاه زندگی‌نامه و مرور خاطرات ارزشمند از تصاویر و فیلم‌های خانوادگی، جهت پخش در جریان مراسم.' },
  { id: 'archive', icon: './assets/service-archive.svg', title: 'آرشیو و نگهداری مراسم', description: 'ضبط کامل مراسم، گردآوری پیام‌های تسلیت مهمانان و نگهداری امن در صفحه یادبود اختصاصی به عنوان یادگاری ماندگار برای خانواده.' },
];

function ServiceCard({ service, onMore }: { service: Service; onMore: (id: ServiceId) => void }) {
  return (
    <article className="service-card" aria-labelledby={`service-${service.id}`}>
      <div className="service-card__icon" aria-hidden="true">
        <img className="service-card__icon-frame" src="./assets/service-icon-frame.svg" alt="" />
        <img className="service-card__icon-symbol" src={service.icon} alt="" />
      </div>
      <h3 id={`service-${service.id}`}>{service.title}</h3>
      <p>{service.description}</p>
      <div className="service-card__more-row">
        <button type="button" className="service-card__more" onClick={() => onMore(service.id)} aria-label={`اطلاعات بیشتر دربارهٔ ${service.title}`}>اطلاعات بیشتر</button>
        <img src="./assets/service-arrow.svg" alt="" aria-hidden="true" />
      </div>
    </article>
  );
}

/** Figma Landing / Services 4:211. Six services in their original RTL order. */
export function Services({ onMore }: { onMore: (id: ServiceId) => void }) {
  const { sectionRef, reveal } = useScrollReveal();
  return (
    <section ref={sectionRef} className="memorial-services" lang="fa" dir="rtl" aria-labelledby="services-title" data-node-id="4:211" data-reveal={reveal}>
      <div className="memorial-services__heading">
        <div className="memorial-services__eyebrow"><span>خدمات تکمیلی یادبود</span><img src="./assets/eyebrow-line.svg" alt="" /></div>
        <h2 id="services-title">سایر خدمات</h2>
      </div>
      <div className="memorial-services__grid">{services.map(service => <ServiceCard key={service.id} service={service} onMore={onMore} />)}</div>
    </section>
  );
}
