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

          <a-form-item>
            <div class="clearfix">
              <a-upload
                v-model:file-list="fileList"
                list-type="picture-card"
                :before-upload="beforeUpload"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div v-if="fileList.length < 1">
                  <plus-outlined />
                  <div style="margin-top: 8px">Imagen</div>
                </div>
              </a-upload>
              <a-modal 
                :visible="previewVisible" 
                :title="previewTitle" 
                :footer="null" 
                @cancel="handleCancel"
              >
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </div>
          </a-form-item>

          <a-form-item >
            <a-button 
              type="primary" 
              html-type="submit" 
              :disabled="disabled"
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
import { message, Upload } from "ant-design-vue";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { PlusOutlined } from '@ant-design/icons-vue';


// Variables
const userStore = useUserStore()
const disabled = ref(false)
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const fileList = ref(
  [
    {
      uid: '-1',
      name: userStore.userData.displayName,
      status: 'done',
      url: userStore.userData.photoURL,
    },
  ]
);

// Funcion de validación de imagenes
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// Funcion del formulario (al finalizar o submit)
const onFinish = async () =>{
  disabled.value = userStore.loading
  const error = await userStore.updateUser(userStore.userData.displayName, fileList.value[0])
  if (!error) {
    return message.success("User updated")
  }
    message.error("oops! we can\'t update name")
}

// --> Funciones de la imagen
// al Cancelar
const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};

// al haber cambios
const handleChange = ({
  file,
  fileList,
}) => {
  if (fileList.length < 1) {
    disabled.value = true
  } else {
    disabled.value = userStore.loading
  }
};

// antes de guardar imagen; existe un action
const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt4M = file.size / 1024 / 1024 < 4;
  // sino es imagen
  if (!isJpgOrPng) {
    message.error('oops! esto no es una imagen válida');
    disabled.value = true
    return true
  }
  // si pesa mas de 4MB
  if (!isLt4M) {
    message.error('oops! necesitamos imagenes menos pesadas ');
    disabled.value = true
    return true
  }
  disabled.value = userStore.loading
  return isJpgOrPng && isLt4M || Upload.LIST_IGNORE;
};

// Previsualización de la imagen
const handlePreview = async file => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);

};

</script>

<style lang="scss" scoped>

</style>

