import { countries } from "./destinations.js";
import { addDays, localToday } from "./trip.js";
// Illustrative inventory, not real hotel offers, flight schedules or availability.
const baliHotels = [
  {
    id: "canggu",
    destination: "Чангу",
    title: "Океан рядом",
    place: "Чангу · Бали",
    stars: 4,
    rating: 4.6,
    image: "/assets/surf.jpg",
    alt: "Сёрфер в бирюзовой волне",
    description:
      "Небольшой отель у океана для долгих завтраков, прогулок и первой волны.",
    amenities: ["У океана", "Бассейн", "Сёрфинг"],
    adultPrice: 195000,
    childPrice: 145000,
  },
  {
    id: "ubud",
    destination: "Убуд",
    title: "Среди зелени",
    place: "Убуд · Бали",
    stars: 5,
    rating: 4.8,
    image: "/assets/bali.jpg",
    alt: "Балийский храм среди зелени",
    description:
      "Тихая вилла среди тропической зелени. Рисовые террасы, прогулки и время для себя.",
    amenities: ["Спа", "Бассейн", "Природа"],
    adultPrice: 175000,
    childPrice: 125000,
  },
  {
    id: "islands",
    destination: "Нуса-Дуа",
    title: "Островное время",
    place: "Нуса-Дуа · Бали",
    stars: 5,
    rating: 4.7,
    image: "/assets/islands.jpg",
    alt: "Зелёные острова в бирюзовой воде",
    description:
      "Пляжный курорт для спокойного отдыха и поездок к соседним островам.",
    amenities: ["Пляж", "Для семьи", "Бассейн"],
    adultPrice: 265000,
    childPrice: 195000,
  },
];
export const hotels = [
  ...baliHotels.map((h) => ({
    ...h,
    country: "indonesia",
    countryName: "Индонезия",
    arrival: "Денпасар",
  })),
  ...countries
    .filter((c) => c.id !== "indonesia")
    .flatMap((country, ci) =>
      country.resorts.map((resort, i) => ({
        id: `${country.id}-${i}`,
        country: country.id,
        countryName: country.name,
        arrival:
          {
            egypt: ["Шарм-эль-Шейх", "Хургада", "Марса-Алам"],
            turkey: ["Анталья", "Бодрум", "Анталья"],
            thailand: ["Пхукет", "Бангкок", "Самуи"],
            italy: ["Рим", "Катания", "Ольбия"],
            greece: ["Ираклион", "Родос", "Корфу"],
            georgia: ["Тбилиси", "Батуми", "Батуми"],
            uae: ["Дубай", "Абу-Даби", "Рас-эль-Хайма"],
          }[country.id]?.[i] || country.arrival,
        destination: resort,
        title: `Ваш отдых: ${resort}`,
        place: `${resort} · ${country.name}`,
        stars: i === 0 ? 4 : 5,
        rating: [4.6, 4.8, 4.7][i],
        image: null,
        alt: "",
        description: `Демонстрационный вариант отдыха: ${resort}, ${country.name}. Программа и отель будут уточнены после подключения поставщика туров.`,
        amenities: ["Трансфер", "Проживание", "Страховка"],
        adultPrice: 95000 + ci * 11000 + i * 15000,
        childPrice: 65000 + ci * 8000 + i * 10000,
      })),
    ),
];
export const money = (value) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
export function tourPrice(offer, trip) {
  return (
    offer.adultPrice * trip.adults + offer.childPrice * trip.childAges.length
  );
}
export function getOffers(hotel, trip) {
  const anchor = localToday();
  return [14, 17, 21, 28, 35]
    .flatMap((offset, i) =>
      ["Москва", "Ташкент", "Самара"].flatMap((city) =>
        [7, 10, 14].map((nights) => ({
          id: `${hotel.id}-${city}-${offset}-${nights}`,
          hotelId: hotel.id,
          departureCity: city,
          departureDate: addDays(anchor, offset),
          nights,
          room: i % 2 ? "Deluxe · балкон" : "Standard · сад",
          meal: i % 2 ? "Полупансион" : "Завтраки",
          adultPrice: Math.round(
            hotel.adultPrice * (nights / 7) + (i % 2 ? 15000 : 0),
          ),
          childPrice: Math.round(hotel.childPrice * (nights / 7)),
          flight: "Перелёт с пересадкой",
          baggage: "Багаж 20 кг",
          includes: [
            "Перелёт туда и обратно",
            "Проживание и выбранное питание",
            "Трансфер аэропорт — отель",
            "Медицинская страховка",
          ],
        })),
      ),
    )
    .filter(
      (o) =>
        o.departureCity === trip.departureCity &&
        o.departureDate >= trip.startDate &&
        o.departureDate <= trip.endDate &&
        o.nights >= Number(trip.nightsFrom) &&
        o.nights <= Number(trip.nightsTo),
    )
    .filter(
      (o) => trip.budget === "any" || tourPrice(o, trip) <= Number(trip.budget),
    )
    .sort((a, b) => tourPrice(a, trip) - tourPrice(b, trip));
}
export function matchingHotels(trip) {
  return hotels
    .filter(
      (h) =>
        (trip.country === "any" || h.country === trip.country) &&
        (trip.destination === "any" || h.destination === trip.destination),
    )
    .map((h) => ({ ...h, offers: getOffers(h, trip) }))
    .filter((h) => h.offers.length);
}
