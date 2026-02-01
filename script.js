
// Restaurant System JavaScript
class RestaurantSystem {
    constructor() {
        console.log('RestaurantSystem constructor called');
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
        
        console.log('RestaurantSystem properties initialized, calling init()...');
        this.init();
    }

    init() {
        console.log('RestaurantSystem init() called');
        this.setupEventListeners();
        console.log('Event listeners setup, calling loadHomePage()...');
        this.loadHomePage();
        console.log('Home page loaded');
        this.setupDarkMode();
        this.setupScrollToTop();
        this.setupStickyHeader();
        console.log('RestaurantSystem init() completed');
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

        // Cart functionality - disabled
        document.getElementById('cartBtn').addEventListener('click', () => {
            // Cart functionality removed
        });

        // Dark mode toggle
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Product details back button
        const backToMenu = document.getElementById('backToMenu');
        if (backToMenu) {
            backToMenu.addEventListener('click', () => {
                this.navigateToPage('menu');
            });
        }

        // Checkout form - removed

        // Close dropdown when clicking outside - removed for cart

        // Cart UI event listeners - removed
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
        console.log('Loading featured products...');
        const container = document.getElementById('featuredProducts');
        
        if (!container) {
            console.error('Featured products container not found!');
            return;
        }
        
        if (!restaurantData || !restaurantData.products || restaurantData.products.length === 0) {
            console.error('No restaurant data available for featured products!');
            container.innerHTML = '<p>No products available</p>';
            return;
        }
        
        const featuredProducts = restaurantData.products.slice(0, 4);
        console.log('Found featured products:', featuredProducts.length);
        
        container.innerHTML = featuredProducts.map(product => 
            this.createProductCard(product)
        ).join('');

        // Add event listeners to product cards
        this.attachProductCardListeners(container);
        console.log('Featured products loaded successfully');
    }

