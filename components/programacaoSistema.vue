<template >
 
        <v-card flat>
                <v-card-item>
                        <v-row dense>
                                <v-col cols="4">
                                        <v-text-field
                                        prepend-inner-icon="mdi-magnify"
                                        single-line
                                        flat                       
                                        variant="outlined"
                                        rounded-lg
                                        placeholder="Pesquisar..."
                                        density="compact"
                                        ></v-text-field>  
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="4">
                                        <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                color="indigo-darken-4"
                                                variant="flat"
                                                text="Novo"
                                                append-icon="mdi-plus"
                                                ></v-btn>
                                                <v-btn
                                                color="indigo-darken-4"
                                                variant="flat"
                                                text="Salvar"
                                                append-icon="mdi-check-circle"
                                                ></v-btn>
                                        </v-card-actions>
                                </v-col>
                        </v-row>
                </v-card-item>


                <v-card-item
                style="position: relative; border: 1px solid black;   "
                        class=" rounded  mx-4 mt-4 elevation-4 px-2 "
                ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-body-1">Inspeções Planejadas</p>
                        <div class="h-100">
                                <v-row dense class="mx-2 pt-2">
                                        <v-col cols="2">
                                        <h1 class=" mx-2" style="font-size: 10px">Modalidade</h1>
                                            <v-select
                                                :items="['Elétrico','Mecânico']"
                                                density="compact"
                                                variant="outlined"
                                                flat
                                                class="text-caption"
                                                chips    
                                            ></v-select>
                                        </v-col>

                                        <v-col cols="1">
                                        <h1 class=" mx-2 " style="font-size: 10px">Ordem</h1>
                                        <v-text-field
                                        density="compact"
                                        type="text"
                                        variant="outlined"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="2">
                                        <h1 class="mx-2 " style="font-size: 10px">Descrição da inspeção</h1>
                                        <v-text-field
                                        density="compact"
                                        type="text"
                                        variant="outlined"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="2">
                                        <h1 class=" mx-2 " style="font-size: 10px">Data Inicio</h1>
                                        <v-text-field
                                        density="compact"
                                        type="date"
                                        variant="outlined"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="2">
                                        <h1 class=" mx-2 " style="font-size: 10px">Data Fim</h1>
                                        <v-text-field
                                        density="compact"
                                        type="date"
                                        variant="outlined"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="1">
                                        <h1 class=" mx-2 " style="font-size: 10px">Escopo</h1>
                                        <v-text-field
                                        density="compact"
                                        type="text"
                                        variant="outlined"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="1">
                                        <h1 class=" mx-2 " style="font-size: 10px">Status</h1>
                                        <v-text-field
                                        density="compact"
                                        type="text"
                                        variant="outlined"
                                        ></v-text-field>
                                        </v-col>
                                        <v-col class="d-flex mt-7">
                                                <v-icon icon="mdi-magnify" style="font-size: 16px"></v-icon>
                                                <v-icon icon="mdi-square-edit-outline" style="font-size: 16px"></v-icon>
                                                <v-icon icon="mdi-check-all" style="font-size: 16px"></v-icon>
                                                <v-icon icon="mdi-text-box-check" style="font-size: 16px"></v-icon>
                                                <v-icon icon="mdi-trash-can" style="font-size: 16px"></v-icon>
                                        </v-col>

                                </v-row>








                                <v-row>
                                        <v-col >
                                                <div
                                                style="position: relative; border: 1px solid black;   height: 260px;"
                                                class=" rounded  mx-4 mt-4 elevation-4 px-4 pb-2 "
                                                ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-body-2">Locais Disponiveis</p>
                                                <div class="my-2 w-75">
                                                        <v-icon icon="mdi-magnify"></v-icon>
                                                        <input type="search" v-model="procurar" class="border mt-2 px-2 py-1 rounded text-caption w-75" placeholder="procurar...">
                                                </div>
                                                
                                                
                                               <v-data-table-virtual
                                                :items="elements"
                                                :headers="headers"
                                                :search="procurar"
                                                height="200"
                                                show-select
                                                hover
                                                fixed-header
                                                density="compact"
                                                class="text-caption "
                                                no-data-text="Sem dados Correspondentes!"
                                                loading-text="Carregando os Dados!"
                                                return-object
                                                v-model="selectedProgramacao"
                                                >  
                                                <template v-slot:header.title="{ column }" >
                                                        <p class="text-grey-lighten-1"> {{ column.title }} </p>
                                                </template>

                                            
                                                </v-data-table-virtual> 
                                                </div>
                                        </v-col>
                                        <v-col cols="1" class="d-flex justify-center align-center">
                                                <v-icon icon="mdi-swap-horizontal-bold" size="100"></v-icon>
                                        </v-col>
                                        <v-col >
                                                <div
                                                style="position: relative; border: 1px solid black;   height: 260px;"
                                                class=" rounded  mx-4 mt-4 elevation-4 px-2 "
                                                ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-body-2">Locais Selecionados</p>
                                               <div class="w-100 d-flex justify-space-between align-center">
                                                <div class="my-2 w-50">
                                                        <v-icon icon="mdi-magnify"></v-icon>
                                                        <input type="search" v-model="procurarProgramacao" class="border mt-2 px-2 py-1 rounded text-caption w-75" placeholder="procurar...">
                                                </div>
                                                <div>
                                                        <p class="text-caption ">Qtd.Posições: {{ selectedProgramacao.length }}</p>
                                                </div>

                                               </div>
                                              


                                                <v-data-table-virtual
                                                :items="selectedProgramacao"
                                                :headers="headersProgramacao"
                                                height="200"
                                             
                                                :search="procurarProgramacao"
                                                hover
                                                fixed-header
                                                density="compact"
                                                class="text-caption"
                                                no-data-text="Aguardando seleção!"
                                                loading-text="Carregando os Dados!"
                                            
                                                
                                                >  
                                                        <template v-slot:item.actions="{ value }">
                                                                <v-icon icon="mdi-trash-can" @click="dialog = true"></v-icon>
                                                        </template>
                                                        
                                                </v-data-table-virtual> 
                                                </div>
                                        </v-col>
                                </v-row>
                        </div>
                </v-card-item>












        </v-card>
    
