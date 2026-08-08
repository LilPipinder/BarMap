# Барная карта (Bar Map)🍸
<img width="1847" height="505" alt="image" src="https://github.com/user-attachments/assets/5b602f78-4acb-40c7-a308-f81d8f8fc693" />


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
- `src/app/services` — используемые методы
- `src/app/components/cocktail-list` — таблица
- `src/app/components/cocktail-form` — форма create/edit
- `src/app/components/cocktail-detail` — просмотр
