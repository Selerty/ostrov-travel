import { countryName } from "../data/destinations";
import { useState } from "react";
import { ArrowRight, Star, SlidersHorizontal } from "lucide-react";
import { matchingHotels, money, tourPrice } from "../data/tours";
import { formatDate } from "../data/trip";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { ChoiceField } from "./ChoiceField";
export function TourResults({ search, onSelect, onCustom }) {
  const [stars, setStars] = useState("any");
  const [meal, setMeal] = useState("any");
  const [sort, setSort] = useState("price");
  if (!search) return null;
  let hotels = matchingHotels(search)
    .filter((h) => stars === "any" || h.stars >= Number(stars))
    .map((h) => ({
      ...h,
      offers: h.offers.filter((o) => meal === "any" || o.meal === meal),
    }))
    .filter((h) => h.offers.length);
  hotels.sort((a, b) =>
    sort === "rating"
      ? b.rating - a.rating
      : tourPrice(a.offers[0], search) - tourPrice(b.offers[0], search),
  );
  return (
    <section
      className="tour-results site-container section-space"
      id="tour-results"
      tabIndex={-1}
      aria-labelledby="results-title"
    >
      <div className="results-heading">
        <div>
          <h2 id="results-title">
            Ваш отель.
            <br />
            Ваш ритм.
          </h2>
          <p>
            {search.departureCity} → {countryName(search.country)}
            {search.destination !== "any" ? ` · ${search.destination}` : ""} ·
            вылет {formatDate(search.startDate)}–{formatDate(search.endDate)} ·{" "}
            {search.nightsFrom}–{search.nightsTo} ночей · {search.adults} взр. /{" "}
            {search.childAges.length} дет.
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="#trip-finder">
            Изменить поиск
            <SlidersHorizontal />
          </a>
        </Button>
      </div>
      <p className="catalog-notice">
        Демонстрационный каталог: отели, предложения и цены — примеры для
        проверки сценария. Реальное наличие и рейсы не подключены.
      </p>
      <div className="catalog-filters">
        <ChoiceField
          id="stars"
          label="Класс отеля"
          value={stars}
          onChange={setStars}
          options={[
            { value: "any", label: "Любой" },
            { value: "4", label: "От 4 звёзд" },
            { value: "5", label: "5 звёзд" },
          ]}
        />
        <ChoiceField
          id="meal"
          label="Питание"
          value={meal}
          onChange={setMeal}
          options={[
            { value: "any", label: "Любое" },
            "Завтраки",
            "Полупансион",
          ]}
        />
        <ChoiceField
          id="sort"
          label="Сортировка"
          value={sort}
          onChange={setSort}
          options={[
            { value: "price", label: "Сначала дешевле" },
            { value: "rating", label: "По рейтингу" },
          ]}
        />
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setStars("any");
            setMeal("any");
            setSort("price");
          }}
        >
          Сбросить фильтры
        </Button>
      </div>
      <p className="result-count" role="status">
        {hotels.length
          ? `Найдено отелей: ${hotels.length}`
          : "По вашим параметрам туров не найдено"}
      </p>
      {hotels.length ? (
        <div className="hotel-list">
          {hotels.map((hotel) => (
            <Card className="hotel-card" key={hotel.id}>
              <CardContent className="hotel-content p-0">
                <div className="hotel-overview">
                  {hotel.image ? (
                    <img
                      src={hotel.image}
                      alt={hotel.alt}
                      width="600"
                      height="400"
                      loading="lazy"
                    />
                  ) : (
                    <div className="hotel-placeholder">
                      <span>{hotel.countryName}</span>
                      <strong>{hotel.destination}</strong>
                      <small>Демонстрационный отель · фото ожидается</small>
                    </div>
                  )}
                  <div className="hotel-copy">
                    <div className="hotel-meta">
                      <span aria-label={`${hotel.stars} звёзд`}>
                        {Array.from({ length: hotel.stars }, (_, i) => (
                          <Star key={i} size={13} fill="currentColor" />
                        ))}
                      </span>
                      <Badge variant="secondary">
                        {hotel.rating} / 5 · пример
                      </Badge>
                    </div>
                    <p className="tour-place">{hotel.place}</p>
                    <h3>{hotel.title}</h3>
                    <p>{hotel.description}</p>
                    <div className="hotel-amenities">
                      {hotel.amenities.map((a) => (
                        <Badge key={a} variant="outline">
                          {a}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="hotel-from">
                    <span>Тур на всех путешественников</span>
                    <strong>
                      от {money(tourPrice(hotel.offers[0], search))}
                    </strong>
                    <span>{hotel.offers.length} вариантов · пример цены</span>
                  </div>
                </div>
                <Accordion type="single" collapsible className="hotel-offers">
                  <AccordionItem value={hotel.id}>
                    <AccordionTrigger>
                      Выбрать вариант — {hotel.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="offer-table-head">
                        <span>Вылет / ночи</span>
                        <span>Номер и питание</span>
                        <span>Цена на всех</span>
                      </div>
                      {hotel.offers.map((offer) => (
                        <div className="offer-row" key={offer.id}>
                          <div>
                            <strong>{formatDate(offer.departureDate)}</strong>
                            <span>
                              {offer.nights} ночей · {offer.departureCity}
                            </span>
                          </div>
                          <div>
                            <strong>{offer.room}</strong>
                            <span>{offer.meal}</span>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => onSelect(hotel, offer)}
                            aria-label={`Подробнее: ${hotel.title}, ${formatDate(offer.departureDate)}, ${offer.nights} ночей, ${offer.meal}`}
                          >
                            <span>{money(tourPrice(offer, search))}</span>
                            <ArrowRight />
                          </Button>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <p>
            Попробуйте другие даты вылета, количество ночей, бюджет или фильтры.
          </p>
          <Button variant="outline" asChild>
            <a href="#trip-finder">Изменить поиск</a>
          </Button>
          <Button variant="ghost" onClick={onCustom}>
            Обсудить индивидуальный маршрут
          </Button>
        </div>
      )}
    </section>
  );
}
