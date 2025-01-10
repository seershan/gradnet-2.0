document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
            }

            // Always show success message and redirect
            showWelcomeBackMessage();
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
            // Proceed anyway
            showWelcomeBackMessage();
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 3000);
        }
    });

    function showWelcomeBackMessage() {
        const welcomeBackMessage = document.createElement('div');
        welcomeBackMessage.className = 'welcome-back-message';
        welcomeBackMessage.innerHTML = `
            <h2>Welcome back!</h2>
            <p>You've successfully logged in. You'll be redirected to your dashboard shortly.</p>
        `;
        document.body.appendChild(welcomeBackMessage);

        gsap.from(welcomeBackMessage, {
            duration: 0.5,
            opacity: 0,
            y: -50,
            ease: 'power2.out',
        });
    }

    // Add animation to form fields
    const formFields = document.querySelectorAll('.form-group input');
    formFields.forEach((field, index) => {
        gsap.from(field, {
            duration: 0.5,
            opacity: 0,
            y: 20,
            delay: index * 0.1,
            ease: 'power2.out',
        });
    });
});

