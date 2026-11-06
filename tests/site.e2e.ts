import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

test('keeps trip preferences when moving to the demo enquiry', async ({ app, screen }) => {
  await app.open('/');
  await screen.getByLabel('Куда отправимся').selectOption({ value: 'Убуд' });
  await screen.getByRole('button', 'Уменьшить число взрослых').tap();
  await screen.getByRole('button', 'Показать туры').tap();
  await screen.getByRole('button', 'Обсудить этот тур').tap();
  await expect(screen.getByText(/Даты подберём вместе/)).toContainText('1 взрослый');
  await screen.getByLabel('Как вас зовут?').fill('Тест');
  await screen.getByLabel('Телефон или Telegram').fill('@test_example');
  await screen.getByRole('button', 'Начать планировать').tap();
  await expect(screen.getByText(/^Так будет выглядеть отправка заявки/)).toContainText('заявка не отправлена');
  await screen.getByRole('link', /Изменить пожелания/).tap();
  await expect(screen.getByLabel('Куда отправимся')).toHaveValue('Убуд');
});

test('validates dates and child ages before proceeding', async ({ app, screen }) => {
  await app.open('/');
  await screen.getByLabel('Даты пока не определены').tap();
  await screen.getByLabel('Вылет', { exact: true }).fill('2099-06-15');
  await screen.getByLabel('Возвращение', { exact: true }).fill('2099-06-10');
  await screen.getByRole('button', 'Увеличить число детей').tap();
  await screen.getByRole('button', 'Показать туры').tap();
  await expect(screen.getByText('Возвращение должно быть позже вылета.')).toBeVisible();
  await expect(screen.getByText('Укажите возраст ребёнка на момент поездки.')).toBeVisible();
  await screen.getByLabel('Возвращение', { exact: true }).fill('2099-06-25');
  await screen.getByLabel('Возраст ребёнка 1').selectOption({ value: '5' });
  await screen.getByRole('button', 'Показать туры').tap();
  await expect(screen.getByText('Подходящих программ: 1')).toBeVisible();
  await screen.getByRole('button', 'Обсудить этот тур').tap();
  await expect(screen.getByText(/дети: 5 лет/)).toContainText('15 июня — 25 июня');
});

test('accepts a destination from a journey card', async ({ app, screen }) => {
  await app.open('/');
  await screen.getByRole('link', 'Спланировать путешествие в Чангу').tap();
  await expect(screen.getByLabel('Куда отправимся')).toHaveValue('Чангу');
  await screen.getByRole('button', 'Показать туры').tap();
  await screen.getByRole('button', 'Обсудить этот тур').tap();
  await expect(screen.getByText(/Даты подберём вместе/)).toContainText('Чангу');
});

test('shows an honest empty state when the budget excludes all programs', async ({ app, screen }) => {
  await app.open('/');
  await screen.getByText('Город вылета, бюджет и пожелания').tap();
  await screen.getByLabel('Бюджет на всех, включая перелёт').selectOption('До 300 000 ₽');
  await screen.getByRole('button', 'Показать туры').tap();
  await expect(screen.getByText('По вашим параметрам программ не найдено')).toBeVisible();
  await expect(screen.getByRole('button', 'Обсудить этот тур')).toHaveCount(0);
  await screen.getByRole('button', 'Обсудить индивидуальный маршрут').tap();
  await expect(screen.getByRole('heading', 'Индивидуальное путешествие')).toBeVisible();
});
