/* ============================================
   NAVBAR FUNCTIONALITY
   ============================================ */

const navbar = document.querySelector('.navbar');
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
const navbarLinks = document.querySelectorAll('.navbar-link');

let lastScrollTop = 0;
let isScrolling = false;

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */

if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        
        // Update aria-expanded
        const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
        navbarToggle.setAttribute('aria-expanded', !isExpanded);
    });
}

/* ============================================
   CLOSE MENU ON LINK CLICK
   ============================================ */

navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Close mobile menu
        if (navbarToggle && navbarToggle.classList.contains('active')) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            navbarToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

/* ============================================
   CLOSE MENU ON OUTSIDE CLICK
   ============================================ */

document.addEventListener('click', (e) => {
    const isClickInsideMenu = navbarMenu && navbarMenu.contains(e.target);
    const isClickOnToggle = navbarToggle && navbarToggle.contains(e.target);
    
    if (!isClickInsideMenu && !isClickOnToggle && navbarMenu && navbarMenu.classList.contains('active')) {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
        navbarToggle.setAttribute('aria-expanded', 'false');
    }
});

/* ============================================
   NAVBAR SCROLL EFFECTS
   ============================================ */

function handleNavbarScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    // Add scrolled class when page is scrolled
    if (scrollTop > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }

    // Hide/Show navbar on scroll
    if (!isScrolling) {
        isScrolling = true;
        
        setTimeout(() => {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down - hide navbar
                navbar.classList.add('hide');
                navbar.classList.remove('show');
            } else {
                // Scrolling up - show navbar
                navbar.classList.remove('hide');
                navbar.classList.add('show');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            isScrolling = false;
        }, 10);
    }
}

// Throttled scroll listener
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleNavbarScroll();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

/* ============================================
   ACTIVE LINK HIGHLIGHTING ON SCROLL
   ============================================ */

function updateActiveLink() {
    let currentSection = '';
    
    // Get all sections
    const sections = document.querySelectorAll('section, header');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.id;
        }
    });

    // Update nav links
    navbarLinks.forEach(link => {
        link.classList.remove('active');
        const dataSection = link.getAttribute('data-section');
        
        if (dataSection === currentSection || 
            (currentSection === '' && dataSection === 'home') ||
            (window.scrollY < 200 && dataSection === 'home')) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

/* ============================================
   ACCESSIBILITY FEATURES
   ============================================ */

// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbarMenu && navbarMenu.classList.contains('active')) {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
        navbarToggle.setAttribute('aria-expanded', 'false');
        navbarToggle.focus();
    }
});

// Close menu when focus moves outside
document.addEventListener('focusin', (e) => {
    if (navbarMenu && navbarMenu.classList.contains('active')) {
        const isInMenu = navbarMenu.contains(e.target);
        const isToggle = navbarToggle && navbarToggle.contains(e.target);
        
        if (!isInMenu && !isToggle) {
            // Optionally close menu if focus moves outside
            // Only close if tabbing outside the nav completely
            if (e.target !== navbarToggle) {
                // Keep menu open for keyboard navigation within nav
            }
        }
    }
});

/* ============================================
   LOGO CLICK HOME NAVIGATION
   ============================================ */

const navbar__logo = document.querySelector('.navbar-logo');

if (navbar__logo) {
    navbar__logo.addEventListener('click', (e) => {
        // Close mobile menu if open
        if (navbarToggle && navbarToggle.classList.contains('active')) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            navbarToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ============================================
   PREVENT SCROLL LOCK ON MOBILE
   ============================================ */

function updateBodyOverflow() {
    if (navbarMenu && navbarMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

navbarToggle?.addEventListener('click', () => {
    setTimeout(updateBodyOverflow, 0);
});

document.addEventListener('click', (e) => {
    if (!navbarMenu.contains(e.target) && !navbarToggle.contains(e.target)) {
        updateBodyOverflow();
    }
});
