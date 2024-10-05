import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { AxiosError } from 'axios';
import { User } from 'components/models';
interface Credentials {
  email: string;
  password: string;
}

interface RegistrationCredentials {
  name: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    user: null as User | null,
    token: '',
    error: '',
    message: '',
  }),
  actions: {
    updateUserData(user: User | null) {
      this.user = user ? { ...user } : null;
    },
    clearError() {
      this.error = '';
    },
    async register(credentials: RegistrationCredentials) {
      try {
        const response = await api.post('/user/register', credentials);
        if (response.status === 201) {
          this.message = response.data.message;
          this.error = '';
          this.user = null;
          this.token = '';
        } else {
          this.error = response.data.error;
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          this.error = 'Fallo en el registro';
        }
      }
    },
    async login(credentials: Credentials) {
      try {
        const response = await api.post('/user/login', credentials);
        if (response.status === 200) {
          this.user = response.data.user;
          this.token = response.data.token;
          this.error = '';
        } else {
          this.error = 'Credenciales no válidas';
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          this.error = 'Credenciales no válidas';
        }
      }
    },
    logout() {
      api
        .post('/user/logout', {})
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
        })
        .finally(() => {
          window.location.href = '/';
        });
    },
  },
});
