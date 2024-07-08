<template >
    <div >
      <v-container>
        <v-main>
          <inspecao />
        </v-main>
      </v-container>
        
    </div>
  </template>
  
  
  <script setup>
  import { onMounted } from 'vue';
  
  const TitlePages = useTitlePagesStore()
  
  onMounted(() => {
    TitlePages.setPageTitle('S2i - Sistema Integrado de Inspeção');
    TitlePages.setDrawerState(true)
    //alert(Inspecao.name)
  });
  </script>