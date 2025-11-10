// Загрузить данные при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  loadSection('menu');
  loadSection('schedule');
  loadSection('accommodation');
});

// Загрузить раздел из API
async function loadSection(section) {
  try {
    const response = await fetch(`/api/${section}`);
    const data = await response.json();
    document.getElementById(section).value = JSON.stringify(data, null, 2);
  } catch (error) {
    showStatus(section, `Ошибка загрузки: ${error.message}`, 'error');
  }
}

// Сохранить раздел в БД
async function saveSection(section) {
  const textarea = document.getElementById(section);
  const statusEl = document.getElementById(`${section}-status`);
  
  try {
    const data = JSON.parse(textarea.value);
    
    const response = await fetch(`/api/${section}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      showStatus(section, '✅ Сохранено в базу данных', 'success');
    } else {
      showStatus(section, `❌ Ошибка: ${result.error}`, 'error');
    }
  } catch (error) {
    showStatus(section, `❌ Ошибка: ${error.message}`, 'error');
  }
}

// Синхронизировать раздел с GitHub
async function syncSection(section) {
  const statusEl = document.getElementById(`${section}-status`);
  
  try {
    showStatus(section, '🔄 Синхронизация с GitHub...', 'success');
    
    const response = await fetch(`/api/sync/${section}`, {
      method: 'POST'
    });
    
    const result = await response.json();
    
    if (result.success) {
      showStatus(section, '✅ Синхронизировано с GitHub!', 'success');
    } else {
      showStatus(section, `❌ Ошибка синхронизации: ${result.error}`, 'error');
    }
  } catch (error) {
    showStatus(section, `❌ Ошибка: ${error.message}`, 'error');
  }
}

// Синхронизировать все разделы
async function syncAll() {
  const statusEl = document.getElementById('sync-all-status');
  
  try {
    statusEl.textContent = '🔄 Синхронизация всех разделов с GitHub...';
    statusEl.className = 'status success';
    
    const response = await fetch('/api/sync-all', {
      method: 'POST'
    });
    
    const result = await response.json();
    
    if (result.success) {
      const summary = result.results.map(r => 
        r.success ? `✅ ${r.section}` : `❌ ${r.section}: ${r.error}`
      ).join('\n');
      
      statusEl.textContent = `Завершено!\n${summary}`;
      statusEl.className = 'status success';
    } else {
      statusEl.textContent = `❌ Ошибка: ${result.error}`;
      statusEl.className = 'status error';
    }
  } catch (error) {
    statusEl.textContent = `❌ Ошибка: ${error.message}`;
    statusEl.className = 'status error';
  }
}

// Показать статус
function showStatus(section, message, type) {
  const statusEl = document.getElementById(`${section}-status`);
  statusEl.textContent = message;
  statusEl.className = `status ${type}`;
  
  setTimeout(() => {
    statusEl.style.display = 'none';
  }, 5000);
}
