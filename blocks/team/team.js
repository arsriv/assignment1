export default function decorate(block) {
  block.classList.add('team');

  const rows = [...block.children];
  const slider = document.createElement('div');
  slider.className = 'team-slider';

  let titleEl = null;
  const members = [];

  rows.forEach((row, idx) => {
    const cols = [...row.children];
    if (cols.length < 1) return;

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

    const mate = document.createElement('div');
    mate.className = 'team-mate';

    const accent = document.createElement('div');
    accent.className = 'team-accent';
    mate.append(accent);

    const photo = document.createElement('div');
    photo.className = 'member-photo';
    const pic = cols[0].querySelector('picture, img');
    if (pic) photo.append(pic.cloneNode(true));

    const mask = document.createElement('div');
    mask.className = 'mask';
    const social = document.createElement('div');
    social.className = 'single-team-social';
    const networks = ['icofont icofont-social-facebook', 'icofont icofont-social-blogger', 'icofont icofont-social-youtube'];
    networks.forEach((cls) => {
      const a = document.createElement('a');
      a.className = 'team-social-link';
      a.innerHTML = `<i class="${cls}"></i>`;
      social.append(a);
    });
    mask.append(social);
    photo.append(mask);
    mate.append(photo);

    const title = document.createElement('div');
    title.className = 'member-title';
    const name = document.createElement('h4');
    name.textContent = cols[1].textContent.trim() || '';
    const role = document.createElement('p');
    role.textContent = (cols[2] ? cols[2].textContent : '').trim();
    title.append(name, role);
    mate.append(title);

    slider.append(mate);
    members.push(mate);
  });

  block.textContent = '';
  if (titleEl) block.append(titleEl);
  block.append(slider);

  // Dots navigation
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'team-dots';
  block.append(dotsContainer);

  // Promo line
  const promo = document.createElement('div');
  promo.className = 'promo-portfolio';
  const promoP = document.createElement('p');
  // promoP.innerHTML = 'Want to make new project? <a class="text-decoration-underline" href="contact.html">contact with us.</a> Our expert is ready to help you';
  promo.append(promoP);
  block.append(promo);

  let perView = 3;
  let current = 0;
  const total = members.length;

  function getPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  function renderDots() {
    while (dotsContainer.firstChild) dotsContainer.removeChild(dotsContainer.firstChild);
    const dotCount = Math.max(0, Math.ceil(total / perView));
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'team-dot';
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

  window.addEventListener('resize', update);
  update();
}