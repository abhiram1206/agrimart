const ProductData = [
    { 
        productName: "Fresh Farm Grown Tomatoes 1kg",
        productImg: "https://m.economictimes.com/thumb/msid-95423731,width-1200,height-900,resizemode-4,imgsize-56196/tomatoes-canva.jpg",
        sellerName: "Shawn", 
        sellerEmail: "Shawn@gmail.com", 
        category: 'Vegetables', 
        Price: "₹45", 
        joined: "21st Aug 2024, 07:00 PM", 
    },
    { 
        productName: "Fresh Farm Grown Tomatoes 1kg",
        productImg: "https://m.economictimes.com/thumb/msid-95423731,width-1200,height-900,resizemode-4,imgsize-56196/tomatoes-canva.jpg",
        sellerName: "Shawn", 
        sellerEmail: "Shawn@gmail.com", 
        category: 'Vegetables', 
        Price: "₹45", 
        joined: "21st Aug 2024, 07:00 PM", 
    },
    { 
        productName: "Fresh Farm Grown Tomatoes 1kg",
        productImg: "https://m.economictimes.com/thumb/msid-95423731,width-1200,height-900,resizemode-4,imgsize-56196/tomatoes-canva.jpg",
        sellerName: "Shawn", 
        sellerEmail: "Shawn@gmail.com", 
        category: 'Vegetables', 
        Price: "₹45", 
        joined: "21st Aug 2024, 07:00 PM", 
    },
    { 
        productName: "Fresh Farm Grown Tomatoes 1kg",
        productImg: "https://m.economictimes.com/thumb/msid-95423731,width-1200,height-900,resizemode-4,imgsize-56196/tomatoes-canva.jpg",
        sellerName: "Shawn", 
        sellerEmail: "Shawn@gmail.com", 
        category: 'Vegetables', 
        Price: "₹45", 
        joined: "21st Aug 2024, 07:00 PM", 
    },
];

const uniqueCategory = [...new Set(ProductData.map(product => product.category))];

const productFilterData = document.querySelector('.product-filter .checkbox');
productFilterData.innerHTML = ''; 

uniqueCategory.forEach(city => {
    const cityCheckbox = `
        <div class="City-Checkbox">
            <input type="checkbox" id="${city.toLowerCase()}" name="${city}">
            <label for="${city.toLowerCase()}">${city}</label>
        </div>
    `;
    productFilterData.insertAdjacentHTML('beforeend', cityCheckbox);
});

const rowsPerPage = 12;
let currentPage = 1;
const totalPages = Math.ceil(ProductData.length / rowsPerPage);

const ProductDataTable = document.getElementById('ProductDataTable');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');

function loadTablePage(page) {
    ProductDataTable.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;
    
    const currentData = ProductData.slice(start, end);
    
    currentData.forEach(product => {
        const row = `
            <tr>
                <td><div class='c-details'>
                    <img src="${product.productImg}">
                    <div class='c-details-text'>
                        <h2>${product.productName}</h2>
                    </div>
                </div></td>
                <td>${product.sellerEmail}</td>
                <td>${product.category}</td>
                <td>${product.sellerName}</td>
                <td>${product.Price}</td>
                <td><p class="date-joined">${product.joined}</p></td>
                <td><img src="/Admin/assets/edit-text.png" style="background-color: #fff;border-radius: 50%;width:40px;" alt=""></td>
            </tr>
        `;
        ProductDataTable.insertAdjacentHTML('beforeend', row);
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
