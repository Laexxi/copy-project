import { ref } from "vue";
import { SettingsManager } from "tauri-settings";

// Default settings
const defaultSettings = {
  theme: "dark", // Default theme
  language: "English", // Default language
  copyMode: "Manual", // Default copy mode
};

// Create a settings manager instance
const settingsManager = new SettingsManager(defaultSettings);

// Reactive state for the settings
const settings = ref(defaultSettings);

// Initialize settings
settingsManager.initialize().then((loadedSettings) => {
  settings.value = loadedSettings;
});

// Function to save settings
const saveSettings = async () => {
  await settingsManager.setCache("theme", settings.value.theme);
  await settingsManager.setCache("language", settings.value.language);
  await settingsManager.setCache("copyMode", settings.value.copyMode);
  await settingsManager.syncCache();
};

export { settings, saveSettings, settingsManager };
