import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
export function InquiryForm({ prefix = "contact", onBack }) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  function submit(e) {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = "Укажите ваше имя.";
    if (!/^\+?[\d\s()\-]{7,25}$/.test(values.phone.trim()))
      next.phone = "Укажите телефон с кодом страны.";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Проверьте адрес электронной почты.";
    if (!consent) next.consent = "Подтвердите согласие на связь.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        e.target.querySelector('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    setDone(true);
  }
  return (
    <form className="inquiry-form" onSubmit={submit} noValidate>
      {done ? (
        <Alert className="demo-success" role="status">
          <Check />
          <AlertTitle>Вы прошли сценарий заявки</AlertTitle>
          <AlertDescription>
            Это демонстрация: запрос не отправлен, тур не забронирован. Данные
            остаются на странице.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <p className="inquiry-explainer">
            Оставьте контакт для уточнения стоимости и наличия. Запрос не
            является бронированием.
          </p>
          {[
            ["name", "Ваше имя", "Например, Анна"],
            ["phone", "Мобильный телефон", "+7 999 123-45-67"],
            ["email", "Электронная почта · необязательно", "you@example.com"],
          ].map(([key, label, placeholder]) => (
            <div className="inquiry-field" key={key}>
              <Label htmlFor={`${prefix}-${key}`}>{label}</Label>
              <Input
                id={`${prefix}-${key}`}
                data-testid={`${prefix}-${key}`}
                type={
                  key === "email" ? "email" : key === "phone" ? "tel" : "text"
                }
                autoComplete={key === "phone" ? "tel" : key}
                required={key !== "email"}
                maxLength={key === "name" ? 80 : 100}
                value={values[key]}
                placeholder={placeholder}
                onChange={(e) => {
                  setValues({ ...values, [key]: e.target.value });
                  setErrors({ ...errors, [key]: "" });
                }}
                aria-invalid={!!errors[key]}
                aria-describedby={
                  errors[key] ? `${prefix}-${key}-error` : undefined
                }
              />
              {errors[key] && (
                <p className="field-error" id={`${prefix}-${key}-error`}>
                  {errors[key]}
                </p>
              )}
            </div>
          ))}
          <div className="inquiry-field">
            <Label htmlFor={`${prefix}-comment`}>
              Комментарий · необязательно
            </Label>
            <Textarea
              id={`${prefix}-comment`}
              value={values.comment}
              onChange={(e) =>
                setValues({ ...values, comment: e.target.value })
              }
              maxLength={1000}
              placeholder="Вопросы об отеле, перелёте или пожелания к отдыху"
            />
          </div>
          <div className="inquiry-consent">
            <Checkbox
              id={`${prefix}-consent`}
              data-testid={`${prefix}-consent`}
              checked={consent}
              onCheckedChange={(v) => {
                setConsent(v === true);
                setErrors({ ...errors, consent: "" });
              }}
              aria-invalid={!!errors.consent}
              aria-describedby={
                errors.consent ? `${prefix}-consent-error` : undefined
              }
            />
            <Label htmlFor={`${prefix}-consent`}>
              Согласен на связь по указанным контактам для обсуждения тура.
            </Label>
          </div>
          {errors.consent && (
            <p className="field-error" id={`${prefix}-consent-error`}>
              {errors.consent}
            </p>
          )}
          <Button type="submit" className="inquiry-submit">
            Проверить заявку
            <ArrowRight />
          </Button>
          <p className="field-hint">
            Демоформа: данные никуда не отправляются.
          </p>
        </>
      )}
      {onBack && (
        <Button type="button" variant="outline" onClick={onBack}>
          Вернуться к туру
        </Button>
      )}
    </form>
  );
}
