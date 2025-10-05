/**
 * Unified Responsive JavaScript Utilities for SoUL Website
 * This file provides consistent functionality across all pages
 */

// Prevent duplicate loading
if (window.SoULResponsiveUtils) {
    console.log('Responsive utils already loaded, skipping...');
} else {
window.SoULResponsiveUtils = true;

// Enhanced Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.themeIcon = document.getElementById('theme-icon');
        this.hasUserInteracted = false;
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    applyTheme(theme) {
        const body = document.body;
        
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            if (this.themeIcon) {
                this.themeIcon.className = 'fas fa-sun';
            }
        } else {
            body.classList.remove('dark-theme');
            if (this.themeIcon) {
                this.themeIcon.className = 'fas fa-moon';
            }
        }
        
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        
        // Haptic feedback for mobile
        if (navigator.vibrate && this.hasUserInteracted) {
            navigator.vibrate(50);
        }
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: newTheme } 
        }));
    }

    setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.hasUserInteracted = true;
                this.toggleTheme();
            });
        }
        
        // Track user interaction for haptic feedback
        document.addEventListener('click', () => {
            this.hasUserInteracted = true;
        });
        
        document.addEventListener('touchstart', () => {
            this.hasUserInteracted = true;
        });
    }
}

// Enhanced Mobile Experience Manager
class MobileExperienceManager {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.hasUserInteracted = false;
        this.init();
    }

    init() {
        this.addTouchFeedback();
        this.addSwipeGestures();
        this.addOrientationHandling();
        this.addHapticFeedback();
    }

    addTouchFeedback() {
        const interactiveElements = document.querySelectorAll(
            '.responsive-btn, .responsive-nav-link, .responsive-card, button, a, input, select'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                this.hasUserInteracted = true;
                this.addTouchStartEffect(e.target);
            });

            element.addEventListener('touchend', (e) => {
                this.addTouchEndEffect(e.target);
            });

            element.addEventListener('touchcancel', (e) => {
                this.addTouchEndEffect(e.target);
            });
        });
    }

    addTouchStartEffect(element) {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
    }

    addTouchEndEffect(element) {
        element.style.transform = 'scale(1)';
    }

    addSwipeGestures() {
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = this.touchStartX - touchEndX;
            const diffY = this.touchStartY - touchEndY;

            // Determine if it's a horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                const swipeDirection = diffX > 0 ? 'left' : 'right';
                this.handleSwipe(swipeDirection, diffX);
            }
        });
    }

    handleSwipe(direction, distance) {
        // Dispatch custom swipe event
        document.dispatchEvent(new CustomEvent('swipe', {
            detail: { direction, distance }
        }));

        // Haptic feedback
        if (navigator.vibrate && this.hasUserInteracted) {
            navigator.vibrate(30);
        }
    }

    addOrientationHandling() {
        let orientationTimeout;
        
        window.addEventListener('orientationchange', () => {
            clearTimeout(orientationTimeout);
            orientationTimeout = setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
    }

    handleOrientationChange() {
        // Dispatch custom orientation change event
        document.dispatchEvent(new CustomEvent('orientationChanged', {
            detail: { 
                orientation: screen.orientation?.type || 'unknown',
                width: window.innerWidth,
                height: window.innerHeight
            }
        }));

        // Recalculate layouts
        this.recalculateLayouts();
    }

    addHapticFeedback() {
        // Add haptic feedback to interactive elements
        const hapticElements = document.querySelectorAll(
            '.responsive-btn, .responsive-nav-link, button, a'
        );

        hapticElements.forEach(element => {
            element.addEventListener('click', () => {
                if (navigator.vibrate && this.hasUserInteracted) {
                    navigator.vibrate(50);
                }
            });
        });
    }

    recalculateLayouts() {
        // Trigger layout recalculation for responsive elements
        const responsiveElements = document.querySelectorAll(
            '.responsive-grid, .responsive-stats-grid, .responsive-gallery'
        );

        responsiveElements.forEach(element => {
            element.style.display = 'none';
            element.offsetHeight; // Force reflow
            element.style.display = '';
        });
    }
}

// Enhanced Performance Manager
class PerformanceManager {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupResourcePreloading();
        this.setupErrorHandling();
        this.setupPerformanceMonitoring();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
    }

    setupResourcePreloading() {
        const criticalResources = [
            'styles.css',
            'script.js',
            'responsive-system.css'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            this.reportError(e.error, 'javascript');
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.reportError(e.reason, 'promise');
        });
    }

    reportError(error, type) {
        // Could send error to analytics service
        console.log(`Error reported: ${type}`, error);
    }

    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    }
                });
            });

            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
        }
    }
}

