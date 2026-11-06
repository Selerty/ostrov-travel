import { test } from "@e2e-dev/web";
import { expect } from "e2e";
import { initialTrip, formatDate, addDays } from "../src/data/trip.js";

async function select(screen, label, option) {
  await screen.getByRole("combobox", label).tap();
  await screen.getByRole("option", option).tap();
}
async function openUbud(screen) {
  await select(screen, "Направление", "Убуд");
  await screen.getByRole("button", "Найти туры").tap();
  await screen.getByRole("button", "Выбрать вариант — Среди зелени").tap();
  await screen
    .getByRole(
      "button",
      `Подробнее: Среди зелени, ${formatDate(initialTrip.startDate)}, 7 ночей, Завтраки`,
    )
    .tap();
}

test("complete hotel, offer, details and demo inquiry journey", async ({
  app,
  screen,
}) => {
  await app.open("/");
  await screen.getByRole("button", "Увеличить число детей").tap();
  await select(screen, "Возраст ребёнка 1", "5 лет");
  await openUbud(screen);
  await expect(screen.getByRole("dialog")).toBeVisible();
  await expect(screen.getByText("2 взр. / 1 дет. · возраст: 5")).toBeVisible();
  await screen.getByRole("tab", "Перелёт").tap();
  await expect(screen.getByText("Багаж 20 кг")).toBeVisible();
  await screen.getByRole("button", "Оставить заявку на тур").tap();
  await screen.getByRole("button", "Проверить заявку").tap();
  await expect(screen.getByText("Укажите ваше имя.")).toBeVisible();
  await screen.getByTestId("booking-name").fill("Анна");
  await screen.getByTestId("booking-phone").fill("+79991234567");
  await screen.getByRole("button", "Вернуться к туру").tap();
  await screen.getByRole("button", "Оставить заявку на тур").tap();
  await expect(screen.getByTestId("booking-name")).toHaveValue("Анна");
  await screen.getByTestId("booking-consent").tap();
  await screen.getByRole("button", "Проверить заявку").tap();
  await expect(screen.getByText("Вы прошли сценарий заявки")).toBeVisible();
  await screen.getByRole("button", "Вернуться к туру").tap();
  await screen.getByRole("button", "Вернуться к вариантам").tap();
  await expect(screen.getByRole("dialog")).toBeHidden();
});

test("departure window is independent of number of nights", async ({
  app,
  screen,
}) => {
  await app.open("/");
  await screen.getByRole("button", "Даты возможного вылета").tap();
  await screen.getByLabel("Вылет не раньше").fill(initialTrip.startDate);
  await screen.getByLabel("Вылет не позже").fill(initialTrip.startDate);
  await screen.getByRole("button", "Готово").tap();
  await screen.getByRole("button", "Найти туры").tap();
  await expect(screen.getByText("Найдено отелей: 3")).toBeVisible();
  await screen.getByRole("button", "Выбрать вариант — Океан рядом").tap();
  await screen
    .getByRole(
      "button",
      `Подробнее: Океан рядом, ${formatDate(initialTrip.startDate)}, 7 ночей, Завтраки`,
    )
    .tap();
  await expect(
    screen.getByText(
      new RegExp(
        `${formatDate(initialTrip.startDate)} — ${formatDate(addDays(initialTrip.startDate, 7))}`,
      ),
    ),
  ).toBeVisible();
});

test("budget empty state offers an individual enquiry", async ({
  app,
  screen,
}) => {
  await app.open("/");
  await select(screen, "Бюджет на всех, включая перелёт", "До 300 000 ₽");
  await screen.getByRole("button", "Найти туры").tap();
  await expect(
    screen.getByText("По вашим параметрам туров не найдено"),
  ).toBeVisible();
  await screen.getByRole("button", "Обсудить индивидуальный маршрут").tap();
  await expect(
    screen.getByRole("heading", "Индивидуальное путешествие"),
  ).toBeVisible();
  await expect(screen.getByTestId("booking-phone")).toBeVisible();
});

test("calendar and child validation block an invalid search", async ({
  app,
  screen,
}) => {
  await app.open("/");
  await screen.getByRole("button", "Даты возможного вылета").tap();
  await screen
    .getByLabel("Вылет не позже")
    .fill(addDays(initialTrip.startDate, -1));
  await screen.getByRole("button", "Готово").tap();
  await screen.getByRole("button", "Увеличить число детей").tap();
  await screen.getByRole("button", "Найти туры").tap();
  await expect(
    screen.getByText("Конец диапазона не может быть раньше начала."),
  ).toBeVisible();
  await expect(
    screen.getByText("Укажите возраст ребёнка на момент поездки."),
  ).toBeVisible();
});

test("hotel filters narrow results and reset without losing search", async ({
  app,
  screen,
}) => {
  await app.open("/");
  await screen.getByRole("button", "Найти туры").tap();
  await select(screen, "Класс отеля", "5 звёзд");
  await expect(screen.getByText("Найдено отелей: 2")).toBeVisible();
  await select(screen, "Питание", "Полупансион");
  await screen.getByRole("button", "Выбрать вариант — Среди зелени").tap();
  await expect(
    screen.getByRole(
      "button",
      `Подробнее: Среди зелени, ${formatDate(initialTrip.startDate)}, 7 ночей, Завтраки`,
    ),
  ).toHaveCount(0);
  await screen.getByRole("button", "Сбросить фильтры").tap();
  await expect(screen.getByText("Найдено отелей: 3")).toBeVisible();
});
