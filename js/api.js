// API Configuration
const API_BASE_URL = 'http://localhost:3001/api';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Session ID management
function getSessionId() {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
}

// Products API
const ProductsAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(`/products${queryString ? '?' + queryString : ''}`);
    },

    getById: async (id) => {
        return apiCall(`/products/${id}`);
    },

    search: async (searchTerm) => {
        return apiCall(`/products?search=${encodeURIComponent(searchTerm)}`);
    },

    getByCategory: async (category) => {
        return apiCall(`/products?category=${encodeURIComponent(category)}`);
    }
};

// Cart API
const CartAPI = {
    get: async () => {
        const sessionId = getSessionId();
        return apiCall(`/cart/${sessionId}`);
    },

    add: async (productId, quantity = 1) => {
        const sessionId = getSessionId();
        return apiCall('/cart', {
            method: 'POST',
            body: JSON.stringify({
                session_id: sessionId,
                product_id: productId,
                quantity
            })
        });
    },

    update: async (cartItemId, quantity) => {
        return apiCall(`/cart/${cartItemId}`, {
            method: 'PUT',
            body: JSON.stringify({ quantity })
        });
    },

    remove: async (cartItemId) => {
        return apiCall(`/cart/${cartItemId}`, {
            method: 'DELETE'
        });
    },

    clear: async () => {
        const sessionId = getSessionId();
        return apiCall(`/cart/session/${sessionId}`, {
            method: 'DELETE'
        });
    }
};

// Orders API
const OrdersAPI = {
    create: async (orderData) => {
        return apiCall('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    },

    getById: async (orderId) => {
        return apiCall(`/orders/${orderId}`);
    },

    getAll: async () => {
        return apiCall('/orders');
    }
};

// Contact API
const ContactAPI = {
    submit: async (contactData) => {
        return apiCall('/contact', {
            method: 'POST',
            body: JSON.stringify(contactData)
        });
    }
};

// Services API
const ServicesAPI = {
    getAll: async () => {
        return apiCall('/services');
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProductsAPI, CartAPI, OrdersAPI, ContactAPI, ServicesAPI };
}