</template>
<style>
        input:focus {
        box-shadow: 0 0 0 0;
        outline: 0;
        }
</style>

<script setup>
import { ref } from 'vue';

const selectedProgramacao = ref([])
const procurar = ref('');
const procurarProgramacao = ref('');
const headers= [
        {
          title: 'Selecionar Todos',
          align: 'start',
          key: 'title',      
        },
 ]

const headersProgramacao= [
        {
          title: '',
          align: 'start',
          key: 'title',      
        },
        { title: '', key: 'actions', align: 'center', sortable:false},
]


const elements = [
    {title: 'Espaço reservado para os Locais s2i-PO00001'},
    {title: 'Espaço reservado para os Locais s2i-PO00002'},
    {title: 'Espaço reservado para os Locais s2i-PO00003'},
    {title: 'Espaço reservado para os Locais s2i-PO00004'},
    {title: 'Espaço reservado para os Locais s2i-PO00005'},
    {title: 'Espaço reservado para os Locais s2i-PO00006'},
    {title: 'Espaço reservado para os Locais s2i-PO00007'},
    {title: 'Espaço reservado para os Locais s2i-PO00008'},
    {title: 'Espaço reservado para os Locais s2i-PO00009'},
    {title: 'Espaço reservado para os Locais s2i-PO00010'},
    {title: 'Espaço reservado para os Locais s2i-PO00011'},
    {title: 'Espaço reservado para os Locais s2i-PO00012'},
    {title: 'Espaço reservado para os Locais s2i-PO00013'},
    {title: 'Espaço reservado para os Locais s2i-PO00014'},
    {title: 'Espaço reservado para os Locais s2i-PO00015'},
    {title: 'Espaço reservado para os Locais s2i-PO00016'},
    {title: 'Espaço reservado para os Locais s2i-PO00017'},
    {title: 'Espaço reservado para os Locais s2i-PO00018'},
    {title: 'Espaço reservado para os Locais s2i-PO00019'},
    {title: 'Espaço reservado para os Locais s2i-PO00020'},
    {title: 'Espaço reservado para os Locais s2i-PO00021'},
    {title: 'Espaço reservado para os Locais s2i-PO00022'},
    {title: 'Espaço reservado para os Locais s2i-PO00023'},
    {title: 'Espaço reservado para os Locais s2i-PO00024'},
    {title: 'Espaço reservado para os Locais s2i-PO00025'},
    {title: 'Espaço reservado para os Locais s2i-PO00026'},
    {title: 'Espaço reservado para os Locais s2i-PO00027'},
    {title: 'Espaço reservado para os Locais s2i-PO00028'},
    {title: 'Espaço reservado para os Locais s2i-PO00029'},
    {title: 'Espaço reservado para os Locais s2i-PO00030'}
]



</script>