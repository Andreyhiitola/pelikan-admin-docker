const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8443;

app.use(bodyParser.json());
app.use(express.static('public'));

const DATA_DIR = path.join(__dirname, 'data');

app.get('/api/getMenuText', (req, res) => {
  const file = path.join(DATA_DIR, 'menu.txt');
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Ошибка чтения файла');
    res.send(data);
  });
});

app.post('/api/saveMenuText', (req, res) => {
  const content = req.body.content;
  const file = path.join(DATA_DIR, 'menu.txt');
  fs.writeFile(file, content, 'utf8', err => {
    if (err) return res.status(500).send('Ошибка записи файла');

    const lines = content.split('\n');
    const menu = {};
    lines.forEach(line => {
      const parts = line.split(':');
      if(parts.length === 2) {
        const key = parts[0].trim();
        const value = parts[1].trim();
        menu[key] = value;
      }
    });

    fs.writeFile(path.join(DATA_DIR, 'menu.json'), JSON.stringify(menu, null, 2), errJson => {
      if (errJson) return res.status(500).send('Ошибка записи JSON');
      res.send('Меню сохранено и конвертировано в JSON');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}`);
});
