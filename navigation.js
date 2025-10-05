/**
 * CLEAN NAVIGATION - FINAL VERSION
 * No conflicts, guaranteed to work
 */

console.log('📱 Initializing clean navigation...');

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
    
    console.log('✅ Clean navigation setup complete');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}

// Also try after a delay
setTimeout(initNavigation, 100);

console.log('🎯 Clean navigation script loaded');
