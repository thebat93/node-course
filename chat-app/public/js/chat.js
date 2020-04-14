const socket = io();
const form = document.querySelector("#message-form");

socket.on("message", (text) => {
  console.log(text);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message);
});
