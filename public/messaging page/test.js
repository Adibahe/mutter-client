// Mock data for testing
let members = [
    { id: 1, name: "Luffy" },
    { id: 2, name: "Zoro" },
    { id: 3, name: "Nami" },
    { id: 4, name: "Sanji" },
    { id: 5, name: "Chopper" }
];

let messages = [
    { id: 1, sender: "Luffy", text: "I'm hungry! When's the next meal?" },
    { id: 2, sender: "Sanji", text: "Hold on, Luffy! I'm cooking your favorite meat dish." },
    { id: 3, sender: "Zoro", text: "Luffy, you should focus on training instead of eating all the time." },
    { id: 4, sender: "Nami", text: "Zoro, you're the last person who should talk about focus." },
    { id: 5, sender: "Chopper", text: "Luffy, you should eat properly to stay healthy!" },
    { id: 6, sender: "Luffy", text: "Thanks, Chopper! You're the best doctor!" },
    { id: 7, sender: "Sanji", text: "Dinner’s ready! Time to eat, everyone!" }
];

// Simulate a delay to mimic network latency
function simulateNetworkDelay(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), 2000);  // Simulated delay of 2 seconds
    });
}

// Fetch new members from the mock "API"
async function fetchNewMembersFromAPI() {
    try {
        return await simulateNetworkDelay({ members });  // Simulate API response with mock data
    } catch (error) {
        console.error('Error fetching members:', error);
        return { members: [] };
    }
}

// Fetch new messages from the mock "API"
async function fetchNewMessagesFromAPI() {
    try {
        return await simulateNetworkDelay({ messages });  // Simulate API response with mock data
    } catch (error) {
        console.error('Error fetching messages:', error);
        return { messages: [] };
    }
}

// Post a new message to the mock "API"
async function postMessageToAPI(message) {
    try {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (message.text && message.sender) {
                    message.id = messages.length + 1;  // Assign a new ID
                    messages.push(message);  // Add the new message to the messages array
                    resolve({ success: true, message });  // Simulate success response
                } else {
                    reject("Invalid message format");  // Simulate failure response
                }
            }, 1000);  // Simulated network delay of 1 second
        });
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Function to dynamically add new members to the member list
async function addNewMembers() {
    const newMembers = await fetchNewMembersFromAPI(); // API response with simulated delay
    const memberList = document.getElementById('member-list');
    let memberCount = memberList.children.length;

    newMembers.members.forEach(member => {
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
async function addNewMessages() {
    const newMessages = await fetchNewMessagesFromAPI(); // API response with simulated delay
    const chatMessages = document.getElementById('chat-messages');

    newMessages.messages.forEach(message => {
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

        // Send the message to the mock API
        await postMessageToAPI({ sender: 'me', text: messageText });
    }
}

// Allow sending messages by pressing Enter
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Continuously check for new members and messages every 5 seconds
setInterval(addNewMembers, 5000);
setInterval(addNewMessages, 5000);

// On page load, set group name
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
