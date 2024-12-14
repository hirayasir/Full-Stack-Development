    //By Hira Yasir 2024
    // Enable strict mode globally  
    "use strict"; 

    document.addEventListener('DOMContentLoaded', () => {
    const modeChangeButton = document.getElementById('mode-change');

    // Check if dark mode is already set in localStorage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        modeChangeButton.textContent = 'Light Mode'; // Change button text to Light Mode
    }

    // Add an event listener to the button
    modeChangeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update the button text and localStorage
        if (document.body.classList.contains('dark-mode')) {
            modeChangeButton.textContent = 'Light Mode'; // Change button text to Light Mode
            localStorage.setItem('dark-mode', 'enabled'); 
        } else {
            modeChangeButton.textContent = 'Dark Mode'; // Change button text to Dark Mode
            localStorage.removeItem('dark-mode'); // Remove the dark mode preference
        }
    });
});

    // JavaScript for handling the cart logic
    document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll('.add-to-cart');
    let subtotal = 0;
    const taxRate = 0.10;
    const shippingCost = 5.00;

    products.forEach(product => {
        product.addEventListener('click', function () {
            // Use closest to find the nearest article element with the data-price attribute
            const price = parseFloat(this.closest('article').getAttribute('data-price'));
            
            if (!isNaN(price)) {
                subtotal += price;
                updateCart();
            } else {
                console.error('Invalid price value');
            }
        });
    });

    function updateCart() {
        const tax = subtotal * taxRate;
        const total = subtotal + tax + shippingCost;

        document.getElementById('subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('tax').textContent = tax.toFixed(2);
        document.getElementById('shipping').textContent = shippingCost.toFixed(2);
        document.getElementById('total').textContent = total.toFixed(2);
    }

    document.getElementById('checkout').addEventListener('click', function () {
        if (subtotal === 0) {
            alert('Your cart is empty. Please add items before checking out.');
        } else {
            alert(`Thank you for your order! Your total is $${(subtotal + (subtotal * taxRate) + shippingCost).toFixed(2)}.`);
            subtotal = 0;
            updateCart();
        }
    });
});

    // Contact form validation and submission
    document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const fullNameInput = document.getElementById('full-name');
    const phoneInput = document.getElementById('phone-number');
    const emailInput = document.getElementById('email-input');
    const messageInput = document.getElementById('message');
    const preferenceRadio = document.querySelectorAll('input[name="preference"]');
    const errorMessages = document.querySelectorAll('.error-message');
    const thankYouMessage = document.getElementById('thank-you-message');

    // Regex patterns for validation
    const namePattern = /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/; // First and last name regex
    const phonePattern = /^[0-9]{10}$/; // 10 digit phone number
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation for all emails

    form.addEventListener('submit', function (event) {
        // Clear previous error messages
        errorMessages.forEach(msg => msg.textContent = '');

        let isValid = true;
        let userInfo = {}; // Object to store user info

        // Validate full name
        if (!namePattern.test(fullNameInput.value.trim())) {
            showError(fullNameInput, 'Please enter your first and last name.');
            isValid = false;
        } else {
            userInfo.fullName = fullNameInput.value.trim();
        }

        // contact preference is selected or not
        const isPreferenceSelected = Array.from(preferenceRadio).some(radio => radio.checked);
        if (!isPreferenceSelected) {
            showError(preferenceRadio[0].parentElement, 'Please select a preferred contact method.');
            isValid = false;
        } else {
            userInfo.preferredContact = Array.from(preferenceRadio).find(radio => radio.checked).value;
        }

        // Validate phone number if phone is selected
        if (userInfo.preferredContact === "Phone") {
            if (!phonePattern.test(phoneInput.value.trim())) {
                showError(phoneInput, 'Please enter a valid 10-digit phone number.');
                isValid = false;
            } else {
                userInfo.phoneNumber = phoneInput.value.trim();
            }
        }

        // Validate email if email is selected
        if (userInfo.preferredContact === "Email") {
            if (!emailPattern.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            } else {
                userInfo.email = emailInput.value.trim();
            }
        }

        // Validate comments/message 
        if (messageInput.value.trim() === "") {
            showError(messageInput, 'Please enter your comments.');
            isValid = false;
        } else {
            userInfo.comments = messageInput.value.trim();
        }

        // If form is valid, show the thank you message and reset the form
        if (isValid) {
            event.preventDefault(); // Prevent actual form submission
            thankYouMessage.innerHTML = `<p>Thank you, ${userInfo.fullName}! Your response has been submitted successfully.</p>
                                          <p>Preferred Contact: ${userInfo.preferredContact}</p>
                                          <p>${userInfo.preferredContact === "Phone" ? `Phone Number: ${userInfo.phoneNumber}` : `Email: ${userInfo.email}`}</p>
                                          <p>Comments: ${userInfo.comments}</p>`;
            thankYouMessage.style.display = 'block';
            form.reset(); // Reset the form fields
        } else {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });

    // Function to display error messages
    function showError(inputElement, message) {
        const errorMessage = inputElement.nextElementSibling; 
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.textContent = message;
        }
    }

    // Validate on input change
    form.addEventListener('input', function (event) {
        const target = event.target;
        if (target.matches('input[type="text"]') || target.matches('textarea')) {
            const errorMessage = target.nextElementSibling; 
            if (errorMessage) {
                errorMessage.textContent = ''; // Clear error message on change
            }
        }

        if (target.matches('input[name="preference"]')) {
            const errorMessage = target.closest('fieldset').nextElementSibling; 
            if (errorMessage) {
                errorMessage.textContent = ''; 
            }
        }
    });
});