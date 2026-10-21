export default function decorate(block) {
  block.classList.add('calltoaction');

  const rows = [...block.children];
  const wrap = document.createElement('div');
  wrap.className = 'calltoaction-wrap';

  let heading = null;
  let paragraph = null;
  let btnText = null;
  let btnHref = null;

  rows.forEach((row, idx) => {
    const cols = [...row.children];
    if (cols.length < 1) return;

    // First row: heading | paragraph (CTA text)
    if (idx === 0) {
      const h = cols[0].querySelector('h1,h2,h3,h4,h5,h6');
      if (h) {
        const h3 = document.createElement('h3');
        h3.innerHTML = h.innerHTML;
        wrap.append(h3);
        heading = h3;
      }
      if (cols[1]) {
        const h4 = document.createElement('h4');
        h4.innerHTML = cols[1].innerHTML;
        wrap.append(h4);
        paragraph = h4;
      }
      return;
    }

    // Second row: button text | button link
    if (idx === 1 && cols.length >= 1) {
      btnText = cols[0].textContent.trim();
      btnHref = (cols[1] ? cols[1].textContent : '').trim() || '#';
    }
  });

  // fallback defaults if not authored
  if (!heading) {
    const h3 = document.createElement('h3');
    h3.textContent = 'Call to Action';
    wrap.append(h3);
  }
  if (!paragraph) {
    const h4 = document.createElement('h4');
    h4.textContent = '';
    wrap.append(h4);
  }

  if (btnText) {
    const btn = document.createElement('a');
    btn.className = 'calltoaction-btn';
    btn.href = btnHref;
    btn.textContent = btnText;
    wrap.append(btn);
  }

  block.textContent = '';
  block.append(wrap);
}