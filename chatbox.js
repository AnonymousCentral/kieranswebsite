// Get DOM elements
let chatMessages = document.getElementById('chatMessages');
let passwordPopup = document.getElementById('passwordPopup');
let resetBtn = document.getElementById('resetBtn');
let closePopup = document.querySelector('.close');
let submitPassword = document.getElementById('submitPassword');
let messageToDelete = null;  // To store the message to be deleted
let deleteAllMessages = false;  // To track if we're resetting the chat

// Send a message function
function sendMessage() {
    let messageInput = document.getElementById('messageInput');
    let message = messageInput.value.trim();

    if (message) {
        // Create message div
        let messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = message;

        // Create delete button for the message
        let deleteBtn = document.createElement('span');
        deleteBtn.textContent = '✖';
        deleteBtn.classList.add('delete-btn');

        // When the delete button is clicked, bring up the password popup
        deleteBtn.onclick = () => {
            messageToDelete = messageDiv;  // Store the message to delete
            deleteAllMessages = false;     // It's not a full reset, just one message
            passwordPopup.style.display = 'block';  // Show the popup
        };

        // Append delete button to message div
        messageDiv.appendChild(deleteBtn);

        // Append message div to chatMessages
        chatMessages.appendChild(messageDiv);

        // Clear input
        messageInput.value = '';
        messageInput.focus();
    }
}

// Open the password popup for full chat reset
resetBtn.onclick = function() {
    messageToDelete = null;  // No single message to delete, we're resetting all
    deleteAllMessages = true;  // Flag for full reset
    passwordPopup.style.display = 'block';
}

// Close the password popup
closePopup.onclick = function() {
    passwordPopup.style.display = 'none';
}

// Submit password and either reset the chat or delete a message
submitPassword.onclick = function() {
    let passwordInput = document.getElementById('passwordInput').value;

    if (passwordInput === 'Reset2024') {
        if (deleteAllMessages) {
            // Clear all chat messages (reset)
            chatMessages.innerHTML = '';
            alert('Chat has been reset!');
        } else if (messageToDelete) {
            // Delete the specific message
            messageToDelete.remove();
            alert('Message has been deleted!');
        }
        passwordPopup.style.display = 'none';  // Close the popup
    } else {
        alert('Incorrect password!');
    }

    // Reset the password input field
    document.getElementById('passwordInput').value = '';
}

// Close the popup if clicked outside the content
window.onclick = function(event) {
    if (event.target == passwordPopup) {
        passwordPopup.style.display = 'none';
    }
}
