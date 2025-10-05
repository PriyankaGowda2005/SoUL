/**
 * GUARANTEED WORKING GOLDEN CURSOR
 * Simple, bulletproof implementation
 */

// Create responsive cursor immediately
function createGoldenCursor() {
    console.log('🌟 Creating responsive cursor...');
    
    // Check if device is mobile/tablet
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    
    // Remove any existing cursor
    const existingCursor = document.getElementById('golden-cursor');
    if (existingCursor) {
        existingCursor.remove();
    }
    
    // Don't create cursor on mobile devices
    if (isMobile) {
        console.log('📱 Mobile device detected - cursor disabled');
        return;
    }
    
    // Create cursor container with responsive sizing
    const cursor = document.createElement('div');
    cursor.id = 'golden-cursor';
    
    // Responsive sizing - smaller and more aesthetic
    const cursorSize = isTablet ? 25 : 32;
    const borderWidth = isTablet ? 1 : 1.2;
    
    cursor.style.cssText = `
        position: fixed;
        width: ${cursorSize}px;
        height: ${cursorSize}px;
        pointer-events: none;
        z-index: 99999;
        opacity: 1;
        display: block;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
    `;
    
    // Create outer golden circle
    const outerCircle = document.createElement('div');
    outerCircle.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: ${cursorSize}px;
        height: ${cursorSize}px;
        border: ${borderWidth}px solid #FFD700;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%);
        box-shadow: 
            0 0 6px rgba(255, 215, 0, 0.5),
            0 0 12px rgba(255, 215, 0, 0.3),
            0 0 18px rgba(255, 215, 0, 0.15);
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    // Create inner dot with responsive sizing
    const innerDot = document.createElement('div');
    const dotSize = isTablet ? 3 : 5;
    innerDot.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: ${dotSize}px;
        height: ${dotSize}px;
        background: radial-gradient(circle, #FFD700 0%, #FFA500 100%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 
            0 0 4px rgba(255, 215, 0, 0.7),
            0 0 8px rgba(255, 215, 0, 0.5),
            0 0 12px rgba(255, 215, 0, 0.3);
        transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    cursor.appendChild(outerCircle);
    cursor.appendChild(innerDot);
    document.body.appendChild(cursor);
    
    console.log('✅ Golden cursor created');
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Mouse movement with bounded elements
    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let innerX = 0, innerY = 0;
    let isMoving = false;
    let movementTimeout = null;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        // Clear any existing timeout
        if (movementTimeout) {
            clearTimeout(movementTimeout);
        }
        
        // Set timeout to detect when movement stops
        movementTimeout = setTimeout(() => {
            isMoving = false;
        }, 100); // 100ms after last movement
    });
    
    // Animation loop with bounded movement
    function animateCursor() {
        // Outer circle follows mouse
        outerX += (mouseX - outerX) * 0.08; // Slower following
        outerY += (mouseY - outerY) * 0.08;
        
        outerCircle.style.left = outerX + 'px';
        outerCircle.style.top = outerY + 'px';
        
        // Inner dot behavior
        if (isMoving) {
            // When moving: inner dot follows mouse independently
            innerX += (mouseX - innerX) * 0.15; // Faster following
            innerY += (mouseY - innerY) * 0.15;
        } else {
            // When stopped: inner dot snaps back to center of outer circle
            innerX += (outerX - innerX) * 0.3; // Snap back to center
            innerY += (outerY - innerY) * 0.3;
        }
        
        innerDot.style.left = innerX + 'px';
        innerDot.style.top = innerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start animation
    animateCursor();
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .member-card, .card, .nav-link, .tab-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const hoverScale = isTablet ? 1.15 : 1.25;
            outerCircle.style.transform = `scale(${hoverScale})`;
            outerCircle.style.borderColor = '#FFA500';
            outerCircle.style.boxShadow = `
                0 0 8px rgba(255, 165, 0, 0.6),
                0 0 16px rgba(255, 165, 0, 0.4),
                0 0 24px rgba(255, 165, 0, 0.2),
                0 0 32px rgba(255, 165, 0, 0.1)
            `;
            innerDot.style.transform = `scale(${hoverScale * 0.9})`;
            innerDot.style.boxShadow = `
                0 0 6px rgba(255, 165, 0, 0.8),
                0 0 12px rgba(255, 165, 0, 0.6),
                0 0 18px rgba(255, 165, 0, 0.4)
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            outerCircle.style.transform = 'scale(1)';
            outerCircle.style.borderColor = '#FFD700';
            outerCircle.style.boxShadow = `
                0 0 6px rgba(255, 215, 0, 0.5),
                0 0 12px rgba(255, 215, 0, 0.3),
                0 0 18px rgba(255, 215, 0, 0.15)
            `;
            innerDot.style.transform = 'scale(1)';
            innerDot.style.boxShadow = `
                0 0 4px rgba(255, 215, 0, 0.7),
                0 0 8px rgba(255, 215, 0, 0.5),
                0 0 12px rgba(255, 215, 0, 0.3)
            `;
        });
    });
    
    // Click effects
    document.addEventListener('mousedown', () => {
        outerCircle.style.transform = 'scale(0.85)';
        outerCircle.style.borderColor = '#FF8C00';
        outerCircle.style.boxShadow = `
            0 0 8px rgba(255, 140, 0, 0.7),
            0 0 16px rgba(255, 140, 0, 0.5),
            0 0 24px rgba(255, 140, 0, 0.3)
        `;
        innerDot.style.transform = 'scale(0.9)';
        innerDot.style.boxShadow = `
            0 0 6px rgba(255, 140, 0, 0.9),
            0 0 12px rgba(255, 140, 0, 0.7),
            0 0 18px rgba(255, 140, 0, 0.5)
        `;
    });
    
    document.addEventListener('mouseup', () => {
        outerCircle.style.transform = 'scale(1)';
        outerCircle.style.borderColor = '#FFD700';
        outerCircle.style.boxShadow = `
            0 0 6px rgba(255, 215, 0, 0.5),
            0 0 12px rgba(255, 215, 0, 0.3),
            0 0 18px rgba(255, 215, 0, 0.15)
        `;
        innerDot.style.transform = 'scale(1)';
        innerDot.style.boxShadow = `
            0 0 4px rgba(255, 215, 0, 0.7),
            0 0 8px rgba(255, 215, 0, 0.5),
            0 0 12px rgba(255, 215, 0, 0.3)
        `;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setTimeout(() => {
            createGoldenCursor(); // Recreate cursor with new dimensions
        }, 100);
    });
    
    // Window enter/leave
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    console.log('🎯 Golden cursor system active');
    return cursor;
}

// Initialize immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createGoldenCursor);
} else {
    createGoldenCursor();
}

// Also try after a short delay
setTimeout(createGoldenCursor, 100);
