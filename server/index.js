var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static("client"));
app.get("/hola-mundo", function (req, res) {
  res.status(200).send("Hola mundo desde una ruta");
});

var message = [
  {
    id: 1,
    text: "Bienvenido al chat",
    nickname: "Bot - Adrián Socas Toledo",
  },
];

io.on("connection", function (socket) {
  console.log(
    " El nodo con IP: " + socket.handshake.address + " se ha conectado..."
  );

  socket.emit("messages", message);

  socket.on("add-message", function (data) {
    message.push(data);
    io.sockets.emit("messages", message);
  });
});

server.listen(3000, function () {
  console.log("Servidor está funcionando en http://localhost:6677");
});
