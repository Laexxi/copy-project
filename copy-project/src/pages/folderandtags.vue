<template>
    <div class="table-container">
        <v-toolbar flat>
            <v-toolbar-title>{{ $t('fat.tags') }}</v-toolbar-title>
            <v-btn color="primary" dark class="mb-2" @click="openAddDialog">{{ $t('fat.newentry') }}</v-btn>
        </v-toolbar>
        <v-data-table :headers="headers" :items="tags" class="elevation-1">
            <template v-slot:item.copyMode="{ item }">
                {{ item.copyMode === 'false' ? t('fat.move') : t('fat.copy') }}
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="openEditDialog(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
        </v-data-table>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-text-field v-model="editedItem.tag" :label="t('fat.tag')" :rules="[required]"></v-text-field>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="editedItem.directory" :label="t('fat.directory')" :rules="[required]"
                                readonly @click="browseDirectory"></v-text-field>
                        </v-row>
                        <v-row justify="center" align-content="center">
                            <div class="d-flex align-center justify-center">
                                <v-radio-group v-model="editedItem.copyMode" inline>
                                    <v-radio :label="t('fat.move')" value="false"></v-radio>
                                    <v-radio :label="t('fat.copy')" value="true"></v-radio>
                                </v-radio-group>
                            </div>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">{{ $t('fat.abort') }}</v-btn>
                    <v-btn color="blue darken-1" text @click="save">{{ $t('fat.save') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import { open } from '@tauri-apps/api/dialog';
import { settings, saveSettings, initializeSettings } from '../hooks/useSettings';
import { v4 as uuidv4 } from 'uuid';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// TODO: Fix headers not showing.
const headers = computed(() => [
    { text: t('fat.tag'), value: 'tag', sortable: false },
    { text: t('fat.directory'), value: 'directory', sortable: false },
    { text: t('fat.standardoperation'), value: 'copyMode', sortable: false },
    { text: t('fat.actions'), value: 'action', sortable: false }
]);

const dialog = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({ id: '', tag: '', directory: '', copyMode: '' });
const formTitle = ref('');
const loading = ref(false);

//Validation
const required = (value) => !!value || t('fat.required');

const tags = computed(() => settings.value.tags);

onMounted(async () => {
    loading.value = true;
    try {
        await initializeSettings();
    } finally {
        loading.value = false;
    }
});

//Dialog

function openEditDialog(item) {
    editedIndex.value = tags.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    formTitle.value = t('fat.edit');
    dialog.value = true;
}

function openAddDialog() {
    editedIndex.value = -1;
    editedItem.value = { id: uuidv4(), tag: '', directory: '', copyMode: '' };
    formTitle.value = t('fat.new');
    dialog.value = true;
}

const browseDirectory = async () => {
    try {
        const selected = await open({
            directory: true,
            multiple: false
        });
        if (selected) {
            editedItem.value.directory = selected;
        }
    } catch (error) {
        console.error('Error while choosing a directory:', error);
    }
};
//Switch
const copyMode = ref(false); // false = move; true=copy


// Tag handling

function deleteItem(item) {
    const index = tags.value.indexOf(item);
    if (index > -1) {
        settings.value.tags.splice(index, 1);
        saveSettings();
    }
}

function close() {
    dialog.value = false;
}

// Save to config
const save = async () => {
    loading.value = true;
    try {
        if (editedIndex.value > -1) {
            Object.assign(tags.value[editedIndex.value], editedItem.value);
        } else {
            settings.value.tags.push({ ...editedItem.value });
        }
        saveSettings();
    } finally {
        loading.value = false;
        close();
    }
};
</script>
  
<style></style>