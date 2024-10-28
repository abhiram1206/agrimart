const OrderData = [
    { 
        orderId: "Order 1001",
        DeliveryStatus: "Completed", 
        orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
        quantity: '2kgs', 
        sellerName: "Shawn", 
        paymentStatus: "Received", 
        orderedDate: "21st Aug 2024, 07:00 PM", 
    },
    { 
        orderId: "Order 1002",
        DeliveryStatus: "Not Completed", 
        orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
        quantity: '2kgs', 
        sellerName: "Shawn", 
        paymentStatus: "Not Received",  
        orderedDate: "21st Aug 2024, 07:00 PM", 
    },
];

const rowsPerPage = 12;
let currentPage = 1;
const totalPages = Math.ceil(OrderData.length / rowsPerPage);

// Generic function to load the order table in any element
function loadOrderTable(elementId) {
    const tableBody = document.getElementById(elementId);
    if (!tableBody) return;

    tableBody.innerHTML = "";
    OrderData.slice(0, rowsPerPage).forEach(order => {
        const row = `
            <tr>
                <td>${order.orderId}</td>
                <td><p class='${order.DeliveryStatus}'>${order.DeliveryStatus}</p></td>
                <td>${order.orderedProduct}</td>
                <td>${order.quantity}</td>
                <td><p class='${order.paymentStatus}'>${order.paymentStatus}</p></td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Load table in orders.html
loadOrderTable('OrderDataTable');

// Load the same table in home.html
loadOrderTable('OrderDataTableHome');

// Pagination logic remains the same for orders.html
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');

function loadTablePage(page) {
    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;
    
    const currentData = OrderData.slice(start, end);
    
    OrderDataTable.innerHTML = ""; // Assuming OrderDataTable is globally available
    currentData.forEach(order => {
        const row = `
            <tr>
                <td>${order.orderId}</td>
                <td><p class='${order.DeliveryStatus}'>${order.DeliveryStatus}</p></td>
                <td>${order.orderedProduct}</td>
                <td>${order.quantity}</td>
                <td><p class='${order.paymentStatus}'>${order.paymentStatus}</p></td>
            </tr>
        `;
        OrderDataTable.insertAdjacentHTML('beforeend', row);
    });
    pageNumbers.innerHTML = `${page} `;
    
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
}

prevBtn?.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadTablePage(currentPage);
    }
});

nextBtn?.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        loadTablePage(currentPage);
    }
});

loadTablePage(currentPage);
