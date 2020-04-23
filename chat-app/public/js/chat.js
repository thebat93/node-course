const socket = io();

// Elements
const form = document.querySelector("#message-form");
const input = document.querySelector("input");
const sendMessageButton = document.querySelector("#send-message");
const sendLocationButton = document.querySelector("#send-location");
const messages = document.querySelector("#messages");
const sidebar = document.querySelector("#sidebar");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector(
  "#location-message-template"
).innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

// Options
const options = new URLSearchParams(location.search);
const username = options.get("username");
const room = options.get("room");

const timeFormat = { hour12: false, hour: "2-digit", minute: "2-digit" };

const autoscroll = () => {
  // New message element
  const newMessage = messages.lastElementChild;

  // Height of the new message
  const newMessageStyles = getComputedStyle(newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

  // Visible height
  const visibleHeight = messages.offsetHeight;

  // Height of messages container
  const containerHeight = messages.scrollHeight;

  // How far have I scrolled?
  const scrollOffset = messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    messages.scrollTop = messages.scrollHeight;
  }
};

socket.on("message", ({ username, text, createdAt }) => {
  const templateData = {
    username,
    message: text,
    createdAt: new Date(createdAt).toLocaleTimeString([], timeFormat),
  };
  const html = Mustache.render(messageTemplate, templateData);
  messages.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

socket.on("locationMessage", ({ username, url, createdAt }) => {
  const templateData = {
    username,
    url,
    createdAt: new Date(createdAt).toLocaleTimeString([], timeFormat),
  };
  const html = Mustache.render(locationMessageTemplate, templateData);
  messages.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, { room, users });
  sidebar.innerHTML = html;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  sendMessageButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, (error) => {
    sendMessageButton.removeAttribute("disabled");
    input.value = "";
    input.focus();

    if (error) {
      return console.log(error);
    }
    console.log("Message delivered");
  });
});

sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }

  sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit("sendLocation", { latitude, longitude }, () => {
      sendLocationButton.removeAttribute("disabled");
      console.log("Location shared");
    });
  });
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
