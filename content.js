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

// Large Restaurant Menu from TheMealDB API - 80+ items with real food data
const largeRestaurantMenu = {
    categories: [
        { id: 1, name: "Appetizers & Starters", icon: "🥗" },
        { id: 2, name: "Beef & Meat", icon: "🍖" },
        { id: 3, name: "Chicken & Poultry", icon: "🍗" },
        { id: 4, name: "Seafood", icon: "🦐" },
        { id: 5, name: "Pasta & Italian", icon: "🍝" },
        { id: 6, name: "Vegetarian", icon: "🥬" },
        { id: 7, name: "Soups", icon: "🍲" },
        { id: 8, name: "Desserts", icon: "🍰" }
    ],
    
    products: [
        // APPETIZERS & STARTERS (12 items)
        { id: 1, categoryId: 1, name: "Falafel Pita Sandwich", description: "Crispy chickpea fritters with tahini sauce", price: 8.99, image_url: "https://www.themealdb.com/images/media/meals/ae6clc1760524712.jpg", isVegetarian: true, rating: 4.5, isPopular: true },
        { id: 2, categoryId: 1, name: "Spanish Tortilla", description: "Traditional Spanish omelette with potatoes", price: 7.99, image_url: "https://www.themealdb.com/images/media/meals/quuxsx1511476154.jpg", isVegetarian: true, rating: 4.3, isPopular: false },
        { id: 3, categoryId: 1, name: "Shakshuka", description: "Eggs poached in spicy tomato sauce", price: 9.99, image_url: "https://www.themealdb.com/images/media/meals/g373701551450225.jpg", isVegetarian: true, rating: 4.7, isPopular: true },
        { id: 4, categoryId: 1, name: "Crispy Eggplant", description: "Golden fried eggplant with herbs", price: 8.49, image_url: "https://www.themealdb.com/images/media/meals/c7lzrl1683208757.jpg", isVegetarian: true, rating: 4.2, isPopular: false },
        { id: 5, categoryId: 1, name: "Ful Medames", description: "Egyptian fava bean stew with spices", price: 7.49, image_url: "https://www.themealdb.com/images/media/meals/lvn2d51598732465.jpg", isVegetarian: true, rating: 4.4, isPopular: false },
        { id: 6, categoryId: 1, name: "Patatas Bravas", description: "Crispy potatoes with spicy tomato sauce", price: 6.99, image_url: "https://www.themealdb.com/images/media/meals/bvg8sn1763298713.jpg", isVegetarian: true, rating: 4.6, isPopular: true },
        { id: 7, categoryId: 1, name: "Egg Drop Soup", description: "Chinese soup with silky egg ribbons", price: 5.99, image_url: "https://www.themealdb.com/images/media/meals/1529446137.jpg", isVegetarian: true, rating: 4.1, isPopular: false },
        { id: 8, categoryId: 1, name: "Avocado Dip", description: "Creamy avocado with new potatoes", price: 8.99, image_url: "https://www.themealdb.com/images/media/meals/flrajf1762341295.jpg", isVegetarian: true, rating: 4.8, isPopular: true },
        { id: 9, categoryId: 1, name: "Falafel", description: "Middle Eastern chickpea fritters", price: 7.99, image_url: "https://www.themealdb.com/images/media/meals/u5e9qq1763795441.jpg", isVegetarian: true, rating: 4.4, isPopular: false },
        { id: 10, categoryId: 1, name: "Chickpea Fajitas", description: "Spiced chickpeas with peppers", price: 9.99, image_url: "https://www.themealdb.com/images/media/meals/tvtxpq1511464705.jpg", isVegetarian: true, rating: 4.3, isPopular: false },
        { id: 11, categoryId: 1, name: "Beetroot Soup", description: "Traditional Polish borscht", price: 6.99, image_url: "https://www.themealdb.com/images/media/meals/zadvgb1699012544.jpg", isVegetarian: true, rating: 4.0, isPopular: false },
        { id: 12, categoryId: 1, name: "Cucumber Fennel Salad", description: "Fresh cucumber with fennel", price: 7.49, image_url: "https://www.themealdb.com/images/media/meals/ei21r61764365935.jpg", isVegetarian: true, rating: 4.2, isPopular: false },
        
        // BEEF & MEAT (15 items)
        { id: 13, categoryId: 2, name: "Beef Wellington", description: "Classic beef wrapped in puff pastry", price: 32.99, image_url: "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg", isVegetarian: false, rating: 4.9, isPopular: true },
        { id: 14, categoryId: 2, name: "Beef Bourguignon", description: "French beef stew with red wine", price: 24.99, image_url: "https://www.themealdb.com/images/media/meals/vtqxtu1511784197.jpg", isVegetarian: false, rating: 4.7, isPopular: true },
        { id: 15, categoryId: 2, name: "Spaghetti Bolognese", description: "Classic Italian meat sauce pasta", price: 18.99, image_url: "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg", isVegetarian: false, rating: 4.6, isPopular: true },
        { id: 16, categoryId: 2, name: "Beef Stroganoff", description: "Tender beef in creamy mushroom sauce", price: 22.99, image_url: "https://www.themealdb.com/images/media/meals/svprys1511176755.jpg", isVegetarian: false, rating: 4.5, isPopular: false },
        { id: 17, categoryId: 2, name: "Steak Diane", description: "Flambéed steak with cognac sauce", price: 28.99, image_url: "https://www.themealdb.com/images/media/meals/vussxq1511882648.jpg", isVegetarian: false, rating: 4.8, isPopular: true },
        { id: 18, categoryId: 2, name: "Corned Beef Hash", description: "Hearty breakfast with corned beef", price: 14.99, image_url: "https://www.themealdb.com/images/media/meals/vz94r81760534692.jpg", isVegetarian: false, rating: 4.3, isPopular: false },
        { id: 19, categoryId: 2, name: "Beef Rendang", description: "Indonesian spicy beef curry", price: 19.99, image_url: "https://www.themealdb.com/images/media/meals/bc8v651619789840.jpg", isVegetarian: false, rating: 4.6, isPopular: false },
        { id: 20, categoryId: 2, name: "Beef Pho", description: "Vietnamese noodle soup with beef", price: 16.99, image_url: "https://www.themealdb.com/images/media/meals/pbzcrx1763765096.jpg", isVegetarian: false, rating: 4.7, isPopular: true },
        { id: 21, categoryId: 2, name: "Irish Stew", description: "Traditional Irish lamb and vegetable stew", price: 21.99, image_url: "https://www.themealdb.com/images/media/meals/sxxpst1468569714.jpg", isVegetarian: false, rating: 4.4, isPopular: false },
        { id: 22, categoryId: 2, name: "Beef Empanadas", description: "Savory pastries filled with seasoned beef", price: 12.99, image_url: "https://www.themealdb.com/images/media/meals/dxpc7j1764370714.jpg", isVegetarian: false, rating: 4.5, isPopular: false },
        { id: 23, categoryId: 2, name: "Massaman Beef Curry", description: "Thai curry with beef and peanuts", price: 20.99, image_url: "https://www.themealdb.com/images/media/meals/tvttqv1504640475.jpg", isVegetarian: false, rating: 4.6, isPopular: false },
        { id: 24, categoryId: 2, name: "Szechuan Beef", description: "Spicy Szechuan style beef stir-fry", price: 18.99, image_url: "https://www.themealdb.com/images/media/meals/1529443236.jpg", isVegetarian: false, rating: 4.5, isPopular: false },
        { id: 25, categoryId: 2, name: "Beef and Broccoli", description: "Stir-fried beef with fresh broccoli", price: 17.99, image_url: "https://www.themealdb.com/images/media/meals/m0p0j81765568742.jpg", isVegetarian: false, rating: 4.4, isPopular: false },
        { id: 26, categoryId: 2, name: "Beef and Mustard Pie", description: "Savory pie with beef and mustard", price: 16.99, image_url: "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg", isVegetarian: false, rating: 4.3, isPopular: false },
        { id: 27, categoryId: 2, name: "Beef Brisket Pot Roast", description: "Slow cooked tender beef brisket", price: 23.99, image_url: "https://www.themealdb.com/images/media/meals/ursuup1487348423.jpg", isVegetarian: false, rating: 4.6, isPopular: false },
        
        // CHICKEN & POULTRY (15 items)
        { id: 28, categoryId: 3, name: "Tandoori Chicken", description: "Indian spiced yogurt marinated chicken", price: 16.99, image_url: "https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg", isVegetarian: false, rating: 4.8, isPopular: true },
        { id: 29, categoryId: 3, name: "Chicken Shawarma", description: "Middle Eastern spiced chicken wraps", price: 14.99, image_url: "https://www.themealdb.com/images/media/meals/kcv6hj1598733479.jpg", isVegetarian: false, rating: 4.7, isPopular: true },
        { id: 30, categoryId: 3, name: "General Tso's Chicken", description: "Chinese sweet and spicy chicken", price: 15.99, image_url: "https://www.themealdb.com/images/media/meals/1529444113.jpg", isVegetarian: false, rating: 4.6, isPopular: true },
        { id: 31, categoryId: 3, name: "Coq au Vin", description: "French chicken braised in red wine", price: 22.99, image_url: "https://www.themealdb.com/images/media/meals/qstyvs1505931190.jpg", isVegetarian: false, rating: 4.7, isPopular: false },
        { id: 32, categoryId: 3, name: "Chicken Fajita Mac and Cheese", description: "Mexican inspired cheesy chicken pasta", price: 17.99, image_url: "https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg", isVegetarian: false, rating: 4.5, isPopular: false },
        { id: 33, categoryId: 3, name: "Thai Green Curry", description: "Spicy Thai coconut chicken curry", price: 18.99, image_url: "https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg", isVegetarian: false, rating: 4.6, isPopular: false },
        { id: 34, categoryId: 3, name: "Chicken Wings", description: "Spicy buffalo wings with blue cheese", price: 12.99, image_url: "https://www.themealdb.com/images/media/meals/4hzyvq1763792564.jpg", isVegetarian: false, rating: 4.4, isPopular: true },
        { id: 35, categoryId: 3, name: "Kung Pao Chicken", description: "Sichuan spicy chicken with peanuts", price: 16.99, image_url: "https://www.themealdb.com/images/media/meals/1525872624.jpg", isVegetarian: false, rating: 4.5, isPopular: false },
        { id: 36, categoryId: 3, name: "Chicken Alfredo Primavera", description: "Creamy pasta with chicken and vegetables", price: 19.99, image_url: "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg", isVegetarian: false, rating: 4.6, isPopular: false },
        { id: 37, categoryId: 3, name: "Jerk Chicken", description: "Jamaican spiced grilled chicken", price: 17.99, image_url: "https://www.themealdb.com/images/media/meals/tytyxu1515363282.jpg", isVegetarian: false, rating: 4.7, isPopular: false },
        { id: 38, categoryId: 3, name: "Chicken Congee", description: "Chinese rice porridge with chicken", price: 11.99, image_url: "https://www.themealdb.com/images/media/meals/1529446352.jpg", isVegetarian: false, rating: 4.2, isPopular: false },
        { id: 39, categoryId: 3, name: "Sweet and Sour Chicken", description: "Classic Chinese sweet tangy chicken", price: 15.99, image_url: "https://www.themealdb.com/images/media/meals/arzs741766434335.jpg", isVegetarian: false, rating: 4.3, isPopular: false },
        { id: 40, categoryId: 3, name: "Chicken Karaage", description: "Japanese fried chicken bites", price: 13.99, image_url: "https://www.themealdb.com/images/media/meals/tyywsw1505930373.jpg", isVegetarian: false, rating: 4.5, isPopular: false },
        { id: 41, categoryId: 3, name: "Thai Chicken Cakes", description: "Spiced fish cakes with sweet chili", price: 14.99, image_url: "https://www.themealdb.com/images/media/meals/6s3i3p1763488540.jpg", isVegetarian: false, rating: 4.4, isPopular: false },
        { id: 42, categoryId: 3, name: "Chicken Fried Rice", description: "Asian style fried rice with chicken", price: 13.99, image_url: "https://www.themealdb.com/images/media/meals/wuyd2h1765655837.jpg", isVegetarian: false, rating: 4.3, isPopular: false },
        
        // SEAFOOD (15 items)
        { id: 43, categoryId: 4, name: "Paella", description: "Spanish seafood rice with saffron", price: 24.99, image_url: "https://www.themealdb.com/images/media/meals/9bl20p1763248192.jpg", isVegetarian: false, rating: 4.8, isPopular: true },
        { id: 44, categoryId: 4, name: "Grilled Salmon", description: "Fresh Atlantic salmon with herbs", price: 22.99, image_url: "https://www.themealdb.com/images/media/meals/1548772327.jpg", isVegetarian: false, rating: 4.7, isPopular: true },
        { id: 45, categoryId: 4, name: "Fish Pie", description: "Creamy seafood pie with mashed potato", price: 18.99, image_url: "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg", isVegetarian: false, rating: 4.5, isPopular: false },
        { id: 46, categoryId: 4, name: "Pad Thai", description: "Thai stir-fried rice noodles with shrimp", price: 16.99, image_url: "https://www.themealdb.com/images/media/meals/rg9ze01763479093.jpg", isVegetarian: false, rating: 4.6, isPopular: true },
        { id: 47, categoryId: 4, name: "Honey Teriyaki Salmon", description: "Glazed salmon with teriyaki sauce", price: 21.99, image_url: "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg", isVegetarian: false, rating: 4.7, isPopular: false },
        { id: 48, categoryId: 4, name: "Cajun Fish Tacos", description: "Spiced fish tacos with lime crema", price: 17.99, image_url: "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg", isVegetarian: false, rating: 4.5, isPopular: false },
        { id: 49, categoryId: 4, name: "Garides Saganaki", description: "Greek shrimp with feta and tomato", price: 19.99, image_url: "https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg", isVegetarian: false, rating: 4.6, isPopular: false },
        { id: 50, categoryId: 4, name: "Fried Calamari", description: "Crispy fried squid rings with lemon", price: 14.99, image_url: "https://www.themealdb.com/images/media/meals/yhi46r1763330279.jpg", isVegetarian: false, rating: 4.4, isPopular: false },
        { id: 51, categoryId: 4, name: "Tom Yum Soup", description: "Thai hot and sour soup with shrimp", price: 13.99, image_url: "https://www.themealdb.com/images/media/meals/9c5nlx1763424766.jpg", isVegetarian: false, rating: 4.5, isPopular: false },
        { id: 52, categoryId: 4, name: "Salmon Avocado Salad", description: "Fresh salmon with avocado and greens", price: 18.99, image_url: "https://www.themealdb.com/images/media/meals/1549542994.jpg", isVegetarian: false, rating: 4.6, isPopular: false },
        { id: 53, categoryId: 4, name: "Kung Po Prawns", description: "Spicy Chinese prawns with peanuts", price: 20.99, image_url: "https://www.themealdb.com/images/media/meals/1525873040.jpg", isVegetarian: false, rating: 4.5, isPopular: false },
        { id: 54, categoryId: 4, name: "Shrimp Chow Fun", description: "Chinese wide noodles with shrimp", price: 16.99, image_url: "https://www.themealdb.com/images/media/meals/1529445434.jpg", isVegetarian: false, rating: 4.4, isPopular: false },
        { id: 55, categoryId: 4, name: "Sushi", description: "Assorted fresh sushi rolls", price: 22.99, image_url: "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg", isVegetarian: false, rating: 4.8, isPopular: true },
        { id: 56, categoryId: 4, name: "Seafood Rice", description: "Spanish style rice with mixed seafood", price: 19.99, image_url: "https://www.themealdb.com/images/media/meals/5r5rvx1763287943.jpg", isVegetarian: false, rating: 4.5, isPopular: false },
        { id: 57, categoryId: 4, name: "Salt & Pepper Squid", description: "Crispy seasoned squid with peppers", price: 15.99, image_url: "https://www.themealdb.com/images/media/meals/yxiilf1763759428.jpg", isVegetarian: false, rating: 4.3, isPopular: false },
        
        // PASTA & ITALIAN (10 items)
        { id: 58, categoryId: 5, name: "Lasagne", description: "Classic Italian layered pasta bake", price: 17.99, image_url: "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg", isVegetarian: false, rating: 4.7, isPopular: true },
        { id: 59, categoryId: 5, name: "Fettuccine Alfredo", description: "Creamy parmesan sauce with fettuccine", price: 16.99, image_url: "https://www.themealdb.com/images/media/meals/0jv5gx1661040802.jpg", isVegetarian: true, rating: 4.6, isPopular: false },
        { id: 60, categoryId: 5, name: "Spaghetti Carbonara", description: "Roman pasta with eggs and pancetta", price: 15.99, image_url: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg", isVegetarian: false, rating: 4.5, isPopular: true },
        { id: 61, categoryId: 5, name: "Chilli Prawn Linguine", description: "Spicy linguine with fresh prawns", price: 18.99, image_url: "https://www.themealdb.com/images/media/meals/usywpp1511189717.jpg", isVegetarian: false, rating: 4.6, isPopular: false },
        { id: 62, categoryId: 5, name: "Grilled Mac and Cheese", description: "Gourmet grilled mac and cheese sandwich", price: 14.99, image_url: "https://www.themealdb.com/images/media/meals/xutquv1505330523.jpg", isVegetarian: true, rating: 4.4, isPopular: false },
        { id: 63, categoryId: 5, name: "Pilchard Puttanesca", description: "Italian pasta with anchovies and olives", price: 16.99, image_url: "https://www.themealdb.com/images/media/meals/vvtvtr1511180578.jpg", isVegetarian: false, rating: 4.3, isPopular: false },
        { id: 64, categoryId: 5, name: "Venetian Duck Ragu", description: "Rich duck meat sauce with pasta", price: 22.99, image_url: "https://www.themealdb.com/images/media/meals/qvrwpt1511181864.jpg", isVegetarian: false, rating: 4.7, isPopular: false },
        { id: 65, categoryId: 5, name: "Lasagna Sandwiches", description: "Innovative lasagna in sandwich form", price: 15.99, image_url: "https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg", isVegetarian: false, rating: 4.2, isPopular: false },
        { id: 66, categoryId: 5, name: "Syrian Spaghetti", description: "Middle Eastern spiced pasta dish", price: 14.99, image_url: "https://www.themealdb.com/images/media/meals/5fu4ew1760524857.jpg", isVegetarian: true, rating: 4.3, isPopular: false },
        { id: 67, categoryId: 5, name: "Spicy Arrabiata Penne", description: "Spicy tomato sauce with penne pasta", price: 13.99, image_url: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg", isVegetarian: true, rating: 4.4, isPopular: false },
        
        // VEGETARIAN (13 items)
        { id: 68, categoryId: 6, name: "Ratatouille", description: "French stewed vegetables with herbs", price: 14.99, image_url: "https://www.themealdb.com/images/media/meals/wrpwuu1511786491.jpg", isVegetarian: true, rating: 4.5, isPopular: true },
        { id: 69, categoryId: 6, name: "Mushroom Chestnut Rotolo", description: "Italian pasta roll with mushrooms", price: 16.99, image_url: "https://www.themealdb.com/images/media/meals/ssyqwr1511451678.jpg", isVegetarian: true, rating: 4.6, isPopular: false },
        { id: 70, categoryId: 6, name: "Spinach Ricotta Cannelloni", description: "Stuffed pasta tubes with spinach", price: 15.99, image_url: "https://www.themealdb.com/images/media/meals/wspuvp1511303478.jpg", isVegetarian: true, rating: 4.4, isPopular: false },
        { id: 71, categoryId: 6, name: "Vegetarian Chilli", description: "Hearty bean and vegetable chili", price: 13.99, image_url: "https://www.themealdb.com/images/media/meals/wqurxy1511453156.jpg", isVegetarian: true, rating: 4.3, isPopular: false },
        { id: 72, categoryId: 6, name: "Kidney Bean Curry", description: "Indian style kidney bean curry", price: 13.99, image_url: "https://www.themealdb.com/images/media/meals/sywrsu1511463066.jpg", isVegetarian: true, rating: 4.5, isPopular: false },
        { id: 73, categoryId: 6, name: "Matar Paneer", description: "Indian peas and cottage cheese curry", price: 14.99, image_url: "https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg", isVegetarian: true, rating: 4.6, isPopular: false },
        { id: 74, categoryId: 6, name: "Koshari", description: "Egyptian rice pasta and lentil dish", price: 11.99, image_url: "https://www.themealdb.com/images/media/meals/4er7mj1598733193.jpg", isVegetarian: true, rating: 4.3, isPopular: false },
        { id: 75, categoryId: 6, name: "Stuffed Bell Peppers", description: "Peppers filled with quinoa and beans", price: 14.99, image_url: "https://www.themealdb.com/images/media/meals/b66myb1683207208.jpg", isVegetarian: true, rating: 4.5, isPopular: false },
        { id: 76, categoryId: 6, name: "Tofu Greens Stir-fry", description: "Tofu with vegetables and cashews", price: 13.99, image_url: "https://www.themealdb.com/images/media/meals/minfsc1763766806.jpg", isVegetarian: true, rating: 4.2, isPopular: false },
        { id: 77, categoryId: 6, name: "Thai Pumpkin Soup", description: "Creamy Thai spiced pumpkin soup", price: 9.99, image_url: "https://www.themealdb.com/images/media/meals/1brbso1763585098.jpg", isVegetarian: true, rating: 4.4, isPopular: false },
        { id: 78, categoryId: 6, name: "Dal Fry", description: "Indian spiced lentil curry", price: 10.99, image_url: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg", isVegetarian: true, rating: 4.3, isPopular: false },
        { id: 79, categoryId: 6, name: "Vegetarian Casserole", description: "Mixed vegetable baked casserole", price: 12.99, image_url: "https://www.themealdb.com/images/media/meals/vptwyt1511450962.jpg", isVegetarian: true, rating: 4.2, isPopular: false },
        { id: 80, categoryId: 6, name: "Cabbage Soup", description: "Russian style cabbage soup", price: 8.99, image_url: "https://www.themealdb.com/images/media/meals/60oc3k1699009846.jpg", isVegetarian: true, rating: 4.0, isPopular: false },
        
        // SOUPS (15 items)
        { id: 81, categoryId: 7, name: "French Onion Soup", description: "Classic caramelized onion soup with cheese", price: 9.99, image_url: "https://www.themealdb.com/images/media/meals/xvrrux1511783685.jpg", isVegetarian: false, rating: 4.7, isPopular: true },
        { id: 82, categoryId: 7, name: "Tom Yum Soup", description: "Thai hot and sour soup with prawns", price: 12.99, image_url: "https://www.themealdb.com/images/media/meals/9c5nlx1763424766.jpg", isVegetarian: false, rating: 4.6, isPopular: true },
        { id: 83, categoryId: 7, name: "Creamy Tomato Soup", description: "Rich blended tomato soup with herbs", price: 7.99, image_url: "https://www.themealdb.com/images/media/meals/stpuws1511191310.jpg", isVegetarian: true, rating: 4.4, isPopular: false },
        { id: 84, categoryId: 7, name: "Thai Pumpkin Soup", description: "Spiced Thai pumpkin with coconut milk", price: 8.99, image_url: "https://www.themealdb.com/images/media/meals/1brbso1763585098.jpg", isVegetarian: true, rating: 4.5, isPopular: false },
        { id: 85, categoryId: 7, name: "Beetroot Soup (Borscht)", description: "Traditional Ukrainian beetroot soup", price: 8.49, image_url: "https://www.themealdb.com/images/media/meals/zadvgb1699012544.jpg", isVegetarian: true, rating: 4.2, isPopular: false },
        { id: 86, categoryId: 7, name: "Fish Soup (Ukha)", description: "Russian fish soup with vegetables", price: 11.99, image_url: "https://www.themealdb.com/images/media/meals/7n8su21699013057.jpg", isVegetarian: false, rating: 4.3, isPopular: false },
        { id: 87, categoryId: 7, name: "Hot and Sour Soup", description: "Chinese spicy soup with tofu and pork", price: 10.99, image_url: "https://www.themealdb.com/images/media/meals/1529445893.jpg", isVegetarian: false, rating: 4.4, isPopular: false },
        { id: 88, categoryId: 7, name: "Split Pea Soup", description: "Hearty Canadian split pea with ham", price: 9.49, image_url: "https://www.themealdb.com/images/media/meals/xxtsvx1511814083.jpg", isVegetarian: false, rating: 4.3, isPopular: false },
        { id: 89, categoryId: 7, name: "Leblebi Soup", description: "Tunisian chickpea soup with harissa", price: 8.99, image_url: "https://www.themealdb.com/images/media/meals/x2fw9e1560460636.jpg", isVegetarian: true, rating: 4.1, isPopular: false },
        { id: 90, categoryId: 7, name: "Red Peas Soup", description: "Jamaican kidney bean soup with pork", price: 10.99, image_url: "https://www.themealdb.com/images/media/meals/sqpqtp1515365614.jpg", isVegetarian: false, rating: 4.2, isPopular: false },
        { id: 91, categoryId: 7, name: "Egg Drop Soup", description: "Chinese soup with silky egg ribbons", price: 6.99, image_url: "https://www.themealdb.com/images/media/meals/1529446137.jpg", isVegetarian: true, rating: 4.0, isPopular: false },
        { id: 92, categoryId: 7, name: "Moroccan Carrot Soup", description: "Spiced roasted carrot with cumin", price: 7.99, image_url: "https://www.themealdb.com/images/media/meals/jcr46d1614763831.jpg", isVegetarian: true, rating: 4.3, isPopular: false },
        { id: 93, categoryId: 7, name: "Broccoli Stilton Soup", description: "Creamy broccoli with blue cheese", price: 9.99, image_url: "https://www.themealdb.com/images/media/meals/tvvxpv1511191952.jpg", isVegetarian: true, rating: 4.5, isPopular: false },
        { id: 94, categoryId: 7, name: "Chorizo Chickpea Soup", description: "Spanish soup with chorizo and chickpeas", price: 11.99, image_url: "https://www.themealdb.com/images/media/meals/kggfo91763288633.jpg", isVegetarian: false, rating: 4.4, isPopular: false },
        { id: 95, categoryId: 7, name: "Thai Green Chicken Soup", description: "Spicy coconut chicken with herbs", price: 12.99, image_url: "https://www.themealdb.com/images/media/meals/7kb44y1763589084.jpg", isVegetarian: false, rating: 4.6, isPopular: false },
        
        // DESSERTS (15 items)
        { id: 96, categoryId: 8, name: "Chocolate Cake", description: "Rich chocolate cake with vanilla frosting", price: 6.99, image_url: "https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg", isVegetarian: true, rating: 4.8, isPopular: true },
        { id: 97, categoryId: 8, name: "Ice Cream Sundae", description: "Three scoops of ice cream with toppings", price: 5.99, image_url: "https://www.themealdb.com/images/media/meals/1xscby1764790242.jpg", isVegetarian: true, rating: 4.5, isPopular: false },
        { id: 98, categoryId: 8, name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: 7.99, image_url: "https://www.themealdb.com/images/media/meals/wprvrw1511641295.jpg", isVegetarian: true, rating: 4.7, isPopular: true },
        { id: 99, categoryId: 8, name: "Cheesecake", description: "New York style cheesecake with berries", price: 6.49, image_url: "https://www.themealdb.com/images/media/meals/swttys1511385853.jpg", isVegetarian: true, rating: 4.6, isPopular: true },
        { id: 100, categoryId: 8, name: "Apple Pie", description: "Traditional apple pie with cinnamon", price: 5.99, image_url: "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg", isVegetarian: true, rating: 4.4, isPopular: false },
        { id: 101, categoryId: 8, name: "Brownie", description: "Fudgy chocolate brownie with walnuts", price: 4.99, image_url: "https://www.themealdb.com/images/media/meals/yypvst1511386427.jpg", isVegetarian: true, rating: 4.8, isPopular: true },
        { id: 102, categoryId: 8, name: "Panna Cotta", description: "Silky Italian vanilla custard", price: 6.99, image_url: "https://www.themealdb.com/images/media/meals/0s80wo1764374393.jpg", isVegetarian: true, rating: 4.5, isPopular: false },
        { id: 103, categoryId: 8, name: "Fruit Tart", description: "Fresh seasonal fruit tart with pastry", price: 7.49, image_url: "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg", isVegetarian: true, rating: 4.3, isPopular: false },
        { id: 104, categoryId: 8, name: "Crème Brûlée", description: "French caramelized custard dessert", price: 7.99, image_url: "https://www.themealdb.com/images/media/meals/uryqru1511798039.jpg", isVegetarian: true, rating: 4.9, isPopular: true },
        { id: 105, categoryId: 8, name: "Molten Chocolate Cake", description: "Warm chocolate cake with lava center", price: 8.99, image_url: "https://www.themealdb.com/images/media/meals/twspvx1511784937.jpg", isVegetarian: true, rating: 4.9, isPopular: true },
        { id: 106, categoryId: 8, name: "Key Lime Pie", description: "Tangy key lime pie with meringue", price: 6.49, image_url: "https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg", isVegetarian: true, rating: 4.4, isPopular: false },
        { id: 107, categoryId: 8, name: "Red Velvet Cake", description: "Moist red velvet with cream cheese frosting", price: 7.99, image_url: "https://www.themealdb.com/images/media/meals/ywwrsp1511720277.jpg", isVegetarian: true, rating: 4.6, isPopular: true },
        { id: 108, categoryId: 8, name: "Carrot Cake", description: "Spiced carrot cake with cream cheese", price: 5.99, image_url: "https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg", isVegetarian: true, rating: 4.3, isPopular: false },
        { id: 109, categoryId: 8, name: "Lemon Meringue Pie", description: "Tangy lemon pie with fluffy meringue", price: 6.49, image_url: "https://www.themealdb.com/images/media/meals/rxvxrr1511797671.jpg", isVegetarian: true, rating: 4.2, isPopular: false },
        { id: 110, categoryId: 8, name: "Chocolate Mousse", description: "Light and airy chocolate mousse", price: 6.99, image_url: "https://www.themealdb.com/images/media/meals/v5jrnn1764362830.jpg", isVegetarian: true, rating: 4.7, isPopular: false },
        { id: 111, categoryId: 8, name: "Strawberry Shortcake", description: "Fresh strawberries with biscuit base", price: 7.49, image_url: "https://www.themealdb.com/images/media/meals/oe8rg51699014028.jpg", isVegetarian: true, rating: 4.5, isPopular: true },
        { id: 112, categoryId: 8, name: "Pecan Pie", description: "Southern style pecan pie with nuts", price: 6.99, image_url: "https://www.themealdb.com/images/media/meals/rqvwxt1511384809.jpg", isVegetarian: true, rating: 4.4, isPopular: false }
    ]
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
        loadDefaultMenuData();
        return false;
    }
}

// Fallback default menu data - now uses the large menu data
function loadDefaultMenuData() {
    // Use the large restaurant menu data
    restaurantData.categories = largeRestaurantMenu.categories;
    restaurantData.products = largeRestaurantMenu.products;
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

console.log(`Generated menu with ${largeRestaurantMenu.products.length} items across ${largeRestaurantMenu.categories.length} categories`);