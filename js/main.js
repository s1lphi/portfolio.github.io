const pstr1 = document.querySelector('.pstr1');
const pstr2 = document.querySelector('.pstr2');
const pstr3 = document.querySelector('.pstr3');
const pstr4 = document.querySelector('.pstr4');
const poster1 = document.getElementById('posterdot1');
const poster2 = document.getElementById('posterdot2');
const poster3 = document.getElementById('posterdot3');
const poster4 = document.getElementById('posterdot4');
const posterContainer = document.querySelector('.poster-container');

const posters = [pstr1, pstr2, pstr3, pstr4];
const dots = [poster1, poster2, poster3, poster4];

let currentPoster = 0;
let isAnimating = false;
let autoSwitchTimer;
let touchStartX = 0;
let touchEndX = 0;

// Додаємо обробник події при початку дотику
posterContainer.addEventListener('touchstart', function (e) {
  touchStartX = e.touches[0].clientX;
});

// Додаємо обробник події при руху пальця
posterContainer.addEventListener('touchmove', function (e) {
  touchEndX = e.touches[0].clientX;
});

// Додаємо обробник події при завершенні дотику
posterContainer.addEventListener('touchend', function () {
  const touchDiff = touchStartX - touchEndX;
  
  // Перевіряємо чи рух був досить довгим, щоб вважати його свайпом
  if (Math.abs(touchDiff) > 50) {
    // Визначаємо напрямок свайпу
    if (touchDiff > 0) {
      // Свайп вліво
      switchToNextPoster();
    } else {
      // Свайп вправо
      switchToPrevPoster();
    }
  }
});

function hideAllPosters() {
  return Promise.all(posters.map((poster) => {
    return new Promise((resolve) => {
      poster.style.transition = 'opacity 500ms';
      poster.style.opacity = 0;
      setTimeout(() => {
        poster.style.display = 'none';
        resolve();
      }, 500);
    });
  }));
}

function showPoster(poster) {
  poster.style.transition = 'opacity 500ms';
  poster.style.display = 'flex';
  setTimeout(() => {
    poster.style.opacity = 1;
  }, 50);
}

function switchToPoster(index) {
  if (isAnimating) {
    return;
  }

  isAnimating = true;
  hideAllPosters().then(() => {
    currentPoster = index;
    const currentPstr = posters[currentPoster - 1];
    const currentPosterDot = dots[currentPoster - 1];
    showPoster(currentPstr);
    updateActiveDot(currentPosterDot);
    isAnimating = false;
  });
}

function switchToPrevPoster() {
  switchToPoster((currentPoster - 2 + 4) % 4 + 1);
  clearTimeout(autoSwitchTimer);
  autoSwitchTimer = setTimeout(autoSwitch, 10000);
}

function switchToNextPoster() {
  switchToPoster((currentPoster % 4) + 1);
  clearTimeout(autoSwitchTimer);
  autoSwitchTimer = setTimeout(autoSwitch, 10000);
}

function updateActiveDot(activeDot) {
  dots.forEach(dot => {
    dot.classList.remove('active');
    dot.style.backgroundColor = '';
    dot.style.width = '';
    dot.style.height = '';
    dot.style.transition = 'all .1s ease';
  });

  activeDot.classList.add('active');
  activeDot.style.backgroundColor = '#7e7e7e';
  activeDot.style.width = '6px';
  activeDot.style.height = '6px';
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', function() {
    switchToPoster(index + 1);
    clearTimeout(autoSwitchTimer);
    autoSwitchTimer = setTimeout(autoSwitch, 10000);
  });
});

function autoSwitch() {
  switchToPoster((currentPoster % 4) + 1);
  autoSwitchTimer = setTimeout(autoSwitch, 10000);
}

autoSwitch();
