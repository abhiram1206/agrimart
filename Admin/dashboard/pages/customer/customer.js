let Data = []; // Initialized to an empty array

function fetchData() {
    fetch("http://localhost:3000/userauth/getUsers")
        .then(response => response.json())
        .then(data => {
            Data = data.data || [];
            loadFilters(Data); // Load filters dynamically from Data
            loadTablePage(Data); // Load table data
        })
        .catch(error => console.error('Error fetching customer data:', error));
}

fetchData();

// Load filters dynamically from Data
function loadFilters(Data) {
    const uniqueCities = [...new Set(Data.map(customer => customer.City || customer.customerCity))];
    const cityFilterSection = document.querySelector('.city-filter .checkbox');
    cityFilterSection.innerHTML = ''; // Clear any previous filters

    uniqueCities.forEach(city => {
        const cityCheckbox = `
            <div class="City-Checkbox">
                <input type="checkbox" id="${city.toLowerCase()}" name="${city}">
                <label for="${city.toLowerCase()}">${city}</label>
            </div>
        `;
        cityFilterSection.insertAdjacentHTML('beforeend', cityCheckbox);
    });

    const uniqueStatus = [...new Set(Data.map(customer => customer.ActiveStatus || "Online"))];
    const statusFilterSection = document.querySelector('.status-filter .checkbox');
    statusFilterSection.innerHTML = ''; // Clear any previous filters

    uniqueStatus.forEach(status => {
        const statusCheckbox = `
            <div class="City-Checkbox">
                <input type="checkbox" id="${status.toLowerCase()}" name="${status}">
                <label for="${status.toLowerCase()}">${status}</label>
            </div>
        `;
        statusFilterSection.insertAdjacentHTML('beforeend', statusCheckbox);
    });

    // Add event listeners to checkboxes for filtering on click
    document.querySelectorAll('.city-filter input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterData);
    });
    document.querySelectorAll('.status-filter input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterData);
    });
}

function filterData() {
    const selectedCities = Array.from(document.querySelectorAll('.city-filter input[type="checkbox"]:checked')).map(el => el.name);
    const selectedStatuses = Array.from(document.querySelectorAll('.status-filter input[type="checkbox"]:checked')).map(el => el.name);

    const filteredData = Data.filter(customer => {
        const cityMatch = selectedCities.length === 0 || selectedCities.includes(customer.City || customer.customerCity);
        const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(customer.ActiveStatus || "Online");
        return cityMatch && statusMatch;
    });

    currentPage = 1;
    loadTablePage(filteredData);
}

const rowsPerPage = 12;
let currentPage = 1;
let totalPages = 1;

const customerDataTable = document.getElementById('customerDataTable');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}

function loadTablePage(Data) {
    customerDataTable.innerHTML = ""; // Clear previous table rows

    totalPages = Math.ceil(Data.length / rowsPerPage);
    const currentData = Data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    currentData.forEach(customer => {
        const row = `
            <tr class="customer-row" data-email="${customer.email}">
                <td>
                    <div class='c-details'>
                        <img src="${customer.profile_img}">
                        <div class='c-details-text'>
                            <h2 class="customer-name" data-id="${customer.email}">
                                ${customer.FirstName || customer.customerName.split(' ')[0]} ${customer.LastName || customer.customerName.split(' ')[1]}
                            </h2>
                            <p>${customer.City || customer.customerCity}</p>
                        </div>
                    </div>
                </td>
                <td>${customer.email}</td>
                <td>${customer.MobileNum || "N/A"}</td>
                <td>${customer.orders || "0"}</td>
                <td>${customer.spent || "₹0"}</td>
                <td><p class='date-joined'>${formatDate(customer.joinedAt || customer.joinedAt)}</p></td>
                <td>${customer.ActiveStatus || "Online"}</td>
            </tr>
        `;

        customerDataTable.insertAdjacentHTML('beforeend', row);
    });

    updatePagination();
}

// Pagination
function updatePagination() {
    pageNumbers.innerHTML = ''; // Clear previous page numbers

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('li');
        pageBtn.classList.add('page-number');
        pageBtn.innerText = i;
        if (i === currentPage) pageBtn.classList.add('active');

        pageBtn.addEventListener('click', () => {
            currentPage = i;
            loadTablePage(Data);
        });

        pageNumbers.appendChild(pageBtn);
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Next and Previous button event listeners
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadTablePage(Data);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;

        loadTablePage(Data);
    }
});

// Search functionality
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();

    const filteredData = Data.filter(customer => {
        const name = `${customer.FirstName || customer.customerName.split(' ')[0]} ${customer.LastName || customer.customerName.split(' ')[1]}`.toLowerCase();
        return name.includes(searchTerm);
    });

    currentPage = 1;
    loadTablePage(filteredData);
});

const filterButton = document.getElementById('filterButton');
const filterSection = document.getElementById('filterSection');

