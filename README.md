
# Mutter-Client
Mutter-client is the front-end for Mutter, a peer-to-peer (P2P) chat application developed as part of my college mini-project. You can find the complete Mutter application, including its back-end, on [Codeberg](https://codeberg.org/cloakwise/mutter).

This repository is intended only for viewing and suggesting improvements to the front-end implementation, thank you for viewing.

## Project Overview

Mutter is a decentralized messaging platform that focuses on anonymity, and secure communication. Unlike traditional messaging applications, Mutter uses ephemeral identities and ensures all message records and identities are erased after each session, promoting a more secure and private messaging environment.
### Lobby
<p align="center">
  <img src="public/images/Screenshot 2024-11-28 130120.png" alt="Image 1" width="45%">
  <img src="public/images/Screenshot 2024-11-28 130140.png" alt="Image 2" width="45%">
</p>

### Messaging page
<p align="center">
  <img src="public/images/Screenshot 2024-11-28 130242.png" alt="Image 1" width="45%">
  <img src="public/images/Screenshot 2024-11-28 130257.png" alt="Image 2" width="45%">
</p>

## Note
This is just the fornt end work so it runs on the **testing environment** you can't use it actual work, the **src/sse-test/server.js** file contains a program which starts the test with alredy hard wired chats.
## Features of [Mutter](https://codeberg.org/cloakwise/mutter).

- **Ephemeral Identities:** Each session generates a new identity, maintaining user anonymity.
- **Automatic Message Deletion:** Messages and identities are removed after each session to ensure no persistent records.
- **P2P Architecture:** Communication happens directly between peers, without relying on central servers.
- **Server-Sent Events (SSE):** Real-time message updates via SSE, with POST requests for sending messages.
<br><br> You can view full application on (https://codeberg.org/cloakwise/mutter).
## Getting Started

### Prerequisites

To run Mutter-client, ensure you have the following:

- **Node.js** (v14 or later)
- **npm** (Node Package Manager)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/mutter-client.git
   cd mutter-client
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Usage

- **Run the Back-End:** Ensure the Mutter back-end server is up and running. Instructions for setting up the back-end can be found in the [Mutter repository](https://codeberg.org/cloakwise/mutter).
- **Launching the Client:** Open `http://localhost:3000` in your browser to access the Mutter client interface and begin chatting.
- **Interacting with Peers:** The interface displays the list of current users and allows you to send messages directly.

## Contributing

Contributions are welcome! If you have ideas for improvements or encounter issues, feel free to open an issue or submit a pull request.
