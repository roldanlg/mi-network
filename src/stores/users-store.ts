import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { User } from 'src/components/models';

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    users: Array<User>(),
    page: 1,
    perPage: 5,
    totalPages: 1,
    total: 0,
  }),
  getters: {},
  actions: {
    async getUsers() {
      try {
        this.page = 1;
        const response = await api.get('/users/list', {
          params: { page: this.page, per_page: this.perPage },
        });
        if (response.status === 200) {
          this.users = response.data.data;
          this.totalPages = response.data.last_page || 0;
          this.total = response.data.total || 0;
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log(e);
        }
      }
    },
    async getMoreUsers() {
      try {
        if (this.page >= this.totalPages || this.total === 0) {
          return;
        } else {
          this.page += 1;
        }
        const response = await api.get('/users/list', {
          params: { page: this.page, per_page: this.perPage },
        });
        if (response.status === 200) {
          this.users.push(...response.data.data);
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log(e);
        }
      }
    },
  },
});
