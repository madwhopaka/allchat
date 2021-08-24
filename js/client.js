const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInp = document.getElementById("inputBar");
const messageCont = document.getElementById("jumbo");

const messageArea = "";

var audio = new Audio("../images/notif.mp3");

var myname = prompt("Enter your name: ");

socket.emit("new-user-joined", myname);

// used to display join alerts
const appendAlert = (message) => {
  const messageEle = document.createElement("div");
  messageEle.innerText = message;
  messageEle.className = "join-alert";
  messageCont.append(messageEle);
  audio.play();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInp.value;
  appendmessageCard(`You: ${message}`, "right");
  socket.emit("send", message);
});

// template code to display message when it is recieved or sent ;

const appendmessageCard = (message, position) => {
  var side;
  var haltside;
  if (position == "left") {
    side = "leftside";
    halfside = "left";
    audio.play();
  } else {
    side = "rightside";
    halfside = "right";
    messageInp.value = "";
  }

  messageCard = ` <div class="message" id='messageCont'>
<div class="${side}side">
    <div class="card mt-3 mb-3 ${halfside}">
        <div class="card-body ">
            <p class="card-text"> ${message}
            </p>
        </div>
    </div>
</div>

</div>`;

  const messagecon = document.createElement("div");
  messagecon.className = "message";
  messageCont.append(messagecon);
  messagecon.innerHTML = messageCard;
  messageCont.topScroll = messageCont.bottomScroll;
};

socket.on("users-joined", (myname) => {
  appendAlert(`${myname} joined the chat`);
});

socket.on("recieve", (data) => {
  appendmessageCard(`${data.name} : ${data.message} `, "left");
});

socket.on("leave", (name) => {
  appendAlert(`${name} left the chat`);
});
