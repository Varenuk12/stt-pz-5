const actions = ['+', '-', '*', '/', '.', '%'];
const dashboard = document.getElementById("dashboard");

// --- Друк операторів ---
function printAction(val) {
  if (val === '+/-') {
    if (!dashboard.value) {
      dashboard.value = '-';
    } else if (dashboard.value[0] === '-') {
      dashboard.value = dashboard.value.slice(1);
    } else {
      dashboard.value = '-' + dashboard.value;
    }
  } else if (val === '%') {
    const num = parseFloat(dashboard.value);
    if (!isNaN(num)) {
      dashboard.value = (num / 100).toString();
    }
  } else {
    if (dashboard.value.length === 0) {
      // Додаємо 0 перед + або -
      if (val === '+' || val === '-') {
        dashboard.value = '0' + val;
      }
    } else if (actions.includes(dashboard.value[dashboard.value.length - 1])) {
      // Замінюємо останній оператор
      dashboard.value = dashboard.value.slice(0, -1) + val;
    } else {
      dashboard.value += val;
    }
  }
}

// --- Друк цифр ---
function printDigit(val) {
  if (dashboard.value === '0' && val === '0') return;
  if (dashboard.value === '0' && val !== '0') {
    dashboard.value = val;
  } else {
    dashboard.value += val;
  }
}

// --- Обчислення результату ---
function solve() {
  let expression = dashboard.value;
  if (!expression) return;

  if (actions.includes(expression[expression.length - 1])) {
    dashboard.value = 'Error';
    return;
  }

  try {
    const result = math.evaluate(expression);
    dashboard.value = result.toString();
  } catch {
    dashboard.value = 'Error';
  }
}

// --- Очистка ---
function clr() {
  dashboard.value = '';
}

// --- Збереження / вставка ---
function save() {
  localStorage.setItem('result', dashboard.value);
}

function paste() {
  const val = localStorage.getItem('result');
  if (val) {
    printDigit(val);
  }
}

// --- Тема ---
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.querySelector('body').className = themeName;
}

function toggleTheme() {
  let theme = localStorage.getItem('theme');
  theme = theme === 'theme-second' ? 'theme-one' : 'theme-second';
  setTimeout(() => setTheme(theme), 500);
}

setTheme('theme-one');
