var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static("client"));
app.get("/", function (req, res) {
  res.send("Hola Mundo");
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

// server.listen(process.env.PORT || 5000, function () {
//   console.log("Servidor está funcionando...");
// });

server.listen(5000, function () {
  console.log("Servidor está funcionando...");
});
