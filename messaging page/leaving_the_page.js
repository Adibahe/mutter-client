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

/*function confirmLeave() {
    const confirmation = confirm("Are you sure you want to leave the group?");
    
    if (confirmation) {
        // Prepare the data to send with the API call (adjust this as per your API)
        const leaveData = {
            userId: sessionStorage.getItem('userId'),  // Assume userId is stored in sessionStorage
            groupId: sessionStorage.getItem('groupId') // Assume groupId is stored in sessionStorage
        };

        // Make an API call to inform the server about leaving the group
        fetch('https://your-api-endpoint.com/leave-group', {  // Replace with your actual API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leaveData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to leave the group');
            }
            return response.json();  // Optional, if you need to handle response data
        })
        .then(data => {
            // On success, clear the session and navigate away
            sessionStorage.clear();
            window.close();
            window.location.href = '../Homepage/homepage.html';  // Redirect to the homepage
        })
        .catch(error => {
            console.error('Error:', error);  // Log any errors in the API call
            alert('An error occurred while leaving the group. Please try again.');
        });
    }
    
    // Hide the info menu if the user cancels the action
    const menu = document.getElementById('info-menu');
    menu.style.display = 'none';
}
*/

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
