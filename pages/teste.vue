<template>
  <div>
    <div class="pa-2 border rounded teste" style="appearance: auto;">
      <select @change="handleOptionChange" :value="selectedOption" :id="vamosla">
        <option disabled value="">Selecione uma opção</option>
        <option value="teste1">teste1</option>
        <option value="teste2">teste2</option>
        <option value="teste3">teste3</option>
        <option value="teste4">teste4</option>
        <option value="teste5">teste5</option>
      </select>
    </div>
    <p>Valor selecionado: {{ selectedOption }}</p>
  </div>
</template>

<script>


console.log( $teste)
</script>
