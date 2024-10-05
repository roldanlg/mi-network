<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import PostCard from 'src/components/PostCard.vue';
import { usePostsStore } from 'src/stores/PostsStore';

defineOptions({
  name: 'PostsPage',
});

const postsStore = usePostsStore();
const postsList = ref(postsStore.posts);
const totalPosts = ref(postsStore.total);

const onPostsLoad = async (index: number, done: (stop?: boolean) => void) => {
  await postsStore.getMoreUsers().then(() => {
    postsList.value = postsStore.posts;
    done(postsStore.page >= postsStore.totalPages);
  });
};

watch(postsStore, (newValues) => {
  postsList.value = newValues.posts;
  totalPosts.value = newValues.total;
});

onMounted(() => {
  postsStore.getPosts();
});
</script>

<template>
  <q-page class="row items-stretch justify-evenly q-pa-md">
    <q-list
      separator
      padding
      bordered
      class="h-small scroll-y col-12 rounded-borders"
    >
      <q-infinite-scroll @load="onPostsLoad" :offset="50" v-if="totalPosts > 0">
        <q-item
          v-for="post in postsList"
          :key="post.id"
          class="q-my-md"
          clickable
        >
          <q-item-section>
            <post-card :post="post"></post-card>
          </q-item-section>
        </q-item>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
          </div>
        </template>
      </q-infinite-scroll>
      <q-item-section v-else>
        <div class="h-small row justify-center">
          <post-card></post-card>
          <post-card></post-card>
          <post-card></post-card>
          <post-card></post-card>
          <post-card></post-card>
          <post-card></post-card>
        </div>
      </q-item-section>
    </q-list>
  </q-page>
</template>

<style scoped lang="scss"></style>
