// Cart functionality
let cartItems = [];

// Load cart on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadCart();
});

// Load cart from API
async function loadCart() {
    try {
        const data = await CartAPI.get();
        cartItems = data.cart_items;
        displayCart(cartItems, data.total);
    } catch (error) {
        console.error('Error loading cart:', error);
        showNotification('Failed to load cart', 'error');
    }
}

// Display cart items
function displayCart(items, total) {
    const cartContainer = document.querySelector('.cart-container');
    
    if (!cartContainer) return;

    if (items.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <h2 style="color: #EAF7DA; font-size: 32px; margin-bottom: 20px;">Your cart is empty</h2>
                <a href="shop.html" style="display: inline-block; padding: 15px 40px; background: #EAF7DA; color: #374433; text-decoration: none; border-radius: 8px; font-size: 20px;">Continue Shopping</a>
            </div>
        `;
        return;
    }

    cartContainer.innerHTML = `
        <div class="cart-items">
            ${items.map(item => `
                <div class="cart-item" data-cart-id="${item.id}">
                    <img src="${item.image_url}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="cart-item-price">IDR ${formatPrice(item.price)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="cart-item-total">
                        <p>IDR ${formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
                </div>
            `).join('')}
        </div>
        <div class="cart-summary">
            <div class="cart-total">
                <h3>Total:</h3>
                <h3>IDR ${formatPrice(total)}</h3>
            </div>
            <button class="checkout-button" onclick="proceedToCheckout()">Proceed to Checkout</button>
            <button class="clear-cart-button" onclick="clearCart()">Clear Cart</button>
        </div>
    `;
}

// Update quantity
async function updateQuantity(cartItemId, newQuantity) {
    if (newQuantity < 1) {
        await removeFromCart(cartItemId);
        return;
    }

    try {
        await CartAPI.update(cartItemId, newQuantity);
        await loadCart();
        showNotification('Cart updated', 'success');
    } catch (error) {
        console.error('Error updating quantity:', error);
        showNotification('Failed to update cart', 'error');
    }
}

// Remove from cart
async function removeFromCart(cartItemId) {
    if (!confirm('Remove this item from cart?')) return;

    try {
        await CartAPI.remove(cartItemId);
        await loadCart();
        showNotification('Item removed from cart', 'success');
    } catch (error) {
        console.error('Error removing from cart:', error);
        showNotification('Failed to remove item', 'error');
    }
}

// Clear cart
async function clearCart() {
    if (!confirm('Clear all items from cart?')) return;

    try {
        await CartAPI.clear();
        await loadCart();
        showNotification('Cart cleared', 'success');
    } catch (error) {
        console.error('Error clearing cart:', error);
        showNotification('Failed to clear cart', 'error');
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cartItems.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    window.location.href = 'checkout.html';
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
