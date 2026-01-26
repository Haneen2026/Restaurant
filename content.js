// Restaurant Data Structure
const restaurantData = {
    categories: [],
    products: [],
    restaurantInfo: {
        name: 'Delicious Bites Restaurant',
        phone: '+1 (555) 123-4567',
        email: 'info@deliciousbites.com',
        address: '123 Main Street, City, State 12345',
        workingHours: {
            monday: '11:00 AM - 10:00 PM',
            tuesday: '11:00 AM - 10:00 PM',
            wednesday: '11:00 AM - 10:00 PM',
            thursday: '11:00 AM - 10:00 PM',
            friday: '11:00 AM - 11:00 PM',
            saturday: '11:00 AM - 11:00 PM',
            sunday: '12:00 PM - 9:00 PM'
        },
        socialMedia: {
            facebook: 'https://facebook.com/deliciousbites',
            instagram: 'https://instagram.com/deliciousbites',
            twitter: 'https://twitter.com/deliciousbites'
        }
    }
};

// Veryfi API Integration
class VeryfiAPI {
    constructor(apiKey, clientId) {
        this.apiKey = apiKey;
        this.clientId = clientId;
        this.baseURL = 'https://api.veryfi.com/api/v8/partner/documents';
    }

    async processMenuImage(imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('auto_delete', 'false');
        
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Authorization': `apikey ${this.clientId}:${this.apiKey}`,
                    'Accept': 'application/json'
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return this.transformVeryfiData(data);
        } catch (error) {
            console.error('Error processing menu with Veryfi:', error);
            throw error;
        }
    }

    transformVeryfiData(veryfiData) {
        const categories = [];
        const products = [];
        const categoryMap = new Map();
        let categoryId = 1;
        let productId = 1;

        // Extract menu items and group by categories
        if (veryfiData.line_items && Array.isArray(veryfiData.line_items)) {
            veryfiData.line_items.forEach(item => {
                const categoryName = item.menu_section || 'Other';
                
                // Create or get category
                if (!categoryMap.has(categoryName)) {
                    const category = {
                        id: categoryId++,
                        name: categoryName,
                        icon: this.getCategoryIcon(categoryName)
                    };
                    categories.push(category);
                    categoryMap.set(categoryName, category.id);
                }

                // Create product
                const product = {
                    id: productId++,
                    categoryId: categoryMap.get(categoryName),
                    name: item.dish_name || 'Unknown Item',
                    description: item.dish_description || 'Delicious item from our menu',
                    price: parseFloat(item.dish_price) || 0,
                    image: `https://images.unsplash.com/photo-${Date.now()}?w=300&h=200&fit=crop&auto=format&query=${encodeURIComponent(item.dish_name || 'food')}`,
                    isVegetarian: this.isVegetarianItem(item.dish_name),
                    rating: Math.random() * 2 + 3, // Random rating between 3-5
                    isPopular: Math.random() > 0.7 // 30% chance of being popular
                };
                products.push(product);
            });
        }

        // Update restaurant info if available
        if (veryfiData.vendor) {
            restaurantData.restaurantInfo.name = veryfiData.vendor.name || restaurantData.restaurantInfo.name;
            restaurantData.restaurantInfo.address = veryfiData.vendor.address || restaurantData.restaurantInfo.address;
            restaurantData.restaurantInfo.phone = veryfiData.vendor.phone || restaurantData.restaurantInfo.phone;
        }

        return { categories, products };
    }

    getCategoryIcon(categoryName) {
        const icons = {
            'appetizers': '🥗',
            'starters': '🥗',
            'main course': '🍖',
            'entrees': '🍖',
            'desserts': '🍰',
            'beverages': '🥤',
            'drinks': '🥤',
            'soups': '🍲',
            'salads': '🥗'
        };
        
        const lowerName = categoryName.toLowerCase();
        return icons[lowerName] || '🍽️';
    }

    isVegetarianItem(itemName) {
        if (!itemName) return false;
        const vegetarianKeywords = ['vegetable', 'salad', 'soup', 'pasta', 'rice', 'tofu', 'bean', 'cheese', 'mushroom'];
        const lowerName = itemName.toLowerCase();
        return vegetarianKeywords.some(keyword => lowerName.includes(keyword));
    }
}

