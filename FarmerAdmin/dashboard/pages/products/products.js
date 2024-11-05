let Data = [];
const rowsPerPage = 12;
let currentPage = 1;
let totalPages = 1;

const ProductDataTable = document.getElementById('ProductDataTable');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');

function fetchData() {
    fetch("http://localhost:3000/product/getProduct")
        .then(response => response.json())
        .then(data => { 
            Data = data.data || [];
            totalPages = Math.ceil(Data.length / rowsPerPage);
            loadTablePage(currentPage); 
            renderPagination();
        })
        .catch(error => console.error('Error fetching Product data:', error));
}

fetchData();

function loadTablePage(page) {
    ProductDataTable.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;
    const currentData = Data.slice(start, end);

    currentData.forEach(product => {
        const row = `
            <tr>
                <td><div class='c-details'>
                    <img src="http://localhost:3000/${product.productImage}" alt="${product.Name}">
                    <div class='c-details-text'>
                        <h2>${product.Name}</h2>
                        <p>${product.Description}</p>
                    </div>
                </div></td>
                <td>${product.Category}</td>
                <td>${product.Price}</td>
                <td>${product.offerPrice}</td>
                <td>${product.Quantity}</td>
                <td>${new Date(product.HarvestedDate).toLocaleDateString()}</td>
                <td class="action-cell">
                    <img src="/Admin/assets/edit-text.png" alt="edit" class="edit-icon" data-product-id="${product._id}">
                    <div class="dropdown-content" id="dropdown-${product._id}">
                        <button class="update" data-product-id="${product._id}">
                            Update
                        </button>
                        <button class="delete" data-product-id="${product._id}">
                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        `;
        ProductDataTable.insertAdjacentHTML('beforeend', row);
    });

    // Add event listeners after adding the rows
    addRowEventListeners();

    renderPagination();
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
}

// Render page numbers dynamically and highlight the current page
function renderPagination() {
    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.classList.add('page-number');
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            loadTablePage(currentPage);
        });
        pageNumbers.appendChild(pageBtn);
    }
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

// Event Delegation for table actions
document.getElementById('ProductDataTable').addEventListener('click', (event) => {
    const target = event.target;
    
    // Handle edit icon clicks
    if (target.classList.contains('edit-icon') || target.closest('.edit-icon')) {
        const icon = target.classList.contains('edit-icon') ? target : target.closest('.edit-icon');
        const productId = icon.dataset.productId;
        toggleDropdown(event, productId);
    }
    
    // Handle update button clicks
    if (target.classList.contains('update') || target.closest('.update')) {
        const button = target.classList.contains('update') ? target : target.closest('.update');
        const productId = button.dataset.productId;
        handleUpdate(productId);
    }
    
    // Handle delete button clicks
    if (target.classList.contains('delete') || target.closest('.delete')) {
        const button = target.classList.contains('delete') ? target : target.closest('.delete');
        const productId = button.dataset.productId;
        handleDelete(productId);
    }
});


// Modal controls
const modal = document.getElementById('addProductModal');
const addProductBtn = document.getElementById('addProductBtn');
const closeModal = document.querySelector('.close');
const productForm = document.getElementById('productform');
const saveButton = document.getElementById('saveProduct');

