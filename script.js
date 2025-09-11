// Add these functions at the beginning of your script.js/scripts.js file
function showNotification(message) {
    const notification = document.getElementById('cartNotification');
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function addToCart(productName, productPrice) {
    cartCount++;
    updateCartCounter();
    showNotification(`${productName} added to cart!`);
}

// Update the cart counter display
function updateCartCounter() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
    }
}

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
                // Show only GPU cards (all cards with 'gpu' category)
                if (cardCategories.includes('gpu')) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            } else if (category === 'cpu') {
                // Show only CPU cards (all cards with 'cpu' category)
                if (cardCategories.includes('cpu')) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            } else if (category === 'ram') {
                // Show only RAM cards (all cards with 'ram' category)
                if (cardCategories.includes('ram')) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            } else if (category === 'motherboard') {
                // Show only motherboard cards (all cards with 'motherboard' category)
                if (cardCategories.includes('motherboard')) {
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
        
        // Update category counter
        updateCategoryCounter(category);
    });
});

// Function to update category counter
function updateCategoryCounter(category) {
    let visibleCount = 0;
    
    productCards.forEach(card => {
        if (card.style.display !== 'none') {
            visibleCount++;
        }
    });
    
    // Update the section title to show category and count
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        const categoryNames = {
            'all': 'All Products',
            'popular': 'Most Popular',
            'gpu': 'Graphics Cards',
            'cpu': 'Processors',
            'ram': 'RAM',
            'motherboard': 'Motherboards',
            'professional': 'Professional'
        };
        
        const categoryName = categoryNames[category] || 'Products';
        sectionTitle.textContent = `${categoryName} (${visibleCount} items)`;
    }
}

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
        const productDescription = card.querySelector('.product-description').textContent;
        const productSpecs = Array.from(card.querySelectorAll('.spec')).map(spec => spec.textContent);
        const productDetails = Array.from(card.querySelectorAll('.detail-item')).map(item => ({
            label: item.querySelector('.detail-label').textContent.replace(':', ''),
            value: item.querySelector('.detail-value').textContent
        }));
        
        showQuickViewModal(productName, productPrice, productDescription, productSpecs, productDetails);
    });
});

// Quick view modal
function showQuickViewModal(productName, productPrice, productDescription, productSpecs, productDetails) {
    // Determine if it's a GPU or CPU based on product name
    let productImage = "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=" + encodeURIComponent(productName);
    
    if (productName.toLowerCase().includes('rtx') || productName.toLowerCase().includes('rx') || productName.toLowerCase().includes('gpu') || productName.toLowerCase().includes('graphics')) {
        productImage = "https://cdn.mos.cms.futurecdn.net/GSQCwybr57YhjmxK6TP5rM.png";
    } else if (productName.toLowerCase().includes('ryzen') || productName.toLowerCase().includes('cpu') || productName.toLowerCase().includes('processor')) {
        productImage = "https://m.media-amazon.com/images/I/716hAjT1uUL._UF350,350_QL80_.jpg";
    }
    
    // Create modal HTML
    const modalHTML = `
        <div class="quick-view-modal" id="quickViewModal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${productName}</h2>
                <div class="modal-body">
                    <div class="product-preview">
                        <img src="${productImage}" alt="${productName}">
                    </div>
                    <div class="product-details">
                        <h3>${productName}</h3>
                        <p class="modal-description">${productDescription}</p>
                        <p class="modal-price">${productPrice}</p>
                        
                        <div class="product-specs-modal">
                            <h4>Key Specifications:</h4>
                            <div class="specs-grid">
                                ${productSpecs.map(spec => `<span class="spec-badge">${spec}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="product-features">
                            <h4>Technical Details:</h4>
                            <div class="details-list">
                                ${productDetails.map(detail => `
                                    <div class="detail-row">
                                        <span class="detail-label">${detail.label}:</span>
                                        <span class="detail-value">${detail.value}</span>
                                    </div>
                                `).join('')}
                            </div>
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
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Show modal with proper positioning
    const modal = document.getElementById('quickViewModal');
    modal.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '10000';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';
    
    // Trigger animations
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.classList.add('show');
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        modal.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            modal.classList.remove('show');
            document.body.style.overflow = '';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.style.opacity = '0';
            modal.classList.remove('show');
            document.body.style.overflow = '';
            setTimeout(() => {
                modal.remove();
            }, 300);
            document.removeEventListener('keydown', closeOnEscape);
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
let cartItems = [];
let cartCount = 0;

// Add to Cart functionality
function addToCart(product) {
    cartItems.push(product);
    cartCount++;
    updateCartCounter();
    showNotification(`${product.name} added to cart!`);
}

// Update cart counter display
function updateCartCounter() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
    }
}

