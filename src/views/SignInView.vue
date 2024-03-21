<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { Authenticator } from "@aws-amplify/ui-vue";
import { Hub } from 'aws-amplify/utils';
import { authUserStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const store = authUserStore();
const router = useRouter();

onMounted(() => {
  const listener = (data) => {
    if (!store.isAuthenticated) {
      store.currentSession().then(() => {
        if (store.isAuthenticated) {
          router.push('/')
        }
      });
    }
  };
  Hub.listen('auth', listener);
  console.log('hi')
});


</script>
