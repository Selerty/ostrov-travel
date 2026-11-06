// Demo inventory only. Replace with an agency API before accepting bookings.
export const tours = [
  { id: 'canggu', destination: 'Чангу', title: 'На одной волне', place: 'Чангу · Бали', image: '/assets/surf.jpg', alt: 'Сёрфер в бирюзовой волне', nights: 7, minNights: 5, maxNights: 9, adultPrice: 195000, childPrice: 145000, description: 'Жить у океана, попробовать сёрфинг и встречать закаты на пляже.', includes: 'Перелёт, отель, трансфер и вводный урок сёрфинга' },
  { id: 'ubud', destination: 'Убуд', title: 'Время замедлиться', place: 'Убуд · Бали', image: '/assets/bali.jpg', alt: 'Балийский храм среди зелени', nights: 7, minNights: 5, maxNights: 9, adultPrice: 175000, childPrice: 125000, description: 'Вилла среди зелени, рисовые террасы и неспешные утренние прогулки.', includes: 'Перелёт, проживание, трансфер и прогулка с гидом' },
  { id: 'islands', destination: 'Острова', title: 'За горизонт', place: 'Бали и соседние острова', image: '/assets/islands.jpg', alt: 'Зелёные острова среди бирюзовой воды', nights: 10, minNights: 10, maxNights: 21, adultPrice: 265000, childPrice: 195000, description: 'Несколько островов в одном путешествии: океан, лодки и тихие бухты.', includes: 'Перелёт, проживание, трансферы и переезды между островами' },
];
export const money = value => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value);
export function tourPrice(tour, trip) { return tour.adultPrice * trip.adults + tour.childPrice * trip.childAges.length; }
export function tripNights(trip) {
  return trip.flexibleDates ? null : Math.round((Date.parse(`${trip.endDate}T12:00:00Z`) - Date.parse(`${trip.startDate}T12:00:00Z`)) / 86400000);
}
export function matchingTours(trip) {
  const nights = tripNights(trip);
  const limits = { 'До 300 000 ₽': [0, 300000], '300 000–500 000 ₽': [300000, 500000], '500 000–800 000 ₽': [500000, 800000], 'От 800 000 ₽': [800000, Infinity] };
  return tours.filter(tour => {
    const price = tourPrice(tour, trip);
    const budget = limits[trip.budget];
    return (trip.destination === 'Бали, Индонезия' || tour.destination === trip.destination)
      && (nights === null || (nights >= tour.minNights && nights <= tour.maxNights))
      && (!budget || (price >= budget[0] && price <= budget[1]));
  });
}
