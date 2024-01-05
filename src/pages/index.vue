<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" class="text-center">
        <h1 class="text-h4 py-4 mt-10">{{ $t('index.start') }}</h1>
        <v-btn color="primary" class="mt-10" @click="loadAndListDirectory" variant="elevated" height="200" width="400"
          elevation="10" rounded="lg">
          <v-icon icon="mdi-folder-search" size="50"></v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script setup>
import { readDir } from '@tauri-apps/api/fs';
import { initializeSettings, settingsManager, settings } from '../hooks/useSettings';

onMounted(async () => {
  await initializeSettings();
});

const loadAndListDirectory = async () => {
  const savedPath = await settingsManager.get('sourceDirectory');

  if (savedPath) {
    try {
      const files = await readDir(savedPath);
      console.log(files);
    } catch (error) {
      console.error('Error trying to read directory:', error);
    }

  }
};
</script>
  
<style scoped></style>
  