export default function decorate(block) {
  const rows = [...block.children];
  block.classList.add('faq');
  const list = document.createElement('div');
  list.className = 'faq-list';

  rows.forEach((row, i) => {
    const cols = [...row.children];
    if (cols.length < 2) return;
    const item = document.createElement('div');
    item.className = 'faq-item';
    const q = document.createElement('button');
    q.className = 'faq-question';
    q.textContent = cols[0].textContent.trim();
    q.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
    const a = document.createElement('div');
    a.className = 'faq-answer';
    a.innerHTML = cols[1].innerHTML;
    if (i !== 0) a.style.display = 'none';
    q.addEventListener('click', () => {
      const open = a.style.display !== 'none';
      a.style.display = open ? 'none' : 'block';
      q.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    item.append(q, a);
    list.append(item);
  });

  block.textContent = '';
  block.append(list);
}