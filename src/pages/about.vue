<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>About the Application</h1>
          <p class="text-justify">
            This application is licensed under the <strong>GNU General Public License v3.0 (GPL v3)</strong>. The GPL is a widely used free software license, which guarantees end users the freedom to run, study, share, and modify the software. The choice of this license ensures that this application remains free and open for the community.
          </p>
  
          <v-divider class="my-4"></v-divider> <!-- Visueller Trenner -->
  
          <p class="text-justify">
            If you find this application useful and would like to support its development, consider contributing in a way that feels right for you. Your support is greatly appreciated and helps in maintaining and developing new features.
          </p>
  
          <v-btn color="orange" href="https://ko-fi.com/laexxi" target="_blank" class="mt-2">
            <v-icon left>mdi-coffee</v-icon>
            Support on Ko-fi
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    // Component configuration
  };
  </script>
  
  <style scoped>
  .text-justify {
    text-align: justify;
  }
  
  .my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  </style>
  