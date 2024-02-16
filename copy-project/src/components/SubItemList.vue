<template>
    <div class="d-flex">
        <v-list class="overflow-y-auto half-list" style="max-height: 80vh;">
            <v-subheader>{{ $t('fat.move') }}</v-subheader>
            <v-list-item v-for="(item, index) in moveItems" :key="`move-${index}`">
                <v-row class="align-center">
                    <v-col cols="8">
                        <div class="text-truncate">{{ item.name }}</div>
                    </v-col>
                    <v-col cols="4">
                        <v-btn icon @click="moveToCopy(item)"><v-icon>mdi-chevron-right</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-list-item>
        </v-list>

        <v-list class="overflow-y-auto half-list" style="max-height: 80vh;">
            <v-subheader>{{ $t('fat.copy') }}</v-subheader>
            <v-list-item v-for="(item, index) in copyItems" :key="`copy-${index}`">
                <v-row class="align-center">
                    <v-col cols="8">
                        <div class="text-truncate">{{ item.name }}</div>
                    </v-col>
                    <v-col cols="4">
                        <v-btn icon @click="moveToMove(item)"><v-icon>mdi-chevron-left</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-list-item>
        </v-list>
    </div>
</template>
  
<script setup>
import { ref, computed, defineProps } from 'vue';

const props = defineProps({
    items: Array,
    tagItems: Array,
    selectedTag: String
});

// Initialisiere Items basierend auf dem 'tocopy' Wert
const moveItems = computed(() => {
    return props.items.filter(item => item.tags.includes(props.selectedTag) && !item.tocopy);
});
const copyItems = computed(() => {
    return props.items.filter(item => item.tags.includes(props.selectedTag) && item.tocopy);
});

// Funktionen zum Verschieben der Items zwischen den Listen
function moveToCopy(item) {
    item.tocopy = true;
}
function moveToMove(item) {
    item.tocopy = false;
}
</script>
  
<style scoped>
.half-list {
    width: 50%;
}

.text-truncate {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
  