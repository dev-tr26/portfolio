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

seeMoreBlogsBtn.addEventListener('click', () => {
    const hiddenBlogs = blogPosts.querySelectorAll('.blog-post.hidden');
    hiddenBlogs.forEach(blog => {
        blog.classList.remove('hidden');
    });
    seeMoreBlogsBtn.style.display = 'none';
});

// Handle URL Parameter to Scroll to Specific Post
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');
    if (postId) {
        const postElement = document.getElementById(`post-${postId}`);
        if (postElement) {
            // Ensure the post is visible (remove hidden class if present)
            postElement.classList.remove('hidden');
            // Scroll to the post
            postElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Ensure "See More" button is hidden if the post was initially hidden
            if (blogPosts.querySelectorAll('.blog-post.hidden').length === 0) {
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