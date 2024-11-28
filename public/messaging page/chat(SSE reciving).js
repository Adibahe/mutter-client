const URL = 'http://localhost:3000/events';

// Function to set up SSE for members
const eventsrcMember = new EventSource(URL + '/members');
const eventsrcMessages = new EventSource(URL + '/messages');
function fetchNewMembersFromAPI() {
    
    eventsrcMember.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log('Added new member:', data.member);

        // Call function to update the UI with the new member
        addMemberToLobby(data.member);
    };

    eventsrcMember.onerror = function(error) {
        console.error('Error with SSE connection (members):', error);
    };

}

// Function to set up SSE for messages
function fetchNewMessagesFromAPI() {
    

    eventsrcMessages.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log('Received new message:', data.message);

        addNewMessageToChat(data.message);
    };

    eventsrcMessages.onerror = function(error) {
        console.error('Error with SSE connection (messages):', error);
    };
}

function addNewMemberToList(members) {
    const memberListSidebar = document.getElementById('member-list');
    
    // Clear existing members in the sidebar
    memberListSidebar.innerHTML = '';
    const memberItem = document.createElement('li');

    const memberIcon = document.createElement('div');
    memberIcon.classList.add('member-icon');
    const memberName = document.createElement('span');
    memberName.textContent = 'me';
    memberIcon.textContent = 'me';

    memberItem.appendChild(memberIcon);
    memberItem.appendChild(memberName);

    memberListSidebar.appendChild(memberItem);

    members.forEach(function(member) {
        const memberItem = document.createElement('li');

        const memberIcon = document.createElement('div');
        memberIcon.classList.add('member-icon');
        const memberName = document.createElement('span');
        memberName.textContent = member.name;
        memberIcon.textContent = member.name.slice(0,2);
        memberItem.appendChild(memberIcon);
        memberItem.appendChild(memberName);

        memberListSidebar.appendChild(memberItem);
    });
    // Update the member count
    const memberCount = memberListSidebar.children.length;
    document.getElementById('member-count').innerText = memberCount+' members';
}



// Function to dynamically add new messages to the chat window
function addNewMessageToChat(message) {
    const chatMessages = document.getElementById('chat-messages');

    if (!document.getElementById(`message-${message.id}`)) {
        const messageBox = document.createElement('div'); // Create a container for the message
        const messageElement = document.createElement('div'); // Message text element
        const messageSender = document.createElement('div'); // Sender label element

        messageBox.className = 'box-them'; // Class for styling
        messageElement.className = message.sender === 'me' ? 'message from-me' : 'message from-them'; // Set message class based on sender

        // Set message text and sender label
        messageElement.innerHTML = `<div class="message-text">${message.text}</div>`;
        messageSender.innerHTML = `<span class="sender-label">${message.sender}</span>`;

        // Append sender label and message text to the message box
        messageBox.appendChild(messageSender);
        messageBox.appendChild(messageElement);

        // Append the message box to the chat window
        chatMessages.appendChild(messageBox);

        // Auto-scroll to the latest message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}


// Initialize SSE connections for members and messages
document.addEventListener('DOMContentLoaded', function() {
    fetchNewMembersFromAPI();
});

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
        const messageSender = document.createElement('div');
        const messageBox = document.createElement('div');

        messageBox.className = 'box';
        messageElement.className = 'message from-me';
        messageElement.innerHTML = `<div class="message-text">${messageText}</div>`;
        messageSender.innerHTML = `<span class="sender-label">me </span>`;

        // Append the message to the chat window
        messageBox.appendChild(messageSender);
        messageBox.appendChild(messageElement);
        chatMessages.appendChild(messageBox);

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

// Display the group name if it's available
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

// Warning before leaving the page
window.onbeforeunload = function(event) {
    event.preventDefault();
    event.returnValue = "Are you sure you want to leave this page? Unsaved changes will be lost.";

    // Prepare the API call
    const data = JSON.stringify({ userId: 'user123', status: 'left' });
    const url = 'https://your-api-url.com/user-status';

    // Use navigator.sendBeacon to send the data
    navigator.sendBeacon(url, data);
};

// Toggle the sidebar and update the button's arrow direction
document.getElementById('collapse-btn').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    const chatWindow = document.querySelector('.chat-window');

    sidebar.classList.toggle('collapsed');
    chatWindow.classList.toggle('expanded');

    // Update button text arrow based on sidebar state
    if (sidebar.classList.contains('collapsed')) {
        this.textContent = '→'; // Right arrow when collapsed
    } else {
        this.textContent = '←'; // Left arrow when expanded
    }
});

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}