// Enhanced Accessibility Manager
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyboardNavigation();
        this.addARIALabels();
        this.addFocusManagement();
        this.addScreenReaderSupport();
    }

    addKeyboardNavigation() {
        // Add keyboard navigation for interactive elements
        const interactiveElements = document.querySelectorAll(
            '.responsive-btn, .responsive-nav-link, .responsive-card'
        );

        interactiveElements.forEach(element => {
            element.setAttribute('tabindex', '0');
            
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
    }

    addARIALabels() {
        // Add ARIA labels to interactive elements
        const elements = [
            { selector: '.responsive-btn', label: 'Button' },
            { selector: '.responsive-nav-link', label: 'Navigation link' },
            { selector: '.responsive-input', label: 'Input field' },
            { selector: '.responsive-select', label: 'Select dropdown' }
        ];

        elements.forEach(({ selector, label }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (!element.getAttribute('aria-label')) {
                    element.setAttribute('aria-label', label);
                }
            });
        });
    }

    addFocusManagement() {
        // Add focus management for modals and dropdowns
        const modals = document.querySelectorAll('.responsive-modal');
        modals.forEach(modal => {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    modal.classList.remove('active');
                }
            });
        });
    }

    addScreenReaderSupport() {
        // Add screen reader announcements
        const announcementArea = document.createElement('div');
        announcementArea.setAttribute('aria-live', 'polite');
        announcementArea.setAttribute('aria-atomic', 'true');
        announcementArea.className = 'sr-only';
        announcementArea.style.position = 'absolute';
        announcementArea.style.left = '-10000px';
        announcementArea.style.width = '1px';
        announcementArea.style.height = '1px';
        announcementArea.style.overflow = 'hidden';
        document.body.appendChild(announcementArea);

        // Store reference for announcements
        window.screenReaderAnnounce = (message) => {
            announcementArea.textContent = message;
        };
    }
}

// Enhanced Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupStaggeredAnimations();
        this.setupCounterAnimations();
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.responsive-card, .responsive-section, .responsive-stat-card'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('responsive-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            observer.observe(element);
        });
    }

    setupStaggeredAnimations() {
        const staggeredContainers = document.querySelectorAll(
            '.responsive-grid, .responsive-stats-grid, .responsive-gallery'
        );

        staggeredContainers.forEach(container => {
            const children = container.children;
            Array.from(children).forEach((child, index) => {
                child.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.responsive-stat-number');
        
        counters.forEach(counter => {
            const targetValue = parseInt(counter.textContent) || 0;
            this.animateCounter(counter, targetValue);
        });
    }

    animateCounter(element, targetValue) {
        const startValue = 0;
        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }
}

// Enhanced Search Manager
class SearchManager {
    constructor() {
        this.searchTimeout = null;
        this.init();
    }

    init() {
        this.setupDebouncedSearch();
        this.setupSearchFilters();
        this.setupSearchResults();
    }

    setupDebouncedSearch() {
        const searchInputs = document.querySelectorAll('.responsive-input[type="search"], input[placeholder*="search" i]');
        
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.debounceSearch(e.target.value);
            });
        });
    }

    debounceSearch(query) {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.performSearch(query);
        }, 300);
    }

    performSearch(query) {
        // Dispatch custom search event
        document.dispatchEvent(new CustomEvent('searchPerformed', {
            detail: { query }
        }));

        // Haptic feedback
        if (navigator.vibrate && this.hasUserInteracted) {
            navigator.vibrate(30);
        }
    }

    setupSearchFilters() {
        const filterElements = document.querySelectorAll('.responsive-select');
        
        filterElements.forEach(select => {
            select.addEventListener('change', (e) => {
                this.handleFilterChange(e.target);
            });
        });
    }

    handleFilterChange(select) {
        // Dispatch custom filter event
        document.dispatchEvent(new CustomEvent('filterChanged', {
            detail: { 
                filter: select.name || select.id,
                value: select.value 
            }
        }));
    }

    setupSearchResults() {
        // Add search result highlighting
        document.addEventListener('searchPerformed', (e) => {
            const query = e.detail.query.toLowerCase();
            if (query.length < 2) return;

            const searchableElements = document.querySelectorAll(
                '.responsive-card, .responsive-text, .responsive-heading-1, .responsive-heading-2, .responsive-heading-3'
            );

            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(query)) {
                    element.classList.add('search-highlight');
                } else {
                    element.classList.remove('search-highlight');
                }
            });
        });
    }
}

