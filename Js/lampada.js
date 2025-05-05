// === REFERÊNCIAS ===
const turnOn = document.getElementById('turnOn');
const turnOff = document.getElementById('turnOff');
const broken = document.getElementById('broken');
const fix = document.getElementById('fix');
const lamp = document.getElementById('lampImage');
const lampStatus = document.getElementById('lampStatus');
const toggleMenu = document.getElementById('toggleMenu');
const themeMenu = document.getElementById('themeMenu');
const themeToggleBtn = document.getElementById('themeToggleBtn');

// === FUNÇÕES DE LÂMPADA ===
function updateLampStatus(state) {
  const statusMap = {
    on: '💡 A lâmpada está ligada.',
    off: '💤 A lâmpada está desligada.',
    broken: '❌ A lâmpada está quebrada!',
    fix: '🔧 A lâmpada foi consertada.'
  };
  lampStatus.textContent = statusMap[state] || '';
}

function isLampBroken() {
  return lamp.src.includes('quebrada');
}

function lampOn() {
  if (!isLampBroken()) {
    lamp.src = './img/ligada.jpg';
    updateLampStatus('on');
  }
}

function lampOff() {
  if (!isLampBroken()) {
    lamp.src = './img/desligada.jpg';
    updateLampStatus('off');
  }
}

function lampBroken() {
  lamp.src = './img/quebrada.jpg';
  updateLampStatus('broken');
}

function lampFix() {
  lamp.src = './img/ligada.jpg';
  updateLampStatus('fix');
}

// === TEMA ===
function toggleTheme() {
  const isNight = document.body.classList.toggle('night');
  document.body.classList.toggle('day', !isNight);
  localStorage.setItem('theme', isNight ? 'night' : 'day');
}

// === EVENTOS ===
turnOn.addEventListener('click', lampOn);
turnOff.addEventListener('click', lampOff);
broken.addEventListener('click', lampBroken);
fix.addEventListener('click', lampFix);

toggleMenu.addEventListener('click', () => {
  themeMenu.classList.toggle('active');
});

themeToggleBtn.addEventListener('click', () => {
  toggleTheme();
  themeMenu.classList.remove('active');
});

// Aplica tema salvo
const savedTheme = localStorage.getItem('theme') || 'day';
document.body.classList.add(savedTheme);

// Estado inicial da lâmpada
updateLampStatus('off');

// === CURSOR + PARTÍCULAS ===
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
  createParticle(e.pageX, e.pageY);
});

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.style.position = 'absolute';
  particle.style.width = '5px';
  particle.style.height = '5px';
  particle.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  particle.style.borderRadius = '50%';
  particle.style.pointerEvents = 'none';
  particle.style.animation = 'particleEffect 1s ease-out forwards';
  particle.style.left = `${x - 2.5}px`;
  particle.style.top = `${y - 2.5}px`;
  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 1000);
}

// === ESTILOS VIA JS ===
const style = document.createElement('style');
style.innerHTML = `
  @keyframes particleEffect {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(0); opacity: 0; }
  }
  .cursor {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    animation: pulse 0.5s infinite alternate;
  }
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.5); opacity: 0; }
  }
`;
document.head.appendChild(style);
