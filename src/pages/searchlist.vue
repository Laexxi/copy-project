<template>
    <v-container>
        <!-- Top Bar with search and filter -->
        <v-row class="mb-2">
            <v-col cols="6">
                <SearchBar :label="$t('search.searchbar')" @search="updateSearch" />
            </v-col>
        </v-row>

        <!-- Tabs -->
        <v-row>
            <v-col cols="12">
                <v-tabs v-model="tab">
                    <v-tab>{{ $t('search.allitems') }}</v-tab>
                    <v-tab v-for="tag in tagItems" :key="tag">{{ tag }}</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <!-- Tab-Content -->
        <v-tabs-items v-model="tab">
            <!-- "All Items" Tab -->
            <v-tab-item key="all">
                <ItemList :items="filteredItems" :tagItems="tagItems" />
            </v-tab-item>
        </v-tabs-items>

        <!-- Bottom bar -->
        <v-row class="mt-2">
            <v-col cols="11">
                <!-- Spacer -->
            </v-col>
            <v-col cols="1">
                <v-btn @click="goNext">{{ $t('search.next') }}</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fileService } from '../hooks/fileService';
import { settings } from '../hooks/useSettings';
import { useSearch } from '../hooks/useSearch';
import { useItems } from '../hooks/useItems';

const route = useRoute();
const files = fileService.getFiles();
const tab = ref(0);
const searchQuery = ref('');
const { items, setItems } = useItems();

onMounted(() => {
    initializeItems();
});

const initializeItems = () => {
    items.value = files.map(file => ({
        selected: false,
        name: file.name,
        tags: [],
        path: file.path,
    }));
};

const { filteredItems } = useSearch(items, searchQuery);
const updateSearch = (query) => {
    searchQuery.value = query;
};


const tagItems = computed(() => settings.value.tags.map(tag => tag.tag));

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