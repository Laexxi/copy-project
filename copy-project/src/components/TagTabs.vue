<template>
    <v-container>
        <v-tab-item v-if="currentTab === 0">
            <!-- Inhalt für "Alle Items" Tab -->
            <!-- ... -->
        </v-tab-item>

        <v-tab-item v-if="currentTab > 0" v-for="tag in tagItems" :key="tag">
            <!-- Inhalt für das spezifische Tag -->
            <!-- ... -->
        </v-tab-item>
    </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { settings } from '../hooks/useSettings';

const props = defineProps({
    currentTab: Number
});

const tagItems = computed(() => settings.value.tags.map(tag => tag.tag));
</script>
