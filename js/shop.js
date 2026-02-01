// Shop page functionality
let allProducts = [];

// Load products on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    setupSearch();
    setupCartButtons();
});

// Load products from API
async function loadProducts(searchTerm = '') {
    try {
        const params = searchTerm ? { search: searchTerm } : {};
        const data = await ProductsAPI.getAll(params);
        allProducts = data.products;
        displayProducts(allProducts);
    } catch (error) {
        console.error('Error loading products:', error);
        showNotification('Failed to load products', 'error');
    }
}

// Display products in grid
function displayProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #EAF7DA; font-size: 24px;">No products found</p>';
        return;
    }

    productsGrid.innerHTML = products.map(product => {
        const isComingSoon = product.description && product.description.includes('Coming Soon');
        const cleanDescription = isComingSoon ? product.description.replace('Coming Soon - ', '') : product.description;
        
        return `
        <div class="product-card ${isComingSoon ? 'coming-soon' : ''}" data-product-id="${product.id}">
            <div class="product-image-wrapper">
                <img src="${product.image_url}" alt="${product.name}" class="product-image">
                ${isComingSoon ? '<div class="coming-soon-overlay"><span>Coming Soon</span></div>' : ''}
            </div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${cleanDescription || ''}</p>
            <div class="product-footer">
                <span class="product-price">IDR ${formatPrice(product.price)}</span>
                ${!isComingSoon ? `
                <button class="cart-button" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18" cy="18" r="18" fill="#374433"/>
                        <path d="M12 8C10.8065 8 9.66193 8.47411 8.81802 9.31802C7.97411 10.16193 7.5 11.30653 7.5 12.5V14H3V30H21V14H16.5V12.5C16.5 11.30653 16.0259 10.16193 15.182 9.31802C14.3381 8.47411 13.1935 8 12 8ZM14.5 12.5V14H9.5V12.5C9.5 11.83696 9.76339 11.20107 10.2322 10.73223C10.7011 10.26339 11.337 10 12 10C12.663 10 13.2989 10.26339 13.7678 10.73223C14.2366 11.20107 14.5 11.83696 14.5 12.5ZM7.5 19V16H9.5V19H7.5ZM14.5 19V16H16.5V19H14.5Z" fill="#FFFBE9"/>
                    </svg>
                </button>
                ` : ''}
            </div>
        </div>
    `}).join('');
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            loadProducts(e.target.value);
        }, 300);
    });
}

// Setup cart buttons
function setupCartButtons() {
    updateCartCount();
}

// Add to cart
async function addToCart(productId, productName, price) {
    try {
        await CartAPI.add(productId, 1);
        showNotification(`${productName} added to cart!`, 'success');
        updateCartCount();
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Failed to add to cart', 'error');
    }
}

// Update cart count badge
async function updateCartCount() {
    try {
        const data = await CartAPI.get();
        const count = data.cart_items.reduce((sum, item) => sum + item.quantity, 0);
        
        // Update cart badge if exists
        let badge = document.querySelector('.cart-badge');
        if (!badge && count > 0) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            document.querySelector('.cart-button')?.appendChild(badge);
        }
        
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    .cart-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #f44336;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
    }
`;
document.head.appendChild(style);
