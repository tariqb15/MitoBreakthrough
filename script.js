// Ultra-Advanced Bridge Page JavaScript
class BridgePageController {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startAnimations();
        this.initCounters();
        this.setupScrollEffects();
        this.initUrgencyTimer();
        this.trackUserBehavior();
    }

    init() {
        // Remove loading screen after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loading = document.querySelector('.loading');
                if (loading) {
                    loading.classList.add('hidden');
                }
            }, 1000);
        });

        // Initialize scroll progress indicator
        this.createScrollProgress();
        
        // Initialize floating particles
        this.createFloatingParticles();
        
        // Initialize testimonial carousel
        this.initTestimonialCarousel();
        
        // Initialize exit intent popup
        this.initExitIntent();
    }

    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${Math.min(scrolled, 100)}%`;
        });
    }

    createFloatingParticles() {
        const particleContainer = document.querySelector('.floating-particles');
        if (!particleContainer) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 20 + 10}s infinite linear;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    setupEventListeners() {
        // CTA Button Clicks with Advanced Tracking
        document.querySelectorAll('.hero-cta-btn, .final-cta-btn, .secondary-cta').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleCTAClick(e);
                this.createRippleEffect(e);
                this.trackConversion(btn.textContent.trim());
            });
        });

        // Video Placeholder Clicks
        document.querySelectorAll('.video-placeholder, .main-video-placeholder').forEach(video => {
            video.addEventListener('click', (e) => {
                this.handleVideoClick(e);
                this.trackEngagement('video_click');
            });
        });

        // Smooth Scrolling for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Mouse movement parallax effect
        document.addEventListener('mousemove', (e) => {
            this.handleMouseParallax(e);
        });

        // Scroll-triggered animations
        window.addEventListener('scroll', () => {
            this.handleScrollAnimations();
            this.updateNavBar();
        });

        // Page visibility tracking
        document.addEventListener('visibilitychange', () => {
            this.trackPageVisibility();
        });
    }

    handleCTAClick(e) {
        const button = e.currentTarget;
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // Redirect to affiliate link
        setTimeout(() => {
            window.open('https://c08cbrnlojkt9w8hnnua976x62.hop.clickbank.net', '_blank');
        }, 300);
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    handleVideoClick(e) {
        const video = e.currentTarget;
        
        // Create video modal overlay
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            background: white;
            border-radius: 20px;
            padding: 20px;
            position: relative;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 30px;
            cursor: pointer;
            color: #666;
        `;
        
        const videoPlaceholder = document.createElement('div');
        videoPlaceholder.style.cssText = `
            width: 800px;
            height: 450px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            font-weight: 600;
        `;
        videoPlaceholder.textContent = 'Video would play here - Redirecting to product page...';
        
        videoContainer.appendChild(closeBtn);
        videoContainer.appendChild(videoPlaceholder);
        modal.appendChild(videoContainer);
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => modal.style.opacity = '1', 10);
        
        // Close handlers
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Auto-redirect after 3 seconds
        setTimeout(() => {
            closeModal();
            window.open('https://c08cbrnlojkt9w8hnnua976x62.hop.clickbank.net', '_blank');
        }, 3000);
    }

    handleMouseParallax(e) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;
        
        // Apply parallax to floating particles
        const particles = document.querySelector('.floating-particles');
        if (particles) {
            particles.style.transform = `translate(${xPercent * 10}px, ${yPercent * 10}px)`;
        }
        
        // Apply subtle parallax to hero elements
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translate(${xPercent * 5}px, ${yPercent * 5}px)`;
        }
    }

    handleScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
            
            if (isVisible && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }

    updateNavBar() {
        const navBar = document.querySelector('.nav-bar');
        if (!navBar) return;
        
        if (window.scrollY > 100) {
            navBar.style.background = 'rgba(255, 255, 255, 0.98)';
            navBar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navBar.style.background = 'rgba(255, 255, 255, 0.95)';
            navBar.style.boxShadow = 'none';
        }
    }

    startAnimations() {
        // Add initial animation classes
        setTimeout(() => {
            document.querySelectorAll('.hero-headline, .hero-cta-btn').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('fade-in', 'visible');
                }, index * 200);
            });
        }, 500);
    }

    initCounters() {
        const counters = document.querySelectorAll('.counter-number:not(.rating-display)');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format number with commas
                const formatted = Math.floor(current).toLocaleString();
                counter.textContent = counter.textContent.replace(/[\d,]+/, formatted);
            }, 16);
        };
        
        // Trigger counters when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }

    setupScrollEffects() {
        // Parallax effect for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.animated-bg');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    initUrgencyTimer() {
        const timer = document.querySelector('.countdown-timer');
        if (!timer) return;
        
        // Set timer for 24 hours from now
        const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        
        const updateTimer = () => {
            const now = new Date().getTime();
            const timeLeft = endTime - now;
            
            if (timeLeft > 0) {
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                timer.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                timer.innerHTML = '00:00:00';
            }
        };
        
        updateTimer();
        setInterval(updateTimer, 1000);
    }

    initTestimonialCarousel() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length === 0) return;
        
        let currentIndex = 0;
        
        const showTestimonial = (index) => {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.toggle('active', i === index);
            });
        };
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
        
        // Show first testimonial
        showTestimonial(0);
    }

    initExitIntent() {
        let exitIntentShown = false;
        
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !exitIntentShown) {
                exitIntentShown = true;
                this.showExitIntentPopup();
            }
        });
    }

    showExitIntentPopup() {
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const popupContent = document.createElement('div');
        popupContent.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        popupContent.innerHTML = `
            <button style="position: absolute; top: 15px; right: 20px; background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">×</button>
            <h3 style="color: #2c3e50; margin-bottom: 20px; font-size: 24px;">Interested in Learning More?</h3>
            <p style="color: #666; margin-bottom: 30px; font-size: 16px;">Get access to the complete research presentation about mitochondrial health and cellular energy.</p>
            <button style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); border: none; padding: 15px 30px; border-radius: 50px; color: white; font-weight: 700; cursor: pointer; font-size: 16px;">Watch Full Presentation</button>
        `;
        
        popup.appendChild(popupContent);
        document.body.appendChild(popup);
        
        // Animate in
        setTimeout(() => {
            popup.style.opacity = '1';
            popupContent.style.transform = 'scale(1)';
        }, 10);
        
        // Close handlers
        const closePopup = () => {
            popup.style.opacity = '0';
            setTimeout(() => popup.remove(), 300);
        };
        
        popupContent.querySelector('button').addEventListener('click', closePopup);
        popupContent.querySelector('button:last-child').addEventListener('click', () => {
            this.trackConversion('exit_intent_popup');
            window.open('https://c08cbrnlojkt9w8hnnua976x62.hop.clickbank.net', '_blank');
            closePopup();
        });
        
        popup.addEventListener('click', (e) => {
            if (e.target === popup) closePopup();
        });
    }

    trackUserBehavior() {
        // Track time on page
        const startTime = Date.now();
        
        // Track scroll depth
        let maxScrollDepth = 0;
        window.addEventListener('scroll', () => {
            const scrollDepth = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
        });
        
        // Track page unload
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Date.now() - startTime;
            this.sendAnalytics({
                event: 'page_unload',
                timeOnPage: timeOnPage,
                maxScrollDepth: maxScrollDepth
            });
        });
    }

    trackConversion(source) {
        this.sendAnalytics({
            event: 'conversion_click',
            source: source,
            timestamp: Date.now()
        });
    }

    trackEngagement(action) {
        this.sendAnalytics({
            event: 'engagement',
            action: action,
            timestamp: Date.now()
        });
    }

    trackPageVisibility() {
        if (document.hidden) {
            this.sendAnalytics({
                event: 'page_hidden',
                timestamp: Date.now()
            });
        } else {
            this.sendAnalytics({
                event: 'page_visible',
                timestamp: Date.now()
            });
        }
    }

    sendAnalytics(data) {
        // In a real implementation, you would send this to your analytics service
        console.log('Analytics:', data);
        
        // Example: Send to Google Analytics, Facebook Pixel, etc.
        // gtag('event', data.event, { custom_parameter: data.source });
    }
}

// Advanced CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInFromBottom {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
        }
        50% {
            box-shadow: 0 0 40px rgba(102, 126, 234, 0.6);
        }
    }
    
    .bounce-in {
        animation: bounceIn 0.8s ease-out;
    }
    
    .glow-effect {
        animation: glow 2s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// Live Notifications System
const notificationMessages = {
    weightLoss: [
        { name: "Sarah M.", location: "California", weight: "23 lbs", time: "2 weeks", icon: "fas fa-weight" },
        { name: "Michael R.", location: "Texas", weight: "31 lbs", time: "3 weeks", icon: "fas fa-trophy" },
        { name: "Jennifer L.", location: "New York", weight: "18 lbs", time: "10 days", icon: "fas fa-star" },
        { name: "David K.", location: "Florida", weight: "27 lbs", time: "2.5 weeks", icon: "fas fa-fire" },
        { name: "Lisa P.", location: "Ohio", weight: "22 lbs", time: "16 days", icon: "fas fa-heart" },
        { name: "Robert T.", location: "Michigan", weight: "35 lbs", time: "4 weeks", icon: "fas fa-medal" },
        { name: "Amanda S.", location: "Georgia", weight: "19 lbs", time: "12 days", icon: "fas fa-gem" },
        { name: "James W.", location: "Arizona", weight: "29 lbs", time: "3 weeks", icon: "fas fa-crown" },
        { name: "Maria G.", location: "Nevada", weight: "24 lbs", time: "18 days", icon: "fas fa-sparkles" },
        { name: "Kevin H.", location: "Oregon", weight: "33 lbs", time: "25 days", icon: "fas fa-rocket" }
    ],
    orders: [
        { name: "Emma C.", location: "Washington", package: "3-Month Supply", icon: "fas fa-shopping-cart" },
        { name: "Daniel M.", location: "Colorado", package: "6-Month Supply", icon: "fas fa-box" },
        { name: "Sophia R.", location: "Virginia", package: "1-Month Supply", icon: "fas fa-gift" },
        { name: "Ryan B.", location: "Illinois", package: "3-Month Supply", icon: "fas fa-truck" },
        { name: "Isabella T.", location: "North Carolina", package: "6-Month Supply", icon: "fas fa-star-of-life" },
        { name: "Tyler J.", location: "Tennessee", package: "3-Month Supply", icon: "fas fa-check-double" },
        { name: "Olivia K.", location: "Wisconsin", package: "1-Month Supply", icon: "fas fa-thumbs-up" },
        { name: "Brandon L.", location: "Minnesota", package: "6-Month Supply", icon: "fas fa-award" },
        { name: "Chloe D.", location: "Louisiana", package: "3-Month Supply", icon: "fas fa-heart-pulse" },
        { name: "Austin F.", location: "Alabama", package: "1-Month Supply", icon: "fas fa-lightning-bolt" }
    ]
};

let notificationQueue = [];
let isNotificationActive = false;

function createNotification(type, data) {
    const template = document.getElementById('notificationTemplate');
    const notification = template.cloneNode(true);
    notification.id = 'notification-' + Date.now();
    notification.style.display = 'flex';
    
    const icon = notification.querySelector('.notification-icon i');
    const text = notification.querySelector('.notification-text');
    const time = notification.querySelector('.notification-time');
    const iconContainer = notification.querySelector('.notification-icon');
    
    if (type === 'weightLoss') {
        icon.className = data.icon + ' weight-loss';
        iconContainer.classList.add('weight-loss');
        text.innerHTML = `<strong>${data.name}</strong> from ${data.location} lost <strong>${data.weight}</strong> in just ${data.time}!`;
        time.textContent = getRandomTime() + ' ago';
    } else if (type === 'order') {
        icon.className = data.icon + ' order';
        iconContainer.classList.add('order');
        text.innerHTML = `<strong>${data.name}</strong> from ${data.location} just ordered <strong>${data.package}</strong>`;
        time.textContent = getRandomTime() + ' ago';
    }
    
    return notification;
}

function getRandomTime() {
    const times = ['2 minutes', '5 minutes', '8 minutes', '12 minutes', '15 minutes', '18 minutes', '22 minutes', '25 minutes'];
    return times[Math.floor(Math.random() * times.length)];
}

function showNotification(notification) {
    const container = document.getElementById('liveNotifications');
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-hide after 6 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 6000);
}

function hideNotification(notification) {
    notification.classList.add('hide');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 500);
}

function closeNotification(closeBtn) {
    const notification = closeBtn.closest('.notification-item');
    hideNotification(notification);
}

function getRandomNotification() {
    const type = Math.random() > 0.6 ? 'weightLoss' : 'order';
    const messages = notificationMessages[type];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    return { type, data: randomMessage };
}

function startNotificationSystem() {
    // Show first notification after 3 seconds
    setTimeout(() => {
        const { type, data } = getRandomNotification();
        const notification = createNotification(type, data);
        showNotification(notification);
    }, 3000);
    
    // Continue showing notifications every 8-15 seconds
    setInterval(() => {
        const { type, data } = getRandomNotification();
        const notification = createNotification(type, data);
        showNotification(notification);
    }, Math.random() * 7000 + 8000); // 8-15 seconds
}

// Initialize the bridge page controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BridgePageController();
});

// Initialize notification system separately to avoid conflicts
window.addEventListener('load', () => {
    startNotificationSystem();
});

// Add some extra conversion optimization features
window.addEventListener('load', () => {
    // Add urgency to CTAs after 30 seconds
    setTimeout(() => {
        document.querySelectorAll('.hero-cta-btn, .final-cta-btn').forEach(btn => {
            btn.classList.add('glow-effect');
        });
    }, 30000);
    
    // Show educational reminder after 2 minutes
    setTimeout(() => {
        const educationalReminder = document.createElement('div');
        educationalReminder.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            cursor: pointer;
            animation: bounceIn 0.8s ease-out;
            max-width: 300px;
        `;
        educationalReminder.innerHTML = `
            <div style="font-weight: 700; margin-bottom: 5px;">📚 Learn More</div>
            <div style="font-size: 14px;">Discover the complete research on mitochondrial health</div>
        `;
        
        educationalReminder.addEventListener('click', () => {
            window.open('https://c08cbrnlojkt9w8hnnua976x62.hop.clickbank.net', '_blank');
            educationalReminder.remove();
        });
        
        document.body.appendChild(educationalReminder);
        
        // Auto-remove after 15 seconds
        setTimeout(() => {
            if (educationalReminder.parentNode) {
                educationalReminder.style.animation = 'slideInFromBottom 0.5s ease-out reverse';
                setTimeout(() => educationalReminder.remove(), 500);
            }
        }, 15000);
    }, 120000);
});

