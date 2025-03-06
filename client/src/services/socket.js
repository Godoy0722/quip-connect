import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

const state = {
  connected: false,
  connecting: false,
  error: null
};

const socket = io(SERVER_URL, {
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 10000,
  autoConnect: false
});

socket.on('connect', () => {
  state.connected = true;
  state.connecting = false;
  state.error = null;
});

socket.on('connect_error', (err) => {
  state.error = err;
  checkServerHealth();
});

socket.on('disconnect', (reason) => {
  state.connected = false;
  
  if (reason === 'io server disconnect') {
    setTimeout(socket.connect.bind(socket), 1000);
  }
});

async function checkServerHealth() {
  try {
    const response = await fetch(`${SERVER_URL}/health`);
    if (response.ok && !socket.connected) {
      socket.connect();
    }
  } catch (error) {
    state.error = error;
  }
}

export default {
  connect() {
    state.connecting = true;
    if (!socket.connected) {
      checkServerHealth();
    }
  },
  
  disconnect() {
    if (socket.connected) {
      state.connecting = false;
      socket.disconnect();
    }
  },
  
  onConnect(callback) {
    socket.on('connect', callback);
  },
  
  onDisconnect(callback) {
    socket.on('disconnect', callback);
  },
  
  onResponse(callback) {
    socket.on('response', callback);
  },
  
  sendMessage(message) {
    socket.emit('message', { 
      text: message, 
      timestamp: new Date().toISOString() 
    });
  },
  
  getState() {
    return { ...state };
  }
}; 