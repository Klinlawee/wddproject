// Main JavaScript - Shared across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the click from bubbling up
            navLinks.classList.toggle('active');
            // Toggle hamburger icon
            this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.textContent = '☰';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinksItems = navLinks.querySelectorAll('a');
        if (navLinksItems.length > 0) {
            navLinksItems.forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    if (hamburger) hamburger.textContent = '☰';
                });
            });
        }
    }

    // Set the current year in the footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for same-page anchors
            if (targetId !== '#' && targetId.startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (hamburger) hamburger.textContent = '☰';
                }
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Newsletter signup for all pages
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.form-control');
            if (emailInput) {
                const email = emailInput.value.trim();
                if (email && this.checkValidity()) {
                    // Show loading state
                    const submitBtn = this.querySelector('button[type="submit"]');
                    if (submitBtn) {
                        const originalText = submitBtn.innerHTML;
                        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
                        submitBtn.disabled = true;
                        
                        // Save to localStorage
                        const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
                        subscribers.push({
                            email: email,
                            date: new Date().toISOString()
                        });
                        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                        
                        // Simulate API call
                        setTimeout(() => {
                            alert(`Thank you for subscribing with: ${email}\nYou'll receive our next newsletter soon!`);
                            this.reset();
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                        }, 1500);
                    }
                }
            }
        });
    });

    // Add loading animation to cards
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        });
    }

    // Enhanced Lazy Loading for ALL images across ALL pages
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Handle both data-src and regular lazy loading
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                        }
                        
                        // Remove loading="lazy" after image loads to prevent double observation
                        img.addEventListener('load', () => {
                            img.removeAttribute('loading');
                        });
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px', // Start loading 50px before image enters viewport
                threshold: 0.1
            });

            lazyImages.forEach(img => {
                // Mark images that are below the fold for lazy loading
                if (isBelowTheFold(img)) {
                    if (!img.dataset.src) {
                        img.dataset.src = img.src;
                        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+';
                        img.classList.add('lazy');
                    }
                    imageObserver.observe(img);
                }
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    }

    // Helper function to check if image is below the fold
    function isBelowTheFold(element) {
        const viewportHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        return elementTop > viewportHeight;
    }

    // Initialize lazy loading
    initLazyLoading();

    // Re-initialize lazy loading after dynamic content loads
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                initLazyLoading();
            }
        });
    });

    // Observe the entire document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('Outdoor Adventure Hub - Main JavaScript loaded successfully');
});