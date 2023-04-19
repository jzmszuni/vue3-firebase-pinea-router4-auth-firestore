<template>
  <a-form
    name="formAdd"
    autocomplete="off"
    layout="vertical"
    :model="formAdd"
    @finish="onFinish"
  >
    <a-form-item
      name="url"
      label="Ingrese una URL"
      :rules="[
        {
          required: true,
          message: 'Ingrese url'
        },
        {
          
          whitespace  : true,
          message     : 'ingrese una URL valida'
        },
        {
          pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
          message: 'No es una URL'
        },
      ]"
    >
      <a-input v-model:value="formAdd.url"></a-input>
    </a-form-item>

    <a-form-item>
      <a-button 
        type="primary" 
        html-type="submit" 
        :disabled="databaseStore.loading"
        :loading="databaseStore.loading"
      >
        add url
      </a-button>
    </a-form-item>

  </a-form>
</template>

<script setup>
import { useDatabaseStore } from "../stores/database";
import { reactive }         from 'vue';
import { message }          from 'ant-design-vue';

const databaseStore = useDatabaseStore()

const formAdd = reactive({
  url: "", 
})
const onFinish = async (value) => {
  const errorCode = await databaseStore.addUrls(formAdd.url);
  if(!errorCode){
    message.success("URL agregado")
    formAdd.url = ""
  } else {
    switch (errorCode){
    default:
      message.error("falla en la conexion")
      break
    }
  }
}

</script>
