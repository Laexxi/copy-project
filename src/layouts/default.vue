<template>
    <v-app>
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
        >
          <v-list-item
            prepend-icon="$menu"
            title="Navigation"
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav height="70%">
            <v-list-item @click="goto('index')" prepend-icon="mdi-home" title="Home" value="index"></v-list-item>
            <v-list-item @click="goto('settings')" prepend-icon="mdi-cog" title="Settings" value="settings"></v-list-item>
            <v-list-item @click="goto('about')" prepend-icon="$info" title="About" value="about"></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-btn @click="toggleTheme" variant="plain" class="d-flex justify-center align-center">
      <v-icon>{{ darkMode ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
    </v-btn>
  </v-navigation-drawer>
        <v-main style="height: 250px"><NuxtPage></NuxtPage></v-main>
        
      </v-layout>
    </v-app>
  </template>
    
    <script setup>
    import { ref } from 'vue';
    import { useTheme } from 'vuetify';
    import { useRouter } from 'vue-router';

    const theme = useTheme();
    const router = useRouter();

    // Data
    const darkMode = ref(true);
    const drawer = ref(true);
    const rail = ref(true);

    //Methoden
    const goto = (page) => {
      router.push({ name: page });
        };

    const toggleTheme = () => {
      darkMode.value = !darkMode.value; // Umschalten des dunklen Modus
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
        };
    </script>
    
    <style>
  .align-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .v-list-item:hover {
    background-color: #1976D2; /* Hover-Effekt */
  }
  
  .v-list-item:active {
    background-color: #1565C0; /* Ausgewählter Button */
  }
  
  /* Stil für den eingeklappten Zustand */
  @media (max-width: 960px) {
    .v-navigation-drawer .v-list-item-content {
      display: none;
    }
  }
  </style>