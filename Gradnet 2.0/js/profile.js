document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href = '/login.html';
    });

    fetchProfileData();

    const editAboutMeBtn = document.getElementById('edit-about-me');
    editAboutMeBtn.addEventListener('click', editAboutMe);

    const addExperienceBtn = document.getElementById('add-experience');
    addExperienceBtn.addEventListener('click', addExperience);

    const addEducationBtn = document.getElementById('add-education');
    addEducationBtn.addEventListener('click', addEducation);

    const addSkillBtn = document.getElementById('add-skill');
    addSkillBtn.addEventListener('click', addSkill);
});

async function fetchProfileData() {
    try {
        const response = await fetch('/api/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            updateProfileUI(data);
        } else {
            console.error('Failed to fetch profile data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateProfileUI(data) {
    document.getElementById('fullname').textContent = data.fullname;
    document.getElementById('graduation-year').textContent = `Class of ${data.graduationYear}`;
    document.getElementById('about-me-text').textContent = data.aboutMe || 'No information provided';

    const experienceList = document.getElementById('experience-list');
    experienceList.innerHTML = '';
    data.experience.forEach(exp => {
        const li = document.createElement('li');
        li.textContent = `${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate})`;
        experienceList.appendChild(li);
    });

    const educationList = document.getElementById('education-list');
    educationList.innerHTML = '';
    data.education.forEach(edu => {
        const li = document.createElement('li');
        li.textContent = `${edu.degree} in ${edu.field} from ${edu.institution} (${edu.graduationYear})`;
        educationList.appendChild(li);
    });

    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    data.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
    });

    // Add animation to profile sections
    const sections = document.querySelectorAll('.profile-content section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function editAboutMe() {
    const aboutMeText = document.getElementById('about-me-text');
    const currentText = aboutMeText.textContent;
    const input = document.createElement('textarea');
    input.value = currentText;
    aboutMeText.replaceWith(input);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('edit-button');
    input.after(saveBtn);

    saveBtn.addEventListener('click', async () => {
        const newText = input.value;
        try {
            const response = await fetch('/api/profile/about-me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ aboutMe: newText }),
            });

            if (response.ok) {
                aboutMeText.textContent = newText;
                input.replaceWith(aboutMeText);
                saveBtn.remove();
            } else {
                console.error('Failed to update about me');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

function addExperience() {
    const experienceList = document.getElementById('experience-list');
    const form = document.createElement('form');
    form.innerHTML = `
        <input type="text" placeholder="Job Title" required>
        <input type="text" placeholder="Company" required>
        <input type="date" placeholder="Start Date" required>
        <input type="date" placeholder="End Date">
        <button type="submit">Add</button>
    `;

    experienceList.appendChild(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const [title, company, startDate, endDate] = e.target.elements;
        try {
            const response = await fetch('/api/profile/experience', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    title: title.value,
                    company: company.value,
                    startDate: startDate.value,
                    endDate: endDate.value || 'Present'
                }),
            });

            if (response.ok) {
                fetchProfileData();
                form.remove();
            } else {
                console.error('Failed to add experience');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

function addEducation() {
    const educationList = document.getElementById('education-list');
    const form = document.createElement('form');
    form.innerHTML = `
        <input type="text" placeholder="Degree" required>
        <input type="text" placeholder="Field of Study" required>
        <input type="text" placeholder="Institution" required>
        <input type="number" placeholder="Graduation Year" required>
        <button type="submit">Add</button>
    `;

    educationList.appendChild(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const [degree, field, institution, graduationYear] = e.target.elements;
        try {
            const response = await fetch('/api/profile/education', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    degree: degree.value,
                    field: field.value,
                    institution: institution.value,
                    graduationYear: graduationYear.value
                }),
            });

            if (response.ok) {
                fetchProfileData();
                form.remove();
            } else {
                console.error('Failed to add education');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

function addSkill() {
    const skillsList = document.getElementById('skills-list');
    const form = document.createElement('form');
    form.innerHTML = `
        <input type="text" placeholder="Skill" required>
        <button type="submit">Add</button>
    `;

    skillsList.appendChild(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const [skill] = e.target.elements;
        try {
            const response = await fetch('/api/profile/skill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    skill: skill.value
                }),
            });

            if (response.ok) {
                fetchProfileData();
                form.remove();
            } else {
                console.error('Failed to add skill');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

