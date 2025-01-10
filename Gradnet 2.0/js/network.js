document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const industryFilter = document.getElementById('industry-filter');
    const yearFilter = document.getElementById('year-filter');
    const alumniCards = document.querySelectorAll('.alumni-card');

    function filterAlumni() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedIndustry = industryFilter.value.toLowerCase();
        const selectedYear = yearFilter.value;

        alumniCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const jobTitle = card.querySelector('.job-title').textContent.toLowerCase();
            const company = card.querySelector('.company').textContent.toLowerCase();
            const year = card.querySelector('.graduation-year').textContent.split(' ')[2];

            const matchesSearch = name.includes(searchTerm) || jobTitle.includes(searchTerm) || company.includes(searchTerm);
            const matchesIndustry = selectedIndustry === '' || jobTitle.includes(selectedIndustry) || company.includes(selectedIndustry);
            const matchesYear = selectedYear === '' || year >= selectedYear;

            if (matchesSearch && matchesIndustry && matchesYear) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', filterAlumni);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterAlumni();
        }
    });
    industryFilter.addEventListener('change', filterAlumni);
    yearFilter.addEventListener('change', filterAlumni);

    // Add animation to alumni cards
    gsap.from('.alumni-card', {
        duration: 0.5,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.alumni-grid',
            start: 'top 80%',
        },
    });
});

