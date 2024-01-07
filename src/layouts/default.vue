<template>
  <v-app>
    <v-layout>
      <NavigationDrawer v-model="drawer" />
      <v-main style="height: 250px">
        <NuxtPage></NuxtPage>
      </v-main>

    </v-layout>
  </v-app>
</template>
    
<script setup>
import NavigationDrawer from '~/components/NavigationDrawer.vue';

const drawer = ref(true);

</script>
    
<style></style>
