<template>
        <div class="px-8 pt-16">
          <div class="pt-10">
            <div class="d-flex justify-space-between mb-6">
              <div class="w-25">
                <v-text-field
                  :loading="loading"
                  append-inner-icon="mdi-magnify"
                  density="comfortable"
                  label="Pesquisar"
                  variant="solo"
                  hide-details
                  single-line
                  size="x-small"
                  
                ></v-text-field>
              </div>
              <div>
                <v-btn class="mr-4" color="indigo-darken-4" @click="addCard">Novo</v-btn>
                <v-btn color="indigo-darken-4">Salvar</v-btn>
              </div>
            </div>
      
            <!--Outra secção-->
            <div style="position: relative; border: 1px solid #BDBDBD;" class="rounded mx-auto mt-4 pa-6 h-100">
              <p style="position: absolute; top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-body-2">Inspeção Planejadas</p>
              <!--SECÇÃO PLANEJAMENTO-->
              <div style="height: 370px; overflow-y: auto">
                <div class="d-flex font-weight-bold mb-2" style="font-size: 10px;">
                  <p style="width: 9%;" class="ml-2">Modalidade</p>
                  <p style="width: 6%;" class="ml-2">Ordem</p>
                  <p style="width: 25%;" class="ml-2">Descrição da Inspeção</p>
                  <p style="width: 9%;" class="ml-2">Data inicio</p>
                  <p style="width: 9%;" class="ml-2">Data fim</p>
                  <p style="width: 9%;" class="ml-2">Analista</p>
                  <p style="width: 6%;" class="ml-2">Inspetor</p>
                  <p class="ml-4">Escopo</p>
                  <p class="ml-2">Recurso</p>
                  <p class="ml-7">status</p>
                </div>
      
                <!--SECÃO DE CARD-->
                <div
                  class="d-flex px-1 mb-2 elevation-2 rounded border align-center"
                  v-for="(card, i) in cards"
                  :key="i"
                  style="height: 45px; position: relative;"
                >
                  <div style="width: 8%;" class="mt-6">
                    <v-select
                      v-model="card.Modalidade"
                      variant="outlined"
                      density="compact"
                      :items="['Mecânico', 'Elétrico']"
                      flat
                      required
                    >
                      <template v-slot:selection="{ item }">
                        <span style="font-size: 10px;">{{ item.title }}</span>
                      </template>
                    </v-select>
                  </div>
      
                  <div style="width: 6%;" class="mx-2">
                    <input required type="text" v-model="card.Ordem" class="border border-sm w-100 text-caption px-1 rounded">
                  </div>
      
                  <div style="width: 25%;">
                    <input required type="text" v-model="card.Desc_Insp" class="border border-sm w-100 text-caption px-1 rounded">
                  </div>
      
                  <div style="width: 9%;" class="mx-2">
                    <input required type="date" v-model="card.Data_inicio" class="border border-sm w-100 text-caption px-1 rounded">
                  </div>
      
                  <div style="width: 9%;">
                    <input required type="date" v-model="card.Data_fim" class="border border-sm w-100 text-caption px-1 rounded">
                  </div>
                  <div style="width: 9%;" class="mx-2">
                    <input required type="text" class="border border-sm w-100 text-center text-caption px-1 rounded" v-model="card.Analista">
                  </div>
                  <div style="width: 9%;">
                    <input required type="text" class="border border-sm w-100 text-center text-caption px-1 rounded" v-model="card.Inspetor" >
                  </div>
                  <div class="mx-2">
                    <v-icon icon="mdi-database-search" :color="card.Escopo.length>0?'grey-lighten-1':'black'" class="text-h6 mr-4 " @click="abrirModal('escopo', i)"></v-icon>
                  </div>
                  <div>
                    <v-icon icon="mdi-cogs" class="text-h6" :color="card.recurso.length>0?'grey-lighten-1':'black'" @click="abrirModal('recurso', i)"></v-icon>
                  </div>
                  <div style="width: 5%;" class="mx-4">
                    <input type="text" v-model="card.status" style="font-size: 10px;" class="border border-sm w-100 px-1 py-1 rounded text-center" disabled>
                  </div>
                  <div class="d-flex justify-center align-center">
                    <v-icon icon="mdi-magnify" class="text-body-2 d-none d-lg-block" @click="true" color="grey-lighten-1"></v-icon>
                    <v-icon icon="mdi-text-box-check" class="text-body-2 d-block mx-1" @click="CarregarInspecao(i)" :color="validacaocamposatual(i)?'black':'grey-lighten-1'"></v-icon>
                    <v-icon icon="mdi-trash-can" class="text-body-2 d-none d-lg-block" @click="removerProgramacao(i)"></v-icon>
                  </div>
                </div>
                
                <div class="w-50 mx-auto" style="position: absolute; z-index: 10; left: 50%; top:-25%; transform: translateX(-40%); transition: all 2s ease-in;">
                  <v-alert
                    v-model="IsvalidError"
                    border="start"
                    close-label="Close Alert"
                    color="red-accent-4"
                    title="Preenchimento Obrigatório"
                    variant="flat"
                    closable
                    density="compact"
                    class="text-caption"
                  >
                    Existe Campos obrigatório que não foram preenchidos !
                  </v-alert>
                </div>

              </div>
            


          
              <!--MODAL-->
              <v-dialog v-model="dialog" width="auto" persistent>
                <!--CARD ESCOPO-->
                <v-card width="800" v-if="opcao === 'escopo'">
                  <v-card-title class="bg-indigo-darken-4">Escopo</v-card-title>
                  <div style="overflow-y: auto;">
                    <v-card-item>
                      <div
                        style="position: relative; border: 1px solid black; height: 220px;"
                        class="rounded mx-4 mt-4 elevation-4 px-4 pb-2"
                      >
                        <p style="position: absolute; top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-body-2">Locais Disponiveis</p>
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
                          class="text-caption"
                          no-data-text="Sem dados Correspondentes!"
                          loading-text="Carregando os Dados!"
                          return-object
                          v-model="selectedProgramacao"
                        >
                          <template v-slot:header.title="{ column }">
                            <p class="text-grey-lighten-1">{{ column.title }}</p>
                          </template>
                        </v-data-table-virtual>
                      </div>
                    </v-card-item>
                    <div class="d-flex justify-center align-center">
                      <v-icon icon="mdi-swap-vertical-bold" size="30"></v-icon>
                    </div>
                    <v-card-item>
                      <div
                        style="position: relative; border: 1px solid black; max-height: 220px;"
                        class="rounded mx-4 mt-2 elevation-4 px-2"
                      >
                        <p style="position: absolute; top: -10px; z-index: 1; left: 20px;" class="bg-white px-2 text-body-2">Locais Selecionados</p>
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
                          <template v-slot:item.actions="{ item }">
                            <v-icon icon="mdi-trash-can" @click="removerProgramacaoSelecionada(item)"></v-icon>
                          </template>
                        </v-data-table-virtual>
                      </div>
                    </v-card-item>
                    <v-card-item>
                      <hr>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" variant="flat" @click="dialog = false">Cancelar</v-btn>
                        <v-btn variant="flat" color="indigo-darken-4" @click="addicionarEscopo">Salvar</v-btn>
                      </v-card-actions>
                    </v-card-item>
                  </div>
                </v-card>
      
                <!--CARD RECURSO-->
                <v-card v-if="opcao === 'recurso'" width="700">
                  <v-card-title class="bg-indigo-darken-4">Recurso</v-card-title>
                  <v-card-item>
                    <v-textarea
                      label="Descreva aqui..."
                      variant="outlined"
                      flat
                      counter="1000"
                      rows="14"
                      single-line
                      v-model="recurso"
                    ></v-textarea>
                  </v-card-item>
                  <v-card-item>
                    <hr>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="error" variant="flat" @click="dialog = false">Cancelar</v-btn>
                      <v-btn variant="flat" color="indigo-darken-4" @click="addicionarRecurso">Salvar</v-btn>
                    </v-card-actions>
                  </v-card-item>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>
      </template>
      
      <script setup>
      import { ref, onMounted, watch } from 'vue';
      import { useRouter } from 'vue-router';

      const router = useRouter();
      const dialog = ref(false);
      const loading = ref(false);
      const selectedProgramacao = ref([]);
      const recurso = ref('');
      const posicao = ref(0);
      const procurar = ref('');
      const procurarProgramacao = ref('');
      const IsvalidError = ref(false)
      const headers = [{ title: 'Selecionar Todos', align: 'start', key: 'title' }];
      const headersProgramacao = [
        { title: '', align: 'start', key: 'title' },
        { title: '', key: 'actions', align: 'center', sortable: false },
      ];
      
      const elements = Array.from({ length: 30 }, (_, i) => ({
        title: `Espaço reservado para os Locais s2i-PO${String(i + 1).padStart(5, '0')}`,
      }));
      
      const cards = ref([]);
      
      onMounted(() => {
        const storedCards = localStorage.getItem('cards');
        if (storedCards) {
          cards.value = JSON.parse(storedCards);
        }
      });
      

      const validacaoUltimocampos = () =>{
          const ultimoCard = cards.value[cards.value.length - 1];
          return ultimoCard.Modalidade !== '' 
            && ultimoCard.Ordem !== '' 
            && ultimoCard.Desc_Insp !== '' 
            && ultimoCard.Data_inicio !== '' 
            && ultimoCard.Data_fim !== '' 
            && ultimoCard.Inspetor !== '' 
            && ultimoCard.Escopo.length > 0;
      }

      const validacaocamposatual = (i) =>{
          const CardAtual = cards.value[i];
          return CardAtual.Modalidade !== '' 
            && CardAtual.Ordem !== '' 
            && CardAtual.Desc_Insp !== '' 
            && CardAtual.Data_inicio !== '' 
            && CardAtual.Data_fim !== '' 
            && CardAtual.Inspetor !== '' 
            && CardAtual.Escopo.length > 0;
      }




      const addCard = () => {

        IsvalidError.value = false
        if(cards.value.length>0){
          if(validacaoUltimocampos()){
              cards.value.push({
              Modalidade: '',
              Ordem: '',
              Desc_Insp: '',
              Data_inicio: '',
              Data_fim: '',
              Analista: '',
              Inspetor: '',
              Escopo: '',
              recurso: '',
              status: 'Pendente',
              });
              return
            }
            IsvalidError.value = true
            return
        }

        cards.value.push({
          Modalidade: '',
          Ordem: '',
          Desc_Insp: '',
          Data_inicio: '',
          Data_fim: '',
          Analista: '',
          Inspetor: '',
          Escopo: '',
          recurso: '',
          status: 'Pendente',
        });
      };
      
      const opcao = ref('');
      
      const abrirModal = (op, i) => {
        posicao.value = i;
        selectedProgramacao.value = cards.value[i].Escopo || [];
        recurso.value = cards.value[i].recurso || '';
        opcao.value = op;
        dialog.value = true;
      };
      
      const removerProgramacao = (index) => {
        IsvalidError.value = false
        cards.value.splice(index, 1);
        localStorage.setItem('cards', JSON.stringify(cards.value));
      };
      
      const removerProgramacaoSelecionada = (item) => {
        const index = selectedProgramacao.value.findIndex((element) => element.title === item.title);
        if (index !== -1) {
          selectedProgramacao.value.splice(index, 1);
        }
      };
      
      const addicionarEscopo = () => {
        cards.value[posicao.value].Escopo = selectedProgramacao.value;
        dialog.value = false;
      };
      
      const addicionarRecurso = () => {
        cards.value[posicao.value].recurso = recurso.value;
        dialog.value = false;
      };
      
      watch(cards, (newValue) => {
        localStorage.setItem('cards', JSON.stringify(newValue));
      }, { deep: true });

      const CarregarInspecao = (index) =>{
        if(!validacaocamposatual(index))
        {
          IsvalidError.value = true
          return
        }
        router.push(`/inspecao/${index}`)
      }
</script>
      
<style>
input:focus {
  box-shadow: 0 0 0 0;
  outline: 0;
}
</style>
      