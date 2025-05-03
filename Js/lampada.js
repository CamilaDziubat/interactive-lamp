const turnOn = document.getElementById('turnOn');
const turnOff = document.getElementById('turnOff');
const broken = document.getElementById('broken');
const fix = document.getElementById('fix');
const lamp = document.getElementById('lampImage');
const toggleTheme = document.getElementById('toggleTheme');
const lampStatus = document.getElementById('lampStatus');

// Função: Atualiza o texto do botão de tema
function updateThemeButtonText(isNight) {
  toggleTheme.textContent = isNight ? '☀️ Modo Claro' : '🌙 Modo Noturno';
}

// Função: Atualiza o status da lâmpada
function updateLampStatus(state) {
    switch (state) {
      case 'on':
        lampStatus.textContent = '💡 A lâmpada está ligada.';
        break;
      case 'off':
        lampStatus.textContent = '💤 A lâmpada está desligada.';
        break;
      case 'broken':
        lampStatus.textContent = '❌ A lâmpada está quebrada!';
        break;
      case 'fix':
        lampStatus.textContent = '🔧 A lâmpada foi consertada.'; // Mensagem de conserto
        break;
      default:
        lampStatus.textContent = '';
    }
}

// Função: Verifica se a lâmpada está quebrada
function isLampBroken() {
  return lamp.src.includes('quebrada');
}

// Função: Liga a lâmpada
function lampOn() {
  if (!isLampBroken()) {
    lamp.src = './img/ligada.jpg';
    updateLampStatus('on');
  }
}

// Função: Desliga a lâmpada
function lampOff() {
  if (!isLampBroken()) {
    lamp.src = './img/desligada.jpg';
    updateLampStatus('off');
  }
}

// Função: Quebra a lâmpada
function lampBroken() {
  lamp.src = './img/quebrada.jpg';
  updateLampStatus('broken');
}

// Função: Conserta a lâmpada
function lampFix() {
  lamp.src = './img/ligada.jpg'; // Lâmpada será ligada após o conserto
  updateLampStatus('fix');
}

// Tema: alternar entre dia e noite
toggleTheme.addEventListener('click', () => {
  const isNight = document.body.classList.toggle('night');
  document.body.classList.toggle('day', !isNight);
  updateThemeButtonText(isNight);
  localStorage.setItem('theme', isNight ? 'night' : 'day');
});

// Eventos dos botões
turnOn.addEventListener('click', lampOn);
turnOff.addEventListener('click', lampOff);
broken.addEventListener('click', lampBroken);
fix.addEventListener('click', lampFix);

// Removendo eventos da lâmpada para não reagir ao passar o mouse
// lamp.addEventListener('mouseover', lampOn); // Removido
// lamp.addEventListener('mouseleave', lampOff); // Removido
// lamp.addEventListener('dblclick', lampBroken); // Removido

// Recuperar tema salvo
const savedTheme = localStorage.getItem('theme') || 'day';
document.body.classList.add(savedTheme);
updateThemeButtonText(savedTheme === 'night');

// Estado inicial
updateLampStatus('off');

// ----------- NOVAS FUNÇÕES PARA O CURSOR DE BRILHO E PARTÍCULAS -------------

// Criação do cursor de brilho
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Função para mover o cursor
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
  createParticle(e.pageX, e.pageY);  // Cria partículas ao mover o mouse
});

// Função para gerar partículas
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

  // Remove a partícula após a animação
  setTimeout(() => {
    particle.remove();
  }, 1000);
}

// Efeito da partícula
const style = document.createElement('style');
style.innerHTML = `
  @keyframes particleEffect {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
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
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
