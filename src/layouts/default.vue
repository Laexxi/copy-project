<template>
  <!-- Main App Layout -->
  <v-app>
    <v-layout>
      <!-- Navigation Drawer Component -->
      <v-navigation-drawer class="d-flex flex-column" v-model="drawer" :rail="rail" permanent @click.stop="rail = false">
        <!-- Drawer Header -->
        <!-- <v-list-item prepend-icon="$menu" :title="$t('index.title')">
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item> -->
        <v-list-item class="d-flex justify-space-between" :title="$t('index.title')">
          <template v-slot:prepend>
            <v-img src="@/assets/logo256.png" class="mr-2" height="24" width="24"></v-img>
          </template>
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <!-- List Container -->
        <div class="flex-grow-1 overflow-y-auto">
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
        <!-- Footer Section -->
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

      <!-- Main Content Area -->
      <v-main style="height: 250px">
        <NuxtPage></NuxtPage>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify';
import { settings, saveSettings } from '../hooks/useSettings.js';

const router = useRouter();
const theme = useTheme();
const drawer = ref(true);
const rail = ref(true);
const submenu = ref(null);


// Computed property for dynamic theme icon
const themeIcon = computed(() => {
  return settings.value.theme === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny';
});


// Method to toggle submenu display
const toggleSubmenu = (menu) => {
  if (submenu.value !== menu) {
    submenu.value = menu;
    if (menu === 'settings') {
      goto('settings');
    }
  }
};

// Navigation method
const goto = (page) => {
  if (page !== 'settings' && page !== 'folderandtags') {
    submenu.value = null;
  }
  router.push({ name: page });
};

// Method to toggle theme
const toggleTheme = async () => {
  try {
    const newTheme = theme.global.current.value.dark ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    settings.value.theme = newTheme;
    await saveSettings();
  } catch (error) {
    console.error('Error changing theme', error);
  }
};

watch(rail, (newRailValue) => {
  if (newRailValue) {
    submenu.value = null;
  }
});
</script>

<style>
/* Styling for the footer and other elements */
.footer-container {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.v-list-item:hover {
  background-color: #1976D2;
}

.submenu-item {
  margin-left: 20px;
}

.submenu-item .v-icon {
  font-size: 18px;
}

.version-number {
  font-size: 12px;
  color: #777;
  margin-left: 10px;
}

@media (max-width: 960px) {
  .v-navigation-drawer .v-list-item-content {
    display: none;
  }

  .collapsed-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }
}
</style>
