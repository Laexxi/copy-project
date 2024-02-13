<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" class="text-center">
        <h1 class="text-h4 py-4 mt-10">{{ $t('index.start') }}</h1>
        <v-btn color="primary" class="mt-10" @click="loadAndListDirectory(sourceDirectory)" variant="elevated"
          height="200" width="400" elevation="10" rounded="lg">
          <v-icon icon="mdi-folder-search" size="50"></v-icon>
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-row align="center">
          <v-text-field :label="$t('settings.source')" v-model="sourceDirectory"></v-text-field>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-btn @click="browseDirectory">{{ $t("settings.browse") }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { readDir } from '@tauri-apps/api/fs';
import { useRouter } from 'vue-router';
import { fileService } from '../hooks/fileService';
import { open } from "@tauri-apps/api/dialog";

const router = useRouter();
const sourceDirectory = ref('');

const loadAndListDirectory = async (): Promise<void> => {
  if (sourceDirectory.value) {
    try {
      const files = await readDir(sourceDirectory.value);
      fileService.setFiles(files);
      router.push({ name: 'searchlist' });
    } catch (error) {
      console.error("Error trying to read directory:", error);
    }
  }
};

const browseDirectory = async () => {
  try {
    const selected = await open({
      directory: true,
      multiple: false,
    });
    if (typeof selected === 'string') {
      sourceDirectory.value = selected;
    }
  } catch (error) {
    console.error("Error while choosing a directory:", error);
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
