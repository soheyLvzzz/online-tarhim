import './Hero.css';

export interface HeroProps {
  onRequestCeremony: () => void;
  onViewLiveCeremonies: () => void;
}

/** Figma: Landing / Hero, node 4:35. Desktop: 1440 × 1024. */
export function Hero({ onRequestCeremony, onViewLiveCeremonies }: HeroProps) {
  return (
    <section className="memorial-hero" lang="fa" dir="rtl" aria-labelledby="hero-title" data-node-id="4:35">
      <div className="section-backdrop" aria-hidden="true">
        <img className="memorial-hero__background" src="./assets/hero-candles.jpg" alt="" />
        <div className="memorial-hero__shade" />
      </div>
      <div className="memorial-hero__content">
        <div className="memorial-hero__eyebrow">
          <span>برگزاری محترمانه مجالس ترحیم و بزرگداشت</span>
          <img src="./assets/eyebrow-line.svg" alt="" aria-hidden="true" />
        </div>
        <h1 id="hero-title">یاد عزیزانتان را ،<br />با احترام گرامی بدارید .</h1>
        <p className="memorial-hero__description">
          برگزاری آنلاین مراسم ترحیم و یادبود، همراه با خدمات تخصصی از انتخاب مجری و مداح تا پخش زنده مراسم، تا خانواده‌ها و عزیزانشان بتوانند از هر فاصله‌ای در کنار یکدیگر باشند و یاد درگذشتگان خود را گرامی بدارند.
        </p>
        <div className="memorial-hero__actions">
          <button className="memorial-hero__button memorial-hero__button--primary" onClick={onRequestCeremony} type="button">درخواست برگزاری مراسم</button>
          <button className="memorial-hero__button memorial-hero__button--secondary" onClick={onViewLiveCeremonies} type="button">مراسم های درحال اجرا</button>
        </div>
      </div>
    </section>
  );
}
