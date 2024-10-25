const OrderData = [
    { 
        orderId: "Order 1001",
        DeliveryStatus: "Completed", 
        orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
        quantity: '2kgs', 
        paymentStatus: "Received", 
        orderedDate: "21st Aug 2024, 07:00 PM", 
    },
    { 
        orderId: "Order 1002",
        DeliveryStatus: "Not Completed", 
        orderedProduct: "Fresh Farm Grown Tomatoes 1kg", 
        quantity: '2kgs', 
        paymentStatus: "Not Received",  
        orderedDate: "21st Aug 2024, 07:00 PM", 
    },
];

const rowsPerPage = 12; // Example pagination logic
let currentPage = 1;

// Function to load the order table dynamically
function loadOrderTable(elementId) {
    const tableBody = document.getElementById(elementId); // Get correct element
    if (!tableBody) return;

    tableBody.innerHTML = ""; // Clear existing rows

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
        tableBody.insertAdjacentHTML('beforeend', row); // Insert rows
    });
}

// Load table in home.html
loadOrderTable('OrderDataTableHome');
