// api.js
const API_BASE_URL = 'https://your-api-url.com';

// Fetch new members from the API
export async function fetchNewMembersFromAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/members`);
        if (!response.ok) {
            throw new Error('Failed to fetch new members');
        }
        const data = await response.json();
        return data.members; 
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

// Fetch new messages from the API
export async function fetchNewMessagesFromAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/messages`);
        if (!response.ok) {
            throw new Error('Failed to fetch new messages');
        }
        const data = await response.json();
        return data.messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}

// Post new message to the API
export async function postMessageToAPI(message) {
    try {
        const response = await fetch(`${API_BASE_URL}/messages`, {
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

// Notify API that user left the group
export async function notifyUserLeft(userId) {
    try {
        const response = await fetch(`${API_BASE_URL}/user-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, status: 'left' })
        });
        if (!response.ok) {
            throw new Error('Failed to notify user left');
        }
        const data = await response.json();
        console.log('User status updated:', data);
    } catch (error) {
        console.error('Error updating user status:', error);
    }
}
