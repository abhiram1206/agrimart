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

const typewriting = document.querySelector(".words");
const textLoad = () => {
    setTimeout(() => {
        typewriting.textContent = "DOORSTEP";
    }, 0);
    setTimeout(() => {
        typewriting.textContent = "KITCHEN";
    }, 4000);
    setTimeout(() => {
        typewriting.textContent = "TABLE";
    }, 8000);
};
textLoad();
setInterval(textLoad, 12000);
