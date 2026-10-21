export default function decorate(block) {
  const rows = [...block.children];
  block.classList.add('clients');
  const strip = document.createElement('div');
  strip.className = 'clients-strip';

  rows.forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture, img, a');
      if (pic) strip.append(pic.cloneNode(true));
    });
  });

  block.textContent = '';
  block.append(strip);
}