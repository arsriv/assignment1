export default function decorate(block) {
  // Dynamically attach IcoFont stylesheet if not already present on page
  if (!document.getElementById('icofont-css')) {
    const link = document.createElement('link');
    link.id = 'icofont-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/icofont/1.0.1/css/icofont.min.css';
    document.head.appendChild(link);
  }

  const rows = [...block.children];

  // Map IcoFont icon classes for the bottom 3 cards
  const iconClasses = [
    'icofont-bed-patient',
    'icofont-university',
    'icofont-field-alt'
  ];

  const featuresRow = document.createElement('div');
  featuresRow.className = 'features-banner-row';

  // Support both 1-row multi-column and multi-row authoring table layouts
  let items = rows.length === 1 ? [...rows[0].children] : rows;

  items.forEach((item, index) => {
    const colDiv = document.createElement('div');
    colDiv.className = `feature-banner-col bg-main-${(index % 3) + 1}`;

    const card = document.createElement('div');
    card.className = 'feature-banner-card';

    // Icon Container using IcoFont
    const iconDiv = document.createElement('div');
    iconDiv.className = 'feature-banner-icon';
    const i = document.createElement('i');
    i.className = `icofont ${iconClasses[index % iconClasses.length]}`;
    iconDiv.appendChild(i);

    // Text Content Container
    const textDiv = document.createElement('div');
    textDiv.className = 'feature-banner-text';

    const h4 = item.querySelector('h4, h3, strong, p') || document.createElement('h4');
    const titleText = h4.textContent?.trim() || `Construction ${index + 1}`;

    const h4Elem = document.createElement('h4');
    h4Elem.textContent = titleText;

    const pElem = item.querySelector('p:nth-child(2), p') || document.createElement('p');
    const paragraphText = pElem.innerHTML || 'Lorem ipsum dolor sit consectetur adipiscing elit sed do.';

    const p = document.createElement('p');
    p.innerHTML = paragraphText;

    textDiv.append(h4Elem, p);
    card.append(iconDiv, textDiv);
    colDiv.appendChild(card);
    featuresRow.appendChild(colDiv);
  });

  block.textContent = '';
  block.appendChild(featuresRow);
}