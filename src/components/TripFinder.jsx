import { useRef, useState } from 'react';
import { Icon } from './Icon';
import { TravelerPicker } from './TravelerPicker';
import { localToday, validateTrip } from '../data/trip';

export function TripFinder({ trip, onChange, onSubmit }) {
  const [errors, setErrors] = useState({});
  const form = useRef(null);
  const update = patch => { onChange(patch); setErrors({}); };
  function submit(event) {
    event.preventDefault();
    const nextErrors = validateTrip(trip);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { requestAnimationFrame(() => form.current.querySelector('[aria-invalid="true"]')?.focus()); return; }
    onSubmit(trip);
  }
  return <form ref={form} className="trip-finder" id="trip-finder" aria-labelledby="finder-title" noValidate onSubmit={submit}>
    <div className="finder-heading"><h2 id="finder-title">Каким будет ваш Бали?</h2><p>Начнём с ваших планов. Остальное подберём вместе.</p></div>
    <div className="finder-main">
      <label className="finder-field destination-field"><span>Куда отправимся</span><span className="select-wrap"><select name="destination" value={trip.destination} onChange={e => update({ destination: e.target.value })}><option>Бали, Индонезия</option><option value="Чангу">Чангу — океан и сёрфинг</option><option value="Убуд">Убуд — природа и тишина</option><option value="Острова">Бали и соседние острова</option></select><Icon name="chevron" /></span></label>
      <fieldset className="dates-fieldset"><legend>Когда поедем</legend><div className="date-fields">
        {[['startDate', 'Вылет'], ['endDate', 'Возвращение']].map(([key, label]) => <label className="finder-field" key={key}><span>{label}</span><input id={key} name={key} aria-label={label} type="date" disabled={trip.flexibleDates} value={trip[key]} min={key === 'startDate' ? localToday() : trip.startDate || localToday()} onChange={e => update({ [key]: e.target.value })} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined} />{errors[key] && <span className="field-error" id={`${key}-error`}>{errors[key]}</span>}</label>)}
      </div><label className="flexible-check"><input type="checkbox" checked={trip.flexibleDates} onChange={e => update({ flexibleDates: e.target.checked })} />Даты пока не определены</label></fieldset>
      <TravelerPicker adults={trip.adults} childAges={trip.childAges} onChange={update} errors={errors} />
    </div>
    <details className="finder-preferences"><summary>Город вылета, бюджет и пожелания <Icon name="chevron" /></summary><div className="preferences-grid">
      <label className="finder-field"><span>Город вылета</span><input value={trip.departureCity} onChange={e => update({ departureCity: e.target.value })} placeholder="Например, Москва" maxLength={80} /></label>
      <label className="finder-field"><span>Бюджет на всех, включая перелёт</span><select value={trip.budget} onChange={e => update({ budget: e.target.value })}><option value="">Обсудим с менеджером</option><option>До 300 000 ₽</option><option>300 000–500 000 ₽</option><option>500 000–800 000 ₽</option><option>От 800 000 ₽</option></select></label>
      <label className="finder-field wishes-field"><span>Что важно в путешествии</span><textarea value={trip.wishes} onChange={e => update({ wishes: e.target.value })} placeholder="Отель у океана, первая волна или несколько дней в Убуде…" maxLength={1000} rows={2} /></label>
    </div></details>
    <div className="finder-submit"><p>Покажем подходящие программы<br />и примерную стоимость на всех.</p><button className="button button-dark" type="submit">Показать туры<Icon name="arrow" /></button></div>
  </form>;
}
