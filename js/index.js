// Selecting elements
const popUp = document.querySelector('.pop-up');
const popUpCloser = document.querySelector('.close-icon');
const markAsRead = document.querySelector('.p2a');
const messageElementDiv = document.querySelector('.mpesaMessage1-div');
const popupAmount = document.querySelector('.p1');
let modal1 = document.querySelector('.modal1');
let modal1Closer = document.querySelector('.modal1-closer');
let modal1Done = document.querySelector('.done');
let profileName = document.querySelector('.profile-name');
let kshInModal1 = document.querySelector('.profile-ksh');
let transIdInModal1 = document.querySelector('.id-trans');
let firstLettersName = document.querySelector('.profile-span');
const messagesModal = document.querySelector('.messages-modal');
const fromMessages = document.querySelector('.bi-arrow-left');
const goToMessages = document.querySelector('.to-messages');
const popUpWhiteBox = document.querySelector('.white-box');

// Initializing display styles
popUp.style.display = 'none';
messageElementDiv.style.display = 'none';
modal1.style.display = 'none';
messagesModal.style.display = 'none';

// Click events
popUpCloser.addEventListener('click', () => {
  popUp.style.display = 'none';
});

markAsRead.addEventListener('click', () => {
  popUp.style.display = 'none';
});

modal1Closer.addEventListener('click', () => {
  modal1.style.display = 'none';
});
modal1Done.addEventListener('click', () => {
  modal1.style.display = 'none';
});

fromMessages.addEventListener('click', () => {
  messagesModal.style.display = 'none';
  popUp.style.display = 'none';
});

goToMessages.addEventListener('click', () => {
  messagesModal.style.display = 'block';
});

popUpWhiteBox.addEventListener('click', () => {
  messagesModal.style.display = 'block';
});

// Unique ID generation function
function uniqueId() {
  const idStrLen = 10;
  let idStr = (Math.floor(Math.random() * 25) + 10).toString(36).toUpperCase();
  idStr += new Date().getTime().toString(36).toUpperCase();

  if (!idStr.startsWith('S')) {
    idStr = 'S' + idStr;
  }

  while (idStr.length < idStrLen) {
    idStr += Math.floor(Math.random() * 35)
      .toString(36)
      .toUpperCase();
  }

  idStr = idStr.slice(0, idStrLen);
  return idStr;
}

// Time variables
const date = new Date();
const options = { timeStyle: 'short', hour12: true };
const dayDate = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const timeString = date.toLocaleTimeString('en-US', options);
const currentDate = `${dayDate}/${month}/${year}`;

// Function to print the message
function printMessage() {
  const amount = document.querySelector('.js-input3').value;
  const name = document.querySelector('.js-input1').value;
  const ID = uniqueId();
  const tel = document.querySelector('.js-input4').value;
  const balance = document.querySelector('.js-input6').value;
  const errorMessage = document.querySelector('.errorMessage');
  const popupMessage = document.querySelector(
    '.blue-box .message-box .mpesaMessage'
  );
  const messageElement = document.querySelector('.mpesaMessage1');
  const smsTime = document.querySelector('.blue-box .header .sms-time');

  // Getting the first letters of each name
  const fullName = name;
  const names = fullName.split(' ');
  const firstInitial = names[0].charAt(0);
  const lastInitial = names[names.length - 1].charAt(0);
  const initializedName = firstInitial + lastInitial;

  // Name to uppercase
  const nameInUppercase = name.toUpperCase();

  // Calculate transaction cost
  let cost;
  if (amount <= 100) {
    cost = 0;
  } else if (amount <= 500) {
    cost = 7;
  } else if (amount <= 1000) {
    cost = 13;
  } else if (amount <= 3000) {
    cost = 25;
  } else {
    cost = 57;
  }

  // Input validation
  if (!name || !amount || !tel || !balance) {
    errorMessage.textContent = 'You are required to fill in all the fields!';
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 5000);
  } else {
    errorMessage.textContent =
      'Submission successful! You will receive a confirmation message shortly';
    errorMessage.style.background = 'green';
    errorMessage.style.color = 'white';
    errorMessage.style.display = 'block';
    popUp.style.display = 'block';

    modal1.style.display = 'block';
    profileName.innerHTML = `${nameInUppercase}`;
    kshInModal1.innerHTML = `KSH. ${amount}.00 <span class="fee-span">FEE: ${cost}.00 </span>`;
    transIdInModal1.innerHTML = `ID: ${ID}<i class="bi bi-copy"></i>`;
    firstLettersName.innerHTML = initializedName.toUpperCase();

    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 4000);

    popupAmount.innerHTML = `- KSH ${amount}`;
    if (timeString)
      smsTime.innerHTML = `<p class="sms-time1">SMS &#x2022; ${timeString}</p>`;

    popupMessage.innerHTML = `Paid <span class="span3">to</span> <span class="span4">${name}</span>`;

    const messageText = `${ID} Confirmed. Ksh${amount}.00 sent to ${nameInUppercase} <span class="span5">${tel}</span> on <span class="span5"> ${currentDate} at ${timeString}.</span> New MPESA balance is Ksh${balance}.00. Transaction cost, Ksh${cost}.00.`;

    setTimeout(() => {
      messageElementDiv.style.display = 'block';
      addMessageToDisplay(messageText);
    }, 4000);
  }
}

// Function to add a message to the displayed messages and local storage
function addMessageToDisplay(messageText) {
  const messageElement = document.querySelector('.mpesaMessage1');
  const message = document.createElement('p');
  message.innerHTML = messageText;

  // Append the new message to the messageElement
  messageElement.appendChild(message);

  // Save the message to local storage
  saveMessageToLocalStorage(messageText);
}

// Function to save message to local storage
function saveMessageToLocalStorage(messageText) {
  let messages = JSON.parse(localStorage.getItem('messages')) || [];
  messages.push(messageText);
  localStorage.setItem('messages', JSON.stringify(messages));
}

// Function to load messages from local storage
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  const messageElement = document.querySelector('.mpesaMessage1');

  // Clear any existing messages
  messageElement.innerHTML = '';

  // Loop through stored messages and append them to the messageElement
  messages.forEach((msg) => {
    const message = document.createElement('p');
    message.innerHTML = msg;
    messageElement.appendChild(message);
  });
}

// Call loadMessages when the page loads
document.addEventListener('DOMContentLoaded', loadMessages);

// Function to submit message on 'Enter' key press
function enterToSubmit(event) {
  if (event.key === 'Enter') {
    printMessage();
  }
}

// Adding event listener for Enter key
document.querySelector('.js-input1').addEventListener('keydown', enterToSubmit);

// Function to clear messages if needed
function clearMessages() {
  localStorage.removeItem('messages');
  loadMessages(); // Refresh the displayed messages
}

// Example of attaching clearMessages to a button click
document
  .querySelector('.clear-messages-button')
  .addEventListener('click', clearMessages);
