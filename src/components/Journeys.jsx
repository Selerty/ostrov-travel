export function Journeys({ onSelect }) {
  return (
    <section
      className="journeys site-container section-space"
      id="journeys"
      aria-labelledby="journeys-title"
    >
      <div className="section-intro">
        <h2 id="journeys-title">
          Не просто место.
          <br />
          Ваше состояние.
        </h2>
        <p>
          Уехать, чтобы снова почувствовать вкус к простым вещам: солёному
          ветру, неспешному завтраку, дороге без спешки. Мы поможем найти свой
          остров.
        </p>
      </div>
      <div className="editorial-grid" id="inspiration">
        <article className="journey journey-ocean">
          <a
            className="image-link"
            href="#trip-finder"
            onClick={() => onSelect("Чангу")}
            aria-label="Спланировать путешествие в Чангу"
          >
            <img
              src="assets/surf.jpg"
              alt="Сёрфер внутри бирюзовой волны"
              width="1200"
              height="800"
              loading="lazy"
            />
            <span className="image-action">
              <svg className="icon">
                <use href="#arrow"></use>
              </svg>
            </span>
          </a>
          <a
            className="journey-title"
            href="#trip-finder"
            onClick={() => onSelect("Чангу")}
          >
            <h3>Чангу. На одной волне с собой.</h3>
          </a>
          <p>Сёрфинг, океан и вечера без расписания.</p>
        </article>
        <article className="journey journey-jungle">
          <a
            className="image-link"
            href="#trip-finder"
            onClick={() => onSelect("Убуд")}
            aria-label="Спланировать спокойный отдых на Бали"
          >
            <img
              src="assets/bali.jpg"
              alt="Балийский храм у озера среди зелёных гор"
              width="2000"
              height="2654"
              loading="lazy"
            />
            <span className="image-action">
              <svg className="icon">
                <use href="#arrow"></use>
              </svg>
            </span>
          </a>
          <a
            className="journey-title"
            href="#trip-finder"
            onClick={() => onSelect("Убуд")}
          >
            <h3>Убуд. Замедлиться.</h3>
          </a>
          <p>Зелень, тишина и время для себя.</p>
        </article>
      </div>
    </section>
  );
}
