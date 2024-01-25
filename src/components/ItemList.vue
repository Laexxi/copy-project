<template>
    <v-list class="overflow-y-auto" style="max-height: 80vh;">
        <v-list-item v-for="(item, index) in items" :key="index">
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

const props = defineProps({
    items: Array,
    tagItems: Array
});
</script>
  
<style scoped>
.text-truncate {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
  