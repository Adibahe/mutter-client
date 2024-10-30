
    function handleCreateGroup(button) {
        if (validate(button)){

        const groupName = document.getElementById('group-name').value.trim();

        if (groupName) {
            sessionStorage.setItem('groupName', groupName);
            window.open('../messaging page/messaging page.html');
        }
        }
        groupName.value = "";
    }

    function handleJoinGroup(button) {
        if(validate(button)){
    
        // Get the group code from the input field
        const groupCode = document.getElementById('group-code').value;
    
        // Store the group code in session storage
        sessionStorage.setItem('groupCode', groupCode);
    
        // Redirect to the messaging page
        window.open('../messaging page/messaging page.html', true);
    }
}
    
