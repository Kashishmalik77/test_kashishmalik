// Connect to WebSocket server
const socket = new WebSocket('wss://echo.websocket.org');

// DOM elements
const messagesDiv = document.getElementById('messages');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// Handle incoming messages
socket.onmessage = function (event) {
  addMessage("Friend", event.data, false);
};

// Handle send button click
sendBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text) {
    addMessage("You", text, true);
    socket.send(text);
    input.value = '';
  }
});

// Optional: Send message on Enter key
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});

// Helper function to add messages
function addMessage(sender, text, isOwnMessage) {
  const div = document.createElement('div');
  div.textContent = `${sender}: ${text}`;
  div.style.marginBottom = "8px";
  div.style.fontWeight = isOwnMessage ? "bold" : "normal";
  div.style.textAlign = isOwnMessage ? "right" : "left";
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}