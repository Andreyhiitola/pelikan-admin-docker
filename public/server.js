const CONFIG = {
    contentPath: "", // Нет подкаталога, файлы лежат в корне репозитория
    repos: {
        main: "Andreyhiitola/pelikan-admin-docker", // Ваш GitHub репозиторий
    },
    sections: [
        {
            id: "menu",
            name: "Меню",
            description: "Редактирование текстового меню",
            repo: "main",
            file: "data/menu.txt"
        },
        {
            id: "schedule",
            name: "Расписание",
            description: "Редактирование текстового расписания",
            repo: "main",
            file: "data/schedule.txt"
        }
    ]
};
