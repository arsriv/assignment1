import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  block.textContent = '';

  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location.origin).pathname : '/footer';

  // Fetch optional /footer document if present
  const resp = await fetch(`${footerPath}.plain.html`).catch(() => null);
  let footerDoc = null;
  if (resp && resp.ok) {
    const html = await resp.text();
    footerDoc = document.createElement('div');
    footerDoc.innerHTML = html;
  }

  const footerEl = document.createElement('footer');
  footerEl.className = 'main-footer';

  footerEl.innerHTML = `
    <!-- START FOOTER TOP AREA -->
    <div class="footer-top">
      <div class="auto-container">
        <div class="row">

          <!-- Column 1: Brand Info & Socials -->
          <div class="col-lg-3 col-md-6 col-12 footer-widget brand-widget">
            <div class="footer-logo">
              <a href="/"><img src="https://bazardeal.com.bd/da/davana-preview4/davana/assets/img/logo.png" alt="Davana Logo" class="img-fluid" onerror="this.onerror=null; this.src='assets/img/logo.png';"></a>
            </div>
            <p class="brand-desc">
              Davana construction we build much more than structures. We build safe environments and friendly solutions in communities in which we work.
            </p>
            <div class="divider-line"></div>
            <div class="social-grid">
              <a href="https://facebook.com" class="social-card facebook">
                <div class="icon-box"><i class="icofont icofont-social-facebook"></i></div>
                <div class="text-box"><span>Like Us</span><strong>Facebook</strong></div>
              </a>
              <a href="https://youtube.com" class="social-card youtube">
                <div class="icon-box"><i class="icofont icofont-social-youtube-play"></i></div>
                <div class="text-box"><span>Subscribe</span><strong>Youtube</strong></div>
              </a>
              <a href="https://blogger.com" class="social-card blogger">
                <div class="icon-box"><i class="icofont icofont-social-blogger"></i></div>
                <div class="text-box"><span>Follow Us</span><strong>blogger</strong></div>
              </a>
              <a href="https://dribbble.com" class="social-card dribbble">
                <div class="icon-box"><i class="icofont icofont-social-dribbble"></i></div>
                <div class="text-box"><span>Find Us</span><strong>Dribbble</strong></div>
              </a>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="col-lg-3 col-md-6 col-12 footer-widget links-widget">
            <h4 class="widget-title">Quick Links</h4>
            <div class="links-grid">
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">Case Study</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Our Condition</a></li>
              </ul>
              <ul>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Testimonial</a></li>
                <li><a href="#">404 Page</a></li>
                <li><a href="#">Our Team</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <!-- Column 3: Latest News -->
          <div class="col-lg-3 col-md-6 col-12 footer-widget news-widget">
            <h4 class="widget-title">Latest News</h4>
            <div class="news-list">
              <div class="news-item">
                <div class="news-img">
                  <a href="#"><img src="assets/img/blog/footer-1.jpg" alt="News Image" onerror="this.onerror=null; this.src='assets/img/placeholder.jpg';"></a>
                </div>
                <div class="news-content">
                  <h5><a href="#">Lorem ipsum dolor sit amet, consectetuer.</a></h5>
                  <span class="news-date">9 JAN 2023</span>
                </div>
              </div>
              <div class="news-item">
                <div class="news-img">
                  <a href="#"><img src="assets/img/blog/footer-2.jpg" alt="News Image" onerror="this.onerror=null; this.src='assets/img/placeholder.jpg';"></a>
                </div>
                <div class="news-content">
                  <h5><a href="#">Lorem ipsum dolor sit amet, consectetuer.</a></h5>
                  <span class="news-date">10 JAN 2023</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Column 4: Subscribe Us -->
          <div class="col-lg-3 col-md-6 col-12 footer-widget subscribe-widget">
            <h4 class="widget-title">Subscribe Us</h4>
            <p class="subscribe-text">
              Lorem ipsum dolor sit amet consectetur eget orci dictum facilisis velid Donec seddno.
            </p>
            <form action="/subscribe" method="post" class="newsletter-form">
              <div class="input-group">
                <input type="email" name="email" placeholder="Email Address" required class="form-control">
                <button type="button" class="btn-email-icon" aria-label="Mail"><i class="icofont icofont-envelope"></i></button>
              </div>
              <button type="submit" class="btn-subscribe">
                SUBSCRIBE NOW <i class="icofont icofont-paper-plane"></i>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>

    <!-- START FOOTER BOTTOM AREA -->
    <div class="footer-bottom">
      <div class="auto-container">
        <div class="row align-items-center justify-content-between">
          <div class="col-md-6 col-12 copyright-text">
            Copyright &copy; 2026 <a href="/">Davana.</a> | All Rights Reserved
          </div>
          <div class="col-md-6 col-12 bottom-links text-md-right text-left">
            <ul>
              <li><a href="#">COMPANY PROFILE</a></li>
              <li class="separator">&#9632;</li>
              <li><a href="#">TERMS &amp; CONDITION</a></li>
              <li class="separator">&#9632;</li>
              <li><a href="#">REFUND POLICY</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- BACK TO TOP BUTTON -->
    <a href="#" class="scroll-to-top" id="scrollTopBtn" aria-label="Scroll to Top">
      <i class="icofont icofont-simple-up"></i>
    </a>
  `;

  block.append(footerEl);

  // Scroll to Top Listener
  const scrollTopBtn = footerEl.querySelector('#scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}