/* ============================================
   MAIN JAVASCRIPT - CORE FUNCTIONALITY
   ============================================ */

// Scroll to top button
const backToTopBtn = document.getElementById('back-to-top');
const scrollThreshold = 300;

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const element = entry.target;
                const target = parseInt(element.dataset.count);
                const duration = 2000; // 2 seconds
                const start = Date.now();

                const animate = () => {
                    const elapsed = Date.now() - start;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeOutQuad = 1 - (1 - progress) * (1 - progress);
                    const current = Math.floor(target * easeOutQuad);
                    
                    element.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        element.textContent = target;
                        element.dataset.animated = 'true';
                    }
                };

                animate();
            }
        });
    }, observerOptions);

    statNumbers.forEach(num => observer.observe(num));
}

// Initialize counter animation
if (document.querySelector('.stat-number')) {
    animateCounters();
}

/* ============================================
   SMOOTH SCROLL ANCHOR LINKS
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Skip if href is just '#'
        if (href === '#') return;

        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            
            const offset = 80; // Account for sticky navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   NEWSLETTER FORM
   ============================================ */

function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const input = form.querySelector('input[type="email"]');
        const button = form.querySelector('button');
        
        if (!input.value) {
            alert('Please enter your email address');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate form submission
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.disabled = true;

        setTimeout(() => {
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
            alert('Thank you for subscribing!');
        }, 1500);
    });
}

initNewsletterForm();

/* ============================================
   PAGE TRANSITION DETECTION
   ============================================ */

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const page = href.split('/').pop();
        
        if (page === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

/* ============================================
   LAZY LOADING SETUP
   ============================================ */

function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Force load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

initLazyLoading();

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

/* ============================================
   ERROR HANDLING
   ============================================ */

window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
});
