<template>
  <div>
    <a-row justify="space-between" align="middle">
      <a-col :span="8" > <h1> Change url: {{ route.params.id }} </h1> </a-col>
      <a-col :span="4" class="text-end" style="text-align: right"><router-link to="/"> back</router-link></a-col>
    </a-row>
    <a-row justify="center">
      <a-col :span="20">
        <a-form
          name="formEdit"
          autocomplete="off"
          layout="vertical"
          :model="formState"
          @finish="onFinish"
        >
          <a-form-item
            name="url"
            label="Ingrese una URL"
            :rules="[{
                required: true,
                message: 'Ingrese URL'
              }, {
                whitespace  : true,
                message     : 'ingrese una URL valida'
              }, {
                pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
                message: 'No es una URL'
              },
            ]"
          >
            <a-input v-model:value="formState.url"></a-input>
          </a-form-item>

          <a-form-item>
            <a-button 
              type="primary" 
              html-type="submit" 
              :disabled="databaseStore.loading"
              :loading="databaseStore.loading"
            >
              Edit URL
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
  import { useRoute }             from "vue-router";
  import { useDatabaseStore }     from "../stores/database";
  import { onMounted, reactive }  from "vue";
  import { message }              from 'ant-design-vue';

  const route         = useRoute()
  const databaseStore = useDatabaseStore()
  const formState = reactive({
    url: "", 
  })

  const onFinish = async (value) => {
    const errorCode = await databaseStore.updateUrl(route.params.id, formState.url);
    if(!errorCode){
      message.success("URL \""+formState.url+"\"actualizado")
      formState.url = ""
    } else {
      switch (errorCode){
      default:
        message.error("falla en la conexion")
        break
      }
    }
  }

  onMounted(async () => {
    formState.url = await databaseStore.detailUrl(route.params.id)
  })

</script>

<style lang="scss" scoped>

</style>