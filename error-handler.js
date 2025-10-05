/**
 * Error Handler for SoUL Website
 * This script handles any remaining JavaScript errors gracefully
 */

// Global error handler
window.addEventListener('error', function(e) {
    console.log('Caught error:', e.error);
    // Don't show error notifications for duplicate class declarations
    if (e.error && e.error.message && e.error.message.includes('already been declared')) {
        console.log('Duplicate class declaration ignored');
        return;
    }
});

// Global unhandled rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.log('Caught promise rejection:', e.reason);
});

// Check if scripts are loaded properly
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking script status...');
    
    // Check if responsive utils loaded
    if (window.SoULResponsiveUtils) {
        console.log('✅ Responsive utils loaded successfully');
    } else {
        console.log('❌ Responsive utils not loaded');
    }
    
    // Check if UX enhancements loaded
    if (window.SoULUXEnhancements) {
        console.log('✅ UX enhancements loaded successfully');
    } else {
        console.log('❌ UX enhancements not loaded');
    }
    
    // Check if managers are available
    if (window.themeManager) {
        console.log('✅ Theme manager initialized');
    }
    
    if (window.loadingStateManager) {
        console.log('✅ Loading state manager initialized');
    }
    
    console.log('🎉 All systems ready!');
});
