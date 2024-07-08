<template>
    <v-container>
      <p>Contagem persistida: {{ counter }}</p>
    </v-container>
  </template>
  
  <script setup>
const counterStore = useCounterStore();
const { counter } = storeToRefs(counterStore);
  </script>
  