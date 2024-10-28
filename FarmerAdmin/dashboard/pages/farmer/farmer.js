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
];

const rowsPerPage = 12;
let currentPage = 1;
const totalPages = Math.ceil(farmerData.length / rowsPerPage);

const farmerTableBody = document.getElementById('farmerTableBody');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');

function loadTablePage(page) {
    farmerTableBody.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;
    
    const currentData = farmerData.slice(start, end);
    
    currentData.forEach(farmer => {
        const row = `
            <tr>
                <td>${farmer.name}</td>
                <td>${farmer.email}</td>
                <td>${farmer.orders}</td>
                <td>${farmer.earned}</td>
                <td><p class="date-joined">${farmer.joined}</p></td>
                <td>${farmer.products}</td>
                <td><img src="/Admin/assets/edit-text.png" style="background-color: #fff;border-radius: 50%;width:40px;" alt=""></td>
            </tr>
        `;
        farmerTableBody.insertAdjacentHTML('beforeend', row);
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