// Mobile-specific optimizations
if (window.innerWidth <= 768) {
    document.addEventListener('DOMContentLoaded', () => {
        // Optimize touch interactions
        document.querySelectorAll('.hero-cta-btn, .final-cta-btn').forEach(btn => {
            btn.style.minHeight = '50px';
            btn.style.fontSize = '18px';
        });
        
        // Add mobile-specific animations
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px) {
                .fade-in.visible {
                    animation: slideInFromBottom 0.6s ease-out;
                }
                
                .hero-cta-btn:active,
                .final-cta-btn:active {
                    transform: scale(0.95);
                }
            }
        `;
        document.head.appendChild(mobileStyle);
    });
}

// Scroll Functions for Bridge Page Navigation
function scrollToEducation() {
    const target = document.getElementById('learn-more');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToDiscovery() {
    const target = document.getElementById('video-section');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Email Capture Functionality
document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('emailCaptureForm');
    const emailInput = document.getElementById('emailInput');
    
    if (emailForm && emailInput) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showEmailMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Store email for retargeting (in real implementation, send to your email service)
            localStorage.setItem('capturedEmail', email);
            
            // Show success message
            showEmailMessage('Thank you! You\'ll receive research updates soon.', 'success');
            
            // Clear form
            emailInput.value = '';
            
            // Track conversion for retargeting
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_capture', {
                    'event_category': 'lead_generation',
                    'event_label': 'bridge_page_signup'
                });
            }
            
            // Set retargeting pixel (placeholder for actual implementation)
            setRetargetingPixel(email);
        });
    }
});

function showEmailMessage(message, type) {
    const existingMessage = document.querySelector('.email-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `email-message ${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideInFromRight 0.3s ease-out;
        max-width: 300px;
        ${type === 'success' ? 'background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);' : 'background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);'}
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideInFromRight 0.3s ease-out reverse';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

function setRetargetingPixel(email) {
    // Placeholder for retargeting pixel implementation
    // In a real implementation, you would:
    // 1. Send email to your email service provider (Mailchimp, ConvertKit, etc.)
    // 2. Set Facebook/Google retargeting pixels
    // 3. Add user to custom audiences
    
    console.log('Retargeting pixel set for:', email);
    
    // Example Facebook Pixel event (replace with your actual pixel ID)
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'Mitochondria Research Signup',
            content_category: 'Email Capture'
        });
    }
}