<template >
    <div >
      <v-container>
        <v-main>
          <programacaoSistema />
        </v-main>
      </v-container>
        
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

definePageMeta({
  layout: 'dms',
});

const TitlePages = useTitlePagesStore()

onMounted(() => {
  TitlePages.setPageTitle('S2i - Sistema Integrado de Inspeção');
});
</script>