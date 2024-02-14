<template>
    <v-toolbar>
        <!-- Top Bar with search and filter -->
        <v-row class="mb-2">
            <v-col cols="6">
                <SearchBar :label="$t('search.searchbar')" @search="updateSearch" />
            </v-col>
        </v-row>
        <template v-slot:extension>
            <v-row>
                <v-col cols="12">
                    <v-tabs show-arrows v-model="tab">
                        <v-tab key="0">{{ $t('search.allitems') }}</v-tab>
                        <v-tab v-for="(tag, index) in visibleTags" :key="index + 1">{{ tag }}</v-tab>
                    </v-tabs>
                </v-col>
            </v-row>
        </template>
    </v-toolbar>
    <v-window v-model="tab">
        <!-- "All Items" Tab-Inhalt -->
        <v-window-item value="0">
            <ItemListContent :items="filteredItems" :tagItems="tagItems" />
        </v-window-item>

        <!-- Inhalte für andere Tabs -->
        <v-window-item v-for="(tag, index) in visibleTags" :value="index + 1" :key="tag">
            <ItemListContent :items="itemsFilteredByTag(tag)" :tagItems="tagItems" />
        </v-window-item>
    </v-window>


    <!-- Bottom bar -->
    <v-row class="mt-2">
        <v-col cols="11">
            <!-- Spacer -->
        </v-col>
        <v-col cols="1">
            <v-btn @click="goNext">{{ $t('search.next') }}</v-btn>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { fileService } from '../hooks/fileService';
import { settings } from '../hooks/useSettings';
import { useSearch } from '../hooks/useSearch';
import { useItems } from '../hooks/useItems';
import SubItemList from '../components/SubItemList.vue';

const route = useRoute();
const files = fileService.getFiles();
const tab = ref(0);
const searchQuery = ref('');
const { items, setItems } = useItems();

onMounted(() => {
    initializeItems();
});

// Array for data of items
const initializeItems = () => {
    items.value = files.map(file => ({
        selected: false,
        name: file.name,
        tags: file.tags || [],
        path: file.path,
        tocopy: false,
    }));
};
//Live Search
const { filteredItems, filterItems } = useSearch(items, searchQuery);
const updateSearch = (query) => {
    searchQuery.value = query;
};

// creation of tags
const tagItems = computed(() => settings.value.tags.map(tag => tag.tag));

// creation of itemlist
const itemsFilteredByTag = (tag) => {
    const filteredByTag = items.value.filter(item => item.tags && item.tags.includes(tag));
    return filterItems(filteredByTag, searchQuery.value);
};

// dynamic visibility of tabs; dont show with no item
const visibleTags = computed(() => {
    return tagItems.value.filter(tag => {
        return items.value.some(item => item.tags && item.tags.includes(tag));
    });
});

watch(items, () => {
}, { deep: true });

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
