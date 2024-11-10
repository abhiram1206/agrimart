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

// Keep track of open dropdowns
let currentOpenDropdown = null;

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const isDropdownClick = event.target.closest('.quantity');
    const isOptionClick = event.target.closest('.options');
    
    if (!isDropdownClick && !isOptionClick && currentOpenDropdown) {
        currentOpenDropdown.style.display = 'none';
        const quantityDiv = currentOpenDropdown.previousElementSibling;
        if (quantityDiv) {
            quantityDiv.classList.remove('active');
        }
        currentOpenDropdown = null;
    }
});

function toggleOptions(event, price, optionsId, quantityId) {
    event.preventDefault();
    event.stopPropagation();

    const options = document.getElementById(optionsId);
    const quantityDiv = event.currentTarget;

    if (!options) {
        console.error(`Element with ID ${optionsId} not found`);
        return;
    }

    // Close currently open dropdown if it's different from the clicked one
    if (currentOpenDropdown && currentOpenDropdown !== options) {
        currentOpenDropdown.style.display = 'none';
        const prevQuantityDiv = currentOpenDropdown.previousElementSibling;
        if (prevQuantityDiv) {
            prevQuantityDiv.classList.remove('active');
        }
    }

    // Toggle current dropdown
    const isDisplayed = options.style.display === 'block';
    options.style.display = isDisplayed ? 'none' : 'block';
    quantityDiv.classList.toggle('active');

    // Update current open dropdown reference
    currentOpenDropdown = isDisplayed ? null : options;

    // Generate options if they haven't been created yet
    if (!options.children.length) {
        const quantities = Array.from({length: 30}, (_, i) => i + 1);
        quantities.forEach(q => {
            const li = document.createElement('li');
            li.innerText = q;
            li.onclick = function(e) {
                e.stopPropagation();
                updateQuantity(q, price, optionsId, quantityId);
            };
            options.appendChild(li);
        });
    }
}

function updateQuantity(quantity, price, optionsId, quantityId) {
    // Update quantity display
    const quantityElement = document.getElementById(quantityId);
    if (quantityElement) {
        quantityElement.innerText = quantity;
    }

    // Update price display
    const priceId = `price${optionsId.charAt(optionsId.length - 1)}`;
    const priceElement = document.getElementById(priceId);
    if (priceElement) {
        const totalPrice = (price * quantity).toFixed(2);
        priceElement.innerText = totalPrice;
    }

    // Hide dropdown
    const options = document.getElementById(optionsId);
    if (options) {
        options.style.display = 'none';
        const quantityDiv = options.previousElementSibling;
        if (quantityDiv) {
            quantityDiv.classList.remove('active');
        }
    }
    currentOpenDropdown = null;
}

function itemDetails(price, quantity) {
    // Store selected item details in localStorage for use on the details page
    const itemData = {
        price: price,
        quantity: quantity,
        totalPrice: (price * quantity).toFixed(2)
    };
    localStorage.setItem('selectedItem', JSON.stringify(itemData));
    return true; // Allow normal link navigation
}

// function toggleFavorite(element) {
//     const img = element.querySelector('.favorite-icon');
//     const defaultSrc = "../assets/heart (4).png";
//     const yellowHeartSrc = "../assets/heart (3).png";
  
//     // Toggle the image source and update the padding
//     if (img.src.includes(defaultSrc)) {
//       img.src = yellowHeartSrc;
//     //   img.style.padding = "500px";
//     } else {
//       img.src = defaultSrc;
//     //   img.style.padding = "5px";
//     }
  
//     // // Add a data attribute to track the current state
//     // element.dataset.isFavorite = img.src.includes(yellowHeartSrc);
//   }

// function toggleFavorite(element) {
//     const img = element.querySelector('.favorite-icon');
//     const defaultSrc = "../assets/heart (4).png";
//     const yellowHeartSrc = "../assets/heart (3).png";
  
//     // Toggle the image source and update the padding
//     if (img.src.includes(defaultSrc)) {
//       img.src = yellowHeartSrc;
//       img.style.padding = "10px";
//     } else {
//       img.src = defaultSrc;
//       img.style.padding = "5px";
//     }
//   }

//   function toggleFavorite(element) {
//     const img = element.querySelector('.favorite-icon');
//     const yellowHeartSrc = "../assets/heart (4).png";
//     const defaultSrc = "../assets/heart (3).png";
  
//     // Toggle the image source and update the padding
//     if (img.src === yellowHeartSrc) 
//     {
//       img.src = defaultSrc;
//       img.style.padding = "10px";
//     } 
//     else  {
//       img.src = yellowHeartSrc;
//       img.style.padding = "5px";
//     }
//   }


function toggleFavorite(element) {
    const img = element.querySelector('.favorite-icon');
    const yellowHeartSrc = "../assets/heart (5).png";
    const defaultSrc = "../assets/heart (3).png";
  
    // Toggle the image source and update the padding
    if (img.src.includes(yellowHeartSrc)) {
      img.src = defaultSrc;
      img.style.padding = "10px";
    } else {
      img.src = yellowHeartSrc;
      img.style.padding = "5px";
    }
  }