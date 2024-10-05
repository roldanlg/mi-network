<script setup lang="ts">
import { useUsersStore } from 'src/stores/users-store';
import { useUserStore } from 'src/stores/user-store';
import { onMounted, ref, watch } from 'vue';
import PostCard from 'src/components/PostCard.vue';
import { usePostsStore } from 'src/stores/PostsStore';

defineOptions({
  name: 'SearchPage',
});

const usersStore = useUsersStore();
const userStore = useUserStore();
const postsStore = usePostsStore();
const userList = ref(usersStore.users);
const totalUsers = ref(usersStore.total);
const friendsList = ref(userStore.friends);
const tab = ref('personas');
const postsList = ref(postsStore.posts);
const totalPosts = ref(postsStore.total);

const onUsersLoad = async (index: number, done: (stop?: boolean) => void) => {
  await usersStore.getMoreUsers().then(() => {
    userList.value = usersStore.users;
    done(usersStore.page >= usersStore.totalPages);
  });
};
const onPostsLoad = async (index: number, done: (stop?: boolean) => void) => {
  await postsStore.getMoreUsers().then(() => {
    postsList.value = postsStore.posts;
    done(postsStore.page >= postsStore.totalPages);
  });
};

watch(usersStore, (newValues) => {
  userList.value = newValues.users;
  totalUsers.value = newValues.total;
});

watch(postsStore, (newValues) => {
  postsList.value = newValues.posts;
  totalPosts.value = newValues.total;
});

onMounted(() => {
  usersStore.getUsers();
  postsStore.getPosts();
});
</script>

<template>
  <q-page class="row items-stretch justify-evenly q-py-md">
    <q-card class="col-10">
      <q-card-section class="q-my-none q-py-none">
        <h6 class="q-my-none q-py-none text-center">Buscar</h6>
      </q-card-section>
      <q-tabs v-model="tab" align="left" class="q-ml-md">
        <q-tab name="personas" label="personas">
          <q-badge color="indigo" floating>{{ totalUsers }}</q-badge>
        </q-tab>
        <q-tab name="publicaciones" label="publicaciones">
          <q-badge color="indigo" floating>{{ totalPosts }}</q-badge>
        </q-tab>
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="personas">
          <q-list separator padding bordered class="h-small scroll-y">
            <q-infinite-scroll @load="onUsersLoad" :offset="50">
              <q-item
                v-for="user in userList"
                :key="user.id"
                class="q-my-md"
                clickable
              >
                <q-item-section avatar>
                  <q-avatar
                    font-size="1em"
                    :icon="
                      user.avatar
                        ? `img:http://mi-net-api/storage/avatars/${user.avatar}`
                        : 'mdi-emoticon-outline'
                    "
                  ></q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label header>{{ user.name }}</q-item-label>
                  <q-item-label caption>
                    <q-btn
                      icon="mdi-human-greeting"
                      dense
                      v-if="!friendsList.includes(user)"
                    >
                      <q-tooltip class="bg-blue" :offset="[0, 5]">
                        solicitar amistad
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      icon="mdi-account-minus"
                      dense
                      v-if="friendsList.includes(user)"
                    >
                      <q-tooltip class="bg-red" :offset="[0, 5]">
                        eliminar amistad
                      </q-tooltip>
                    </q-btn>
                    <q-btn icon="mdi-message-text" dense>
                      <q-tooltip class="bg-indigo" :offset="[0, 5]">
                        conversar
                      </q-tooltip>
                    </q-btn>
                    <q-btn icon="mdi-cards" dense>
                      <q-tooltip class="bg-deep-purple" :offset="[0, 5]">
                        publicaciones
                      </q-tooltip>
                    </q-btn>
                    <q-btn icon="mdi-account-off" dense>
                      <q-tooltip class="bg-red-12" :offset="[0, 5]">
                        bloquear
                      </q-tooltip>
                    </q-btn>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <template v-slot:loading>
                <div class="row justify-center q-my-md">
                  <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
                </div>
              </template>
            </q-infinite-scroll>
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="publicaciones">
          <q-list separator padding bordered class="h-small scroll-y">
            <q-infinite-scroll
              @load="onPostsLoad"
              :offset="50"
              v-if="totalPosts > 0"
            >
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
              </div>
            </q-item-section>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<style scoped lang="scss"></style>