    loadPopularProducts() {
        console.log('Loading popular products...');
        const container = document.getElementById('popularProducts');
        
        if (!container) {
            console.error('Popular products container not found!');
            return;
        }
        
        if (!restaurantData || !restaurantData.products || restaurantData.products.length === 0) {
            console.error('No restaurant data available for popular products!');
            container.innerHTML = '<p>No products available</p>';
            return;
        }
        
        const popularProducts = getPopularProducts().slice(0, 6);
        console.log('Found popular products:', popularProducts.length);
        
        container.innerHTML = popularProducts.map(product => 
            this.createProductCard(product)
        ).join('');

        // Add event listeners to product cards
        this.attachProductCardListeners(container);
        console.log('Popular products loaded successfully');
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
        // Find the product
        let product = restaurantData.products.find(p => p.id === productId);
        
        // If not found in restaurantData, check largeRestaurantMenu
        if (!product && typeof largeRestaurantMenu !== 'undefined') {
            product = largeRestaurantMenu.products.find(p => p.id === productId);
        }
        
        if (!product) {
            console.error('Product not found');
            return;
        }
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });
        
        // Show product details page
        document.getElementById('productDetailsPage').classList.add('active');
        
        // Update current product
        this.currentProduct = product;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Load product details into the page
        this.displayProductDetails(product);
    }

    // Display product details on the page
    displayProductDetails(product) {
        const productDetailsContainer = document.getElementById('productDetails');
        
        const productImage = product.image || product.image_url || 'https://via.placeholder.com/400x300?text=No+Image';
        const ratingStars = this.renderStars(product.rating || 4.5);
        
        // Generate badges
        let badges = '';
        if (product.isVegetarian) {
            badges += '<span class="badge badge-vegetarian">🥬 Vegetarian</span>';
        }
        if (product.isPopular) {
            badges += '<span class="badge badge-popular">⭐ Popular</span>';
        }
        
        productDetailsContainer.innerHTML = `
            <div class="product-details-container">
                <div class="product-details-image">
                    <img src="${productImage}" alt="${product.name}" class="product-detail-image">
                    ${badges}
                </div>
                <div class="product-details-info">
                    <h1 class="product-detail-title">${product.name}</h1>
                    <div class="product-detail-rating">
                        ${ratingStars}
                        <span class="rating-text">${product.rating || 4.5} (${Math.floor(Math.random() * 100) + 50} reviews)</span>
                    </div>
                    <p class="product-detail-description">${product.description}</p>
                    <div class="product-detail-price">
                        <span class="price-label">Price:</span>
                        <span class="price-amount">${formatPrice(product.price)}</span>
                    </div>
                    
                    <div class="product-detail-section">
                        <h3>Ingredients</h3>
                        <p class="ingredients-list">${this.getProductIngredients(product)}</p>
                    </div>
                    
                    <div class="product-actions">
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="restaurantSystem.decreaseQuantity()">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" id="productQuantity" value="1" min="1" readonly class="qty-input">
                            <button class="qty-btn" onclick="restaurantSystem.increaseQuantity()">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="btn-add-to-cart" onclick="restaurantSystem.addProductToCart()">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Quantity controls
    increaseQuantity() {
        const input = document.getElementById('productQuantity');
        input.value = parseInt(input.value) + 1;
    }

    decreaseQuantity() {
        const input = document.getElementById('productQuantity');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    }

    // Add product to cart from details page
    addProductToCart() {
        if (!shoppingCart || !this.currentProduct) {
            this.showToast('Error: Cart system not ready', 'error');
            return;
        }
        
        const quantity = parseInt(document.getElementById('productQuantity').value);
        const product = this.currentProduct;
        const productImage = product.image || product.image_url || 'https://via.placeholder.com/300x200?text=No+Image';
        
        shoppingCart.addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: productImage
        }, quantity);
        
        // Reset quantity
        document.getElementById('productQuantity').value = 1;
        
        this.showToast(`${product.name} added to cart!`, 'success');
    }

    // Get product ingredients
    getProductIngredients(product) {
        const baseIngredients = {
            'meat': ['Premium beef', 'Aromatic spices', 'Fresh herbs', 'Seasonal vegetables', 'Signature sauce'],
            'chicken': ['Fresh chicken breast', 'Marinade blend', 'Authentic spices', 'Herbs', 'Fresh vegetables'],
            'fish': ['Fresh caught fish', 'Lemon juice', 'Mediterranean herbs', 'Extra virgin olive oil', 'Sea salt'],
            'vegetarian': ['Fresh vegetables', 'Organic herbs', 'Premium spices', 'Extra virgin olive oil', 'Sea salt'],
            'pasta': ['Premium pasta', 'San Marzano tomatoes', 'Parmesan cheese', 'Fresh basil', 'Extra virgin olive oil'],
            'dessert': ['Sugar', 'Premium flour', 'Butter', 'Farm fresh eggs', 'Vanilla extract'],
            'beverage': ['Natural ingredients', 'Filtered water', 'Natural sweeteners', 'Fresh flavors']
        };
        
        if (product.ingredients) {
            return Array.isArray(product.ingredients) ? product.ingredients.join(', ') : product.ingredients;
        }
        
        // Generate based on product name
        const productName = product.name.toLowerCase();
        let ingredients = baseIngredients.vegetarian;
        
        if (productName.includes('beef') || productName.includes('meat')) {
            ingredients = baseIngredients.meat;
        } else if (productName.includes('chicken')) {
            ingredients = baseIngredients.chicken;
        } else if (productName.includes('fish') || productName.includes('salmon') || productName.includes('tuna')) {
            ingredients = baseIngredients.fish;
        } else if (productName.includes('pasta')) {
            ingredients = baseIngredients.pasta;
        } else if (productName.includes('dessert') || productName.includes('cake') || productName.includes('ice cream')) {
            ingredients = baseIngredients.dessert;
        } else if (productName.includes('drink') || productName.includes('juice') || productName.includes('coffee')) {
            ingredients = baseIngredients.beverage;
        }
        
        return ingredients.join(', ');
    }

    // Load related products for details page
    loadRelatedProductsForPage(productId, categoryId) {
        const relatedContainer = document.getElementById('relatedProducts');
        let allProducts = [];
        
        // Gather all products
        if (restaurantData.products) {
            allProducts = [...restaurantData.products];
        }
        if (typeof largeRestaurantMenu !== 'undefined' && largeRestaurantMenu.products) {
            allProducts = [...allProducts, ...largeRestaurantMenu.products];
        }
        
        // Filter related products
        const relatedProducts = allProducts
            .filter(p => p.id !== productId && (p.categoryId === categoryId || categoryId === 1))
            .slice(0, 4);
        
        if (relatedProducts.length > 0) {
            relatedContainer.innerHTML = relatedProducts
                .map(product => this.createProductCard(product))
                .join('');
        } else {
            relatedContainer.innerHTML = '<p>No related products found</p>';
        }
    }

    loadRelatedProducts(productId, categoryId) {
        const container = document.getElementById('relatedProducts');
        const relatedProducts = getRelatedProducts(productId, categoryId);
        
        container.innerHTML = relatedProducts.map(product => 
            this.createProductCard(product)
        ).join('');

        this.attachProductCardListeners(container);
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
        const productImage = product.image || product.image_url || 'https://via.placeholder.com/300x200?text=No+Image';
        
        return `
            <div class="product-card ${popularClass} ${vegetarianClass}">
                <img src="${productImage}" alt="${product.name}" class="product-image" onclick="restaurantSystem.showProductDetails(${product.id})" style="cursor: pointer;">
                <div class="product-info">
                    <h3 class="product-name" onclick="restaurantSystem.showProductDetails(${product.id})" style="cursor: pointer;">${product.name}</h3>
                    <p class="product-description">${truncateText(product.description, 50)}</p>
                    <div class="product-rating">
                        ${this.renderStars(product.rating)}
                        <span>${product.rating}</span>
                    </div>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <button class="add-to-cart-btn" onclick="(function(btn){if(shoppingCart) shoppingCart.addItem({id: '${product.id}', name: '${product.name.replace(/'/g, "\\'")}', price: ${product.price}, image: '${productImage}'}, 1); btn.classList.add('clicked'); setTimeout(() => btn.classList.remove('clicked'), 600);})(this); event.stopPropagation();">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
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
        
        // Log some sample products to check their structure
        console.log('Sample products:', restaurantData.products.slice(0, 3));
    }
    
    // Check if large menu data is available
    if (typeof largeRestaurantMenu !== 'undefined') {
        console.log('Large menu data available:', {
            categories: largeRestaurantMenu.categories.length,
            products: largeRestaurantMenu.products.length
        });
        console.log('Sample large menu products:', largeRestaurantMenu.products.slice(0, 3));
    }
    
    restaurantSystem = new RestaurantSystem();
    console.log('Restaurant system initialized');
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

