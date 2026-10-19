export default function decorate(block) {
  const rows = [...block.children];
  
  // Create main responsive grid container
  const gridContainer = document.createElement('div');
  gridContainer.className = 'cards-grid-container';

  rows.forEach((row, index) => {
    const cols = [...row.children];
    if (cols.length < 2) return;

    // Create individual card wrapper
    const cardItem = document.createElement('div');
    cardItem.className = 'cards-item';
    // if (index === 0) {
    //   cardItem.classList.add('is-default-yellow'); // First card default yellow button highlight
    // }

    // 1. Image Column
    const imageCol = cols[0];
    const imageContainer = document.createElement('div');
    imageContainer.className = 'cards-item-image';
    const picture = imageCol.querySelector('picture');
    if (picture) {
      imageContainer.appendChild(picture);
    }
    cardItem.appendChild(imageContainer);

    // 2. Content Column
    const contentCol = cols[1];
    const contentContainer = document.createElement('div');
    contentContainer.className = 'cards-item-content';

    const paragraphs = [...contentCol.querySelectorAll('p')];
    const headings = [...contentCol.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    const links = [...contentCol.querySelectorAll('a')];

    // Subtitle (Small gray category text)
    if (paragraphs.length > 0) {
      const subtitle = document.createElement('div');
      subtitle.className = 'cards-item-subtitle';
      subtitle.textContent = headings[0].textContent.trim();
      contentContainer.appendChild(subtitle);
    }

    // Service Title (Large bold uppercase heading)
    if (headings.length > 0 || paragraphs.length > 1) {
      const titleElem = document.createElement('h3');
      titleElem.className = 'cards-item-title';
      titleElem.textContent = headings.length > 0 ? headings[1].textContent.trim() : paragraphs[1].textContent.trim();
      contentContainer.appendChild(titleElem);
    }

    // Description Paragraphs
    const descParagraphs = paragraphs.slice(headings.length > 0 ? 0 : 2);
    if (descParagraphs.length > 0) {
      const descContainer = document.createElement('div');
      descContainer.className = 'cards-item-description';
      descParagraphs.forEach((p, pIdx) => {
        if (pIdx === 0 && headings.length === 0 && paragraphs.length > 1) return;
        const pElem = document.createElement('p');
        pElem.textContent = p.textContent.trim();
        descContainer.appendChild(pElem);
      });
      contentContainer.appendChild(descContainer);
    }

    // CTA Button ("READ MORE")
    const ctaButton = document.createElement('a');
    ctaButton.className = 'cards-item-button';
    
    if (links.length > 0) {
      ctaButton.href = links[0].href;
      ctaButton.textContent = links[0].textContent.trim() || 'READ MORE';
    } else {
      ctaButton.href = '#';
      ctaButton.textContent = 'READ MORE';
    }
    contentContainer.appendChild(ctaButton);

    cardItem.appendChild(contentContainer);
    gridContainer.appendChild(cardItem);
  });

  block.textContent = '';
  block.appendChild(gridContainer);
}