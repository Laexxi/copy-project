<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" class="text-center">
        <h1 class="text-h4 py-4 mt-10">{{ translate('index.title') }}</h1>
        <v-btn color="primary" class="mt-10" @click="" variant="elevated" height="200" width="400" elevation="10"
          rounded="lg">
          <v-icon icon="mdi-folder-search" size="50"></v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script setup>
import { useInternationalization } from '../hooks/useInternationalization.js';
const { translate } = useInternationalization();

</script>
  
<style scoped></style>
  