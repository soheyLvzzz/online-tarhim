import './Header.css';

export type NavigationTarget = 'home' | 'live' | 'memorial' | 'request' | 'contact' | 'blog';
export interface HeaderProps {
  onNavigate: (target: NavigationTarget) => void;
  phoneIconSrc?: string;
}
const navigation: { target: NavigationTarget; label: string }[] = [
  { target: 'home', label: 'صفحه اصلی' },
  { target: 'live', label: 'مراسم های درحال اجرا' },
  { target: 'memorial', label: 'صفحه یادبود' },
  { target: 'request', label: 'درخواست برگزاری مجلس' },
  { target: 'contact', label: 'تماس با ما' },
  { target: 'blog', label: 'بلاگ' },
];

export function Header({ onNavigate, phoneIconSrc = './assets/phone.svg' }: HeaderProps) {
  return (
    <header className="site-header" lang="fa" dir="rtl" data-node-id="4:20">
      <button className="site-header__brand" type="button" onClick={() => onNavigate('home')} aria-label="آنلاین ترحیم، صفحه اصلی">
        <span className="site-header__logo"><img src="./assets/logo.png" alt="" /></span>
        <span className="site-header__brand-copy">
          <strong>آنلاین ترحیم</strong>
          <span>برگزاری مجالس ترحیم به صورت انلاین</span>
        </span>
      </button>
      <nav className="site-header__navigation" aria-label="منوی اصلی">
        {navigation.map(({ target, label }) => (
          <button key={target} type="button" onClick={() => onNavigate(target)} aria-current={target === 'home' ? 'page' : undefined}>{label}</button>
        ))}
      </nav>
      <a className="site-header__phone" href="tel:02188665157" aria-label="تماس با شمارهٔ ۰۲۱۸۸۶۶۵۱۵۷" dir="ltr">
        <span className="site-header__phone-icon">{phoneIconSrc && <img src={phoneIconSrc} alt="" />}</span>
        <bdi>021 - 88665157</bdi>
      </a>
    </header>
  );
}
