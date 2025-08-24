// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for animated counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats container
const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// Category filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        productCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category').split(' ');
            
            if (category === 'all') {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else if (category === 'popular') {
                // Show only popular cards (first 4 cards - 2 GPUs + 2 CPUs)
                const cardIndex = Array.from(productCards).indexOf(card);
                if (cardIndex < 4) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            } else if (category === 'gpu') {
                // Show only GPU cards
                if (cardCategories.includes('gpu')) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            } else if (category === 'cpu') {
                // Show only CPU cards
                if (cardCategories.includes('cpu')) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            } else if (category === 'professional') {
                // Show only professional cards
                if (cardCategories.includes('professional')) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Product card interactions
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Quick view functionality
document.querySelectorAll('.btn-overlay').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        const productPrice = card.querySelector('.price').textContent;
        
        showQuickViewModal(productName, productPrice);
    });
});

// Quick view modal
function showQuickViewModal(productName, productPrice) {
    // Create modal HTML
    const modalHTML = `
        <div class="quick-view-modal" id="quickViewModal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${productName}</h2>
                <div class="modal-body">
                    <div class="product-preview">
                        <img src="https://via.placeholder.com/400x300/1a1a1a/ffffff?text=${encodeURIComponent(productName)}" alt="${productName}">
                    </div>
                    <div class="product-details">
                        <h3>${productName}</h3>
                        <p class="modal-price">${productPrice}</p>
                        <div class="product-features">
                            <h4>Key Features:</h4>
                            <ul>
                                <li>High-performance gaming</li>
                                <li>Advanced cooling system</li>
                                <li>RGB lighting</li>
                                <li>Overclocking support</li>
                            </ul>
                        </div>
                        <div class="modal-actions">
                            <button class="btn btn-primary">Add to Cart</button>
                            <button class="btn btn-secondary">View Full Specs</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('quickViewModal');
    modal.style.display = 'flex';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add to cart functionality
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent === 'Add to Cart') {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            const productPrice = card.querySelector('.price').textContent;
            
            addToCart(productName, productPrice);
        });
    }
});

// Shopping cart functionality
let cart = [];

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCartUI();
    showNotification(`${productName} added to cart!`);
}

function updateCartUI() {
    // You can implement a cart icon with item count here
    console.log('Cart updated:', cart);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #00d4ff;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address!', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! We\'ll get back to you soon.');
    this.reset();
});

// Newsletter form
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address!', 'error');
        return;
    }
    
    showNotification('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const gpuCard = document.querySelector('.gpu-card');
    
    if (hero && gpuCard) {
        const rate = scrolled * -0.5;
        gpuCard.style.transform = `translateY(${rate}px)`;
    }
});

// Add CSS for quick view modal
const modalStyles = `
    .quick-view-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        animation: fadeIn 0.3s ease forwards;
    }
    
    .modal-content {
        background: white;
        border-radius: 20px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.8);
        animation: scaleIn 0.3s ease forwards;
    }
    
    .close-modal {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
        z-index: 1;
    }
    
    .close-modal:hover {
        color: #00d4ff;
    }
    
    .modal-content h2 {
        padding: 30px 30px 20px;
        margin: 0;
        color: #333;
        border-bottom: 2px solid #f0f0f0;
    }
    
    .modal-body {
        padding: 30px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
    }
    
    .product-preview img {
        width: 100%;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .modal-price {
        font-size: 2rem;
        font-weight: 700;
        color: #00d4ff;
        margin: 15px 0;
    }
    
    .product-features h4 {
        margin-bottom: 15px;
        color: #333;
    }
    
    .product-features ul {
        list-style: none;
        padding: 0;
    }
    
    .product-features li {
        padding: 8px 0;
        color: #666;
        position: relative;
        padding-left: 20px;
    }
    
    .product-features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #00d4ff;
        font-weight: bold;
    }
    
    .modal-actions {
        margin-top: 20px;
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
    }
    
    @keyframes fadeIn {
        to { opacity: 1; }
    }
    
    @keyframes scaleIn {
        to { transform: scale(1); }
    }
    
    @media (max-width: 768px) {
        .modal-body {
            grid-template-columns: 1fr;
            gap: 20px;
        }
        
        .modal-actions {
            flex-direction: column;
        }
    }
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize tooltips for product specs
document.querySelectorAll('.spec').forEach(spec => {
    spec.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.textContent;
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        this.addEventListener('mouseleave', () => {
            tooltip.remove();
        }, { once: true });
    });
});

// Add loading animation for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('btn-primary')) {
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 1000);
        }
    });
});

// Video player functionality
const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.featured-video');
const playButton = document.querySelector('.play-button');

if (videoContainer && video && playButton) {
    // Play button click handler
    playButton.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playButton.style.display = 'none';
        } else {
            video.pause();
            playButton.style.display = 'flex';
        }
    });

    // Video click handler
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playButton.style.display = 'none';
        } else {
            video.pause();
            playButton.style.display = 'flex';
        }
    });

    // Show play button when video ends
    video.addEventListener('ended', () => {
        playButton.style.display = 'flex';
    });

    // Show play button when video is paused
    video.addEventListener('pause', () => {
        playButton.style.display = 'flex';
    });

    // Hide play button when video is playing
    video.addEventListener('play', () => {
        playButton.style.display = 'none';
    });
}

// Console welcome message
console.log(`
🚀 GPU Master Website Loaded Successfully!
🎮 Ready to showcase the latest graphics cards
💻 Built with HTML, CSS, and JavaScript
✨ Enjoy exploring our premium GPU collection!
`); 