// Product Details Page JavaScript
let currentProduct = null;
let currentQuantity = 1;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadProductFromURL();
    setupDarkMode();
});

// Setup event listeners
function setupEventListeners() {
    // Cart functionality - removed
    
    // Close dropdown when clicking outside - removed for cart

    // Mobile menu toggle
    document.getElementById('mobileMenuToggle').addEventListener('click', function() {
        document.querySelector('.nav-list').classList.toggle('active');
    });

    // Dark mode toggle
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

    // Order now button
    document.getElementById('orderNowBtn').addEventListener('click', function() {
        window.location.href = 'index.html#menu';
    });
}

// Load product from URL query string
function loadProductFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        showError();
        return;
    }

    // Try to find product in restaurantData first
    let product = null;
    
    // Check if restaurantData is available
    if (typeof restaurantData !== 'undefined' && restaurantData.products) {
        product = restaurantData.products.find(p => p.id == productId);
    }
    
    // If not found, check largeRestaurantMenu
    if (!product && typeof largeRestaurantMenu !== 'undefined' && largeRestaurantMenu.products) {
        product = largeRestaurantMenu.products.find(p => p.id == productId);
    }

    if (product) {
        displayProduct(product);
    } else {
        showError();
    }
}

// Display product details
function displayProduct(product) {
    currentProduct = product;
    
    // Update page title
    document.title = `${product.name} - Delicious Bites Restaurant`;
    
    // Update product information
    document.getElementById('productImage').src = product.image || product.image_url;
    document.getElementById('productImage').alt = product.name;
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = formatPrice(product.price);
    document.getElementById('productDescription').textContent = product.description;
    
    // Update rating
    updateRating(product.rating || 4.5);
    
    // Update ingredients
    updateIngredients(product);
    
    // Update badges
    updateBadges(product);
    
    // Load related products
    loadRelatedProducts(product);
    
    // Show content, hide loading
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('productContent').style.display = 'block';
    
    // Reset quantity
    currentQuantity = 1;
    document.getElementById('quantityDisplay').textContent = currentQuantity;
}

