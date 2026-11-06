export function Footer() {
  return (
    <footer className="footer site-container">
      <a className="brand" href="#top">
        остров<span className="brand-dot"></span>
      </a>
      <p>Путешествия, к которым хочется возвращаться.</p>
      <a href="#contact">
        Связаться с нами
        <svg className="icon">
          <use href="#arrow"></use>
        </svg>
      </a>
      <span className="concept-note">Концепция туристического агентства</span>
    </footer>
  );
}
