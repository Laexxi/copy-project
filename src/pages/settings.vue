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
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn @click="">Browse</v-btn>
      </v-col>
    </v-row>

    <!-- Copy Mode -->
    <v-row>
      <v-col cols="12">
        <v-select
          label="Copy Mode"
          :items="['Manual', 'Automatic']"
          v-model="settings.copyMode"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Language Selection -->
    <v-row>
      <v-col cols="12">
        <v-select
          label="Language"
          :items="['English', 'Deutsch', 'Français']"
          v-model="settings.language"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Target Directory -->
    <v-row align="center">
      <v-col cols="10">
        <v-text-field
          label="Target Directory"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn @click="">Set Target</v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-row>
    <v-col>
      <v-btn @click="saveSettings">Einstellungen speichern</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { settings, saveSettings } from '../hooks/useSettings.js';

</script>