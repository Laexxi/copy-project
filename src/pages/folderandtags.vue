<template>
    <div class="table-container">
        <v-data-table :headers="headers" :items="tags" class="elevation-1">
            <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="openEditDialog(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Tags</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark class="mb-2" @click="openAddDialog">Neuer Eintrag</v-btn>
                </v-toolbar>
            </template>
        </v-data-table>

        <!-- Dialog für das Hinzufügen/Bearbeiten von Einträgen -->
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="editedItem.tag" label="Tag"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="editedItem.directory" label="Directory" readonly
                                    @click="browseDirectory"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Abbrechen</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Speichern</v-btn>
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

const headers = [
    { text: 'Tag', align: 'start', sortable: false, value: 'tag' },
    { text: 'Directory', value: 'directory' },
    { text: 'Aktionen', value: 'action', sortable: false }
];

const dialog = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({ id: '', tag: '', directory: '' });
const formTitle = ref('');

// Verwenden Sie computed, um die Reaktivität sicherzustellen
const tags = computed(() => settings.value.tags);

// Beim Start die Einstellungen initialisieren
onMounted(async () => {
    await initializeSettings();
});

function openEditDialog(item) {
    editedIndex.value = tags.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    formTitle.value = 'Eintrag bearbeiten';
    dialog.value = true;
}

function openAddDialog() {
    editedIndex.value = -1;
    editedItem.value = { id: uuidv4(), tag: '', directory: '' };
    formTitle.value = 'Neuer Eintrag';
    dialog.value = true;
}

function browseDirectory() {
    open({
        directory: true,
        multiple: false
    }).then(selected => {
        if (selected) {
            editedItem.value.directory = selected;
        }
    }).catch(error => {
        console.error('Fehler beim Auswählen eines Verzeichnisses:', error);
    });
}

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

function save() {
    if (editedIndex.value > -1) {
        Object.assign(tags.value[editedIndex.value], editedItem.value);
    } else {
        settings.value.tags.push({ ...editedItem.value });
    }
    saveSettings();
    close();
}
</script>
  
<style>
/* Hier können Sie benutzerdefinierte Stile hinzufügen */
</style>