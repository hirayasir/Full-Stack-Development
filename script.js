document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Logic
    const modeChangeButton = document.getElementById('mode-change');
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        modeChangeButton.textContent = 'Light Mode';
    }
    modeChangeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            modeChangeButton.textContent = 'Light Mode';
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            modeChangeButton.textContent = 'Dark Mode';
            localStorage.removeItem('dark-mode');
        }
    });

    // Cart Logic
    const products = document.querySelectorAll('.add-to-cart');
    let subtotal = 0;
    const taxRate = 0.10;
    const shippingCost = 5.00;

    function updateCart() {
        const tax = subtotal * taxRate;
        const total = subtotal + tax + shippingCost;
        document.getElementById('subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('tax').textContent = tax.toFixed(2);
        document.getElementById('shipping').textContent = shippingCost.toFixed(2);
        document.getElementById('total').textContent = total.toFixed(2);
    }

    products.forEach(product => {
        product.addEventListener('click', () => {
            const price = parseFloat(product.closest('article').getAttribute('data-price'));
            if (!isNaN(price)) {
                subtotal += price;
                updateCart();
            } else {
                console.error('Invalid price value');
            }
        });
    });

    document.getElementById('checkout').addEventListener('click', () => {
        if (subtotal === 0) {
            alert('Your cart is empty. Please add items before checking out.');
        } else {
            alert(`Thank you for your order! Your total is $${(subtotal + (subtotal * taxRate) + shippingCost).toFixed(2)}.`);
            subtotal = 0;
            updateCart();
        }
    });

    // Contact Form Validation
    const form = document.getElementById('contact-form');
    const fullNameInput = document.getElementById('full-name');
    const phoneInput = document.getElementById('phone-number');
    const emailInput = document.getElementById('email-input');
    const messageInput = document.getElementById('message');
    const preferenceRadio = document.querySelectorAll('input[name="preference"]');
    const errorMessages = document.querySelectorAll('.error-message');
    const thankYouMessage = document.getElementById('thank-you-message');
    const namePattern = /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', event => {
        errorMessages.forEach(msg => (msg.textContent = ''));
        let isValid = true;
        let userInfo = {};

        if (!namePattern.test(fullNameInput.value.trim())) {
            showError(fullNameInput, 'Please enter your first and last name.');
            isValid = false;
        } else {
            userInfo.fullName = fullNameInput.value.trim();
        }

        const isPreferenceSelected = Array.from(preferenceRadio).some(radio => radio.checked);
        if (!isPreferenceSelected) {
            showError(preferenceRadio[0].parentElement, 'Please select a preferred contact method.');
            isValid = false;
        } else {
            userInfo.preferredContact = Array.from(preferenceRadio).find(radio => radio.checked).value;
        }

        if (userInfo.preferredContact === 'Phone' && !phonePattern.test(phoneInput.value.trim())) {
            showError(phoneInput, 'Please enter a valid 10-digit phone number.');
            isValid = false;
        }

        if (userInfo.preferredContact === 'Email' && !emailPattern.test(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Please enter your comments.');
            isValid = false;
        } else {
            userInfo.comments = messageInput.value.trim();
        }

        if (isValid) {
            event.preventDefault();
            thankYouMessage.innerHTML = `<p>Thank you, ${userInfo.fullName}! Your response has been submitted successfully.</p>`;
            thankYouMessage.style.display = 'block';
            form.reset();
        } else {
            event.preventDefault();
        }
    });

    function showError(inputElement, message) {
        const errorMessage = inputElement.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.textContent = message;
        }
    }
});
