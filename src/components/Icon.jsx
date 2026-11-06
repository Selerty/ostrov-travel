export function Icon({ name, ...props }) { return <svg className="icon" aria-hidden="true" {...props}><use href={`#${name}`} /></svg>; }
export function IconLibrary() { return (
<svg className="svg-library" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>
    <symbol id="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
    <symbol id="play" viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z"/></symbol>
    <symbol id="pause" viewBox="0 0 24 24"><path d="M9 5v14M16 5v14"/></symbol>
    <symbol id="close" viewBox="0 0 24 24"><path d="m6 6 12 12M6 18 18 6"/></symbol>
    <symbol id="menu" viewBox="0 0 24 24"><path d="M4 8h16M4 16h16"/></symbol>
    <symbol id="chevron" viewBox="0 0 24 24"><path d="m8 10 4 4 4-4"/></symbol>
  </defs></svg>
); }
