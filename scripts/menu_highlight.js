const navLinks = document.querySelectorAll('.nav-bar > a');
const currentUrl = window.location.href;

navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.textDecoration = 'underline';
    });

    link.addEventListener('mouseout', () => {
        link.style.textDecoration = 'none';
    });

    if (link.href === currentUrl) {
        link.classList.add('active');
    }
});