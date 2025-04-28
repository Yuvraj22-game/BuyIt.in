const products = [
    { id: 1, name: 'T-shirt', price: 19.99 },
    { id: 2, name: 'Jeans', price: 49.99 },
    { id: 3, name: 'Sneakers', price: 89.99 },
    { id: 4, name: 'Hat', price: 14.99 }
  ];
  
  let cart = [];
  
  const productsEl = document.getElementById('products');
  const cartItemsEl = document.getElementById('cart-items');
  const searchEl = document.getElementById('search');
  const checkoutBtn = document.getElementById('checkout');
  
  function renderProducts(list) {
    productsEl.innerHTML = '';
    list.forEach(p => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p>$${p.price.toFixed(2)}</p>
        <button onclick="addToCart(${p.id})">Add</button>
      `;
      productsEl.appendChild(div);
    });
  }
  
  function renderCart() {
    cartItemsEl.innerHTML = '';
    cart.forEach(item => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <h4>${item.name} x${item.quantity}</h4>
        <p>$${subtotal}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItemsEl.appendChild(div);
    });
  }
  
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    renderCart();
  }
  
  function removeFromCart(id) {
    const cartItem = cart.find(item => item.id === id);
    if (!cartItem) return;
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      cart = cart.filter(item => item.id !== id);
    }
    renderCart();
  }
  
  function checkout() {
    if (!cart.length) return;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Order placed. Total: $${total.toFixed(2)}`);
    cart = [];
    renderCart();
  }
  
  searchEl.addEventListener('input', () => {
    const term = searchEl.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
  });
  
  checkoutBtn.addEventListener('click', checkout);
  
  renderProducts(products);
  renderCart();
  