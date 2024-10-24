// script.js
function checkOrientation() {
    const messageDiv = document.getElementById('message');
    if (window.innerWidth < 768) { // Menyesuaikan dengan lebar layar ponsel
        messageDiv.classList.remove('hidden');
    } else {
        messageDiv.classList.add('hidden');
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);
