
 // Mobile Menu Toggle
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        const mobileOverlay = document.getElementById('mobile-overlay');
        const mobileClose = document.getElementById('mobile-close');
        const hamburgerIcon = document.getElementById('hamburger-icon');

        function toggleMobileMenu() {
            const isActive = mobileNav.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }

        function openMobileMenu() {
            mobileNav.classList.add('active');
            mobileOverlay.classList.add('active');
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }

        function closeMobileMenu() {
            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            hamburgerIcon.classList.add('fa-bars');
            hamburgerIcon.classList.remove('fa-times');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Close all mobile dropdowns
            document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }

        // Event listeners for mobile menu
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        mobileClose.addEventListener('click', closeMobileMenu);
        mobileOverlay.addEventListener('click', closeMobileMenu);

        // Mobile Dropdown Toggle
        const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
        
        mobileDropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.parentElement;
                const isActive = dropdown.classList.contains('active');
                
                // Close all other dropdowns
                document.querySelectorAll('.mobile-dropdown').forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active', !isActive);
            });
        });

        // Close mobile menu when clicking on dropdown items
        const mobileDropdownItems = document.querySelectorAll('.mobile-dropdown-menu a');
        mobileDropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                setTimeout(() => {
                    closeMobileMenu();
                }, 150);
            });
        });

        // Close mobile menu when clicking on regular nav items
        const mobileNavItems = document.querySelectorAll('.mobile-nav-links > li > a:not(.mobile-dropdown-toggle)');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function() {
                setTimeout(() => {
                    closeMobileMenu();
                }, 150);
            });
        });

        // Prevent default only for the parent dropdown toggle, not submenu links
const desktopDropdownToggle = document.querySelector('.dropdown-toggle');
if (desktopDropdownToggle) {
    desktopDropdownToggle.addEventListener('click', function(e) {
        if (window.innerWidth > 768) {
            e.preventDefault();
            // Optionally toggle a class to show/hide the dropdown if you want click-to-open
            // this.parentElement.classList.toggle('open');
        }
    });
}

        

        // Close mobile menu on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

        // Handle escape key to close mobile menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Smooth scrolling for navigation links
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
