<template >
        <!--Inspeção-->
        <v-row>
            <v-col cols="5"
            class="pa-2 "
            
            >
                <div
                style="position: relative; border: 1px solid black; height: 400px"
                class=" rounded  mx-auto mt-4 elevation-4 px-2"
                ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-caption">Escopo</p>
                <div class="d-flex text-caption w-100">
                    
                    <div class="my-2 w-100">
                            <v-icon icon="mdi-magnify"></v-icon>
                            <input type="search" v-model="procurar" class="border mt-2 px-2 py-1 rounded text-caption w-50" placeholder="procurar...">
                    </div>
                    
                </div>  
                    <v-data-table-virtual
                    :items="elements"
                    :headers="headers"
                    :search="procurar"
                    height="300"
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
                            <div  style="font-size: 10px">
                                    {{ value }}
                            </div>
                    </template>

                    <template v-slot:item.status="{ value }">
                            <v-chip
                            size="x-small"
                            :color="value == 'Concluído'?'light-green-lighten-1':'grey'"
                            variant="flat"
                            >
                            {{ value }}
                            </v-chip>
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
                    ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-caption">Relatar Local Selecionado</p>
                        
               

                       
                        <v-row class="" >
                            <v-col cols="6">
                            
                                <p  class=" mt-6 mb-2 ml-2 font-weight-black " style="font-size: 10px;">Local</p>
                                <input type="text"  style="font-size: 10px;" class="w-100 border py-1 px-2 rounded " readonly :value="ProgramacaoLocal"> 
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="3" v-if="ProgramacaoLocal!=='Aguardando Seleção...'">
                                <p  class=" mt-6 mb-2 ml-2 font-weight-black" style="font-size: 10px;" >Situação</p>
                                <v-select
                                v-model="Situacao"
                                :items="['Com anomalia', 'Perfeitas Condições', 'Indisponivel']"
                                density="compact"
                                variant="outlined"
                                size="x-small"
                                >
                                <template v-slot:selection="{ item}">
                                    <span style="font-size: 9px;" class="font-weight-black ">{{ item.title }}</span>
                                </template>
                            
                                </v-select>
                            </v-col>
                            <v-col cols="3" v-if="Situacao == 'Indisponivel'">
                                <p  class=" mt-6 mb-2 ml-2 font-weight-black" style="font-size: 10px;">Motivo Indisponibilidade</p>
                                <v-select
                                :items="['Inacessivel', 'Danificado', 'Negligencia']"
                                density="compact"
                                variant="outlined"
                                >
                                <template v-slot:selection="{ item}">
                                    <span style="font-size: 9px;" class="font-weight-black ">{{ item.title }}</span>
                                </template>
                            
                                </v-select>
                                
                            </v-col>
                        </v-row>



                        <!--CAMPO RESULTADO-->
                        <div class=" mb-4" style="height: 220px" v-if="Situacao">
                     
                                
                          
                        </div>

                        <div class="text-end" v-if="Situacao">
                            <v-btn variant="flat" color="grey" @click="abrirModal('perfeitas condicoes')" v-if="Situacao == 'Perfeitas Condições'">Inserir Foto</v-btn>
                            <v-btn variant="flat" color="grey" v-if="Situacao == 'Com anomalia'" @click="abrirModal('anomalia')" >Registrar Anomalia</v-btn>
                            <v-btn variant="flat"  color="indigo-darken-4" class="ml-2">Salvar</v-btn>
                        </div>
                   
                    </div>
                </v-col>
            </v-row>
</template>


<script setup>
import { ref, watch } from 'vue';

const dialog = ref (false)
const procurar = ref('');
const ProgramacaoLocal = ref('Aguardando Seleção...')
const selectedPosicoesJson  = ref(null)
const Situacao = ref('')
const imageUrl = ref(null)
const opcao = ref('')
const headers= [
        {title: 'Locais', align: 'start', key: 'title',   },
        { title: 'status', key: 'status', width: "30%", align: 'center',},
 ]


const elements = [
    {title: 'Espaço reservado para os Locais s2i-PO00001', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00002', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00003', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00004', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00005', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00006', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00007', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00008', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00009', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00010', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00011', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00012', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00013', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00014', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00015', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00016', status: 'pendente'},
    {title: 'Espaço reservado para os Locais s2i-PO00017', status: 'pendente'},
    {title: 'Espaço reservado para os Locais s2i-PO00018', status: 'pendente'},
    {title: 'Espaço reservado para os Locais s2i-PO00019', status: 'pendente'},
    {title: 'Espaço reservado para os Locais s2i-PO00020', status: 'pendente'},
    {title: 'Espaço reservado para os Locais s2i-PO00021', status: 'pendente'},
    {title: 'Espaço reservado para os Locais s2i-PO00022', status: 'pendente'},
    {title: 'Espaço reservado para os Locais s2i-PO00023', status: 'pendente'},
    {title: 'Espaço reservado para os Locais s2i-PO00024', status: 'pendente'},
    {title: 'Espaço reservado para os Locais s2i-PO00025', status: 'pendente'},
    {title: 'Espaço reservado para os Locais s2i-PO00026', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00027', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00028', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00029', status: 'Concluído'},
    {title: 'Espaço reservado para os Locais s2i-PO00030', status: 'Concluído'}
];




watch(selectedPosicoesJson, (newValue) => {
    Situacao.value = '';
    ProgramacaoLocal.value = 'Aguardando Seleção...';
    imageUrl.value = null;
  if (newValue.length>0) {
    ProgramacaoLocal.value = newValue[0].title
    return
  }
})

const abrirModal = (op) => {
      opcao.value = op;
    dialog.value = true;
}




</script>


