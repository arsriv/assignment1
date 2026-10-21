export default function decorate(block) {
  const slides = [...block.children];

  block.classList.add('carousel');

  const track = document.createElement('div');
  track.className = 'carousel-track';

  slides.forEach((slide) => {
    slide.classList.add('carousel-slide');
    track.append(slide);
  });

  block.textContent = '';
  block.append(track);

  let current = 0;

  // Navigation
  const prev = document.createElement('button');
  prev.className = 'carousel-prev';
  prev.setAttribute('aria-label', 'Previous Slide');
  prev.innerHTML = '&#10094;';

  const next = document.createElement('button');
  next.className = 'carousel-next';
  next.setAttribute('aria-label', 'Next Slide');
  next.innerHTML = '&#10095;';

  block.append(prev, next);

  // Dots
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots';

  const dots = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';

    dot.addEventListener('click', () => {
      current = index;
      update();
      resetAutoplay();
    });

    dotsContainer.append(dot);
    return dot;
  });

  block.append(dotsContainer);

  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;

    slides.forEach((slide) => {
      slide.classList.remove('active-slide');
    });

    slides[current].classList.add('active-slide');

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === current);
    });

    // trigger animation on every slide change
    track.classList.remove('slide-anim');
    void track.offsetWidth;
    track.classList.add('slide-anim');
  }

  prev.addEventListener('click', () => {
    current = current === 0 ? slides.length - 1 : current - 1;
    update();
    resetAutoplay();
  });

  next.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    update();
    resetAutoplay();
  });

  let autoplay = setInterval(() => {
    current = (current + 1) % slides.length;
    update();
  }, 5000);

  function resetAutoplay() {
    clearInterval(autoplay);

    autoplay = setInterval(() => {
      current = (current + 1) % slides.length;
      update();
    }, 5000);
  }

  slides[0].classList.add('active-slide');
  dots[0]?.classList.add('active');
}