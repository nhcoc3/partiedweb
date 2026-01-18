// ========================================
// PARTIED.LIFE - Landing Page Scripts
// Smooth scrolling, animations, interactions
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initSmoothScroll();
    initScrollAnimations();
    initNavbarScroll();
    initMapPinAnimations();
});

// Smooth Scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = [
        '.hero-content',
        '.hero-visual',
        '.comparison-card',
        '.tier-card',
        '.loop-section',
        '.founding-content',
        '.cta-card',
        '.trust-content',
        '.venues-content',
        '.venues-visual',
        '.final-content'
    ];
    
    animateElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            // Add reveal class for animation
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 100}ms`;
            observer.observe(el);
        });
    });
}

// Navbar background on scroll
function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.6)';
        } else {
            nav.style.background = 'transparent';
        }
        
        lastScroll = currentScroll;
    });
}

// Staggered map pin animations
function initMapPinAnimations() {
    const pins = document.querySelectorAll('.map-pin');
    
    pins.forEach((pin, index) => {
        // Stagger the pulse animation
        const pulse = pin.querySelector('.pin-pulse');
        if (pulse) {
            pulse.style.animationDelay = `${index * 300}ms`;
        }
        
        // Add hover effect to show venue name
        pin.addEventListener('mouseenter', () => {
            const venueName = pin.dataset.venue;
            if (venueName) {
                const venueCard = document.querySelector('.venue-card .venue-name');
                if (venueCard) {
                    venueCard.textContent = venueName;
                }
            }
        });
    });
}

// Optional: Add typing effect to hero title
function initTypingEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Parallax effect for hero glow
function initParallax() {
    const glow = document.querySelector('.hero-glow');
    
    if (glow) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            
            glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    }
}

// Initialize parallax on desktop only
if (window.innerWidth > 768) {
    initParallax();
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Re-initialize parallax based on screen size
        if (window.innerWidth > 768) {
            initParallax();
        }
    }, 250);
});