// Update rating display
function updateRating(rating) {
    const starsContainer = document.getElementById('productStars');
    const ratingText = document.getElementById('productRating');
    
    starsContainer.innerHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        starsContainer.innerHTML += '<i class="fas fa-star star"></i>';
    }
    
    if (hasHalfStar) {
        starsContainer.innerHTML += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsContainer.innerHTML += '<i class="far fa-star star"></i>';
    }
    
    ratingText.textContent = `${rating} (${Math.floor(Math.random() * 100) + 50} reviews)`;
}

// Update ingredients display
function updateIngredients(product) {
    const ingredientsContainer = document.getElementById('productIngredients');
    
    if (product.ingredients) {
        ingredientsContainer.textContent = product.ingredients;
    } else {
        // Generate default ingredients based on product name and category
        const defaultIngredients = generateDefaultIngredients(product);
        ingredientsContainer.textContent = defaultIngredients;
    }
}

// Generate default ingredients based on product
function generateDefaultIngredients(product) {
    const baseIngredients = {
        'meat': ['Premium meat', 'Spices', 'Herbs', 'Vegetables', 'Sauce'],
        'chicken': ['Fresh chicken', 'Marinade', 'Spices', 'Herbs', 'Vegetables'],
        'fish': ['Fresh fish', 'Lemon', 'Herbs', 'Olive oil', 'Seasonings'],
        'vegetarian': ['Fresh vegetables', 'Herbs', 'Spices', 'Olive oil', 'Seasonings'],
        'pasta': ['Pasta', 'Tomato sauce', 'Cheese', 'Herbs', 'Olive oil'],
        'dessert': ['Sugar', 'Flour', 'Butter', 'Eggs', 'Flavorings'],
        'beverage': ['Natural ingredients', 'Water', 'Natural sweeteners', 'Flavorings']
    };
    
    const productName = product.name.toLowerCase();
    let ingredients = baseIngredients.vegetarian; // default
    
    if (productName.includes('beef') || productName.includes('steak') || productName.includes('meat')) {
        ingredients = baseIngredients.meat;
    } else if (productName.includes('chicken') || productName.includes('poultry')) {
        ingredients = baseIngredients.chicken;
    } else if (productName.includes('fish') || productName.includes('salmon') || productName.includes('seafood')) {
        ingredients = baseIngredients.fish;
    } else if (productName.includes('pasta') || productName.includes('spaghetti') || productName.includes('lasagna')) {
        ingredients = baseIngredients.pasta;
    } else if (productName.includes('cake') || productName.includes('dessert') || productName.includes('ice cream')) {
        ingredients = baseIngredients.dessert;
    } else if (productName.includes('juice') || productName.includes('coffee') || productName.includes('tea')) {
        ingredients = baseIngredients.beverage;
    }
    
    return ingredients.join(', ');
}

// Update product badges
function updateBadges(product) {
    const badgesContainer = document.getElementById('productBadges');
    badgesContainer.innerHTML = '';
    
    if (product.isVegetarian) {
        badgesContainer.innerHTML += '<span class="badge vegetarian">🥬 Vegetarian</span>';
    }
    
    if (product.isPopular) {
        badgesContainer.innerHTML += '<span class="badge popular">⭐ Popular</span>';
    }
}

