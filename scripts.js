// Initialize Lucide icons
lucide.createIcons();

// Product data
const products = [
    {
        id: 1,
        name: "Premium Almonds",
        description: "Raw, unsalted California almonds rich in nutrients",
        price: 350.00,
        image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        name: "Premium Cashews",
        description: "Whole, organic cashews from sustainable farms",
        price: 490.00,
        image: "https://media.istockphoto.com/id/182673285/photo/cashew-nuts.webp?a=1&b=1&s=612x612&w=0&k=20&c=zJz0QO_Y2OWqFQtxEhjWrgm7VCqzpkPW_R2lTHq2wD8="
    },
    {
        id: 3,
        name: "Organic spices",
        description: "Steel-cut organic spices with ancient grains blend",
        price: 890.00,
        image: "https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BpY2VzfGVufDB8fDB8fHww"
    },
    {
        id: 4,
        name: "Dry Fruits",
        description: "Premium Dry Fruits rich in protein and vitamins",
        price: 260.00,
        image: "https://plus.unsplash.com/premium_photo-1669205434519-a042ba09fbdd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRyeSUyMGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D"
    }
];

// Toggle mobile sidebar
const hamburger = document.getElementById('hamburger');
const mobileSidebar = document.getElementById('mobileSidebar');
const closeSidebar = document.getElementById('closeSidebar');

hamburger.addEventListener('click', () => {
    mobileSidebar.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
    mobileSidebar.classList.remove('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (event) => {
    if (!mobileSidebar.contains(event.target) && !hamburger.contains(event.target)) {
        mobileSidebar.classList.remove('active');
    }
});
// Cart functionality
let cart = [];

// DOM elements
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const productsGrid = document.getElementById('productsGrid');

// Toggle cart sidebar
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});
mobileCartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    mobileSidebar.classList.remove('active'); // Close mobile sidebar when cart opens
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

// Update cart display
function updateCart() {
    // Update cart count
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQuantity;

    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Rs.${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `Rs.${total.toFixed(2)}`;
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    updateCart();
}

// Render products
function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">Rs.${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize
renderProducts();

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, { threshold: 0.1 });

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});