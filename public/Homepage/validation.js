//function to validate homepage of mutter

function validate(button){
    let alertmessage = "";  // Initialize the alert message

    if (button.className == 'create-group-button') {
        const groupName = document.getElementById('group-name');
        const noOfParticipants = document.getElementById('participants');

        if (groupName.value.trim() === "") {
            alertmessage += " Please enter a group name.\n";
        }
        
        if (noOfParticipants.value === "") {
            alertmessage += " Please enter a valid number of participants.";
        }

    }

    else{
        const groupcode = document.getElementById('group-code');
        let code = groupcode.value.trim();
        
        if(code == "")
            alertmessage += "please Enter group code to join";
    }

    // If there's anything in the alert message, display it
    if(alertmessage != ""){
        window.alert(alertmessage);
        return false;
    }
    return true;
}