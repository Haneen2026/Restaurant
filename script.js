
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
        this.priceRange = 'all';
        this.activeFilters = {
            vegetarian: false,
            price: 'all',
            search: ''
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadHomePage();
        this.updateCartUI();
        this.setupDarkMode();
        this.setupScrollToTop();
        this.setupStickyHeader();
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
                <span>${category.icon} ${category.name}</span>
            </button>`
        ).join('');

        container.innerHTML = `
            <button class="category-btn active" data-category="all"><span>All</span></button>
            ${categoriesHTML}
        `;

        // Add event listeners to category buttons
        container.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.currentPageNum = 1;
                window.scrollTo(0, 0); // Scroll to top when category changes
                this.loadProducts();
            });
        });
    }

    setupMenuFilters() {
        // Vegetarian filter
        document.getElementById('vegetarianFilter').addEventListener('change', (e) => {
            this.vegetarianOnly = e.target.checked;
            this.activeFilters.vegetarian = e.target.checked;
            this.currentPageNum = 1;
            window.scrollTo(0, 0); // Scroll to top when filter changes
            this.loadProducts();
            this.updateFilterBadges();
            this.updateFilterSummary();
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.activeFilters.search = e.target.value;
            this.currentPageNum = 1;
            window.scrollTo(0, 0); // Scroll to top when searching
            this.loadProducts();
            this.updateFilterBadges();
            this.updateFilterSummary();
            
            // Show/hide clear button
            const clearBtn = document.getElementById('searchClearBtn');
            if (e.target.value) {
                clearBtn.style.display = 'flex';
            } else {
                clearBtn.style.display = 'none';
            }
        });

        // Search clear button
        document.getElementById('searchClearBtn').addEventListener('click', () => {
            document.getElementById('searchInput').value = '';
            this.searchTerm = '';
            this.activeFilters.search = '';
            this.currentPageNum = 1;
            window.scrollTo(0, 0);
            this.loadProducts();
            this.updateFilterBadges();
            this.updateFilterSummary();
            document.getElementById('searchClearBtn').style.display = 'none';
        });

        // Price range filter
        document.getElementById('priceRangeFilter').addEventListener('change', (e) => {
            this.priceRange = e.target.value;
            this.activeFilters.price = e.target.value;
            this.currentPageNum = 1;
            window.scrollTo(0, 0);
            this.loadProducts();
            this.updateFilterBadges();
            this.updateFilterSummary();
        });

        // Reset filters button
        document.getElementById('resetFiltersBtn').addEventListener('click', () => {
            this.resetAllFilters();
        });

        // Page size selector
        document.getElementById('pageSizeSelector').addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPageNum = 1;
            window.scrollTo(0, 0);
            this.loadProducts();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.currentPage === 'menu') {
                if (e.key === 'ArrowLeft' && this.currentPageNum > 1) {
                    e.preventDefault();
                    this.goToPage(this.currentPageNum - 1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const totalPages = Math.ceil(this.getFilteredProductsCount() / this.itemsPerPage);
                    if (this.currentPageNum < totalPages) {
                        this.goToPage(this.currentPageNum + 1);
                    }
                }
            }
        });
    }

    updateFilterBadges() {
        // Update vegetarian badge
        const vegetarianBadge = document.getElementById('vegetarianBadge');
        const vegetarianCount = this.vegetarianOnly ? 
            restaurantData.products.filter(p => p.isVegetarian).length : 0;
        
        if (vegetarianCount > 0) {
            vegetarianBadge.textContent = vegetarianCount;
            vegetarianBadge.classList.add('active');
        } else {
            vegetarianBadge.classList.remove('active');
        }

        // Update price badge
        const priceBadge = document.getElementById('priceBadge');
        let priceCount = 0;
        
        if (this.priceRange !== 'all') {
            const [minPrice, maxPrice] = this.priceRange.split('-').map(Number);
            priceCount = restaurantData.products.filter(p => 
                p.price >= minPrice && p.price <= maxPrice
            ).length;
        }
        
        if (priceCount > 0) {
            priceBadge.textContent = priceCount;
            priceBadge.classList.add('active');
        } else {
            priceBadge.classList.remove('active');
        }

        // Update search badge
        const searchBadge = document.getElementById('searchBadge');
        let searchCount = 0;
        
        if (this.searchTerm) {
            searchCount = restaurantData.products.filter(p => 
                p.name.toLowerCase().includes(this.searchTerm) ||
                p.description.toLowerCase().includes(this.searchTerm)
            ).length;
        }
        
        if (searchCount > 0) {
            searchBadge.textContent = searchCount;
            searchBadge.classList.add('active');
        } else {
            searchBadge.classList.remove('active');
        }
    }

    updateFilterSummary() {
        const filterSummary = document.getElementById('filterSummary');
        const activeFilterTags = document.getElementById('activeFilterTags');
        const resultsCount = document.getElementById('resultsCount');
        
        const hasActiveFilters = this.vegetarianOnly || this.priceRange !== 'all' || this.searchTerm;
        
        if (hasActiveFilters) {
            filterSummary.style.display = 'flex';
            
            // Clear existing tags
            activeFilterTags.innerHTML = '';
            
            // Add vegetarian tag
            if (this.vegetarianOnly) {
                const vegetarianTag = document.createElement('span');
                vegetarianTag.className = 'filter-tag';
                vegetarianTag.innerHTML = `Vegetarian <i class="fas fa-times"></i>`;
                vegetarianTag.onclick = () => this.removeFilter('vegetarian');
                activeFilterTags.appendChild(vegetarianTag);
            }
            
            // Add price tag
            if (this.priceRange !== 'all') {
                const priceTag = document.createElement('span');
                priceTag.className = 'filter-tag';
                const priceText = document.getElementById('priceRangeFilter').options[document.getElementById('priceRangeFilter').selectedIndex].text;
                priceTag.innerHTML = `${priceText} <i class="fas fa-times"></i>`;
                priceTag.onclick = () => this.removeFilter('price');
                activeFilterTags.appendChild(priceTag);
            }
            
            // Add search tag
            if (this.searchTerm) {
                const searchTag = document.createElement('span');
                searchTag.className = 'filter-tag';
                searchTag.innerHTML = `"${this.searchTerm}" <i class="fas fa-times"></i>`;
                searchTag.onclick = () => this.removeFilter('search');
                activeFilterTags.appendChild(searchTag);
            }
            
            // Update results count
            const totalProducts = this.getFilteredProductsCount();
            resultsCount.textContent = totalProducts;
        } else {
            filterSummary.style.display = 'none';
        }
    }

    getFilteredProductsCount() {
        let products = getProductsByCategory(
            this.currentCategory === 'all' ? null : parseInt(this.currentCategory)
        );

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

        // Apply price range filter
        if (this.priceRange !== 'all') {
            const [minPrice, maxPrice] = this.priceRange.split('-').map(Number);
            products = products.filter(p => 
                p.price >= minPrice && p.price <= maxPrice
            );
        }

        return products.length;
    }

    removeFilter(filterType) {
        switch(filterType) {
            case 'vegetarian':
                this.vegetarianOnly = false;
                this.activeFilters.vegetarian = false;
                document.getElementById('vegetarianFilter').checked = false;
                break;
            case 'price':
                this.priceRange = 'all';
                this.activeFilters.price = 'all';
                document.getElementById('priceRangeFilter').value = 'all';
                break;
            case 'search':
                this.searchTerm = '';
                this.activeFilters.search = '';
                document.getElementById('searchInput').value = '';
                document.getElementById('searchClearBtn').style.display = 'none';
                break;
        }
        
        this.currentPageNum = 1;
        window.scrollTo(0, 0);
        this.loadProducts();
        this.updateFilterBadges();
        this.updateFilterSummary();
    }

    resetAllFilters() {
        // Reset all filter states
        this.vegetarianOnly = false;
        this.priceRange = 'all';
        this.searchTerm = '';
        this.activeFilters = {
            vegetarian: false,
            price: 'all',
            search: ''
        };
        
        // Reset UI elements
        document.getElementById('vegetarianFilter').checked = false;
        document.getElementById('priceRangeFilter').value = 'all';
        document.getElementById('searchInput').value = '';
        document.getElementById('searchClearBtn').style.display = 'none';
        
        // Reset badges
        document.getElementById('vegetarianBadge').classList.remove('active');
        document.getElementById('priceBadge').classList.remove('active');
        document.getElementById('searchBadge').classList.remove('active');
        
        // Hide filter summary
        document.getElementById('filterSummary').style.display = 'none';
        
        this.currentPageNum = 1;
        window.scrollTo(0, 0);
        this.loadProducts();
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

            // Apply price range filter
            if (this.priceRange !== 'all') {
                const [minPrice, maxPrice] = this.priceRange.split('-').map(Number);
                products = products.filter(p => 
                    p.price >= minPrice && p.price <= maxPrice
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
        
        // Smart pagination with ellipsis - page numbers only
        const pages = this.getPaginationRange(totalPages);
        
        pages.forEach(page => {
            if (page === '...') {
                paginationHTML += '<span class="page-ellipsis">...</span>';
            } else {
                paginationHTML += `
                    <button class="page-btn ${page === this.currentPageNum ? 'active' : ''}" 
                            onclick="restaurantSystem.goToPage(${page})">
                        ${page}
                    </button>
                `;
            }
        });

        container.innerHTML = paginationHTML;
        
        // Update page info
        this.updatePageInfo();
    }

    getPaginationRange(totalPages) {
        const current = this.currentPageNum;
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= current - delta && i <= current + delta)) {
                range.push(i);
            }
        }

        range.forEach((i) => {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    }

    updatePageInfo() {
        const startItem = document.getElementById('startItem');
        const endItem = document.getElementById('endItem');
        const totalItems = document.getElementById('totalItems');
        
        const start = (this.currentPageNum - 1) * this.itemsPerPage + 1;
        const end = Math.min(this.currentPageNum * this.itemsPerPage, this.getFilteredProductsCount());
        const total = this.getFilteredProductsCount();
        
        startItem.textContent = start;
        endItem.textContent = end;
        totalItems.textContent = total;
    }

    goToPage(pageNum) {
        // Add loading state to pagination
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.classList.add('pagination-loading');
        
        this.currentPageNum = pageNum;
        window.scrollTo(0, 0); // Scroll to top when changing pages
        
        // Load products with loading state
        this.loadProducts();
        
        // Remove loading state after a delay
        setTimeout(() => {
            paginationContainer.classList.remove('pagination-loading');
        }, 800);
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

    setupScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTopBtn');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupStickyHeader() {
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    createProductCard(product) {
        const isPopular = product.isPopular || false;
        const isVegetarian = product.isVegetarian || false;
        const popularClass = isPopular ? 'popular' : '';
        const vegetarianClass = isVegetarian ? 'vegetarian' : '';
        
        return `
            <div class="product-card ${popularClass} ${vegetarianClass}" onclick="restaurantSystem.showProductDetails(${product.id})">
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

    // Policy Modal Functions
    showPolicy(type) {
        const modal = document.getElementById('policyModal');
        const title = document.getElementById('policyTitle');
        const body = document.getElementById('policyBody');
        
        const policies = {
            privacy: {
                title: 'Privacy Policy',
                content: `
                    <h3>Information We Collect</h3>
                    <p>We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support.</p>
                    
                    <h3>How We Use Your Information</h3>
                    <ul>
                        <li>To process and fulfill your orders</li>
                        <li>To provide customer support</li>
                        <li>To improve our services</li>
                        <li>To send you promotional offers (with your consent)</li>
                    </ul>
                    
                    <h3>Data Protection</h3>
                    <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                    
                    <h3>Your Rights</h3>
                    <p>You have the right to access, update, or delete your personal information at any time.</p>
                `
            },
            terms: {
                title: 'Terms of Service',
                content: `
                    <h3>Acceptance of Terms</h3>
                    <p>By accessing and using Delicious Bites Restaurant's website and services, you accept and agree to be bound by these terms.</p>
                    
                    <h3>Ordering and Payment</h3>
                    <ul>
                        <li>All orders are subject to availability</li>
                        <li>Prices are subject to change without notice</li>
                        <li>Payment must be made at the time of ordering</li>
                        <li>We accept various payment methods as displayed on our website</li>
                    </ul>
                    
                    <h3>Delivery and Service</h3>
                    <p>We strive to deliver your order within the estimated time. However, delivery times may vary due to factors beyond our control.</p>
                    
                    <h3>Cancellation and Refunds</h3>
                    <p>Cancellations must be made within 30 minutes of placing an order. Refunds are provided according to our refund policy.</p>
                    
                    <h3>Limitation of Liability</h3>
                    <p>Delicious Bites Restaurant shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
                `
            },
            refund: {
                title: 'Refund Policy',
                content: `
                    <h3>Refund Eligibility</h3>
                    <p>We want you to be completely satisfied with your order. If you're not satisfied, we're here to help.</p>
                    
                    <h3>When You Can Request a Refund</h3>
                    <ul>
                        <li>Wrong items delivered</li>
                        <li>Food quality issues</li>
                        <li>Damaged packaging</li>
                        <li>Missing items from your order</li>
                    </ul>
                    
                    <h3>How to Request a Refund</h3>
                    <p>To request a refund, please contact us within 24 hours of receiving your order:</p>
                    <ul>
                        <li>Call: +962 7 880 26543</li>
                        <li>Email: info@deliciousbites.com</li>
                        <li>Visit our restaurant in Amman, Jordan</li>
                    </ul>
                    
                    <h3>Refund Process</h3>
                    <p>Once we receive your refund request, we will review it within 24-48 hours. Approved refunds will be processed within 5-7 business days.</p>
                    
                    <h3>Non-Refundable Items</h3>
                    <ul>
                        <li>Orders cancelled after 30 minutes of placement</li>
                        <li>Perishable items that cannot be returned</li>
                        <li>Items damaged due to customer mishandling</li>
                    </ul>
                `
            }
        };
        
        const policy = policies[type];
        title.textContent = policy.title;
        body.innerHTML = policy.content;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closePolicyModal() {
        const modal = document.getElementById('policyModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
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

// Global Policy Functions
function showPolicy(type) {
    if (restaurantSystem) {
        restaurantSystem.showPolicy(type);
    }
}

function closePolicyModal() {
    if (restaurantSystem) {
        restaurantSystem.closePolicyModal();
    }
}
