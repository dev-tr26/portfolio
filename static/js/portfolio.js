// Dark Mode Toggle
const toggleBtn = document.getElementById('dark-mode-toggle');
const body = document.body;

if (toggleBtn) {
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        toggleBtn.textContent = '🌙';
    }

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        toggleBtn.textContent = isDarkMode ? '🌙' : '☀️';
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    });
}

// Navigation shell
const hamburger = document.getElementById('nav-hamburger');
const sideNav = document.getElementById('side-nav');
const sideLinks = document.querySelectorAll('.side-link');
const localNavLinks = Array.from(sideLinks).filter(link => link.getAttribute('href').startsWith('#'));

if (hamburger && sideNav) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sideNav.classList.toggle('open');
    });
}

sideLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (sideNav) {
            sideNav.classList.remove('open');
        }
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const topBar = document.querySelector('.top-bar');
            const offset = topBar ? topBar.offsetHeight + 16 : 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    if (!localNavLinks.length) {
        return;
    }

    const sections = document.querySelectorAll('.section[id]');
    let current = '';

    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 240) {
            current = section.getAttribute('id');
        }
    });

    localNavLinks.forEach(link => {
        link.classList.toggle('active', current && link.getAttribute('href').includes(current));
    });
});

// See More Projects
const seeMoreProjectsBtn = document.getElementById('see-more-projects');
const projectGrid = document.getElementById('project-grid');

if (seeMoreProjectsBtn) {
    seeMoreProjectsBtn.addEventListener('click', () => {
        const hiddenProjects = projectGrid.querySelectorAll('.project-card.hidden');
        hiddenProjects.forEach(project => {
            project.classList.remove('hidden');
        });
        seeMoreProjectsBtn.style.display = 'none';
    });
}

// Contact Form Submission
// Contact Form Submission
const form = document.getElementById("contact-form");
const responseMessage = document.getElementById("form-response");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("/send-message/", {
            method: "POST",
            headers: {
                "X-CSRFToken": document.querySelector(
                    "[name=csrfmiddlewaretoken]"
                ).value
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                responseMessage.textContent = data.success;
                responseMessage.style.color = "lime";
                form.reset();
            } else {
                responseMessage.textContent = data.error;
                responseMessage.style.color = "red";
            }
        })
        .catch(() => {
            responseMessage.textContent = "Something went wrong.";
            responseMessage.style.color = "red";
        });
    });
}


// GPU Usage Chart
const gpuChartCanvas = document.getElementById('gpuChart');
if (gpuChartCanvas) {
    const ctx = gpuChartCanvas.getContext('2d');
    const isDarkMode = body.classList.contains('dark-mode');
    
    const gpuChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'GPU Usage (%)',
                data: [65, 59, 80, 81, 56, 72],
                borderColor: isDarkMode ? '#f4c430' : '#d4a017',
                backgroundColor: isDarkMode ? 'rgba(244, 196, 48, 0.2)' : 'rgba(212, 160, 23, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: isDarkMode ? '#e8dcc4' : '#2a2a2a',
                        font: {
                            family: 'JetBrains Mono',
                            size: 12
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: isDarkMode ? '#e8dcc4' : '#2a2a2a',
                        font: {
                            family: 'JetBrains Mono'
                        }
                    },
                    grid: {
                        color: isDarkMode ? 'rgba(244, 196, 48, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: isDarkMode ? '#e8dcc4' : '#2a2a2a',
                        font: {
                            family: 'JetBrains Mono'
                        }
                    },
                    grid: {
                        color: isDarkMode ? 'rgba(244, 196, 48, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });

    // Update chart colors on dark mode toggle
    toggleBtn.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-mode');
        gpuChart.data.datasets[0].borderColor = isDark ? '#f4c430' : '#d4a017';
        gpuChart.data.datasets[0].backgroundColor = isDark ? 'rgba(244, 196, 48, 0.2)' : 'rgba(212, 160, 23, 0.2)';
        gpuChart.options.plugins.legend.labels.color = isDark ? '#e8dcc4' : '#2a2a2a';
        gpuChart.options.scales.y.ticks.color = isDark ? '#e8dcc4' : '#2a2a2a';
        gpuChart.options.scales.x.ticks.color = isDark ? '#e8dcc4' : '#2a2a2a';
        gpuChart.options.scales.y.grid.color = isDark ? 'rgba(244, 196, 48, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        gpuChart.options.scales.x.grid.color = isDark ? 'rgba(244, 196, 48, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        gpuChart.update();
    });
}

// Framer Motion Animations
if (window.framerMotion) {
    const { motion } = window.framerMotion;
    
    document.querySelectorAll('.section').forEach((section, index) => {
        motion(section, {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: index * 0.1 }
        });
    });
}

