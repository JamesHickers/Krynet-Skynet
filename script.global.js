// script-global.js
document.addEventListener("DOMContentLoaded", () => {
  // Example: Global tooltip init only if tooltips exist
  if (document.querySelectorAll('.tooltip').length > 0) {
    // Initialize tooltip library or custom tooltip logic here
  }

  // Example: Global lazy load images if they exist
  const lazyImages = document.querySelectorAll('img.lazy');
  if (lazyImages.length > 0) {
    lazyImages.forEach(img => {
      // your lazy-load logic here or call a library
    });
  }

  // Add more global reusable checks and functionality here.
});
