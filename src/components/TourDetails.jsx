import { useState } from "react";
import { ArrowLeft, ArrowRight, Plane, Check, Luggage } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { InquiryForm } from "./InquiryForm";
import { formatDate, addDays } from "../data/trip";
import { money, tourPrice } from "../data/tours";
export function TourDetails({ selection, onClose }) {
  const [step, setStep] = useState("details");
  const open = !!selection;
  const hotel = selection?.hotel;
  const offer = selection?.offer;
  const search = selection?.search;
  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          onClose();
          setStep("details");
        }
      }}
    >
      <SheetContent
        className="tour-sheet"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          document
            .getElementById("tour-results")
            ?.focus({ preventScroll: true });
        }}
      >
        <SheetHeader>
          <SheetTitle>
            {step === "inquiry"
              ? "Запрос по выбранному туру"
              : hotel?.title || "Индивидуальное путешествие"}
          </SheetTitle>
          <SheetDescription>
            Демонстрационный сценарий · без бронирования и оплаты
          </SheetDescription>
        </SheetHeader>
        {selection && (
          <div className="sheet-scroll">
            {hotel && offer && (
              <>
                <div className="details-cover">
                  <img src={hotel.image} alt={hotel.alt} />
                  <Badge>{hotel.place}</Badge>
                </div>
                <div className="booking-summary">
                  <p>
                    {search.departureCity} → Бали ·{" "}
                    {formatDate(offer.departureDate)} —{" "}
                    {formatDate(addDays(offer.departureDate, offer.nights))}
                  </p>
                  <h3>{hotel.title}</h3>
                  <p>
                    {offer.nights} ночей · {offer.room} · {offer.meal}
                  </p>
                  <p>
                    {search.adults} взр. / {search.childAges.length} дет.
                    {search.childAges.length
                      ? ` · возраст: ${search.childAges.join(", ")}`
                      : ""}
                  </p>
                  <strong>{money(tourPrice(offer, search))}</strong>
                  <span>на всех · демонстрационная цена</span>
                </div>
                <Separator />
              </>
            )}
            {hotel && (
              <div hidden={step !== "details"}>
                <Tabs defaultValue="hotel" className="details-tabs">
                  <TabsList className="w-full">
                    <TabsTrigger value="hotel">Отель</TabsTrigger>
                    <TabsTrigger value="flight">Перелёт</TabsTrigger>
                    <TabsTrigger value="included">Включено</TabsTrigger>
                  </TabsList>
                  <TabsContent value="hotel">
                    <h4>Ваш отдых</h4>
                    <p>{hotel.description}</p>
                    <div className="hotel-amenities">
                      {hotel.amenities.map((a) => (
                        <Badge variant="secondary" key={a}>
                          {a}
                        </Badge>
                      ))}
                    </div>
                    <p className="field-hint">
                      Описание и рейтинг иллюстративные. Фото передают
                      настроение направления.
                    </p>
                  </TabsContent>
                  <TabsContent value="flight">
                    <h4>
                      <Plane size={18} /> Перелёт туда и обратно
                    </h4>
                    <p>
                      {search.departureCity} → Денпасар ·{" "}
                      {formatDate(offer.departureDate)}
                    </p>
                    <p>
                      Денпасар → {search.departureCity} ·{" "}
                      {formatDate(addDays(offer.departureDate, offer.nights))}
                    </p>
                    <p>{offer.flight}</p>
                    <p>
                      <Luggage size={18} /> {offer.baggage}
                    </p>
                    <p className="field-hint">
                      Авиакомпания, время, пересадка и нормы багажа уточняются
                      после подключения реальных предложений.
                    </p>
                  </TabsContent>
                  <TabsContent value="included">
                    <h4>В стоимость входят</h4>
                    <ul>
                      {offer.includes.map((x) => (
                        <li key={x}>
                          <Check size={16} />
                          {x}
                        </li>
                      ))}
                    </ul>
                    <p className="field-hint">
                      Визовые расходы и дополнительные услуги уточняются
                      отдельно.
                    </p>
                  </TabsContent>
                </Tabs>
                <div className="details-next">
                  <Button onClick={() => setStep("inquiry")} size="lg">
                    Оставить заявку на тур
                    <ArrowRight />
                  </Button>
                  <p>Сначала уточним стоимость и наличие.</p>
                </div>
              </div>
            )}
            <div
              className="details-inquiry"
              hidden={!!hotel && step !== "inquiry"}
            >
              {search?.wishes && (
                <p className="inquiry-explainer">
                  Ваши пожелания: {search.wishes}
                </p>
              )}
              <InquiryForm
                key={offer?.id || "custom"}
                prefix="booking"
                onBack={hotel ? () => setStep("details") : undefined}
              />
            </div>
            {step === "details" && hotel && (
              <Button variant="ghost" onClick={onClose}>
                <ArrowLeft />
                Вернуться к вариантам
              </Button>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
