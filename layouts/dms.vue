<template>
    <v-app >
      <v-app-bar color="#1A237E"  >
       <v-app-bar-title >  
            <v-list class="d-flex bg-transparent">
                <v-list-item><v-btn icon="mdi-menu" variant="text" @click="drawer = !drawer"></v-btn></v-list-item>
                <v-list-item class="text-h6 font-weight-black ">{{ pageTitle }}</v-list-item>
            </v-list> 
          
       </v-app-bar-title>

      </v-app-bar>
      
    <v-navigation-drawer       
      :width="drawer?'300':'70'"
      class="pt-2 pb-2 px-2"
      v-model="drawer"
      temporary
    >
       
      <v-list>
        <v-list-item class="mb-4" prepend-icon="mdi-home-account">
         <v-btn variant="text" text="Home" class="text-caption font-weight-regular"></v-btn>
        
        </v-list-item>

        <div>

        
        <div class="d-flex  align-center pl-4 mb-2"  >
          <div class="w-auto mr-4 font-weight-black " style="font-size: 12px;" v-if="drawer">Sistema</div>
          <div class="w-75" ><hr></div>
        </div>

        <v-list-item
        prepend-icon="mdi-account-multiple-plus"
        class="text-caption"
        
        >
        <v-btn variant="plain" text="Usuarios" class="text-caption font-weight-regular" to="/usuarios"></v-btn>
      </v-list-item>

        <v-list-item
        prepend-icon="mdi-lan"
        class="text-caption"
        
        >
        <v-btn variant="plain" text="Cadstro de Sistema" class="text-caption font-weight-regular" to="/sistemas"></v-btn>
      </v-list-item>
      
        


      
    
    </div>

<!--PLANEJAMENTO-->

<div>



      <div class="d-flex  align-center pl-4 my-4"  >
          <div class="w-auto mr-4 font-weight-black " style="font-size: 12px;" >Check-list de Inspeção</div>
          <div class="w-75" ><hr></div>
        </div>

        <v-list-item
          v-for="[icon, text, too] in links"
          :key="icon"
          :prepend-icon="icon"
          link
          class="text-caption"
          
        >
        <v-btn variant="plain" :text="text" class="text-caption font-weight-regular" :to="too"></v-btn>
      </v-list-item>
     
    </div>
    

    <!--Check-List-->
    <div>


      <div class="d-flex  align-center pl-4 mb-2 mt-4"  >
          <div class="w-auto mr-4 font-weight-black " style="font-size: 12px;" >Relatório</div>
          <div class="w-75" ><hr></div>
        </div>

        <v-list-item
          prepend-icon="mdi-database-settings"
          link
          class="text-caption"
          
        >
        <v-list-title><v-btn variant="plain"  class="text-caption font-weight-regular" >Inspeção</v-btn></v-list-title>
      </v-list-item>

      <v-list-item
          prepend-icon="mdi-list-status"
          link
          class="text-caption"
          
        >
        <v-list-title><v-btn variant="plain"  class="text-caption font-weight-regular">Acompanhamento</v-btn></v-list-title>
      </v-list-item>
    </div>

      </v-list>
      </v-navigation-drawer>
      
      <slot />

    </v-app>
   
</template>



<script setup>
import { ref } from 'vue'

const TitlePages = useTitlePagesStore()
const pageTitle = ref(TitlePages.pageTitle);

watch(() => TitlePages.pageTitle, (newTitle) => {
  pageTitle.value = newTitle;
});


const drawer = ref(false)

const links = [
  ['mdi-book-edit', 'Programação Rota', '/programacao']
]

const relatorio=  ['Sensitiva', 'Análise de Vibração']
const relatorio2=  ['Sensitiva', 'Análise de Vibração']

</script>



  