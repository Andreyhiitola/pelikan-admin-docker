# PROJECT.md — Документация проекта pelikan-admin-docker

## О проекте
Проект **pelikan-admin-docker** — это админ-панель с серверной частью на Node.js, предназначенная для управления меню и расписанием сайта или приложения. Проект упакован в Docker-контейнер с использованием SQLite для хранения данных и HTTPS для обеспечения безопасности.

## Структура проекта
```
pelikan-admin-docker/
├── data/                      # Хранилище данных SQLite и текстовых файлов
│   ├── menu.txt               # Текстовое меню, редактируемое пользователем
│   ├── schedule.txt           # Текстовое расписание
│   └── database.sqlite        # SQLite база данных
├── public/                    # Фронтенд админ-панели (HTML/JS/CSS)
│   ├── index.html             # Основной интерфейс с textarea для редактирования
│   ├── app.js                 # Логика конвертации и отправки данных
│   └── styles.css             # Стили для админ-панели
├── Dockerfile                 # Описание образа Docker
├── docker-compose.yml         # Конфигурация Docker Compose
├── server.js                  # Сервер Node.js с API и логикой работы с файлами
├── package.json               # Node.js зависимости и скрипты
├── privkey.pem                # SSL ключ для HTTPS (НЕ коммитить в репо)
├── fullchain.pem              # SSL сертификат для HTTPS (НЕ коммитить в репо)
├── README.md                  # Инструкция по использованию
└── .gitignore                 # Исключить секюрные и временные файлы
```

## Установка и запуск

1. Клонировать репозиторий и перейти в папку проекта
2. Создать папку `data/` и добавить туда файлы `menu.txt` и `schedule.txt` (шаблоны имеются в репозитории)
3. Скопировать SSL-сертификаты `privkey.pem` и `fullchain.pem` в корень (НЕ выкладывать в репозиторий)
4. Собрать и запустить контейнеры Docker:
```
docker-compose build
docker-compose up -d
```
5. Открыть админ-панель по адресу: https://localhost:8443 или https://<IP_сервера>:8443

## API

- GET `/api/getMenuText` — получить исходный текст меню
- POST `/api/saveMenuText` — сохранить сторонний текст меню; автоматически конвертируется в JSON

## Безопасность

- Для HTTPS используется SSL сертификаты
- В продакшене рекомендуется настроить аутентификацию и firewall
- Никогда не храните секреты и сертификаты в публичных репозиториях

## CI/CD

- Настройте GitHub Actions workflow для автоматической сборки Docker-образа и деплоя на VPS
- Храните секреты GitHub в GitHub Secrets (DOCKER_USERNAME, VPS_SSH_KEY и др.)

## Контакты

По вопросам и развитию проекта обращайтесь к разработчику.

***

Этот файл должен быть размещён в корне репозитория pelikan-admin-docker как основная документация проекта.

Если нужно, могу помочь также составить README.md и другие вспомогательные файлы.

