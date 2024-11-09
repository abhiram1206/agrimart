document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-container');
    const itemsTotalEl = document.querySelector('.order-summary .item:nth-child(1) .price');
    const deliveryEl = document.querySelector('.order-summary .item:nth-child(2) .price');
    const orderTotalEl = document.querySelector('.order-summary .item1 .price1 h3');

    const itemPrice = 370; 
    let deliveryFee = 120;

    function updateOrderSummary() {
        let itemsTotal = 0;

// totaling
        cartItemsContainer.querySelectorAll('.cart-item').forEach((item) => {
            const quantityEl = item.querySelector('.item-quantity');
            const quantity = parseInt(quantityEl.textContent);

            itemsTotal += itemPrice * quantity;
        });

// delivery free
        deliveryFee = itemsTotal > 1000 ? 0 : itemsTotal > 0 ? 120 : 0;
        deliveryEl.textContent = `₹${deliveryFee.toFixed(2)}`;


        const orderTotal = itemsTotal + deliveryFee;
        orderTotalEl.textContent = `₹${orderTotal.toFixed(2)}`;


        itemsTotalEl.textContent = `₹${itemsTotal.toFixed(2)}`;
    }


    updateOrderSummary();


    cartItemsContainer.querySelectorAll('.cart-item').forEach((item) => {
        const addButton = item.querySelector('.item-actions .quantity-btn:first-child');
        const subtractButton = item.querySelector('.item-actions .quantity-btn:last-child');
        const quantityEl = item.querySelector('.item-quantity');
        const deleteButton = item.querySelector('.delete-btn');

        let quantity = parseInt(quantityEl.textContent);


        addButton.addEventListener('click', () => {
            quantity++;
            quantityEl.textContent = `${quantity} kg`;
            updateOrderSummary();
        });


        subtractButton.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityEl.textContent = `${quantity} kg`;
                updateOrderSummary();
            }
        });

// deleting the item
        deleteButton.addEventListener('click', () => {
            item.remove(); 
            updateOrderSummary(); 
        });
    });
});