import React, { useState, useRef, useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { renderTimestamp } from "../store/utility";
import WebSocketInstance from "../websocket";

const Chat = (props) => {
  const messagesEnd = useRef(null);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const { messages } = props;
  const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;
  useEffect(() => {
    if (messagesEnd.current)
      messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [props]);
  const renderMessages = (message, key) => {
    let jc = message.author === user.username ? "end" : "start";
    let msgUser = message.author === user.username ? "msg_send" : "msg_recieve";
    let timeStamp = renderTimestamp(message.timestamp);
    return (
      <div key={key} className={`d-flex mb-1 justify-content-${jc}`}>
        <div className={`msg_cotainer ${msgUser}`}>
          <p className="author">{message.author}</p>
          <p className="content">{message.content}</p>
          <p className="msg_time text-right">{timeStamp}</p>
        </div>
      </div>
    );
  };
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const messageObject = {
      from: user.userId,
      content: message.trim(),
    };
    setMessage("");
    if (message.trim() !== "") WebSocketInstance.newChatMessage(messageObject);
  };
  let input = document.getElementById("chat-message-input");
  if (input)
    input.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("chat-message-submit").click();
        setMessage("");
      }
    });

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ height: "91vh" }}
    >
      <div
        className="shadow m-2 rounded card"
        style={{ height: "600px", width: "550px", minWidth: "300px" }}
      >
        <div className="card-header card-title text-center font-weight-bold">
          Chat Group
        </div>
        <div className="card-body overflow-auto">
          {messages ? (
            <>
              {messages.map((message, key) => renderMessages(message, key))}
              {messages.length === 0 ? (
                <p className="text-center">Be a First to message</p>
              ) : null}
            </>
          ) : (
            <div className="d-flex justify-content-center align-item-center">
              <Spin indicator={antIcon} />
            </div>
          )}
          <div style={{ clear: "both" }} ref={messagesEnd} />
        </div>
        <div className="card-footer">
          <form onSubmit={(e) => handleMessageSubmit(e)}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="enter your message..."
                id="chat-message-input"
                aria-describedby="chat-message-submit"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  id="chat-message-submit"
                  className="btn btn-outline-secondary"
                  type="button"
                  disabled={message !== "" ? false : true}
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
