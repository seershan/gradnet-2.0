document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    setInterval(nextTestimonial, 5000);

    // Animate features on scroll
    const features = document.querySelectorAll('.feature');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    features.forEach(feature => {
        featureObserver.observe(feature);
    });
});

