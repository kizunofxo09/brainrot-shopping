// AQUI VOCÊ MODIFICA OS PRODUTOS!
// Para cada produto você pode mudar:
// - name: o nome do item
// - price: o preço
// - category: a raridade (comum, raro, epico, lendario, mitico, god, secret, original)
// - sales: quantos foram vendidos
// - image: a URL da imagem (exemplo: 'https://exemplo.com/imagem.png')
//   OU use icon: '⚔️' se preferir emoji

const products = [
    { id: 1, name: 'Espada de Ferro', price: 50.00, category: 'comum', sales: '5.2k vendidos', image: 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Espada' },
    { id: 2, name: 'Escudo Místico', price: 150.00, category: 'raro', sales: '3.5k vendidos', image: 'https://via.placeholder.com/200x200/9B59B6/FFFFFF?text=Escudo' },
    { id: 3, name: 'Armadura Celestial', price: 450.00, category: 'epico', sales: '1.8k vendidos', image: 'https://via.placeholder.com/200x200/8E44AD/FFFFFF?text=Armadura' },
    { id: 4, name: 'Espada Flamejante', price: 850.00, category: 'lendario', sales: '890 vendidos', image: 'https://via.placeholder.com/200x200/E67E22/FFFFFF?text=Fogo' },
    { id: 5, name: 'Cajado Arcano', price: 1200.00, category: 'mitico', sales: '420 vendidos', image: 'https://via.placeholder.com/200x200/1ABC9C/FFFFFF?text=Cajado' },
    { id: 6, name: 'Coroa Divina', price: 2500.00, category: 'god', sales: '180 vendidos', image: 'https://via.placeholder.com/200x200/F39C12/FFFFFF?text=Coroa' },
    { id: 7, name: 'Anel Sombrio', price: 5000.00, category: 'secret', sales: '45 vendidos', image: 'https://via.placeholder.com/200x200/34495E/FFFFFF?text=Anel' },
    { id: 8, name: 'Lâmina Ancestral', price: 10000.00, category: 'original', sales: '12 vendidos', image: 'https://via.placeholder.com/200x200/C0392B/FFFFFF?text=Lamina' },
    { id: 9, name: 'Poção de Vida', price: 25.00, category: 'comum', sales: '8.1k vendidos', icon: '🧪' },
    { id: 10, name: 'Botas Aladas', price: 350.00, category: 'epico', sales: '2.1k vendidos', icon: '👢' },
    { id: 11, name: 'Amuleto da Sorte', price: 180.00, category: 'raro', sales: '3.7k vendidos', icon: '🔮' },
    { id: 12, name: 'Machado do Trovão', price: 950.00, category: 'lendario', sales: '650 vendidos', icon: '⚡' },
];

let cart = [];
let currentFilter = 'all';

function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Verifica se usa imagem ou emoji
        const mediaContent = product.image 
            ? `<img src="${product.image}" alt="${product.name}">`
            : product.icon;
        
        card.innerHTML = `
            <div class="product-img">${mediaContent}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                <div class="product-sales">${product.sales}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterCategory(category) {
    currentFilter = category;
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    showNotification('Produto adicionado ao carrinho! 🎉');
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        renderCart();
    }
}

function renderCart() {
    const container = document.getElementById('cartItems');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Seu carrinho está vazio</p>';
    } else {
        container.innerHTML = cart.map(item => `
            <div style="padding: 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-weight: bold;">${item.name}</div>
                    <div style="color: #ee4d2d;">R$ ${item.price.toFixed(2)} x ${item.quantity}</div>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                    Remover
                </button>
            </div>
        `).join('');
    }
    
    document.getElementById('cartTotal').textContent = `R$ ${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Inicializa a página
renderProducts(products);