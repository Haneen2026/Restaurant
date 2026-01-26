Build a Fully responsive (desktop, tablet, mobile) Restaurant system, the webpage comprising:
1.  landing page
    includes:
    - Header with logo, cart, dark mode toggle, and cta button "order now"
    - Hero section with call-to-action button "order now"
    - Navigation Home, Menu, About, Contact
    - Section 1: Featured Products
    - Section 2: Popular Items
    - Section 3: Why Choose Us
    - Section 4: order section with Call to Action (view menu)
    - Footer with 
      a.    policies (Privacy Policy, Terms of Service, Refund Policy)
      b.    Contact & Support (phone, email, address)
      c.    Follow us links (social media)
      d.    working Hours
      e.    © 2026 Restaurant. All rights reserved.
    order now and view menu all of them directs the user to the products page

2.  products page comprising
    - Header with logo, cart, dark mode toggle, and cta button "order now"
    - menu as category buttons (flexbox)
    - Filter, Vegetarian / Non-Vegetarian as toggle or checkbox, and search bar
    - Loading state (skeleton / spinner) when fetching data from API
    - products cards (grid of products with image, name, description (contains 50 characters max make the description truncate after 50 characters), price, and add to cart button) 
    - pagination
    - Footer with 
      a.    policies (Privacy Policy, Terms of Service, Refund Policy)
      b.    Contact & Support (phone, email, address)
      c.    Follow us links (social media)
      d.    working Hours
      e.    © 2026 Restaurant. All rights reserved.

3.  products details page
    - Header with logo, cart, dark mode toggle, and cta button "order now"
    - product details (image, name, price, description, Quantity selector ( + / – ) and add to cart button)
    - Related products 
    - Footer with 
      a.    policies (Privacy Policy, Terms of Service, Refund Policy)
      b.    Contact & Support (phone, email, address)
      c.    Follow us links (social media)
      d.    working Hours
      e.    © 2026 Restaurant. All rights reserved.

4.  2 main integrations:
    a. API Data for products and categories  
    b. Google sheet for orders
5.  2 main modules:
    a. cart module
    -  Add / remove products
    - Update quantity
    - Cart persistence (localStorage)
    - Cart preview dropdown or page
    - Checkout button
    b. checkout module
    -   Customer details form (name, phone, address)
    -   Order summary
    -   Order confirmation page
    -   Save order to Google Sheet (https://docs.google.com/spreadsheets/d/1aTZsNYlDxrLitXRGvQ1bOJXKHi2rIV6pYOKKr9Xyz-s/edit?gid=0#gid=0)

Error handling (empty results, API failure)

