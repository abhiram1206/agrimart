const QueryData = [
    { 
        CustomerName: "Abhiram Putta",
        customerEmail: "abhiramputta12@gmail.com", 
        query: "i want to contact a farmer for bulk ordering", 
        queryDate: "50 mins ago", 
    },
    { 
        CustomerName: "Abhiram Putta",
        customerEmail: "abhiramputta12@gmail.com", 
        query: "i want to contact a farmer for bulk ordering", 
        queryDate: "50 mins ago", 
    },
    { 
        CustomerName: "Abhiram Putta",
        customerEmail: "abhiramputta12@gmail.com", 
        query: "i want to contact a farmer for bulk ordering", 
        queryDate: "50 mins ago", 
    },
];

const rowsPerPage = 12;
let currentPage = 1;
const totalPages = Math.ceil(QueryData.length / rowsPerPage);

const QueryDataTable = document.getElementById('QueryDataTable');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');

function loadTablePage(page) {
    QueryDataTable.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;
    
    const currentData = QueryData.slice(start, end);
    
    currentData.forEach(query => {
        const row = `
            <tr>
                <td>${query.CustomerName}</td>
                <td>${query.customerEmail}</td>
                <td>${query.query}</td>
                <td><p>${query.queryDate}</p></td>
                <td><button class="reply">Reply<img src="/Admin/assets/share 1.png" alt=""></button></td>
            </tr>
        `;
        QueryDataTable.insertAdjacentHTML('beforeend', row);
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
