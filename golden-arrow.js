/**
 * GOLDEN ARROW FEATURE
 * Beautiful golden arrow with smooth animations
 */

// Create golden arrow immediately
function createGoldenArrow() {
    console.log('🏹 Creating golden arrow...');
    
    // Check if device is mobile/tablet
    const isMobile = window.innerWidth <= 768;
    
    // Don't create arrow on mobile devices
    if (isMobile) {
        console.log('📱 Mobile device detected - golden arrow disabled');
        return;
    }
    
    // Remove any existing arrow
    const existingArrow = document.getElementById('golden-arrow');
    if (existingArrow) {
        existingArrow.remove();
    }
    
    // Create arrow container
    const arrow = document.createElement('div');
    arrow.id = 'golden-arrow';
    arrow.style.cssText = `
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
        z-index: 1000;
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
    
    arrow.appendChild(arrowIcon);
    document.body.appendChild(arrow);
    
    console.log('✅ Golden arrow created');
    
    // Arrow visibility logic
    let isVisible = false;
    let scrollTimeout = null;
    
    function toggleArrow() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (scrollY > 300) {
            if (!isVisible) {
                arrow.style.opacity = '1';
                arrow.style.transform = 'translateY(0) scale(1)';
                isVisible = true;
                
                // Add pulse animation when near bottom
                if (scrollY > windowHeight) {
                    arrow.style.animation = 'goldenArrowPulse 2s ease-in-out infinite';
                }
            }
        } else {
            if (isVisible) {
                arrow.style.opacity = '0';
                arrow.style.transform = 'translateY(20px) scale(0.8)';
                arrow.style.animation = 'none';
                isVisible = false;
            }
        }
    }
    
    // Scroll event listener
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(toggleArrow, 10);
    });
    
    // Hover effects
    arrow.addEventListener('mouseenter', () => {
        arrow.style.transform = 'translateY(-5px) scale(1.1)';
        arrow.style.boxShadow = `
            0 0 30px rgba(255, 215, 0, 0.8),
            0 0 60px rgba(255, 215, 0, 0.6),
            0 0 90px rgba(255, 215, 0, 0.4);
        `;
        arrowIcon.style.transform = 'translateY(-4px) scale(1.1)';
    });
    
    arrow.addEventListener('mouseleave', () => {
        arrow.style.transform = 'translateY(0) scale(1)';
        arrow.style.boxShadow = `
            0 0 20px rgba(255, 215, 0, 0.6),
            0 0 40px rgba(255, 215, 0, 0.4),
            0 0 60px rgba(255, 215, 0, 0.2);
        `;
        arrowIcon.style.transform = 'translateY(-2px) scale(1)';
    });
    
    // Click effect
    arrow.addEventListener('mousedown', () => {
        arrow.style.transform = 'translateY(-2px) scale(0.95)';
        arrowIcon.style.transform = 'translateY(-1px) scale(0.9)';
    });
    
    arrow.addEventListener('mouseup', () => {
        arrow.style.transform = 'translateY(-5px) scale(1.1)';
        arrowIcon.style.transform = 'translateY(-4px) scale(1.1)';
    });
    
    // Click to scroll to top
    arrow.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add haptic feedback for mobile
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
        
        // Add click animation
        arrow.style.animation = 'goldenArrowClick 0.6s ease-out';
        setTimeout(() => {
            arrow.style.animation = '';
        }, 600);
    });
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Home' && e.ctrlKey) {
            e.preventDefault();
            arrow.click();
        }
    });
    
    // Touch support for mobile
    let touchStartY = 0;
    arrow.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });
    
    arrow.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > 10) {
            arrow.click();
        }
    });
    
    console.log('🎯 Golden arrow system active');
    return arrow;
}

// Add CSS animations
function addGoldenArrowStyles() {
    const style = document.createElement('style');
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

// Initialize golden arrow
function initGoldenArrow() {
    addGoldenArrowStyles();
    createGoldenArrow();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setTimeout(() => {
            createGoldenArrow();
        }, 100);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGoldenArrow);
} else {
    initGoldenArrow();
}

// Also try after a short delay
setTimeout(initGoldenArrow, 100);

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initGoldenArrow, createGoldenArrow };
}
