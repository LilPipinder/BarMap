# Барная карта (Bar Map)

Angular 21 приложение для управления рецептами коктейлей с полным CRUD.

## Возможности

- Список коктейлей в таблице (дата, название, фото)
- Создание / редактирование рецепта
- Название, описание, шаги приготовления
- Изображения для каждого шага и итогового результата (base64 в localStorage)
- Просмотр детальной карточки
- Удаление

## Хранение

Данные сохраняются в `localStorage` браузера. Есть seed-данные (Мохито, Маргарита).

## Запуск

```bash
npm install
npm start
```


## Технологии

- Angular 21 (standalone components, signals)
- Angular Material
- Reactive Forms
- localStorage

## Структура

- `src/app/models` — модели
- `src/app/services` — CocktailService
- `src/app/components/cocktail-list` — таблица
- `src/app/components/cocktail-form` — форма create/edit
- `src/app/components/cocktail-detail` — просмотр