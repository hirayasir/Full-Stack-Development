    //By Hira Yasir 2024
    // Enable strict mode globally  
    project/
├── index.html
├── course.html
├── contact.html
├── blog.html
├── styles.css
├── dark-mode.js
├── cart.js
└── contact.js

   "use strict";

document.addEventListener('DOMContentLoaded', () => {
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
});
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll('.add-to-cart');
    let subtotal = 0, taxRate = 0.10, shippingCost = 5.00;

    function updateCart() {
        const tax = subtotal * taxRate;
        const total = subtotal + tax + shippingCost;
        document.getElementById('subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('tax').textContent = tax.toFixed(2);
        document.getElementById('shipping').textContent = shippingCost.toFixed(2);
        document.getElementById('total').textContent = total.toFixed(2);
    }

    products.forEach(product => {
        product.addEventListener('click', function () {
            const price = parseFloat(this.closest('article').getAttribute('data-price'));
            if (!isNaN(price)) {
                subtotal += price;
                updateCart();
            }
        });
    });

    document.getElementById('checkout').addEventListener('click', () => {
        if (subtotal === 0) {
            alert('Your cart is empty.');
        } else {
            alert(`Order total: $${(subtotal + (subtotal * taxRate) + shippingCost).toFixed(2)}`);
            subtotal = 0;
            updateCart();
        }
    });
});
"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const fullNameInput = document.getElementById('full-name');
    const phoneInput = document.getElementById('phone-number');
    const emailInput = document.getElementById('email-input');
    const messageInput = document.getElementById('message');
    const preferenceRadio = document.querySelectorAll('input[name="preference"]');
    const errorMessages = document.querySelectorAll('.error-message');
    const thankYouMessage = document.getElementById('thank-you-message');

    form.addEventListener('submit', function (event) {
        errorMessages.forEach(msg => msg.textContent = '');
        let isValid = true;
        const namePattern = /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/;

        if (!namePattern.test(fullNameInput.value.trim())) {
            showError(fullNameInput, 'Enter first and last name.');
            isValid = false;
        }

        if (!Array.from(preferenceRadio).some(radio => radio.checked)) {
            showError(preferenceRadio[0].parentElement, 'Select a contact method.');
            isValid = false;
        }

        if (isValid) {
            event.preventDefault();
            thankYouMessage.innerHTML = `<p>Thank you, ${fullNameInput.value}! We'll contact you soon.</p>`;
            form.reset();
        } else {
            event.preventDefault();
        }
    });

    function showError(inputElement, message) {
        const errorMessage = inputElement.nextElementSibling;
        if (errorMessage) errorMessage.textContent = message;
    }
});
