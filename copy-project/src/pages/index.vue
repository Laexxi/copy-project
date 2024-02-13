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

    <!-- <v-img class="fixed-top fill-height" src="~/assets/images/background.jpg" opacity="0.3" position="absolute"></v-img> -->
  </v-container>
</template>

<script setup lang="ts">
import { readDir } from '@tauri-apps/api/fs';
import { initializeSettings, settingsManager, settings } from '../hooks/useSettings';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fileService } from '../hooks/fileService'

const router = useRouter();

onMounted(async () => {
  await initializeSettings();
});

const getSavedPath = async () => {
  return settingsManager.get('sourceDirectory')
}

const loadAndListDirectory = async (path?: string): Promise<void> => {
  const savedDirectoryPath = await getSavedPath();

  if (savedDirectoryPath) {
    try {
      const files = await readDir(savedDirectoryPath);
      fileService.setFiles(files);
      router.push({ name: 'searchlist' });

    } catch (error) {
      console.error('Error trying to read directory:', error);
    }

  }
};

</script>

<style scoped>
.text-h4 {
  font-size: 2.5rem;
  font-weight: 500;
}

.mt-10 {
  margin-top: 10px;
}

.v-btn {
  background-color: #03a9f4;
  color: #fff;
}

.v-icon {
  color: #fff;
}

/* Hintergrundbild */
.fixed-top {
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

.fill-height {
  height: 100vh;
}
</style>