// Quick View functionality
function showQuickView(productData) {
    const modal = document.getElementById('quickViewModal');
    const modalContent = modal.querySelector('.modal-product-info');
    
    // Create modal content
    const content = `
        <div class="quick-view-layout">
            <div class="quick-view-image">
                <img src="${productData.image}" alt="${productData.name}">
            </div>
            <div class="quick-view-details">
                <div class="product-brand">${productData.brand}</div>
                <h3>${productData.name}</h3>
                <p class="product-description">${productData.description}</p>
                <div class="product-specs">
                    ${productData.specs.map(spec => `<span class="spec">${spec}</span>`).join('')}
                </div>
                <div class="product-price">
                    <span class="price">${productData.price}</span>
                </div>
                <div class="quick-view-actions">
                    <button class="btn btn-primary add-to-cart-modal" data-product='${JSON.stringify(productData)}'>
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';

    // Add event listener for Add to Cart button in modal
    const addToCartBtn = modalContent.querySelector('.add-to-cart-modal');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const productData = JSON.parse(addToCartBtn.getAttribute('data-product'));
            addToCart(productData);
        });
    }
}

// Initialize product buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');
            const product = {
                name: card.querySelector('h3').textContent,
                price: card.querySelector('.price').textContent,
                image: card.querySelector('img').src,
                brand: card.querySelector('.product-brand').textContent,
                description: card.querySelector('.product-description').textContent,
                specs: Array.from(card.querySelectorAll('.spec')).map(spec => spec.textContent)
            };
            addToCart(product);
        });
    });

    // Quick View buttons
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');
            const product = {
                name: card.querySelector('h3').textContent,
                price: card.querySelector('.price').textContent,
                image: card.querySelector('img').src,
                brand: card.querySelector('.product-brand').textContent,
                description: card.querySelector('.product-description').textContent,
                specs: Array.from(card.querySelectorAll('.spec')).map(spec => spec.textContent)
            };
            showQuickView(product);
        });
    });

    // Wishlist buttons
    document.querySelectorAll('.add-wishlist').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            this.classList.toggle('active');
            showNotification(`${productName} ${this.classList.contains('active') ? 'added to' : 'removed from'} wishlist`);
        });
    });

    // Close modal
    const modal = document.getElementById('quickViewModal');
    const closeModal = document.getElementById('closeModal');
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});

// Add these styles to support the new functionality
const styles = `
    .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ff4444;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 12px;
        display: none;
    }

    .quick-view-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        padding: 2rem;
    }

    .quick-view-image img {
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .quick-view-details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .add-wishlist.active {
        color: #ff4444;
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00d4ff;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease forwards;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
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

// Windows XP Task Manager Functionality
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

// Task Manager Controls
function toggleTaskManager() {
    const taskManager = document.getElementById('xpTaskManager');
    if (taskManager.style.display === 'none') {
        taskManager.style.display = 'block';
        taskManager.style.opacity = '1';
        taskManager.style.transform = 'translate(-50%, -50%) scale(1)';
        // Reset position
        xOffset = 0;
        yOffset = 0;
        setTranslate(0, 0, taskManager);
    } else {
        closeTaskManager();
    }
}

function minimizeTaskManager() {
    const taskManager = document.getElementById('xpTaskManager');
    taskManager.classList.toggle('minimized');
}

function maximizeTaskManager() {
    const taskManager = document.getElementById('xpTaskManager');
    taskManager.classList.toggle('maximized');
}

function closeTaskManager() {
    const taskManager = document.getElementById('xpTaskManager');
    taskManager.style.opacity = '0';
    taskManager.style.transform = 'translate(-50%, -50%) scale(0.8)';
    setTimeout(() => {
        taskManager.style.display = 'none';
    }, 300);
}

function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Dragging functionality
function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }
    
    if (e.target === document.querySelector('.task-manager-header')) {
        isDragging = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }
        
        xOffset = currentX;
        yOffset = currentY;
        
        setTranslate(currentX, currentY, document.getElementById('xpTaskManager'));
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
}

