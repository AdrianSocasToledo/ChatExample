var socket = io.connect("https://gofiochat.herokuapp.com", {
  forceNew: true,
}); //aqui va la IP del server al que conectarse.

socket.on("messages", function (data) {
  console.log(data);
  render(data);
});

function render(data) {
  var html = data
    .map(function (message, index) {
      return `
            <div class="message">
                <strong>${message.nickname}</strong> : 
                <span>${message.text}</span>
            </div>
        `;
    })
    .join(" ");

  var div_messages = document.getElementById("messages");
  div_messages.innerHTML = html;
  div_messages.scrollTop = div_messages.scrollHeight;
}

function addMessage(e) {
  var message = {
    nickname: document.getElementById("nickname").value,
    text: document.getElementById("text").value,
  };

  document.getElementById("nickname").style.display = "none";
  socket.emit("add-message", message);
  return false;
}