// Initialize Veryfi API (replace with your actual credentials)
const veryfiAPI = new VeryfiAPI('your_actual_api_key_here', 'your_actual_client_id_here');

// Load menu data from Veryfi API
async function loadMenuFromVeryfi(imageFile) {
    try {
        const { categories, products } = await veryfiAPI.processMenuImage(imageFile);
        restaurantData.categories = categories;
        restaurantData.products = products;
        return true;
    } catch (error) {
        console.error('Failed to load menu from Veryfi:', error);
        // Fallback to default data
        loadDefaultMenuData();
        return false;
    }
}

// Fallback default menu data
function loadDefaultMenuData() {
    restaurantData.categories = [
        { id: 1, name: 'Appetizers', icon: '🥗' },
        { id: 2, name: 'Main Course', icon: '🍖' },
        { id: 3, name: 'Desserts', icon: '🍰' },
        { id: 4, name: 'Beverages', icon: '🥤' },
        { id: 5, name: 'Soups', icon: '🍲' }
    ];
    
    restaurantData.products = [
        { id: 1, categoryId: 1, name: 'Spring Rolls', description: 'Crispy vegetable spring rolls served with sweet chili sauce', price: 8.99, image: 'https://www.themealdb.com/images/media/meals/5jdtie1763289302.jpg', isVegetarian: true, rating: 4.5, isPopular: true },
        { id: 2, categoryId: 1, name: 'Chicken Wings', description: 'Spicy buffalo wings with blue cheese dip', price: 10.99, image: 'https://www.themealdb.com/images/media/meals/h5qmn31763304965.jpg', isVegetarian: false, rating: 4.8, isPopular: true },
        { id: 3, categoryId: 1, name: 'Bruschetta', description: 'Toasted bread with tomatoes, garlic, and fresh basil', price: 7.99, image: 'https://www.themealdb.com/images/media/meals/wurrux1468416624.jpg', isVegetarian: true, rating: 4.3 },
        { id: 4, categoryId: 2, name: 'Grilled Salmon', description: 'Fresh Atlantic salmon with lemon butter sauce and vegetables', price: 24.99, image: 'https://www.themealdb.com/images/media/meals/1548772327.jpg', isVegetarian: false, rating: 4.7, isPopular: true },
        { id: 5, categoryId: 2, name: 'Beef Steak', description: 'Premium cut beef steak with mashed potatoes and gravy', price: 28.99, image: 'https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg', isVegetarian: false, rating: 4.9, isPopular: true },
        { id: 6, categoryId: 2, name: 'Vegetable Pasta', description: 'Creamy pasta with seasonal vegetables and parmesan', price: 16.99, image: 'https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg', isVegetarian: true, rating: 4.4 },
        
        // ADDITIONAL MAIN COURSES
        { id: 51, categoryId: 2, name: 'Chicken Parmesan', description: 'Breaded chicken with marinara sauce and mozzarella', price: 19.99, image: 'https://www.themealdb.com/images/media/meals/8rfd4q1764112993.jpg', isVegetarian: false, rating: 4.6, isPopular: true },
        { id: 52, categoryId: 2, name: 'Grilled Ribeye Steak', description: 'Premium ribeye with roasted vegetables', price: 32.99, image: 'https://www.themealdb.com/images/media/meals/ursuup1487348423.jpg', isVegetarian: false, rating: 4.8, isPopular: true },
        { id: 53, categoryId: 2, name: 'Lobster Tail', description: 'Butter-poached lobster tail with garlic herbs', price: 36.99, image: 'https://www.themealdb.com/images/media/meals/ikizdm1763760862.jpg', isVegetarian: false, rating: 4.9, isPopular: true },
        { id: 54, categoryId: 2, name: 'Margherita Pizza', description: 'Classic pizza with fresh mozzarella and basil', price: 14.99, image: 'https://www.themealdb.com/images/media/meals/1529444830.jpg', isVegetarian: true, rating: 4.5, isPopular: true },
        { id: 55, categoryId: 2, name: 'BBQ Ribs', description: 'Slow-cooked ribs with BBQ sauce and coleslaw', price: 22.99, image: 'https://www.themealdb.com/images/media/meals/uuqvwu1504629254.jpg', isVegetarian: false, rating: 4.7, isPopular: true },
        { id: 56, categoryId: 2, name: 'Fish and Chips', description: 'Beer-battered cod with crispy fries', price: 16.99, image: 'https://www.themealdb.com/images/media/meals/rvtvuw1511191952.jpg', isVegetarian: false, rating: 4.4 },
        { id: 57, categoryId: 2, name: 'Mushroom Risotto', description: 'Creamy arborio rice with wild mushrooms', price: 18.99, image: 'https://www.themealdb.com/images/media/meals/1529443236.jpg', isVegetarian: true, rating: 4.6, isPopular: true },
        { id: 58, categoryId: 2, name: 'Chicken Tikka Masala', description: 'Tender chicken in creamy tomato curry sauce', price: 17.99, image: 'https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg', isVegetarian: false, rating: 4.5, isPopular: true },
        { id: 59, categoryId: 2, name: 'Grilled Tuna Steak', description: 'Seared tuna with sesame ginger glaze', price: 26.99, image: 'https://www.themealdb.com/images/media/meals/st9shl1763755808.jpg', isVegetarian: false, rating: 4.7, isPopular: true },
        { id: 60, categoryId: 2, name: 'Eggplant Parmigiana', description: 'Layered eggplant with marinara and cheese', price: 15.99, image: 'https://www.themealdb.com/images/media/meals/ctg8jd1585563097.jpg', isVegetarian: true, rating: 4.3 },
        { id: 61, categoryId: 2, name: 'Duck Confit', description: 'Slow-cooked duck leg with crispy skin', price: 29.99, image: 'https://www.themealdb.com/images/media/meals/vussxq1511882648.jpg', isVegetarian: false, rating: 4.8, isPopular: true },
        { id: 62, categoryId: 2, name: 'Vegetable Stir Fry', description: 'Mixed vegetables with tofu and soy sauce', price: 13.99, image: 'https://www.themealdb.com/images/media/meals/1525874812.jpg', isVegetarian: true, rating: 4.2 },
        { id: 63, categoryId: 2, name: 'Lamb Chops', description: 'Grilled lamb chops with mint sauce', price: 24.99, image: 'https://www.themealdb.com/images/media/meals/syqypq1511640323.jpg', isVegetarian: false, rating: 4.6, isPopular: true },
        { id: 64, categoryId: 2, name: 'Shrimp Scampi', description: 'Garlic butter shrimp with linguine pasta', price: 21.99, image: 'https://www.themealdb.com/images/media/meals/2wx8cm1763373419.jpg', isVegetarian: false, rating: 4.5, isPopular: true },
        { id: 65, categoryId: 2, name: 'Quinoa Bowl', description: 'Roasted vegetables with quinoa and tahini', price: 14.99, image: 'https://www.themealdb.com/images/media/meals/w8umt11583268117.jpg', isVegetarian: true, rating: 4.4 },
        { id: 66, categoryId: 2, name: 'Pork Tenderloin', description: 'Roasted pork with apple cider glaze', price: 19.99, image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg', isVegetarian: false, rating: 4.5, isPopular: true },
        { id: 67, categoryId: 2, name: 'Black Bean Burger', description: 'House-made veggie burger with toppings', price: 12.99, image: 'https://www.themealdb.com/images/media/meals/6sarfo1762340107.jpg', isVegetarian: true, rating: 4.1 },
        { id: 68, categoryId: 2, name: 'Seafood Paella', description: 'Spanish rice with shrimp, mussels and calamari', price: 25.99, image: 'https://www.themealdb.com/images/media/meals/p277uc1764109195.jpg', isVegetarian: false, rating: 4.7, isPopular: true },
        { id: 7, categoryId: 3, name: 'Chocolate Cake', description: 'Rich chocolate cake with vanilla frosting', price: 6.99, image: 'https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg', isVegetarian: true, rating: 4.8, isPopular: true },
        { id: 8, categoryId: 3, name: 'Ice Cream Sundae', description: 'Three scoops of ice cream with toppings', price: 5.99, image: 'https://www.themealdb.com/images/media/meals/1xscby1764790242.jpg', isVegetarian: true, rating: 4.5 },
        
        // ADDITIONAL DESSERTS
        { id: 36, categoryId: 3, name: 'Tiramisu', description: 'Classic Italian coffee-flavored dessert', price: 7.99, image: 'https://www.themealdb.com/images/media/meals/wprvrw1511641295.jpg', isVegetarian: true, rating: 4.7, isPopular: true },
        { id: 37, categoryId: 3, name: 'Cheesecake', description: 'New York style cheesecake with berries', price: 6.49, image: 'https://www.themealdb.com/images/media/meals/swttys1511385853.jpg', isVegetarian: true, rating: 4.6, isPopular: true },
        { id: 38, categoryId: 3, name: 'Apple Pie', description: 'Traditional apple pie with cinnamon', price: 5.99, image: 'https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg', isVegetarian: true, rating: 4.4 },
        { id: 39, categoryId: 3, name: 'Brownie', description: 'Fudgy chocolate brownie with walnuts', price: 4.99, image: 'https://www.themealdb.com/images/media/meals/yypvst1511386427.jpg', isVegetarian: true, rating: 4.8, isPopular: true },
        { id: 40, categoryId: 3, name: 'Panna Cotta', description: 'Silky Italian vanilla custard', price: 6.99, image: 'https://www.themealdb.com/images/media/meals/0s80wo1764374393.jpg', isVegetarian: true, rating: 4.5 },
        { id: 41, categoryId: 3, name: 'Fruit Tart', description: 'Fresh seasonal fruit tart with pastry', price: 7.49, image: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg', isVegetarian: true, rating: 4.3 },
        { id: 42, categoryId: 3, name: 'Crème Brûlée', description: 'French caramelized custard dessert', price: 7.99, image: 'https://www.themealdb.com/images/media/meals/uryqru1511798039.jpg', isVegetarian: true, rating: 4.9, isPopular: true },
        { id: 43, categoryId: 3, name: 'Molten Chocolate Cake', description: 'Warm chocolate cake with lava center', price: 8.99, image: 'https://www.themealdb.com/images/media/meals/twspvx1511784937.jpg', isVegetarian: true, rating: 4.9, isPopular: true },
        { id: 44, categoryId: 3, name: 'Key Lime Pie', description: 'Tangy key lime pie with meringue', price: 6.49, image: 'https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg', isVegetarian: true, rating: 4.4 },
        { id: 45, categoryId: 3, name: 'Red Velvet Cake', description: 'Moist red velvet with cream cheese frosting', price: 7.99, image: 'https://www.themealdb.com/images/media/meals/ywwrsp1511720277.jpg', isVegetarian: true, rating: 4.6, isPopular: true },
        { id: 46, categoryId: 3, name: 'Carrot Cake', description: 'Spiced carrot cake with cream cheese', price: 5.99, image: 'https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg', isVegetarian: true, rating: 4.3 },
        { id: 47, categoryId: 3, name: 'Lemon Meringue Pie', description: 'Tangy lemon pie with fluffy meringue', price: 6.49, image: 'https://www.themealdb.com/images/media/meals/rxvxrr1511797671.jpg', isVegetarian: true, rating: 4.2 },
        { id: 48, categoryId: 3, name: 'Chocolate Mousse', description: 'Light and airy chocolate mousse', price: 6.99, image: 'https://www.themealdb.com/images/media/meals/v5jrnn1764362830.jpg', isVegetarian: true, rating: 4.7 },
        { id: 49, categoryId: 3, name: 'Strawberry Shortcake', description: 'Fresh strawberries with biscuit base', price: 7.49, image: 'https://www.themealdb.com/images/media/meals/oe8rg51699014028.jpg', isVegetarian: true, rating: 4.5, isPopular: true },
        { id: 50, categoryId: 3, name: 'Pecan Pie', description: 'Southern style pecan pie with nuts', price: 6.99, image: 'https://www.themealdb.com/images/media/meals/rqvwxt1511384809.jpg', isVegetarian: true, rating: 4.4 },
        { id: 9, categoryId: 4, name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', price: 3.99, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.6 },
        { id: 10, categoryId: 4, name: 'Coffee', description: 'Premium arabica coffee', price: 2.99, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.4 },
        
        // ADDITIONAL BEVERAGES
        { id: 21, categoryId: 4, name: 'Green Tea', description: 'Organic Japanese green tea', price: 2.49, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.3 },
        { id: 22, categoryId: 4, name: 'Lemonade', description: 'Fresh squeezed lemonade with mint', price: 3.49, image: 'https://images.unsplash.com/photo-1639991857048-7178ee94b4a8?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.5 },
        { id: 23, categoryId: 4, name: 'Iced Coffee', description: 'Cold brew coffee with ice', price: 4.49, image: 'https://images.unsplash.com/photo-1494314671902-3e1a9b6a5c23?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.6, isPopular: true },
        { id: 24, categoryId: 4, name: 'Apple Juice', description: '100% pure apple juice', price: 3.29, image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.2 },
        { id: 25, categoryId: 4, name: 'Mango Smoothie', description: 'Tropical mango smoothie with yogurt', price: 5.99, image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.7, isPopular: true },
        { id: 26, categoryId: 4, name: 'Coca Cola', description: 'Classic cola soft drink', price: 2.99, image: 'https://images.unsplash.com/photo-1622482369986-6cb7e6d9b3c1?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.0 },
        { id: 27, categoryId: 4, name: 'Sparkling Water', description: 'Premium mineral water with bubbles', price: 2.49, image: 'https://images.unsplash.com/photo-1608276628113-6e3b0d0d1f6c?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.1 },
        { id: 28, categoryId: 4, name: 'Hot Chocolate', description: 'Rich chocolate with whipped cream', price: 4.99, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76568?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.8, isPopular: true },
        { id: 29, categoryId: 4, name: 'Berry Smoothie', description: 'Mixed berry smoothie with banana', price: 5.49, image: 'https://images.unsplash.com/photo-1502741126161-b048600d356a?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.6 },
        { id: 30, categoryId: 4, name: 'Ginger Ale', description: 'Spicy ginger ale soft drink', price: 2.99, image: 'https://images.unsplash.com/photo-1544145945-f90425240a59?w=300&h=200&fit=crop', isVegetarian: true, rating: 3.9 },
        { id: 31, categoryId: 4, name: 'Pineapple Juice', description: 'Fresh tropical pineapple juice', price: 3.79, image: 'https://images.unsplash.com/photo-1590502594949-31db2bc7d6c8?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.4 },
        { id: 32, categoryId: 4, name: 'Latte', description: 'Espresso with steamed milk foam', price: 4.29, image: 'https://images.unsplash.com/photo-1549090137-38f0f08dd50a?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.5 },
        { id: 33, categoryId: 4, name: 'Cranberry Juice', description: 'Tart cranberry juice cocktail', price: 3.59, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.1 },
        { id: 34, categoryId: 4, name: 'Coconut Water', description: 'Natural young coconut water', price: 4.29, image: 'https://images.unsplash.com/photo-1580984969074-a8da5db6eddb?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.3 },
        { id: 35, categoryId: 4, name: 'Matcha Latte', description: 'Japanese matcha green tea latte', price: 5.29, image: 'https://images.unsplash.com/photo-1536970558662-75b0a555a54a?w=300&h=200&fit=crop', isVegetarian: true, rating: 4.6, isPopular: true },
        
        // SOUP ITEMS
        { id: 11, categoryId: 5, name: 'French Onion Soup', description: 'Classic caramelized onion soup with cheese', price: 9.99, image: 'https://www.themealdb.com/images/media/meals/xvrrux1511783685.jpg', isVegetarian: false, rating: 4.7, isPopular: true },
        { id: 12, categoryId: 5, name: 'Tom Yum Soup', description: 'Thai hot and sour soup with prawns', price: 12.99, image: 'https://www.themealdb.com/images/media/meals/9c5nlx1763424766.jpg', isVegetarian: false, rating: 4.6, isPopular: true },
        { id: 13, categoryId: 5, name: 'Creamy Tomato Soup', description: 'Rich blended tomato soup with herbs', price: 7.99, image: 'https://www.themealdb.com/images/media/meals/stpuws1511191310.jpg', isVegetarian: true, rating: 4.4, isPopular: false },
        { id: 14, categoryId: 5, name: 'Thai Pumpkin Soup', description: 'Spiced Thai pumpkin with coconut milk', price: 8.99, image: 'https://www.themealdb.com/images/media/meals/1brbso1763585098.jpg', isVegetarian: true, rating: 4.5, isPopular: false },
        { id: 15, categoryId: 5, name: 'Beetroot Soup (Borscht)', description: 'Traditional Ukrainian beetroot soup', price: 8.49, image: 'https://www.themealdb.com/images/media/meals/zadvgb1699012544.jpg', isVegetarian: true, rating: 4.2, isPopular: false },
        { id: 16, categoryId: 5, name: 'Fish Soup (Ukha)', description: 'Russian fish soup with vegetables', price: 11.99, image: 'https://www.themealdb.com/images/media/meals/7n8su21699013057.jpg', isVegetarian: false, rating: 4.3, isPopular: false },
        { id: 17, categoryId: 5, name: 'Hot and Sour Soup', description: 'Chinese spicy soup with tofu and pork', price: 10.99, image: 'https://www.themealdb.com/images/media/meals/1529445893.jpg', isVegetarian: false, rating: 4.4, isPopular: false },
        { id: 18, categoryId: 5, name: 'Split Pea Soup', description: 'Hearty Canadian split pea with ham', price: 9.49, image: 'https://www.themealdb.com/images/media/meals/xxtsvx1511814083.jpg', isVegetarian: false, rating: 4.3, isPopular: false },
        { id: 19, categoryId: 5, name: 'Egg Drop Soup', description: 'Chinese soup with silky egg ribbons', price: 6.99, image: 'https://www.themealdb.com/images/media/meals/1529446137.jpg', isVegetarian: true, rating: 4.0, isPopular: false },
        { id: 20, categoryId: 5, name: 'Moroccan Carrot Soup', description: 'Spiced roasted carrot with cumin', price: 7.99, image: 'https://www.themealdb.com/images/media/meals/jcr46d1614763831.jpg', isVegetarian: true, rating: 4.3, isPopular: false }
    ];
}

// Initialize with default data
// loadDefaultMenuData(); // Commented out - will be called from script.js

// Ensure restaurantData is available globally
if (typeof restaurantData === 'undefined') {
    console.error('restaurantData is not defined!');
    loadDefaultMenuData();
}

// Force load data if not already loaded
if (restaurantData && restaurantData.products.length === 0) {
    console.log('Force loading default menu data');
    loadDefaultMenuData();
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function getProductsByCategory(categoryId) {
    return categoryId ? restaurantData.products.filter(p => p.categoryId === categoryId) : restaurantData.products;
}

function getPopularProducts() {
    return restaurantData.products.filter(p => p.isPopular);
}

function getRelatedProducts(productId, categoryId) {
    return restaurantData.products.filter(p => p.categoryId === categoryId && p.id !== productId).slice(0, 4);
}

// Immediate data load test
console.log('Content.js loaded - checking data...');
if (typeof restaurantData !== 'undefined' && restaurantData.products.length === 0) {
    console.log('Loading menu data immediately...');
    loadDefaultMenuData();
    console.log('Data loaded:', restaurantData.products.length, 'products');
}