// Function to toggle the visibility of the info menu
function toggleInfoMenu() {
    const menu = document.getElementById('info-menu');
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
}

function confirmLeave() {
    const confirmation = confirm("Are you sure you want to leave the group?");
    
    if (confirmation) {
        // Make an API call to inform the server about leaving the group
        fetch('http://localhost:3000/events/leave', {  // Updated to match server endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to leave the group');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);  // Logs the server's confirmation message
            sessionStorage.clear();
            window.close();
            window.location.href = '../Homepage/homepage.html';  // Redirect to the homepage
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while leaving the group. Please try again.');
        });
    }
    
    // Hide the info menu if the user cancels the action
    const menu = document.getElementById('info-menu');
    menu.style.display = 'none';
}




// On page load, set the user ID (replace with actual user logic)
document.addEventListener('DOMContentLoaded', function() {
    const userId = sessionStorage.getItem('userId') || 'JoyBoy';  // Replace 'User123' with dynamic value
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
    event.preventDefault()
    // Prepare the API call
    const data = JSON.stringify({ userId: 'user123', status: 'left' });
    const url = 'https://your-api-url.com/user-status';

    // Use navigator.sendBeacon to send the data
    navigator.sendBeacon(url, data);
};