addProductBtn.addEventListener('click', () => {
    // Reset form and set save button to handle new product creation
    productForm.reset();
    saveButton.onclick = handleSubmit;
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Dropdown functionality
function toggleDropdown(event, productId) {
    event.stopPropagation();
    
    // Close all other dropdowns first
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    allDropdowns.forEach(dropdown => {
        if (dropdown.id !== `dropdown-${productId}`) {
            dropdown.classList.remove('show');
        }
    });

    // Toggle the clicked dropdown
    const dropdown = document.getElementById(`dropdown-${productId}`);
    dropdown.classList.toggle('show');

    // Handle overlay
    const overlay = document.querySelector('.overlay') || createOverlay();
    overlay.classList.toggle('show');
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.addEventListener('click', closeAllDropdowns);
    document.body.appendChild(overlay);
    return overlay;
}

function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
}

// Add event listener to close dropdowns when clicking outside
document.addEventListener('click', closeAllDropdowns);

// Form validation
function validateForm(formData) {
    const errors = [];
    
    // Required text/select fields
    const requiredFields = ['Name', 'Category', 'Description', 'packaging'];
    requiredFields.forEach(field => {
        if (!formData.get(field)) {
            errors.push(`${field} is required`);
        }
    });
    
    // Numeric fields validation
    const numericFields = [
        { name: 'Price', min: 0 },
        { name: 'offerPrice', min: 0 },
        { name: 'Quantity', min: 0 },
        { name: 'MinQuantity', min: 0 },
        { name: 'selfLife', min: 0 }
    ];
    
    numericFields.forEach(field => {
        const value = parseFloat(formData.get(field.name));
        if (isNaN(value) || value <= field.min) {
            errors.push(`${field.name} must be a positive number`);
        }
    });
    
    // Date validation
    const harvestedDate = new Date(formData.get('HarvestedDate'));
    if (isNaN(harvestedDate.getTime())) {
        errors.push('Harvested Date must be a valid date');
    }
    
    // Image validation for new products
    const isUpdate = formData.get('_id') !== null;
    if (!isUpdate && !formData.get('productImage')) {
        errors.push('Product Image is required');
    }
    
    return errors;
}

// Form submission handlers
async function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData();
    
    // Add form fields to FormData
    formData.append('Name', document.getElementById('Name').value);
    formData.append('Category', document.getElementById('Category').value);
    formData.append('Description', document.getElementById('productDescription').value);
    formData.append('Price', document.getElementById('price').value);
    formData.append('offerPrice', document.getElementById('offerPrice').value);
    formData.append('Quantity', document.getElementById('quantity').value);
    formData.append('MinQuantity', document.getElementById('minorder').value);
    formData.append('HarvestedDate', document.getElementById('harvestedDate').value);
    formData.append('selfLife', document.getElementById('selfLife').value);
    formData.append('packaging', document.getElementById('packaging').value);
    
    // Add the image file
    const imageFile = document.getElementById('productImage').files[0];
    if (imageFile) {
        formData.append('productImage', imageFile);
    }
    
    // Validate form data
    const errors = validateForm(formData);
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/product/addProduct', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Product added successfully!');
            modal.style.display = 'none';
            productForm.reset();
            fetchData(); // Refresh the table
        } else {
            alert(`Error: ${data.message || 'Failed to add product'}`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to add product. Please try again.');
    }
}

function handleUpdate(productId) {
    // Find the product data
    const product = Data.find(p => p._id === productId);
    if (!product) return;

    // Close the dropdown
    closeAllDropdowns();

    // Populate the modal with product data
    document.getElementById('Name').value = product.Name;
    document.getElementById('Category').value = product.Category;
    document.getElementById('productDescription').value = product.Description;
    document.getElementById('price').value = product.Price;
    document.getElementById('offerPrice').value = product.offerPrice;
    document.getElementById('quantity').value = product.Quantity;
    document.getElementById('harvestedDate').value = product.HarvestedDate.split('T')[0];
    document.getElementById('selfLife').value = product.selfLife;
    document.getElementById('packaging').value = product.packaging;
    document.getElementById('minorder').value = product.MinQuantity;

    // Show the modal
    modal.style.display = 'block';

    // Update the save button to handle updates
    saveButton.onclick = (e) => handleUpdateSubmit(e, productId);
}

