<template>
  <div>
    <a-row>
      <a-col 
        :sm="{ span: 24}" 
        :md="{ span: 12, offset: 6}" 
        :lg="{span: 8, offset:8}" 
      >
        <a-form 
          layout="vertical"
          name="basicProfile"
          autocomplete="off"
          :model="userStore.userData"
          @finish="onFinish"
        >
          <a-form-item 
            name="email" 
            label="email" 
            :rules="[
              { 
                type: 'email',
                message: 'ingresa correo valido',
                whitespace: true,
              }
            ]" 
          >
            <a-input 
              disabled
              v-model:value="userStore.userData.email" 
            />
          </a-form-item>
      
          <a-form-item 
            name="displayName" 
              label="username" 
              :rules="[
                { 
                  required: true, 
                  whitespace: true,
                  message: 'Nombre de usuario',
                }
              ]" 
              >
              <a-input 
                v-model:value="userStore.userData.displayName" 
              />
              </a-form-item>
          
          <a-form-item >
            <a-button 
              type="primary" 
              html-type="submit" 
              :disabled="userStore.loading"
              :loading="userStore.loading"
            >
              Actualizar
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore()
const onFinish = async (value) =>{
  const error = await userStore.updateUser(userStore.userData.displayName)
  if (!error) {
    return message.success("Nickname updated")
  }
    message.error("oops! we can\'t update name")
}

</script>

<style lang="scss" scoped>

</style>