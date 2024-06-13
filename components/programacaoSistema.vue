<template >

<div class="px-8 pt-16">


       
                <div class="pt-10">
                                <div class="d-flex justify-space-between mb-6">
                                        <div class="w-25">
                                                <v-text-field
                                                :loading="loading"
                                                append-inner-icon="mdi-magnify"
                                                density="compact"
                                                label="Pesquisar"
                                                variant="solo"
                                                hide-details
                                                single-line
                                                size="x-small"
                                                @click:append-inner="onClick"
                                                ></v-text-field>

                                        </div>

                                        <div >
                                                <v-btn
                                                class="mr-4"
                                                color="indigo-darken-4"
                                                @click="addCard"
                                                >Novo</v-btn>
                                                <v-btn
                                                color="indigo-darken-4"
                                                >Salvar</v-btn>
                                        </div> 
                                </div>

                                <!--Outra secção-->
                                <div
                                style="position: relative; border: 1px solid #BDBDBD; "
                                class=" rounded  mx-auto mt-4  pa-6 h-100"
                                ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-body-2">Inspeção Planejadas</p>
                                       
                                
                                <!--SECÇÃO PLANEJAMENTO-->
                                        <div style="height: 370px; overflow-y: auto">
                                                <div class="d-flex  font-weight-bold mb-2" style="font-size: 10px;">
                                                        <p style="width: 10%;" class="ml-2">Modalidade</p>
                                                        <p style="width: 5%;" class="ml-2">Ordem</p>
                                                        <p style="width: 17%;" class="ml-2">Descrição da Inspeção</p>
                                                        <p style="width: 9%;" class="ml-2">Data inicio</p>
                                                        <p style="width: 9%;" class="ml-2">Data fim</p>
                                                        <p style="width: 10%;" class="ml-2">Analista</p>
                                                        <p style="width: 10%;" class="ml-2">Inspetor</p>
                                                        <p style="width: 7%;" class="ml-2">Escopo</p>
                                                        <p style="width: 7%;">Recurso</p>
                                                        <p>status</p>
                                                </div>








                                                 <!--SECÃO DE CARD-->

                                      
                                                <div class="d-flex px-1 mb-2 elevation-2 rounded border pt-2" 
                                                 v-for="(card, i ) in cards"
                                                 :key="i"
                                                >

                                                    
                                                        <div style="width: 10%; height: 50px;"  >
                                                                <v-select
                                                                variant="outlined"
                                                                density="compact"
                                                                :items="['Mecânico', 'Elétrico']"
                                                             
                                                                flat
                                                             
                                                                >
                                                                        <template v-slot:selection="{ item }">
                                                                                <v-chip 
                                                                                variant="text"   
                                                                                density="comfortable" size="x-small"                                                                  
                                                                                >
                                                                                        {{ item.title }}
                                                                                </v-chip>
                                                                        </template> 
                                                                </v-select>
                                                        </div>


                                                        <div style="width: 4%;" class="mx-2">
                                                                <input type="text" class="border border-sm w-100 text-caption px-2 pt-3 pb-2 rounded" :value="card.Ordem">
                                                        </div>

                                                        
                                                        <div style="width: 20%;" class="">
                                                                <input type="text" class="border border-sm w-100 text-caption px-2 pt-3 pb-2 rounded" :value="card.Desc_Insp">
                                                        </div>

                                                        <div style="width: 9%;" class="mx-2">
                                                                <input type="date" class="border border-sm w-100 text-caption px-2 pt-3 pb-2 rounded">
                                                        </div>

                                                        <div style="width: 9%;" class="">
                                                                <input type="date" class="border border-sm w-100 text-caption px-2 pt-3 pb-2 rounded">
                                                        </div>
                                                        <div style="width: 9%;" class="mx-2">
                                                                <input type="text" class="border border-sm w-100 text-caption px-2 pt-3 pb-2 rounded">
                                                        </div>
                                                        <div style="width: 9%;" class="">
                                                                <input type="text" class="border border-sm w-100 text-caption px-2 pt-3 pb-2 rounded">
                                                        </div>
                                                        <div  class="mt-2 mx-2">
                                                                <v-btn size="x-small" class="text-caption" variant="tonal" @click="abrirModal('escopo')">--selecione</v-btn>
                                                        </div>
                                                        <div  class="mt-2 ">
                                                                <v-btn size="x-small" class="text-caption" variant="tonal" @click="abrirModal('recurso')">--selecione</v-btn>
                                                        </div>
                                                        <div style="width: 6%;" class="mx-2">
                                                                <input type="text" class="border border-sm w-100 text-caption px-1 pt-2 pb-3 rounded text-red text-center" value="Pendente">
                                                        </div>
                                                        <div>
                                                                <v-icon icon="mdi-magnify" class="text-body-2 mt-3" @click="true"></v-icon>
                                                                <nuxt-link to="/inspecao"><v-icon icon="mdi-text-box-check" class="text-body-2 mt-3 mx-1" ></v-icon></nuxt-link>
                                                                <v-icon icon="mdi-trash-can" class="text-body-2 mt-3 " @click="true"></v-icon>
                                                        </div>
                                   
                                             
                                        </div>
                                        </div>


























                                        <!--MODAL-->
                                        <v-dialog
                                        v-model="dialog"
                                        width="auto"
                                        persistent
                                        >
                                                <!--CARD ESCOPO-->
                                                <v-card width="800" v-if="opcao=='escopo'">
                                                        <v-card-title class="bg-indigo-darken-4">
                                                                Escopo
                                                        </v-card-title>
                                                        <div style="overflow-y: auto;">
                                                                <v-card-item>
                                                                        <div
                                                                        style="position: relative; border: 1px solid black;   height: 220px;"
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
                                                                        height="150"
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
                                                                </v-card-item>
                                                                <div class="d-flex justify-center align-center">
                                                                        <v-icon icon="mdi-swap-vertical-bold" size="30"></v-icon>
                                                                </div>
                                                                <v-card-item>
                                                        
                                                                        <div
                                                                        style="position: relative; border: 1px solid black;   max-height: 220px;"
                                                                        class=" rounded  mx-4 mt-2 elevation-4 px-2 "
                                                                        ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-body-2">Locais Selecionados</p>
                                                                                <div class="w-100 d-flex justify-space-between align-center">
                                                                                <div class="my-2 w-50">
                                                                                        <v-icon icon="mdi-magnify"></v-icon>
                                                                                        <input type="search" v-model="procurarProgramacao" class="border mt-2 px-2 py-1 rounded text-caption w-75" placeholder="procurar...">
                                                                                </div>
                                                                                <div class="d-flex justify-center align-center">
                                                                                        <v-icon icon="mdi-broom" @click="selectedProgramacao = []"></v-icon>
                                                                                        <p class="text-caption ml-2">Qtd.Posições: {{ selectedProgramacao.length }}</p>
                                                                                </div>

                                                                        </div>
                                                                


                                                                                <v-data-table-virtual
                                                                                :items="selectedProgramacao"
                                                                                :headers="headersProgramacao"
                                                                                height="150"
                                                                        
                                                                                :search="procurarProgramacao"
                                                                                hover
                                                                                fixed-header
                                                                                density="compact"
                                                                                class="text-caption"
                                                                                no-data-text="Aguardando seleção!"
                                                                                loading-text="Carregando os Dados!"
                                                                        
                                                                                
                                                                                >  
                                                                                        <template v-slot:item.actions="{ value }">
                                                                                                <v-icon icon="mdi-trash-can" @click="dialog = true" ></v-icon>
                                                                                        </template>
                                                                                        
                                                                                </v-data-table-virtual> 
                                                                        </div>
                                                                </v-card-item>

                                                                <v-card-item>
                                                                        <hr>
                                                                        <v-card-actions>
                                                                                <v-spacer></v-spacer>
                                                                                <v-btn color="error" variant="flat" @click="dialog = false">Cancelar</v-btn>
                                                                                <v-btn variant="flat" color="indigo-darken-4">Salvar</v-btn>
                                                                        </v-card-actions>
                                                                </v-card-item>
                                                        </div>
                                                </v-card>


                                                <!--CARD RECURSO-->
                                                <v-card
                                                v-if="opcao!='escopo'"
                                                width="700"
                                               
                                                >
                                                <v-card-title class="bg-indigo-darken-4">
                                                                Recurso
                                                </v-card-title>
                                                <v-card-item>
                                                        <v-textarea label="Descreva aqui..." 
                                                        variant="outlined"
                                                        flat
                                                        counter="1000"
                                                        rows="14"
                                                        single-line
                                                        ></v-textarea>
                                                </v-card-item>

                                                <v-card-item>
                                                        <hr>
                                                        <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="error" variant="flat" @click="dialog = false">Cancelar</v-btn>
                                                                <v-btn variant="flat" color="indigo-darken-4">Salvar</v-btn>
                                                        </v-card-actions>
                                                </v-card-item>
                                                </v-card>
                                        </v-dialog>
                                </div>



                </div>
        </div>
</template>


<script setup>
import { ref } from 'vue';

const teste = ref(false)
const dialog = ref (false)
const loading = ref(false);
const onClick = () =>{
        loading.value = true

        setTimeout(() => {
        loading.value = false
        }, 2000)
}

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



const cards = ref([
{
        Modalidade: '',
        Ordem: '',
        Desc_Insp: '',
        Data_inicio: '',
        Data_fim: '',
        Analista: '',
        Inspetor: ''
},

])



const addCard = () => {
  cards.value.push({
    Modalidade: '',
    Ordem: '',
    Desc_Insp: '',
    Data_inicio: '',
    Data_fim: '',
    Analista: '',
    Inspetor: ''
  })}


const opcao = ref('')
const index = ref(null)
const nomeForm = ref ('')
const situacaoForm = ref (null)


const abrirModal = (op) => {
    //nomeForm.value = ''
    //situacaoForm.value = null
    opcao.value = op;
    //index.value = i
    dialog.value = true;
    
}



</script>



<style>
input:focus {
box-shadow: 0 0 0 0;
outline: 0;
}

        
</style>