// Toggle filter section visibility
filterButton.addEventListener('click', () => {
    if (filterSection.style.display === 'none' || filterSection.style.display === '') {
        filterSection.style.display = 'block'; // Show the filter section
    } else {
        filterSection.style.display = 'none'; // Hide the filter section
    }
});

function ordertable(){
    const OrderData = [
        { 
            orderId: "Order 1001",
            DeliveryStatus: "Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Recieved", 
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        { 
            orderId: "Order 1002",
            DeliveryStatus: "Not Completed", 
            orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
            quantity: '2kgs', 
            sellerName: "Shawn", 
            paymentStatus: "Not Recieved",  
            orderedDate: "21st Aug 2024, 07:00 PM", 
        },
        // Add more orders here if needed...
    ];

    const rowsPerPage = 10;
    let currentOrderPage = 1;
    const totalOrderPages = Math.ceil(OrderData.length / rowsPerPage);
    
    const OrderDataTable = document.getElementById('OrderDataTable');
    const orderPrevBtn = document.getElementById('orderPrevBtn'); // Use unique IDs
    const orderNextBtn = document.getElementById('orderNextBtn'); // Use unique IDs
    const orderPageNumbers = document.getElementById('orderPageNumbers'); // Use unique IDs

    function loadOrderTablePage(page) {
        OrderDataTable.innerHTML = "";
    
        const start = (page - 1) * rowsPerPage;
        const end = page * rowsPerPage;
        
        const currentData = OrderData.slice(start, end);
        
        currentData.forEach(order => {
            const row = `
                <tr>
                    <td>${order.orderId}</td>
                    <td><p class='${order.DeliveryStatus}'>${order.DeliveryStatus}</p></td>
                    <td>${order.orderedProduct}</td>
                    <td>${order.quantity}</td>
                    <td>${order.sellerName}</td>
                    <td><p class='${order.paymentStatus}'>${order.paymentStatus}</p></td>
                    <td><p class="date-joined">${order.orderedDate}</p></td>
                </tr>
            `;
            OrderDataTable.insertAdjacentHTML('beforeend', row);
        });
    
        // Update pagination info
        orderPageNumbers.innerHTML = `${page}`;
    
        // Disable prev and next buttons accordingly
        orderPrevBtn.disabled = page === 1;
        orderNextBtn.disabled = page === totalOrderPages;
    }
    
    orderPrevBtn.addEventListener('click', () => {
        if (currentOrderPage > 1) {
            currentOrderPage--;
            loadOrderTablePage(currentOrderPage);
        }
    });
    
    orderNextBtn.addEventListener('click', () => {
        if (currentOrderPage < totalOrderPages) {
            currentOrderPage++;
            loadOrderTablePage(currentOrderPage);
        }
    });
    
    // Initial table load
    loadOrderTablePage(currentOrderPage);
}

// Inside the popup click event
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('customer-name')) {
        const email = event.target.getAttribute('data-id');
        const customer = Data.find(c => c.email === email);

        if (customer) {
            // Display customer details in the popup
            document.getElementById('popupCustomerName').textContent = `${customer.FirstName} ${customer.LastName}`;
            document.getElementById('popupCustomerEmail').textContent = customer.email;
            document.getElementById('popupCustomerCity').textContent = customer.City || customer.customerCity;
            document.getElementById('popupCustomerMobile').textContent = customer.MobileNum || "N/A";
            document.getElementById('popupCustomerStatus').textContent = customer.ActiveStatus || "Online";
            document.getElementById('popupCustomerImage').src = customer.profile_img || "default_profile_image_url.jpg";
            overlay.style.display = 'block';
            customerPopup.style.display = 'block';
            
            // Initialize the order table within the popup
            ordertable();
        }
    }
});



// Popup logic
const overlay = document.getElementById('overlay');
const customerPopup = document.getElementById('customerPopup');
const closePopup = document.getElementById('closePopup');

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('customer-name')) {
        const email = event.target.getAttribute('data-id');
        const customer = Data.find(c => c.email === email);

        if (customer) {
            // Display customer details in the popup
            document.getElementById('popupCustomerName').textContent = `${customer.FirstName} ${customer.LastName}`;
            document.getElementById('popupCustomerEmail').textContent = customer.email;
            document.getElementById('popupCustomerCity').textContent = customer.City || customer.customerCity;
            document.getElementById('popupCustomerMobile').textContent = customer.MobileNum || "N/A";
            document.getElementById('popupCustomerStatus').textContent = customer.ActiveStatus || "Online";
            document.getElementById('popupCustomerImage').src = customer.profile_img || "default_profile_image_url.jpg";
            overlay.style.display = 'block';
            customerPopup.style.display = 'block';
            ordertable()
        }
    }
});

// Close popup
closePopup.addEventListener('click', function () {
    overlay.style.display = 'none';
    customerPopup.style.display = 'none';
});

// Close popup when clicking outside
overlay.addEventListener('click', function () {
    overlay.style.display = 'none';
    customerPopup.style.display = 'none';
});