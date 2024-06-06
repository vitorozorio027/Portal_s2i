<template>
    <div>
        <v-row>
            <v-col cols="10"
            class=" pa-2"
            >
            <div
            style="position: relative; border: 1px solid black; "
            class=" rounded  mx-auto mt-4 elevation-4 px-2 h-100"
            ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-caption">Escopo/Avanço</p>
            

            </div>
    
            </v-col>
            <v-spacer></v-spacer>

            <v-col cols="2"
            class="pa-2"
            >
            <div
            style="position: relative; border: 1px solid black;"
            class=" rounded  mx-auto mt-4 elevation-4 px-2 h-100"
            ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-caption">Escopo/Avanço</p>
            
    
            <div class="text-caption d-flex flex-column justify-center  h-100 py-2">
                    <p>Locais Planejados = <span>232</span></p>
                    <p>Locais Relatados = <span>97 (42%)</span></p>
            </div>
            </div>
                
            
        


            </v-col>
        </v-row>


        <!--Inspeção-->
        <v-row>
            <v-col cols="5"
            class="pa-2 "
            
            >
                <div
                style="position: relative; border: 1px solid black; height: 400px"
                class=" rounded  mx-auto mt-4 elevation-4 px-2"
                ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-caption">Escopo/Avanço</p>
                <div class="d-flex text-caption align-center justify-center">
                    
                    <div style="width: 60%;">
                        <v-text-field
                        prepend-inner-icon="mdi-magnify"
                        single-line
                        flat                       
                        variant="outlined"
                        rounded-lg
                        placeholder="Pesquisar..."
                        density="compact"
                        class="mx-4 mt-12"
                        v-model="procurar"
                        ></v-text-field>    
                    </div>
                    <v-select
                    v-model="procurar"
                    :items="['Aguardando', 'Com anomalia', 'Sem anomalia', 'Indisponivel']"
                    density="compact"
                    variant="outlined"
                    class=" mt-12"
                    single-line
                    label="selecione"
                    return-object
                    >
                    <template v-slot:selection="{ item}">
                        <span class="text-caption">{{ item.title }}</span>
                    </template>
                
                    </v-select>
                </div>  
                    <v-data-table-virtual
                    :items="elements"
                    :headers="headers"
                    :search="procurar"
                    height="250"
                    show-select
                    hover
                    fixed-header
                    density="compact"
                    class=""
                    no-data-text="Sem dados Correspondentes!"
                    loading-text="Carregando os Dados!"
                    return-object
                    v-model="selectedPosicoesJson"
                    select-strategy="single"
                    >  
                    <template v-slot:item.title="{ value }">
                            <div class="py-1 px-2 rounded border " style="font-size: 10px">
                                    {{ value }}
                            </div>
                    </template>

                    <template v-slot:item.status="{ value }">
                            <div class="py-1 px-2 rounded border text-center" style="font-size: 10px">
                                    {{ value }}
                            </div>
                    </template>
                            
                    </v-data-table-virtual> 
                </div>
            </v-col>





            <v-spacer></v-spacer>

            <v-col cols="7"
            class="pa-2"
            >
            
            <div
            style="position: relative; border: 1px solid black; height: 400px"
            class=" rounded  mx-auto mt-4 elevation-4 px-2"
            ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-caption">Escopo/Avanço</p>
            <v-row>
                <v-col cols="5">
                  
                    <p  class=" mt-6 ml-2 text-caption">Local</p>
                    <v-text-field
                        single-line
                        flat                       
                        variant="outlined"
                        rounded-lg
                        density="compact"
                        readonly
                       
                       
                        > </v-text-field>  
                </v-col>
                <v-col cols="4">
                    <p  class=" mt-6 ml-2 text-caption">Situação</p>
                    <v-select
                    v-model="Situacao"
                    :items="['Com anomalia', 'Perfeitas Condições', 'Indisponivel']"
                    single-line
                    label="selecione"
                    density="compact"
                    variant="outlined"
                    
                    >
                    <template v-slot:selection="{ item}">
                        <span class="text-caption">{{ item.title }}</span>
                    </template>
                
                    </v-select>
                </v-col>
                <v-col cols="3" v-if="Situacao == 'Indisponivel'">
                    <p  class=" mt-6 ml-2 text-caption">Situação</p>
                    <v-select
                 
                    :items="['Inacessivel', 'Danificado', 'Negligencia']"
                    single-line
                    label="selecione"
                    density="compact"
                    variant="outlined"

                   
                    >
                    <template v-slot:selection="{ item}">
                        <span class="text-caption">{{ item.title }}</span>
                    </template>
                
                    </v-select>
                    
                </v-col>
            </v-row>

            </div>
            </v-col>
        </v-row>






    </div>
</template>


<style>
        input:focus {
        box-shadow: 0 0 0 0;
        outline: 0;
        }

</style>




<script setup>
import { ref, computed } from 'vue';

const select = ref('')

const procurar = ref('');
const selectedPosicoesJson = ref([{"title": "Espaço reservado para os Locais s2i-PO00011", "status": "Aguardando"}]);

//const selectedPosicoes = ref(JSON.parse(selectedPosicoesJson.value));
const Situacao = ref('')
const headers= [
        {
          title: 'Locais',
          align: 'start',
          key: 'title', 
             
        },
        { title: 'status', key: 'status', width: "30%"},
 ]

const headersProgramacao= [
        {
          title: '',
          align: 'center',
          key: 'title',      
        },
        { title: '', key: 'actions', align: 'center'},
]

const elements = [
    {title: 'Espaço reservado para os Locais s2i-PO00001', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00002', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00003', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00004', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00005', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00006', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00007', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00008', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00009', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00010', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00011', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00012', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00013', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00014', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00015', status: 'Aguardando'},
    {title: 'Espaço reservado para os Locais s2i-PO00016', status: 'Sem anomalia'},
    {title: 'Espaço reservado para os Locais s2i-PO00017', status: 'Sem anomalia'},
    {title: 'Espaço reservado para os Locais s2i-PO00018', status: 'Sem anomalia'},
    {title: 'Espaço reservado para os Locais s2i-PO00019', status: 'Sem anomalia'},
    {title: 'Espaço reservado para os Locais s2i-PO00020', status: 'Sem anomalia'},
    {title: 'Espaço reservado para os Locais s2i-PO00021', status: 'Sem anomalia'},
    {title: 'Espaço reservado para os Locais s2i-PO00022', status: 'Sem anomalia'},
    {title: 'Espaço reservado para os Locais s2i-PO00023', status: 'Sem anomalia'},
    {title: 'Espaço reservado para os Locais s2i-PO00024', status: 'Sem anomalia'},
    {title: 'Espaço reservado para os Locais s2i-PO00025', status: 'Sem anomalia'},
    {title: 'Espaço reservado para os Locais s2i-PO00026', status: 'Indisponivel'},
    {title: 'Espaço reservado para os Locais s2i-PO00027', status: 'Indisponivel'},
    {title: 'Espaço reservado para os Locais s2i-PO00028', status: 'Indisponivel'},
    {title: 'Espaço reservado para os Locais s2i-PO00029', status: 'Indisponivel'},
    {title: 'Espaço reservado para os Locais s2i-PO00030', status: 'Indisponivel'}
];


</script>