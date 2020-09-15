const nameInput = document.getElementById("myName");
const myMessage = document.getElementById("myMessage");
const sendButton = document.getElementById("sendButton");
const getButton = document.getElementById("getButton");
const chatBox = document.getElementById("chat");
const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;
const MILLISECONDS_IN_TEN_SECONDS = 10000;


//URL to the Server is https://it3049c-chat-application.herokuapp.com
//URL to the link to get the messages is https://it3049c-chat-application.herokuapp.com/messages


function updateMessagesInChatBox() {
  this.fetchMessages();
  this.formatMessages();
  this.updateChatBox();
};

function fetchMessages() {
  //fetch messages from server
  return fetch(serverURL)
    .then(response => response.json())
};

function formatMessage(message, myName) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

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
  //loop over the recieved messages to convert them to html elements
  //he function will mark the messages as (incoming/outgoing) or 
  //(yours/anyone else’s) based on the sender name in the textbox.
};

function updateChatBox() {
  //Add the formatted messages to the chatbox
  //clear and the chatbox and insert the newly formatted messages.
};


async function updateMessages() {

  // Fetch Messages
  const messages = await fetchMessages();
  console.log(messages);
  // Loop over the messages. Inside the loop we will
  // get each message
  // format it
  // add it to the chatbox
  let formattedMessages = "";
  messages.forEach(message => {
    formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
};

updateMessages();
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);
