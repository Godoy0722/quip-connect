<template>
  <footer class="v-footer footer" color="surface" :elevation="0" role="contentinfo">
    <v-container class="py-2">
      <v-row>
        <v-col cols="12" md="4" class="text-center text-md-left mb-2 mb-md-0">
          <div class="d-flex align-center justify-center justify-md-start mb-1">
            <v-icon size="20" color="primary" class="me-2" aria-hidden="true">mdi-message-text</v-icon>
            <h2 class="text-subtitle-1 font-weight-bold">QuipConnect</h2>
          </div>
          <p class="text-body-2">A real-time humorous response system built with Vue.js and Node.js.</p>
        </v-col>
        
        <v-col cols="12" md="4" class="text-center mb-2 mb-md-0">
          <h2 class="text-subtitle-1 font-weight-bold mb-1">Technologies</h2>
          <div class="d-flex flex-wrap justify-center justify-md-center gap-1" role="list" aria-label="Technologies used">
            <v-chip size="small" color="info" class="ma-1">Vue.js</v-chip>
            <v-chip size="small" color="info" class="ma-1">Vuetify</v-chip>
            <v-chip size="small" color="success" class="ma-1">Socket.IO</v-chip>
            <v-chip size="small" color="success" class="ma-1">Node.js</v-chip>
          </div>
        </v-col>
        
        <v-col cols="12" md="4" class="text-center text-md-right">
          <h2 class="text-subtitle-1 font-weight-bold mb-1 pe-2" id="social-links">Links</h2>
          <div class="d-flex justify-center justify-md-end align-center" role="list" aria-labelledby="social-links">
            <v-btn 
              icon 
              variant="text" 
              aria-label="GitHub" 
              href="https://github.com/Godoy0722" 
              target="_blank" 
              rel="noopener noreferrer" 
              density="comfortable"
            >
              <v-icon aria-hidden="true">mdi-github</v-icon>
            </v-btn>
            
            <v-btn 
              icon 
              variant="text" 
              aria-label="LinkedIn" 
              href="https://www.linkedin.com/in/guilherme-godoy-53a1b12a2" 
              target="_blank" 
              rel="noopener noreferrer" 
              density="comfortable"
            >
              <v-icon aria-hidden="true">mdi-linkedin</v-icon>
            </v-btn>
            
            <v-btn 
              icon 
              variant="text" 
              aria-label="Email" 
              href="mailto:guilhermehlgodoy22@gmail.com"
              density="comfortable"
            >
              <v-icon aria-hidden="true">mdi-email</v-icon>
            </v-btn>
            
            <v-btn 
              icon 
              variant="text" 
              aria-label="Phone" 
              href="tel:+447983088184"
              density="comfortable"
            >
              <v-icon aria-hidden="true">mdi-phone</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      
      <v-divider class="my-2"></v-divider>
      
      <p class="text-center text-caption text-medium-emphasis">
        &copy; {{ new Date().getFullYear() }} — <span class="font-weight-medium">Guilherme Godoy</span> — All Rights Reserved
      </p>
    </v-container>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  padding: 4px 0;
  margin-top: 8px;
}
</style> 