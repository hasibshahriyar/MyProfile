document.addEventListener('DOMContentLoaded', function() {
    console.log("Welcome to Shahriyar Hasib's profile page.");

    // Initialize skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress;
    });

    // Smooth scrolling with offset for fixed header
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Enhanced particle animation
    function createParticleSystem() {
        const canvas = document.getElementById('dataAnimation');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const particles = [];
        const connections = [];
        
        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                opacity: Math.random() * 0.5 + 0.5
            };
        }

        function drawConnections() {
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(9, 132, 227, ${0.2 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });
        }

        function updateParticles() {
            particles.forEach(p => {
                p.x += Math.sin(Date.now() * 0.001 + p.seed) * p.speedX;
                p.y += Math.cos(Date.now() * 0.001 + p.seed) * p.speedY;
                p.opacity = 0.5 + Math.sin(Date.now() * 0.002 + p.seed) * 0.2;
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateParticles();
            drawConnections();
            drawParticles();
            requestAnimationFrame(animate);
        }
    }

    createParticleSystem();

    // Image loading verification
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.error(`Failed to load image: ${img.src}`);
            img.src = 'assets/placeholder.png'; // Fallback image
        });
    });

    // Enhanced image loading handler
    document.querySelectorAll('img').forEach(img => {
        // Add loading class
        img.parentElement.classList.add('loading');
        
        img.onload = function() {
            // Remove loading class when image loads
            this.parentElement.classList.remove('loading');
        };
        
        img.onerror = function() {
            console.error(`Failed to load image: ${this.src}`);
            // Add error class for styling
            this.parentElement.classList.add('error');
            // Don't set placeholder - let CSS handle it
        };
    });

    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Add cursor effects
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Add scroll animations with intersection observer
    const sections = document.querySelectorAll('section');
    const sectionObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                entry.target.querySelectorAll('.skill-progress').forEach(skill => {
                    skill.style.width = skill.dataset.progress;
                });
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Add magnetic effect to buttons and links
    document.querySelectorAll('.btn, .social-links a').forEach(element => {
        element.addEventListener('mousemove', e => {
            const bounds = element.getBoundingClientRect();
            const x = e.clientX - bounds.left - bounds.width / 2;
            const y = e.clientY - bounds.top - bounds.height / 2;
            
            element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });

    // Initialize typed.js for hero section
    new Typed('.tagline', {
        strings: [
            'Exploring the Frontiers of DeepFake Detection & AI',
            'Developing Advanced Audio Analysis Systems',
            'Building the Future of Audio Security'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Add hover effects for contact items
    document.querySelectorAll('.contact li').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('i').style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('i').style.transform = 'scale(1) rotate(0)';
        });
    });

    // Add typing animation to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        let index = 0;
        
        function typeText() {
            if (index < text.length) {
                title.textContent += text[index];
                index++;
                setTimeout(typeText, 100);
            }
        }
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeText();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(title);
    });
});

function initializeAnimations() {
    // Particle animation settings
    const particleSettings = {
        color: '#ff5722',
        count: 50,
        speed: 0.5,
        size: { min: 1, max: 3 },
        connectionDistance: 150,
        connectionOpacity: 0.3
    };

    // Update particle animation
    function updateParticleAnimation(ctx, particle) {
        particle.x += Math.sin(Date.now() * 0.001) * particleSettings.speed;
        particle.y += Math.cos(Date.now() * 0.001) * particleSettings.speed;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 87, 34, ${particle.opacity})`;
        ctx.fill();
    }

    // Add scroll reveal animations
    ScrollReveal().reveal('.section-title', {
        delay: 200,
        distance: '50px',
        duration: 1000,
        origin: 'bottom',
        easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });

    ScrollReveal().reveal('.skill-bar', {
        delay: 200,
        interval: 100,
        origin: 'left',
        distance: '100px',
        duration: 1000,
        afterReveal: (el) => {
            const progress = el.getAttribute('data-progress');
            el.style.width = progress;
        }
    });
}

// Initialize enhanced animations
initializeAnimations();

// Add magnetic effect to social links
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mousemove', (e) => {
        const bounds = link.getBoundingClientRect();
        const x = e.clientX - bounds.left - bounds.width / 2;
        const y = e.clientY - bounds.top - bounds.height / 2;
        
        link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translate(0, 0)';
    });
});