<template>
       <v-row>
            <v-col cols="10"
            class=" pa-2"
            >
            <div
            style="position: relative; border: 1px solid black; "
            class=" rounded  mx-auto mt-4 px-4 h-100 pt-4"
            ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-caption">Relatar Inspeção Selecionada</p>
                <v-row>
                    <v-col cols="2">
                        <div>
                            <p style="font-size: 10px;" class="ml-2">Modalidade</p>
                            <input type="text" style="font-size: 10px;" class="w-100 pX-2 border mt-1 rounded">
                        </div>

                    </v-col>
                    <v-col cols="1">
                        <div >
                            <p style="font-size: 10px;" class="ml-2">Ordem</p>
                            <input type="text"  style="font-size: 10px;" class="w-100 px-2 border mt-1 rounded">
                        </div>

                    </v-col>
                    <v-col cols="3">
                        <div>
                            <p style="font-size: 10px;" class="ml-2">Descrição da Inspeção</p>
                            <input type="text"  style="font-size: 10px;" class="w-100 px-2 border mt-1 rounded">
                        </div>

                    </v-col>
                    <v-col cols="2">
                        <div>
                            <p style="font-size: 10px;" class="ml-2">Data Inicio</p>
                            <input type="date"  style="font-size: 10px;" class="w-100 px-2 border mt-1 rounded">
                        </div>

                    </v-col>
                    <v-col cols="2">
                        <div>
                            <p style="font-size: 10px;" class="ml-2">Data Fim</p>
                            <input type="date"  style="font-size: 10px;" class="w-100 px-2 border mt-1 rounded">
                        </div>

                    </v-col>
                    <v-col cols="2">
                        <div>
                            <p style="font-size: 10px;" class="text-center">status</p>
                            <input type="text" style="font-size: 10px;" class="w-100 px-2 border mt-1 rounded">
                        </div>

                    </v-col>
                </v-row>

            </div>
    
            </v-col>
            <v-spacer></v-spacer>

            <v-col cols="2"
            class="pa-2"
            >
            <div
            style="position: relative; border: 1px solid black;"
            class=" rounded  mx-auto mt-4  px-2 h-100"
            ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-caption">Escopo/Avanço</p>
            
    
            <div class="text-caption d-flex flex-column justify-center  h-100 py-2">
                    <p>Locais Planejados = <span>0</span></p>
                    <p>Locais Relatados = <span>0 (0%)</span></p>
            </div>
            </div>
            </v-col>
        </v-row>

</template>


<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
const id = route.params.id;
const card = ref(null);

onMounted(() => {
  const storedCards = localStorage.getItem('cards');
  if (storedCards) {
    const cards = JSON.parse(storedCards);
    card.value = cards[id];
  }
});
</script>