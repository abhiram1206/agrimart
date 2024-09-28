// Example data (you can replace it with your actual data from a database or API)
const farmerData = [
    { name: "John Doe", email: "JohnDoe@gmail.com", orders: 100, earned: "₹100", joined: "21st Aug 2024, 07:00 PM", products: 25 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    { name: "Jane Smith", email: "JaneSmith@gmail.com", orders: 90, earned: "₹120", joined: "18th Aug 2024, 10:00 AM", products: 30 },
    // Add more data as needed...
    // You should have at least more than 12 entries to test the pagination properly
];

// Configuration for pagination
const rowsPerPage = 12;
let currentPage = 1;
const totalPages = Math.ceil(farmerData.length / rowsPerPage);

// DOM Elements
const farmerTableBody = document.getElementById('farmerTableBody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');

// Function to load data for the current page
function loadTablePage(page) {
    // Clear the existing table data
    farmerTableBody.innerHTML = "";

    // Calculate the start and end indices for the data to display
    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;
    
    // Slice the data for the current page
    const currentData = farmerData.slice(start, end);
    
    // Populate the table with the current data
    currentData.forEach(farmer => {
        const row = `
            <tr>
                <td>${farmer.name}</td>
                <td>${farmer.email}</td>
                <td>${farmer.orders}</td>
                <td>${farmer.earned}</td>
                <td>${farmer.joined}</td>
                <td>${farmer.products}</td>
                <td><img src="/Admin/assets/edit-text.png" style="background-color: #fff;border-radius: 50%;" alt=""></td>
            </tr>
        `;
        farmerTableBody.insertAdjacentHTML('beforeend', row);
    });

    // Update page numbers
    pageNumbers.innerHTML = `${page} `;

    // Disable/Enable buttons based on the current page
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
}

// Event listeners for the Previous and Next buttons
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadTablePage(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        loadTablePage(currentPage);
    }
});

// Initially load the first page
loadTablePage(currentPage);
