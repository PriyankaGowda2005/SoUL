// ========================================
// ENHANCED RESPONSIVE JAVASCRIPT SYSTEM
// ========================================

// Note: Custom cursor functionality has been moved to custom-cursor.js
// Note: Theme toggle functionality has been moved to theme-arrow-fix.js
// Note: Navigation functionality has been moved to navbar-fix.js
// This file now focuses on other interactive features

// Enhanced Service Modal Functions
function openServiceModal(title, content, iconClass) {
    const modal = document.getElementById('service-modal');
    const modalIcon = document.getElementById('modal-icon');
    
    document.getElementById('modal-title').textContent = title;
    
    // Format content with proper line breaks and ensure it wraps
    const formattedContent = content.replace(/\n\n/g, '\n\n').trim();
    document.getElementById('modal-content').textContent = formattedContent;
    
    modalIcon.innerHTML = `<i class="${iconClass}"></i>`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add haptic feedback
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
    
    // Ensure modal is properly positioned
    setTimeout(() => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
    }, 100);
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Enhanced modal event listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeServiceModal();
    }
});

document.getElementById('service-modal').addEventListener('click', (e) => {
    if (e.target.id === 'service-modal') {
        closeServiceModal();
    }
});

// Enhanced Tab Switching with Touch Support
function switchTab(tabName) {
    // Remove active class from all tabs and buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and button
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Add haptic feedback
    if ('vibrate' in navigator) {
        navigator.vibrate(30);
    }
}

// Enhanced Gallery Carousel with Touch Support
let currentSlide = 0;
let isAutoPlaying = true;
let autoPlayInterval;
const slides = document.querySelectorAll('.gallery-slide');
const totalSlides = slides.length;
const track = document.getElementById('gallery-track');
const dotsContainer = document.getElementById('gallery-dots');

// Create dots with enhanced touch support
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.classList.add('gallery-dot');
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => goToSlide(i);
    
    // Enhanced touch support for dots
    dot.addEventListener('touchstart', (e) => {
        e.preventDefault();
        goToSlide(i);
    });
    
    dotsContainer.appendChild(dot);
}

function updateGallery() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots with smooth transition
    document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function moveGallery(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateGallery();
    
    // Add haptic feedback
    if ('vibrate' in navigator) {
        navigator.vibrate(30);
    }
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateGallery();
    
    // Add haptic feedback
    if ('vibrate' in navigator) {
        navigator.vibrate(30);
    }
}

// Enhanced auto-play with pause on interaction
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        if (isAutoPlaying) {
            moveGallery(1);
        }
    }, 5000);
}

function pauseAutoPlay() {
    isAutoPlaying = false;
    clearInterval(autoPlayInterval);
}

function resumeAutoPlay() {
    isAutoPlaying = true;
    startAutoPlay();
}

// Start auto-play
startAutoPlay();

// Enhanced touch support for gallery
let touchStartX = 0;
let touchEndX = 0;

const galleryCarousel = document.querySelector('.gallery-carousel');

galleryCarousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    pauseAutoPlay();
});

galleryCarousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    // Resume auto-play after 3 seconds
    setTimeout(resumeAutoPlay, 3000);
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            moveGallery(1);
        } else {
            // Swipe right - previous slide
            moveGallery(-1);
        }
    }
}

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveGallery(-1);
        pauseAutoPlay();
        setTimeout(resumeAutoPlay, 3000);
    } else if (e.key === 'ArrowRight') {
        moveGallery(1);
        pauseAutoPlay();
        setTimeout(resumeAutoPlay, 3000);
    }
});

// Enhanced Fade-in Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            
            // Add staggered animation for multiple elements
            const siblings = entry.target.parentElement.children;
            Array.from(siblings).forEach((sibling, index) => {
                if (sibling === entry.target) {
                    setTimeout(() => {
                        sibling.style.animationDelay = `${index * 0.1}s`;
                    }, 100);
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Enhanced Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Enhanced counter observer
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.count);
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-count]').forEach(counter => {
    counterObserver.observe(counter);
});

// Enhanced Form Submission with Better UX
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Enhanced loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission with better feedback
    setTimeout(() => {
        // Show success message
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Add haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
    }, 2000);
});

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Enhanced mobile experience with touch feedback
if ('ontouchstart' in window) {
    // Enhanced touch feedback for cards
    document.querySelectorAll('.service-card, .member-card, .card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = 'transform 0.3s ease';
            }, 150);
        });
    });
    
    // Enhanced touch feedback for buttons
    document.querySelectorAll('.btn, .tab-btn, .gallery-nav').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = 'transform 0.2s ease';
            }, 100);
        });
    });
}

// Enhanced performance optimizations
const style = document.createElement('style');
style.textContent = `
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.25rem;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
        }
    }
`;
document.head.appendChild(style);

// Enhanced initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure smooth loading
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize touch-friendly interactions
    initializeTouchInteractions();
    
    // Initialize performance optimizations
    initializePerformanceOptimizations();
});

// Enhanced touch interactions initialization
function initializeTouchInteractions() {
    // Add touch-friendly hover effects
    if ('ontouchstart' in window) {
        document.querySelectorAll('.service-card, .member-card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }
}

// Enhanced performance optimizations
function initializePerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'styles.css',
        'script.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could send error reports to analytics service
});

// Enhanced unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Could send error reports to analytics service
});

// Enhanced visibility change handling (for mobile)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause auto-play when tab is not visible
        pauseAutoPlay();
    } else {
        // Resume auto-play when tab becomes visible
        resumeAutoPlay();
    }
});

// Enhanced resize handling
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate layouts on resize
        
        // Update gallery if needed
        updateGallery();
    }, 250);
});

// Enhanced orientation change handling
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        // Recalculate layouts after orientation change
        updateGallery();
    }, 500);
});
