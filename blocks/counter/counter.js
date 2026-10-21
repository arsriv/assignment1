export default function decorate(block) {
  block.classList.add('counter');

  // Handle background image if author added one as first element
  const first = block.children[0];
  const pic = first && first.querySelector('picture, img');
  // In DA/EDS, images are often wrapped in <p>; detect an image-only row by
  // checking there is no meaningful text content besides the image.
  const textOnly = first ? first.textContent.replace(/\s+/g, '') : '';
  if (pic && textOnly === '') {
    const img = pic.querySelector ? (pic.querySelector('img') || pic) : pic;
    const src = img.getAttribute('src') || img.getAttribute('data-src') || img.src;
    if (src) {
      block.style.backgroundImage = `url(${src})`;
      block.style.backgroundSize = 'cover';
      block.style.backgroundPosition = 'center center';
      block.style.backgroundAttachment = 'fixed';
      first.remove();
    }
  }

  const items = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'counter-grid';

  items.forEach((row, i) => {
    const cols = [...row.children];
    if (cols.length < 2) return;
    const item = document.createElement('div');
    item.className = 'counter-item wow fadeInDown';
    item.style.animationDelay = `${i * 0.1}s`;

    const icon = document.createElement('div');
    icon.className = 'counter-icon';
    // Icon class can be provided in a 3rd column (e.g. "lnr lnr-users" or "icofont icofont-worker")
    const iconClass = cols[2] ? cols[2].textContent.trim() : '';
    const iEl = document.createElement('i');
    iEl.className = iconClass || 'lnr lnr-briefcase';
    icon.append(iEl);

    const info = document.createElement('div');
    info.className = 'counter-info';
    const num = document.createElement('h2');
    num.className = 'counter-number';
    num.textContent = cols[0].textContent.trim();
    const label = document.createElement('h5');
    label.className = 'counter-label';
    label.textContent = cols[1].textContent.trim();
    info.append(num, label);

    item.append(icon, info);
    grid.append(item);
  });

  // overlay
  const overlay = document.createElement('div');
  overlay.className = 'counter-overlay';

  block.textContent = '';
  block.append(overlay, grid);
}