// Load related products
function loadRelatedProducts(currentProduct) {
    const relatedGrid = document.getElementById('relatedProductsGrid');
    let allProducts = [];
    
    // Get all products from available data sources
    if (typeof restaurantData !== 'undefined' && restaurantData.products) {
        allProducts = allProducts.concat(restaurantData.products);
    }
    
    if (typeof largeRestaurantMenu !== 'undefined' && largeRestaurantMenu.products) {
        allProducts = allProducts.concat(largeRestaurantMenu.products);
    }
    
    // Find related products (same category or similar)
    const relatedProducts = allProducts
        .filter(p => p.id !== currentProduct.id && 
                   (p.categoryId === currentProduct.categoryId || 
                    p.name.toLowerCase().includes(currentProduct.name.toLowerCase().split(' ')[0])))
        .slice(0, 4);
    
    if (relatedProducts.length > 0) {
        relatedGrid.innerHTML = relatedProducts.map(product => `
            <div class="product-card ${product.isPopular ? 'popular' : ''} ${product.isVegetarian ? 'vegetarian' : ''}" 
                 onclick="goToProductDetail(${product.id})">
                <img src="${product.image || product.image_url}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${truncateText(product.description, 80)}</p>
                    <div class="product-price">${formatPrice(product.price)}</div>
                </div>
            </div>
        `).join('');
    } else {
        relatedGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light);">No related products found.</p>';
    }
}

