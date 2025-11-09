Проект pelikan-admin-docker
# pelikan-admin-docker

## Описание

**pelikan-admin-docker** — это админ-панель с серверной частью на Node.js, предназначенная для управления меню и расписанием сайта или приложения. Проект упакован в Docker-контейнер с использованием SQLite для хранения данных и HTTPS.

## Структура проекта


## Установка и запуск

pelikan-admin-docker/
├── data/ # Хранилище данных (текстовые файлы и SQLite)
├── public/ # Фронтенд админ-панели (HTML, JS, CSS)
├── Dockerfile # Docker образ для сервера
├── docker-compose.yml # Конфигурация Docker Compose
├── server.js # Сервер Node.js с API
├── package.json # Зависимости Node.js
├── README.md # Этот файл
├── privkey.pem # SSL ключ (НЕ коммитить)
├── fullchain.pem # SSL сертификат (НЕ коммитить)
└── .gitignore # Список исключаемых файлов



## Установка и запуск

1. Клонируйте репозиторий:
   git clone https://github.com/<ваш-пользователь>/pelikan-admin-docker.git
cd pelikan-admin-docker

   
2. Создайте папку для хранения данных и положите туда шаблонные файлы (menu.txt, schedule.txt).

3. Скопируйте в корень проекта SSL сертификаты `privkey.pem` и `fullchain.pem` (не коммитить!).

4. Соберите и запустите контейнеры:

docker-compose build
docker-compose up -d


5. Откройте https://localhost:8443 или https://<IP_сервера>:8443 для доступа к админ-панели.

## API

- `GET /api/getMenuText` — получить исходный текст меню для редактирования.
- `POST /api/saveMenuText` — отправить текст для сохранения и конвертации в JSON.

## Работа с кодом

Проект использует:
- Node.js с Express
- SQLite для хранения данных
- Docker и Docker Compose
- HTTPS с SSL

## Безопасность

- Используйте настоящие SSL сертификаты.
- Настройте доступ и firewall на сервере.
- Не выкладывайте секреты в публичный репозиторий.

## CI/CD

Настройте GitHub Actions для автоматической сборки Docker-образа и деплоя на сервер (используйте секреты GitHub для защиты данных).

## Контакты

Если есть вопросы или предложения — обращайтесь.

---

_Этот README поможет вам быстро запустить и развивать проект pelikan-admin-docker._

