// Example of member data
const members = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    // Additional members can be added here
];

// Function to add members to the lobby
function addMembers() {
    const memberList = document.getElementById('members');

    members.forEach(member => {
        const listItem = document.createElement('li');
        listItem.textContent = member.name;
        memberList.appendChild(listItem);
    });

    // Enable the start session button if members are present
    if (members.length > 0) {
        document.getElementById('start-session-button').disabled = false;
    }
}

// Call the function to add members on page load
window.onload = () => {
    addMembers();
};
