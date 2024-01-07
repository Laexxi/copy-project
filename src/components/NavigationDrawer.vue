<script setup>
import { settings, saveSettings } from '../hooks/useSettings.js';

const props = defineProps({
    drawerOpen: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['update:drawerOpen']);
const router = useRouter();
const theme = useTheme();

const rail = ref(true);
const submenu = ref(null);


const themeIcon = computed(() => {
    return settings.value.theme === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny';
});

const toggleDrawer = () => {
    emit('update:drawerOpen', !props.drawerOpen);
};

const toggleSubmenu = (menu) => {
    if (submenu.value !== menu) {
        submenu.value = menu;
        if (menu === 'settings') {
            goto('settings');
        }
    }
};

const goto = (page) => {
    if (page !== 'settings' && page !== 'folderandtags') {
        submenu.value = null;
    }
    router.push({ name: page });
};

const toggleTheme = async () => {
    try {
        const newTheme = theme.global.current.value.dark ? 'light' : 'dark';
        theme.global.name.value = newTheme;
        settings.value.theme = newTheme;
        await saveSettings();
    } catch (error) {
        console.error('Error changing theme', error);
    }
}

</script>

<template>
    <v-navigation-drawer class="d-flex flex-column" v-model="drawer" :rail="rail" permanent @click="rail = false">
        <!-- Drawer Header -->
        <v-list-item prepend-icon="$menu" :title="$t('index.title')">
            <template v-slot:append>
                <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
            </template>
        </v-list-item>
        <v-divider></v-divider>
        <!-- List Container -->
        <div class="flex-grow-1" style="overflow-y: auto;">
            <v-list density="compact" nav>
                <!-- List Items -->
                <v-list-item @click="goto('index')" prepend-icon="mdi-home" :title="$t('index.home')"
                    value="index"></v-list-item>
                <v-list-item @click="toggleSubmenu('settings')" prepend-icon="mdi-cog" :title="$t('settings.settings')"
                    value="settings"></v-list-item>
                <template v-if="submenu === 'settings'">
                    <v-list-item class="submenu-item" @click="goto('settings')" prepend-icon="mdi-wrench"
                        :title="$t('settings.general')" value="settings"></v-list-item>
                    <v-list-item class="submenu-item" @click="goto('folderandtags')" prepend-icon="mdi-folder-multiple"
                        :title="$t('settings.folderandtags')" value="folderandtags"></v-list-item>
                </template>
                <v-list-item @click="goto('automation')" prepend-icon="mdi-flash" :title="$t('auto.auto')"
                    value="automation"></v-list-item>
                <v-list-item @click="goto('about')" prepend-icon="$info" :title="$t('about.about')"
                    value="about"></v-list-item>
            </v-list>
        </div>

        <template v-slot:append>
            <v-divider></v-divider>
            <v-footer :class="{ 'footer-container': true, 'collapsed-footer': !drawer }">
                <div class="theme-button-container">
                    <v-btn @click="toggleTheme" variant="plain">
                        <v-icon>{{ themeIcon }}</v-icon>
                    </v-btn>
                </div>
                <div class="version-number-container">
                    <span class="version-number">Version: 0.1.0-alpha1</span>
                </div>
            </v-footer>
        </template>
    </v-navigation-drawer>
</template>

<style>
.footer-container {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    /* Aligns footer content vertically */
}

/* Navigation Drawer Styles */
.v-list-item:hover {
    background-color: #1976D2;
    /* Hover effect for list items */
}

.v-list-item:active {
    background-color: #1565C0;
    /* Active state effect for list items */
}

.submenu-item {
    margin-left: 20px;
    /* Indentation for submenu items */
}

.submenu-item .v-icon {
    font-size: 14px;
    /* Icon size for submenu items */
}


/* Footer Styles */
.theme-button-container {
    display: flex;
    justify-content: flex-start;
    /* Aligns theme toggle button to the start */
}

.version-number-container {
    display: flex;
    justify-content: flex-end;
    /* Aligns version number to the end */
}

.version-number {
    font-size: 12px;
    color: #777;
    /* Styling for the version number text */
    margin-left: 10px;
}

/* Responsive Styles */
@media (max-width: 960px) {
    .v-navigation-drawer .v-list-item-content {
        display: none;
        /* Hides list item content in collapsed drawer mode */
    }

    .collapsed-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        /* Styles for footer in collapsed drawer mode */
    }
}
</style>
