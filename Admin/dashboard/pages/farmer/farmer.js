let Data = []; // Initialized to an empty array

// Fetch data from the backend
function fetchData() {
    fetch("http://localhost:3000/seller/sellerList")
        .then(response => response.json())
        .then(data => {
            Data = data.data || []; // Data fetched from backend
            totalPages = Math.ceil(Data.length / rowsPerPage); // Update totalPages based on fetched data
            loadTablePage(currentPage); // Load the first page with the fetched data
        })
        .catch(error => console.error('Error fetching Farmer data:', error));
}

fetchData(); // Call the fetchData function to get the data when the page loads

const rowsPerPage = 12;
let currentPage = 1;
let totalPages = 1; // Default totalPages value; will be updated after data is fetched

const farmerTableBody = document.getElementById('farmerTableBody');
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

function loadTablePage(page) {
    farmerTableBody.innerHTML = ""; 

    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;
    const currentData = Data.slice(start, end);
    currentData.forEach(farmer => {
        console.log(farmer)
        const row = `
            <tr>
                <td>${farmer.UserDetails.firstName + " " + farmer.UserDetails.lastName}</td>
                <td>${farmer.UserDetails.email}</td>
                <td>${farmer.orders || 0}</td>
                <td>${farmer.earned || 0}</td>
                <td><p class="date-joined">${formatDate(farmer.createdAt)}</p></td>
                <td>${farmer.products || 0}</td>
                <td><img src="/Admin/assets/edit-text.png" style="background-color: #fff;border-radius: 50%;width:40px;" alt=""></td>
            </tr>
        `;
        farmerTableBody.insertAdjacentHTML('beforeend', row); // Insert row into table
    });

    pageNumbers.innerHTML = `${page} `;
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
}

// Previous button click event
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadTablePage(currentPage);
    }
});

// Next button click event
nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        loadTablePage(currentPage);
    }
});

// Toggle filter button functionality
document.getElementById('filterButton').addEventListener('click', function() {
    const filterSection = document.getElementById('filterSection');
    
    if (filterSection.style.display === 'none' || filterSection.style.display === '') {
        filterSection.style.display = 'block'; 
    } else {
        filterSection.style.display = 'none'; 
    }
});
