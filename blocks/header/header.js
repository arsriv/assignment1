export default async function decorate(block) {
  block.textContent = '';

  const headerEl = document.createElement('header');
  headerEl.className = 'main-header header-1';

  headerEl.innerHTML = `
    <!-- START PRELOADER -->
    <div id="page-preloader" style="display: none;">
        <div class="preload-tetrominos">
            <div class="preload-tetromino preload-box1"></div>
            <div class="preload-tetromino preload-box2"></div>
            <div class="preload-tetromino preload-box3"></div>
            <div class="preload-tetromino preload-box4"></div>
        </div>
    </div>
    <!-- END PRELOADER -->
    
    <!-- START TOP AREA -->
    <div class="top-area">
        <div class="auto-container">
            <div class="row align-items-center">
                <div class="col-lg-7 col-md-12 col-12">
                    <div class="info-menu">
                        <ul>
                            <li><a href="#"><i class="icofont icofont-clock-time"></i> Opening Hours - Monday to Saturday: 9AM to 5PM</a></li>
                            <li><a href="#"><i class="icofont icofont-compass-alt"></i> Company Profile</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-5 col-md-12 col-12">
                    <div class="social">
                        <ul>
                           <li><a href="#" aria-label="Facebook"><i class="icofont icofont-social-facebook"></i></a></li>
                           <li><a href="#" aria-label="Blogger"><i class="icofont icofont-social-blogger"></i></a></li>
                           <li><a href="#" aria-label="Instagram"><i class="icofont icofont-social-instagram"></i></a></li>
                           <li><a href="#" aria-label="YouTube"><i class="icofont icofont-social-youtube-play"></i></a></li>
                        </ul>
                    </div>
                </div> 
            </div>
        </div>
    </div>
    <!-- END TOP AREA -->

    <!-- START LOGO AREA -->
    <div class="logo-area">
        <div class="auto-container">
            <div class="row align-items-center">
                <div class="col-lg-3 col-md-6 col-8 pl-0">
                    <div class="logo">
                        <a href="/">
                           <img class="img-fluid" src="https://bazardeal.com.bd/da/davana-preview4/davana/assets/img/logo.png" alt="Davana Logo">
                        </a>
                    </div>
                </div>
                <div class="col-lg-9 col-md-6 col-4 d-flex justify-content-end align-items-center header-boxes-wrapper">
                    <div class="header-info-box d-none d-lg-flex">
                        <div class="header-info-icon"><span class="lnr lnr-envelope"></span></div>
                        <div class="header-info-content">
                            <h6>Mail Us</h6>
                            <p>your_site@mail.com</p>
                        </div>
                    </div>
                    <div class="header-info-box d-none d-lg-flex">
                        <div class="header-info-icon"><span class="lnr lnr-phone"></span></div>
                        <div class="header-info-content">
                            <h6>Call Now</h6>
                            <p>(+880) 567-290-456</p>
                        </div>
                    </div>
                    <div class="header-info-box quote-box d-none d-lg-flex">
                        <a href="#" class="quote-btn">Get A Quote</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END LOGO AREA -->

    <!-- START NAVIGATION AREA (STICKY) -->
    <div class="sticky-wrapper">
        <div class="sticky-menu">
            <div class="mainmenu-area">
                <div class="auto-container">
                    <div class="row align-items-center justify-content-between">
                        
                        <!-- Mobile Hamburger Button & Nav -->
                        <div class="col-lg-8 col-md-12 nav-col">
                            <button class="navbar-toggler d-lg-none" type="button" aria-label="Toggle navigation">
                                <span class="hamburger-bar"></span>
                                <span class="hamburger-bar"></span>
                                <span class="hamburger-bar"></span>
                            </button>

                            <nav class="navbar navbar-expand-lg">
                                <ul class="navbar-nav">
                                    <li class="dropdown active"><a href="index.html" class="nav-link">Home <i class="icofont icofont-simple-down"></i></a>
                                        <ul class="dropdown-menu">
                                            <li><a href="index.html">Home 1</a></li>
                                            <li><a href="index-2.html">Home 2</a></li>
                                            <li><a href="index-3.html">Home 3</a></li>
                                            <li><a href="index-4.html">Home 4</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown"><a href="services.html" class="nav-link">Services <i class="icofont icofont-simple-down"></i></a>
                                        <ul class="dropdown-menu">
                                            <li><a href="services.html">View All Services</a></li>
                                            <li><a href="single-services.html">Petroleum &amp; Mining</a></li>
                                            <li><a href="single-services.html">Fuel Controlling</a></li>
                                            <li><a href="single-services.html">Liquid Chemicals</a></li>
                                            <li><a href="single-services.html">Monomers &amp; Polymer</a></li>
                                            <li><a href="single-services.html">Maintenance &amp; Repairs</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="nav-link" href="projects.html">Projects</a></li>
                                    <li class="dropdown"><a class="nav-link" href="#">Pages <i class="icofont icofont-simple-down"></i></a>
                                        <ul class="dropdown-menu">
                                            <li><a href="about.html">About Us</a></li>
                                            <li><a href="about-2.html">About Us 2</a></li>
                                            <li><a href="faq.html">FAQ</a></li>
                                            <li><a href="team.html">Our Team</a></li>
                                            <li><a href="testimonial.html">Testimonial</a></li>
                                            <li><a href="404.html">404 Page</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown"><a href="shop.html" class="nav-link">Shop <i class="icofont icofont-simple-down"></i></a>
                                        <ul class="dropdown-menu">
                                            <li><a href="shop.html">Our Shop</a></li>
                                            <li><a href="shop-details.html">Product Details</a></li>
                                            <li><a href="shop-cart.html">Shopping Cart</a></li>
                                            <li><a href="shop-checkout.html">Checkout</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown"><a href="blog.html" class="nav-link">Blog <i class="icofont icofont-simple-down"></i></a>
                                        <ul class="dropdown-menu">
                                            <li><a href="blog.html">Blog</a></li>
                                            <li><a href="blog-single.html">Blog Single</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                                </ul>
                            </nav>    
                        </div>

                        <!-- Right Search & Address Area -->
                        <div class="col-lg-4 col-md-12 d-flex align-items-center justify-content-end search-col">
                            <div class="header-search">
                                <ul>
                                    <li class="menuleft-address d-none d-md-block"><p>10004, BATTERY PARK, NEW YORK<br>NEW YORK, USA</p></li>
                                    <li class="dropdown menuleft-search">
                                        <a href="#" id="search-trigger" aria-label="Search"><i class="icofont icofont-search-alt-2"></i></a>
                                        <ul class="dropdown-menu search-dropdown">
                                            <li>
                                                <form action="/search" method="get">
                                                    <div class="form-group" style="position: relative;">
                                                        <input class="form-control" name="q" placeholder="Search..." type="text">
                                                        <button type="submit" class="btn" aria-label="Submit Search"><i class="icofont icofont-search"></i></button>
                                                    </div>
                                                </form>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  `;

  block.append(headerEl);

  // -------------------------------------------------------------
  // 1. Sticky Header Scroll Listener
  // -------------------------------------------------------------
  const stickyWrapper = headerEl.querySelector('.sticky-wrapper');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 160) {
      stickyWrapper.classList.add('is-sticky');
    } else {
      stickyWrapper.classList.remove('is-sticky');
    }
  });

  // -------------------------------------------------------------
  // 2. Hamburger Mobile Toggle
  // -------------------------------------------------------------
  const toggler = headerEl.querySelector('.navbar-toggler');
  const navbar = headerEl.querySelector('.navbar');

  toggler.addEventListener('click', () => {
    toggler.classList.toggle('active');
    navbar.classList.toggle('show');
  });

  // Mobile Dropdown Accordions
  const dropdownLinks = headerEl.querySelectorAll('.navbar-nav .dropdown > a');
  dropdownLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth < 992) {
        e.preventDefault();
        const parent = link.parentElement;
        parent.classList.toggle('open');
      }
    });
  });

  // -------------------------------------------------------------
  // 3. Search Dropdown Popup
  // -------------------------------------------------------------
  const searchTrigger = headerEl.querySelector('#search-trigger');
  const searchDropdown = headerEl.querySelector('.menuleft-search');

  searchTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    searchDropdown.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!searchDropdown.contains(e.target)) {
      searchDropdown.classList.remove('open');
    }
  });
}