// Animated performance meters
function animatePerformanceMeters() {
    const meters = document.querySelectorAll('.meter-fill');
    const values = document.querySelectorAll('.meter-value');
    
    meters.forEach((meter, index) => {
        const currentWidth = parseInt(meter.style.width);
        let newWidth;
        
        // Different ranges for different meters
        switch(index) {
            case 0: // GPU Usage - higher range
                newWidth = Math.floor(Math.random() * 40) + 50; // 50-90%
                break;
            case 1: // CPU Usage - moderate range
                newWidth = Math.floor(Math.random() * 35) + 30; // 30-65%
                break;
            case 2: // Memory Usage - steady range
                newWidth = Math.floor(Math.random() * 25) + 60; // 60-85%
                break;
            case 3: // Network - lower range
                newWidth = Math.floor(Math.random() * 30) + 20; // 20-50%
                break;
            default:
                newWidth = Math.floor(Math.random() * 30) + 40;
        }
        
        // Smooth transition
        meter.style.transition = 'width 1s ease';
        meter.style.width = newWidth + '%';
        values[index].textContent = newWidth + '%';
        
        // Add pulse effect
        meter.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            meter.style.animation = '';
        }, 500);
    });
    
    // Update system info with realistic values
    updateSystemInfo();
}

// Update system information
function updateSystemInfo() {
    const totalMemory = 32768;
    const usedMemory = Math.floor(Math.random() * 8000) + 20000; // 20-28GB used
    const availableMemory = totalMemory - usedMemory;
    const cacheMemory = Math.floor(Math.random() * 5000) + 12000; // 12-17GB cache
    
    const infoValues = document.querySelectorAll('.info-value');
    if (infoValues.length >= 3) {
        infoValues[0].textContent = totalMemory.toLocaleString() + ' MB';
        infoValues[1].textContent = availableMemory.toLocaleString() + ' MB';
        infoValues[2].textContent = cacheMemory.toLocaleString() + ' MB';
    }
}

// Initialize task manager
document.addEventListener('DOMContentLoaded', function() {
    const taskManager = document.getElementById('xpTaskManager');
    const header = document.querySelector('.task-manager-header');
    
    if (taskManager && header) {
        // Add event listeners for dragging
        header.addEventListener('mousedown', dragStart);
        header.addEventListener('touchstart', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);
        
        // Start performance meter animation
        setInterval(animatePerformanceMeters, 3000);
        
        // Add keyboard shortcut to show/hide task manager (Ctrl+Alt+Delete)
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.altKey && e.key === 'Delete') {
                e.preventDefault();
                toggleTaskManager();
            }
        });
        
        // Add Windows XP startup sound effect (visual only)
        setTimeout(() => {
            const toggleBtn = document.querySelector('.xp-toggle-btn');
            if (toggleBtn) {
                toggleBtn.style.animation = 'xpGlow 1s ease-in-out';
                setTimeout(() => {
                    toggleBtn.style.animation = '';
                }, 1000);
            }
        }, 2000);
        
        // Add hover effects to process items
        const processItems = document.querySelectorAll('.process-item');
        processItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.background = '#e8f4fd';
                this.style.borderLeft = '3px solid #0a246a';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.background = '';
                this.style.borderLeft = '';
            });
        });
    }
    
    // Initialize category counter for products page
    if (window.location.pathname.includes('products.html')) {
        updateCategoryCounter('all');
    }
});

