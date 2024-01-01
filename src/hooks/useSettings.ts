// useSettings.ts
import { ref, watch } from 'vue';
import { SettingsManager } from 'tauri-settings';

interface Settings {
  sourceDirectory: string;
  targetDirectory: string;
  selectedCopyMode: string | null;
  selectedLanguage: string | null;
}

export const useSettings = () => {
  const loadSettings = async () => {
    try {
      const loadedSettings = await settingsManager.get('settings');
      if (loadedSettings) {
        settings.value = loadedSettings;
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  const saveSettings = async () => {
    try {
      await settingsManager.set('settings', settings.value);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  const saveSettingsToDisk = async () => {
    try {
      console.log("Saving the settings:", settings.value);
      await settingsManager.syncCache();
      console.log("Settings saved.");
    } catch (error) {
      console.error("Failed to save settings on disk:", error);
      if (error instanceof Error) {
        console.error("Error Details:", error.message);
      }
    }
  };

  return {
    loadSettings,
    saveSettings,
    saveSettingsToDisk
  };
};