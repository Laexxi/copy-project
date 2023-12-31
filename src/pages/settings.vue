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
        <v-text-field
          label="Source Directory"
          v-model="settings.sourceDirectory"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn @click="browseDirectory">Browse</v-btn>
      </v-col>
    </v-row>

    <!-- Copy Mode -->
    <v-row>
      <v-col cols="12">
        <v-select
          label="Copy Mode"
          :items="copyModes"
          :value="settings.selectedCopyMode"
          @input="(value) => updateSetting('selectedCopyMode', value)"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Language Selection -->
    <v-row>
      <v-col cols="12">
        <v-select
          label="Language"
          :items="languages"
          v-model="settings.selectedLanguage"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Target Directory -->
    <v-row align="center">
      <v-col cols="10">
        <v-text-field
          label="Target Directory"
          v-model="settings.targetDirectory"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn @click="setTargetDirectory">Set Target</v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-row>
    <v-col>
      <v-btn @click="saveSettingsToDisk">Einstellungen speichern</v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useSettings } from "../hooks/useSettings";

const {
  settings,
  loadSettings,
  copyModes,
  languages,
  saveSettingsToDisk,
  updateSetting
} = useSettings();

const browseDirectory = () => {
  /* ... */
};
const setTargetDirectory = () => {
  /* ... */
};

onMounted(loadSettings);
</script>
