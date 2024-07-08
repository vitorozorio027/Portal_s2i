<template>
  <div>
    <v-card max-width="90%" class="mx-auto mt-6" flat>
      <v-card-item>
        <v-row>
          <v-col cols="4">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              single-line
              flat
              variant="outlined"
              rounded-sm
              placeholder="Pesquisar..."
              v-model="procurar"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="2">
            <v-btn append-icon="mdi-plus" block color="#1A237E" @click="openAddDialog">Novo</v-btn>
          </v-col>
        </v-row>
      </v-card-item>

      <v-card-item>
        <v-data-table-virtual
          :items="listUsuarios"
          :headers="headersUsuarios"
          :search="procurar"
          height="370"
          hover
          fixed-header
          density="compact"
          class="text-caption border-0"
          no-data-text="Sem dados Correspondentes!"
          loading-text="Carregando os Dados!"
        >
          <template v-slot:item="{ item }">
            <tr class="border-0">
              <td class="border-0 bg-white">
                <div class="border pa-1">{{ item.nome }}</div>
              </td>
              <td class="border-0">
                <div class="border pa-1">{{ item.email }}</div>
              </td>
              <td class="border-0 text-center">
                <div class="border pa-1">{{ item.telefone }}</div>
              </td>
              <td class="border-0 text-center ">
                <div class="border pa-1">{{ item.empresa }}</div>
              </td>
              <td class="border-0 text-center">
                <v-chip
                  variant="outlined"
                  size="x-small"
                  :text="item.status ? 'Ativo' : 'Inativo'"
                  :color="item.status ? 'success' : 'error'"
                ></v-chip>
              </td>
              <td class="border-0 d-flex justify-center align-center">
                <v-icon icon="mdi-book-account" @click="editItem(item)"></v-icon>
                <v-icon icon="mdi-square-edit-outline" @click="editItem(item)"></v-icon>
                <v-icon icon="mdi-trash-can" @click="deleteItem(item)"></v-icon>
              </td>
            </tr>
          </template>
        </v-data-table-virtual>
      </v-card-item>

      <!-- Modal de Edição -->
      <v-dialog v-model="dialog" class="px-16">
        <v-card width="95%" class="mx-auto pb-4" density="compact">
          <div class="bg-indigo-darken-4 mb-6" style="height: 50px;">
            <v-card-title class="text-h6">Editar Usuário</v-card-title>
          </div>

          <div
            style="position: relative; border: 1px solid black; max-height: 153px;"
            class="rounded mx-4 elevation-1 px-2"
          >
            <v-row dense class="mt-1">
              <v-col cols="3">
                <h1 class="text-caption mx-2">Nome</h1>
                <v-text-field
                  v-model="editedItem.nome"
                  placeholder="Digite o nome..."
                  density="compact"
                  type="text"
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="3">
                <h1 class="text-caption mx-2">E-mail</h1>
                <v-text-field
                  v-model="editedItem.email"
                  placeholder="Digite o e-mail..."
                  density="compact"
                  type="email"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <h1 class="text-caption mx-2">Telefone</h1>
                <v-text-field
                  v-model="editedItem.telefone"
                  placeholder="Digite o telefone..."
                  density="compact"
                  type="tel"
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="3">
                <h1 class="text-caption mx-2">Empresa</h1>
                <v-text-field
                  v-model="editedItem.empresa"
                  placeholder="Digite a empresa..."
                  density="compact"
                  type="text"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-switch
                v-model="editedItem.status"
                label="Status"
                inset
                color="success"
                class="ma-0 pa-0"
              ></v-switch>

              <v-spacer></v-spacer>

              <v-btn
                color="indigo-darken-4"
                variant="flat"
                text="Salvar"
                append-icon="mdi-check-circle"
                @click="saveChanges()"
              ></v-btn>
            </v-card-actions>
            <p
              style="position: absolute; top: -10px; z-index: 1; left: 20px;"
              class="bg-white px-2 text-caption"
            >
              Dados do Usuário
            </p>
          </div>

          <!-- Licenças -->
          <v-div
            style="position: relative; border: 1px solid black;"
            class="rounded mx-4 mt-4 elevation-4 px-2"
          >
            <v-row dense class="mt-2">
              <v-col cols="3">
                <h1 class="text-caption mx-2">Sistema</h1>
              </v-col>
              <v-col cols="2">
                <h1 class="text-caption mx-2">Prazo da Licença</h1>
              </v-col>
              <v-col cols="3">
                <h1 class="text-caption ml-14">Dados Mestre</h1>
              </v-col>
              <v-col cols="2">
                <h1 class="text-caption ml-14">Logomarca</h1>
              </v-col>
            </v-row>

            <v-row
              dense
              v-for="(listSistema, i) in listSistemas"
              :key="i"
            >
              <v-col cols="3">
                <div class="border py-2 px-4 rounded w-100">
                  <span class="text-caption ">{{ listSistema.nome }}</span>
                </div>
              </v-col>

              <v-col cols="2" class="d-flex align-center">
                <v-row>
                  <v-col>
                    <v-text-field
                      density="compact"
                      type="text"
                      variant="outlined"
                      class="text-caption"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="8">
                    <v-select
                      :items="['dias', 'mês', 'anos']"
                      density="compact"
                      variant="outlined"
                      flat
                      class="text-caption"
                      chips
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="3">
                <div class="d-flex justify-center align-center">
                  <v-btn icon="mdi-eye" variant="plain"></v-btn>
                  <v-file-input
                    v-model="fileexcel"
                    accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    density="compact"
                    label="Carregar..."
                    prepend-inner-icon="mdi-microsoft-excel"
                    flat
                    prepend-icon=""
                    variant="outlined"
                    clearable
                    chips
                    hide-details
                    single-line
                  ></v-file-input>
                </div>
              </v-col>

              <v-col cols="3">
                <div class="d-flex justify-center align-center">
                  <v-btn icon="mdi-eye" variant="plain"></v-btn>
                  <v-file-input
                    v-model="file"
                    accept="image/png, image/jpeg, image/bmp"
                    density="compact"
                    label="logo"
                    prepend-inner-icon="mdi-camera"
                    flat
                    prepend-icon=""
                    variant="outlined"
                    clearable
                    chips
                    hide-details
                    single-line
                  ></v-file-input>
                </div>
              </v-col>
              <v-col class="mt-2">
                <v-icon icon="mdi-plus" @click="addLicense()" color="success"></v-icon>
                <v-icon icon="mdi-square-edit-outline" @click="editLicense(listSistema)"></v-icon>
                <v-icon icon="mdi-trash-can" @click="deleteLicense(listSistema)"></v-icon>
              </v-col>
            </v-row>
            <p
              style="position: absolute; top: -10px; z-index: 1; left: 20px;"
              class="bg-white px-2 text-caption"
            >
              Licença Concedida
            </p>
          </v-div>
        </v-card>
      </v-dialog>

      <!-- Modal de Adição -->
      <v-dialog v-model="addDialog" class="px-16">
        <v-card width="95%" class="mx-auto pb-4" density="compact">
          <div class="bg-indigo-darken-4 mb-6" style="height: 50px;">
            <v-card-title class="text-h6">Adicionar Usuário</v-card-title>
          </div>

          <div
            style="position: relative; border: 1px solid black; max-height: 153px;"
            class="rounded mx-4 elevation-1 px-2"
          >
            <v-row dense class="mt-1">
              <v-col cols="3">
                <h1 class="text-caption mx-2">Nome</h1>
                <v-text-field
                  v-model="newItem.nome"
                  placeholder="Digite o nome..."
                  density="compact"
                  type="text"
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="3">
                <h1 class="text-caption mx-2">E-mail</h1>
                <v-text-field
                  v-model="newItem.email"
                  placeholder="Digite o e-mail..."
                  density="compact"
                  type="email"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <h1 class="text-caption mx-2">Telefone</h1>
                <v-text-field
                  v-model="newItem.telefone"
                  placeholder="Digite o telefone..."
                  density="compact"
                  type="tel"
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="3">
                <h1 class="text-caption mx-2">Empresa</h1>
                <v-text-field
                  v-model="newItem.empresa"
                  placeholder="Digite a empresa..."
                  density="compact"
                  type="text"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-switch
                v-model="newItem.status"
                label="Status"
                inset
                color="success"
                class="ma-0 pa-0"
              ></v-switch>

              <v-spacer></v-spacer>

              <v-btn
                color="indigo-darken-4"
                variant="flat"
                text="Adicionar"
                append-icon="mdi-check-circle"
                @click="addNewItem()"
              ></v-btn>
            </v-card-actions>
            <p
              style="position: absolute; top: -10px; z-index: 1; left: 20px;"
              class="bg-white px-2 text-caption"
            >
              Dados do Usuário
            </p>
          </div>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      procurar: '',
      dialog: false,
      addDialog: false,
      editedIndex: -1,
      editedItem: {
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        status: false,
        sistema: '' // Novo campo para armazenar o sistema selecionado
      },
      newItem: {
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        status: false,
      },
      headersUsuarios: [
        { title: 'Nome', align: 'start', key: 'nome', width: "30%" },
        { title: 'E-mail', key: 'email', width: "10%"},
        { title: 'Telefone', key: 'telefone', width: "20%", align: 'center' },
        { title: 'Empresa', key: 'empresa' , width: "25%", align: 'center'},
        { title: 'Status', key: 'status', align: 'center'},
        { title: '', key: 'actions', align: 'center', sortable: false }
      ],
      listUsuarios: [
        { nome: "Pedro Sanzes alvaro", email: "pedro@outlook.com", telefone: "27 99999999", empresa: "Vivo", status: true },
    { nome: "Ana Garcia", email: "ana@gmail.com", telefone: "31 88888888", empresa: "Oi", status: false },
    { nome: "João Oliveira", email: "joao@yahoo.com", telefone: "11 77777777", empresa: "Claro", status: true },
    { nome: "Mariana Costa", email: "mariana@hotmail.com", telefone: "21 66666666", empresa: "TIM", status: false },
    { nome: "Carlos Santos", email: "carlos@icloud.com", telefone: "41 55555555", empresa: "NET", status: true },
    { nome: "Laura Almeida", email: "laura@outlook.com", telefone: "22 44444444", empresa: "Sky", status: false },
    { nome: "José Pereira", email: "jose@gmail.com", telefone: "48 33333333", empresa: "Nextel", status: true },
    { nome: "Camila Lima", email: "camila@yahoo.com", telefone: "16 22222222", empresa: "Embratel", status: false },
    { nome: "Felipe Silva", email: "felipe@hotmail.com", telefone: "35 11111111", empresa: "GVT", status: true },
    { nome: "Aline Rodrigues", email: "aline@gmail.com", telefone: "61 99999999", empresa: "Algar Telecom", status: false },
    { nome: "Lucas Sousa", email: "lucas@yahoo.com", telefone: "28 88888888", empresa: "Oi", status: true },
    { nome: "Fernanda Martins", email: "fernanda@hotmail.com", telefone: "17 77777777", empresa: "Vivo", status: false },
    { nome: "Gabriel Ferreira", email: "gabriel@icloud.com", telefone: "51 66666666", empresa: "Claro", status: true },
    { nome: "Guilherme Almeida", email: "guilherme@hotmail.com", telefone: "19 77777777", empresa: "Algar Telecom", status: false }
      ],
      listSistemas: [
        { nome: 'S2i - Sistema de Inspeção Avulsa', situacao: true },
        { nome: 'DM254 - Arvore de Falha', situacao: true },
        { nome: 'DM242 - Plano Mestre de Inspeção', situacao: false },
        { nome: 'S3i® - Sistema Inteligente de Inspeção', situacao: false }
      ]
    };
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.listUsuarios.indexOf(item);
      this.editedItem = { ...item }; // Copia do objeto para evitar referências compartilhadas
      this.dialog = true;
    },
    saveChanges() {
      if (this.editedIndex > -1) {
        // Atualiza os dados do usuário editado
        Object.assign(this.listUsuarios[this.editedIndex], this.editedItem);
        this.dialog = false;
        console.log("Salvando alterações...");
      }
    },
    deleteItem(item) {
      const index = this.listUsuarios.indexOf(item);
      if (index > -1) {
        this.listUsuarios.splice(index, 1);
      }
    },
    openAddDialog() {
      this.addDialog = true;
    },
    addNewItem() {
      // Validação avançada antes de adicionar um novo item
      if (this.validateNewItem()) {
        this.listUsuarios.push(Object.assign({}, this.newItem));
        this.addDialog = false;
        this.newItem = { nome: '', email: '', telefone: '', empresa: '', status: false };
      } else {
        // Caso haja erros de validação, você pode exibir uma mensagem de erro ou realizar outra ação necessária.
        console.error("Falha na validação ao adicionar novo item.");
      }
    },

    validateNewItem() {
      // Validação avançada dos campos antes de adicionar um novo item
      if (
        this.newItem.nome.trim() === '' ||
        this.newItem.email.trim() === '' ||
        this.newItem.telefone.trim() === '' ||
        this.newItem.empresa.trim() === ''
      ) {
        return false; // Retorna falso se algum dos campos obrigatórios estiver vazio
      }

      // Validação avançada para o formato do e-mail utilizando expressão regular
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.newItem.email)) {
        return false; // Retorna falso se o formato do e-mail for inválido
      }

      // Validação avançada para o formato do telefone utilizando expressão regular
      const telefoneRegex = /^\d{2}\s\d{8}|\d{9}$/;
      if (!telefoneRegex.test(this.newItem.telefone)) {
        return false; // Retorna falso se o formato do telefone for inválido
      }

      // Aqui você pode adicionar outras validações avançadas conforme necessário

      return true; // Retorna true se todas as validações forem bem-sucedidas
    }
  }
};
</script>

