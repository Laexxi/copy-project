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
                    <v-tab>Alle Items</v-tab>
                    <v-tab v-for="tag in tagItems" :key="tag">{{ tag }}</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <!-- Tab-Inhalte -->
        <v-tabs-items v-model="tab">
            <!-- Inhalt für "Alle Items" Tab -->
            <v-tab-item key="all">
                <ItemList :items="filteredItems" :tagItems="tagItems" />
            </v-tab-item>

            <!-- Inhalt für jedes spezifische Tag -->
            <v-tab-item v-for="tag in tagItems" :key="tag">
                <ItemList :items="itemsFilteredByTag(tag)" :tagItems="tagItems" />
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
import { createEmptyArrays } from '~/hooks/createArray';
import { useSearch } from '../hooks/useSearch';
import { useItems } from '../hooks/useItems';

const route = useRoute();
const files = fileService.getFiles();
const tab = ref(0);
const searchQuery = ref('');
const { items, setItems } = useItems();

const initializeItems = () => {
    items.value = files.map(file => ({
        selected: false,
        name: file.name,
        tags: [],
        path: file.path,
    }));

    items.value.forEach((item, index) => {
        watch(() => item.tags, (newTags) => {
            items.value[index].selected = newTags.length > 0;
            updateTagArrays(item, newTags);
        }, { deep: true });
    });
};

const { filteredItems } = useSearch(items, searchQuery);
const updateSearch = (query) => {
    searchQuery.value = query;
};

onMounted(() => {
    initializeItems();
});

const tagItems = computed(() => settings.value.tags.map(tag => tag.tag));
const tagArrays = ref(createEmptyArrays(tagItems.value));

const itemsFilteredByTag = (tag) => {
    return items.value.filter(item => item.tags.includes(tag));
};

const updateTagArrays = (item, newTags) => {
    if (!Array.isArray(newTags)) return;

    Object.keys(tagArrays.value).forEach(tag => {
        const index = tagArrays.value[tag].findIndex(i => i.path === item.path);
        if (index > -1) tagArrays.value[tag].splice(index, 1);
    });

    newTags.forEach(tag => {
        if (!tagArrays.value[tag]) {
            tagArrays.value[tag] = [];
        }
        tagArrays.value[tag].push({ ...item, selected: true, tags: [tag] });
    });
};

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