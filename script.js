document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Mobile dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only handle clicks in mobile view
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                
                // If this is a top-level dropdown
                if (parent.classList.contains('dropdown')) {
                    parent.classList.toggle('active');
                }
                // If this is a nested dropdown
                else if (parent.classList.contains('dropdown-deep')) {
                    parent.classList.toggle('active');
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-nav-toggle')) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset mobile menu state when returning to desktop
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            // Reset all dropdowns
            document.querySelectorAll('.dropdown, .dropdown-deep').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Smooth scrolling for anchor links with better mobile handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
                
                // Calculate header height for proper offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Add an extra offset for mobile devices
                const extraOffset = window.innerWidth <= 768 ? 20 : 0;
                
                window.scrollTo({
                    top: target.offsetTop - headerHeight - extraOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillsSection = document.querySelector('.skills');
    
    if (skillBars.length && skillsSection) {
        const animateSkills = function() {
            const sectionTop = skillsSection.getBoundingClientRect().top;
            const sectionBottom = skillsSection.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Check if skills section is in viewport (with more generous threshold)
            if (sectionTop < windowHeight * 0.9 && sectionBottom > 0) {
                // Add animated class to each skill bar with slight delay
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.classList.add('animated');
                    }, 200 * index); // Longer delay between animations
                });
            } else {
                // Remove animated class when out of viewport
                skillBars.forEach(bar => {
                    bar.classList.remove('animated');
                });
            }
        };
        
        // Call on scroll with throttling to improve performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(animateSkills, 100);
        });
        
        // Check immediately and after a slight delay (for images to load)
        animateSkills();
        setTimeout(animateSkills, 1000);
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // You can add an AJAX call here to submit the form
                alert('Thank you for subscribing with: ' + email);
                this.reset();
            }
        });
    }
});
