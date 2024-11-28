// Fetch group name from sessionStorage
document.addEventListener('DOMContentLoaded', function () {
    const groupName = sessionStorage.getItem('groupName');
    const groupNameElement = document.getElementById('group-name');
    if (groupName) {
        groupNameElement.textContent = `Group: ${groupName}`;
    }

    // Fetch members from the API and display them
    fetchGroupMembers();

    // Regularly check for meeting start event
    checkForMeetingStart();
});

function addMemberToLobby(member) {
    const memberList = document.getElementById('lobby-member-list');

    // Validate member object
    if (member && member.id && member.name) {
        // Check if member already exists
        if (!document.getElementById(`member-${member.id}`)) {
            const memberItem = document.createElement('li');
            memberItem.id = `member-${member.id}`; // Give each member a unique ID
            memberItem.textContent = member.name;
            console.log(member.name);
            memberList.appendChild(memberItem);
        }
    } else {
        console.error('Invalid member object:', member);
    }

    if (members.length > 10) {
        memberList.style.maxHeight = '200px';
        memberList.style.overflowY = 'auto';
    } else {
        memberList.style.maxHeight = '';
        memberList.style.overflowY = '';
    }
}
function updateMemberList() {
    const memberList = document.getElementById('lobby-member-list');
    const members = Array.from(memberList.children).map(li => ({
        id: li.id.replace('member-', ''), // Extract the id
        name: li.textContent // Get the name
    }));

    // Call addNewMemberToList with the updated members array
    addNewMemberToList(members);
}

// Start the meeting
function startMeeting() {
    // Discard lobby and reveal messaging page
    document.getElementById('lobby-overlay').style.display = 'none';
    updateMemberList();
    stopFetchingMembers();
}

// Leave group logic
function leaveGroup() {
    // Your leave group logic here (calls to existing API function)
    confirmLeave(); // Reuse the function from messaging page
}

// Stop fetching members after the lobby is closed
function stopFetchingMembers() {
    // Close EventSource and stop receiving new members
    eventsrcMember.close();
    fetchNewMessagesFromAPI();
}

// Regularly check for the "start meeting" event
function checkForMeetingStart() {
    const URL = 'http://localhost:3000/events/start';

    const startEventSource = new EventSource(URL);
    startEventSource.onmessage = function (event) {
        const meetingStarted = JSON.parse(event.data).start;
        if (meetingStarted) {
            startMeeting();
        }
    };
}
