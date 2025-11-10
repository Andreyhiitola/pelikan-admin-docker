const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const https = require('https');
const fs = require('fs');
const path = require('path');
const { Octokit } = require("@octokit/rest");

const app = express();
const PORT = process.env.PORT || 8443;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// SQLite database
const db = new sqlite3.Database('./data/database.sqlite');

// GitHub API client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const GITHUB_OWNER = 'Andreyhiitola';
const REPOS = {
  site: 'pelikan-alakol-site',
  app: 'pelikan-android-app'
};

// Initialize database
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section TEXT NOT NULL,
    data TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// === API ENDPOINTS ===

// Получить данные из БД
app.get('/api/:section', (req, res) => {
  const { section } = req.params;
  
  db.get('SELECT data FROM content WHERE section = ? ORDER BY updated_at DESC LIMIT 1', 
    [section], 
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(row ? JSON.parse(row.data) : {});
    }
  );
});

// Сохранить данные в БД
app.post('/api/:section', (req, res) => {
  const { section } = req.params;
  const data = JSON.stringify(req.body);
  
  db.run('INSERT INTO content (section, data) VALUES (?, ?)', 
    [section, data], 
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, message: 'Data saved to database' });
    }
  );
});

// === GITHUB SYNC ===

// Синхронизировать раздел с GitHub
app.post('/api/sync/:section', async (req, res) => {
  const { section } = req.params;
  
  try {
    // Получить последние данные из БД
    const row = await new Promise((resolve, reject) => {
      db.get('SELECT data FROM content WHERE section = ? ORDER BY updated_at DESC LIMIT 1',
        [section],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
    
    if (!row) {
      return res.status(404).json({ error: 'No data found for this section' });
    }
    
    const jsonData = JSON.parse(row.data);
    const content = Buffer.from(JSON.stringify(jsonData, null, 2)).toString('base64');
    
    // Определить путь к файлу в зависимости от раздела
    const filePath = `data/${section}.json`;
    
    // Обновить файлы в обоих репозиториях
    const results = await Promise.all([
      updateGitHubFile(REPOS.site, filePath, content, `Update ${section} from admin panel`),
      updateGitHubFile(REPOS.app, `shared-content/${filePath}`, content, `Update ${section} from admin panel`)
    ]);
    
    res.json({ 
      success: true, 
      message: 'Synced to GitHub successfully',
      results 
    });
    
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Синхронизировать все разделы
app.post('/api/sync-all', async (req, res) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT DISTINCT section FROM content', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    const sections = rows.map(r => r.section);
    const results = [];
    
    for (const section of sections) {
      try {
        const result = await syncSection(section);
        results.push({ section, success: true, result });
      } catch (error) {
        results.push({ section, success: false, error: error.message });
      }
    }
    
    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Вспомогательная функция для обновления файла в GitHub
async function updateGitHubFile(repo, path, content, message) {
  try {
    // Попытаться получить SHA существующего файла
    let sha;
    try {
      const { data } = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: repo,
        path: path,
      });
      sha = data.sha;
    } catch (err) {
      // Файл не существует, создадим новый
      sha = undefined;
    }
    
    // Создать или обновить файл
    const result = await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: repo,
      path: path,
      message: message,
      content: content,
      sha: sha,
    });
    
    return { repo, path, success: true, url: result.data.content.html_url };
  } catch (error) {
    throw new Error(`Failed to update ${repo}/${path}: ${error.message}`);
  }
}

// Синхронизация одного раздела
async function syncSection(section) {
  const row = await new Promise((resolve, reject) => {
    db.get('SELECT data FROM content WHERE section = ? ORDER BY updated_at DESC LIMIT 1',
      [section],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
  
  if (!row) throw new Error(`No data for section: ${section}`);
  
  const jsonData = JSON.parse(row.data);
  const content = Buffer.from(JSON.stringify(jsonData, null, 2)).toString('base64');
  const filePath = `data/${section}.json`;
  
  return await Promise.all([
    updateGitHubFile(REPOS.site, filePath, content, `Update ${section}`),
    updateGitHubFile(REPOS.app, `shared-content/${filePath}`, content, `Update ${section}`)
  ]);
}

// HTTPS server
const options = {
  key: fs.readFileSync('./privkey.pem'),
  cert: fs.readFileSync('./fullchain.pem')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`🚀 Server running on https://localhost:${PORT}`);
  console.log(`📝 Admin panel: https://localhost:${PORT}`);
  console.log(`🔄 GitHub sync enabled for: ${REPOS.site} and ${REPOS.app}`);
});
