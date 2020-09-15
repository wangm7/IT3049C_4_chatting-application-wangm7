const nameInput = document.getElementById("myName");
const myMessage = document.getElementById("myMessage");
const sendButton = document.getElementById("sendButton");
const refButton = document.getElementById("refButton");
const chatBox = document.getElementById("chat");
const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;
const MILLISECONDS_IN_TEN_SECONDS = 10000;
//URL to the Server is https://it3049c-chat-application.herokuapp.com
//URL to the link to get the messages is https://it3049c-chat-application.herokuapp.com/messages
//let request = require("request-promise");


function updateMessagesInChatBox() {
  this.fetchMessages();
  this.formatMessage();
  this.updateChatBox();
};

function fetchMessages() {
  //fetch messages from server
  return fetch(serverURL)
    .then(response => response.json()) // (function (reseponse) {return response.json})
  //.catch(error => alter('Wrong'))
};


function formatMessage(message, myName) {
  const time = new Date(message.timestamp);
  //loop over the recieved messages to convert them to html elements
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;
  //he function will mark the messages as (incoming/outgoing) or 
  //(yours/anyone else’s) based on the sender name in the textbox.
  if (myName === message.sender) {
    return `
         <div class="mine messages">
             <div class="message">
                 ${message.text}
             </div>
             <div class="sender-info">
                 ${formattedTime}
             </div>
         </div>
         `
  } else {
    return `
             <div class="yours messages">
                 <div class="message">
                     ${message.text}
                 </div>
                 <div class="sender-info">
                     ${message.sender} ${formattedTime}
                 </div>
             </div>
         `
  }
};

function updateChatBox() {
  //Add the formatted messages to the chatbox
  this.updateMessages();
  //clear and the chatbox and insert the newly formatted messages.
  chatBox.textContent = " ";
};


async function updateMessages() {
  // Fetch Messages
  const messages = await fetchMessages();
  console.log(messages);
  let formattedMessages = "";
  // Loop over the messages. Inside the loop we will
  // get each message
  messages.forEach(message => {
    // format it
    formattedMessages += formatMessage(message, nameInput.value);
  });
  // add it to the chatbox
  chatBox.innerHTML = formattedMessages;
};


function sendMessages(username, text) {
  const newMessage = {
    sender: username,
    text: text,
    timestamp: new Date()
  }

  fetch(serverURL, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMessage)
  });
}

/**
 * 
 function sendMessages (username, text) {
    const newMessage = {
        sender: username,
        text: text,
        timestamp: new Date()
    }

    $.post(serverURL, newMessage);
}
 */

sendButton.addEventListener("click", function (sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender, message);
  myMessage.value = "";
});

refButton.addEventListener("click", function (refreshButtonClickEvent) {
  //window.location.reload(true);
  refreshButtonClickEvent.preventDefault();
  //updateMessagesInChatBox();
  updateChatBox();
  //console.log();
});


//updateMessagesInChatBox();
updateMessages();
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);
