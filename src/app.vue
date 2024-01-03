<template>
  <NuxtLayout>

  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { settingsManager } from './hooks/useSettings.js';
import { useTheme } from 'vuetify';

const themeSetting = ref('dark');
const theme = useTheme();

onMounted(async () => {
  try {
    // Lesen des Theme-Wertes aus den Einstellungen
    const savedTheme = await settingsManager.get('theme');
    if (savedTheme) {
      themeSetting.value = savedTheme;
      theme.global.name.value = savedTheme;
    }
  } catch (error) {
    console.error('Error loading the theme setting:', error);
  }
});

</script>