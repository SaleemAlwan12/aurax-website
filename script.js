// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 10);
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initModal();
    initContactForm();
    initSatelliteInteraction();
    initParallaxEffects();
    initImageExpansion();
    initLanguageSwitcher();
    initMobileOptimizations();

    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('ended', function() {
            heroVideo.play();
        });
        setInterval(() => {
            if (heroVideo.paused) heroVideo.play();
        }, 2000);
    }
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .stat, .tech-item, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.satellite-animation, .stars');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('satellite-animation') ? 0.5 : 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.querySelector('.close');

    // Close modal when clicking on close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
}

// Satellite interaction
function initSatelliteInteraction() {
    const satellite3d = document.getElementById('satellite-3d');
    
    if (satellite3d) {
        let isMouseDown = false;
        let startX, startY;
        let rotationX = 0;
        let rotationY = 0;
        
        satellite3d.addEventListener('mousedown', function(e) {
            isMouseDown = true;
            startX = e.clientX;
            startY = e.clientY;
            this.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isMouseDown) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            rotationY += deltaX * 0.5;
            rotationX -= deltaY * 0.5;
            
            const satelliteModel = satellite3d.querySelector('.satellite-model');
            satelliteModel.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
            
            startX = e.clientX;
            startY = e.clientY;
        });
        
        document.addEventListener('mouseup', function() {
            isMouseDown = false;
            if (satellite3d) {
                satellite3d.style.cursor = 'grab';
            }
        });
        
        // Add hover effect
        satellite3d.addEventListener('mouseenter', function() {
            this.style.cursor = 'grab';
        });
    }
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Apply parallax to background elements
        const parallaxElements = document.querySelectorAll('.hero-background');
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Project details modal
function openProjectDetails(projectType) {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    
    let content = '';
    
    switch(projectType) {
        case 'satellite':
            content = `
                <div class="project-details">
                    <h2>Advanced Satellite Technology</h2>
                    <div class="project-details-content">
                        <div class="project-details-visual" style="display: flex; align-items: center; justify-content: center;">
                            <img src="auraxsat.png" alt="Satellite" style="max-width: 300px; max-height: 300px; border: 3px solid #00b3e6; border-radius: 15px; box-shadow: 0 0 20px rgba(0, 179, 230, 0.5);" />
                        </div>
                        <div class="project-details-info">
                            <h3>Satellite Overview</h3>
                            <p>Advanced AI-powered satellite systems with cutting-edge technology for space exploration and data collection.</p>
                            <ul>
                                <li><strong>AI Navigation:</strong> Intelligent autonomous navigation systems</li>
                                <li><strong>Real-time Processing:</strong> Advanced data processing capabilities</li>
                                <li><strong>Advanced Sensors:</strong> High-precision sensor arrays</li>
                                <li><strong>Communication:</strong> Multi-frequency communication systems</li>
                                <li><strong>Propulsion:</strong> Ion propulsion technology</li>
                                <li><strong>Solar Power:</strong> High-efficiency solar panels</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            break;
    
       
        case 'rocket':
            content = `
                <div class="project-details">
                    <h2>Space Rocket Launch</h2>
                    <div class="project-details-content">
                        <div class="project-details-visual" style="display: flex; align-items: center; justify-content: center;">
                            <img src="auraxsat2.png" alt="Rocket" style="max-width: 300px; max-height: 300px; border: 3px solid #00b3e6; border-radius: 15px; box-shadow: 0 0 20px rgba(0, 179, 230, 0.5);" />
                        </div>
                        <div class="project-details-info">
                            <h3>Mission Overview</h3>
                            <p>This rocket is designed for a groundbreaking mission to deploy advanced technology and scientific instruments into space, enabling new discoveries and supporting future exploration.</p>
                            <ul>
                                <li><strong>High Thrust:</strong> Powerful engines for rapid ascent and heavy payloads.</li>
                                <li><strong>Precision Guidance:</strong> Advanced navigation systems for accurate orbital insertion.</li>
                                <li><strong>Scientific Payload:</strong> Instruments for research, observation, and communication.</li>
                                <li><strong>Launch Date:</strong> 2024</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'control':
            content = `
                <div class="project-details">
                    <h2>Control Center & Mission Control</h2>
                    <div class="project-details-content">
                        <div class="project-details-visual" style="display: flex; align-items: center; justify-content: center;">
                            <img src="auraxsat3.png" alt="Control Center" style="max-width: 300px; max-height: 300px; border: 3px solid #00b3e6; border-radius: 15px; box-shadow: 0 0 20px rgba(0, 179, 230, 0.5);" />
                        </div>
                        <div class="project-details-info">
                            <h3>Control Center Overview</h3>
                            <p>State-of-the-art mission control centers equipped with advanced monitoring and control systems for managing rocket launches and satellite operations.</p>
                            <ul>
                                <li><strong>Real-time Monitoring:</strong> Advanced display systems and monitoring equipment</li>
                                <li><strong>Precision Control:</strong> Sophisticated control interfaces and systems</li>
                                <li><strong>Data Analytics:</strong> Comprehensive data analysis and visualization tools</li>
                                <li><strong>Mission Planning:</strong> Advanced mission planning and execution systems</li>
                                <li><strong>Communication:</strong> Multi-channel communication networks</li>
                                <li><strong>Safety Systems:</strong> Redundant safety and emergency protocols</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
    
    // Initialize component interactions for satellite
    if (projectType === 'satellite') {
        initComponentInteractions();
    }
}

// Component interactions for satellite
function initComponentInteractions() {
    const components = document.querySelectorAll('.satellite-component');
    const infoSections = document.querySelectorAll('.component-info');
    
    components.forEach(component => {
        component.addEventListener('click', function() {
            const componentType = this.getAttribute('data-component');
            
            // Hide all info sections
            infoSections.forEach(info => {
                info.style.display = 'none';
            });
            
            // Show selected component info
            const targetInfo = document.getElementById(`${componentType}-info`);
            if (targetInfo) {
                targetInfo.style.display = 'block';
            }
            
            // Add active class to clicked component
            components.forEach(comp => comp.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#00d4ff' : '#ff6b35'};
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for additional styles
const additionalStyles = `
    .project-details {
        color: var(--text-primary);
    }
    
    .project-details h2 {
        font-size: 2.5rem;
        margin-bottom: 2rem;
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .project-details-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        margin-top: 2rem;
    }
    
    .interactive-satellite {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        padding: 2rem;
        border-radius: 20px;
        background: var(--bg-glass);
    }
    
    .satellite-component {
        text-align: center;
        padding: 1rem;
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid var(--border-glass);
    }
    
    .satellite-component:hover,
    .satellite-component.active {
        background: var(--bg-glass);
        border-color: var(--primary-color);
        transform: translateY(-5px);
    }
    
    .component-visual {
        width: 60px;
        height: 60px;
        margin: 0 auto 1rem;
        border-radius: 10px;
        position: relative;
    }
    
    .component-visual.core {
        background: var(--gradient-primary);
    }
    
    .component-visual.solar {
        background: var(--gradient-secondary);
    }
    
    .component-visual.antenna {
        background: linear-gradient(45deg, #ff6b35, #f7931e);
    }
    
    .component-visual.thruster {
        background: linear-gradient(45deg, #ff6b35, #ff8c42);
    }
    
    .component-info h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--primary-color);
    }
    
    .component-info ul {
        list-style: none;
        margin-top: 1rem;
    }
    
    .component-info ul li {
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border-glass);
        position: relative;
        padding-left: 1.5rem;
    }
    
    .component-info ul li:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--primary-color);
        font-weight: bold;
    }
    
    .ai-features,
    .robotics-features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .ai-feature,
    .robotics-feature {
        text-align: center;
        padding: 2rem;
        border-radius: 20px;
        background: var(--bg-glass);
        border: 1px solid var(--border-glass);
        transition: all 0.3s ease;
    }
    
    .ai-feature:hover,
    .robotics-feature:hover {
        transform: translateY(-5px);
        border-color: var(--primary-color);
    }
    
    .ai-feature i,
    .robotics-feature i {
        font-size: 3rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .ai-feature h3,
    .robotics-feature h3 {
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .ai-feature p,
    .robotics-feature p {
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    @media (max-width: 768px) {
        .project-details-content {
            grid-template-columns: 1fr;
        }
        
        .interactive-satellite {
            grid-template-columns: 1fr;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Image expansion functionality
function initImageExpansion() {
    const controlImage = document.getElementById('control-image');
    const ownerImage = document.getElementById('owner-image');
    
    // Control image functionality
    if (controlImage) {
        controlImage.addEventListener('click', function() {
            createImageModal(this.src);
        });
        
        // Add hover effect
        controlImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 20px rgba(0, 179, 230, 0.6)';
        });
        
        controlImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    }
    
    // Owner image functionality
    if (ownerImage) {
        ownerImage.addEventListener('click', function() {
            createIntelligencePanel();
        });
        
        // Add hover effect
        ownerImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 15px rgba(0, 179, 230, 0.6)';
        });
        
        ownerImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    }
}

// Create image modal function
function createImageModal(imageSrc) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
    `;
    
    // Create expanded image
    const expandedImage = document.createElement('img');
    expandedImage.src = imageSrc;
    expandedImage.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border: 3px solid #00b3e6;
        border-radius: 15px;
        box-shadow: 0 0 30px rgba(0, 179, 230, 0.5);
        object-fit: contain;
    `;
    
    modal.appendChild(expandedImage);
    document.body.appendChild(modal);
    
    // Close modal on click
    modal.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
}

