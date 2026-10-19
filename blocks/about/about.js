export default function decorate(block) {
  const rows = [...block.children];

  // Outer Section & Container setup
  const section = document.createElement('section');
  section.id = 'about';
  section.className = 'about-section';

  const container = document.createElement('div');
  container.className = 'about-container';

  const mainRow = document.createElement('div');
  mainRow.className = 'about-main-row';

  // ==========================================
  // LEFT COLUMN: Section Title & 2-Column Grid
  // ==========================================
  const leftCol = document.createElement('div');
  leftCol.className = 'about-left-col';

  // --- 1. Title & Description Header ---
  if (rows[0]) {
    const titleCols = [...rows[0].children];
    const sectionTitleDiv = document.createElement('div');
    sectionTitleDiv.className = 'section-title';

    const rawTitle = titleCols[0]?.textContent?.trim() || 'Welcome To Davana';
    const bodyText = titleCols[1]?.innerHTML || '';

    const h3 = document.createElement('h3');
    // Format "Welcome To Davana" -> <strong>Welcome To</strong> <span class="light">Davana</span>
    if (rawTitle.toLowerCase().includes('welcome to')) {
      h3.innerHTML = `Welcome To <span class="title-light">${rawTitle.replace(/welcome to/i, '').trim()}</span>`;
    } else {
      h3.textContent = rawTitle;
    }

    // Line with yellow accent bar
    const lineWrapper = document.createElement('div');
    lineWrapper.className = 'title-line-wrapper';
    const yellowLine = document.createElement('span');
    yellowLine.className = 'title-line-accent';
    lineWrapper.appendChild(yellowLine);

    const p = document.createElement('p');
    p.className = 'title-desc';
    p.innerHTML = bodyText;

    sectionTitleDiv.append(h3, lineWrapper, p);
    leftCol.appendChild(sectionTitleDiv);
  }

  // --- 2. Feature Items Grid (Row 2 to All) ---
  const featureRows = rows.slice(1);
  if (featureRows.length > 0) {
    const featuresGrid = document.createElement('div');
    featuresGrid.className = 'features-grid';

    // Icon class map for IcoFont
    const iconClasses = [
      'icofont-engineer',
      'icofont-business-man-alt-3',
      'icofont-ambulance-crescent',
      'icofont-instrument',
      'icofont-support',
      'icofont-tools'
    ];

    featureRows.forEach((row, index) => {
      const cols = [...row.children];
      const headingText = cols[0]?.textContent?.trim() || '';
      const paragraphHtml = cols[1]?.innerHTML || '';

      const singleFeature = document.createElement('div');
      singleFeature.className = 'single-feature';

      // Plain Icon Container (No background box)
      const iconDiv = document.createElement('div');
      iconDiv.className = 'single-feature-icon';

      const i = document.createElement('i');
      i.className = `icofont ${iconClasses[index % iconClasses.length]}`;
      iconDiv.appendChild(i);

      // Text Content
      const textDiv = document.createElement('div');
      textDiv.className = 'single-feature-text';

      const h4 = document.createElement('h4');
      h4.textContent = headingText;

      const p = document.createElement('p');
      p.innerHTML = paragraphHtml;

      textDiv.append(h4, p);
      singleFeature.append(iconDiv, textDiv);
      featuresGrid.appendChild(singleFeature);
    });

    leftCol.appendChild(featuresGrid);
  }

  // ==========================================
  // RIGHT COLUMN: Woman Engineer Image
  // ==========================================
  const rightCol = document.createElement('div');
  rightCol.className = 'about-right-col';

  if (rows[0]) {
    const titleCols = [...rows[0].children];
    const imgCell = titleCols[2] || rows[0].querySelector('picture');

    if (imgCell) {
      const aboutImageDiv = document.createElement('div');
      aboutImageDiv.className = 'about-image';

      const img = imgCell.querySelector('img') || document.createElement('img');
      img.className = 'img-fluid';
      
      aboutImageDiv.appendChild(img);
      rightCol.appendChild(aboutImageDiv);
    }
  }

  // Attach elements
  mainRow.append(leftCol, rightCol);
  container.appendChild(mainRow);
  section.appendChild(container);

  // Clear original DOM and render clean markup
  block.textContent = '';
  block.appendChild(section);
}