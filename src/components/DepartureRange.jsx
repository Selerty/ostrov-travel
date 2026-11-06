import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { ru } from "date-fns/locale";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { formatDate, localToday } from "../data/trip";
const asDate = (value) => (value ? new Date(`${value}T12:00:00`) : undefined);
const asString = (d) =>
  d
    ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
    : "";
export function DepartureRange({ trip, onChange, errors }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="finder-field departure-range">
      <Label htmlFor="date-range">Даты возможного вылета</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-range"
            aria-label="Даты возможного вылета"
            type="button"
            variant="outline"
            className="date-trigger"
            aria-invalid={!!(errors.startDate || errors.endDate)}
          >
            <CalendarDays />
            <span>
              {trip.startDate ? formatDate(trip.startDate) : "С даты"} —{" "}
              {trip.endDate ? formatDate(trip.endDate) : "по дату"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="date-popover w-auto p-0">
          <Calendar
            mode="range"
            locale={ru}
            selected={{
              from: asDate(trip.startDate),
              to: asDate(trip.endDate),
            }}
            defaultMonth={asDate(trip.startDate)}
            onSelect={(range) =>
              onChange({
                startDate: asString(range?.from),
                endDate: asString(range?.to),
              })
            }
            disabled={{ before: asDate(localToday()) }}
            numberOfMonths={1}
          />
          <div className="date-manual">
            <Label htmlFor="startDate">
              Вылет не раньше
              <Input
                id="startDate"
                type="date"
                value={trip.startDate}
                min={localToday()}
                onChange={(e) => onChange({ startDate: e.target.value })}
              />
            </Label>
            <Label htmlFor="endDate">
              Вылет не позже
              <Input
                id="endDate"
                type="date"
                value={trip.endDate}
                min={trip.startDate || localToday()}
                onChange={(e) => onChange({ endDate: e.target.value })}
              />
            </Label>
            <Button type="button" onClick={() => setOpen(false)}>
              Готово
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <p className="field-hint">Это диапазон вылета, не даты всего отпуска.</p>
      {(errors.startDate || errors.endDate) && (
        <p className="field-error" role="alert">
          {errors.startDate || errors.endDate}
        </p>
      )}
    </div>
  );
}
