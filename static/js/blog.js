// Dark Mode Toggle (Sync with Portfolio)
const toggleBtn = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check if dark mode was enabled on the portfolio page
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '🌙';
} else {
    toggleBtn.textContent = '☀️';
}

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    toggleBtn.textContent = body.classList.contains('dark-mode') ? '🌙' : '☀️';
    // Save dark mode state to localStorage
    localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});

// See More Blogs
const seeMoreBlogsBtn = document.getElementById('see-more-blogs');
const blogPosts = document.getElementById('blog-posts');

if (seeMoreBlogsBtn) {
    seeMoreBlogsBtn.addEventListener('click', () => {
        const hiddenBlogs = blogPosts.querySelectorAll('.blog-post.hidden');
        hiddenBlogs.forEach(post => post.classList.remove('hidden'));
        seeMoreBlogsBtn.style.display = 'none';
    });
}

// Handle URL Parameter to Scroll to Specific Post
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    if (postId) {
        const postElement = document.getElementById(`post-${postId}`);
        if (postElement) {
             const post = document.getElementById(`post-${postId}`);
        if (post) {
            post.classList.remove('hidden');
            post.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        const remainingHidden = blogPosts.querySelectorAll('.blog-post.hidden');
        if (remainingHidden.length === 0 && seeMoreBlogsBtn) {
            seeMoreBlogsBtn.style.display = 'none';
        }
        }
    }
});

// Framer Motion Animations (via CDN)
const { motion } = window.framerMotion;

// Apply animations to blog posts
document.querySelectorAll('.blog-post').forEach(post => {
    motion(post, {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    });
});