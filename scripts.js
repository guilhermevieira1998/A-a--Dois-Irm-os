let cart = [];

function addItem(item, price) {
    const cartItem = { item, price, notes: "" };
    cart.push(cartItem);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((cartItem, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${cartItem.item} - R$ ${cartItem.price},00</span>
            <button class="remove-item" onclick="removeItem(${index})">X</button>
            <div class="order-notes-section">
                <textarea class="item-notes" placeholder="Observação do pedido.." onchange="updateNotes(${index}, this.value)">${cartItem.notes}</textarea>
            </div>
        `;
        cartItems.appendChild(listItem);
    });
    showOrderSection();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function showOrderSection() {
    const orderSection = document.getElementById('order-notes-section');
    const placeOrderButton = document.getElementById('place-order');
    if (cart.length > 0) {
        orderSection.style.display = 'block';
        placeOrderButton.style.display = 'block';
    } else {
        orderSection.style.display = 'none';
        placeOrderButton.style.display = 'none';
    }
}

function updateNotes(index, notes) {
    cart[index].notes = notes;
}

function placeOrder() {
    const phoneNumber = "5521982342790"; 
    let message = 'Olá, gostaria de fazer os seguintes pedidos:\n';
    cart.forEach(cartItem => {
        message += `\n- ${cartItem.item} - R$ ${cartItem.price},00`;
        if (cartItem.notes.trim() !== "") {
            message += `\n  Observações: ${cartItem.notes}`;
        }
    });

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
