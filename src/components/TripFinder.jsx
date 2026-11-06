import { CountryPicker } from "./CountryPicker";
import { getCountry } from "../data/destinations";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { ChoiceField } from "./ChoiceField";
import { TravelerPicker } from "./TravelerPicker";
import { DepartureRange } from "./DepartureRange";
import { validateTrip } from "../data/trip";
export function TripFinder({ trip, onChange, onSubmit }) {
  const [errors, setErrors] = useState({});
  const update = (patch) => {
    onChange(patch);
    setErrors({});
  };
  function submit(e) {
    e.preventDefault();
    const next = validateTrip(trip);
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        e.target.querySelector('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    onSubmit(trip);
  }
  const nights = Array.from({ length: 19 }, (_, i) => ({
    value: String(i + 3),
    label: `${i + 3}`,
  }));
  return (
    <form
      className="trip-finder"
      id="trip-finder"
      aria-labelledby="finder-title"
      noValidate
      onSubmit={submit}
    >
      <div className="finder-heading">
        <h2 id="finder-title">Куда отправимся?</h2>
        <p>Туры по всему миру. Начните со страны и дат вылета.</p>
      </div>
      <div className="search-primary">
        <ChoiceField
          id="departureCity"
          label="Город вылета"
          value={trip.departureCity}
          onChange={(v) => update({ departureCity: v })}
          options={["Москва", "Ташкент", "Самара"]}
        />
        <CountryPicker
          value={trip.country}
          onChange={(country) => update({ country, destination: "any" })}
        />
        <DepartureRange trip={trip} onChange={update} errors={errors} />
        <fieldset className="night-range">
          <legend>Количество ночей</legend>
          <div>
            <ChoiceField
              id="nightsFrom"
              label="От"
              value={trip.nightsFrom}
              options={nights}
              onChange={(v) => update({ nightsFrom: Number(v) })}
            />
            <span>—</span>
            <ChoiceField
              id="nightsTo"
              label="До"
              value={trip.nightsTo}
              options={nights}
              onChange={(v) => update({ nightsTo: Number(v) })}
            />
          </div>
          {errors.nights && (
            <p role="alert" className="field-error">
              {errors.nights}
            </p>
          )}
        </fieldset>
      </div>
      <div className="search-secondary">
        <TravelerPicker
          adults={trip.adults}
          childAges={trip.childAges}
          onChange={update}
          errors={errors}
        />
        <div>
          <ChoiceField
            id="destination"
            label="Курорт"
            value={trip.destination}
            onChange={(v) => update({ destination: v })}
            options={[
              {
                value: "any",
                label:
                  trip.country === "any"
                    ? "Сначала выберите страну"
                    : "Любой курорт",
              },
              ...(getCountry(trip.country)?.resorts || []),
            ]}
          />
          <ChoiceField
            id="budget"
            label="Бюджет на всех, включая перелёт"
            value={trip.budget}
            onChange={(v) => update({ budget: v })}
            options={[
              { value: "any", label: "Любой бюджет" },
              { value: "300000", label: "До 300 000 ₽" },
              { value: "500000", label: "До 500 000 ₽" },
              { value: "800000", label: "До 800 000 ₽" },
            ]}
          />
          <Accordion type="single" collapsible>
            <AccordionItem value="wishes">
              <AccordionTrigger>Пожелания к отдыху</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="wishes">Что для вас важно?</Label>
                <Textarea
                  id="wishes"
                  value={trip.wishes}
                  onChange={(e) => update({ wishes: e.target.value })}
                  placeholder="Тихий отель, сёрфинг или отдых с детьми…"
                  maxLength={1000}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="finder-submit">
        <p>
          Отели и варианты туров с ценой на всех.
          <br />
          Выбор тура не обязывает к покупке.
        </p>
        <Button className="search-submit" size="lg" type="submit">
          Найти туры
          <ArrowRight />
        </Button>
      </div>
    </form>
  );
}
