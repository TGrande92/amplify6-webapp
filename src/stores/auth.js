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
        this.isAuthenticated = true;
        this.user.name = tokens.accessToken.payload.username;
        this.user.group = tokens.accessToken.payload['cognito:groups'][0];
        // Assuming 'email' and 'id' are also part of the payload, you can add them here
      } catch (err) {
        console.log(err);
        this.isAuthenticated = false;
        this.user = { name: '', email: '', id: '', group: '' };
      }
    },
    async handleSignOut() {
      try {
        await signOut();
        this.isAuthenticated = false;
        this.user = { name: '', email: '', id: '', group: '' };
      } catch (error) {
        console.log('error signing out: ' + error);
      }
    }
  }
});
