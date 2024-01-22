<template>
    <v-container>
        <!-- Top Bar with search and filter -->
        <v-row class="mb-2">
            <v-col cols="6">
                <v-text-field v-model="searchQuery" :label="$t('search.searchbar')" solo hide-details></v-text-field>
            </v-col>
            <v-col></v-col>
            <v-col cols="3">
                <v-select v-model="sortOrder" :items="sortOptions" :label="$t('search.filter')" solo
                    hide-details></v-select>
            </v-col>
        </v-row>

        <!-- main content -->
        <v-list class="overflow-y-auto" style="max-height: 80vh;">
            <v-list-item v-for="(item, index) in sortedAndFilteredFiles" :key="index">
                <v-row class="align-center">
                    <v-col cols="1">
                        <v-checkbox v-model="item.selected"></v-checkbox>
                    </v-col>
                    <v-col cols="9">
                        <div v-bind="props" class="text-truncate">
                            {{ item.name }} <v-tooltip activator="parent" location="bottom">{{ item.name }}</v-tooltip>
                        </div>
                    </v-col>
                    <v-col cols="2">
                        <v-combobox clearable :items="dropdownItems" :label="$t('search.combobox.tag')" dense
                            style="width: 100%;"></v-combobox>
                    </v-col>
                </v-row>
            </v-list-item>
        </v-list>
        <!-- bottom bar -->
        <v-row class="mt-2">
            <v-col cols="11">
                <v-checkbox v-model="selectAll" @change="toggleSelectAll" hide-details
                    :label="$t('search.selectall')"></v-checkbox>
            </v-col>
            <v-col cols="1">
                <v-btn @click="goNext">Weiter</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { fileService } from '../hooks/fileService';

const route = useRoute();
const files = fileService.getFiles();
const selectedItems = ref([]);
const searchQuery = ref('');
const sortOrder = ref(null);
const sortOptions = ['Option 1', 'Option 2'];
const selectAll = ref(false);
const dropdownItems = ['Aktion 1', 'Aktion 2']; // Replace with your actual dropdown items

const toggleSelectAll = (value) => {
    sortedAndFilteredFiles.forEach((item) => {
        item.selected = value;
    });
};

const sortedAndFilteredFiles = computed(() => {
    // Implement sorting and filtering logic based on searchQuery and sortOrder
    return files; // Example return
});

const goNext = () => {
    // Logic for the Next button
};
</script>
  
<style scoped>
.text-truncate {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>