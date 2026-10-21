export default function decorate(block) {
  block.classList.add('portfolio');

  const rows = [...block.children];
  const slider = document.createElement('div');
  slider.className = 'portfolio-slider';

  let titleEl = null;
  const cards = [];

  rows.forEach((row, idx) => {
    const cols = [...row.children];
    if (cols.length < 1) return;

    // First row acting as section title: heading | paragraph (no image)
    const hasHeading = !!cols[0].querySelector('h1,h2,h3,h4,h5,h6');
    const hasImage = !!cols[0].querySelector('picture, img');
    if (idx === 0 && hasHeading && !hasImage) {
      const sectionTitle = document.createElement('div');
      sectionTitle.className = 'section-title';
      const h = cols[0].querySelector('h1,h2,h3,h4,h5,h6');
      if (h) {
        const heading = document.createElement('h3');
        heading.innerHTML = h.innerHTML;
        sectionTitle.append(heading);
      }
      if (cols[1]) {
        const p = document.createElement('p');
        p.innerHTML = cols[1].innerHTML;
        sectionTitle.append(p);
      }
      const line = document.createElement('span');
      line.className = 'line';
      const headingNode = sectionTitle.querySelector('h3');
      if (headingNode) headingNode.insertAdjacentElement('afterend', line);
      titleEl = sectionTitle;
      return;
    }

    if (cols.length < 2) return;

    const card = document.createElement('div');
    card.className = 'single-portfolio single-portfolio-fourth';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'portfolio-image';
    const pic = cols[0].querySelector('picture, img');
    if (pic) imgWrap.append(pic.cloneNode(true));
    card.append(imgWrap);

    const mask = document.createElement('div');
    mask.className = 'mask';
    const maskPo = document.createElement('div');
    maskPo.className = 'mask-po';

    const title = document.createElement('h4');
    title.textContent = cols[1].textContent.trim() || 'Portfolio Title';
    maskPo.append(title);

    const linkHref = (cols[2] ? cols[2].textContent.trim() : '') || '#';
    const lightboxHref = (cols[3] ? cols[3].textContent.trim() : '') || linkHref;

    const linkA = document.createElement('a');
    linkA.className = 'info';
    linkA.href = linkHref;
    linkA.innerHTML = '<i class="icofont icofont-link"></i>';
    maskPo.append(linkA);

    const expandA = document.createElement('a');
    expandA.className = 'info';
    expandA.href = lightboxHref;
    expandA.setAttribute('data-gal', 'prettyPhoto[gallery1]');
    expandA.setAttribute('title', title.textContent);
    expandA.innerHTML = '<i class="icofont icofont-expand"></i>';
    maskPo.append(expandA);

    mask.append(maskPo);
    card.append(mask);
    slider.append(card);
    cards.push(card);
  });

  block.textContent = '';
  if (titleEl) block.append(titleEl);
  block.append(slider);

  const nav = document.createElement('div');
  nav.className = 'portfolio-nav';
  const prev = document.createElement('button');
  prev.className = 'portfolio-prev';
  prev.setAttribute('aria-label', 'Previous');
  prev.innerHTML = '<i class="icofont icofont-simple-left"></i>';
  const next = document.createElement('button');
  next.className = 'portfolio-next';
  next.setAttribute('aria-label', 'Next');
  next.innerHTML = '<i class="icofont icofont-simple-right"></i>';
  nav.append(prev, next);
  block.append(nav);

  const promo = document.createElement('div');
  promo.className = 'promo-portfolio';
  const promoP = document.createElement('p');
  promoP.innerHTML = 'Want to make new project? <a class="text-decoration-underline" href="contact.html">contact with us.</a> Our expert is ready to help you';
  promo.append(promoP);
  block.append(promo);

  // Transform-based slider: show 3 at a time, closed loop navigation
  let perView = 3;
  let current = 0;
  const total = cards.length;

  function getPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  function update() {
    perView = getPerView();
    const maxIndex = Math.max(0, total - perView);
    if (current > maxIndex) current = maxIndex;
    if (current < 0) current = 0;
    const gap = 20;
    const cardWidth = (slider.clientWidth - (perView - 1) * gap) / perView;
    slider.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;
    slider.classList.remove('slide-anim');
    void slider.offsetWidth;
    slider.classList.add('slide-anim');
  }

  prev.addEventListener('click', () => {
    const maxIndex = Math.max(0, total - getPerView());
    if (current <= 0) current = maxIndex; else current -= 1;
    update();
  });
  next.addEventListener('click', () => {
    const maxIndex = Math.max(0, total - getPerView());
    if (current >= maxIndex) current = 0; else current += 1;
    update();
  });

  window.addEventListener('resize', update);
  update();
}
