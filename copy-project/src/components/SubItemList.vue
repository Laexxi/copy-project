<template>
    <div class="d-flex justify-space-between">
        <div class="list-container">
            <v-list-subheader>Verschieben</v-list-subheader>
            <v-list>
                <v-list-item v-for="(item, index) in itemsForMove" :key="`move-${index}`">
                    <div class="d-flex justify-space-between align-center w-100">
                        <div class="text-truncate">{{ item.name }}</div>
                        <v-btn icon @click="toggleItemMode(item, false)">
                            <v-icon>mdi-arrow-right-bold</v-icon>
                        </v-btn>
                    </div>
                </v-list-item>
            </v-list>
        </div>

        <div class="list-container">
            <v-list-subheader>Kopieren</v-list-subheader>
            <v-list>
                <v-list-item v-for="(item, index) in itemsForCopy" :key="`copy-${index}`">
                    <div class="d-flex justify-space-between align-center w-100">
                        <div class="text-truncate">{{ item.name }}</div>
                        <v-btn icon @click="toggleItemMode(item, true)">
                            <v-icon>mdi-arrow-left-bold</v-icon>
                        </v-btn>
                    </div>
                </v-list-item>
            </v-list>
        </div>
    </div>
</template>
  
  
<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    items: Array,
    selectedTag: String
});

// Trennen der Items basierend auf ihrem copyMode
const itemsForMove = computed(() => props.items.filter(item => item.tags.includes(props.selectedTag) && !item.copyMode));
const itemsForCopy = computed(() => props.items.filter(item => item.tags.includes(props.selectedTag) && item.copyMode));

// Funktion zum Umschalten des copyMode
function toggleItemMode(item) {
    item.copyMode = !item.copyMode;
}
</script>
  
<style scoped>
.list-container {
    flex: 1;
}
</style>
  