// useSettings.ts
import { ref, watch } from 'vue';
import { SettingsManager } from 'tauri-settings';

interface Settings {
  sourceDirectory: string;
  targetDirectory: string;
  selectedCopyMode: string | null;
  selectedLanguage: string | null;
}

const settingsManager = new SettingsManager('copybot-settings');
const settings = ref<Settings>({
  sourceDirectory: '',
  targetDirectory: '',
  selectedCopyMode: null,
  selectedLanguage: null,
});

const copyModes = ref(['Auto', 'Manual']);
const languages = ref(['English', 'Deutsch', 'Français']);

export const useSettings = () => {
  const loadSettings = async () => {
    try {
      const loadedSettings = await settingsManager.get('settings');
      if (loadedSettings) {
        settings.value = loadedSettings;
      }
    } catch (error) {
      console.error("Fehler beim Laden der Einstellungen:", error);
    }
  };

  const updateSetting = async (key, value) => {
    settingsManager.setCache(key, value);
  };

  const saveSettings = async () => {
    try {
      await settingsManager.set('settings', settings.value);
    } catch (error) {
      console.error("Fehler beim Speichern der Einstellungen:", error);
    }
  };

  const saveSettingsToDisk = async () => {
    try {
      console.log("Speichern der Einstellungen:", settings.value);
      await settingsManager.syncCache();
      console.log("Einstellungen gespeichert.");
    } catch (error) {
      console.error("Fehler beim Speichern der Einstellungen auf der Festplatte:", error);
      if (error instanceof Error) {
        console.error("Fehlerdetails:", error.message);
      }
    }
  };

  watch(settings, saveSettings, { deep: true });

  return {
    settings,
    loadSettings,
    saveSettings,
    copyModes,
    languages,
    saveSettingsToDisk,
    updateSetting  
  };
};