import { Button } from "./ui/button";
export function Approach() {
  return (
    <section
      className="approach"
      id="approach"
      aria-labelledby="approach-title"
    >
      <div className="site-container approach-grid">
        <img
          className="approach-photo"
          src="assets/islands.jpg"
          alt="Маленькие зелёные острова в бирюзовой воде"
          width="900"
          height="600"
          loading="lazy"
        />
        <div className="approach-copy">
          <h2 id="approach-title">
            Ваш отпуск.
            <br />
            Без лишних забот.
          </h2>
          <p>
            Подберём места, которые хочется запомнить. Соединим их в маршрут, в
            котором удобно жить.
          </p>
          <ul className="included">
            <li>Проживание</li>
            <li>Трансферы</li>
            <li>Впечатления</li>
          </ul>
          <Button asChild variant="ghost">
            <a className="button button-lime" href="#contact">
              Собрать мой маршрут
              <svg className="icon">
                <use href="#arrow"></use>
              </svg>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
