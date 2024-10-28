const sidebarItems = document.querySelectorAll('.sidebar img');
const contentDiv = document.getElementById('content'); // Target div for content

// Remove 'active' class from all sidebar items
function removeActiveClass() {
    sidebarItems.forEach(item => item.classList.remove('active'));
}

// Function to dynamically load JS after loading HTML
function loadJS(jsFile) {
    const existingScript = document.getElementById('dynamic-js');
    if (existingScript) {
        existingScript.remove();  // Remove the old script if exists
    }

    // Create and append the new script dynamically
    const script = document.createElement('script');
    script.src = jsFile;
    script.id = 'dynamic-js';
    script.onload = () => {
        console.log(`${jsFile} loaded`);
    };
    document.body.appendChild(script);
}

// Function to load the HTML content dynamically
function loadContent(page) {
    fetch(`./pages/${page}/${page}.html`)
        .then(response => response.text())
        .then(htmlContent => {
            contentDiv.innerHTML = htmlContent;

            // Now that HTML is loaded, load and run the corresponding JavaScript
            const jsFile = `./pages/${page}/${page}.js`;
            fetch(jsFile)
                .then(response => response.text())
                .then(jsContent => {
                    // Ensure the JS runs after the DOM is updated
                    setTimeout(() => {
                        eval(jsContent);  // Evaluate the fetched JS code
                    }, 0);  // Short delay to ensure the DOM is updated
                })
                .catch(error => {
                    console.error(`Error loading the JS for ${page}:`, error);
                });
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

// Add 'active' class and load the new content and JS for each sidebar item
sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        removeActiveClass();
        item.classList.add('active');
        loadContent(page);  // Load new content and its associated JS
    });
});

// Load 'home' page on initial load and set it as active
loadContent('home');
document.querySelector('.sidebar img[data-page="home"]').classList.add('active');
