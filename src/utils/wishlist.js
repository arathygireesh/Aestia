// LocalStorage Wishlist Manager for AESTIA
const WISHLIST_STORAGE_KEY = 'aestia_wishlist';

export function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading wishlist from localStorage', e);
    return [];
  }
}

export function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.some((item) => item.id === productId);
}

export function toggleWishlist(product) {
  try {
    let wishlist = getWishlist();
    const index = wishlist.findIndex((item) => item.id === product.id);
    let added = false;

    if (index > -1) {
      wishlist.splice(index, 1);
      added = false;
    } else {
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        categoryName: product.categoryName,
        description: product.description,
      });
      added = true;
    }

    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlist-updated'));
    return { wishlist, added };
  } catch (e) {
    console.error('Error updating wishlist in localStorage', e);
    return { wishlist: [], added: false };
  }
}

export function removeFromWishlist(productId) {
  try {
    let wishlist = getWishlist();
    wishlist = wishlist.filter((item) => item.id !== productId);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlist-updated'));
    return wishlist;
  } catch (e) {
    console.error('Error removing item from wishlist', e);
    return [];
  }
}

export function getWishlistCount() {
  const wishlist = getWishlist();
  return wishlist.length;
}
