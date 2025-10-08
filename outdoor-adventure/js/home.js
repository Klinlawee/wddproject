// Home page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Search form functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('.form-control').value.trim();
            if (searchTerm) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
                submitBtn.disabled = true;
                
                // Simulate search
                setTimeout(() => {
                    alert(`Searching for: "${searchTerm}"\n\nThis would display search results in a real implementation.`);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        });
    }

    // Event registration
    document.querySelectorAll('.event-item .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventItem = this.closest('.event-item');
            const eventName = eventItem.querySelector('h4').textContent;
            const eventDate = eventItem.querySelector('.event-date').textContent;
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
            this.disabled = true;
            
            // Simulate registration process
            setTimeout(() => {
                alert(`🎉 Successfully registered for:\n"${eventName}"\nDate: ${eventDate}\n\nConfirmation details will be sent to your email.`);
                this.innerHTML = 'Registered!';
                this.style.background = '#28a745';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    this.style.background = '';
                }, 3000);
            }, 1500);
        });
    });

    // Enhanced home section animations
    const homeSections = document.querySelectorAll('.home-section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const homeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);

    homeSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        homeSectionObserver.observe(section);
    });

    // Featured trail hover effect
    const featuredTrail = document.querySelector('.featured-trail');
    if (featuredTrail) {
        featuredTrail.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        featuredTrail.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.home-hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});