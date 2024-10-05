import { api } from 'src/boot/axios';
import { Post } from './../components/models';
import { defineStore } from 'pinia';
import { AxiosError } from 'axios';

export const usePostsStore = defineStore('postsStore', {
  state: () => ({
    posts: Array<Post>(),
    page: 1,
    perPage: 5,
    totalPages: 1,
    total: 0,
  }),

  actions: {
    async getPosts() {
      await api
        .get('/posts/all', {
          params: { page: this.page, per_page: this.perPage },
        })
        .then(
          (response) => {
            this.posts = response.data.data;
            this.totalPages = response.data.last_page || 0;
            this.total = response.data.total || 0;
          },
          (response) => {
            console.log(response);
          }
        );
    },
    async getMoreUsers() {
      try {
        if (this.page >= this.totalPages || this.total === 0) {
          return;
        } else {
          this.page += 1;
        }
        const response = await api.get('/posts/all', {
          params: { page: this.page, per_page: this.perPage },
        });
        if (response.status === 200) {
          this.posts.push(...response.data.data);
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log(e);
        }
      }
    },
  },
});
