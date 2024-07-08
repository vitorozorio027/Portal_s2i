<template>
  <div>
    <button @click="increment">Increment</button>
    <p>Count: {{ count }}</p>
  </div>
</template>

<script setup>
const counterStore = useCounterStore();
const count = computed(() => counterStore.count);
const increment = counterStore.increment;
</script>
