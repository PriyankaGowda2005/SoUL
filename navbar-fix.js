/**
 * NAVIGATION BAR FIX
 * Comprehensive fix for navbar functionality
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Initializing navigation bar...');
    
    // Navigation elements
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Check if elements exist
    if (!mobileMenuBtn || !mobileMenu) {
        console.error('❌ Mobile menu elements not found');
        return;
    }
    
    console.log('✅ Mobile menu elements found');
    
    // Mobile Menu Toggle Function
    function toggleMobileMenu() {
        console.log('📱 Toggling mobile menu...');
        
        if (!mobileMenu || !mobileMenuBtn) return;
        
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
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Touch support
        mobileMenuBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                toggleMobileMenu();
            }
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Smooth Scrolling for Navigation Links
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
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
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
    
    // Navbar Scroll Effect
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        if (!navbar) return;
        
        const scrollY = window.scrollY;
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        
        // Background change on scroll
        if (scrollY > 50) {
            navbar.style.background = currentTheme === 'dark' 
                ? 'rgba(15, 23, 42, 0.98)' 
                : 'rgba(253, 253, 255, 0.98)';
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = currentTheme === 'dark' 
                ? 'rgba(15, 23, 42, 0.95)' 
                : 'rgba(253, 253, 255, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        // Hide/show navbar on scroll (mobile only)
        if (window.innerWidth <= 768) {
            if (scrollY > lastScrollY && scrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    // Scroll event listener
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Theme change listener for navbar
    document.addEventListener('themeChanged', function(e) {
        if (navbar) {
            const theme = e.detail.theme;
            const scrollY = window.scrollY;
            
            if (scrollY > 50) {
                navbar.style.background = theme === 'dark' 
                    ? 'rgba(15, 23, 42, 0.98)' 
                    : 'rgba(253, 253, 255, 0.98)';
            } else {
                navbar.style.background = theme === 'dark' 
                    ? 'rgba(15, 23, 42, 0.95)' 
                    : 'rgba(253, 253, 255, 0.95)';
            }
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 1024 && mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Active link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    console.log('✅ Navigation bar initialized successfully');
});

// Fallback initialization for pages that load too quickly
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // Re-run the initialization
    setTimeout(() => {
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);
    }, 100);
}
