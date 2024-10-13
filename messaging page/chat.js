
// Function to fetch new members from the API
async function fetchNewMembersFromAPI() {
    try {
        // Replace the URL with your actual API endpoint
        const response = await fetch('https://your-api-url.com/members');
        
        if (!response.ok) {
            throw new Error('Failed to fetch new members');
        }

        const data = await response.json();
        return data.members; // Assuming the API returns a "members" array
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

// Function to dynamically add new members to the member list
async function addNewMembers() {
    const newMembers = await fetchNewMembersFromAPI(); // API response
    const memberList = document.getElementById('member-list');
    let memberCount = document.getElementById('member-list').children.length;

    newMembers.forEach(member => {
        if (!document.getElementById(`member-${member.id}`)) {
            const memberElement = document.createElement('li');
            memberElement.id = `member-${member.id}`;
            memberElement.innerHTML = `
                <div class="member-icon"></div> 
                <span>${member.name}</span>
            `;
            memberList.appendChild(memberElement);
            memberCount++;
        }
    });

    document.getElementById('member-count').innerText = `${memberCount} members`;
}

// Function to fetch new messages from the API
async function fetchNewMessagesFromAPI() {
    try {
        // Replace the URL with your actual API endpoint
        const response = await fetch('https://your-api-url.com/messages');
        
        if (!response.ok) {
            throw new Error('Failed to fetch new messages');
        }

        const data = await response.json();
        return data.messages; // Assuming the API returns a "messages" array
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}

// Function to dynamically add new messages to the chat window
async function addNewMessages() {
    const newMessages = await fetchNewMessagesFromAPI(); // API response
    const chatMessages = document.getElementById('chat-messages');

    newMessages.forEach(message => {
        if (!document.getElementById(`message-${message.id}`)) { // Ensure no duplicate messages
            const messageElement = document.createElement('div');
            messageElement.id = `message-${message.id}`;
            messageElement.className = message.sender === 'me' ? 'message from-me' : 'message from-them';
            messageElement.innerHTML = `<span class="sender-label">${message.sender}</span> ${message.text}`;

            // Append the message to the chat window
            chatMessages.appendChild(messageElement);

            // Auto-scroll to the latest message
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });
}

// Continuously check for new members and messages every 5 seconds (can be adjusted)
setInterval(addNewMembers, 5000);
setInterval(addNewMessages, 5000);

// Function to send a message
// Function to send a new message to the API
async function postMessageToAPI(message) {
    try {
        const response = await fetch('https://your-api-url.com/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }
        const data = await response.json();
        console.log('Message sent successfully:', data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Function to send a message
async function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText !== '') {
        const chatMessages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');

        messageElement.className = 'message from-me'; // Class based on the sender
        messageElement.innerHTML = `
            <span class="sender-label">me</span>
            <div class="message-text">${messageText}</div>`;

        // Append the message to the chat window
        chatMessages.appendChild(messageElement);

        // Clear input and auto-scroll to the latest message
        messageInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Send the message to the API
        await postMessageToAPI({ sender: 'me', text: messageText });
    }
}

// Allow sending messages by pressing Enter
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const groupName = sessionStorage.getItem('groupName');
    console.log('Group name:', groupName);  // Debugging: check if groupName is stored

    // Display the group name if it's available
    const groupHeader = document.querySelector('.group-details h3');
    if (groupHeader && groupName) {
        groupHeader.textContent = groupName;
    } else {
        console.error('Group header or group name is missing!');
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





