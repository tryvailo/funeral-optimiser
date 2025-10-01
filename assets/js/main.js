/**
 * CLEARFUNERALCOSTS - MAIN JAVASCRIPT
 * Consolidated functionality for all pages
 */

// ============================================
// CALCULATOR FUNCTIONALITY
// ============================================

// South East specific cost data based on official CMA data patterns
const southEastCostData = {
    'BN': { traditional: [3200, 4800], direct: [1200, 1800], hybrid: [2400, 3600], burial: [4500, 6500], providers: 23 },
    'GU': { traditional: [3800, 5200], direct: [1400, 2000], hybrid: [2800, 3800], burial: [5200, 7000], providers: 18 },
    'RG': { traditional: [3400, 4600], direct: [1300, 1900], hybrid: [2600, 3400], burial: [4800, 6200], providers: 21 },
    'SO': { traditional: [3000, 4200], direct: [1200, 1700], hybrid: [2300, 3200], burial: [4200, 5800], providers: 19 },
    'PO': { traditional: [2900, 4100], direct: [1100, 1600], hybrid: [2200, 3100], burial: [4000, 5600], providers: 16 },
    'TN': { traditional: [3100, 4300], direct: [1200, 1700], hybrid: [2400, 3300], burial: [4300, 5900], providers: 17 },
    'ME': { traditional: [2800, 3900], direct: [1100, 1600], hybrid: [2100, 3000], burial: [3900, 5400], providers: 15 },
    'CT': { traditional: [2700, 3800], direct: [1000, 1500], hybrid: [2000, 2900], burial: [3700, 5200], providers: 14 },
    'default': { traditional: [3200, 4400], direct: [1200, 1800], hybrid: [2400, 3300], burial: [4300, 5900], providers: 20 }
};

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCalculator();
    initializeFAQ();
    initializeSmoothScrolling();
    initializeAnalytics();
});

/**
 * Initialize calculator functionality
 */
