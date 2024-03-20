// src/stores/useAuthStore.js
import { defineStore } from 'pinia';
import { fetchAuthSession, getCurrentUser, signOut } from 'aws-amplify/auth';

export const authUserStore = defineStore('authUserStore', {
  state: () => ({
    isAuthenticated: false,
    user: {
      name: '',
      email: '',
      id: '',
      group: ''
    }
  }),
  actions: {
    async currentSession() {
      try {
        console.log('I made it');
        const currentUser = await getCurrentUser();
        console.log(currentUser);
        const { tokens } = await fetchAuthSession({ forceRefresh: true });
        console.log(tokens);
        this.$patch({
          isAuthenticated: true,
          user: {
            name: tokens.accessToken.payload.username,
            email: 'to be added',
            id: 'to be added',
            group: tokens.accessToken.payload['cognito:groups'][0]
          }
        });
      } catch (err) {
        console.log(err);
        this.$patch({
          isAuthenticated: false,
          user: {
            name: '',
            email: '',
            id: '',
            group: ''
          }
        });
      }
    },
    async handleSignOut() {
      try {
        await signOut();
        this.$patch({
            isAuthenticated: false,
          user: {
            name: '',
            email: '',
            id: '',
            group: ''
          }
        })
      } catch (error) {
        console.log('error signing out: ' + error);
      }
    }
  }
});
