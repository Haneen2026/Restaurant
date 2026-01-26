// Restaurant System JavaScript
class RestaurantSystem {
    constructor() {
        this.cart = this.loadCart();
        this.currentPage = 'home';
        this.currentCategory = 'all';
        this.currentProduct = null;
        this.itemsPerPage = 12;
        this.currentPageNum = 1;
        this.searchTerm = '';
        this.vegetarianOnly = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadHomePage();
        this.updateCartUI();
        this.setupDarkMode();
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateToPage(page);
            });
        });

        // Mobile menu toggle
        document.getElementById('mobileMenuToggle').addEventListener('click', () => {
            document.querySelector('.nav-list').classList.toggle('active');
        });

        // Order Now buttons
        document.getElementById('orderNowBtn').addEventListener('click', () => {
            this.navigateToPage('menu');
        });

        document.getElementById('heroOrderBtn').addEventListener('click', () => {
            this.navigateToPage('menu');
        });

        document.getElementById('viewMenuBtn').addEventListener('click', () => {
            this.navigateToPage('menu');
        });

        // Cart functionality
        document.getElementById('cartBtn').addEventListener('click', () => {
            this.toggleCartDropdown();
        });

        document.getElementById('closeCart').addEventListener('click', () => {
            this.closeCartDropdown();
        });

        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.navigateToPage('checkout');
            this.closeCartDropdown();
        });

        // Dark mode toggle
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Product details back button
        document.getElementById('backToMenu').addEventListener('click', () => {
            this.navigateToPage('menu');
        });

        // Checkout form
        document.getElementById('placeOrderBtn').addEventListener('click', () => {
            this.placeOrder();
        });

        // Continue shopping button
        document.getElementById('continueShoppingBtn').addEventListener('click', () => {
            this.navigateToPage('home');
        });

        // Close cart dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const cartDropdown = document.getElementById('cartDropdown');
            const cartBtn = document.getElementById('cartBtn');
            
            if (!cartDropdown.contains(e.target) && e.target !== cartBtn) {
                this.closeCartDropdown();
            }
        });
    }

    // Navigation
    navigateToPage(page) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Show selected page
        document.getElementById(`${page}Page`).classList.add('active');

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        this.currentPage = page;

        // Scroll to top when navigating to menu page
        if (page === 'menu') {
            window.scrollTo(0, 0);
        }

        // Load page content
        switch(page) {
            case 'home':
                this.loadHomePage();
                break;
            case 'menu':
                this.loadMenuPage();
                break;
            case 'about':
                // About page content is static
                break;
            case 'contact':
                // Contact page content is static
                break;
            case 'checkout':
                this.loadCheckoutPage();
                break;
        }

        // Close mobile menu
        document.querySelector('.nav-list').classList.remove('active');
    }

    // Home Page
    loadHomePage() {
        this.loadFeaturedProducts();
        this.loadPopularProducts();
    }

    loadFeaturedProducts() {
        const container = document.getElementById('featuredProducts');
        const featuredProducts = restaurantData.products.slice(0, 4);
        
        container.innerHTML = featuredProducts.map(product => 
            this.createProductCard(product)
        ).join('');

        // Add event listeners to product cards
        this.attachProductCardListeners(container);
    }

    loadPopularProducts() {
        const container = document.getElementById('popularProducts');
        const popularProducts = getPopularProducts().slice(0, 6);
        
        container.innerHTML = popularProducts.map(product => 
            this.createProductCard(product)
        ).join('');

        // Add event listeners to product cards
        this.attachProductCardListeners(container);
    }

    // Menu Page
    loadMenuPage() {
        // Debug: Check if data is loaded
        console.log('Restaurant data loaded:', {
            categories: restaurantData.categories.length,
            products: restaurantData.products.length,
            sampleProduct: restaurantData.products[0]
        });
        
        // Force show some test products if data is available
        if (restaurantData.products.length > 0) {
            const container = document.getElementById('menuProducts');
            const testProducts = restaurantData.products.slice(0, 12); // Show first 12 products
            console.log('Force loading test products:', testProducts.length);
            
            container.innerHTML = testProducts.map(product => 
                this.createProductCard(product)
            ).join('');
            
            container.style.display = 'grid';
            container.style.visibility = 'visible';
            
            console.log('Test products HTML length:', container.innerHTML.length);
        } else {
            console.error('No products available in restaurantData');
        }
        
        this.loadCategories();
        this.loadProducts();
        this.setupMenuFilters();
    }

    loadCategories() {
        const container = document.querySelector('.category-nav');
        const categoriesHTML = restaurantData.categories.map(category => 
            `<button class="category-btn" data-category="${category.id}">
                ${category.icon} ${category.name}
            </button>`
        ).join('');

        container.innerHTML = `
            <button class="category-btn active" data-category="all">All</button>
            ${categoriesHTML}
        `;

        // Add event listeners to category buttons
        container.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.currentPageNum = 1;
                this.loadProducts();
            });
        });
    }

    setupMenuFilters() {
        // Vegetarian filter
        document.getElementById('vegetarianFilter').addEventListener('change', (e) => {
            this.vegetarianOnly = e.target.checked;
            this.currentPageNum = 1;
            this.loadProducts();
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.currentPageNum = 1;
            this.loadProducts();
        });
    }

    loadProducts() {
        this.showLoading();
        
        // Simulate API call
        setTimeout(() => {
            let products = getProductsByCategory(
                this.currentCategory === 'all' ? null : parseInt(this.currentCategory)
            );

            // Debug: Log the products data
            console.log('Current category:', this.currentCategory);
            console.log('Total products found:', products.length);
            console.log('Products:', products);

            // Apply filters
            if (this.vegetarianOnly) {
                products = products.filter(p => p.isVegetarian);
            }

            if (this.searchTerm) {
                products = products.filter(p => 
                    p.name.toLowerCase().includes(this.searchTerm) ||
                    p.description.toLowerCase().includes(this.searchTerm)
                );
            }

            // Pagination
            const totalProducts = products.length;
            const totalPages = Math.ceil(totalProducts / this.itemsPerPage);
            const startIndex = (this.currentPageNum - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            const paginatedProducts = products.slice(startIndex, endIndex);

            // Debug: Log pagination info
            console.log('Paginated products:', paginatedProducts.length);

            // Render products
            const container = document.getElementById('menuProducts');
            
            // Debug: Check if we have products
            if (paginatedProducts.length === 0) {
                console.log('No products found, showing fallback message');
                container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found in this category.</div>';
            } else {
                console.log('Rendering products:', paginatedProducts.length);
                container.innerHTML = paginatedProducts.map(product => 
                    this.createProductCard(product)
                ).join('');
            }

            // Add event listeners
            this.attachProductCardListeners(container);

            // Render pagination
            this.renderPagination(totalPages);

            this.hideLoading();
        }, 500);
    }

    renderPagination(totalPages) {
        const container = document.getElementById('pagination');
        
        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // Previous button
        if (this.currentPageNum > 1) {
            paginationHTML += `<button class="page-btn" onclick="restaurantSystem.goToPage(${this.currentPageNum - 1})">Previous</button>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<button class="page-btn ${i === this.currentPageNum ? 'active' : ''}" onclick="restaurantSystem.goToPage(${i})">${i}</button>`;
        }

        // Next button
        if (this.currentPageNum < totalPages) {
            paginationHTML += `<button class="page-btn" onclick="restaurantSystem.goToPage(${this.currentPageNum + 1})">Next</button>`;
        }

        container.innerHTML = paginationHTML;
    }

    goToPage(pageNum) {
        this.currentPageNum = pageNum;
        this.loadProducts();
    }

    // Product Details
    showProductDetails(productId) {
        const product = restaurantData.products.find(p => p.id === productId);
        if (!product) return;

        this.currentProduct = product;
        this.navigateToPage('productDetails');

        const container = document.getElementById('productDetails');
        container.innerHTML = `
            <div class="product-details">
                <div>
                    <img src="${product.image}" alt="${product.name}" class="product-detail-image">
                </div>
                <div class="product-detail-info">
                    <h1>${product.name}</h1>
                    <div class="product-detail-price">${formatPrice(product.price)}</div>
                    <div class="product-rating">
                        ${this.renderStars(product.rating)}
                        <span>${product.rating}</span>
                    </div>
                    <p class="product-detail-description">${product.description}</p>
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="restaurantSystem.updateQuantity(${product.id}, -1)">-</button>
                        <span class="quantity-display" id="quantity-${product.id}">1</span>
                        <button class="quantity-btn" onclick="restaurantSystem.updateQuantity(${product.id}, 1)">+</button>
                    </div>
                    <button class="add-to-cart-detail-btn" onclick="restaurantSystem.addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;

        // Load related products
        this.loadRelatedProducts(product.id, product.categoryId);
    }

    loadRelatedProducts(productId, categoryId) {
        const container = document.getElementById('relatedProducts');
        const relatedProducts = getRelatedProducts(productId, categoryId);
        
        container.innerHTML = relatedProducts.map(product => 
            this.createProductCard(product)
        ).join('');

        this.attachProductCardListeners(container);
    }

    // Cart Management
    addToCart(productId, quantity = 1) {
        const product = restaurantData.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartUI();
        this.showToast(`${product.name} added to cart!`);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.showToast('Item removed from cart');
    }

    updateQuantity(productId, change) {
        const quantityDisplay = document.getElementById(`quantity-${productId}`);
        if (quantityDisplay) {
            let currentQuantity = parseInt(quantityDisplay.textContent);
            currentQuantity = Math.max(1, currentQuantity + change);
            quantityDisplay.textContent = currentQuantity;
        }
    }

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        // Update cart count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update cart items
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-quantity">Quantity: ${item.quantity}</div>
                    </div>
                    <div class="cart-item-actions">
                        <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
                        <button class="remove-item-btn" onclick="restaurantSystem.removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Update cart total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = formatPrice(total);
    }

    toggleCartDropdown() {
        const dropdown = document.getElementById('cartDropdown');
        dropdown.classList.toggle('active');
    }

    closeCartDropdown() {
        document.getElementById('cartDropdown').classList.remove('active');
    }

    // Checkout
    loadCheckoutPage() {
        if (this.cart.length === 0) {
            this.showToast('Your cart is empty!', 'warning');
            this.navigateToPage('menu');
            return;
        }

        const container = document.getElementById('checkoutOrderSummary');
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + tax;

        container.innerHTML = `
            ${this.cart.map(item => `
                <div class="order-item">
                    <div class="order-item-info">
                        <div class="order-item-name">${item.name}</div>
                        <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                    </div>
                    <div class="order-item-price">${formatPrice(item.price * item.quantity)}</div>
                </div>
            `).join('')}
            <div class="order-item">
                <div><strong>Subtotal</strong></div>
                <div>${formatPrice(subtotal)}</div>
            </div>
            <div class="order-item">
                <div><strong>Tax (10%)</strong></div>
                <div>${formatPrice(tax)}</div>
            </div>
            <div class="order-item">
                <div><strong>Total</strong></div>
                <div><strong>${formatPrice(total)}</strong></div>
            </div>
        `;
    }

    async placeOrder() {
        const form = document.getElementById('checkoutForm');
        const name = document.getElementById('customerName').value;
        const phone = document.getElementById('customerPhone').value;
        const address = document.getElementById('customerAddress').value;

        // Validation
        if (!name || !phone || !address) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        // Calculate order totals
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        // Create order object
        const order = {
            orderNumber: this.generateOrderNumber(),
            customerName: name,
            customerPhone: phone,
            customerAddress: address,
            items: this.cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity
            })),
            subtotal: subtotal,
            tax: tax,
            total: total,
            orderDate: new Date().toISOString(),
            status: 'Pending'
        };

        try {
            // Save to Google Sheets (simulated)
            await this.saveOrderToGoogleSheets(order);
            
            // Clear cart
            this.cart = [];
            this.saveCart();
            this.updateCartUI();

            // Show confirmation
            this.showOrderConfirmation(order.orderNumber);
            
            // Reset form
            form.reset();
            
        } catch (error) {
            this.showToast('Failed to place order. Please try again.', 'error');
        }
    }

    async saveOrderToGoogleSheets(order) {
        // Simulate API call to Google Sheets
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Order saved to Google Sheets:', order);
                // In a real implementation, you would use Google Sheets API here
                resolve();
            }, 1000);
        });
    }

    showOrderConfirmation(orderNumber) {
        document.getElementById('orderNumber').textContent = orderNumber;
        this.navigateToPage('confirmation');
        this.showToast('Order placed successfully!', 'success');
    }

    generateOrderNumber() {
        return 'ORD' + Date.now().toString().slice(-8);
    }

    // Utility Functions
    createProductCard(product) {
        return `
            <div class="product-card" onclick="restaurantSystem.showProductDetails(${product.id})">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${truncateText(product.description, 50)}</p>
                    <div class="product-rating">
                        ${this.renderStars(product.rating)}
                        <span>${product.rating}</span>
                    </div>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); restaurantSystem.addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    attachProductCardListeners(container) {
        // Event listeners are attached inline in the HTML
    }

    showLoading() {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('menuProducts').style.display = 'none';
        document.getElementById('pagination').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
        const menuProducts = document.getElementById('menuProducts');
        menuProducts.style.display = 'grid';
        menuProducts.style.visibility = 'visible';
        document.getElementById('pagination').style.display = 'flex';
        
        // Debug: Log the number of products loaded
        const productCards = document.querySelectorAll('#menuProducts .product-card');
        console.log('Products loaded:', productCards.length);
        console.log('Menu products container display:', menuProducts.style.display);
        console.log('Menu products container HTML:', menuProducts.innerHTML.substring(0, 200) + '...');
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Dark Mode
    setupDarkMode() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            document.body.classList.add('dark-mode');
            this.updateDarkModeToggle(true);
        }
    }

    toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        this.updateDarkModeToggle(isDarkMode);
    }

    updateDarkModeToggle(isDarkMode) {
        const icon = document.querySelector('#darkModeToggle i');
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Local Storage
    saveCart() {
        localStorage.setItem('restaurantCart', JSON.stringify(this.cart));
    }

    loadCart() {
        const savedCart = localStorage.getItem('restaurantCart');
        return savedCart ? JSON.parse(savedCart) : [];
    }
}

// Initialize the restaurant system
let restaurantSystem;
document.addEventListener('DOMContentLoaded', () => {
    // Simple test - load menu data directly
    console.log('Loading menu data...');
    
    // Force load the menu data
    if (typeof loadDefaultMenuData === 'function') {
        loadDefaultMenuData();
        console.log('Menu data loaded:', {
            categories: restaurantData.categories.length,
            products: restaurantData.products.length
        });
    }
    
    restaurantSystem = new RestaurantSystem();
});
