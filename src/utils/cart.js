// LocalStorage Cart Manager for AESTIA
const CART_STORAGE_KEY = 'aestia_cart';

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading cart from localStorage', e);
    return [];
  }
}

export function addToCart(product, quantity = 1) {
  try {
    const cart = getCart();
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        categoryName: product.categoryName,
        quantity: Math.max(1, quantity),
      });
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    return cart;
  } catch (e) {
    console.error('Error adding to cart in localStorage', e);
    return [];
  }
}

export function updateCartQuantity(productId, quantity) {
  try {
    const cart = getCart();
    const index = cart.findIndex((item) => item.id === productId);

    if (index > -1) {
      if (quantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = quantity;
      }
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
    }
    return cart;
  } catch (e) {
    console.error('Error updating cart quantity', e);
    return [];
  }
}

export function removeFromCart(productId) {
  try {
    let cart = getCart();
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    return cart;
  } catch (e) {
    console.error('Error removing from cart', e);
    return [];
  }
}

export function getCartTotalCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

export function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
}
