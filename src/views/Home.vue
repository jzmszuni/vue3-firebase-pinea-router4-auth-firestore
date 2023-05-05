<template>
  <div>
    
    <h1>Home</h1>
    <add-form></add-form>
    <p v-if="databaseStore.loading"><a-spin tip="Loading..." /></p>
    <template v-if="!databaseStore.loading"> 
      <a-space direction="vertical" style="width: 100%;">
        <a-card 
          v-for="i in databaseStore.documents" 
          :key="i.id"
          :title="i.short"
          size="small"
        >
          <template #extra>
            <a-space>
              <a :href="i.name" target="_blank">go</a>
              <a-popconfirm
                title="Are you sure delete this?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="confirm(i.id)"
                @cancel="cancel(i.name)"
              > 
                <a-button 
                  danger 
                  size="small"
                  :disabled="databaseStore.loading"
                  :loading="databaseStore.loading"
                >
                  delete
                </a-button>
              </a-popconfirm>
              <a-button 
                primary 
                @click="router.push(`edit/${i.id}`)"
                size="small"
              >
                edit
              </a-button>
            </a-space>
          </template>
          
          <p>{{ i.name }}</p>
        </a-card>
      </a-space>
    </template>
    
  </div>
</template>

<script setup>
import { useDatabaseStore } from "../stores/database";
import { useRouter }        from "vue-router";
import { message }          from 'ant-design-vue';

const databaseStore = useDatabaseStore();
const router = useRouter();

const confirm = async (id) => {
  const err = await databaseStore.deleteUrl(id)
  console.error(err)
  if (!err) {
    message.success('url deleted!')
  } else {
    message.error(err)
  }
}
const cancel = (name) => {
  message.info('oops! you\'re not delete \"'+name+'\"!')
}

databaseStore.getUrls();

</script>
