const express = require('express');
const path = require('path');
const app = express();

// Use the path module to resolve the absolute path for "messaging page"
app.use(express.static(path.resolve(__dirname, '../../../mutter-Client'))); // Adjust path as needed

// SSE endpoint for members
app.get('/events/members', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendNewMember = () => {
        const newMember = { id: Date.now(), name: `Member_${Math.floor(Math.random() * 100)}` };
        res.write(`data: ${JSON.stringify({ member: newMember })}\n\n`);
    };

    // Send a new member every 5 seconds for testing
    const interval = setInterval(() => {
        sendNewMember();
    }, 5000);

    req.on('close', () => {
        clearInterval(interval);
        res.end();
    });
});

// SSE endpoint for messages
app.get('/events/messages', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendNewMessage = () => {
        const newMessage = { id: Date.now(), sender: 'User_' + Math.floor(Math.random() * 100), text: 'Hello, world!' };
        res.write(`data: ${JSON.stringify({ message: newMessage })}\n\n`);
    };

    // Send a new message every 3 seconds for testing
    const interval = setInterval(() => {
        sendNewMessage();
    }, 3000);

    req.on('close', () => {
        clearInterval(interval);
        res.end();
    });
});

// Start server
app.listen(3000, () => {
    console.log('SSE server listening on http://localhost:3000');
});
