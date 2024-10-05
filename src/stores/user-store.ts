import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { User } from 'src/components/models';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {} as User,
    friends: Array<User>(),
    page: 1,
    perPage: 5,
    totalPages: 1,
    total: 0,
  }),
  getters: {},
  actions: {
    async getMyInfo() {
      try {
        this.page = 1;
        const response = await api.get('/user/me');
        if (response.status === 200) {
          this.user = response.data.data;
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log(e);
        }
      }
    },
    async getFriendsUsers() {
      try {
        this.page = 1;
        const response = await api.get('/user/friends', {
          params: { page: this.page, per_page: this.perPage },
        });
        if (response.status === 200) {
          this.friends = response.data.data;
          this.totalPages = response.data.last_page;
          this.total = response.data.total;
          console.log('get initial users friends', response.data);
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log(e);
        }
      }
    },
    async getMoreFriends() {
      try {
        if (this.page >= this.totalPages) {
          return;
        } else {
          this.page += 1;
        }
        const response = await api.get('/user/friends', {
          params: { page: this.page, per_page: this.perPage },
        });
        if (response.status === 200) {
          this.friends.push(...response.data.data);
          console.log('get additional friends', response.data);
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log(e);
        }
      }
    },
  },
});
