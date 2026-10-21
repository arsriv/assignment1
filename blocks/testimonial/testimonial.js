export default function decorate(block) {
  block.classList.add('testimonial');

  const rows = [...block.children];
  const slider = document.createElement('div');
  slider.className = 'testimonial-slider';

  let titleEl = null;
  const items = [];
  let bgSrc = null;

  rows.forEach((row, idx) => {
    const cols = [...row.children];
    if (cols.length < 1) return;

    // Row 1: heading | background image | paragraph
    if (idx === 0) {
      const hasHeading = !!cols[0].querySelector('h1,h2,h3,h4,h5,h6');
      if (hasHeading) {
        const sectionTitle = document.createElement('div');
        sectionTitle.className = 'section-title section-title-white';

        // Col 1: heading
        const h = cols[0].querySelector('h1,h2,h3,h4,h5,h6');
        if (h) {
          const heading = document.createElement('h3');
          heading.className = 'section-title-white';
          heading.innerHTML = h.innerHTML;
          sectionTitle.append(heading);
        }

        // Col 2: background image (image only)
        if (cols[1]) {
          const pic = cols[1].querySelector('picture, img');
          if (pic) {
            const img = pic.querySelector('img') || pic;
            bgSrc = img.getAttribute('src') || img.getAttribute('data-src') || img.src;
          }
        }

        // Col 3 (or col 2 if no bg image): paragraph
        const descCol = cols[2] || (bgSrc ? null : cols[1]);
        if (descCol) {
          const p = document.createElement('p');
          p.className = 'section-dec-white';
          p.innerHTML = descCol.innerHTML;
          sectionTitle.append(p);
        }

        const line = document.createElement('span');
        line.className = 'line section-title-white-span';
        const headingNode = sectionTitle.querySelector('h3');
        if (headingNode) headingNode.insertAdjacentElement('afterend', line);
        titleEl = sectionTitle;
        return;
      }
    }

    // Background image row (image only, no text) - fallback
    const textOnly = cols[0].textContent.replace(/\s+/g, '');
    const pic = cols[0].querySelector('picture, img');
    if (pic && textOnly === '') {
      const img = pic.querySelector('img') || pic;
      bgSrc = img.getAttribute('src') || img.getAttribute('data-src') || img.src;
      return;
    }

    if (cols.length < 2) return;

    const item = document.createElement('div');
    item.className = 'single-testimonial';

    const dec = document.createElement('div');
    dec.className = 'team-dec';
    const name = document.createElement('h4');
    name.textContent = cols[1].textContent.trim() || '';
    const span = document.createElement('span');
    const quote = document.createElement('p');
    quote.textContent = cols[0].textContent.trim() || '';
    dec.append(name, span, quote);

    const imgWrap = document.createElement('div');
    imgWrap.className = 'team-img';
    const imgPic = cols[2] ? cols[2].querySelector('picture, img') : null;
    if (imgPic) imgWrap.append(imgPic.cloneNode(true));

    item.append(dec, imgWrap);
    slider.append(item);
    items.push(item);
  });

  // Apply background image via CSS variable so ::before can apply greyscale filter
  if (bgSrc) {
    block.style.setProperty('--testimonial-bg-image', `url(${bgSrc})`);
  }

  // Dots navigation
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'testimonial-dots';

  block.textContent = '';
  if (titleEl) block.append(titleEl);
  block.append(slider, dotsContainer);

  let perView = 4;
  let current = 0;
  const total = items.length;

  function getPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 4;
  }

  function renderDots() {
    while (dotsContainer.firstChild) dotsContainer.removeChild(dotsContainer.firstChild);
    const dotCount = Math.max(0, Math.ceil(total / perView));
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot';
      const activeIndex = Math.floor(current / perView);
      const maxIndex = Math.max(0, total - perView);
      const isActive = (i === activeIndex) || (i === dotCount - 1 && current >= maxIndex);
      if (isActive) dot.classList.add('active');
      dot.addEventListener('click', () => {
        current = i * perView;
        update();
      });
      dotsContainer.append(dot);
    }
  }

  function update() {
    perView = getPerView();
    const maxIndex = Math.max(0, total - perView);
    if (current > maxIndex) current = maxIndex;
    if (current < 0) current = 0;
    const cardWidth = slider.clientWidth / perView;
    const offset = current * cardWidth;
    slider.style.transform = `translateX(-${offset}px)`;
    slider.classList.remove('slide-anim');
    void slider.offsetWidth;
    slider.classList.add('slide-anim');
    renderDots();
  }

  // Drag to slide (mouse + touch)
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let dragOffset = 0;

  function onDragStart(x) {
    isDragging = true;
    startX = x;
    currentX = x;
    slider.classList.remove('slide-anim');
    slider.style.transition = 'none';
  }

  function onDragMove(x) {
    if (!isDragging) return;
    const dx = x - startX;
    dragOffset = dx;
    const cardWidth = slider.clientWidth / perView;
    const baseOffset = current * cardWidth;
    slider.style.transform = `translateX(${-baseOffset + dx}px)`;
  }

  function onDragEnd(x) {
    if (!isDragging) return;
    isDragging = false;
    const dx = x - startX;
    const cardWidth = slider.clientWidth / perView;
    const threshold = cardWidth * 0.3;

    if (dx < -threshold) {
      // Swipe left -> next
      current = Math.min(current + perView, total - 1);
    } else if (dx > threshold) {
      // Swipe right -> prev
      current = Math.max(current - perView, 0);
    }
    slider.style.transition = '';
    update();
  }

  slider.addEventListener('mousedown', (e) => {
    onDragStart(e.clientX);
    e.preventDefault();
  });
  slider.addEventListener('mousemove', (e) => onDragMove(e.clientX));
  window.addEventListener('mouseup', (e) => onDragEnd(e.clientX));

  slider.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    onDragStart(touch.clientX);
  }, { passive: true });
  slider.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    onDragMove(touch.clientX);
  }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    onDragEnd(touch.clientX);
  });

  window.addEventListener('resize', update);
  update();
}