import { useScrollReveal } from '../hooks/useScrollReveal';
import './Archive.css';

const ceremonies = ['ceremony-1', 'ceremony-2', 'ceremony-3', 'ceremony-4'];

/** Landing / Archive 51:284: first design card represents hover, not a selected card. */
export function Archive({ onView }: { onView: (ceremonyId: string) => void }) {
  const { sectionRef, reveal } = useScrollReveal();
  return (
    <section ref={sectionRef} className="memorial-archive" lang="fa" dir="rtl" aria-labelledby="archive-title" data-node-id="51:284" data-reveal={reveal}>
      <div className="memorial-archive__heading">
        <div className="memorial-archive__eyebrow">
          <img src="./assets/eyebrow-line.svg" alt="" />
          <span>آرشیو مجالس</span>
          <img src="./assets/eyebrow-line.svg" alt="" />
        </div>
        <h2 id="archive-title">یادهایی که همیشه زنده‌اند</h2>
      </div>
      <div className="memorial-archive__grid">
        {ceremonies.map((id, index) => (
          <article key={id} className="archive-card" aria-labelledby={`archive-${id}`}>
            <img className="archive-card__image" src="./assets/archive-ceremony.png" alt="شمع‌ها و یادگاری‌های مراسم یادبود" />
            <div className="archive-card__content">
              <h3 id={`archive-${id}`}>مراسم یادبود</h3>
              <p>تاریخ برگزاری : <bdi dir="ltr">1401/9/17</bdi></p>
              <div className="archive-card__divider" aria-hidden="true" />
              <button type="button" className="archive-card__view" onClick={() => onView(id)} aria-label={`مشاهده مراسم یادبود ${index + 1}`}>
                <span>مشاهده مراسم</span>
                <img src="./assets/archive-play.svg" alt="" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
