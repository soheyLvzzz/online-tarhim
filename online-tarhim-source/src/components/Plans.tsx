import './Plans.css';
import { useScrollReveal } from '../hooks/useScrollReveal';

export type PlanId = 'simple' | 'special' | 'custom';
interface Plan {
  id: PlanId;
  title: string;
  description: string;
  features: string[];
  price: string;
}
const plans: Plan[] = [
  {
    id: 'simple', title: 'مراسم ساده',
    description: 'مناسب برای برگزاری مجالس یادبود صمیمی و خانوادگی با امکانات اصلی پخش و اطلاع‌رسانی.',
    features: [
      'اختصاص صفحه یادبود و لینک دعوت اختصاصی',
      'حضور مداح یا قاری منتخب',
      'پخش آنلاین مراسم با کیفیت استاندارد',
      'طراحی پوستر و اعلامیه یادبود دیجیتال',
      'ثبت پیام‌های تسلیت مهمانان در دفتر یادبود',
    ], price: '2.400.000',
  },
  {
    id: 'special', title: 'مراسم ویژه',
    description: 'پکیج کامل میزبانی مراسم ترحیم با حضور مجری، مداح، تدوین ویدیوی خاطرات و آرشیو دائمی.',
    features: [
      'کارگردانی و پخش آنلاین چنددوربینه',
      'طراحی اختصاصی پوستر یادبود و دعوت‌نامه',
      'تدوین ویدیوی یادبود از تصاویر و خاطرات',
      'آرشیو کامل ویدیویی مراسم و پیام‌های تسلیت',
      'پشتیبانی و هماهنگی اختصاصی در تمام مراحل',
    ], price: '4.500.000',
  },
  {
    id: 'custom', title: 'مراسم اختصاصی',
    description: 'برنامه‌ریزی کاملاً سفارشی برای مجالس بزرگداشت، پوشش همزمان مراسم حضوری و خدمات ویژه.',
    features: [
      'انتخاب اساتید، سخنرانان و مداحان برجسته کشوری',
      'امکان پوشش تصویری از محل برگزاری مورد نظر شما',
      'تولید مستند کوتاه یادبود و بسته‌های گرافیکی کامل',
      'مدیریت دعوت و اطلاع‌رسانی اختصاصی به مهمانان',
      'نگهداری ماندگار در آرشیو اختصاصی با حریم خصوصی',
    ], price: '8.100.000',
  },
];

function PlanCard({ plan, onRequest }: { plan: Plan; onRequest: (id: PlanId) => void }) {
  return (
    <article className="plan-card" aria-labelledby={`plan-${plan.id}`}>
      {plan.id === 'special' && <span className="plan-card__badge">انتخاب متداول خانواده ها</span>}
      <h3 id={`plan-${plan.id}`}>{plan.title}</h3>
      <p className="plan-card__description">{plan.description}</p>
      <div className="plan-card__divider" aria-hidden="true" />
      <ul className="plan-card__features">
        {plan.features.map(feature => <li key={feature}><img src="./assets/plan-bullet.svg" alt="" aria-hidden="true" /><span>{feature}</span></li>)}
      </ul>
      <div className="plan-card__price"><span>قیمت :</span><strong><bdi dir="ltr">{plan.price}</bdi>تومان</strong></div>
      <button className="plan-card__request" type="button" onClick={() => onRequest(plan.id)} aria-label={`درخواست ${plan.title}`}>درخواست این مراسم</button>
    </article>
  );
}

export function Plans({ onRequestPlan }: { onRequestPlan: (id: PlanId) => void }) {
  const { sectionRef, reveal } = useScrollReveal();
  return (
    <section ref={sectionRef} className="memorial-plans" lang="fa" dir="rtl" aria-labelledby="plans-title" data-node-id="4:114" data-reveal={reveal}>
      <div className="memorial-plans__heading">
        <div className="memorial-plans__eyebrow"><img src="./assets/eyebrow-line.svg" alt="" /><span>انتخاب پلن مراسم</span><img src="./assets/eyebrow-line.svg" alt="" /></div>
        <h2 id="plans-title">پلن های مراسم</h2>
      </div>
      <div className="memorial-plans__grid">{plans.map(plan => <PlanCard key={plan.id} plan={plan} onRequest={onRequestPlan} />)}</div>
    </section>
  );
}
