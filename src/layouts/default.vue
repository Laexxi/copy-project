<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item prepend-icon="$menu" :title="$t('index.title')">
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav height="70%">
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
          <v-list-item @click="goto('about')" prepend-icon="$info" :title="$t('about.about')" value="about"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-btn @click="toggleTheme" variant="plain" class="d-flex justify-center align-center">
          <v-icon>{{ themeIcon }}</v-icon>
        </v-btn>
      </v-navigation-drawer>
      <v-main style="height: 250px">
        <NuxtPage></NuxtPage>
      </v-main>

    </v-layout>
  </v-app>
</template>
    
<script setup>
import { ref } from 'vue';
import { useTheme } from 'vuetify';
import { useRouter } from 'vue-router';
import { settings, saveSettings } from '../hooks/useSettings.js';

// Data
const theme = useTheme();
const router = useRouter();
const drawer = ref(true);
const rail = ref(true);
const submenu = ref(null);


const themeIcon = computed(() => {
  return settings.value.theme === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny';
});


//Methods
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
    console.error('Error while changing themes:', error);
  }
};
</script>
    
<style>
.align-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-list-item:hover {
  background-color: #1976D2;
  /* Hover-Effect */
}

.v-list-item:active {
  background-color: #1565C0;
  /* Active Button */
}

.submenu-item {
  margin-left: 20px;
}

.submenu-item .v-icon {
  font-size: 14px;
}

/* Stil for collapsed drawer*/
@media (max-width: 960px) {
  .v-navigation-drawer .v-list-item-content {
    display: none;
  }
}
</style>