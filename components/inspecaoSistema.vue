<template>
    <div>
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
                            <input type="text" style="font-size: 10px;" class="w-100 pa-2 border mt-1 rounded">
                        </div>

                    </v-col>
                    <v-col cols="1">
                        <div >
                            <p style="font-size: 10px;" class="ml-2">Ordem</p>
                            <input type="text"  style="font-size: 10px;" class="w-100 pa-2 border mt-1 rounded">
                        </div>

                    </v-col>
                    <v-col cols="3">
                        <div>
                            <p style="font-size: 10px;" class="ml-2">Descrição da Inspeção</p>
                            <input type="text"  style="font-size: 10px;" class="w-100 pa-2 border mt-1 rounded">
                        </div>

                    </v-col>
                    <v-col cols="2">
                        <div>
                            <p style="font-size: 10px;" class="ml-2">Data Inicio</p>
                            <input type="date"  style="font-size: 10px;" class="w-100 pa-2 border mt-1 rounded">
                        </div>

                    </v-col>
                    <v-col cols="2">
                        <div>
                            <p style="font-size: 10px;" class="ml-2">Data Fim</p>
                            <input type="date"  style="font-size: 10px;" class="w-100 pa-2 border mt-1 rounded">
                        </div>

                    </v-col>
                    <v-col cols="2">
                        <div>
                            <p style="font-size: 10px;" class="text-center">status</p>
                            <input type="text" style="font-size: 10px;" class="w-100 pa-2 border mt-1 rounded">
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
                    ><p style="position: absolute;  top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-caption">Relatar Local Selecionado</p>
                        
               

                       
                        <v-row class="" >
                            <v-col cols="6" v-if="selectedPosicoesJson[0].title">
                            
                                <p  class=" mt-6 mb-2 ml-2 font-weight-black " style="font-size: 10px;">Local</p>
                                
                                <input type="text" :value="selectedPosicoesJson[0].title" style="font-size: 10px" class="w-100 border pa-3 rounded font-weight-black" readonly> 
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="3" v-if="selectedPosicoesJson[0].title">
                                <p  class=" mt-6 mb-2 ml-2 font-weight-black" style="font-size: 10px;">Situação</p>
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
                        <div class="bg-indigo-darken-4 mb-4" style="height: 220px" v-if="selectedPosicoesJson[0].title">

                        </div>

                        <div class="text-end" v-if="selectedPosicoesJson[0].title">
                            <v-btn variant="flat" color="grey">Inserir Foto</v-btn>
                            <v-btn variant="flat" color="grey" class="mx-2">Registrar Anomalia</v-btn>
                            <v-btn variant="flat"  color="indigo-darken-4" >Salvar</v-btn>
                        </div>
                   
                    </div>
                </v-col>
            </v-row>



        <!--Modal-->
        <v-dialog>

        </v-dialog>






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


const procurar = ref('');
const selectedPosicoesJson = ref([{"title": "", "status": ""}]);

const Situacao = ref('')
const headers= [
        {
          title: 'Locais',
          align: 'start',
          key: 'title', 
             
        },
        { title: 'status', key: 'status', width: "30%", align: 'center',},
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