import { useScrollReveal } from '../hooks/useScrollReveal';
import './News.css';

const articles = [
  { id: 'remembrance-traditions', category: 'فرهنگ و آیین', title: 'آیین‌های یادبود؛ راهی برای زنده نگه داشتن خاطرات' },
  { id: 'digital-memorial', category: 'راهنمای خانواده', title: 'چطور صفحه یادبود دیجیتال بسازیم؟' },
  { id: 'platform-updates', category: 'اخبار مجموعه', title: 'تازه‌ترین امکانات سامانه آنلاین ترحیم' },
];

function ReadArticle({ id, title, onRead }: { id: string; title: string; onRead: (id: string) => void }) {
  return (
    <button className="news-read" type="button" onClick={() => onRead(id)} aria-label={`مطالعه مقالهٔ ${title}`}>
      <span>مطالعه مقاله</span><img src="./assets/service-arrow.svg" alt="" />
    </button>
  );
}

export function News({ onRead }: { onRead: (articleId: string) => void }) {
  const { sectionRef, reveal } = useScrollReveal();
  const featuredTitle = 'چگونه مراسم یادبود را به‌صورت آنلاین برگزار کنیم؟';
  return (
    <section ref={sectionRef} className="memorial-news" lang="fa" dir="rtl" aria-labelledby="news-title" data-node-id="72:458" data-reveal={reveal}>
      <div className="memorial-news__heading">
        <div className="memorial-news__eyebrow"><span>آخرین اخبار</span><img src="./assets/eyebrow-line.svg" alt="" /></div>
        <h2 id="news-title">اخبار آنلاین ترحیم</h2>
      </div>
      <div className="memorial-news__grid">
        <article className="news-featured" aria-labelledby="featured-title">
          <img className="news-featured__image" src="./assets/news-candles.jpg" alt="شمع‌های روشن یادبود" />
          <div className="news-featured__meta"><span>راهنمای برگزاری</span><span className="news-featured__date"><bdi dir="ltr">1405/08/12</bdi></span></div>
          <h3 id="featured-title">{featuredTitle}</h3>
          <p>راهنمایی برای برگزاری مراسمی محترمانه و فراهم کردن امکان همراهی عزیزان از هر نقطه.</p>
          <ReadArticle id="online-ceremony-guide" title={featuredTitle} onRead={onRead} />
        </article>
        <div className="memorial-news__list">
          {articles.map(article => (
            <article className="news-item" key={article.id} aria-labelledby={`news-${article.id}`}>
              <p className="news-item__category">{article.category}</p>
              <h3 id={`news-${article.id}`}>{article.title}</h3>
              <ReadArticle id={article.id} title={article.title} onRead={onRead} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
