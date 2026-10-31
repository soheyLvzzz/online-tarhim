import './TrackRecord.css';

const statistics = [
  { value: '7+', label: 'سال حضور مستمر', width: 151 },
  { value: '10+', label: 'مراسم به صورت همزمان', width: 204 },
  { value: '1001+', label: 'برگزاری مراسم', width: 142 },
  { value: '200.000', label: 'نفر مهمان', width: 220 },
];

/** Figma karnameh 30:315. Static by request: no reveal hook or count-up. */
export function TrackRecord() {
  return (
    <section className="memorial-record" lang="fa" dir="rtl" aria-labelledby="record-title" data-node-id="30:315">
      <div className="memorial-record__heading">
        <div className="memorial-record__eyebrow"><img src="./assets/eyebrow-line.svg" alt="" /><span>افتخارات آنلاین ترحیم</span><img src="./assets/eyebrow-line.svg" alt="" /></div>
        <h2 id="record-title">کارنامه آنلاین ترحیم</h2>
        <p>سال ها تجربه هزاران همراه و صدها مراسم برگزار شده .</p>
      </div>
      <dl className="memorial-record__statistics">
        {statistics.map(stat => (
          <div className="memorial-record__stat" key={stat.label} style={{ width: stat.width }}>
            <dt>{stat.label}</dt>
            <dd><span className="memorial-record__number" dir="ltr" aria-label={stat.value}>
              <bdi dir="ltr">{stat.value.replace('+', '')}</bdi>
              {stat.value.endsWith('+') && <span className="memorial-record__plus" aria-hidden="true">+</span>}
            </span></dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