function initializeCalculator() {
    const postcodeInput = document.getElementById('postcode');
    const serviceTypeSelect = document.getElementById('serviceType');
    const emailInput = document.getElementById('email');
    const estimateRange = document.getElementById('estimateRange');
    const estimateDescription = document.getElementById('estimateDescription');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('analysisForm');
    const messageBox = document.getElementById('message-box');
    const emailFormContainer = document.getElementById('email-form-container');

    // Check if calculator elements exist (not all pages have them)
    if (!postcodeInput || !serviceTypeSelect) {
        return;
    }

    // Event listeners
    postcodeInput.addEventListener('input', updateEstimate);
    serviceTypeSelect.addEventListener('change', updateEstimate);
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            checkSubmitButton();
            hideMessage();
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }

    /**
     * Update estimate preview based on postcode and service type
     */
    function updateEstimate() {
        hideMessage();
        const postcode = postcodeInput.value.trim().toUpperCase();
        const serviceType = serviceTypeSelect.value;
        
        // Check if both fields are filled
        if (postcode.length >= 2 && serviceType) {
            const area = postcode.substring(0, 2);
            const data = southEastCostData[area] || southEastCostData['default'];
            
            let range, description;
            
            switch(serviceType) {
                case 'traditional':
                    range = `£${data.traditional[0].toLocaleString()} - £${data.traditional[1].toLocaleString()}*`;
                    description = `Traditional funeral service information from ${data.providers} South East funeral directors within 20 miles`;
                    break;
                case 'direct':
                    range = `£${data.direct[0].toLocaleString()} - £${data.direct[1].toLocaleString()}*`;
                    description = `Direct cremation cost information from ${data.providers} South East providers available nearby`;
                    break;
                case 'hybrid':
                    range = `£${data.hybrid[0].toLocaleString()} - £${data.hybrid[1].toLocaleString()}*`;
                    description = `Simple service plus cremation information from ${data.providers} local South East providers`;
                    break;
                case 'burial':
                    range = `£${data.burial[0].toLocaleString()} - £${data.burial[1].toLocaleString()}*`;
                    description = `Burial service cost information (including cemetery fees) from ${data.providers} South East funeral directors`;
                    break;
                case 'unsure':
                    range = `£${data.direct[0].toLocaleString()} - £${data.traditional[1].toLocaleString()}*`;
                    description = `Full range of South East service options information from ${data.providers} providers in your area`;
                    break;
            }
            
            if (estimateRange) estimateRange.textContent = range;
            if (estimateDescription) estimateDescription.textContent = description;
            if (emailFormContainer) emailFormContainer.classList.add('visible');
            
            checkSubmitButton();
        } else {
            if (emailFormContainer) emailFormContainer.classList.remove('visible');
            if (submitBtn) submitBtn.disabled = true;
        }
    }

    /**
     * Check if submit button should be enabled
     */
    function checkSubmitButton() {
        if (!submitBtn) return;
        
        const postcode = postcodeInput.value.trim();
        const serviceType = serviceTypeSelect.value;
        const email = emailInput ? emailInput.value.trim() : '';
        
        const postcodeValid = postcode.length >= 6;
        const emailValid = email.includes('@') && email.includes('.');
        
        submitBtn.disabled = !(postcodeValid && serviceType && emailValid);
    }

    /**
     * Handle form submission
     */
    function handleFormSubmission(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const postcode = postcodeInput.value.trim();
        const serviceType = serviceTypeSelect.value;
        
        // Validate inputs
        const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i;
        if (!postcode || !postcodeRegex.test(postcode)) {
            showMessage('error', 'Please enter a valid UK postcode (e.g., BN1 4GH).');
            return;
        }

        if (!serviceType) {
            showMessage('error', 'Please select a service type.');
            return;
        }

        if (!email || !email.includes('@')) { 
            showMessage('error', 'Please enter a valid email address.'); 
            return; 
        }
        
        // Update button state
        submitBtn.disabled = true; 
        submitBtn.textContent = 'Preparing your analysis...';
        hideMessage();
        
        // Simulate submission (replace with actual API call)
        setTimeout(() => {
            showMessage('success', 'Thank you! Your South East England funeral cost analysis has been prepared and will arrive in your inbox in the next few minutes. Please remember to verify all information with providers.');
            submitBtn.disabled = false; 
            submitBtn.textContent = 'Calculate My Potential Savings (FREE)';
        }, 2000);
    }
}

/**
 * Show message box
 */
function showMessage(type, message) {
    const messageBox = document.getElementById('message-box');
    if (!messageBox) return;
    
    messageBox.textContent = message;
    messageBox.className = `message-box ${type}`;
    messageBox.style.display = 'block';
}

/**
 * Hide message box
 */
function hideMessage() {
    const messageBox = document.getElementById('message-box');
    if (!messageBox) return;
    
    messageBox.style.display = 'none';
}

// ============================================
// FAQ ACCORDION FUNCTIONALITY
// ============================================

/**
 * Initialize FAQ accordion
 */
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
        return;
    }
    
    faqQuestions.forEach(button => {
        button.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQs
            faqQuestions.forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current FAQ
            this.setAttribute('aria-expanded', !expanded);
        });
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// ANALYTICS TRACKING
// ============================================

/**
 * Initialize analytics tracking
 */
function initializeAnalytics() {
    // Track CTA clicks
    document.querySelectorAll('.cta-button, .cta-primary, .cta-secondary, .plan-button').forEach(button => {
        button.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'cta',
                    'event_label': this.textContent.trim()
                });
            }
        });
    });
    
    // Track form interactions
    const form = document.getElementById('analysisForm');
    if (form) {
        form.addEventListener('submit', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'engagement',
                    'event_label': 'free_analysis_form'
                });
            }
        });
    }
    
    // Track FAQ interactions
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'faq_click', {
                    'event_category': 'engagement',
                    'event_label': this.textContent.trim()
                });
            }
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format currency for display
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Validate UK postcode
 */
function isValidPostcode(postcode) {
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i;
    return postcodeRegex.test(postcode.trim());
}

/**
 * Validate email address
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

// ============================================
// EXPORT FOR TESTING (if needed)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatCurrency,
        isValidPostcode,
        isValidEmail
    };
}