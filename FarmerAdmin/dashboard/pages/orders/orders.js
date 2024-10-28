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
];

// const uniqueCategory = [...new Set(OrderData.map(product => product.category))];

// const productFilterData = document.querySelector('.product-filter .checkbox');
// productFilterData.innerHTML = ''; 

// uniqueCategory.forEach(city => {
//     const cityCheckbox = `
//         <div class="City-Checkbox">
//             <input type="checkbox" id="${city.toLowerCase()}" name="${city}">
//             <label for="${city.toLowerCase()}">${city}</label>
//         </div>
//     `;
//     productFilterData.insertAdjacentHTML('beforeend', cityCheckbox);
// });

const rowsPerPage = 12;
let currentPage = 1;
const totalPages = Math.ceil(OrderData.length / rowsPerPage);

const OrderDataTable = document.getElementById('OrderDataTable');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');

function loadTablePage(page) {
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

    pageNumbers.innerHTML = `${page} `;

    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
}

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

loadTablePage(currentPage);

// toggle filter button
document.getElementById('filterButton').addEventListener('click', function() {
    const filterSection = document.getElementById('filterSection');
    
    if (filterSection.style.display === 'none' || filterSection.style.display === '') {
        filterSection.style.display = 'block'; 
    } else {
        filterSection.style.display = 'none'; 
    }
});
