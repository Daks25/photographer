/* ============================================
   ANIMATIONS - INTERSECTION OBSERVER & EFFECTS
   ============================================ */

/* ============================================
   INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
   ============================================ */

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

/* ============================================
   PARALLAX EFFECT
   ============================================ */

function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    function updateParallax() {
        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const scrolled = window.scrollY;
            const offset = rect.top + scrolled;
            const distance = scrolled - offset;
            const yPos = distance * 0.5; // 50% parallax effect
            
            el.style.backgroundPosition = `center ${yPos}px`;
        });
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// Initialize parallax on load
window.addEventListener('load', initParallax);

/* ============================================
   SCROLL REVEAL ELEMENTS
   ============================================ */

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length === 0) return;

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
}

initScrollReveal();

/* ============================================
   TEXT CHARACTER ANIMATION
   ============================================ */

function animateTextCharacters(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char;
        span.style.animationDelay = `${index * 50}ms`;
        element.appendChild(span);
    });
}

function initTextAnimations() {
    const textAnimations = document.querySelectorAll('[data-text-animate]');
    
    textAnimations.forEach(el => {
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    animateTextCharacters(entry.target);
                    entry.target.dataset.animated = 'true';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(el);
    });
}

initTextAnimations();

/* ============================================
   IMAGE REVEAL ANIMATION
   ============================================ */

function initImageReveal() {
    const images = document.querySelectorAll('.image-reveal');
    
    images.forEach(img => {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.revealed) {
                    entry.target.classList.add('revealed');
                    entry.target.dataset.revealed = 'true';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(img);
    });
}

initImageReveal();

/* ============================================
   HOVER ANIMATIONS
   ============================================ */

function initHoverAnimations() {
    const hoverElements = document.querySelectorAll('[data-hover-animate]');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animation = `${el.dataset.hoverAnimate} 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.animation = 'none';
        });
    });
}

initHoverAnimations();

/* ============================================
   STAGGERED LIST ANIMATIONS
   ============================================ */

function initStaggeredAnimations() {
    const containers = document.querySelectorAll('.stagger-container');
    
    containers.forEach(container => {
        const items = container.querySelectorAll('.stagger-item');
        
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    const items = entry.target.querySelectorAll('.stagger-item');
                    items.forEach((item, index) => {
                        item.style.animationDelay = `${index * 100}ms`;
                        item.classList.add('aos-animate');
                    });
                    entry.target.dataset.animated = 'true';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(container);
    });
}

initStaggeredAnimations();

/* ============================================
   SCROLL PROGRESS BAR
   ============================================ */

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

initScrollProgress();

/* ============================================
   ACCORDION ANIMATIONS
   ============================================ */

function initAccordions() {
    const accordionHeaders = document.querySelectorAll('[data-accordion-header]');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close other accordion items in the same group
            const group = header.closest('[data-accordion-group]');
            if (group) {
                group.querySelectorAll('[data-accordion-header]').forEach(h => {
                    const c = h.nextElementSibling;
                    if (c && c !== content) {
                        c.classList.remove('active');
                    }
                });
            }
            
            // Toggle current
            if (content) {
                if (isActive) {
                    content.classList.remove('active');
                } else {
                    content.classList.add('active');
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initAccordions);

/* ============================================
   MODAL ANIMATIONS
   ============================================ */

function initModals() {
    const modals = document.querySelectorAll('[data-modal]');
    const openButtons = document.querySelectorAll('[data-modal-open]');
    const closeButtons = document.querySelectorAll('[data-modal-close]');

    openButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modalOpen;
            const modal = document.querySelector(`[data-modal="${modalId}"]`);
            
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('[data-modal]');
            
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
                document.body.style.overflow = '';
            }
        });
    });

    // Close on outside click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
                document.body.style.overflow = '';
            }
        });

        // Prevent closing when clicking inside modal content
        const content = modal.querySelector('[data-modal-content]');
        if (content) {
            content.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', initModals);

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */

function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.setAttribute('role', 'alert');
    
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Make toast function globally available
window.showToast = showToast;

/* ============================================
   INTERSECTION OBSERVER FOR LAZY IMAGES
   ============================================ */

function initLazyImages() {
    if (!('IntersectionObserver' in window)) {
        // Fallback for browsers without IntersectionObserver
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
        return;
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

window.addEventListener('load', initLazyImages);

/* ============================================
   COUNTER ANIMATION (FOR VARIOUS ELEMENTS)
   ============================================ */

function animateCounter(element, target, duration = 2000) {
    const start = Date.now();
    
    const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(target * progress);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}
