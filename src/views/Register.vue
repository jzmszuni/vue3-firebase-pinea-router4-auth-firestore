<template>
  <div>
    <a-row>
      <a-col :sm="{ span: 24}" :md="{ span: 12, offset: 6}" :lg="{span: 8, offset:8}" >

        <a-form 
          layout="vertical"
          name="basicLogin"
          autocomplete="off"
          :model="formState"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item 
            name="email" 
            label="Ingrese su correo" 
            :rules="[
              { 
                required: true, 
                type: 'email',
                message: 'ingresa correo valido',
                whitespace: true,
              }
            ]" 
          >
            <a-input 
              v-model:value="formState.email" 
            />
          </a-form-item>
          <a-form-item 
            name="password" 
            label="Ingrese su contraseña" 
            :rules="[
              { 
                required: true, 
                min:6, 
                message: 'Se requiere contraseña de mínimo 6 caracteres',
                whitespace: true,
              }
            ]" 
          >
            <a-input-password 
              v-model:value="formState.password" 
            />
          </a-form-item>

          <a-form-item 
            name="autPassword" 
            label="Repetir contraseña" 
            :rules="[
              { 
                validator: validatePassword,
              }
            ]" 
          >
            <a-input-password 
              v-model:value="formState.autPassword" 
            />
          </a-form-item>

          <a-form-item >
            <a-button 
              type="primary" 
              html-type="submit" 
              :disabled="userStore.loading"
              :loading="userStore.loading"
            >
              Acceder
            </a-button>
          </a-form-item>

        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "../stores/user.js";
import { message } from 'ant-design-vue';


const formState = reactive ({
  email:        "",
  password:     "",
  autPassword:  "",

})
const userStore = useUserStore();

const onFinish = async (values) => {
  const errorCode = await userStore.registerUser(formState.email, formState.password);
  if(!errorCode){
    message.success("YEAH! You are register now")
  } else {
    switch (errorCode){
      case 'auth/email-already-in-use':
        message.error('Ya existe una cuenta con este correo')
        break
      default:
        message.error("falla en la conexion")
        break
    }
  }
};
const onFinishFailed = errorInfo => {
};

const validatePassword = async (_rule, value) => {
  if( value === "") {
    return Promise.reject("El campo está vacío")
  }
  if (value !== formState.password) {
    return Promise.reject("No se confirmó el password")
  }
  return Promise.resolve()
}

</script>

<style lang="scss" scoped>

</style>