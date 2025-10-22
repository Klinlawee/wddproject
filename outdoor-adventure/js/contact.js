// Contact-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Save form data to localStorage
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                submittedAt: new Date().toISOString()
            };
            
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(formData);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
            // Show success message
            if (formSuccess) {
                formSuccess.style.display = 'block';
                contactForm.reset();
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth' });
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            } else {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            }
        });
        
        // Clear field errors on input
        contactForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }
});