class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocket.instance = new WebSocketService();
    }
    return WebSocket.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect(chatUrl) {
    const path = `ws://127.0.0.1:8000/ws/chat/C${chatUrl}/`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log("WebSocket open");
    };
    this.socketRef.onmessage = (e) => {
      this.socketNewMessage(e.data);
    };
    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed");
      if (JSON.parse(localStorage.getItem("user"))) {
        console.log("let's reopen");
        this.connect(chatUrl);
      }
    };
  }

  disconnect() {
    this.socketRef.close();
  }
  detail() {
    return this.socketRef;
  }

  socketNewMessage(data) {
    const parseData = JSON.parse(data);
    const command = parseData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      this.callbacks[command](parseData.messages);
    }
    if (command === "new_message") {
      this.callbacks[command](parseData.message);
    }
  }

  fetchMessages(ChatId) {
    this.sendMessage({
      command: "fetch_messages",
    });
  }
  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      from: message.from,
      message: message.content,
    });
  }

  addCallbacks(messagesCallback, newMessageCallback) {
    this.callbacks["messages"] = messagesCallback;
    this.callbacks["new_message"] = newMessageCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }
}

const WebSocketInstance = WebSocketService.getInstance();
export default WebSocketInstance;