// Enhanced Modal Manager
class ModalManager {
    constructor() {
        this.activeModal = null;
        this.init();
    }

    init() {
        this.setupModalTriggers();
        this.setupModalClose();
        this.setupModalKeyboard();
    }

    setupModalTriggers() {
        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal-target');
                this.openModal(modalId);
            });
        });
    }

    setupModalClose() {
        const closeButtons = document.querySelectorAll('.modal-close, [data-modal-close]');
        
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Close on backdrop click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('responsive-modal')) {
                this.closeModal();
            }
        });
    }

    setupModalKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal();
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            this.activeModal = modal;
            
            // Focus first interactive element
            const firstFocusable = modal.querySelector('button, input, select, textarea, a');
            if (firstFocusable) {
                firstFocusable.focus();
            }
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        if (this.activeModal) {
            this.activeModal.classList.remove('active');
            this.activeModal = null;
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }
}

// Enhanced Notification Manager
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.init();
    }

    init() {
        this.createNotificationContainer();
    }

    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }

    show(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: var(--mobile-radius);
            padding: 1rem;
            box-shadow: var(--desktop-shadow);
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-weight: 600;">${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    color: var(--text-secondary);
                ">×</button>
            </div>
        `;

        document.getElementById('notification-container').appendChild(notification);
        
        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);

        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    success(message, duration = 5000) {
        this.show(message, 'success', duration);
    }

    error(message, duration = 7000) {
        this.show(message, 'error', duration);
    }

    warning(message, duration = 6000) {
        this.show(message, 'warning', duration);
    }

    info(message, duration = 5000) {
        this.show(message, 'info', duration);
    }
}

// Utility Functions
const ResponsiveUtils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Get device type
    getDeviceType() {
        const width = window.innerWidth;
        if (width <= 480) return 'mobile';
        if (width <= 768) return 'tablet';
        if (width <= 1024) return 'laptop';
        return 'desktop';
    },

    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // Generate random ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
};

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize managers
    window.themeManager = new ThemeManager();
    window.mobileExperienceManager = new MobileExperienceManager();
    window.performanceManager = new PerformanceManager();
    window.accessibilityManager = new AccessibilityManager();
    window.animationManager = new AnimationManager();
    window.searchManager = new SearchManager();
    window.modalManager = new ModalManager();
    window.notificationManager = new NotificationManager();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .search-highlight {
            background: rgba(255, 255, 0, 0.3);
            border-radius: 4px;
            padding: 2px 4px;
        }
        
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Responsive system initialized successfully');
});

// Export for use in other scripts
window.ResponsiveUtils = ResponsiveUtils;

} // End of SoULResponsiveUtils check
