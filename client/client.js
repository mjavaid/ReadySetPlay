(function() {
  'use strict';

  const content = document.getElementById('content'),
    input = document.getElementById('input'),
    status = document.getElementById('status');

  let myColor, myName;

  window.WebSocket = window.WebSocket || window.MozWebSocket;

  if (!window.WebSocket) {
    content.innerHTML = `<p>Sorry, but your browser doesn't support WebSocket.</p>`;
    input.remove();
    return;
  }

  const conn = new WebSocket('ws://127.0.0.1:1337');

  conn.onopen = function() {
    input.removeAttribute('disabled');
    status.innerHTML = 'Choose name:';
  };

  conn.onerror = function() {
    content.innerHTML = `<p>Sorry, but there's some problem with your connection or server is down.</p>`;
  };

  conn.onmessage = function(message) {
    let json;
    try {
      json = JSON.parse(message.data);
    } catch(e) {
      console.log('Invalid JSON:', message.data);
      return;
    }

    if (json.type === 'color') {
      myColor = json.data;
      status.innerText = `${myName}:`;
      status.style.color = myColor;
      input.removeAttribute('disabled');
    } else if (json.type === 'history') {
      json.data.forEach(d => {
        addMessage(d.author, d.text, d.color, new Date(d.time));
      });
    } else if (json.type === 'message') {
      input.removeAttribute('disabled');
      addMessage(json.data.author, json.data.text,
        json.data.color, new Date(json.data.time));
    } else {
      console.warn(`Hmmm ... Unknown response type: ${json.type}`)
    }
  };

  input.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      const msg = input.value;
      if (!msg) { return; }

      conn.send(msg);
      input.value = '';

      input.setAttribute('disabled', 'disabled');
      if (!myName) {
        myName = msg;
      }
    }
  });

  setInterval(function() {
    if (conn.readyState !== 1) {
      status.innerText = 'Error';
      input.setAttribute('disabled', 'disabled').value = 'Unable to communicate with the WebSocket server.'
    }
  }, 3000);

  function addMessage(author, message, color, dt) {
    const pElem = document.createElement('p');
    const hours = dt.getHours(),
      mins = dt.getMinutes();
    pElem.innerHTML = `<span style="color: ${color};">${author}</span> @ `
      + `${hours < 10 ? 0 : ''}${hours}:${mins < 10 ? 0 : ''}${mins}: `
      + `${message}`;
    content.appendChild(pElem);
  }
})();
