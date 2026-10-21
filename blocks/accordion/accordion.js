export default function decorate(block) {
  block.classList.add('accordion');

  const rows = [...block.children];
  const panelGroup = document.createElement('div');
  panelGroup.className = 'panel-group';
  panelGroup.setAttribute('id', 'accordion');

  let titleEl = null;
  let panelIndex = 1;
const sectionHeading = document.createElement('h2');
sectionHeading.className = 'accordion-title';

const boldText = document.createElement('strong');
boldText.textContent = 'Frequently Asked';

sectionHeading.append(
  boldText,
  document.createTextNode(' Question'),
);

  rows.forEach((row, idx) => {
    const cols = [...row.children];
    if (cols.length < 1) return;

    // First row acting as section title: heading | paragraph
    const hasHeading = !!cols[0].querySelector('h1,h2,h3,h4,h5,h6');
    if (idx === 0 && hasHeading) {
      const sectionTitle = document.createElement('div');
      sectionTitle.className = 'section-title section-title-left';
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

    const panel = document.createElement('div');
    panel.className = 'panel panel-default';

    const heading = document.createElement('div');
    heading.className = 'panel-heading';
    const panelTitle = document.createElement('h4');
    panelTitle.className = 'panel-title';
    const toggle = document.createElement('a');
    toggle.className = 'accordion-toggle collapsed';
    toggle.setAttribute('data-toggle', 'collapse');
    toggle.setAttribute('data-parent', '#accordion');
    const id = `panel${panelIndex++}`;
    toggle.href = `#${id}`;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = cols[0].textContent.trim();
    const icon = document.createElement('i');
    icon.className = 'icofont icofont-plus';
    toggle.append(icon);
    panelTitle.append(toggle);
    heading.append(panelTitle);
    panel.append(heading);

    const collapse = document.createElement('div');
    collapse.id = id;
    collapse.className = 'panel-collapse collapse';
    const body = document.createElement('div');
    body.className = 'panel-body';
    body.innerHTML = cols[1].innerHTML;
    collapse.append(body);
    panel.append(collapse);

    panelGroup.append(panel);
  });

  // Open first panel
  const firstPanel = panelGroup.querySelector('.panel');
  if (firstPanel) {
    const firstToggle = firstPanel.querySelector('.accordion-toggle');
    const firstCollapse = firstPanel.querySelector('.panel-collapse');
    firstToggle.classList.remove('collapsed');
    firstToggle.setAttribute('aria-expanded', 'true');
    firstToggle.querySelector('i').className = 'icofont icofont-minus';
    firstCollapse.classList.add('show');
  }

  block.textContent = '';
block.append(sectionHeading);

if (titleEl) block.append(titleEl);

block.append(panelGroup);

  const toggles = panelGroup.querySelectorAll('.accordion-toggle');
  toggles.forEach((t) => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(t.getAttribute('href'));
      const isOpen = target.classList.contains('show');
      const icon = t.querySelector('i');

      // Close all
      panelGroup.querySelectorAll('.panel-collapse.show').forEach((c) => {
        c.classList.remove('show');
      });
      panelGroup.querySelectorAll('.accordion-toggle').forEach((t2) => {
        t2.classList.add('collapsed');
        t2.setAttribute('aria-expanded', 'false');
        t2.querySelector('i').className = 'icofont icofont-plus';
      });

      if (!isOpen) {
        target.classList.add('show');
        t.classList.remove('collapsed');
        t.setAttribute('aria-expanded', 'true');
        icon.className = 'icofont icofont-minus';
      }
    });
  });
}