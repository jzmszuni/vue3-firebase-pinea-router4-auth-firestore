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

              <!-- edit -->
              <a-button 
                type="primary" 
                ghost
                @click="router.push(`edit/${i.id}`)"
                size="small"
              >
                <template #icon>
                  <form-outlined />
                </template>
              </a-button>
              <!-- copy -->
              <a-button
                size="small"
                @click="copyUrl(i.id)"
              >
                <template #icon>
                  <copy-outlined />
                </template>
              </a-button>
              <!-- delete -->
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
                  <template #icon>
                    <delete-outlined />
                  </template>
                </a-button>
              </a-popconfirm>
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
import {
  CopyOutlined,
  DeleteOutlined,
  FormOutlined
} from "@ant-design/icons-vue";
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

const copyUrl = async (id) => {
  if (!navigator.clipboard) {
    return message.error("oops! clipboard disabled!")
  }

  const path = `${window.location.origin}/${id}`
  const err = await navigator.clipboard.writeText(path)
  if (err) {
    console.error(err)
  } else {
    message.success('url copied!')
  }

}

databaseStore.getUrls();

</script>
