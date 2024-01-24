<template>
    <v-container>
        <!-- Top Bar with search and filter -->
        <v-row class="mb-2">
            <v-col cols="6">
                <v-text-field prepend-inner-icon="mdi-magnify" v-model="searchQuery" :label="$t('search.searchbar')" solo
                    hide-details></v-text-field>
            </v-col>
        </v-row>

        <!-- Tabs -->
        <v-row>
            <v-col cols="12">
                <v-tabs v-model="tab">
                    <v-tab>Alle Items</v-tab>
                    <v-tab v-for="tag in uniqueTags" :key="tag" v-show="true">{{ tag }}</v-tab>
                </v-tabs>
            </v-col>
        </v-row>

        <!-- Tab-Inhalte -->
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <!-- Inhalt für "Alle Items" Tab -->
                <v-list class="overflow-y-auto" style="max-height: 80vh;">
                    <v-list-item v-for="(item, index) in filteredItems" :key="index">
                        <v-row class="align-center">
                            <v-col cols="9">
                                <div class="text-truncate">
                                    {{ item.name }} <v-tooltip activator="parent" location="bottom">{{ item.name
                                    }}</v-tooltip>
                                </div>
                            </v-col>
                            <v-col cols="3">
                                <v-combobox chips clearable v-model="item.tags" :items="tagItems"
                                    :label="$t('search.combobox.tag')" dense style="width: 100%;"></v-combobox>
                            </v-col>
                        </v-row>
                    </v-list-item>
                </v-list>
            </v-tab-item>
            <v-tab-item v-for="tag in uniqueTags" :key="tag">
                <!-- Inhalt für jedes Tag -->
                <v-list class="overflow-y-auto" style="max-height: 80vh;">
                    <v-list-item v-for="(item, index) in itemsFilteredByTag(tag)" :key="index">
                        <!-- Layout für jedes Item, ähnlich wie oben -->
                    </v-list-item>
                </v-list>
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
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { fileService } from '../hooks/fileService';
import { settings } from '../hooks/useSettings';

const route = useRoute();
const files = fileService.getFiles();


// Item Manipulation, Building of general list
const items = ref([]);

//Initialize Items and fill array
const initializeItems = () => {
    items.value = files.map(file => ({
        selected: false,
        name: file.name,
        tags: [],
        path: file.path,
    }));


    //watch changes of tags
    items.value.forEach((item, index) => {
        watch(() => item.tags, (newTags) => {
            items.value[index].selected = newTags.length > 0;
        }, { deep: true });
    });
};

const filteredItems = computed(() => {
    if (!searchQuery.value) {
        return items.value; // Wenn kein Suchbegriff eingegeben wurde, geben Sie alle Elemente zurück
    }
    return items.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

onMounted(() => {
    initializeItems();
});

//search and filter
const searchQuery = ref('');

//Fill tag-dropdown
const tagItems = computed(() => {
    return settings.value.tags.map(tag => tag.tag);
});

const uniqueTags = computed(() => {
    const allTags = new Set();
    items.value.forEach(item => {
        item.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags);
});

const itemsFilteredByTag = (tag) => {
    return items.value.filter(item => item.tags.includes(tag));
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