import React, { Fragment } from "react";
import Chat from "../components/Chat";
import { Redirect } from "react-router-dom";
import WebSocketInstance from "../websocket";
class HomepageLayout extends React.Component {
  state = {
    messages: null,
    messageOnFinish: false,
  };
  initialChats(room) {
    this.waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(
        this.setMessages.bind(this),
        this.addMessage.bind(this)
      );
      WebSocketInstance.fetchMessages();
    });
    WebSocketInstance.connect(room);
  }
  constructor(props) {
    super(props);
    if (localStorage.getItem("user")) {
      console.log("in constructor");
      this.initialChats("demo");
    }
  }
  waitForSocketConnection = (callback) => {
    console.log("waitForSocketConnection");
    const component = this;
    setTimeout(function () {
      if (WebSocketInstance.state() === 1) {
        console.log("connection is secured");
        callback();
        return;
      } else {
        console.log("waiting for connection");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  };
  addMessage(message) {
    this.setState({ messages: [...this.state.messages, message] });
  }

  setMessages(messages) {
    this.setState({ messages: messages.reverse() });
    console.log(messages);
  }

  render() {
    if (!localStorage.getItem("user")) return <Redirect to="/login" />;
    return (
      <Fragment>
        <Chat
          messages={this.state.messages}
          olderMessages={(num) => this.handleOlderMessages(num)}
          messageOnFinish={this.state.messageOnFinish}
        />
      </Fragment>
    );
  }
}
export default HomepageLayout;
