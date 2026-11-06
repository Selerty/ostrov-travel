import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { ChoiceField } from "./ChoiceField";
export function TravelerPicker({ adults, childAges, onChange, errors }) {
  const count = childAges.length;
  return (
    <fieldset className="travelers-fieldset">
      <legend>Туристы</legend>
      {[
        [
          "взрослых",
          "Взрослые",
          "От 18 лет",
          adults,
          1,
          8,
          (n) => onChange({ adults: n }),
        ],
        [
          "детей",
          "Дети",
          "До 18 лет",
          count,
          0,
          4,
          (n) =>
            onChange({
              childAges:
                n < count ? childAges.slice(0, -1) : [...childAges, ""],
            }),
        ],
      ].map(([key, title, hint, n, min, max, change]) => (
        <div className="traveler-counter" key={key}>
          <div>
            <strong>{title}</strong>
            <span>{hint}</span>
          </div>
          <div className="counter-controls">
            <Button
              variant="outline"
              size="icon"
              type="button"
              aria-label={`Уменьшить число ${key}`}
              disabled={n <= min}
              onClick={() => change(n - 1)}
            >
              <Minus />
            </Button>
            <output aria-label={`Количество ${key}`} aria-live="polite">
              {n}
            </output>
            <Button
              variant="outline"
              size="icon"
              type="button"
              aria-label={`Увеличить число ${key}`}
              disabled={n >= max}
              onClick={() => change(n + 1)}
            >
              <Plus />
            </Button>
          </div>
        </div>
      ))}
      {count > 0 && (
        <div className="children-ages">
          {childAges.map((age, i) => (
            <ChoiceField
              key={i}
              id={`child-${i}`}
              label={`Возраст ребёнка ${i + 1}`}
              value={age === "" ? "unset" : age}
              onChange={(value) =>
                onChange({
                  childAges: childAges.map((a, j) =>
                    i === j ? (value === "unset" ? "" : value) : a,
                  ),
                })
              }
              options={[
                { value: "unset", label: "Выберите возраст" },
                ...Array.from({ length: 18 }, (_, n) => ({
                  value: String(n),
                  label: n === 0 ? "До 1 года" : `${n} лет`,
                })),
              ]}
              error={errors[`child-${i}`]}
            />
          ))}
        </div>
      )}
    </fieldset>
  );
}
