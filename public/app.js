async function loadMenuText() {
  const response = await fetch('/api/getMenuText');
  if (!response.ok) {
    alert('Ошибка загрузки меню');
    return;
  }
  const text = await response.text();
  document.getElementById('menuText').value = text;
}

async function saveMenuText() {
  const content = document.getElementById('menuText').value;
  const response = await fetch('/api/saveMenuText', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
  if (response.ok) {
    alert('Меню сохранено и конвертировано');
  } else {
    alert('Ошибка при сохранении');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadMenuText();
  document.getElementById('saveBtn').addEventListener('click', saveMenuText);
});
