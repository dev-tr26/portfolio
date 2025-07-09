// Dark Mode Toggle
const toggleBtn = document.getElementById('dark-mode-toggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    toggleBtn.textContent = body.classList.contains('dark-mode') ? '🌑' : '☀️';
});

// Blog Modal
const blogModal = document.getElementById('blog-modal');
const openBlogModal = document.getElementById('open-blog-modal');
const closeBlogModal = document.getElementById('close-blog-modal');

openBlogModal.addEventListener('click', () => {
    blogModal.style.display = 'block';
});

closeBlogModal.addEventListener('click', () => {
    blogModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === blogModal) {
        blogModal.style.display = 'none';
    }
});

// See More Projects
const seeMoreProjectsBtn = document.getElementById('see-more-projects');
const projectGrid = document.getElementById('project-grid');

seeMoreProjectsBtn.addEventListener('click', () => {
    const hiddenProjects = projectGrid.querySelectorAll('.project-card.hidden');
    hiddenProjects.forEach(project => {
        project.classList.remove('hidden');
    });
    seeMoreProjectsBtn.style.display = 'none';
});

// See More Blogs
const seeMoreBlogsBtn = document.getElementById('see-more-blogs');
const blogModalContent = blogModal.querySelector('.modal-content');

seeMoreBlogsBtn.addEventListener('click', () => {
    const hiddenBlogs = blogModalContent.querySelectorAll('.blog-post.hidden');
    hiddenBlogs.forEach(blog => {
        blog.classList.remove('hidden');
    });
    seeMoreBlogsBtn.style.display = 'none';
});

// Contact Form Submission (Placeholder for Backend Integration)
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = contactForm.querySelector('input[name="message"]').value;
    console.log('Message to send to backend:', message);
    // Placeholder for backend integration (e.g., fetch POST request to Django endpoint)
    alert('Message sent! (Placeholder - integrate with backend)');
    contactForm.reset();
});

// GPU Usage Chart
const ctx = document.getElementById('gpuChart').getContext('2d');
const gpuChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'GPU Usage (%)',
            data: [65, 59, 80, 81, 56, 72],
            borderColor: '#d4a017',
            backgroundColor: 'rgba(212, 160, 23, 0.2)',
            fill: true,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

// Framer Motion Animations (via CDN)
const { motion } = window.framerMotion;

// Apply animations to sections
document.querySelectorAll('.section').forEach(section => {
    motion(section, {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    });
});