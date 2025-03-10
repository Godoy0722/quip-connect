# QuipConnect

A real-time humorous response system built with Vue.js and Node.js using Socket.IO.

## Features

- Real-time messaging using Socket.IO
- Modern, minimalist UI built with Vue.js and Vuetify
- Dark mode support with theme toggle
- Responsive design for all device sizes
- Automatic humorous responses to any message
- Accessibility features for inclusive user experience

## System Architecture

- **Frontend**: Vue.js with Vuetify components for a responsive UI
- **Backend**: Node.js with Express and Socket.IO for real-time communication
- **Communication**: WebSockets via Socket.IO for instantaneous responses
- **Themes**: Light and dark mode with persistent user preferences

## Project Structure

```
quip-connect/
├── client/                # Vue.js frontend
│   ├── src/               # Frontend source code
│   │   ├── assets/        # Static assets
│   │   ├── components/    # Vue components
│   │   ├── plugins/       # Vue plugins (Vuetify)
│   │   ├── services/      # Service modules (Socket.IO client)
│   │   ├── store/         # State management
│   │   ├── App.vue        # Main app component
│   │   └── main.js        # Entry point
├── server/                # Node.js backend
│   ├── index.js           # Server entry point with Socket.IO
├── start.sh               # Startup script
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### Running the Application

1. Start the server:

```bash
cd server
npm start
```

2. Start the client in another terminal:

```bash
cd client
npm run serve
```

3. Open your browser and navigate to `http://localhost:8080`

## Usage

1. The app automatically connects to the server
2. Type any message in the input field
3. Press Enter or click the send icon
4. Receive a humorous response generated by the system
5. Toggle between light and dark mode using the theme toggle button

## Design Features

### Modern UI

- Clean, minimalist design inspired by modern chat apps
- Clearly defined message bubbles for sent and received messages
- Message timestamps for context
- Responsive layout that works on mobile, tablet, and desktop

### Accessibility

- High contrast between text and background
- Keyboard navigation support
- Screen reader friendly elements
- Focus indicators for keyboard users
- Responsive text sizing

### Dark Mode

- System preference detection for initial theme
- Manual toggle between light and dark modes
- Persistent theme preference using localStorage
- Carefully selected color palette for each theme

## Performance Considerations

- The system uses WebSockets for real-time communication, ensuring low latency
- Frontend uses Vue.js's reactive system for efficient DOM updates
- No database interactions, keeping the system lightweight
- Theme preferences stored locally to reduce server load

## Testing

- Manual testing for the UI components
- Connection recovery testing for network interruptions
- Responsive design testing on different screen sizes
- Accessibility testing with screen readers

## Author

Guilherme Godoy