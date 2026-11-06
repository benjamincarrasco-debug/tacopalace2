// State & Initial LocalStorage setup
let cart = JSON.parse(localStorage.getItem('taco_cart')) || [
  { id: 1, name: 'Taco Clasico', price: 7990, qty: 1 },
  { id: 2, name: 'Tacos con queso crispy', price: 8990, qty: 1 },
  { id: 3, name: 'Tacos con Kimchi', price: 12990, qty: 1 }
];

let selectedSalsa = 'Suave';
let currentQty = 1;

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadges();
});

function updateCartBadges() {
  const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) cartCountEl.textContent = totalCount;

  const floatCountEl = document.getElementById('float-cart-count');
  if (floatCountEl) floatCountEl.textContent = totalCount;

  const floatTotalEl = document.getElementById('float-cart-total');
  if (floatTotalEl) floatTotalEl.textContent = formatPrice(totalPrice);

  const summaryCountEl = document.getElementById('summary-count');
  if (summaryCountEl) summaryCountEl.textContent = totalCount;

  const summaryTotalEl = document.getElementById('summary-total');
  if (summaryTotalEl) summaryTotalEl.textContent = formatPrice(totalPrice);
}

function formatPrice(num) {
  return num.toLocaleString('es-CL') + '$';
}

/* Salsa Selection */
function selectSalsa(btnElement, salsaName) {
  const buttons = document.querySelectorAll('.salsa-btn');
  buttons.forEach(b => b.classList.remove('active'));
  btnElement.classList.add('active');
  selectedSalsa = salsaName;
}

/* Quantity Controls */
function updateQty(delta) {
  currentQty += delta;
  if (currentQty < 1) currentQty = 1;
  
  const qtyValEl = document.getElementById('qty-val');
  if (qtyValEl) qtyValEl.textContent = currentQty;

  const itemLabelEl = document.getElementById('item-count-label');
  if (itemLabelEl) itemLabelEl.textContent = `${currentQty} producto${currentQty > 1 ? 's' : ''}`;

  const unitPrice = 7990;
  const subtotalValEl = document.getElementById('subtotal-val');
  if (subtotalValEl) subtotalValEl.textContent = formatPrice(unitPrice * currentQty);
}

/* Add product to cart */
function addToCart() {
  cart.push({
    id: Date.now(),
    name: 'Taco Clasico',
    price: 7990,
    qty: currentQty,
    salsa: selectedSalsa
  });
  localStorage.setItem('taco_cart', JSON.stringify(cart));
  updateCartBadges();
  alert('¡Producto agregado al carrito!');
}

/* Auth Page Functions */
let isRegisterMode = true;

function switchAuthMode() {
  isRegisterMode = !isRegisterMode;
  const title = document.getElementById('auth-title');
  const confirmGroup = document.getElementById('confirm-pass-group');
  const submitBtn = document.getElementById('submit-btn');
  const toggleMsg = document.getElementById('toggle-msg');
  const toggleBtn = document.getElementById('toggle-mode-btn');

  if (isRegisterMode) {
    title.textContent = 'Registrarse';
    confirmGroup.style.display = 'block';
    submitBtn.textContent = 'Entrar';
    toggleMsg.textContent = '¿Aún no tienes cuenta?';
    toggleBtn.textContent = 'Iniciar sesión';
  } else {
    title.textContent = 'Iniciar sesión';
    confirmGroup.style.display = 'none';
    submitBtn.textContent = 'Entrar';
    toggleMsg.textContent = '¿Aún no tienes cuenta?';
    toggleBtn.textContent = 'Registrarse';
  }
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}

function toggleBothPasswords(checkbox) {
  const p1 = document.getElementById('password');
  const p2 = document.getElementById('confirm-password');
  const type = checkbox.checked ? 'text' : 'password';
  if (p1) p1.type = type;
  if (p2) p2.type = type;
}

function handleAuth() {
  alert(isRegisterMode ? '¡Registro exitoso!' : '¡Sesión iniciada!');
  window.location.href = '../../index.html';
}

function clearSearch() {
  const field = document.getElementById('search-field');
  if (field) field.value = '';
}

function confirmOrder() {
  alert('¡Pedido verificado! Redirigiendo al seguimiento...');
  window.location.href = 'seguimiento.html';
}