export const countries = [
  {
    id: "turkey",
    name: "Турция",
    resorts: ["Анталья", "Бодрум", "Кемер"],
    arrival: "Анталья",
  },
  {
    id: "egypt",
    name: "Египет",
    resorts: ["Шарм-эль-Шейх", "Хургада", "Марса-Алам"],
    arrival: "Шарм-эль-Шейх",
  },
  {
    id: "uae",
    name: "ОАЭ",
    resorts: ["Дубай", "Абу-Даби", "Рас-эль-Хайма"],
    arrival: "Дубай",
  },
  {
    id: "thailand",
    name: "Таиланд",
    resorts: ["Пхукет", "Паттайя", "Самуи"],
    arrival: "Пхукет",
  },
  {
    id: "indonesia",
    name: "Индонезия",
    resorts: ["Чангу", "Убуд", "Нуса-Дуа"],
    arrival: "Денпасар",
  },
  {
    id: "vietnam",
    name: "Вьетнам",
    resorts: ["Нячанг", "Фукуок", "Дананг"],
    arrival: "Нячанг",
  },
  {
    id: "maldives",
    name: "Мальдивы",
    resorts: ["Северный Мале", "Южный Мале", "Ари"],
    arrival: "Мале",
  },
  {
    id: "sri-lanka",
    name: "Шри-Ланка",
    resorts: ["Бентота", "Унаватуна", "Хиккадува"],
    arrival: "Коломбо",
  },
  {
    id: "china",
    name: "Китай",
    resorts: ["Санья", "Дадунхай", "Ялунвань"],
    arrival: "Санья",
  },
  {
    id: "greece",
    name: "Греция",
    resorts: ["Крит", "Родос", "Корфу"],
    arrival: "Афины",
  },
  {
    id: "italy",
    name: "Италия",
    resorts: ["Рим", "Сицилия", "Сардиния"],
    arrival: "Рим",
  },
  {
    id: "spain",
    name: "Испания",
    resorts: ["Барселона", "Майорка", "Тенерифе"],
    arrival: "Барселона",
  },
  {
    id: "georgia",
    name: "Грузия",
    resorts: ["Тбилиси", "Батуми", "Кобулети"],
    arrival: "Тбилиси",
  },
  {
    id: "japan",
    name: "Япония",
    resorts: ["Токио", "Киото", "Осака"],
    arrival: "Токио",
  },
  {
    id: "mauritius",
    name: "Маврикий",
    resorts: ["Гранд-Бэ", "Флик-ан-Флак", "Бель-Мар"],
    arrival: "Порт-Луи",
  },
];
export const countryName = (id) =>
  countries.find((c) => c.id === id)?.name || "Любая страна";
export const getCountry = (id) => countries.find((c) => c.id === id);
