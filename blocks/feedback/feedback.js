export default function decorate(block) {
  block.classList.add('feedback');

  const rows = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.className = 'feedback-wrapper';

  const left = document.createElement('div');
  left.className = 'feedback-half feedback-form';

  const right = document.createElement('div');
  right.className = 'feedback-half feedback-faq';

  if (rows[0]) {
    const cols = [...rows[0].children];
    if (cols[0]) {
      const h1 = document.createElement('h1');
      h1.textContent = cols[0].textContent.trim() || 'Feedback';
      left.append(h1);
      const links = [...cols[0].querySelectorAll('a[href]')];
      if (links.length >= 2) {
        const source = links[0].href;
        const submit = links[1].href;
        const formBlock = document.createElement('div');
        formBlock.className = 'form block';
        const a1 = document.createElement('a');
        a1.href = source;
        const a2 = document.createElement('a');
        a2.href = submit;
        formBlock.append(a1, a2);
        left.append(formBlock);
      }
    }
    if (cols[1]) {
      const h2 = document.createElement('h2');
      h2.textContent = cols[1].textContent.trim() || 'FAQ';
      right.append(h2);
    }
  }

  const accordionRows = rows.slice(1);
  if (accordionRows.length > 0) {
    const accordionBlock = document.createElement('div');
    accordionBlock.className = 'accordion block';
    accordionRows.forEach((row) => {
      const rowClone = row.cloneNode(true);
      accordionBlock.append(rowClone);
    });
    right.append(accordionBlock);
  }

  block.textContent = '';
  wrapper.append(left, right);
  block.append(wrapper);
}
