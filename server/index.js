const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  },
  pingTimeout: 60000
});

const funnyResponses = [
  "I was going to tell you a joke about UDP, but you might not get it.",
  "Why don't programmers like nature? It has too many bugs.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
  "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
  "Why do Java developers wear glasses? Because they don't C#!",
  "An SEO expert walks into a bar, bars, pub, tavern, public house, Irish pub, drinks, beer...",
  "How do you comfort a JavaScript bug? You console it!",
  "Why did the developer go broke? Because he used up all his cache.",
  "Why did the function go to therapy? It had too many nested issues to work through.",
  "What's a programmer's favorite hangout spot? The Foo Bar.",
  "Why don't bachelors like Git? Because they're afraid to commit.",
  "What do you call a programmer from Finland? Nerdic.",
  "What's a pirate's favorite programming language? R, of course!",
  "Why don't programmers like to go outside? The sun causes too many reflection issues.",
  "What's a computer's favorite snack? Microchips!",
  "What did the router say to the doctor? 'I'm feeling a bit disconnected.'",
  "Why was the computer cold? It left its Windows open.",
  "What's an astronaut's favorite key on the keyboard? The space bar!",
  "I'd tell you a joke about TCP, but I'd have to keep telling it until you got it.",
  "Why was the AI assistant bad at boxing? It had too many technical knockouts!",
  "What's a programmer's favorite place in Italy? Silicon Venice.",
  "How does a computer get drunk? It takes screenshots.",
  "Why do developers use dark mode? Because light attracts bugs!",
  "What do you call an empty Git repository? Deserted."
];

let connectedClients = 0;

function getRandomResponse() {
  const randomIndex = Math.floor(Math.random() * funnyResponses.length);
  return funnyResponses[randomIndex];
}

function createResponseObject(message) {
  return {
    message,
    timestamp: new Date().toISOString()
  };
}

io.on('connection', (socket) => {
  connectedClients++;
  
  socket.emit('response', createResponseObject(
    "Welcome to QuipConnect! Send any message to get a funny response."
  ));
  
  socket.on('message', handleIncomingMessage);
  
  socket.on('disconnect', () => {
    connectedClients--;
  });
  
  socket.on('error', (error) => {
    console.error(`Socket error: ${error.message}`);
  });
  
  function handleIncomingMessage(data) {
    const response = getRandomResponse();
    
    setTimeout(() => {
      socket.emit('response', createResponseObject(response));
    }, 500);
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    clients: connectedClients
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 