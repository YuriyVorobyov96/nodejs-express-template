# <пример>Node.js Express Template</пример>

## Содержание
1. [Функционал](#функционал)
2. [Начало работы](#начало-работы)
3. [NPM Scripts](#npm-scripts)
4. [Архитектура](#архитектура)

## Функционал
- Слоистая архитектура: Module-Controller-Service-Repository
- Инъекция зависимостей и инверсия управления с помощью inversifyJS

## Начало работы
### Установка зависимостей
```sh
yarn install
```
### Конфигурация
Создайте файл `local.js` внутри директории `config`:
```sh
touch config/local.js
```
Заполните необходимыми данными, например, укажите параметры подключения к вашей локальной базе данных
### Запуск миграций
Запустите `migrate:up` для получения последнего состояния базы данных
```sh
npm run migrate:up
```
### Запуск приложения
Запустите `dev`
```sh
npm run dev
```

## NPM Scripts

| Script | Description |
| ------ | ------ |
| build | сборка ts кода |
| start | запуск собранного кода |
| dev | запуск приложения с автоматической перезагрузкой |
| inspect | запуск в режиме отладки |
| lint | запуск линтера |
| lint:fix | запуск линтера с автоисправлением |
| migrate:up | запуск миграций |
| migrate:down | откат последней миграции |
| migrate:generate | генерация миграции на основе изменения сущностей БД |
| migrate:create | создание пустой миграции |
| *typeorm* | *технический скрипт, используемый другими скриптами* |

## Архитектура
### Блоки
- Module - логика для DI и IoC
- Controller - слой с функциями, соответствующими путям сервера, с доступом к объектам Request/Response
- Service - слой с логикой бизнеса
- Repository - слой взаимодействия с БД