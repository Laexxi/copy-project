<template>
    <v-text-field prepend-inner-icon="mdi-magnify" v-model="searchQuery" :label="label" solo hide-details
        @input="emitSearch"></v-text-field>
</template>
  
<script setup>
import { ref } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: 'Search'
    }
});

const searchQuery = ref('');
const emit = defineEmits(['search']);

const emitSearch = () => {
    emit('search', searchQuery.value);
};
</script>
  