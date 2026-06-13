// See More Blogs
const seeMoreBtn = document.getElementById('see-more');
const blogGrid = document.getElementById('blog-grid');

if (seeMoreBtn && blogGrid) {
    seeMoreBtn.addEventListener('click', () => {
        const hiddenBlogs = blogGrid.querySelectorAll('.blog-card:not(.visible)');
        hiddenBlogs.forEach(blog => blog.classList.add('visible'));
        seeMoreBtn.style.display = 'none';
    });
}

// Handle URL Parameter to Scroll to Specific Post
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');

    if (!postId || !blogGrid) return;

    const postElement = document.getElementById(`post-${postId}`);
    if (postElement) {
        postElement.classList.add('visible');

        setTimeout(() => {
            const targetPosition = postElement.offsetTop - 80;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, 100);
    }

    const remainingHidden = blogGrid.querySelectorAll('.blog-card:not(.visible)');
    if (!remainingHidden.length && seeMoreBtn) {
        seeMoreBtn.style.display = 'none';
    }
});

// Add animation to blog cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';

        requestAnimationFrame(() => {
            entry.target.style.transition = 'all 0.5s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        });

        obs.unobserve(entry.target);
    });
}, observerOptions);

if (blogGrid) {
    blogGrid.querySelectorAll('.blog-card.visible').forEach(card => observer.observe(card));
}