import consumer from "channels/consumer"

consumer.subscriptions.create("PostChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("connected")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log(data)
    this.appendLine(data)
  },

  appendLine(data) {
    const html = this.createLine(data)
    const element = document.querySelector("[id='posts']")
    element.insertAdjacentHTML("afterbegin", html)
  },

  createLine(data) {
    return `
      <div id="post_${data['id']}">
        <p>
          ${data["body"]}
        </p>
      </div>
    `
  }
});
