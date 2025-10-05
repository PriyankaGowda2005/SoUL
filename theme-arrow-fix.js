/**
 * UNIFIED THEME SYSTEM & GOLDEN ARROW
 * Fixes theme toggle conflicts and ensures golden arrow visibility
 */

// ========================================
// UNIFIED THEME MANAGEMENT
// ========================================

class UnifiedThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        // Apply theme immediately
        this.applyTheme(this.currentTheme);
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Listen for theme changes from other sources
        document.addEventListener('themeChanged', (e) => {
            this.currentTheme = e.detail.theme;
            this.updateThemeIcon();
        });
    }

    applyTheme(theme) {
        const html = document.documentElement;
        const body = document.body;
        
        // Apply to both html and body for compatibility
        html.setAttribute('data-theme', theme);
        body.setAttribute('data-theme', theme);
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        this.currentTheme = theme;
        this.updateThemeIcon();
        
        console.log(`🎨 Theme applied: ${theme}`);
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('theme-toggle') || document.getElementById('themeToggle');
        const themeIcon = document.getElementById('theme-icon');
        
        if (themeToggle) {
            if (this.currentTheme === 'dark') {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                if (themeIcon) themeIcon.className = 'fas fa-sun';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                if (themeIcon) themeIcon.className = 'fas fa-moon';
            }
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        
        // Haptic feedback for mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Visual feedback
        const themeToggle = document.getElementById('theme-toggle') || document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.style.transform = 'scale(1.2) rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        }
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: newTheme } 
        }));
    }

    setupEventListeners() {
        // Multiple selectors for compatibility
        const themeToggle = document.getElementById('theme-toggle') || document.getElementById('themeToggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
}

// ========================================
// ENHANCED GOLDEN ARROW
// ========================================

class GoldenArrow {
    constructor() {
        this.arrow = null;
        this.isVisible = false;
        this.scrollTimeout = null;
        this.init();
    }

    init() {
        this.createArrow();
        this.setupEventListeners();
        this.checkVisibility();
    }

    createArrow() {
        console.log('🏹 Creating enhanced golden arrow...');
        
        // Check if device is mobile
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            console.log('📱 Mobile device detected - golden arrow disabled');
            return;
        }
        
        // Remove existing arrow
        const existingArrow = document.getElementById('golden-arrow');
        if (existingArrow) {
            existingArrow.remove();
        }
        
        // Create arrow container
        this.arrow = document.createElement('div');
        this.arrow.id = 'golden-arrow';
        this.arrow.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: radial-gradient(circle, #FFD700 0%, #FFA500 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 
                0 0 20px rgba(255, 215, 0, 0.6),
                0 0 40px rgba(255, 215, 0, 0.4),
                0 0 60px rgba(255, 215, 0, 0.2);
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            opacity: 0;
            transform: translateY(20px) scale(0.8);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 215, 0, 0.3);
            overflow: hidden;
        `;
        
        // Create arrow icon
        const arrowIcon = document.createElement('div');
        arrowIcon.style.cssText = `
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 12px solid white;
            transform: translateY(-2px);
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        `;
        
        this.arrow.appendChild(arrowIcon);
        document.body.appendChild(this.arrow);
        
        // Add CSS animations
        this.addStyles();
        
        console.log('✅ Golden arrow created successfully');
    }

    addStyles() {
        if (document.getElementById('golden-arrow-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'golden-arrow-styles';
        style.textContent = `
            @keyframes goldenArrowPulse {
                0%, 100% {
                    box-shadow: 
                        0 0 20px rgba(255, 215, 0, 0.6),
                        0 0 40px rgba(255, 215, 0, 0.4),
                        0 0 60px rgba(255, 215, 0, 0.2);
                }
                50% {
                    box-shadow: 
                        0 0 30px rgba(255, 215, 0, 0.8),
                        0 0 60px rgba(255, 215, 0, 0.6),
                        0 0 90px rgba(255, 215, 0, 0.4);
                }
            }
            
            @keyframes goldenArrowClick {
                0% {
                    transform: translateY(-5px) scale(1.1);
                }
                50% {
                    transform: translateY(-8px) scale(1.2);
                }
                100% {
                    transform: translateY(-5px) scale(1.1);
                }
            }
            
            /* Dark theme adjustments */
            [data-theme="dark"] #golden-arrow {
                background: radial-gradient(circle, #FFD700 0%, #FF8C00 100%);
                border-color: rgba(255, 215, 0, 0.4);
                box-shadow: 
                    0 0 25px rgba(255, 215, 0, 0.7),
                    0 0 50px rgba(255, 215, 0, 0.5),
                    0 0 75px rgba(255, 215, 0, 0.3);
            }
            
            [data-theme="dark"] #golden-arrow:hover {
                box-shadow: 
                    0 0 35px rgba(255, 215, 0, 0.9),
                    0 0 70px rgba(255, 215, 0, 0.7),
                    0 0 105px rgba(255, 215, 0, 0.5);
            }
            
            /* Light theme adjustments */
            [data-theme="light"] #golden-arrow {
                background: radial-gradient(circle, #FFD700 0%, #FFA500 100%);
                border-color: rgba(255, 215, 0, 0.5);
                box-shadow: 
                    0 0 20px rgba(255, 215, 0, 0.6),
                    0 0 40px rgba(255, 215, 0, 0.4),
                    0 0 60px rgba(255, 215, 0, 0.2),
                    0 0 0 2px rgba(255, 255, 255, 0.8);
            }
            
            [data-theme="light"] #golden-arrow:hover {
                box-shadow: 
                    0 0 30px rgba(255, 215, 0, 0.8),
                    0 0 60px rgba(255, 215, 0, 0.6),
                    0 0 90px rgba(255, 215, 0, 0.4),
                    0 0 0 2px rgba(255, 255, 255, 0.9);
            }
            
            /* Responsive adjustments */
            @media (max-width: 1024px) {
                #golden-arrow {
                    width: 50px;
                    height: 50px;
                    bottom: 25px;
                    right: 25px;
                }
                
                #golden-arrow div {
                    border-left-width: 6px;
                    border-right-width: 6px;
                    border-bottom-width: 10px;
                }
            }
            
            @media (max-width: 768px) {
                #golden-arrow {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        if (!this.arrow) return;
        
        // Scroll event listener
        window.addEventListener('scroll', () => {
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                this.checkVisibility();
            }, 10);
        });
        
        // Hover effects
        this.arrow.addEventListener('mouseenter', () => {
            this.arrow.style.transform = 'translateY(-5px) scale(1.1)';
            this.arrow.style.boxShadow = `
                0 0 30px rgba(255, 215, 0, 0.8),
                0 0 60px rgba(255, 215, 0, 0.6),
                0 0 90px rgba(255, 215, 0, 0.4);
            `;
        });
        
        this.arrow.addEventListener('mouseleave', () => {
            this.arrow.style.transform = 'translateY(0) scale(1)';
            this.arrow.style.boxShadow = `
                0 0 20px rgba(255, 215, 0, 0.6),
                0 0 40px rgba(255, 215, 0, 0.4),
                0 0 60px rgba(255, 215, 0, 0.2);
            `;
        });
        
        // Click effect
        this.arrow.addEventListener('mousedown', () => {
            this.arrow.style.transform = 'translateY(-2px) scale(0.95)';
        });
        
        this.arrow.addEventListener('mouseup', () => {
            this.arrow.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        // Click to scroll to top
        this.arrow.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
            
            // Click animation
            this.arrow.style.animation = 'goldenArrowClick 0.6s ease-out';
            setTimeout(() => {
                this.arrow.style.animation = '';
            }, 600);
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Home' && e.ctrlKey) {
                e.preventDefault();
                this.arrow.click();
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            setTimeout(() => {
                this.init(); // Recreate arrow with new dimensions
            }, 100);
        });
    }

    checkVisibility() {
        if (!this.arrow) return;
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (scrollY > 300) {
            if (!this.isVisible) {
                this.arrow.style.opacity = '1';
                this.arrow.style.transform = 'translateY(0) scale(1)';
                this.isVisible = true;
                
                // Add pulse animation when near bottom
                if (scrollY > windowHeight) {
                    this.arrow.style.animation = 'goldenArrowPulse 2s ease-in-out infinite';
                }
            }
        } else {
            if (this.isVisible) {
                this.arrow.style.opacity = '0';
                this.arrow.style.transform = 'translateY(20px) scale(0.8)';
                this.arrow.style.animation = 'none';
                this.isVisible = false;
            }
        }
    }
}

// ========================================
// INITIALIZATION
// ========================================

// Initialize theme manager
const themeManager = new UnifiedThemeManager();

// Initialize golden arrow
const goldenArrow = new GoldenArrow();

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UnifiedThemeManager, GoldenArrow };
}
