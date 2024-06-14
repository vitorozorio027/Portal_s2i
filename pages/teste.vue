<template>
    <div class="pa-6 w-100 text-center">
        <div style=" height: 400px; width: 400px;" class="border border-md mx-auto border-dashed d-flex justify-center align-center" >
            <v-icon icon="mdi-file-image-plus" class="text-h3 teste" style="position: relative;">
                <input
    
                type="file"
                accept="image/*"
                style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0;"
            
                />
            </v-icon>
            
            
            
        </div>
        
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      triggerFileUpload() {
        this.$refs.fileInput.click();
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          // Faça algo com o arquivo aqui, como enviá-lo para um servidor
          console.log('Arquivo selecionado:', file);
        }
      }
    }
  }
  </script>

  <style>
    .teste:hover{
        cursor: pointer;
    }
</style>


  