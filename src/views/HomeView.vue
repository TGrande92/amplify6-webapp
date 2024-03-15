<script setup>
import TheWelcome from '../components/TheWelcome.vue'
// import { authUserStore }from './stores/auth.js'
import { authUserStore } from '../stores/auth'
// import { onMounted } from 'vue';
// import { useAuthStore } from '@/stores/auth.js';

// const authStore = useAuthStore();

// onMounted(async () => {
//   await authStore.checkAuthState();
// });
import { getCurrentUser } from 'aws-amplify/auth';
const authStore = authUserStore();
console.log(authStore.user)
async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails.currentAuthenticatedUser}`);
  } catch (err) {
    console.log(err);
  }
}

import { fetchAuthSession } from 'aws-amplify/auth';

async function currentSession() {
  try {
    const { tokens } = await fetchAuthSession({ forceRefresh: true });
    console.log(tokens);
  } catch (err) {
    console.log(err);
  }
}

import { fetchUserAttributes } from 'aws-amplify/auth';

async function handleFetchUserAttributes() {
  try {
    const userAttributes = await fetchUserAttributes();
    console.log(userAttributes);
  } catch (error) {
    console.log(error);
  }
}

</script>

<template>
  <main>
    <TheWelcome />
    <div>
      <button @click="currentAuthenticatedUser">Get Current Authenticated User</button>
      <button @click="currentSession">Get Current Session</button>
      <button @click="handleFetchUserAttributes">Get User Attributes {{ authStore }}</button>
    </div>
  </main>
</template>
