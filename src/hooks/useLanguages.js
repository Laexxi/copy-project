// not implemented yet
// idea is a plugin-like localesystem where users can easily add own languages

import { ref, onMounted } from "vue";
import { readDir } from "@tauri-apps/api/fs";
import { appDataDir } from "@tauri-apps/api/path";

const useLanguages = () => {
  const languages = ref([]);

  const loadLanguages = async () => {
    try {
      const appDirectory = await appDataDir();
      const localesPath = `${appDirectory}/locales`; // Pfad zum Übersetzungsverzeichnis

      const files = await readDir(localesPath);
      languages.value = files
        .filter((file) => file.name.endsWith(".json")) // Zugriff auf die `name`-Eigenschaft
        .map((file) => file.name.replace(".json", "")); // `name`-Eigenschaft verwenden
    } catch (error) {
      console.error("Error loading languages:", error);
    }
  };

  onMounted(loadLanguages);

  return { languages };
};

export default useLanguages;
