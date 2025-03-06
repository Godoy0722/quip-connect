<template>
  <v-app :theme="theme">
    <v-app-bar
      app
      :elevation="1"
      role="banner"
    >
      <v-container class="d-flex align-center pa-0">
        <div class="d-flex align-center">
          <v-icon size="32" color="primary" class="me-2" aria-hidden="true">mdi-message-text</v-icon>
          <h1 class="v-app-bar-title font-weight-bold text-h6">QuipConnect</h1>
        </div>
        
        <v-spacer></v-spacer>
        
        <v-chip
          :color="connected ? 'success' : 'warning'"
          size="small"
          class="me-2"
          pill
          aria-live="polite"
        >
          {{ connected ? 'Connected' : 'Connecting...' }}
        </v-chip>
        
        <v-btn
          icon
          variant="text"
          @click="toggleTheme"
          class="ml-2"
          aria-label="Toggle dark/light theme"
        >
          <v-icon aria-hidden="true">{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>

        <about-dialog :connected="connected" class="ml-2" />
      </v-container>
    </v-app-bar>

    <v-main role="main">
      <v-container class="chat-container py-8">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card class="chat-card" :elevation="3" rounded="lg">
              <v-card-item class="chat-header">
                <v-card-title class="text-h5 font-weight-bold">
                  <h2 id="chat-title">Humorous Response System</h2>
                </v-card-title>
                <v-card-subtitle class="mt-1">
                  Type any message and get a funny response from our system!
                </v-card-subtitle>
              </v-card-item>
              
              <v-divider></v-divider>
              
              <v-card-text class="messages-container" aria-live="polite" aria-labelledby="chat-title">
                <div v-if="messages.length === 0" class="empty-state">
                  <v-icon size="64" class="text-grey mb-3" aria-hidden="true">mdi-chat-outline</v-icon>
                  <p class="empty-state-text">{{ connected ? 'No messages yet. Start the conversation!' : 'Connecting to server...' }}</p>
                </div>
                
                <div v-else class="message-list" role="log" aria-label="Conversation messages">
                  <div
                    v-for="(message, index) in messages"
                    :key="index"
                    :class="['message-wrapper', message.type === 'sent' ? 'message-sent-wrapper' : 'message-received-wrapper']"
                  >
                    <div 
                      :class="['message', message.type === 'sent' ? 'message-sent' : 'message-received']"
                      :aria-label="message.type === 'sent' ? 'Message sent' : 'Message received'"
                    >
                      <div class="message-content">
                        {{ message.text }}
                      </div>
                      <div class="message-timestamp">
                        {{ formatTime(message.timestamp) }}
                        <v-icon v-if="message.type === 'sent'" 
                                size="12" 
                                :color="isDark ? '#a7ffbe' : 'success'" 
                                class="ms-1"
                                aria-hidden="true"
                                aria-label="Message delivered">
                          mdi-check-all
                        </v-icon>
                      </div>
                    </div>
                  </div>
                </div>
              </v-card-text>
              
              <v-card-actions class="input-area pa-4">
                <v-text-field
                  v-model="messageInput"
                  placeholder="Type your message..."
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  rounded
                  :disabled="!connected"
                  prepend-inner-icon="mdi-emoticon-outline"
                  append-inner-icon="mdi-send"
                  @click:append-inner="sendMessage"
                  @keyup.enter="sendMessage"
                  aria-label="Message input"
                  class="message-input"
                ></v-text-field>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <app-footer />
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import socketService from './services/socket';
import AboutDialog from './components/AboutDialog.vue';
import AppFooter from './components/AppFooter.vue';
import { useThemeStore } from './store/theme';

const { isDark, theme, toggleTheme } = useThemeStore();

const connected = ref(false);
const messageInput = ref('');
const messages = ref([]);
const welcomeMessageShown = ref(false);

function initSocketConnection() {
  socketService.connect();
  
  socketService.onConnect(() => {
    connected.value = true;
    console.log('Connected to server');
  });
  
  socketService.onDisconnect(() => {
    connected.value = false;
    welcomeMessageShown.value = false;
    console.log('Disconnected from server');
  });
  
  socketService.onResponse(handleServerResponse);
}

function handleServerResponse(data) {
  const isWelcomeMessage = data.message.includes('Welcome to QuipConnect');
  
  if (isWelcomeMessage && !welcomeMessageShown.value) {
    addMessage('received', data.message, data.timestamp);
    welcomeMessageShown.value = true;
  } else if (!isWelcomeMessage) {
    addMessage('received', data.message, data.timestamp);
  }
  
  scrollToBottom();
}

function sendMessage() {
  if (messageInput.value.trim() === '' || !connected.value) return;
  
  addMessage('sent', messageInput.value, new Date().toISOString());
  socketService.sendMessage(messageInput.value);
  messageInput.value = '';
  scrollToBottom();
}

function addMessage(type, text, timestamp) {
  messages.value.push({ type, text, timestamp });
}

function scrollToBottom() {
  setTimeout(() => {
    const container = document.querySelector('.messages-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, 50);
}

function formatTime(timestamp) {
  try {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  } catch (e) {
    return '';
  }
}

onMounted(() => {
  initSocketConnection();
});
</script>

<style scoped>
.chat-container {
  min-height: calc(100vh - 150px);
  display: flex;
  align-items: center;
  padding: 16px 0;
}

.chat-card {
  display: flex;
  flex-direction: column;
  height: 65vh;
  max-height: 650px;
  border-radius: 12px !important;
  overflow: hidden;
}

.chat-header {
  background-color: rgb(var(--v-theme-surface));
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: rgb(var(--v-theme-surface));
  position: relative;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  opacity: 0.9;
}

.empty-state-text {
  color: var(--v-theme-text-primary);
  font-weight: 500;
  font-size: 1rem;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0;
}

.message-wrapper {
  display: flex;
  width: 100%;
  padding: 0 8px;
  margin-bottom: 8px;
}

.message-sent-wrapper + .message-sent-wrapper,
.message-received-wrapper + .message-received-wrapper {
  margin-top: -4px;
}

.message-sent-wrapper {
  justify-content: flex-end;
}

.message-received-wrapper {
  justify-content: flex-start;
}

.message {
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 16px;
  position: relative;
  word-wrap: break-word;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.message-sent {
  background-color: rgb(var(--v-theme-message-sent));
  color: var(--v-theme-text-sent);
  border-radius: 16px;
  border-bottom-right-radius: 4px;
}

.message-sent::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: -8px;
  width: 16px;
  height: 16px;
  background-color: rgb(var(--v-theme-message-sent));
  clip-path: polygon(0 0, 0% 100%, 100% 100%);
}

.message-received {
  background-color: rgb(var(--v-theme-message-received));
  color: var(--v-theme-text-received);
  border-radius: 16px;
  border-bottom-left-radius: 4px;
}

.message-received::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -8px;
  width: 16px;
  height: 16px;
  background-color: rgb(var(--v-theme-message-received));
  clip-path: polygon(100% 0, 0% 100%, 100% 100%);
}

.message-content {
  margin-bottom: 6px;
  line-height: 1.4;
  font-weight: 500;
}

.message-timestamp {
  font-size: 0.75rem;
  opacity: 0.9;
  text-align: right;
  margin-top: 2px;
}

.message-sent .message-timestamp {
  color: var(--v-theme-text-sent);
}

.message-received .message-timestamp {
  color: var(--v-theme-text-received);
}

.input-area {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgb(var(--v-theme-surface));
  padding: 12px 16px !important;
}

.message-input {
  border-radius: 24px;
}

:focus-visible {
  outline: 2px solid var(--v-theme-primary);
  outline-offset: 2px;
}

@media (max-width: 600px) {
  .chat-card {
    height: calc(100vh - 200px);
    max-height: none;
  }
  
  .message {
    max-width: 85%;
  }
}
</style>

