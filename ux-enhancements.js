/**
 * Enhanced UX Improvements for SoUL Website
 * This file provides advanced UX features across all pages
 */

// Prevent duplicate loading
if (window.SoULUXEnhancements) {
    console.log('UX enhancements already loaded, skipping...');
} else {
window.SoULUXEnhancements = true;

// Enhanced Loading States Manager
class LoadingStateManager {
    constructor() {
        this.loadingElements = new Map();
        this.init();
    }

    init() {
        this.createLoadingOverlay();
        this.setupPageLoadStates();
        this.setupFormLoadingStates();
        this.setupImageLoadingStates();
    }

    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <div class="loading-text">Loading...</div>
            </div>
        `;
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .loading-content {
                text-align: center;
                color: white;
            }
            
            .loading-spinner {
                width: 50px;
                height: 50px;
                border: 4px solid rgba(255, 255, 255, 0.3);
                border-top: 4px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            
            .loading-text {
                font-size: 1.2rem;
                font-weight: 500;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .loading-overlay.active {
                opacity: 1;
                visibility: visible;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(overlay);
    }

    showLoading(message = 'Loading...') {
        const overlay = document.getElementById('loading-overlay');
        const text = overlay.querySelector('.loading-text');
        text.textContent = message;
        overlay.classList.add('active');
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        overlay.classList.remove('active');
    }

    setupPageLoadStates() {
        // Show loading on page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoading();
            }, 500);
        });

        // Show loading on page unload
        window.addEventListener('beforeunload', () => {
            this.showLoading('Saving changes...');
        });
    }

    setupFormLoadingStates() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                if (submitBtn) {
                    this.setButtonLoading(submitBtn, true);
                }
            });
        });
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.dataset.originalText = button.textContent;
            button.innerHTML = '<div class="loading-spinner" style="width: 20px; height: 20px; border-width: 2px;"></div>';
            button.disabled = true;
        } else {
            button.textContent = button.dataset.originalText || 'Submit';
            button.disabled = false;
        }
    }

    setupImageLoadingStates() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
                
                img.addEventListener('error', () => {
                    img.style.opacity = '1';
                    img.alt = 'Image failed to load';
                });
            }
        });
    }
}

// Enhanced Animation Manager
class AdvancedAnimationManager {
    constructor() {
        this.animations = new Map();
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupClickAnimations();
        this.setupStaggeredAnimations();
        this.setupParallaxEffects();
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.responsive-card, .responsive-section, .responsive-stat-card, .member-card, .service-card'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(element);
        });
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Add staggered animation for child elements
        const children = element.querySelectorAll('.responsive-card, .member-card, .service-card');
        children.forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
            child.classList.add('fade-in-stagger');
        });
    }

    setupHoverAnimations() {
        const hoverElements = document.querySelectorAll(
            '.responsive-card, .responsive-btn, .member-card, .service-card'
        );

        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.addHoverEffect(element);
            });

            element.addEventListener('mouseleave', () => {
                this.removeHoverEffect(element);
            });
        });
    }

    addHoverEffect(element) {
        element.style.transform = 'translateY(-5px) scale(1.02)';
        element.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    removeHoverEffect(element) {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.boxShadow = '';
    }

    setupClickAnimations() {
        const clickElements = document.querySelectorAll(
            '.responsive-btn, .responsive-nav-link, button, a'
        );

        clickElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.addClickEffect(e.target);
            });
        });
    }

    addClickEffect(element) {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 100);
    }

    setupStaggeredAnimations() {
        const staggeredContainers = document.querySelectorAll(
            '.members-grid, .services-grid, .responsive-grid, .responsive-stats-grid'
        );

        staggeredContainers.forEach(container => {
            const children = Array.from(container.children);
            children.forEach((child, index) => {
                child.style.animationDelay = `${index * 0.1}s`;
                child.classList.add('stagger-animation');
            });
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Enhanced Performance Manager
class AdvancedPerformanceManager {
    constructor() {
        this.metrics = new Map();
        this.init();
    }

    init() {
        this.setupResourceOptimization();
        this.setupImageOptimization();
        this.setupCodeSplitting();
        this.setupCaching();
        this.setupPerformanceMonitoring();
    }

    setupResourceOptimization() {
        // Preload critical resources
        const criticalResources = [
            'styles.css',
            'responsive-system.css',
            'script.js',
            'responsive-utils.js'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });

        // Prefetch non-critical resources
        const nonCriticalResources = [
            'AlumniDetail.html',
            'Event.html',
            'AnnualReport.html',
            'StudentDetails.html'
        ];

        nonCriticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    setupImageOptimization() {
        // Lazy load images with intersection observer
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

        // Add loading states for images
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }
        });
    }

    setupCodeSplitting() {
        // Load non-critical JavaScript asynchronously
        const asyncScripts = [
            'responsive-utils.js'
        ];

        asyncScripts.forEach(script => {
            const scriptElement = document.createElement('script');
            scriptElement.src = script;
            scriptElement.async = true;
            document.head.appendChild(scriptElement);
        });
    }

    setupCaching() {
        // Implement service worker for caching
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        this.metrics.set('LCP', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                        this.metrics.set('FID', entry.processingStart - entry.startTime);
                    }
                    if (entry.entryType === 'layout-shift') {
                        this.metrics.set('CLS', entry.value);
                    }
                });
            });

            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        }

        // Monitor page load time
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.metrics.set('loadTime', loadTime);
            console.log('Page load time:', loadTime + 'ms');
        });
    }
}

// Enhanced Accessibility Manager
class AdvancedAccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
        this.setupFocusManagement();
        this.setupARIALabels();
        this.setupColorContrast();
        this.setupMotionPreferences();
    }

    setupKeyboardNavigation() {
        // Add keyboard navigation for all interactive elements
        const interactiveElements = document.querySelectorAll(
            '.responsive-btn, .responsive-nav-link, .responsive-card, button, a, input, select, textarea'
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

        // Add skip links
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--accent-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupScreenReaderSupport() {
        // Add screen reader announcements
        const announcementArea = document.createElement('div');
        announcementArea.setAttribute('aria-live', 'polite');
        announcementArea.setAttribute('aria-atomic', 'true');
        announcementArea.className = 'sr-only';
        announcementArea.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(announcementArea);

        // Store reference for announcements
        window.screenReaderAnnounce = (message) => {
            announcementArea.textContent = message;
        };
    }

    setupFocusManagement() {
        // Add focus management for modals and dropdowns
        const modals = document.querySelectorAll('.responsive-modal');
        modals.forEach(modal => {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    modal.classList.remove('active');
                }
            });
        });

        // Add focus trap for modals
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        modals.forEach(modal => {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    const focusableContent = modal.querySelectorAll(focusableElements);
                    const firstFocusableElement = focusableContent[0];
                    const lastFocusableElement = focusableContent[focusableContent.length - 1];

                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusableElement) {
                            firstFocusableElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        });
    }

    setupARIALabels() {
        // Add ARIA labels to interactive elements
        const elements = [
            { selector: '.responsive-btn', label: 'Button' },
            { selector: '.responsive-nav-link', label: 'Navigation link' },
            { selector: '.responsive-input', label: 'Input field' },
            { selector: '.responsive-select', label: 'Select dropdown' },
            { selector: '.theme-toggle', label: 'Toggle dark mode' }
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

    setupColorContrast() {
        // Check color contrast and adjust if needed
        const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
        
        textElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const color = computedStyle.color;
            const backgroundColor = computedStyle.backgroundColor;
            
            // Simple contrast check (this would need a more sophisticated implementation)
            if (color === backgroundColor) {
                element.style.color = 'var(--text-primary)';
            }
        });
    }

    setupMotionPreferences() {
        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Enhanced Error Handling Manager
class ErrorHandlingManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupGlobalErrorHandling();
        this.setupNetworkErrorHandling();
        this.setupFormErrorHandling();
        this.setupImageErrorHandling();
    }

    setupGlobalErrorHandling() {
        window.addEventListener('error', (e) => {
            this.handleError(e.error, 'javascript');
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.handleError(e.reason, 'promise');
        });
    }

    setupNetworkErrorHandling() {
        // Handle network errors
        window.addEventListener('online', () => {
            this.showNotification('Connection restored', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('Connection lost', 'error');
        });
    }

    setupFormErrorHandling() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                try {
                    // Form validation logic here
                } catch (error) {
                    e.preventDefault();
                    this.handleError(error, 'form');
                }
            });
        });
    }

    setupImageErrorHandling() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', () => {
                img.alt = 'Image failed to load';
                img.style.opacity = '0.5';
            });
        });
    }

    handleError(error, type) {
        console.error(`Error (${type}):`, error);
        
        // Show user-friendly error message
        this.showNotification('Something went wrong. Please try again.', 'error');
        
        // Could send error to analytics service
        // analytics.track('error', { type, message: error.message });
    }

    showNotification(message, type) {
        if (window.notificationManager) {
            window.notificationManager[type](message);
        }
    }
}

// Enhanced Analytics Manager
class AnalyticsManager {
    constructor() {
        this.events = [];
        this.init();
    }

    init() {
        this.setupPageTracking();
        this.setupUserInteractionTracking();
        this.setupPerformanceTracking();
        this.setupErrorTracking();
    }

    setupPageTracking() {
        // Track page views
        this.track('page_view', {
            page: window.location.pathname,
            title: document.title,
            timestamp: Date.now()
        });
    }

    setupUserInteractionTracking() {
        // Track clicks
        document.addEventListener('click', (e) => {
            this.track('click', {
                element: e.target.tagName,
                text: e.target.textContent?.slice(0, 50),
                href: e.target.href,
                timestamp: Date.now()
            });
        });

        // Track form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                this.track('form_submit', {
                    form_id: form.id || 'unknown',
                    timestamp: Date.now()
                });
            });
        });
    }

    setupPerformanceTracking() {
        // Track performance metrics
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.track('performance', {
                load_time: loadTime,
                timestamp: Date.now()
            });
        });
    }

    setupErrorTracking() {
        window.addEventListener('error', (e) => {
            this.track('error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                timestamp: Date.now()
            });
        });
    }

    track(event, data) {
        this.events.push({ event, data });
        console.log('Analytics:', event, data);
        
        // Could send to analytics service
        // analytics.track(event, data);
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced managers
    window.loadingStateManager = new LoadingStateManager();
    window.advancedAnimationManager = new AdvancedAnimationManager();
    window.advancedPerformanceManager = new AdvancedPerformanceManager();
    window.advancedAccessibilityManager = new AdvancedAccessibilityManager();
    window.errorHandlingManager = new ErrorHandlingManager();
    window.analyticsManager = new AnalyticsManager();
    
    // Add enhanced CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-stagger {
            animation: fadeInStagger 0.6s ease-out forwards;
        }
        
        .stagger-animation {
            animation: staggerIn 0.6s ease-out forwards;
        }
        
        @keyframes fadeInStagger {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes staggerIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .skip-link:focus {
            top: 6px !important;
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
    
    console.log('Enhanced UX system initialized successfully');
});

} // End of SoULUXEnhancements check
