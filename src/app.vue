<template>
  <NuxtLayout>

  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { get } from 'tauri-settings';
import { settingsManager } from './hooks/useSettings';

const themeSetting = ref('dark');

onMounted(async () => {
  try {
    // Lesen des Theme-Wertes aus den Einstellungen
    const savedTheme = await settingsManager.get('theme');
    if (savedTheme) {
      themeSetting.value = savedTheme;
      console.log('Das geladene Theme ist:', savedTheme)
    }
  } catch (error) {
    console.error('Fehler beim Laden der Theme-Einstellung:', error);
  }
});

</script>