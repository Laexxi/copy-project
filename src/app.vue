<template>
  <NuxtLayout>

  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { initializeSettings, settingsManager, settings } from './hooks/useSettings.js';
import { useTheme } from 'vuetify';
import { useI18n } from 'vue-i18n';

const themeSetting = ref('dark');
const theme = useTheme();
const { locale } = useI18n();

const languageMap = {
  'English': 'en',
  'Deutsch': 'de',
  'Français': 'fr'
};

onMounted(async () => {
  try {
    await initializeSettings();
    // Set the correct saved theme at startup
    const savedTheme = await settingsManager.get('theme');
    if (savedTheme) {
      themeSetting.value = savedTheme;
      theme.global.name.value = savedTheme;
    }
  } catch (error) {
    console.error('Error loading the theme setting:', error);
  }
  // Set the correct language at startup
  const langCode = languageMap[settings.value.language];
  if (langCode) {
    locale.value = langCode;
  }
});

</script>