// Navigate to product detail page
function goToProductDetail(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

// Quick add to cart from related products - removed
function quickAddToCart(productId) {
    // Cart functionality removed
}

// Update quantity
function updateQuantity(change) {
    currentQuantity = Math.max(1, currentQuantity + change);
    document.getElementById('quantityDisplay').textContent = currentQuantity;
}

// Add to cart - removed
function addToCart() {
    // Cart functionality removed
}

// Add product to cart - removed
function addToCartWithProduct(product, quantity) {
    // Cart functionality removed
}

// Cart management functions - removed

// Utility functions
function formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Helper functions for menu data
function getProductsByCategory(categoryId) {
    if (!categoryId) {
        return restaurantData.products || [];
    }
    return (restaurantData.products || []).filter(product => product.categoryId === categoryId);
}

function getPopularProducts() {
    return (restaurantData.products || []).filter(product => product.isPopular);
}

function getRelatedProducts(productId, categoryId) {
    return (restaurantData.products || []).filter(product => 
        product.id !== productId && product.categoryId === categoryId
    ).slice(0, 4);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    // Remove any existing animation classes
    toast.classList.remove('show');
    
    // Wait a moment to ensure the show class is removed
    setTimeout(() => {
        toastMessage.textContent = message;
        toast.className = `toast ${type}`;
        
        // Trigger reflow to restart animation
        void toast.offsetWidth;
        
        // Add show class to trigger animation
        toast.classList.add('show');
        
        // Hide after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }, 10);
}

function showError() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('errorState').style.display = 'block';
}

// Dark mode functions
function setupDarkMode() {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Simple and direct initialization
function initializeRestaurant() {
    console.log('Initializing restaurant system...');
    
    // Check if data is available
    if (typeof restaurantData === 'undefined' || !restaurantData.products || restaurantData.products.length === 0) {
        console.error('Restaurant data not available');
        return;
    }
    
    // Create the restaurant system
    if (!window.restaurantSystem) {
        console.log('Creating new RestaurantSystem instance...');
        window.restaurantSystem = new RestaurantSystem();
        console.log('RestaurantSystem created successfully');
    } else {
        console.log('RestaurantSystem already exists');
    }
}

// Try multiple initialization approaches
function tryInitialization() {
    console.log('Attempting initialization...');
    
    // Direct attempt
    initializeRestaurant();
    
    // If that didn't work, try after a short delay
    setTimeout(() => {
        if (!window.restaurantSystem) {
            console.log('Retrying initialization after delay...');
            initializeRestaurant();
        }
    }, 100);
    
    // Final retry after longer delay
    setTimeout(() => {
        if (!window.restaurantSystem) {
            console.log('Final retry initialization...');
            initializeRestaurant();
        }
    }, 500);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInitialization);
} else {
    // DOM is already ready
    tryInitialization();
}

// Also try on window load as backup
window.addEventListener('load', function() {
    console.log('Window load event fired');
    if (!window.restaurantSystem) {
        console.log('Initializing on window load...');
        tryInitialization();
    }
});

// Immediate failsafe - try to initialize right now
console.log('Script loaded, attempting immediate initialization...');
tryInitialization();

// ============================================================================
// SHOPPING CART FUNCTIONALITY
// ============================================================================

// Cart Management System
class ShoppingCart {
    constructor() {
        // Load cart from localStorage so it persists across page loads
        this.items = this.loadFromLocalStorage() || [];
        this.initEventListeners();
        this.updateCartCount();
    }

    initEventListeners() {
        // Cart button click
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.showCartModal());
        }

        // Checkout form submission
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => this.handleCheckout(e));
        }

        // Close modals when clicking outside
        const cartModal = document.getElementById('cartModal');
        const checkoutModal = document.getElementById('checkoutModal');

        if (cartModal) {
            cartModal.addEventListener('click', (e) => {
                if (e.target === cartModal) {
                    this.closeCartModal();
                }
            });
        }

        if (checkoutModal) {
            checkoutModal.addEventListener('click', (e) => {
                if (e.target === checkoutModal) {
                    this.closeCheckoutModal();
                }
            });
        }
    }

    // Add item to cart
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || product.image_url,
                quantity: quantity
            });
        }

        this.saveToLocalStorage();
        this.updateCartCount();
        // Briefly animate cart button to give feedback
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.classList.add('cart-pop');
            setTimeout(() => cartBtn.classList.remove('cart-pop'), 800);
        }
        showToast(`${product.name} added to cart!`, 'success');
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToLocalStorage();
        this.updateCartCount();
        this.showCartModal(); // Refresh the cart display
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            // If quantity reaches 0, show confirmation modal instead of removing directly
            if (quantity <= 0) {
                window.pendingRemovalProductId = productId;
                window.pendingRemovalProductName = item.name;
                this.showConfirmationModal(item.name);
                return;
            }
            
            item.quantity = quantity;
            this.saveToLocalStorage();
            this.updateCartCount();
            this.showCartModal(); // Refresh the cart display
        }
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get cart item count
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Update cart count badge
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
        }
    }

    // Show cart modal
    showCartModal() {
        const cartModal = document.getElementById('cartModal');
        const cartModalBody = document.getElementById('cartModalBody');

        if (!cartModal) return;

        // Check if cart is empty
        if (this.items.length === 0) {
            cartModalBody.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <p style="font-size: 0.9rem; color: #888;">Start adding items to your order!</p>
                </div>
            `;
        } else {
            // Display cart items with thumbnail and improved layout
            const itemsHTML = this.items.map(item => `
                <div class="cart-item">
                    <div class="cart-item-thumb">
                        <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}" />
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-details">$${item.price.toFixed(2)} each</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="shoppingCart.updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="shoppingCart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <button class="cart-item-remove" onclick="shoppingCart.removeItem('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');

            const total = this.getTotal();

            cartModalBody.innerHTML = `
                <div class="cart-items-list">
                    ${itemsHTML}
                </div>
                <div class="cart-summary">
                    <div class="cart-summary-item">
                        <span><i class="fas fa-receipt"></i> Subtotal:</span>
                        <span>$${total.toFixed(2)}</span>
                    </div>
                    <div class="cart-summary-item">
                        <span><i class="fas fa-truck"></i> Delivery Fee:</span>
                        <span>$5.00</span>
                    </div>
                    <div class="cart-summary-item total">
                        <span><i class="fas fa-dollar-sign"></i> Total:</span>
                        <span>$${(total + 5).toFixed(2)}</span>
                    </div>
                </div>
                <div class="cart-actions">
                    <button class="clear-cart-btn" onclick="shoppingCart.clearCartConfirm()">Clear Cart</button>
                    <button class="continue-shopping-btn" onclick="shoppingCart.closeCartModal()">Continue Shopping</button>
                    <button class="checkout-btn" onclick="shoppingCart.proceedToCheckout()">Checkout</button>
                </div>
            `;
        }

        cartModal.classList.add('show');
    }

    // Close cart modal
    closeCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.classList.remove('show');
        }
    }

    // Proceed to checkout
    proceedToCheckout() {
        this.closeCartModal();
        this.showCheckoutModal();
    }

    // Show checkout modal
    showCheckoutModal() {
        const checkoutModal = document.getElementById('checkoutModal');
        const checkoutSummary = document.getElementById('checkoutSummary');
        const orderTotal = document.getElementById('orderTotal');

        if (!checkoutModal) return;

        // Display order summary
        const summaryHTML = this.items.map(item => `
            <div class="checkout-summary-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        const total = this.getTotal() + 5; // Including delivery fee

        checkoutSummary.innerHTML = `
            ${summaryHTML}
            <div class="checkout-summary-item">
                <span>Delivery Fee</span>
                <span>$5.00</span>
            </div>
        `;

        orderTotal.textContent = `$${total.toFixed(2)}`;

        checkoutModal.classList.add('show');
    }

    // Close checkout modal
    closeCheckoutModal() {
        const checkoutModal = document.getElementById('checkoutModal');
        if (checkoutModal) {
            checkoutModal.classList.remove('show');
        }
    }

    // Show confirmation modal for item removal
    showConfirmationModal(itemName) {
        const modal = document.getElementById('confirmationModal');
        const message = document.getElementById('confirmationMessage');
        
        message.textContent = `Are you sure you want to remove "${itemName}" from the cart?`;
        
        if (modal) {
            modal.classList.add('show');
        }
    }

    // Close confirmation modal
    closeConfirmationModal() {
        const modal = document.getElementById('confirmationModal');
        if (modal) {
            modal.classList.remove('show');
        }
        window.pendingRemovalProductId = null;
    }

    // Confirm item removal
    confirmRemoveItem() {
        if (window.pendingRemovalProductId) {
            this.removeItem(window.pendingRemovalProductId);
            this.closeConfirmationModal();
        }
    }

    // Handle checkout form submission
    handleCheckout(e) {
        e.preventDefault();
        // Collect form fields (matching Apps Script expectations)
        const name = (document.getElementById('customerName') || {}).value || '';
        const email = (document.getElementById('customerEmail') || {}).value || '';
        const phone = (document.getElementById('customerPhone') || {}).value || '';
        const address = (document.getElementById('customerAddress') || {}).value || '';
        const notes = (document.getElementById('customerNotes') || {}).value || '';

        // Build products array from cart items
        const products = (this.items || []).map(it => ({
            name: it.name || '',
            quantity: Number(it.quantity || 0),
            price: Number(it.price || 0)
        }));

        const subtotal = this.getTotal();
        const deliveryFee = 5; // match UI
        const total = subtotal + deliveryFee;

        // Payload matching Apps Script sheet columns: name, email, phone, address, notes, products, total
        const payloadObj = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            notes: notes,
            products: JSON.stringify(products), // Convert array to JSON string for Google Sheets
            total: total
        };

        // UI feedback
        const submitBtn = document.querySelector('#checkoutForm button[type="submit"]') || document.getElementById('checkoutSubmitBtn');
        if (submitBtn) { submitBtn.disabled = true; submitBtn.dataset.origText = submitBtn.innerText; submitBtn.innerText = 'Submitting...'; }
        showToast('Submitting order...', 'info');

        console.log('📤 Sending checkout to Google Sheet');
        console.log('📦 Payload:', payloadObj);

        // Send as form-encoded to avoid CORS preflight (puts JSON in 'payload' field)
        const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbydzrceyDPnI8Us8jRUkx43HF6-esV4JUNgMWnGE-0p-2mZAW1ipMjmWbvqwKckxxVMqw/exec';
        const params = new URLSearchParams();
        params.append('payload', JSON.stringify(payloadObj));
        
        console.log('📋 URL:', WEB_APP_URL);
        console.log('📋 Body (form-encoded):', params.toString().substring(0, 200) + '...');

        // Try fetch first, then fallback to XMLHttpRequest
        this.submitWithFetch(WEB_APP_URL, params, submitBtn)
            .catch(() => {
                console.log('🔄 Fetch failed, trying XMLHttpRequest fallback...');
                this.submitWithXMLHttpRequest(WEB_APP_URL, params, submitBtn);
            });
    }

    // Fetch method with no-cors
    submitWithFetch(url, params, submitBtn) {
        return fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        })
        .then(res => {
            console.log('✅ FETCH SUCCEEDED - Status:', res.status, res.statusText);
            return res.text();
        })
        .then(text => {
            console.log('📝 Response text received:', text.substring(0, 300));
            this.handleResponse(text, submitBtn);
        })
        .catch(err => {
            console.error('❌ FETCH FAILED:', err.message);
            throw err; // Re-throw to trigger fallback
        });
    }

    // XMLHttpRequest fallback method
    submitWithXMLHttpRequest(url, params, submitBtn) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            xhr.onload = () => {
                console.log('✅ XHR COMPLETED - Status:', xhr.status, xhr.statusText);
                console.log('📝 Response text received:', xhr.responseText.substring(0, 300));
                this.handleResponse(xhr.responseText, submitBtn);
                resolve();
            };
            
            xhr.onerror = () => {
                console.error('❌ XHR FAILED');
                showToast('Network or server error while submitting order.', 'error');
                reject(new Error('XMLHttpRequest failed'));
            };
            
            xhr.send(params.toString());
        });
    }

    // Handle response from either fetch or XHR
    handleResponse(text, submitBtn) {
        console.log('🔍 Raw response text:', text);
        console.log('🔍 Response text length:', text.length);
        console.log('🔍 Response text type:', typeof text);
        
        let json;
        try { 
            json = JSON.parse(text); 
            console.log('✅ Successfully parsed JSON:', json);
        } catch (e) { 
            console.warn('⚠️ Failed to parse JSON:', e.message);
            console.warn('⚠️ Text that failed to parse:', text);
            
            // With no-cors, we often get empty response, so assume success if we got here
            if (text === '' || text.length === 0) {
                console.log('📝 Empty response with no-cors - assuming success');
                json = { result: 'success', message: 'Order submitted successfully (no-cors response)' };
            } else {
                json = { result: 'error', raw: text, message: 'Could not parse server response' }; 
            }
        }
        
        console.log('🎯 Final processed response:', json);
        
        if (json && (json.result === 'success' || json.status === 'ok')) {
            showToast('Order submitted successfully! We will contact you soon.', 'success');
            // Clear the form
            const f = document.getElementById('checkoutForm'); if (f) f.reset();
            // Close modal and clear cart
            this.closeCheckoutModal();
            this.clearCart();
        } else {
            const msg = (json && (json.message || json.error)) ? (json.message || json.error) : (json && json.raw ? json.raw : 'Submission failed');
            console.warn('⚠️ Server returned error:', msg);
            console.warn('⚠️ Full error object:', json);
            
            // More specific error messages
            if (msg.includes('no payload')) {
                showToast('Error: No order data received. Please check your internet connection.', 'error');
            } else if (msg.includes('CORS')) {
                showToast('Error: Browser security restriction. Please try again.', 'error');
            } else {
                showToast('Order submission failed: ' + msg, 'error');
            }
        }
        
        // Re-enable button
        if (submitBtn) { 
            submitBtn.disabled = false; 
            submitBtn.innerText = submitBtn.dataset.origText || 'Checkout'; 
        }
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveToLocalStorage();
        this.updateCartCount();
    }

    // Confirm before clearing the entire cart
    clearCartConfirm() {
        if (this.items.length === 0) return;
        const ok = window.confirm('Are you sure you want to clear the entire cart?');
        if (ok) {
            this.clearCart();
            this.showCartModal();
            showToast('Cart cleared', 'info');
        }
    }

    // Save cart to localStorage
    saveToLocalStorage() {
        localStorage.setItem('restaurantCart', JSON.stringify(this.items));
    }

    // Load cart from localStorage
    loadFromLocalStorage() {
        const saved = localStorage.getItem('restaurantCart');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize shopping cart
let shoppingCart;

// Create shopping cart when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!shoppingCart) {
            shoppingCart = new ShoppingCart();
        }
    });
} else {
    if (!shoppingCart) {
        shoppingCart = new ShoppingCart();
    }
}

// Global functions for modals
function closeCartModal() {
    if (shoppingCart) {
        shoppingCart.closeCartModal();
    }
}

function closeCheckoutModal() {
    if (shoppingCart) {
        shoppingCart.closeCheckoutModal();
    }
}

function closeConfirmationModal() {
    if (shoppingCart) {
        shoppingCart.closeConfirmationModal();
    }
}

function confirmRemoveItem() {
    if (shoppingCart) {
        shoppingCart.confirmRemoveItem();
    }
}