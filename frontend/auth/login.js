document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const highlightBar = document.getElementById('highlight-bar');

    function switchTab(tab) {
        if (tab === 'login') {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            highlightBar.style.transform = 'translateX(0)';
        } else {
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            highlightBar.style.transform = 'translateX(100%)';
        }
    }

    window.switchTab = switchTab;

    async function login() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('http://localhost:3000/userauth/userlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('access_token', data.token);
                window.location.href = '../main.html'; // Redirect to home page after login
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    async function signup() {
        const firstName = document.getElementById('signup-firstname').value;
        const lastName = document.getElementById('signup-lastname').value;
        const email = document.getElementById('signup-email').value;
        const mobile = document.getElementById('signup-mobile').value;
        const city = document.getElementById('signup-city').value;
        const password = document.getElementById('signup-password').value;

        try {
            const response = await fetch('http://localhost:3000/userauth/usersignup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ FirstName: firstName, LastName: lastName, email, MobileNum: mobile, City: city, password })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('access_token', data.token);
                window.location.href = '/home'; // Redirect to home page after signup
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    }

    window.login = login;
    window.signup = signup;
});
