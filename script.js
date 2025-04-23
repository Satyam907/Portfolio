document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on menu items
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Mock form submission
            showNotification('Your message has been sent successfully!', 'success');
            this.reset();
        });
    }
    
    // Custom notification function
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Append to body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to menu items on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Check which section is in view
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all menu items
                document.querySelectorAll('.menu a').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to corresponding menu item
                const activeLink = document.querySelector(`.menu a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
    
    // Add a fixed header on scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: -60px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 25px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transition: bottom 0.3s ease;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }
        
        .notification.show {
            bottom: 20px;
        }
        
        .notification.success {
            background-color: #9EC6F3;
        }
        
        .notification.error {
            background-color: #e74c3c;
        }
    `;
    document.head.appendChild(style);

    // Add subtle parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollValue = window.scrollY;
            if (scrollValue < heroSection.offsetHeight) {
                heroSection.style.backgroundPositionY = `${scrollValue * 0.5}px`;
            }
        });
    }

    // Initialize skill icons animations
    initSkillsIconsAnimation();
    
    function initSkillsIconsAnimation() {
        // Since we've removed the visibility: hidden from CSS and no longer 
        // want to use the intersection observer, we'll let CSS animations handle everything
        console.log("Skills animation initialized through CSS");
        
        // No need for observer code here anymore as animations are applied directly in CSS
    }

    // Add reveal animations for sections
    const revealElements = document.querySelectorAll('.projects-grid, .single-project, .contact-content');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Add CSS for reveal animations
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .single-project, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyle);
    
    // Check for reveals on load and scroll
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    
    // Call it once on load to reveal elements that are already in view
    checkReveal();
}); 