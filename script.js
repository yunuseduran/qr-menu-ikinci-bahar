// DOM Elements
const modal = document.getElementById('menuModal');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.querySelector('.close');
const categoryCards = document.querySelectorAll('.category-card');
const menuImagesContainer = document.getElementById('menuImages');

// Category titles mapping
const categoryTitles = {
    'sicak-icecekler': 'Sıcak İçecekler',
    'soguk-icecekler': 'Soğuk İçecekler',
    'kahve-cesitleri': 'Kahve Çeşitleri',
    'vitamin-kosesi': 'Vitamin Köşesi',
    'kahvaltiliklar': 'Kahvaltılıklar',
    'yiyecekler': 'Yiyecekler',
    'pasta-cesitleri': 'Pasta Çeşitleri',
    'fast-food': 'Fast Food'
};

// Category images mapping - her kategori için ayrı resimler
const categoryImages = {
    'sicak-icecekler': [
        'images/ikincibaharmenu1.jpg'
    ],
    'soguk-icecekler': [
        'images/ikincibaharmenu2.jpg'
    ],
    'kahve-cesitleri': [
        'images/ikincibaharmenu3.jpg'
    ],
    'vitamin-kosesi': [
        'images/ikincibaharmenu4.jpg'
    ],
    'kahvaltiliklar': [
        'images/ikincibaharmenu5.jpg'
    ],
    'yiyecekler': [
        'images/ikincibaharmenu6.jpg'
    ],
    'pasta-cesitleri': [
        'images/ikincibaharmenu7.jpg'
    ],
    'fast-food': [
        'images/ikincibaharmenu8.jpg'
    ]
};

// Function to load images for a specific category
function loadCategoryImages(category) {
    const images = categoryImages[category] || [];
    menuImagesContainer.innerHTML = ''; // Clear existing images
    
    console.log(`Loading ${images.length} images for category: ${category}`);
    
    images.forEach((imageSrc, index) => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${categoryTitles[category]} - Resim ${index + 1}`;
        img.className = 'menu-image';
        
        // Add error handling
        img.onerror = function() {
            console.error('Image failed to load:', this.src);
            this.style.border = '2px solid red';
            this.style.backgroundColor = '#ffebee';
            this.style.padding = '20px';
            this.style.textAlign = 'center';
            this.style.color = 'red';
            this.style.fontSize = '14px';
            this.style.fontWeight = 'bold';
            this.innerHTML = 'Resim yüklenemedi:<br>' + this.src;
            this.style.display = 'block';
        };
        
        img.onload = function() {
            console.log('Image loaded successfully:', this.src);
            this.style.opacity = '1';
            this.style.border = 'none';
            this.style.backgroundColor = 'transparent';
        };
        
        // Set initial styles
        img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        img.style.opacity = '1';
        img.style.display = 'block';
        img.style.visibility = 'visible';
        
        // Add hover effects
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        menuImagesContainer.appendChild(img);
    });
}

// Event Listeners
categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        const title = categoryTitles[category];
        
        // Update modal title
        modalTitle.textContent = title;
        
        // Load images for this category
        loadCategoryImages(category);
        
        // Show modal
        modal.style.display = 'block';
        
        // Add animation class
        modal.classList.add('modal-open');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Debug: Log that modal is opened
        console.log('Modal opened for category:', category);
    });
});

// Close modal when clicking on X button
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Function to close modal
function closeModal() {
    modal.style.display = 'none';
    modal.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
}

// Add intersection observer for category cards animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe category cards
categoryCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add ripple effect to category cards
categoryCards.forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .category-card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .modal-open {
        animation: modalFadeIn 0.3s ease;
    }
    
    @keyframes modalFadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Add focus styles for accessibility
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('focus', function() {
                this.style.outline = '2px solid #667eea';
                this.style.outlineOffset = '2px';
            });
            
            card.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>İkinci Bahar Menüsü Yükleniyor...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 300);
        }, 500);
    });
    
    // Add loader styles
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.3s ease;
        }
        
        .loader-content {
            text-align: center;
            color: white;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loaderStyle);
    
    // Debug: Log category images mapping
    console.log('Category images mapping:', categoryImages);
}); 