// Add CSS animations
const taskManagerStyles = `
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }
    
    @keyframes taskManagerAppear {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes xpGlow {
        0% { box-shadow: 0 0 0 1px #ffffff, 0 0 0 2px #0a246a, 0 8px 16px rgba(0, 0, 0, 0.3); }
        50% { box-shadow: 0 0 0 1px #ffffff, 0 0 0 2px #0a246a, 0 8px 16px rgba(0, 212, 255, 0.3); }
        100% { box-shadow: 0 0 0 1px #ffffff, 0 0 0 2px #0a246a, 0 8px 16px rgba(0, 0, 0, 0.3); }
    }
    
    .xp-task-manager {
        animation: taskManagerAppear 0.5s ease;
    }
    
    .xp-task-manager:hover {
        animation: xpGlow 2s ease-in-out infinite;
    }
    
    .meter-fill {
        position: relative;
        overflow: hidden;
    }
    
    .meter-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
`;

// Inject task manager styles
const taskManagerStyleSheet = document.createElement('style');
taskManagerStyleSheet.textContent = taskManagerStyles;
document.head.appendChild(taskManagerStyleSheet);


// Add this inside the filter-controls div in products.html
<div class="filter-controls">
    <div class="search-box">
        <input type="text" placeholder="Search products..." class="search-input" />
        <i class="fas fa-search"></i>
    </div>
    <div class="sort-select">
        <select>
            <option value="">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
        </select>
    </div>
</div>

// Console welcome message
console.log(`
🚀 GPU Master Website Loaded Successfully!
🎮 Ready to showcase the latest graphics cards
💻 Built with HTML, CSS, and JavaScript
✨ Enjoy exploring our premium GPU collection!
🖥️ Windows XP Task Manager effect activated!
`);

// Add visibility class to trigger animations
setTimeout(() => {
    document.querySelector('.hero-title').style.opacity = '1';
    document.querySelector('.hero-subtitle').style.opacity = '1';
    document.querySelector('.hero-buttons').style.opacity = '1';
    document.querySelector('.hero-image').style.opacity = '1';
    document.querySelector('.gpu-card').style.opacity = '1';
}, 100);

// Initialize fan animations
const fans = document.querySelectorAll('.fan');
fans.forEach((fan, index) => {
    fan.style.animationDelay = `${index * 0.2}s`;
});

// Add GPU lights pulsing effect
setInterval(() => {
    const lights = document.querySelector('.gpu-lights');
    if (lights) {
        lights.style.opacity = '0.4';
        setTimeout(() => {
            lights.style.opacity = '0.7';
        }, 1000);
    }
}, 2000);

