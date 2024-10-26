
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
        validate(button);
            
            fetch('https://your-api-url.com/group')
                .then(response => response.json())
                .then(data => {
                    sessionStorage.setItem('groupName', data.groupName); // Store the group name from the API
                    window.open('../messaging page/messaging page.html',true); // Redirect to the messaging page
                })
                .catch(error => {
                    console.error('Error fetching group name:', error);
                    alert('Failed to fetch group name from the API');
                });
        }

