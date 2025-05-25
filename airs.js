
// Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu functionality
        const mobileToggle = document.getElementById('mobileToggle');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        const menuIcon = document.getElementById('menuIcon');
        
        mobileToggle.addEventListener('click', function() {
            mobileNavOverlay.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Toggle icon between menu and close
            if (mobileNavOverlay.classList.contains('active')) {
                menuIcon.className = 'fas fa-times';
            } else {
                menuIcon.className = 'fas fa-bars';
            }
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNavOverlay.classList.remove('active');
                mobileToggle.classList.remove('active');
                menuIcon.className = 'fas fa-bars';
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close mobile menu when clicking outside
        mobileNavOverlay.addEventListener('click', function(e) {
            if (e.target === mobileNavOverlay) {
                mobileNavOverlay.classList.remove('active');
                mobileToggle.classList.remove('active');
                menuIcon.className = 'fas fa-bars';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Smooth scroll for internal links (if any)
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
        
        // Add active state to current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.style.color = 'var(--primary-color)';
                link.style.textShadow = '0 0 10px rgba(0, 247, 255, 0.5)';
            }
        });
        
        // Add loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
        //🥳🥳

// About Section Animations
function initAboutSection() {
    // Hexagon grid interaction
    const hexagons = document.querySelectorAll('.hexagon');
    const techLabel = document.querySelector('.tech-label');
    
    hexagons.forEach(hex => {
        hex.addEventListener('mouseenter', function() {
            // Remove active class from all hexagons
            hexagons.forEach(h => h.classList.remove('active'));
            
            // Add active class to current hexagon
            this.classList.add('active');
            
            // Update tech label
            const tech = this.getAttribute('data-tech');
            if (tech) {
                techLabel.textContent = tech === 'AI' ? 'Neural AI Systems' : 
                                      tech === 'Quantum' ? 'Quantum Encryption' : 
                                      'Blockchain Security';
                techLabel.style.opacity = '1';
                techLabel.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Animate tech items on scroll
    const techItems = document.querySelectorAll('.tech-item');
    
    function animateTechItems() {
        techItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
    
    // Set initial state
    techItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateTechItems);
    animateTechItems(); // Run once on load
}

// Services Section Animations
function initServicesSection() {
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Set initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
}

// Initialize all sections
document.addEventListener('DOMContentLoaded', function() {
    initAboutSection();
    initServicesSection();
});
