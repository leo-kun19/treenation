// Contact form functionality
document.addEventListener('DOMContentLoaded', () => {
    setupContactForm();
});

function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            subject: form.subject?.value.trim() || '',
            message: form.message.value.trim()
        };

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        try {
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            await ContactAPI.submit(formData);
            
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            form.reset();

            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        } catch (error) {
            console.error('Error submitting contact form:', error);
            showNotification('Failed to send message. Please try again.', 'error');
            
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}
