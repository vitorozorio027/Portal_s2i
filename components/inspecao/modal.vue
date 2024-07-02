<template>
    <!--Modal-->
    <v-dialog
        v-model="dialog"
        width="auto"
        persistent
        >

        <v-card
            width="500"
            height="700"
            v-if="opcao=='anomalia'"
            >
                <v-card-title
                class="bg-indigo-darken-4"
                >Registro de Anomalia</v-card-title>
                
                <v-card-item>
                    <v-row dense>
                        <v-col cols="8">
                            <span class="text-caption ml-2">Local</span>
                            <input type="text" readonly class="border rounded px-2  w-100">
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="4">
                            <span class="text-caption ml-2">Modalidade</span>
                            <input type="text" readonly class="border rounded px-2  w-100">
                        </v-col>
                    </v-row>
                    <!--inspeção e foto-->
                    <v-row dense > 
                        <v-col cols="6" >
                            <div style="height: 280px; overflow-y: auto" class="hiddenscrool">

                            
                            <div class="w-50 pa-0" style="height: 40px;">
                                <p class=" ml-2 " style="font-size: 10px;">Técnica</p>
                                <v-select
                                :items="['Sensitiva', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                density="compact"
                                size="small"
                                variant="outlined"
                                single-line
                                >
                                <template v-slot:selection="{ item}">
                                    <span style="font-size: 10px;" >{{ item.title }}</span>
                                </template>
                                </v-select>
                            </div>

                            <div class="w-50 pa-0" style="height: 40px;">
                                <p class=" ml-2 " style="font-size: 10px;">Status</p>
                                <v-select
                                :items="['Sensitiva', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                density="compact"
                                size="small"
                                variant="outlined"
                                single-line
                                >
                                <template v-slot:selection="{ item}">
                                    <span style="font-size: 10px;" >{{ item.title }}</span>
                                </template>
                                </v-select>

                            </div>
                            <div class="w-75 pa-0" style="height: 40px;">
                                <p class=" ml-2 " style="font-size: 10px;">Ponto</p>
                                <v-select
                                :items="['Sensitiva', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                density="compact"
                                size="small"
                                variant="outlined"
                                single-line
                                >
                                <template v-slot:selection="{ item}">
                                    <span style="font-size: 10px;" >{{ item.title }}</span>
                                </template>
                                </v-select>

                            </div>
                            <div class="w-75 pa-0" style="height: 40px;">
                                <p class=" ml-2 " style="font-size: 10px;">Sintoma</p>
                                <v-select
                                :items="['Sensitiva', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                density="compact"
                                size="small"
                                variant="outlined"
                                single-line
                                >
                                <template v-slot:selection="{ item}">
                                    <span style="font-size: 10px;" >{{ item.title }}</span>
                                </template>
                                </v-select>

                            </div>
                            <div class="w-75 pa-0" style="height: 40px;">
                                <p class=" ml-2 " style="font-size: 10px;">Recomendação</p>
                                <v-select
                                :items="['Sensitiva', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                density="compact"
                                size="small"
                                variant="outlined"
                                single-line
                                >
                                <template v-slot:selection="{ item}">
                                    <span style="font-size: 10px;" >{{ item.title }}</span>
                                </template>
                                </v-select>

                            </div>

                            <div class="w-50 pa-0" style="height: 40px;">
                                <p class=" ml-2 " style="font-size: 10px;">Prazo (dias)</p>
                                <v-select
                                :items="['10 dias', '21 dias', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                density="compact"
                                size="small"
                                variant="outlined"
                                single-line
                                >
                                <template v-slot:selection="{ item}">
                                    <span style="font-size: 10px;" >{{ item.title }}</span>
                                </template>
                                </v-select>
                            </div>

                            <div class="w-50 pa-0" style="height: 40px;">
                                <p class=" ml-2 " style="font-size: 10px;">Foto</p>
                                <input type="file"
                                id="file-input" 
                                style="font-size: 10px;" 
                                accept="image/*" 
                                multiple 
                                @change="handleFileChange"
                                
                                >
                                
                            </div>



                        </div>
                        </v-col>

                        <v-spacer></v-spacer>
                        <v-col cols="6" >
                            <div style="height: 280px;" class="d-flex justify-center align-center" >
                                <div class="w-100 border border-md border-dashed d-flex  flex-column" style="height: 250px;">
                                    <p style="font-size: 10px;" class="pa-2 text-disabled text-end">Arquivos: {{ files.length }} selecionados !</p>
                                    <div v-if="files.length > 0" class="d-flex justify-center align-center flex-column" style="height: 250px; position: relative">
                                        <div v-for="(file, index) in files" :key="index" class="d-flex pa-2 align-end" >
                                            <div  style="position: relative" class="w-50 d-flex align-end">
                                                <img :src="file.url" alt="Selected image" v-if="file.url"  height="90" contain  class="w-100" />
                                                <div style="position: absolute; bottom: 0; top: 0; right: 0; left: 0; z-index: 10; opacity: 0;"  class=" d-flex justify-center align-center alteropacity">
                                                    <v-icon icon="mdi-delete-forever" color="red elevation-10" @click="true"></v-icon>
                                                </div>
                                                <v-text class="text-disabled ml-1 w-50" style="font-size: 10px">{{ file.name }}</v-text>
                                            </div>
                                            
                                  </div>
                                    </div>
                                    <div v-else class="d-flex justify-center align-center" style="height: 250px;">
                                        <v-icon icon="mdi-image-text text-disabled" class="text-h2"></v-icon>
                                    </div>
                                </div>
                            </div>
                          
                        </v-col>
                    </v-row>


                    <v-row dense>
                        <v-col cols="12">
                            <span class="ml-2" style="font-size: 10px;">Detalhes Adicionais</span>
                            <input type="text"  class="border rounded px-2 py-1 w-100">
                        </v-col>
                    </v-row>
                </v-card-item>





                <v-card-item >
                    <hr>
                    <div class="text-end mt-1">
                        <v-btn size="small" variant="text" color="red" @click="dialog = false">Cancelar</v-btn>
                        <v-btn size="small" class="ml-4" color="indigo-darken-4" variant="flat">Salvar</v-btn>
                    </div>
                </v-card-item>


            </v-card>



            <v-card
                width="400"
                height="400"
                v-else
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




const abrirModal = (op) => {
      opcao.value = op;
    dialog.value = true;
}



const files = ref([])



const handleFileChange = (event) => {
      const selectedFiles = Array.from(event.target.files)
      if (selectedFiles.length > 2) {
        alert('Você só pode selecionar no máximo 2 arquivos.')
        event.target.value = null  // Limpar a seleção de arquivos
      } else {
        files.value = []
        selectedFiles.forEach(file => {
          const reader = new FileReader()
          reader.onload = (e) => {
            file.url = e.target.result
            files.value.push(file)
          }
          reader.readAsDataURL(file)
        })
      }
    }


</script>

