const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');
const profileBtn = document.getElementById('.profile-btn');

hamburgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const isAuthenticated = !!localStorage.getItem('access_token');
    const signupBtn = document.getElementById('signup-btn');
    const signinBtn = document.getElementById('signin-btn');
    const becomeSellerBtn = document.getElementById('become-seller-btn');
    const cartBtn = document.getElementById('cart-btn');
    const profileBtn = document.getElementById('profile-btn');
    const mobileSignupBtn = document.getElementById('mobile-signup-btn');
    const mobileSigninBtn = document.getElementById('mobile-signin-btn');
    const mobileBecomeSellerBtn = document.getElementById('mobile-become-seller-btn');
    const mobileCartBtn = document.getElementById('mobile-cart-btn');
    const mobileProfileBtn = document.getElementById('mobile-profile-btn');

    if (isAuthenticated) {
        signupBtn.classList.add('hidden');
        signinBtn.classList.add('hidden');
        mobileSignupBtn.classList.add('hidden');
        mobileSigninBtn.classList.add('hidden');
        becomeSellerBtn.classList.remove('hidden');
        cartBtn.classList.remove('hidden');
        profileBtn.classList.remove('hidden');
        mobileBecomeSellerBtn.classList.remove('hidden');
        mobileCartBtn.classList.remove('hidden');
        mobileProfileBtn.classList.remove('hidden');
    } else {
        signupBtn.classList.remove('hidden');
        profileBtn.classList.remove('hidden');
        signinBtn.classList.remove('hidden');
        mobileSignupBtn.classList.remove('hidden');
        mobileSigninBtn.classList.remove('hidden');
        becomeSellerBtn.classList.add('hidden');
        cartBtn.classList.add('hidden');
        profileBtn.classList.add('hidden');
        mobileBecomeSellerBtn.classList.add('hidden');
        mobileCartBtn.classList.add('hidden');
        mobileProfileBtn.classList.add('hidden');
    }
});

function openDropdown() {
    let dropdown = document.getElementById('dropdown');
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'flex';
    } else {
        dropdown.style.display = 'none';
    }
}

function SignOut() {
    localStorage.removeItem('access_token'); 
    window.location.reload();
}

// function getItemDetails() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const price = parseFloat(urlParams.get('price'));
//     const quantity = parseInt(urlParams.get('quantity'));

//     // Fallback to handle NaN values
//     document.getElementById('item_det_price').textContent = isNaN(price) ? "N/A" : price.toFixed(2);
//     // document.getElementById('item_quantity').textContent = isNaN(quantity) ? "N/A" : quantity;
// }

// document.addEventListener('DOMContentLoaded', getItemDetails);

// Get the selected item data from localStorage
const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));

if (selectedItem) {
  // Display the selected item's details
  const priceElement = document.getElementById('item-price');
  const quantityElement = document.getElementById('item-quantity');
  const totalPriceElement = document.getElementById('item-total-price');

  if (priceElement) {
    priceElement.textContent = `₹ ${selectedItem.price.toFixed(2)}`;
  }

  if (quantityElement) {
    quantityElement.textContent = selectedItem.quantity;
  }

  if (totalPriceElement) {
    totalPriceElement.textContent = `₹ ${selectedItem.totalPrice}`;
  }

  // Update the price and quantity display on the current page
  const currentPriceElement = document.getElementById('price9');
  const currentQuantityElement = document.getElementById('selected_quantity9');
  if (currentPriceElement) {
    currentPriceElement.textContent = selectedItem.price.toFixed(2);
  }
  if (currentQuantityElement) {
    currentQuantityElement.textContent = selectedItem.quantity;
  }
}

// Add any additional functionality for the item details page
// ...