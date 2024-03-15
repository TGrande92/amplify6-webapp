// src/stores/useAuthStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';




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
                const username = await getCurrentUser();
                console.log(username)
                const { tokens } = await fetchAuthSession({ forceRefresh: true });
                console.log(tokens)
                user.value.name = tokens.accessToken.payload.username
                user.value.email = tokens.accessToken.payload['cognito:groups'][0]
                return 'hello'
            }   catch (err) {
                console.log(err);
                // reset the user state if error
                this.user = {name: '', email: '', id: '', group: ''};
            }
        }
    }
});