document.addEventListener('DOMContentLoaded', function() {
    console.log("Welcome to Shahriyar Hasib's profile page.");

    // Initialize skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress;
    });

    // Add animation delay to skill categories for staggered appearance
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.style.animationDelay = `${index * 0.2}s`;
    });

    // Smooth scrolling with offset for fixed header
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip navigation to hidden sections
            if (targetId === '#projects' || targetId === '#publications') {
                console.log(`${targetId.substring(1)} section is currently hidden`);
                return;
            }
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced particle animation for research section
    function createResearchParticleSystem() {
        const canvas = document.getElementById('researchAnimation');
        if (!canvas) return;

        // Set canvas to full width/height of container
        const resizeCanvas = () => {
            const container = canvas.parentElement;
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const ctx = canvas.getContext('2d');
        const particles = [];
        const nodeCount = 8;  // Number of fixed nodes
        const nodes = [];
        
        // Create fixed nodes that represent research concepts
        const concepts = ['Audio', 'ML', 'Detection', 'Networks', 'Data', 'Security', 'AI', 'Analysis'];
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: 4,
                color: '#ff5722',
                text: concepts[i],
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
        
        // Add performance optimization - reduce particle count on mobile
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 25 : 50;
        
        // Create moving particles with optimized count
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                seed: Math.random() * 10000
            });
        }

        function drawConnections() {
            // Draw connections between nodes
            nodes.forEach((node1, i) => {
                nodes.slice(i + 1).forEach(node2 => {
                    const dx = node1.x - node2.x;
                    const dy = node1.y - node2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 87, 34, ${0.3 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(node1.x, node1.y);
                        ctx.lineTo(node2.x, node2.y);
                        ctx.stroke();
                    }
                });
            });
            
            // Draw connections from particles to nearby nodes
            particles.forEach(particle => {
                nodes.forEach(node => {
                    const dx = particle.x - node.x;
                    const dy = particle.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 80) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 165, 0, ${0.2 * (1 - distance / 80)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(node.x, node.y);
                        ctx.stroke();
                    }
                });
            });
        }

        function updateNodes() {
            nodes.forEach(node => {
                // Move nodes slowly
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off boundaries
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                
                // Keep nodes in bounds
                node.x = Math.max(0, Math.min(canvas.width, node.x));
                node.y = Math.max(0, Math.min(canvas.height, node.y));
            });
        }

        function updateParticles() {
            particles.forEach(p => {
                p.x += Math.sin(Date.now() * 0.001 + p.seed) * p.speedX;
                p.y += Math.cos(Date.now() * 0.001 + p.seed) * p.speedY;
                
                // Loop particles around the screen
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                
                p.opacity = 0.2 + Math.sin(Date.now() * 0.002 + p.seed) * 0.1;
            });
        }
        
        function drawParticles() {
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 165, 0, ${p.opacity})`;
                ctx.fill();
            });
        }
        
        function drawNodes() {
            nodes.forEach(node => {
                // Draw node circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();
                
                // Draw text
                ctx.fillStyle = '#fff';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(node.text, node.x, node.y - 10);
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateNodes();
            updateParticles();
            drawConnections();
            drawParticles();
            drawNodes();
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // Add error handling for canvas creation
    try {
        createParticleSystem();
        createResearchParticleSystem();
    } catch (error) {
        console.error("Error initializing animations:", error);
        // Fallback: hide canvas containers to prevent layout issues
        document.querySelectorAll('canvas').forEach(canvas => {
            if (canvas && canvas.parentElement) {
                canvas.parentElement.style.display = 'none';
            }
        });
    }

    // Improve image loading with timeout
    document.querySelectorAll('img').forEach(img => {
        // Add loading class
        if (img.parentElement) {
            img.parentElement.classList.add('loading');
        }
        
        // Set timeout to handle very slow loading images
        const timeout = setTimeout(() => {
            if (!img.complete && typeof img.onerror === 'function') {
                img.onerror();
            }
        }, 10000); // 10 second timeout
        
        img.onload = function() {
            clearTimeout(timeout);
            if (this.parentElement) {
                this.parentElement.classList.remove('loading');
            }
        };
        
        img.onerror = function() {
            clearTimeout(timeout);
            console.error(`Failed to load image: ${this.src}`);
            if (this.parentElement) {
                this.parentElement.classList.add('error');
            }
        };
    });

    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1
    };

    // Add feature detection for IntersectionObserver
    if ('IntersectionObserver' in window) {
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
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('animate');
        });
    }

    // Initialize the tagline with a typing animation
    const taglineElement = document.getElementById('animated-tagline');
    if (taglineElement) {
        const taglines = [
            'Exploring the Frontiers of DeepFake Detection & AI',
            'Developing Advanced Audio Analysis Systems',
            'Building the Future of Audio Security'
        ];

        // Animation variables
        let currentTagline = "";
        let targetTagline = taglines[0];
        let isWriting = true;
        let charIndex = 0;
        let currentIndex = 0;
        let writingSpeed = 80;  // ms per character
        let deleteSpeed = 40;   // ms per character
        let pauseDelay = 2000;  // pause before deleting
        
        // Clear element initially
        taglineElement.textContent = "";
        
        // Animation function that handles both writing and erasing
        function animateTagline() {
            if (isWriting) {
                // Writing mode
                if (charIndex < targetTagline.length) {
                    currentTagline += targetTagline.charAt(charIndex);
                    taglineElement.textContent = currentTagline;
                    charIndex++;
                    setTimeout(animateTagline, writingSpeed);
                } else {
                    // Finished writing, pause before deletion
                    isWriting = false;
                    setTimeout(animateTagline, pauseDelay);
                }
            } else {
                // Erasing mode
                if (charIndex > 0) {
                    charIndex--;
                    currentTagline = targetTagline.substring(0, charIndex);
                    taglineElement.textContent = currentTagline;
                    setTimeout(animateTagline, deleteSpeed);
                } else {
                    // Finished erasing, switch to next tagline
                    isWriting = true;
                    currentIndex = (currentIndex + 1) % taglines.length;
                    targetTagline = taglines[currentIndex];
                    currentTagline = "";
                    setTimeout(animateTagline, writingSpeed);
                }
            }
        }
        
        // Start the animation
        animateTagline();
        
        // Add a cursor effect
        const cursorElement = document.createElement('span');
        cursorElement.className = 'typing-cursor';
        cursorElement.textContent = '|';
        taglineElement.parentNode.insertBefore(cursorElement, taglineElement.nextSibling);
        
        // Make cursor blink
        setInterval(() => {
            cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
    
    // Enhanced scroll animations
    const faders = document.querySelectorAll('.fade-in-section');
    
    if (faders.length > 0) {
        // Add visible class to first section immediately to ensure content appears
        if (faders[0]) {
            faders[0].classList.add('is-visible');
        }
        
        if ('IntersectionObserver' in window) {
            const appearOptions = {
                threshold: 0.1, // Reduced threshold to trigger earlier
                rootMargin: "0px 0px -50px 0px" // Changed from -100px to -50px
            };
            
            const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        // Don't unobserve to allow re-animation if needed
                        // appearOnScroll.unobserve(entry.target);
                    }
                });
            }, appearOptions);
            
            faders.forEach(fader => {
                appearOnScroll.observe(fader);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            faders.forEach(fader => {
                fader.classList.add("is-visible");
            });
        }
    }
    
    // Additionally, set a timeout to ensure all sections become visible
    // even if the intersection observer fails
    setTimeout(() => {
        document.querySelectorAll('.fade-in-section:not(.is-visible)').forEach(section => {
            section.classList.add('is-visible');
        });
    }, 2000); // Ensure all content is visible after 2 seconds
    
    // Add animate-rotateIn class to elements sequentially
    document.querySelectorAll('.skill-category h3').forEach((el, index) => {
        el.classList.add('animate-rotateIn');
        el.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add random animation delays to project cards for staggered effect
    document.querySelectorAll('.project-card').forEach(card => {
        const randomDelay = Math.random() * 0.5;
        card.style.animationDelay = `${randomDelay}s`;
    });
    
    // Add section animations
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
    });
    
    // Add animations for research section
    const researchItems = document.querySelectorAll('.research-card');
    researchItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // PDF viewer functionality
    document.querySelectorAll('.pdf-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const pdfUrl = this.getAttribute('data-pdf');
            const pdfViewer = document.getElementById('pdf-viewer');
            const pdfFrame = document.getElementById('pdf-frame');
            
            if (pdfViewer && pdfFrame && pdfUrl) {
                pdfFrame.src = pdfUrl;
                pdfViewer.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                console.error('PDF viewer elements not found or PDF URL is missing');
                alert('PDF preview is not available at this time.');
            }
        });
    });
    
    // Close PDF viewer
    const closeButton = document.querySelector('.close-pdf');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            const pdfViewer = document.getElementById('pdf-viewer');
            if (pdfViewer) {
                pdfViewer.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
    }

    // Improve PDF viewer with keyboard accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const pdfViewer = document.getElementById('pdf-viewer');
            if (pdfViewer && pdfViewer.classList.contains('active')) {
                pdfViewer.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Publication citation copy functionality
    document.querySelectorAll('.copy-citation').forEach(button => {
        button.addEventListener('click', function() {
            const citation = this.getAttribute('data-citation');
            if (citation && navigator.clipboard) {
                navigator.clipboard.writeText(citation).then(() => {
                    // Change button text temporarily
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy citation:', err);
                    alert('Could not copy citation. Please try manually selecting and copying the text.');
                });
            }
        });
    });

    // Add audio visualization if on research page section
    const specAnalyzer = document.querySelector('.spec-analyzer');
    if (specAnalyzer) {
        createAudioVisualization(specAnalyzer);
    }
});

// Create particle system for hero section
function createParticleSystem() {
    const canvas = document.getElementById('dataAnimation');
    if (!canvas) return;

    // Set canvas to full width/height of container
    const resizeCanvas = () => {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            seed: Math.random() * 10000
        });
    }

    function drawConnections() {
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
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
            
            // Loop particles around the screen
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            p.opacity = 0.2 + Math.sin(Date.now() * 0.002 + p.seed) * 0.1;
        });
    }
    
    function drawParticles() {
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.fill();
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateParticles();
        drawConnections();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Create audio visualization for spec analyzer
function createAudioVisualization(container) {
    const barCount = 32;
    for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'spec-bar';
        bar.style.left = `${i * (100 / barCount)}%`;
        container.appendChild(bar);
    }
    
    // Animate the bars
    function animateBars() {
        const bars = container.querySelectorAll('.spec-bar');
        bars.forEach(bar => {
            const height = Math.random() * 100 + 10;
            bar.style.height = `${height}px`;
        });
        requestAnimationFrame(animateBars);
    }
    
    animateBars();
}

// Mobile Navigation Toggle Functions
function toggleNav() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu) {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }
}

function closeNav() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (navMenu) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navMenu && navMenu.classList.contains('active')) {
        if (!mainNav.contains(event.target)) {
            closeNav();
        }
    }
});

// Close mobile nav on window resize if desktop view
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeNav();
    }
});