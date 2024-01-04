<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ $t('about.title') }}</h1>
        <p class="text-justify">
          {{ $t('about.license') }}
        </p>

        <v-divider class="my-4"></v-divider>

        <p class="text-justify">
          {{ $t('about.textbody') }}
        </p>

        <v-btn color="orange" href="https://ko-fi.com/laexxi" target="_blank" class="mt-2">
          <v-icon left>mdi-coffee</v-icon>
          {{ $t('about.kofi') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>

</script>
  
<style scoped>
.text-justify {
  text-align: justify;
}

.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
  