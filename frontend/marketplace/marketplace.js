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

function toggleOptions(event, price, optionsId, quantityId) {
    // Toggle visibility of options
    const options = document.getElementById(optionsId);
    options.style.display = options.style.display === 'none' ? 'block' : 'none';

    // You can also implement the logic to select quantity and update price here
    const quantities = [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]; // example quantities
    options.innerHTML = ''; // clear existing options
    quantities.forEach(q => {
        const li = document.createElement('li');
        li.innerText = q;
        li.onclick = function () {
            document.getElementById(quantityId).innerText = q; // update selected quantity
            const totalPrice = price * q; // calculate total price
            document.getElementById(`price${optionsId.charAt(optionsId.length - 1)}`).innerText = totalPrice.toFixed(2); // update total price for the vegetable
            options.style.display = 'none'; // hide options after selection
        };
        options.appendChild(li);
    });
}

function itemDetails(price, quantity) 
{
    // Implement the logic to navigate to item details or store the selected item info
    const url = `http://127.0.0.1:5501/frontend/itemdetails/item_details.html?price=${price}&quantity=${quantity}`;
    window.location.href = url;
}
