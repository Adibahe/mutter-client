const express = require('express');
const path = require('path');
const app = express();

// Use the path module to resolve the absolute path for "messaging page"
app.use(express.static(path.resolve(__dirname, '../../public'))); // Adjust path as needed

// List of Straw Hat Crew members
const strawHatCrew = [
    { id: 1, name: 'Monkey D. Luffy' },
    { id: 2, name: 'Roronoa Zoro' },
    { id: 3, name: 'Nami' },
    { id: 4, name: 'Usopp' },
    { id: 5, name: 'Sanji' },
    { id: 6, name: 'Tony Tony Chopper' },
    { id: 7, name: 'Nico Robin' },
    { id: 8, name: 'Franky' },
    { id: 9, name: 'Brook' },
    { id: 10, name: 'Jinbe' }
];

// Predefined messages for each crew member
const messages = [
    'Let’s find the One Piece!',
    'I’m going to be the Pirate King!',
    'We’ll protect our friends!',
    'Stay strong, we’ve got this!',
    'I’ll cook something amazing after this battle!',
    'This is a doctor’s job!',
    'Knowledge is power; let me handle it.',
    'Leave the ship to me!',
    'I’ll sing us into battle!',
    'The sea will guide us!'
];

let isPaused = false; // Flag to track the pause state

// SSE endpoint for members
app.get('/events/members', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let memberIndex = 0;
    const sendNewMember = () => {
        if (!isPaused) { // Only send if not paused
            const newMember = strawHatCrew[memberIndex];
            res.write(`data: ${JSON.stringify({ member: newMember })}\n\n`);
            memberIndex = (memberIndex + 1) % strawHatCrew.length; // Cycle through crew members
        }
    };

    // Send a new member every second
    const interval = setInterval(() => {
        sendNewMember();
    }, 1000);

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

    let messageIndex = 0;
    const sendNewMessage = () => {
        if (!isPaused) { // Only send if not paused
            const sender = strawHatCrew[messageIndex].name;
            const text = messages[messageIndex];
            const newMessage = { id: Date.now(), sender, text };
            res.write(`data: ${JSON.stringify({ message: newMessage })}\n\n`);
            messageIndex = (messageIndex + 1) % messages.length; // Cycle through messages
        }
    };

    // SSE endpoint for join or create event
app.get('/events/join-or-create', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Simulate a join or create action for demonstration purposes
    const action = Math.random() < 0.5 ? 'join' : 'create';

    setTimeout(() => {
        res.write(`data: ${JSON.stringify({ action })}\n\n`);
    }, 1000); // Send after 1 second

    req.on('close', () => {
        res.end();
    });
    });

    app.post('/events/leave', (req, res) => {
        console.log('User has left group');
        
        // Respond to the client
        res.status(200).json({ message: 'Leave group event received successfully.' });
    });
    
    

    // Send a new message every 3 seconds
    const interval = setInterval(() => {
        sendNewMessage();
    }, 4000);

    req.on('close', () => {
        clearInterval(interval);
        res.end();
    });
});

// Endpoint to pause the server
app.get('/pause', (req, res) => {
    isPaused = true;
    res.send('Server paused');
});

// Endpoint to resume the server
app.get('/resume', (req, res) => {
    isPaused = false;
    res.send('Server resumed');
});

// Start server and open the browser
const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`SSE server listening on http://localhost:${PORT}`);

    // Dynamically import the open module
    const open = await import('open');
    open.default(`http://localhost:${PORT}/messaging page/messaging page.html`);
});
