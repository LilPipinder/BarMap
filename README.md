# Барная карта (Bar Map)

Angular 21 приложение для управления рецептами коктейлей с полным CRUD.

## Возможности

- Список коктейлей в таблице (дата, название, фото)
- Создание / редактирование рецепта
- Название, описание, шаги приготовления
- Изображения для каждого шага и итогового результата 
- Просмотр детальной карточки коктейля
- Удаление карточки коктейля

## Хранение

Данные сохраняются в `localStorage` браузера.

## Запуск

```bash
npm install
npm start
```



## Структура

- `src/app/models` — модели
- `src/app/services` — CocktailService
- `src/app/components/cocktail-list` — таблица
- `src/app/components/cocktail-form` — форма create/edit
- `src/app/components/cocktail-detail` — просмотр