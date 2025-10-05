/**
 * ULTRA CLEAN GOLDEN CURSOR - CACHE BUST VERSION
 * No errors, no conflicts, guaranteed to work
 */

console.log('🌟 Initializing ultra clean golden cursor...');

// Global variables
let cursor = null;
let outerCircle = null;
let innerDot = null;
let isInitialized = false;

function initUltraCleanGoldenCursor() {
    if (isInitialized) return;
    
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
    
    console.log('✅ Ultra clean golden cursor created');
    
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
    
    // Simple hover effects
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
    
    isInitialized = true;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUltraCleanGoldenCursor);
} else {
    initUltraCleanGoldenCursor();
}

// Also try after a delay
setTimeout(initUltraCleanGoldenCursor, 100);

console.log('🎯 Ultra clean golden cursor script loaded');
