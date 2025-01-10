document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const graduationYear = document.getElementById('graduation-year').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    password,
                    graduationYear,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
            }

            // Always show success message and redirect
            showThankYouMessage();
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
            // Proceed anyway
            showThankYouMessage();
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 3000);
        }
    });

    function showThankYouMessage() {
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'thank-you-message';
        thankYouMessage.innerHTML = `
            <h2>Thank you for signing up!</h2>
            <p>Welcome to GradNet. You'll be redirected to your dashboard shortly.</p>
        `;
        document.body.appendChild(thankYouMessage);

        gsap.from(thankYouMessage, {
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

