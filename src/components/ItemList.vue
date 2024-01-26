<template>
    <v-list class="overflow-y-auto" style="max-height: 80vh;">
        <v-list-item v-for="(item, index) in sortedItems" :key="index">
            <v-row class="align-center">
                <v-col cols="9">
                    <div class="text-truncate">{{ item.name }}</div>
                </v-col>
                <v-col cols="3">
                    <v-combobox chips clearable v-model="item.tags" :items="tagItems" :label="$t('search.combobox.tag')"
                        dense style="width: 100%;"></v-combobox>
                </v-col>
            </v-row>
        </v-list-item>
    </v-list>
</template>
  
<script setup>
import { computed } from 'vue';

const props = defineProps({
    items: Array,
    tagItems: Array
});
const sortedItems = computed(() => {
    return [...props.items].sort((a, b) => {
        const aHasTags = a.tags && a.tags.length > 0;
        const bHasTags = b.tags && b.tags.length > 0;

        if (!aHasTags && bHasTags) return -1;
        if (aHasTags && !bHasTags) return 1;
        return 0;
    });
});
</script>
  
<style scoped>
.text-truncate {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
  