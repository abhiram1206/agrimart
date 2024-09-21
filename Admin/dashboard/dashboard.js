window.onload = function() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../login/login.html';
    }
    const profileImage = localStorage.getItem('profile_img');
    if (profileImage) {
        document.getElementById('profile').src = profileImage;
    }
    const name = localStorage.getItem('AdminName');
    if (name) {
        document.getElementById('name').innerHTML = name;
    }
    const email = localStorage.getItem('AdminEmail');
    if (email) {
        document.getElementById('email').innerHTML = email;
    }
};

document.getElementById("signout-btn").addEventListener("click", function () {
    localStorage.removeItem('token');
    localStorage.removeItem('AdminName');
    localStorage.removeItem('AdminEmail');
    localStorage.removeItem('profile_img');

    window.location.href = '../login/login.html';
});

const sidebarItems = document.querySelectorAll('.sidebar img');

function removeActiveClass() {
    sidebarItems.forEach(item => {
        item.classList.remove('active');
    });
}

sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        removeActiveClass(); 
        item.classList.add('active');  
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const sidebarItems = document.querySelectorAll('.sidebar img');
    const mainContent = document.querySelector('.main-content');

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove 'active' class from all sidebar items
            sidebarItems.forEach(i => i.classList.remove('active'));

            // Add 'active' class to the clicked item
            item.classList.add('active');

            // Load the corresponding HTML page into the main content
            const page = item.getAttribute('data-page');
            loadPage(page);
        });
    });

    function loadPage(page) {
        fetch(`./pages/${page}/${page}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                mainContent.innerHTML = html;
            })
            .catch(error => {
                mainContent.innerHTML = '<h1>Error loading page</h1><p>There was an error loading the page.</p>';
                console.error('Error:', error);
            });
    }

    // Set the default page to 'home' on initial load
    loadPage('home');
    // Set the 'home' item as active on initial load
    document.querySelector('.sidebar img[data-page="home"]').classList.add('active');
});