async function handleUpdateSubmit(event, productId) {
    event.preventDefault();
    
    const formData = new FormData();
    
    // Add all form fields to FormData
    formData.append('Name', document.getElementById('Name').value);
    formData.append('Category', document.getElementById('Category').value);
    formData.append('Description', document.getElementById('productDescription').value);
    formData.append('Price', document.getElementById('price').value);
    formData.append('offerPrice', document.getElementById('offerPrice').value);
    formData.append('Quantity', document.getElementById('quantity').value);
    formData.append('MinQuantity', document.getElementById('minorder').value);
    formData.append('HarvestedDate', document.getElementById('harvestedDate').value);
    formData.append('selfLife', document.getElementById('selfLife').value);
    formData.append('packaging', document.getElementById('packaging').value);
    
    // Add the image file if a new one is selected
    const imageFile = document.getElementById('productImage').files[0];
    if (imageFile) {
        formData.append('productImage', imageFile);
    }
    
    // Add product ID for update
    formData.append('_id', productId);
    
    // Validate form data
    const errors = validateForm(formData);
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/product/updateProduct/${productId}`, {
            method: 'PUT',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Product updated successfully!');
            modal.style.display = 'none';
            productForm.reset();
            fetchData(); // Refresh the table
        } else {
            alert(`Error: ${data.message || 'Failed to update product'}`);
        }
    } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product. Please try again.');
    }
}

async function handleDelete(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
        const response = await fetch(`http://localhost:3000/product/deleteProduct/${productId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
            alert('Product deleted successfully!');
            fetchData(); // Refresh the table
        } else {
            alert(`Error: ${data.message || 'Failed to delete product'}`);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
    }
}






// bulk uploading
 // Bulk upload modal handlers
 const bulkUploadModal = document.getElementById('bulkUploadModal');
 const bulkUploadBtn = document.getElementById('bulkUploadBtn');
 const closeBulkModal = document.querySelector('.close-bulk');
 const uploadBulkBtn = document.getElementById('uploadBulk');

 // Show bulk upload modal
 bulkUploadBtn.addEventListener('click', () => {
     bulkUploadModal.style.display = 'block';
 });

 // Close bulk upload modal
 closeBulkModal.addEventListener('click', () => {
     bulkUploadModal.style.display = 'none';
 });

 // Close modal when clicking outside
 window.addEventListener('click', (e) => {
     if (e.target === bulkUploadModal) {
         bulkUploadModal.style.display = 'none';
     }
 });

 // Download template
 document.getElementById('downloadTemplate').addEventListener('click', async () => {
     try {
         const response = await fetch('http://localhost:3000/product/downloadTemplate');
         
         if (!response.ok) {
             throw new Error(`HTTP error! status: ${response.status}`);
         }
         
         const blob = await response.blob();
         const url = window.URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.href = url;
         a.download = 'products_template.xlsx';
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
         window.URL.revokeObjectURL(url);
     } catch (error) {
         console.error('Download error:', error);
         alert('Failed to download template');
     }
 });

 // Handle bulk upload
 uploadBulkBtn.addEventListener('click', async () => {
     const excelFile = document.getElementById('bulkFile').files[0];
     const imagesZip = document.getElementById('bulkImages').files[0];

     if (!excelFile || !imagesZip) {
         alert('Please select both Excel file and images ZIP file');
         return;
     }

     const formData = new FormData();
     formData.append('excel', excelFile);
     formData.append('images', imagesZip);

     try {
         const response = await fetch('http://localhost:3000/product/bulkUpload', {
             method: 'POST',
             body: formData
         });

         if (!response.ok) {
             const error = await response.json();
             throw new Error(error.message || 'Upload failed');
         }

         const result = await response.json();
         
         if (result.errors && result.errors.length > 0) {
             alert(`Upload completed with some errors:\n${result.errors.join('\n')}`);
         } else {
             alert(`Successfully uploaded ${result.productsAdded} products`);
         }

         bulkUploadModal.style.display = 'none';
         document.getElementById('bulkUploadForm').reset();
         fetchData(); // Refresh the table
     } catch (error) {
         console.error('Upload error:', error);
         alert(`Failed to upload products: ${error.message}`);
     }
});