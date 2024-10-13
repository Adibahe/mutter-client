// Function to toggle the visibility of the info menu
function toggleInfoMenu() {
    const menu = document.getElementById('info-menu');
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
}

// Function to confirm leaving the group
function confirmLeave() {
    const confirmation = confirm("Are you sure you want to leave the group?");
    if (confirmation) {
        sessionStorage.clear();
        window.close()
        window.location.href = '../Homepage/homepage.html';  // Close the window if the user confirms
    }
    const menu = document.getElementById('info-menu');
    menu.style.display = 'none';
}

// On page load, set the user ID (replace with actual user logic)
document.addEventListener('DOMContentLoaded', function() {
    const userId = sessionStorage.getItem('userId') || 'User123';  // Replace 'User123' with dynamic value
    document.getElementById('user-id').textContent = userId;
});

document.addEventListener('click', function(event) {
    const menu = document.getElementById('info-menu');
    const button = document.querySelector('.info-btn');
    
    if(!menu.contains(event.target) && !button.contains(event.target)){
        menu.style.display = 'none';
    }

  });

  window.onbeforeunload = function(event) {
    event.preventDefault();
    event.returnValue = "Are you sure you want to leave this page? Unsaved changes will be lost.";
    // Prepare the API call
    const data = JSON.stringify({ userId: 'user123', status: 'left' });
    const url = 'https://your-api-url.com/user-status';

    // Use navigator.sendBeacon to send the data
    navigator.sendBeacon(url, data);
};
