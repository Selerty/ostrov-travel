import { matchingTours, money, tourPrice, tripNights } from '../data/tours';
import { Icon } from './Icon';
export function TourResults({ search, onSelect }) {
  if (!search) return null;
  const results = matchingTours(search);
  return <section className="tour-results container section-space" id="tour-results" tabIndex={-1} aria-labelledby="results-title">
    <div className="results-heading"><div><h2 id="results-title">Ваше путешествие<br />начинается здесь.</h2><p>{search.destination} · {search.adults} взр.{search.childAges.length ? ` · ${search.childAges.length} дет.` : ''} · {tripNights(search) ? `${tripNights(search)} ночей` : 'Даты на ваш выбор'}</p></div><a href="#trip-finder">Изменить параметры <Icon name="arrow" /></a></div>
    <p className="catalog-notice">Демонстрационные программы и цены. Стоимость показана на всех путешественников; наличие, точные даты и перелёт требуют подтверждения.</p>
    <p className="result-count" role="status">{results.length ? `Подходящих программ: ${results.length}` : 'По вашим параметрам программ не найдено'}</p>
    {results.length ? <div className="tour-grid">{results.map(tour => <article className="tour-card" key={tour.id}>
      <img src={tour.image} alt={tour.alt} loading="lazy" width="600" height="400" />
      <div className="tour-card-content"><p className="tour-place">{tour.place} · {tripNights(search) || tour.nights} ночей</p><h3>{tour.title}</h3><p className="tour-description">{tour.description}</p><p className="tour-includes">{tour.includes}</p><div className="tour-price"><strong>от {money(tourPrice(tour, search))}</strong><span>на всех · примерная стоимость</span></div><button className="button button-dark" type="button" onClick={() => onSelect(tour)}>Обсудить этот тур<Icon name="arrow" /></button></div>
    </article>)}</div> : <div className="catalog-empty"><p>Попробуйте другое направление, длительность или бюджет. Для индивидуального маршрута можно оставить пожелания менеджеру.</p><a className="button button-dark" href="#trip-finder">Изменить параметры<Icon name="arrow" /></a><button className="catalog-custom" type="button" onClick={() => onSelect(null)}>Обсудить индивидуальный маршрут</button></div>}
  </section>;
}
