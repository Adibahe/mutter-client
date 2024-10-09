// Mock data for testing purposes
const mockMembers = [
    { id: 2, name: 'John Doe' },
    { id: 3, name: 'Jane Smith' },
    { id: 4, name: 'Mike Ross' }
];

const mockMessages = [
    { id: 1, sender: 'John Doe', text: 'Hello everyone!' },
    { id: 2, sender: 'Jane Smith', text: 'Hey, how are you?' },
    { id: 3, sender: 'Mike Ross', text: 'What’s the plan for today?' }
];

let addedMemberIndex = 0; // Tracks which member has been added
let addedMessageIndex = 0; // Tracks which message has been added

// Simulate fetching new members (Mock function for testing)
function fetchNewMembersMock() {
    const newMembers = [];

    // Simulate adding one new member at a time
    if (addedMemberIndex < mockMembers.length) {
        newMembers.push(mockMembers[addedMemberIndex]);
        addedMemberIndex++;
    }

    return newMembers;
}

// Simulate fetching new messages (Mock function for testing)
function fetchNewMessagesMock() {
    const newMessages = [];

    // Simulate adding one new message at a time
    if (addedMessageIndex < mockMessages.length) {
        newMessages.push(mockMessages[addedMessageIndex]);
        addedMessageIndex++;
    }

    return newMessages;
}

// Function to dynamically add new members to the member list
function addNewMembers() {
    const newMembers = fetchNewMembersMock(); // Simulate API response
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

// Function to dynamically add new messages to the chat window
function addNewMessages() {
    const newMessages = fetchNewMessagesMock(); // Simulate API response
    const chatMessages = document.getElementById('chat-messages');

    newMessages.forEach(message => {
        if (!document.getElementById(`message-${message.id}`)) { // Ensure no duplicate messages
            const messageElement = document.createElement('div');
            messageElement.id = `message-${message.id}`;
            messageElement.className = message.sender === 'Aditya Bahe' ? 'message from-me' : 'message from-them';
            messageElement.innerHTML = `<span class="sender-label">${message.sender}</span> ${message.text}`;

            // Append the message to the chat window
            chatMessages.appendChild(messageElement);

            // Auto-scroll to the latest message
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });
}

// Continuously check for new members and messages every 5 seconds (can be adjusted)
setInterval(addNewMembers, 1000);
setInterval(addNewMessages, 1000);

// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText !== '') {
        const chatMessages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');

        messageElement.className = 'message from-me'; // Class based on the sender
        messageElement.innerHTML = `<span class="sender-label">Aditya Bahe (You)</span> ${messageText}`;

        // Append the message to the chat window
        chatMessages.appendChild(messageElement);

        // Clear input and auto-scroll to the latest message
        messageInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Optionally, send the message to the API
        // You can create a function to POST the new message to the API
    }
}

// Allow sending messages by pressing Enter
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
