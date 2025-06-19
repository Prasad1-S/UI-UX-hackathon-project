// Global variables and state management
let currentCarouselIndex = 0;
let carouselInterval;
let isScrolling = false;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all application features
function initializeApp() {
    // Core functionality
    initPreloader();
    initThemeToggle();
    initNavigation();
    initScrollAnimations();
    initParallax();
    
    // Interactive features
    initCarousel();
    initRippleEffect();
    initPortfolioFilter();
    initSmoothScrolling();
    initPopupModal();
    initContactForm();
    
    // Performance optimizations
    initIntersectionObserver();
    
    console.log('🚀 Lumos application initialized successfully!');
}

// Preloader functionality
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    // Simulate loading time with minimum display duration
    const minLoadTime = 2000; // 2 seconds minimum
    const startTime = Date.now();
    
    window.addEventListener('load', function() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        setTimeout(function() {
            preloader.classList.add('hidden');
            // Remove preloader from DOM after animation
            setTimeout(() => preloader.remove(), 500);
        }, remainingTime);
    });
    
    // Fallback: hide preloader after maximum wait time
    setTimeout(function() {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 500);
        }
    }, 5000);
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add click animation
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 200);
    });
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        if (isScrolling) return;
        
        const scrollPos = window.scrollY + 100;
        
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                const target = document.querySelector(targetId);
                if (target) {
                    const targetTop = target.offsetTop;
                    const targetBottom = targetTop + target.offsetHeight;
                    
                    if (scrollPos >= targetTop && scrollPos < targetBottom) {
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            }
        });
    }
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                isScrolling = true;
                
                const targetPosition = target.offsetTop - 70;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Reset scrolling flag after animation
                setTimeout(() => {
                    isScrolling = false;
                }, 800);
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = parseInt(element.getAttribute('data-delay')) || 0;
                
                setTimeout(() => {
                    element.classList.add('animate');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Parallax scrolling effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-container');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.scrollY;
        
        parallaxElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (elementTop < scrollTop + windowHeight && elementTop + elementHeight > scrollTop) {
                const yPos = -(scrollTop - elementTop) * 0.3;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }, 16)); // ~60fps
}

// Carousel functionality
function initCarousel() {
    const carousel = document.getElementById('image-carousel');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    if (carouselItems.length === 0) return;
    
    // Create indicators
    carouselItems.forEach((item, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (index === 0) indicator.classList.add('active');
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
    
    // Navigation event handlers
    nextBtn.addEventListener('click', () => nextSlide());
    prevBtn.addEventListener('click', () => prevSlide());
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // Auto-play carousel
    startAutoPlay();
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    function nextSlide() {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselItems.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentCarouselIndex = (currentCarouselIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
    }
    
    function goToSlide(index) {
        currentCarouselIndex = index;
        updateCarousel();
    }
    
    function updateCarousel() {
        carouselItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        carouselItems[currentCarouselIndex].classList.add('active');
        indicators[currentCarouselIndex].classList.add('active');
    }
    
    function startAutoPlay() {
        stopAutoPlay();
        carouselInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }
}

// Ripple effect for interactive elements
function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.ripple-btn, .ripple-container');
    
    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.classList.add('animate-on-scroll');
                    // Trigger animation
                    setTimeout(() => item.classList.add('animate'), 100);
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('animate');
                }
            });
        });
    });
}

// Popup modal functionality
function initPopupModal() {
    const modal = document.getElementById('popup-modal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.popup-close');
    const ctaBtn = document.getElementById('popup-cta');
    
    // Show popup after delay (if not shown before)
    if (!localStorage.getItem('popupShown')) {
        setTimeout(() => {
            showPopup();
        }, 10000); // Show after 10 seconds
    }
    
    // Close popup handlers
    if (closeBtn) closeBtn.addEventListener('click', hidePopup);
    if (ctaBtn) ctaBtn.addEventListener('click', hidePopup);
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            hidePopup();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            hidePopup();
        }
    });
    
    function showPopup() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function hidePopup() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        localStorage.setItem('popupShown', 'true');
    }
}

// Contact form functionality
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Basic form validation
        if (!validateForm(formData)) {
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#28a745';
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                showNotification('Thank you! Your message has been sent successfully.', 'success');
            }, 2000);
        }, 1500);
    });
    
    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.name.trim()) {
            showNotification('Please enter your name.', 'error');
            return false;
        }
        
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return false;
        }
        
        if (!data.subject.trim()) {
            showNotification('Please enter a subject.', 'error');
            return false;
        }
        
        if (!data.message.trim()) {
            showNotification('Please enter your message.', 'error');
            return false;
        }
        
        return true;
    }
}

// Intersection Observer for performance optimization
function initIntersectionObserver() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    if (lazyElements.length === 0) return;
    
    const lazyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const lazySrc = element.getAttribute('data-lazy');
                
                if (lazySrc) {
                    element.setAttribute('src', lazySrc);
                    element.removeAttribute('data-lazy');
                }
                
                lazyObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 15px 20px;
                box-shadow: 0 10px 25px var(--shadow-medium);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 15px;
                max-width: 400px;
                animation: slideIn 0.3s ease;
            }
            
            .notification-success { border-left: 4px solid #28a745; }
            .notification-error { border-left: 4px solid #dc3545; }
            .notification-warning { border-left: 4px solid #ffc107; }
            .notification-info { border-left: 4px solid #17a2b8; }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-muted);
                cursor: pointer;
                padding: 5px;
                transition: color 0.3s ease;
            }
            
            .notification-close:hover {
                color: var(--text-primary);
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Performance monitoring
function initPerformanceMonitoring() {
    window.addEventListener('load', function() {
        const loadTime = Date.now() - performance.timing.navigationStart;
        console.log(`🚀 Page loaded in ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('⚠️ Page load time is above optimal threshold');
        }
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Add CSS animation classes
document.addEventListener('DOMContentLoaded', function() {
    // Add animation styles if not already present
    if (!document.querySelector('#animation-styles')) {
        const styles = document.createElement('style');
        styles.id = 'animation-styles';
        styles.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-on-scroll.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .theme-toggle.clicked {
                transform: scale(0.95);
            }
            
            @media (max-width: 768px) {
                .nav-menu {
                    position: fixed;
                    top: 70px;
                    left: -100%;
                    width: 100%;
                    height: calc(100vh - 70px);
                    background: var(--navbar-bg);
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    padding-top: 50px;
                    transition: left 0.3s ease;
                    backdrop-filter: blur(10px);
                }
                
                .nav-menu.active {
                    left: 0;
                }
                
                .hamburger {
                    display: flex;
                }
                
                .hero-title {
                    font-size: 2.5rem;
                }
                
                .hero-buttons {
                    flex-direction: column;
                }
                
                .carousel-content {
                    width: 100%;
                    padding: 20px;
                }
                
                .carousel-image {
                    display: none;
                }
                
                .contact-content {
                    grid-template-columns: 1fr;
                    gap: 30px;
                }
                
                .customers-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .portfolio-grid {
                    grid-template-columns: 1fr;
                }
                
                .features-grid {
                    grid-template-columns: 1fr;
                }
                
                .testimonials-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(styles);
    }
});

console.log('🎉 Lumos script loaded successfully!');