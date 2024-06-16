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
                       

                            <v-chip
                            size="x-small"
                            label
                            v-if="value == 'Aguardando'"
                            
                            >
                            {{ value }}
                            </v-chip>

                            <v-chip
                            size="x-small"
                            label
                            v-if="value == 'Sem anomalia'"
                            color="teal-darken-4"
                            variant="flat"
                            >
                            {{ value }}
                            </v-chip>

                            <v-chip
                            size="x-small"
                            label
                            v-if="value == 'Indisponivel'"
                            color="blue-grey-lighten-1"
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
                                
                                <input type="text"  style="font-size: 10px;" class="w-100 border pa-3 rounded " readonly :value="ProgramacaoLocal"> 
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
                            <v-btn variant="flat" color="grey" @click="dialog = true" v-if="Situacao == 'Perfeitas Condições'">Inserir Foto</v-btn>
                            <v-btn variant="flat" color="grey" v-if="Situacao == 'Com anomalia'">Registrar Anomalia</v-btn>
                            <v-btn variant="flat"  color="indigo-darken-4" class="ml-2">Salvar</v-btn>
                        </div>
                   
                    </div>
                </v-col>
            </v-row>



        <!--Modal-->
        <v-dialog
        v-model="dialog"
        width="auto"
        persistent
        >
            <v-card
                width="400"
                height="400"
            >
                <v-card-title
                class="bg-indigo-darken-4"
                >Registrar Evidência</v-card-title>

                <v-card-item >
                    <div class="border border-md mx-auto border-dashed d-flex justify-center align-center" style="height: 250px; width: 300px; position: relative;">
                        
                        <v-img
                        v-if="imageUrl"
                        :src="imageUrl"
                        height="300"
                        width="250"
                        contain
                        class="my-4"
                        ></v-img>
                        <v-icon icon="mdi-file-image-plus" class="text-h4" v-else></v-icon>
                        <input
                        type="file"
                        accept="image/*"
                        @change="onFileChange"
                        style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0;"
                        class="hover-foto"
                        />
                        
                       
                    </div>
                </v-card-item>

                <v-card-item >
                    <hr>
                    <div class="text-end mt-2">
                        <v-btn size="small" variant="text" color="red" @click="dialog = false">Cancelar</v-btn>
                        <v-btn size="small" class="ml-4" color="indigo-darken-4" variant="flat">Salvar</v-btn>
                    </div>
                </v-card-item>

            </v-card>

        </v-dialog>






    </div>
</template>


<script setup>
import { ref, watch } from 'vue';

const dialog = ref (false)
const procurar = ref('');
const ProgramacaoLocal = ref('Aguardando Seleção...')
const selectedPosicoesJson  = ref(null)
const Situacao = ref('')
const imageUrl = ref(null)

const headers= [
        {title: 'Locais', align: 'start', key: 'title',   },
        { title: 'status', key: 'status', width: "30%", align: 'center',},
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


const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}


watch(selectedPosicoesJson, (newValue) => {
    Situacao.value = '';
    ProgramacaoLocal.value = 'Aguardando Seleção...';
    imageUrl.value = null;
  if (newValue.length>0) {
    ProgramacaoLocal.value = newValue[0].title
    return
  }
})

</script>


<style>
        input:focus {
        box-shadow: 0 0 0 0;
        outline: 0;
        }

        .hover-foto:hover{
            cursor: pointer;
        }

</style>