[1](https://habr.com/ru/articles/725132/)
[2](https://sites.google.com/site/ndmisharin/home/tutorials/readme)
[3](https://doka.guide/recipes/github-add-readme/)
[4](https://www.youtube.com/watch?v=VQAX_W2cXQc)
[5](https://htmlacademy.ru/blog/git/markdown)
[6](https://wiki.merionet.ru/articles/kak-napisat-xorosii-readme-fail-dlia-vasego-proekta-github)
[7](https://lyucean.com/how-to-write-readme/)
[8](https://ru.hexlet.io/blog/posts/kak-napisat-horoshiy-readme-dlya-vashego-proekta-na-github)
[9](https://gist.github.com/Jekins/2bf2d0638163f1294637)


# PROJECT.md — Документация проекта pelikan-admin-docker

## О проекте
Проект **pelikan-admin-docker** — это админ-панель с серверной частью на Node.js, предназначенная для управления меню и расписанием сайта или приложения. Проект упакован в Docker-контейнер с использованием SQLite для хранения данных и HTTPS для обеспечения безопасности.

## Структура проекта
```
pelikan-admin-docker/
├── data/                      # Хранилище данных SQLite и текстовых файлов
│   ├── menu.txt               # Текстовое меню, редактируемое пользователем
│   ├── schedule.txt           # Текстовое расписание
│   └── database.sqlite        # SQLite база данных
├── public/                    # Фронтенд админ-панели (HTML/JS/CSS)
│   ├── index.html             # Основной интерфейс с textarea для редактирования
│   ├── app.js                 # Логика конвертации и отправки данных
│   └── styles.css             # Стили для админ-панели
├── Dockerfile                 # Описание образа Docker
├── docker-compose.yml         # Конфигурация Docker Compose
├── server.js                  # Сервер Node.js с API и логикой работы с файлами
├── package.json               # Node.js зависимости и скрипты
├── privkey.pem                # SSL ключ для HTTPS (НЕ коммитить в репо)
├── fullchain.pem              # SSL сертификат для HTTPS (НЕ коммитить в репо)
├── README.md                  # Инструкция по использованию
└── .gitignore                 # Исключить секюрные и временные файлы
```

## Установка и запуск

1. Клонировать репозиторий и перейти в папку проекта
2. Создать папку `data/` и добавить туда файлы `menu.txt` и `schedule.txt` (шаблоны имеются в репозитории)
3. Скопировать SSL-сертификаты `privkey.pem` и `fullchain.pem` в корень (НЕ выкладывать в репозиторий)
4. Собрать и запустить контейнеры Docker:
```
docker-compose build
docker-compose up -d
```
5. Открыть админ-панель по адресу: https://localhost:8443 или https://<IP_сервера>:8443

## API

- GET `/api/getMenuText` — получить исходный текст меню
- POST `/api/saveMenuText` — сохранить сторонний текст меню; автоматически конвертируется в JSON

## Безопасность

- Для HTTPS используется SSL сертификаты
- В продакшене рекомендуется настроить аутентификацию и firewall
- Никогда не храните секреты и сертификаты в публичных репозиториях

## CI/CD

- Настройте GitHub Actions workflow для автоматической сборки Docker-образа и деплоя на VPS
- Храните секреты GitHub в GitHub Secrets (DOCKER_USERNAME, VPS_SSH_KEY и др.)

## Контакты

По вопросам и развитию проекта обращайтесь к разработчику.

***

Этот файл должен быть размещён в корне репозитория pelikan-admin-docker как основная документация проекта.

Если нужно, могу помочь также составить README.md и другие вспомогательные файлы.

[1](https://habr.com/ru/articles/725132/)
[2](https://sites.google.com/site/ndmisharin/home/tutorials/readme)
[3](https://doka.guide/recipes/github-add-readme/)
[4](https://www.youtube.com/watch?v=VQAX_W2cXQc)
[5](https://htmlacademy.ru/blog/git/markdown)
[6](https://wiki.merionet.ru/articles/kak-napisat-xorosii-readme-fail-dlia-vasego-proekta-github)
[7](https://lyucean.com/how-to-write-readme/)
[8](https://ru.hexlet.io/blog/posts/kak-napisat-horoshiy-readme-dlya-vashego-proekta-na-github)
[9](https://gist.github.com/Jekins/2bf2d0638163f1294637)# PROJECT.md — Документация проекта pelikan-admin-docker

## О проекте
Проект **pelikan-admin-docker** — это админ-панель с серверной частью на Node.js, предназначенная для управления меню и расписанием сайта или приложения. Проект упакован в Docker-контейнер с использованием SQLite для хранения данных и HTTPS для обеспечения безопасности.

## Структура проекта
```
pelikan-admin-docker/
├── data/                      # Хранилище данных SQLite и текстовых файлов
│   ├── menu.txt               # Текстовое меню, редактируемое пользователем
│   ├── schedule.txt           # Текстовое расписание
│   └── database.sqlite        # SQLite база данных
├── public/                    # Фронтенд админ-панели (HTML/JS/CSS)
│   ├── index.html             # Основной интерфейс с textarea для редактирования
│   ├── app.js                 # Логика конвертации и отправки данных
│   └── styles.css             # Стили для админ-панели
├── Dockerfile                 # Описание образа Docker
├── docker-compose.yml         # Конфигурация Docker Compose
├── server.js                  # Сервер Node.js с API и логикой работы с файлами
├── package.json               # Node.js зависимости и скрипты
├── privkey.pem                # SSL ключ для HTTPS (НЕ коммитить в репо)
├── fullchain.pem              # SSL сертификат для HTTPS (НЕ коммитить в репо)
├── README.md                  # Инструкция по использованию
└── .gitignore                 # Исключить секюрные и временные файлы
```

## Установка и запуск

1. Клонировать репозиторий и перейти в папку проекта
2. Создать папку `data/` и добавить туда файлы `menu.txt` и `schedule.txt` (шаблоны имеются в репозитории)
3. Скопировать SSL-сертификаты `privkey.pem` и `fullchain.pem` в корень (НЕ выкладывать в репозиторий)
4. Собрать и запустить контейнеры Docker:
```
docker-compose build
docker-compose up -d
```
5. Открыть админ-панель по адресу: https://localhost:8443 или https://<IP_сервера>:8443

## API

- GET `/api/getMenuText` — получить исходный текст меню
- POST `/api/saveMenuText` — сохранить сторонний текст меню; автоматически конвертируется в JSON

## Безопасность

- Для HTTPS используется SSL сертификаты
- В продакшене рекомендуется настроить аутентификацию и firewall
- Никогда не храните секреты и сертификаты в публичных репозиториях

## CI/CD

- Настройте GitHub Actions workflow для автоматической сборки Docker-образа и деплоя на VPS
- Храните секреты GitHub в GitHub Secrets (DOCKER_USERNAME, VPS_SSH_KEY и др.)

## Контакты

По вопросам и развитию проекта обращайтесь к разработчику.

***

Этот файл должен быть размещён в корне репозитория pelikan-admin-docker как основная документация проекта.

Если нужно, могу помочь также составить README.md и другие вспомогательные файлы.

[1](https://habr.com/ru/articles/725132/)
[2](https://sites.google.com/site/ndmisharin/home/tutorials/readme)
[3](https://doka.guide/recipes/github-add-readme/)
[4](https://www.youtube.com/watch?v=VQAX_W2cXQc)
[5](https://htmlacademy.ru/blog/git/markdown)
[6](https://wiki.merionet.ru/articles/kak-napisat-xorosii-readme-fail-dlia-vasego-proekta-github)
[7](https://lyucean.com/how-to-write-readme/)
[8](https://ru.hexlet.io/blog/posts/kak-napisat-horoshiy-readme-dlya-vashego-proekta-na-github)
[9](https://gist.github.com/Jekins/2bf2d0638163f1294637)# PROJECT.md — Документация проекта pelikan-admin-docker

## О проекте
Проект **pelikan-admin-docker** — это админ-панель с серверной частью на Node.js, предназначенная для управления меню и расписанием сайта или приложения. Проект упакован в Docker-контейнер с использованием SQLite для хранения данных и HTTPS для обеспечения безопасности.

## Структура проекта
```
pelikan-admin-docker/
├── data/                      # Хранилище данных SQLite и текстовых файлов
│   ├── menu.txt               # Текстовое меню, редактируемое пользователем
│   ├── schedule.txt           # Текстовое расписание
│   └── database.sqlite        # SQLite база данных
├── public/                    # Фронтенд админ-панели (HTML/JS/CSS)
│   ├── index.html             # Основной интерфейс с textarea для редактирования
│   ├── app.js                 # Логика конвертации и отправки данных
│   └── styles.css             # Стили для админ-панели
├── Dockerfile                 # Описание образа Docker
├── docker-compose.yml         # Конфигурация Docker Compose
├── server.js                  # Сервер Node.js с API и логикой работы с файлами
├── package.json               # Node.js зависимости и скрипты
├── privkey.pem                # SSL ключ для HTTPS (НЕ коммитить в репо)
├── fullchain.pem              # SSL сертификат для HTTPS (НЕ коммитить в репо)
├── README.md                  # Инструкция по использованию
└── .gitignore                 # Исключить секюрные и временные файлы
```

## Установка и запуск

1. Клонировать репозиторий и перейти в папку проекта
2. Создать папку `data/` и добавить туда файлы `menu.txt` и `schedule.txt` (шаблоны имеются в репозитории)
3. Скопировать SSL-сертификаты `privkey.pem` и `fullchain.pem` в корень (НЕ выкладывать в репозиторий)
4. Собрать и запустить контейнеры Docker:
```
docker-compose build
docker-compose up -d
```
5. Открыть админ-панель по адресу: https://localhost:8443 или https://<IP_сервера>:8443

## API

- GET `/api/getMenuText` — получить исходный текст меню
- POST `/api/saveMenuText` — сохранить сторонний текст меню; автоматически конвертируется в JSON

## Безопасность

- Для HTTPS используется SSL сертификаты
- В продакшене рекомендуется настроить аутентификацию и firewall
- Никогда не храните секреты и сертификаты в публичных репозиториях

## CI/CD

- Настройте GitHub Actions workflow для автоматической сборки Docker-образа и деплоя на VPS
- Храните секреты GitHub в GitHub Secrets (DOCKER_USERNAME, VPS_SSH_KEY и др.)

## Контакты

По вопросам и развитию проекта обращайтесь к разработчику.

***

Этот файл должен быть размещён в корне репозитория pelikan-admin-docker как основная документация проекта.
pelikan-admin-docker/
├── data/                      # Хранилище данных SQLite и текстовых файлов
│   ├── menu.txt               # Текстовое меню, редактируемое пользователем
│   ├── schedule.txt           # Текстовое расписание
│   └── database.sqlite        # SQLite база данных
├── public/                    # Фронтенд админ-панели (HTML/JS/CSS)
│   ├── index.html             # Основной интерфейс с textarea для редактирования
│   ├── app.js                 # Логика конвертации и отправки данных
│   └── styles.css             # Стили для админ-панели
├── Dockerfile                 # Описание образа Docker
├── docker-compose.yml         # Конфигурация Docker Compose
├── server.js                  # Сервер Node.js с API и логикой работы с файлами
├── package.json               # Node.js зависимости и скрипты
├── privkey.pem                # SSL ключ для HTTPS (НЕ коммитить в репо)
├── fullchain.pem              # SSL сертификат для HTTPS (НЕ коммитить в репо)
├── README.md                  # Инструкция по использованию
└── .gitignore                 # Исключить секюрные и временные файлы
PROJECT.md — Документация проекта pelikan-admin-docker
О проекте
Проект pelikan-admin-docker — это админ-панель с серверной частью на Node.js, предназначенная для управления меню и расписанием сайта или приложения. Проект упакован в Docker-контейнер с использованием SQLite для хранения данных и HTTPS для обеспечения безопасности.

Структура проекта


Установка и запуск
Клонировать репозиторий и перейти в папку проекта

Создать папку data/ и добавить туда файлы menu.txt и schedule.txt (шаблоны имеются в репозитории)

Скопировать SSL-сертификаты privkey.pem и fullchain.pem в корень (НЕ выкладывать в репозиторий)

Собрать и запустить контейнеры Docker:

docker-compose build
docker-compose up -d

Открыть админ-панель по адресу: https://localhost:8443 или https://<IP_сервера>:8443

API
GET /api/getMenuText — получить исходный текст меню

POST /api/saveMenuText — сохранить сторонний текст меню; автоматически конвертируется в JSON

Безопасность
Для HTTPS используется SSL сертификаты

В продакшене рекомендуется настроить аутентификацию и firewall

Никогда не храните секреты и сертификаты в публичных репозиториях

CI/CD
Настройте GitHub Actions workflow для автоматической сборки Docker-образа и деплоя на VPS

Храните секреты GitHub в GitHub Secrets (DOCKER_USERNAME, VPS_SSH_KEY и др.)

Контакты
По вопросам и развитию проекта обращайтесь к разработчику.

Этот файл должен быть размещён в корне репозитория pelikan-admin-docker как основная документация проекта.

Если нужно, могу помочь также составить README.md и другие вспомогательные файлы.



09.11.2025__20:42 # PROJECT.md для pelikan-admin-docker﻿

## О проекте﻿

Проект pelikan-admin-docker — это админ-панель с backend на Node.js, предназначенная для управления меню и расписанием сайта или мобильного приложения. Проект упакован в Docker с использованием SQLite и HTTPS.

## Структура проекта﻿

text
pelikan-admin-docker/
├── data/                     # Хранилище файлов меню, расписания, база данных
├── public/                   # Фронтенд админ-панели (HTML/JS/CSS)
├── Dockerfile                # Инструкция сборки Docker-образа
├── docker-compose.yml        # Конфигурация запуска контейнеров
├── server.js                 # Сервер Node.js с API
├── package.json              # Зависимости проекта
├── README.md                 # Описание проекта
├── privkey.pem               # SSL ключ (НЕ коммитить)
├── fullchain.pem             # SSL сертификат (НЕ коммитить)
└── .gitignore                # Исключённые файлы
## Установка и запуск﻿

Клонируйте репозиторий и перейдите в папку проекта:

text
git clone https://github.com/Andreyhiitola/pelikan-admin-docker.git
cd pelikan-admin-docker
Создайте папку data/ и добавьте туда файлы menu.txt, schedule.txt (шаблоны есть в репо).

Скопируйте свои SSL сертификаты privkey.pem, fullchain.pem в корень проекта (без коммита).

Соберите и запустите Docker-контейнеры:

text
docker-compose build
docker-compose up -d
Откройте браузер по адресу https://localhost:8443 или https://<IP_сервера>:8443.

## API﻿

GET /api/getMenuText — получить исходный текст меню

POST /api/saveMenuText — отправить текст меню, который будет сохранён и конвертирован в JSON

## Технологии﻿

Node.js с Express

SQLite для хранения данных

Docker и Docker Compose

HTTPS с SSL

## Безопасность﻿

Используйте ваши SSL сертификаты для HTTPS

Настройте firewall и ограничьте доступ к админ-панели

Не храните ключи и сертификаты в публичных репозиториях

## CI/CD﻿

Используйте GitHub Actions для автоматической сборки образа и деплоя на VPS

Держите секреты в GitHub Secrets (Docker Hub креды, SSH ключи и др.)

## Контакты﻿
VPS_SSH_KEY — приватный SSH ключ для доступа к VPS/ я так понимаю надо вз
По всем вопросам и предложениям обращайтесь к разработчику.VPS_SSH_KEY — приватный SSH ключ для доступа к VPS/ я так понимаю надо вз
