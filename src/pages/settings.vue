<template>
  <v-container>
    <!-- Kopfzeile -->
    <v-row>
      <v-col cols="12">
        <h1>Settings</h1>
      </v-col>
    </v-row>

    <!-- Source Directory -->
    <v-row align="center">
      <v-col cols="10">
        <v-text-field label="Source Directory" readonly v-model="settings.sourceDirectory"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn @click="browseDirectory">Browse</v-btn>
      </v-col>
    </v-row>

    <!-- Copy Mode -->
    <v-row>
      <v-col cols="12">
        <v-select label="Copy Mode" :items="['Manual', 'Automatic']" v-model="settings.copyMode"></v-select>
      </v-col>
    </v-row>

    <!-- Language Selection -->
    <v-row>
      <v-col cols="12">
        <v-select label="Language" :items="['English', 'Deutsch', 'Français']" v-model="settings.language"></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { settings, saveSettings } from '../hooks/useSettings.js';
import { watch } from 'vue';
import { open } from '@tauri-apps/api/dialog';

watch(() => settings.value, async (newSettings, oldSettings) => {
  // Do not save while Initialilzing when there are nor oldSettings
  if (oldSettings) {
    await saveSettings();
  }
}, { deep: true });

const browseDirectory = async () => {
  try {
    const selected = await open({
      directory: true,
      multiple: false
    });
    if (selected) {
      settings.value.sourceDirectory = selected;
      await saveSettings();
    }
  } catch (error) {
    console.error('Error while choosing a directory:', error);
  }
};
</script>