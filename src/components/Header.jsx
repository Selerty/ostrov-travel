import { useEffect, useState } from 'react';
import { Icon } from './Icon';
export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  return <header className="header">
    <a className="brand" href="#top" aria-label="Остров — на главную">остров<span className="brand-dot" /></a>
    <nav className={`navigation ${open ? 'is-open' : ''}`} id="navigation" aria-label="Основное меню" onClick={() => setOpen(false)}>
      <a href="#journeys">Путешествия</a><a href="#approach">Наш подход</a><a href="#inspiration">Вдохновение</a>
    </nav>
    <a className="header-contact" href="#contact">Обсудить поездку</a>
    <button className="menu-button" type="button" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
  </header>;
}
