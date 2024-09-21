window.onload = function() {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = './dashboard/dashboard.html';
    }
};

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const AdminEmail = document.getElementById('AdminEmail').value;
    const password = document.getElementById('password').value;

    clearErrorMessages();

    if (!AdminEmail) {
        displayError('email-error', 'Email is required.');
        return;
    }

    if (!password) {
        displayError('password-error', 'Password is required.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ AdminEmail, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('AdminName', data.AdminName);
            localStorage.setItem('AdminEmail', data.AdminEmail);
            localStorage.setItem('profile_img', data.profile_img);

            window.location.href = '../dashboard/dashboard.html';
        } else {
            handleErrors(data.error);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
    }
});

function handleErrors(error) {
    switch (error) {
        case "Invalid email or password":
            displayError('email-error', "Incorrect email or password. Please try again.");
            displayError('password-error', "Incorrect email or password. Please try again.");
            break;
        case "Request body is missing required fields":
            if (!AdminEmail) {
                displayError('email-error', "Please fill out the email field.");
            }
            if (!password) {
                displayError('password-error', "Please fill out the password field.");
            }
            break;
        case "Email is invalid":
            displayError('email-error', "Please enter a valid email address.");
            break;
        case "Password is invalid":
            displayError('password-error', "Password must be 6-20 characters long, include at least one digit, one uppercase, and one lowercase letter.");
            break;
        default:
            displayError('email-error', "An unknown error occurred. Please try again.");
            displayError('password-error', "An unknown error occurred. Please try again.");
    }
}

function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';

    setTimeout(() => {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }, 3000); 
}

function clearErrorMessages() {
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('password-error').style.display = 'none';
}
