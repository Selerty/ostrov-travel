export const initialTrip = {
  destination: 'Бали, Индонезия', startDate: '', endDate: '', flexibleDates: true,
  adults: 2, childAges: [], departureCity: '', budget: '', wishes: '',
};
export function localToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
export function validateTrip(trip) {
  const errors = {};
  if (!trip.flexibleDates) {
    if (!trip.startDate) errors.startDate = 'Укажите дату вылета.';
    else if (trip.startDate < localToday()) errors.startDate = 'Выберите сегодняшнюю или будущую дату.';
    if (!trip.endDate) errors.endDate = 'Укажите дату возвращения.';
    else if (trip.startDate && trip.endDate <= trip.startDate) errors.endDate = 'Возвращение должно быть позже вылета.';
  }
  trip.childAges.forEach((age, i) => { if (age === '') errors[`child-${i}`] = 'Укажите возраст ребёнка на момент поездки.'; });
  return errors;
}
export function tripSummary(trip) {
  const format = value => new Date(`${value}T12:00:00`).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  const dates = trip.flexibleDates ? 'Даты подберём вместе' : `${format(trip.startDate)} — ${format(trip.endDate)}`;
  const adults = `${trip.adults} ${trip.adults === 1 ? 'взрослый' : trip.adults < 5 ? 'взрослых' : 'взрослых'}`;
  const children = trip.childAges.length ? ` · дети: ${trip.childAges.map(age => `${age} лет`).join(', ')}` : '';
  return [trip.destination, dates, adults + children, trip.departureCity && `Вылет из: ${trip.departureCity}`, trip.budget && `Бюджет на всех: ${trip.budget}`, trip.wishes].filter(Boolean).join('\n');
}
