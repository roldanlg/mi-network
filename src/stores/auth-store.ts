import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { AxiosError } from 'axios';

interface Credentials {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    user: null,
    token: '',
    error: '',
  }),
  actions: {
    clearError(){
      this.error = '';
    },
    login(credentials: Credentials) {
      return api.post('/login', credentials)
        .then((response) => {
          if (response.status === 200) {
            this.user = response.data.user;
            this.token = response.data.token;
            api.defaults.headers.common['Authorization'] =
              'Bearer ' + response.data.token;
            this.error = '';
          } else {
            this.error = 'Credenciales no válidas';
          }
        })
        .catch((e) => {
          if (e instanceof AxiosError) {
            this.error = 'Credenciales no válidas';
          }
        });
    },
    logout() {
      api
        .post('logout', {})
        .then((response) => {
          if (response.status === 200) {
            this.user = null;
            this.token = '';
            this.error = '';
            delete api.defaults.headers.common['Authorization'];
          } else {
            this.error = response.data.message;
          }
        })
        .catch((e) => {
          if (e instanceof AxiosError) {
            console.error(e);
            this.error = e.message;
          }
        });
    },
  },
});
