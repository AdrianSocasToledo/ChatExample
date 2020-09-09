var socket = io.connect("https://", {
  forceNew: true,
}); //aqui va la IP del server al que conectarse.

let nickname = document.getElementById("nickname");

let texto = document.querySelector("#text");
texto.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    addMessage();
    texto.value = "";
  }
});

let boton = document.querySelector(".botonEnviar");
boton.addEventListener("click", () => {
  addMessage();
  texto.value = "";
  event.preventDefault();
});

socket.on("messages", function (data) {
  console.log(data);
  render(data);
});

function render(data) {
  var html = data
    .map(function (message) {
      return `
            <div class="message">
                <strong>${message.nickname}: &nbsp</strong>
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
    nickname: nickname.value,
    text: texto.value,
  };

  console.log("hola");
  nickname.style.display = "none";
  socket.emit("add-message", message);
  return false;
}
