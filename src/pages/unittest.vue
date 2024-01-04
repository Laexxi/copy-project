<template>
    <div>
        <h2>Verfügbare Sprachen:</h2>
        <ul>
            <li v-for="language in languages" :key="language">{{ language }}</li>
        </ul>
    </div>
</template>
  
<script setup>
import useLanguages from "../hooks/useLanguages";

const { languages } = useLanguages();
</script>
  