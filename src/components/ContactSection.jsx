import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { money, tourPrice } from '../data/tours';
import { tripSummary } from '../data/trip';
export function ContactSection({ selection }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ name: '', contact: '' });
  const nameRef = useRef(null);
  useEffect(() => { setSubmitted(false); }, [selection]);
  function submit(e) {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = 'Укажите, как к вам обращаться.';
    if (!values.contact.trim()) next.contact = 'Укажите телефон или Telegram для связи.';
    setErrors(next);
    if (Object.keys(next).length) { requestAnimationFrame(() => e.target.querySelector('[aria-invalid="true"]')?.focus()); return; }
    setSubmitted(true);
  }
  return <section className="contact" id="contact" aria-labelledby="contact-title"><div className="container contact-grid">
    <div className="contact-copy"><h2 id="contact-title">Пора сменить<br />картинку.</h2><p>Оставьте контакт для обсуждения поездки.</p>{selection && <div className="selection-review"><h3>{selection.tour ? selection.tour.title : "Индивидуальное путешествие"}</h3>{selection.tour && <p className="selection-price">от {money(tourPrice(selection.tour, selection))} на всех · примерная стоимость</p>}<p className="trip-summary">{tripSummary(selection)}</p><a href="#trip-finder">Изменить пожелания <Icon name="arrow" /></a></div>}</div>
    <form className="contact-form" id="contact-form" noValidate onSubmit={submit}>
      {[['name', 'Как вас зовут?', 'Ваше имя'], ['contact', 'Телефон или Telegram', '+7 или @username']].map(([key, label, placeholder]) => <label className="contact-field" key={key}><span>{label}</span><input ref={key === 'name' ? nameRef : undefined} id={key === 'name' ? 'name' : 'contact-detail'} name={key} aria-label={label} autoComplete={key === 'name' ? 'given-name' : 'tel'} placeholder={placeholder} maxLength={key === 'name' ? 80 : 100} value={values[key]} onChange={e => { setValues({ ...values, [key]: e.target.value }); setSubmitted(false); setErrors({ ...errors, [key]: '' }); }} required aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `contact-${key}-error` : undefined} />{errors[key] && <span className="field-error" id={`contact-${key}-error`}>{errors[key]}</span>}</label>)}
      <button className="button button-dark" type="submit">Начать планировать<Icon name="arrow" /></button>
      <small>Демонстрационная форма. Данные не отправляются.</small>
      {submitted && <p className="form-status" role="status">Так будет выглядеть отправка заявки. Сейчас это демонстрация: данные остаются только на странице, заявка не отправлена.</p>}
    </form>
  </div></section>;
}
