// JavaScript code for Banking App
let balance = 1500;
const transactions = [];  // Array to store transactions

function showPage(pageNumber) {
    console.log(`Showing page ${pageNumber}`); // Debugging
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.getElementById(`page${pageNumber}`).style.display = 'flex';
}

function updateBalance() {
    document.getElementById('balance').innerText = `£${balance.toFixed(2)}`;
}

function updateTransactionLog() {
    const log = document.getElementById('transactionLog');
    log.innerHTML = ''; // Clear existing log
    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = transaction;
        log.appendChild(listItem);
    });
}

function withdraw() {
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    if (amount > balance) {
        alert('Insufficient funds.');
        return;
    }
    balance -= amount;
    transactions.push(`Withdrew £${amount.toFixed(2)}`);
    updateBalance();
    updateTransactionLog();
    showPage(2);
}

function deposit() {
    const amount = parseFloat(document.getElementById('depositAmount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    balance += amount;
    transactions.push(`Deposited £${amount.toFixed(2)}`);
    updateBalance();
    updateTransactionLog();
    showPage(2);
}

function resetBankingSystem() {
    balance = 1500; // Reset balance
    transactions.length = 0; // Clear transaction history
    updateBalance(); // Update balance display
    updateTransactionLog(); // Update transaction log
    showPage(1); // Show the initial page
}

function hideBankingBox() {
    document.getElementById('bankingBox').style.display = 'none';
    setTimeout(() => {
        document.getElementById('bankingBox').style.display = 'block';
        resetBankingSystem(); // Reset the system
    }, 100); // Brief delay to ensure hide/show transition
}

// Initialize balance and transaction log on page load
updateBalance();
updateTransactionLog();
