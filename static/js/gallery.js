//initialise the gallery
document.addEventListener('DOMContentLoaded', function() {
    initializeSliders();
    setupEventListeners();
});

function initializeSliders() {
    const categories = document.querySelectorAll('.category');
    
    categories.forEach(category => {
        const container = category.querySelector('.image-container');
        const prevBtn = category.querySelector('.btn.prev');
        const nextBtn = category.querySelector('.btn.next');
        const images = container.querySelectorAll('img');
        if (images.length === 0) return; // skip empty categories

        let currentIndex = 0;
        let timeout;

        function updateSlider() {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Auto-advance every 5 seconds
            //clearTimeout(timeout);
            //timeout = setTimeout(() => {
            //    currentIndex = (currentIndex + 1) % images.length;
            //    updateSlider();
            //}, 5000);
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlider();
        });

        // Start auto-slide
        //updateSlider();
    });
}

function setupEventListeners() {
    // Back button to main page
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = '/';
        });
    }

    // View full screen buttons
    document.querySelectorAll('.view-full-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const categoryDiv = this.closest('.category');
            openFullscreen(categoryDiv);
        });
    });
    
   const addBtn = document.getElementById('AddBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            window.location.href = '/gallery';
    });
    }


    // Close fullscreen
    const closeBtn = document.getElementById('closeFullscreen');
    if (closeBtn) closeBtn.addEventListener('click', closeFullscreen);

    // Fullscreen navigation
    const nextBtn = document.getElementById('fullscreenNext');
    const prevBtn = document.getElementById('fullscreenPrev');
    if (nextBtn) nextBtn.addEventListener('click', nextFullscreenImage);
    if (prevBtn) prevBtn.addEventListener('click', prevFullscreenImage);
}

let currentFullscreenImages = [];
let currentFullscreenIndex = 0;

function openFullscreen(categoryDiv) {
    const container = document.getElementById('fullscreenImageContainer');
    container.innerHTML = '';

    // Grab all images from this category
    currentFullscreenImages = Array.from(categoryDiv.querySelectorAll('img'));
    currentFullscreenIndex = 0;

    // Clone images into fullscreen container
    currentFullscreenImages.forEach(img => {
        const clone = img.cloneNode();
        container.appendChild(clone);
    });

    document.getElementById('fullscreenOverlay').classList.add('active');
    updateFullscreenSlider();
}

function closeFullscreen() {
    document.getElementById('fullscreenOverlay').classList.remove('active');
}

function updateFullscreenSlider() {
    const container = document.getElementById('fullscreenImageContainer');
    container.style.transform = `translateX(-${currentFullscreenIndex * 100}%)`;
}

function nextFullscreenImage() {
    if (currentFullscreenImages.length === 0) return;
    currentFullscreenIndex = (currentFullscreenIndex + 1) % currentFullscreenImages.length;
    updateFullscreenSlider();
}

function prevFullscreenImage() {
    if (currentFullscreenImages.length === 0) return;
    currentFullscreenIndex = (currentFullscreenIndex - 1 + currentFullscreenImages.length) % currentFullscreenImages.length;
    updateFullscreenSlider();
}
// Keyboard navigation in fullscreen mode
document.addEventListener('keydown', function(e) {
    const fullscreenActive = document.getElementById('fullscreenOverlay').classList.contains('active');
    if (fullscreenActive) {
        if (e.key === 'ArrowRight') nextFullscreenImage();
        else if (e.key === 'ArrowLeft') prevFullscreenImage();
        else if (e.key === 'Escape') closeFullscreen();
    }
});

let startX = 0;
document.getElementById('fullscreenOverlay').addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

document.getElementById('fullscreenOverlay').addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextFullscreenImage();
    if (endX - startX > 50) prevFullscreenImage();
});

const openDrawer = document.getElementById('openDrawer');
const closeDrawer = document.getElementById('closeDrawer');
const drawer = document.getElementById('manageDrawer');

if (openDrawer && closeDrawer) {
    openDrawer.addEventListener('click', () => {
        drawer.classList.add('active');
    });

    closeDrawer.addEventListener('click', () => {
        drawer.classList.remove('active');
    });
}

function openRenameModal(id, name) {
    document.getElementById('renameCategoryId').value = id;
    document.getElementById('renameInput').value = name;
    document.getElementById('renameModal').classList.add('active');
}

function closeRenameModal() {
    document.getElementById('renameModal').classList.remove('active');
}

function openAddCategoryModal() {
    document.getElementById('addCategoryModal').classList.add('active');
}

function closeAddCategoryModal() {
    document.getElementById('addCategoryModal').classList.remove('active');
}

