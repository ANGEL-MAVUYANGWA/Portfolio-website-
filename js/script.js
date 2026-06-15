// Angel Shiluva Mavuyangwa Portfolio - script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (hamburger && navbarLinks) {
        hamburger.addEventListener('click', function() {
            navbarLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navbarLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navbarLinks && navbarLinks.classList.contains('active')) {
            navbarLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
    
    // ========================================
    // Typewriter Effect
    // ========================================
    const roles = ["Software Developer", "Data Science Enthusiast", "Business Analyst"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter');
    
    function typeEffect() {
        if (!typewriterElement) return;
        const currentRole = roles[roleIndex];
        
        if (!isDeleting && charIndex <= currentRole.length) {
            typewriterElement.textContent = currentRole.substring(0, charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else if (!isDeleting && charIndex > currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex >= 0) {
            typewriterElement.textContent = currentRole.substring(0, charIndex);
            charIndex--;
            setTimeout(typeEffect, 50);
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            charIndex = 0;
            setTimeout(typeEffect, 500);
        }
    }
    
    typeEffect();
    
    // ========================================
    // Animated Progress Bars
    // ========================================
    const progressBars = document.querySelectorAll('.progress-fill');
    if (progressBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    if (width && bar.style.width !== width) {
                        bar.style.width = width;
                    }
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });
        progressBars.forEach(bar => observer.observe(bar));
    }
    
    // ========================================
    // Project Filtering
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                projects.forEach(project => {
                    if (filter === 'all' || project.getAttribute('data-category') === filter) {
                        project.style.display = 'grid';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        project.style.opacity = '0';
                        project.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ========================================
    // Scroll Animations
    // ========================================
    const animatedElements = document.querySelectorAll('.skill-preview, .featured-card, .project-card, .category-card');
    if (animatedElements.length > 0) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            scrollObserver.observe(el);
        });
    }
    
    // ========================================
    // CV MODAL FUNCTIONALITY
    // ========================================
    const cvModal = document.getElementById('cvModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cvOptionBtns = document.querySelectorAll('.cv-option-btn');
    
    function openCVModal() {
        if (cvModal) {
            cvModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeCVModal() {
        if (cvModal) {
            cvModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
    
    function downloadCV(cvType) {
        let fileUrl = '';
        let fileName = '';
        
        switch(cvType) {
            case 'business-analyst':
                fileUrl = 'Files/Business_Analyst_CV.pdf';
                fileName = 'Angel_Mavuyangwa_Business_Analyst_CV.pdf';
                break;
            case 'software-dev':
                fileUrl = 'Files/Software_Developer_CV.pdf';
                fileName = 'Angel_Mavuyangwa_Software_Developer_CV.pdf';
                break;
            case 'data-science':
                fileUrl = 'Files/Data_Science_CV.pdf';
                fileName = 'Angel_Mavuyangwa_Data_Science_CV.pdf';
                break;
            default:
                console.error('Unknown CV type - script.js:178');
                return;
        }
        
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        closeCVModal();
        showNotification(`Downloading ${fileName}`);
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'download-notification';
        notification.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Add click handlers to all Download CV buttons
    const downloadCVBtns = document.querySelectorAll('.download-cv-btn, .btn-primary .fa-download, .btn-primary');
    downloadCVBtns.forEach(btn => {
        let targetBtn = btn;
        if (btn.tagName === 'I' && btn.classList.contains('fa-download')) {
            targetBtn = btn.closest('a, .btn');
        }
        if (targetBtn && targetBtn.textContent.includes('Download')) {
            targetBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openCVModal();
            });
        }
    });
    
    // Also handle any button that contains "CV" in text
    document.querySelectorAll('a, .btn').forEach(btn => {
        if (btn.textContent && btn.textContent.includes('CV') && btn.textContent.includes('Download')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                openCVModal();
            });
        }
    });
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeCVModal);
    }
    
    if (cvModal) {
        cvModal.addEventListener('click', function(e) {
            if (e.target === cvModal) closeCVModal();
        });
    }
    
    cvOptionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cvType = this.getAttribute('data-cv');
            if (cvType) downloadCV(cvType);
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cvModal && cvModal.classList.contains('show')) {
            closeCVModal();
        }
    });
    
    // ========================================
    // Contact Form Submission
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    formMessage.textContent = '✓ Message sent successfully! I will get back to you soon.';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                    contactForm.reset();
                    setTimeout(() => formMessage.style.display = 'none', 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                formMessage.textContent = '✗ Oops! Something went wrong. Please try again or email me directly.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                setTimeout(() => formMessage.style.display = 'none', 5000);
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (navbar) {
            navbar.style.boxShadow = window.scrollY > 50 ? 'var(--shadow-md)' : 'none';
        }
    });
    
    // ========================================
    // Set Active Navigation Link
    // ========================================
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const filename = currentPath.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === filename || (filename === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    setActiveNavLink();
    
    console.log('%c Angel Shiluva Mavuyangwa Portfolio | Software Developer & Business Analyst - script.js:323', 'color: #2c3e66; font-size: 14px; font-weight: bold;');
});