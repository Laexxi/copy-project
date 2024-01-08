<template>
  <NuxtLayout>

  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { settingsManager, settings } from './hooks/useSettings.js';
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

//Cached Theme setting
const savedTheme = ref(null);

const getSavedTheme = async () => {
  savedTheme.value = await settingsManager.get('theme');
};

onMounted(async () => {
  await getSavedTheme();
  //Set Theme
  if (savedTheme.value) {
    themeSetting.value = savedTheme.value;
    theme.global.name.value = savedTheme.value;
  }

  // Set language
  const langCode = languageMap[settings.value.language];
  if (langCode) {
    locale.value = langCode;
  }
});

// Re-run on theme change
watchEffect(() => {
  theme.global.name.value = themeSetting.value;
});


</script>