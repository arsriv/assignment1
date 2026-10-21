export default function decorate(block) {
  block.classList.add('blog');

  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'blog-grid';

  let titleEl = null;
  const posts = [];

  rows.forEach((row, idx) => {
    const cols = [...row.children];
    if (cols.length < 1) return;

    // First row: heading | paragraph
    if (idx === 0) {
      const hasHeading = !!cols[0].querySelector('h1,h2,h3,h4,h5,h6');
      if (hasHeading) {
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
    }

    if (cols.length < 2) return;

    const post = document.createElement('div');
    post.className = 'blog-post-single';

    // Determine alternating layout: even posts have image left, odd have image right
    const imageLeft = posts.length % 2 === 0;

    // Image column
    const imgCol = document.createElement('div');
    imgCol.className = 'blog-post-media';
    const imgWrap = document.createElement('div');
    imgWrap.className = 'post-media-wrap';
    const media = document.createElement('div');
    media.className = 'post-media left-image post-image-overlay';
    const pic = cols[0].querySelector('picture, img');
    if (pic) media.append(pic.cloneNode(true));
    imgWrap.append(media);
    imgCol.append(imgWrap);

    // Content column
    const contentCol = document.createElement('div');
    contentCol.className = 'blog-post-content-col';
    contentCol.innerHTML = cols[1].innerHTML;

    if (imageLeft) {
      post.append(imgCol, contentCol);
    } else {
      post.append(contentCol, imgCol);
    }

    grid.append(post);
    posts.push(post);
  });

  block.textContent = '';
  if (titleEl) block.append(titleEl);
  block.append(grid);
}