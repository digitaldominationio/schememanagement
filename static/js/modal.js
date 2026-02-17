// ============================================
// MODAL SYSTEM - Perfect Centering
// ============================================

/**
 * Opens a modal by ID
 * @param {string} modalId - The ID of the modal to open
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error(`Modal with ID "${modalId}" not found`);
        return;
    }
    
    // Add active class to show modal
    modal.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus trap - focus first focusable element
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

/**
 * Closes a modal by ID
 * @param {string} modalId - The ID of the modal to close
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error(`Modal with ID "${modalId}" not found`);
        return;
    }
    
    // Remove active class to hide modal
    modal.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

/**
 * Close modal when clicking outside the modal content
 */
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal') && event.target.classList.contains('active')) {
        const modalId = event.target.id;
        if (modalId) {
            closeModal(modalId);
        }
    }
});

/**
 * Close modal on Escape key
 */
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(modal => {
            if (modal.id) {
                closeModal(modal.id);
            }
        });
    }
});
