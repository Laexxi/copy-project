<template>
  <v-container>
    <!-- Kopfzeile -->
    <v-row>
      <v-col cols="12">
        <h1>{{ $t("settings.settings") }}</h1>
      </v-col>
    </v-row>

    <!-- Source Directory -->
    <!-- <v-row align="center">
      <v-col cols="6">
        <v-text-field :label="$t('settings.source')" readonly v-model="settings.sourceDirectory"></v-text-field>
      </v-col>
      <v-col cols="4"></v-col>
      <v-col cols="2">
        <v-btn @click="browseDirectory">{{ $t("settings.browse") }}</v-btn>
      </v-col>
    </v-row> -->

    <!-- Copy Mode -->
    <!-- <v-row>
      <v-col cols="4">
        <v-select :label="$t('settings.mode')" :items="[$t('settings.move'), $t('settings.copy')]"
          v-model="settings.mode"></v-select>
      </v-col>
    </v-row> -->

    <!-- Language Selection -->
    <v-row>
      <v-col cols="4">
        <v-select :label="$t('settings.language')" :items="['English', 'Deutsch', 'Français']"
          v-model="settings.language"></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { settings, saveSettings } from "../hooks/useSettings.js";
import { watch } from "vue";
import { open } from "@tauri-apps/api/dialog";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const languageMap = {
  English: "en",
  Deutsch: "de",
  Français: "fr",
};

watch(
  () => settings.value.language,
  (newLanguage) => {
    const langCode = languageMap[newLanguage];
    if (langCode) {
      locale.value = langCode;
    }
  }
);

watch(
  () => settings.value,
  async () => {
    await saveSettings();
  },
  { deep: true }
);

const browseDirectory = async () => {
  try {
    const selected = await open({
      directory: true,
      multiple: false,
    });
    if (selected) {
      settings.value.sourceDirectory = selected;
      await saveSettings();
    }
  } catch (error) {
    console.error("Error while choosing a directory:", error);
  }
};
</script>
