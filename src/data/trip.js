export function localToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export function addDays(value, days) {
  const d = new Date(`${value}T12:00:00`);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export const initialTrip = {
  destination: "Бали, Индонезия",
  departureCity: "Москва",
  startDate: addDays(localToday(), 14),
  endDate: addDays(localToday(), 21),
  nightsFrom: 7,
  nightsTo: 10,
  adults: 2,
  childAges: [],
  budget: "any",
  wishes: "",
};
export const formatDate = (value) =>
  new Date(`${value}T12:00:00`).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
  });
export function validateTrip(trip) {
  const errors = {};
  if (!trip.startDate)
    errors.startDate = "Выберите первую дату возможного вылета.";
  else if (trip.startDate < localToday())
    errors.startDate = "Выберите сегодняшнюю или будущую дату.";
  if (!trip.endDate)
    errors.endDate = "Выберите последнюю дату возможного вылета.";
  else if (trip.endDate < trip.startDate)
    errors.endDate = "Конец диапазона не может быть раньше начала.";
  if (Number(trip.nightsTo) < Number(trip.nightsFrom))
    errors.nights = "Максимум ночей не может быть меньше минимума.";
  trip.childAges.forEach((age, i) => {
    if (age === "")
      errors[`child-${i}`] = "Укажите возраст ребёнка на момент поездки.";
  });
  return errors;
}
export function tripSummary(trip) {
  return [
    `Вылет из: ${trip.departureCity}`,
    trip.destination,
    `Возможный вылет: ${formatDate(trip.startDate)} — ${formatDate(trip.endDate)}`,
    `${trip.nightsFrom}–${trip.nightsTo} ночей`,
    `${trip.adults} взр. · ${trip.childAges.length} дет.`,
    trip.wishes,
  ]
    .filter(Boolean)
    .join("\n");
}