// Create intelligence panel function
function createIntelligencePanel() {
    // Check if panel already exists
    const existingPanel = document.querySelector('.intelligence-panel');
    if (existingPanel) {
        return; // Don't create another panel if one already exists
    }
    
    // Create panel overlay
    const panel = document.createElement('div');
    panel.className = 'intelligence-panel';
    panel.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 400px;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
        border-left: 3px solid #00b3e6;
        box-shadow: -5px 0 30px rgba(0, 179, 230, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        overflow-y: auto;
        font-family: 'Inter', sans-serif;
    `;
    
    // Panel content
    panel.innerHTML = `
        <div style="padding: 2rem; color: white;">
            <!-- Header -->
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; border-bottom: 2px solid #00b3e6; padding-bottom: 1rem;">
                <i class="fas fa-user-secret" style="font-size: 2rem; color: #00b3e6;"></i>
                <h2 style="margin: 0; color: #00b3e6; font-size: 1.5rem;">PROFILE</h2>
            </div>
            
            <!-- Profile Photo -->
            <div style="text-align: center; margin-bottom: 2rem;">
                <img src="Owner.png" alt="Saleem Alwan" style="width: 150px; height: 150px; border-radius: 50%; border: 4px solid #00b3e6; object-fit: cover; box-shadow: 0 0 20px rgba(0, 179, 230, 0.5);" />
            </div>
            
            <!-- Personal Info -->
            <div style="background: rgba(0, 179, 230, 0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 2rem; border: 1px solid rgba(0, 179, 230, 0.3);">
                <h3 style="color: #00b3e6; margin-bottom: 1rem; font-size: 1.3rem;">
                    <i class="fas fa-user" style="margin-right: 0.5rem;"></i>PERSONAL INFORMATION
                </h3>
                <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #00b3e6;">Name:</strong> 
                    <span style="color: #ffffff;">Saleem Alwan</span>
                </div>
                <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #00b3e6;">Position:</strong> 
                    <span style="color: #ffffff;">Company Owner & CEO</span>
                </div>
                <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #00b3e6;">Company:</strong> 
                    <span style="color: #ffffff;">Aurax Technology</span>
                </div>
                <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #00b3e6;">Location:</strong> 
                    <span style="color: #ffffff;">Israel, Kisra Village</span>
                </div>
            </div>
            
            <!-- Certificates -->
            <div style="background: rgba(0, 179, 230, 0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 2rem; border: 1px solid rgba(0, 179, 230, 0.3);">
                <h3 style="color: #00b3e6; margin-bottom: 1rem; font-size: 1.3rem;">
                    <i class="fas fa-certificate" style="margin-right: 0.5rem;"></i>PROFESSIONAL CERTIFICATES
                </h3>
                <div style="display: grid; gap: 0.5rem;">
                    <div style="background: rgba(0, 179, 230, 0.2); padding: 0.5rem; border-radius: 8px; border-left: 3px solid #00b3e6;">
                        <strong style="color: #00b3e6;">CEH</strong> - Certified Ethical Hacker
                    </div>
                    <div style="background: rgba(0, 179, 230, 0.2); padding: 0.5rem; border-radius: 8px; border-left: 3px solid #00b3e6;">
                        <strong style="color: #00b3e6;">CS50</strong> - Harvard Computer Science
                    </div>
                    <div style="background: rgba(0, 179, 230, 0.2); padding: 0.5rem; border-radius: 8px; border-left: 3px solid #00b3e6;">
                        <strong style="color: #00b3e6;">RS</strong> - Remote Sensing
                    </div>
                    <div style="background: rgba(0, 179, 230, 0.2); padding: 0.5rem; border-radius: 8px; border-left: 3px solid #00b3e6;">
                        <strong style="color: #00b3e6;">ARSET</strong> - Applied Remote Sensing Training
                    </div>
                    <div style="background: rgba(0, 179, 230, 0.2); padding: 0.5rem; border-radius: 8px; border-left: 3px solid #00b3e6;">
                        <strong style="color: #00b3e6;">ACF</strong> - Advanced Cybersecurity Framework
                    </div>
                </div>
            </div>
            
            <!-- Contact Info -->
            <div style="background: rgba(0, 179, 230, 0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 2rem; border: 1px solid rgba(0, 179, 230, 0.3);">
                <h3 style="color: #00b3e6; margin-bottom: 1rem; font-size: 1.3rem;">
                    <i class="fas fa-address-book" style="margin-right: 0.5rem;"></i>CONTACT INFORMATION
                </h3>
                <div style="margin-bottom: 0.5rem;">
                    <i class="fas fa-envelope" style="color: #00b3e6; margin-right: 0.5rem;"></i>
                    <span style="color: #ffffff;">20auraxtechnologies25@gmail.com</span>
                </div>
                <div style="margin-bottom: 0.5rem;">
                    <i class="fas fa-phone" style="color: #00b3e6; margin-right: 0.5rem;"></i>
                    <span style="color: #ffffff;">+972 (052) 290-1320</span>
                </div>
                <div style="margin-bottom: 0.5rem;">
                    <i class="fas fa-map-marker-alt" style="color: #00b3e6; margin-right: 0.5rem;"></i>
                    <span style="color: #ffffff;">Israel, Street 1701, Kisra Village, TC 20138</span>
                </div>
            </div>
            
            <!-- Close Button -->
            <button id="close-panel" style="
                width: 100%;
                padding: 1rem;
                background: linear-gradient(135deg, #00b3e6, #0066ff);
                border: none;
                border-radius: 10px;
                color: white;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 1rem;
            " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                <i class="fas fa-times" style="margin-right: 0.5rem;"></i>CLOSE FILE
            </button>
        </div>
    `;
    
    document.body.appendChild(panel);
    
    // Animate panel opening
    setTimeout(() => {
        panel.style.transform = 'translateX(0)';
    }, 10);
    
    // Close panel functionality
    const closeBtn = panel.querySelector('#close-panel');
    closeBtn.addEventListener('click', function() {
        panel.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(panel);
        }, 300);
    });
    
    // Close panel when clicking outside
    panel.addEventListener('click', function(e) {
        if (e.target === panel) {
            panel.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(panel);
            }, 300);
        }
    });
}

// Language switcher functionality
function initLanguageSwitcher() {
    const planetBtn = document.getElementById('planetBtn');
    const languages = ['en', 'ar', 'he'];
    let currentLangIndex = 0; // Start with English (current page)
    
    if (planetBtn) {
        planetBtn.addEventListener('click', function() {
            // Cycle to next language
            currentLangIndex = (currentLangIndex + 1) % languages.length;
            const newLang = languages[currentLangIndex];
            
            // Call the switchLanguage function
            switchLanguage(newLang);
        });
    }
}

// Function to switch between language pages
function switchLanguage(lang) {
    // Always go to the page without hash
    switch(lang) {
        case 'en':
            window.location.href = 'index.html';
            break;
        case 'ar':
            window.location.href = 'Arabic.html';
            break;
        case 'he':
            window.location.href = 'Hebrew.html';
            break;
    }
    // Show language notification
    showLanguageNotification(lang);
}

// Show language change notification
function showLanguageNotification(lang) {
    const notifications = {
        'en': 'Language: English',
        'ar': 'اللغة: العربية',
        'he': 'שפה: עברית'
    };
    
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-glass);
        border: 1px solid var(--border-glass);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = notifications[lang];
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Mobile optimizations
function initMobileOptimizations() {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Improve touch interactions
    const touchElements = document.querySelectorAll('.btn, .nav-link, .project-card, .contact-item');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Optimize scroll performance on mobile
    let ticking = false;
    function updateScroll() {
        ticking = false;
        // Scroll-based animations here
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Improve modal touch interactions
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.addEventListener('touchstart', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}