// Add this after DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.querySelector('.search-input');
    const sortSelect = document.querySelector('.sort-select select');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            productCards.forEach(card => {
                // Reset display
                card.style.display = 'none';
                card.style.opacity = '0';

                const cardCategories = card.getAttribute('data-category').split(' ');

                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                }
            });

            updateProductCount();
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', sortProducts);
    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');

        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();
            const cardCategories = card.getAttribute('data-category').split(' ');
            
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || cardCategories.includes(activeCategory);

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });

        updateProductCount();
    }

    function sortProducts() {
        const sortBy = sortSelect.value;
        const productsGrid = document.querySelector('.products-grid');
        const products = Array.from(productCards);

        products.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));

            if (sortBy === 'price-low') {
                return priceA - priceB;
            } else if (sortBy === 'price-high') {
                return priceB - priceA;
            }
            return 0;
        });

        // Re-append sorted products
        products.forEach(product => {
            productsGrid.appendChild(product);
        });
    }

    function updateProductCount() {
        const visibleProducts = Array.from(productCards).filter(
            card => card.style.display !== 'none'
        ).length;
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
        const categoryName = getCategoryName(activeCategory);
        
        const title = document.querySelector('.section-title');
        if (title) {
            title.textContent = `${categoryName} (${visibleProducts} items)`;
        }
    }

    function getCategoryName(category) {
        const categories = {
            'all': 'All Products',
            'popular': 'Most Popular',
            'gpu': 'Graphics Cards',
            'cpu': 'Processors',
            'ram': 'RAM',
            'motherboard': 'Motherboards',
            'professional': 'Professional'
        };
        return categories[category] || 'Products';
    }

    // Initialize with all products shown
    updateProductCount();
});

// Product filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Add click event listener to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');

            // Filter products
            productCards.forEach(card => {
                // Hide all cards first
                card.style.display = 'none';
                
                // Get categories of the card
                const cardCategories = card.getAttribute('data-category').split(' ');
                
                // Show card if it matches the selected category or if "all" is selected
                if (selectedCategory === 'all' || cardCategories.includes(selectedCategory)) {
                    card.style.display = 'block';
                    // Add animation
                    card.style.animation = 'fadeInProduct 0.5s ease forwards';
                }
            });

            // Update product count in title
            updateProductCount(selectedCategory);
        });
    });

    // Function to update product count in title
    function updateProductCount(category) {
        const visibleProducts = document.querySelectorAll('.product-card[style="display: block"]').length;
        const sectionTitle = document.querySelector('.section-title');
        
        const categoryNames = {
            'all': 'All Products',
            'popular': 'Most Popular',
            'gpu': 'Graphics Cards',
            'cpu': 'Processors',
            'ram': 'RAM',
            'motherboard': 'Motherboards',
            'professional': 'Professional'
        };

        if (sectionTitle) {
            sectionTitle.textContent = `${categoryNames[category]} (${visibleProducts} items)`;
        }
    }

    // Initialize with "All Products" count
    updateProductCount('all');
});

// Add these CSS keyframes to your styles.css
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInProduct {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .product-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Blog pagination functionality
document.addEventListener('DOMContentLoaded', function() {
    const paginationLinks = document.querySelectorAll('.pagination a');
    const blogPosts = document.querySelectorAll('.blog-post');
    const postsPerPage = 3; // Number of posts to show per page

    if (paginationLinks.length && blogPosts.length) {
        // Initially hide all posts except first page
        showPage(1);

        // Add click event listeners to pagination links
        paginationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                paginationLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');

                // If it's the "Next" button
                if (this.classList.contains('next')) {
                    const currentPage = getCurrentPage();
                    if (currentPage < Math.ceil(blogPosts.length / postsPerPage)) {
                        showPage(currentPage + 1);
                        // Update active state of number links
                        paginationLinks.forEach(l => {
                            if (l.textContent == currentPage + 1) {
                                l.classList.add('active');
                            }
                        });
                    }
                } else {
                    // Show the selected page
                    showPage(parseInt(this.textContent));
                }
            });
        });
    }

    function showPage(pageNum) {
        const start = (pageNum - 1) * postsPerPage;
        const end = start + postsPerPage;

        blogPosts.forEach((post, index) => {
            if (index >= start && index < end) {
                post.style.display = 'block';
                post.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                post.style.display = 'none';
            }
        });

        // Scroll to top of blog section
        document.querySelector('.blog-section').scrollIntoView({ behavior: 'smooth' });
    }

    function getCurrentPage() {
        let currentPage = 1;
        paginationLinks.forEach(link => {
            if (link.classList.contains('active') && !link.classList.contains('next')) {
                currentPage = parseInt(link.textContent);
            }
        });
        return currentPage;
    }
});