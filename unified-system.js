/**
 * UNIFIED WEBSITE SYSTEM - EVERYTHING IN ONE
 * Golden Cursor + Theme Toggle + Navigation + Golden Arrow
 * No conflicts, guaranteed to work
 */

console.log('🚀 Initializing unified website system...');

// ========================================
// GLOBAL VARIABLES
// ========================================
let cursor = null;
let outerCircle = null;
let innerDot = null;
let goldenArrow = null;
let isInitialized = false;

// ========================================
// GOLDEN CURSOR SYSTEM
// ========================================
function initGoldenCursor() {
    // Check if mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        console.log('📱 Mobile device - cursor disabled');
        return;
    }
    
    // Remove existing cursor
    const existingCursor = document.getElementById('golden-cursor');
    if (existingCursor) {
        existingCursor.remove();
    }
    
    // Create cursor container
    cursor = document.createElement('div');
    cursor.id = 'golden-cursor';
    cursor.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 32px;
        height: 32px;
        pointer-events: none;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Create outer circle
    outerCircle = document.createElement('div');
    outerCircle.style.cssText = `
        position: absolute;
        width: 32px;
        height: 32px;
        border: 1.2px solid #FFD700;
        border-radius: 50%;
        background: transparent;
        box-shadow: 
            0 0 10px rgba(255, 215, 0, 0.5),
            0 0 20px rgba(255, 215, 0, 0.3);
        transition: all 0.1s ease-out;
    `;
    
    // Create inner dot
    innerDot = document.createElement('div');
    innerDot.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background: #FFD700;
        border-radius: 50%;
        box-shadow: 
            0 0 5px rgba(255, 215, 0, 0.8),
            0 0 10px rgba(255, 215, 0, 0.5);
        transition: all 0.1s ease-out;
    `;
    
    cursor.appendChild(outerCircle);
    cursor.appendChild(innerDot);
    document.body.appendChild(cursor);
    
    console.log('✅ Golden cursor created');
    
    // Mouse tracking
    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let innerX = 0, innerY = 0;
    let isMoving = false;
    let movementTimeout = null;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        if (movementTimeout) {
            clearTimeout(movementTimeout);
        }
        
        movementTimeout = setTimeout(() => {
            isMoving = false;
        }, 100);
    });
    
    // Animation loop
    function animateCursor() {
        if (!outerCircle || !innerDot) return;
        
        // Outer circle follows mouse
        outerX += (mouseX - outerX) * 0.08;
        outerY += (mouseY - outerY) * 0.08;
        
        outerCircle.style.left = outerX + 'px';
        outerCircle.style.top = outerY + 'px';
        
        // Inner dot behavior
        if (isMoving) {
            innerX += (mouseX - innerX) * 0.15;
            innerY += (mouseY - innerY) * 0.15;
        } else {
            innerX += (outerX - innerX) * 0.3;
            innerY += (outerY - innerY) * 0.3;
        }
        
        innerDot.style.left = innerX + 'px';
        innerDot.style.top = innerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    document.addEventListener('mouseover', (e) => {
        if (!outerCircle || !innerDot) return;
        
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
            outerCircle.style.transform = 'scale(1.25)';
            outerCircle.style.borderColor = '#FFA500';
            innerDot.style.transform = 'scale(1.1)';
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (!outerCircle || !innerDot) return;
        
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
            outerCircle.style.transform = 'scale(1)';
            outerCircle.style.borderColor = '#FFD700';
            innerDot.style.transform = 'scale(1)';
        }
    });
    
    // Click effects
    document.addEventListener('mousedown', () => {
        if (!outerCircle || !innerDot) return;
        
        outerCircle.style.transform = 'scale(0.85)';
        innerDot.style.transform = 'scale(0.9)';
    });
    
    document.addEventListener('mouseup', () => {
        if (!outerCircle || !innerDot) return;
        
        outerCircle.style.transform = 'scale(1)';
        innerDot.style.transform = 'scale(1)';
    });
    
    // Hide cursor on window leave
    document.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.opacity = '1';
    });
}

// ========================================
// THEME TOGGLE SYSTEM
// ========================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle || !themeIcon) {
        console.error('❌ Theme toggle elements not found');
        return;
    }
    
    console.log('✅ Theme toggle elements found');
    
    // Get current theme
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);
    
    // Update icon
    if (currentTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
    
    // Toggle function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log(`🎨 Switching theme: ${currentTheme} → ${newTheme}`);
        
        document.documentElement.setAttribute('data-theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
        
        // Visual feedback
        themeToggle.style.transform = 'scale(1.2) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    }
    
    // Add click listener
    themeToggle.addEventListener('click', toggleTheme);
    
    console.log('✅ Theme toggle setup complete');
}

// ========================================
// NAVIGATION SYSTEM
// ========================================
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) {
        console.error('❌ Mobile menu elements not found');
        return;
    }
    
    console.log('✅ Mobile menu elements found');
    
    // Mobile Menu Toggle Function
    function toggleMobileMenu() {
        console.log('📱 Toggling mobile menu...');
        
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            // Close menu
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            console.log('📱 Mobile menu closed');
        } else {
            // Open menu
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('📱 Mobile menu opened');
        }
        
        // Update icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (isActive) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }
        
        // Haptic feedback for mobile
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
    
    // Event Listeners for Mobile Menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                toggleMobileMenu();
            }
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle internal links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (mobileMenu.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                    
                    // Haptic feedback
                    if ('vibrate' in navigator) {
                        navigator.vibrate(30);
                    }
                    
                    console.log(`🔗 Scrolled to section: ${targetId}`);
                }
            }
        });
    });
    
    // Mobile menu links
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    if (mobileMenu.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                    
                    console.log(`📱 Mobile scrolled to section: ${targetId}`);
                }
            }
        });
    });
    
    console.log('✅ Navigation setup complete');
}

// ========================================
// GOLDEN ARROW SYSTEM
// ========================================
function initGoldenArrow() {
    // Check if mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        console.log('📱 Mobile device - arrow disabled');
        return;
    }
    
    // Remove existing arrow
    const existingArrow = document.getElementById('golden-arrow');
    if (existingArrow) {
        existingArrow.remove();
    }
    
    // Create arrow
    goldenArrow = document.createElement('div');
    goldenArrow.id = 'golden-arrow';
    goldenArrow.style.cssText = `
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
            0 0 40px rgba(255, 215, 0, 0.4);
        transition: all 0.3s ease;
        opacity: 1;
        transform: scale(1);
        border: 2px solid rgba(255, 215, 0, 0.3);
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
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    `;
    
    goldenArrow.appendChild(arrowIcon);
    document.body.appendChild(goldenArrow);
    
    console.log('✅ Golden arrow created');
    
    // Click to scroll to top
    goldenArrow.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        console.log('🔝 Scrolled to top');
    });
    
    // Hover effects
    goldenArrow.addEventListener('mouseenter', () => {
        goldenArrow.style.transform = 'scale(1.1)';
        goldenArrow.style.boxShadow = `
            0 0 30px rgba(255, 215, 0, 0.8),
            0 0 60px rgba(255, 215, 0, 0.6);
        `;
    });
    
    goldenArrow.addEventListener('mouseleave', () => {
        goldenArrow.style.transform = 'scale(1)';
        goldenArrow.style.boxShadow = `
            0 0 20px rgba(255, 215, 0, 0.6),
            0 0 40px rgba(255, 215, 0, 0.4);
        `;
    });
}

// ========================================
// MAIN INITIALIZATION
// ========================================
function initUnifiedSystem() {
    if (isInitialized) return;
    
    console.log('🚀 Starting unified system initialization...');
    
    // Initialize all systems
    initThemeToggle();
    initGoldenCursor();
    initGoldenArrow();
    initNavigation();
    
    isInitialized = true;
    console.log('🎉 Unified system initialization complete!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUnifiedSystem);
} else {
    initUnifiedSystem();
}

// Also try after a delay
setTimeout(initUnifiedSystem, 100);

console.log('🎯 Unified website system loaded');
