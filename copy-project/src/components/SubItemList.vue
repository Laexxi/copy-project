<template>
    <v-list class="overflow-y-auto" style="max-height: 80vh;">
        <v-list-item v-for="(item, index) in filteredItemsByTag" :key="index">
            <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <!-- Optional: Weitere Item-Details hier anzeigen -->
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>
  
<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    items: Array, // Die Liste der Items, die bereits nach der Suchanfrage gefiltert wurden
    tagItems: Array, // Die Liste der verfügbaren Tags
    currentTag: String // Der aktuelle Tag, der in diesem speziellen Tab ausgewählt wurde
});

// Filtern Sie die Items weiter basierend auf dem aktuellen Tag
const filteredItemsByTag = computed(() => {
    if (props.currentTag) {
        return props.items.filter(item => item.tags.includes(props.currentTag));
    }
    return props.items;
});
</script>
  
<style scoped>
/* Ihr CSS falls benötigt */
</style>
  