<template>
  <q-layout view="lHh Lpr lFf">
    <login-modal ref="loginModalRef" v-model="isLoginModalOpen"></login-modal>
    <register-modal
      ref="registerModalRef"
      v-model="isRegisterModalOpen"
    ></register-modal>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-btn flat to="/"> Mi Network</q-btn>
        </q-toolbar-title>

        <div>
          <q-btn
            icon="mdi-account-check"
            round
            flat
            @click="isLoginModalOpen = true"
            v-if="!loggedUser"
          ></q-btn>
          <q-btn
            icon="mdi-account-plus-outline"
            color="black"
            round
            flat
            @click="isRegisterModalOpen = true"
            v-if="!loggedUser"
          ></q-btn>
          <q-btn-dropdown
            split
            rounded
            icon="mdi-account-outline"
            color="black"
            flat
            v-if="loggedUser"
            :label="loggedUser.name"
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Preferencias</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label @click="onLogOut">Salir</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links</q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition
        appear
        enter-active-class="animated slideInLeft slower"
        leave-active-class="animated slideOutRight slower"
      >
        <router-view />
      </transition>
      <q-footer>
        <main-layout-footer></main-layout-footer>
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import MainLayoutFooter from 'components/MainLayoutFooter.vue';
import loginModal from 'components/LoginModal.vue';
import RegisterModal from 'components/RegisterModal.vue';
import { useAuthStore } from 'stores/auth-store';
import { User } from 'components/models';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const isLoginModalOpen = ref(false);
const isRegisterModalOpen = ref(false);

const authStore = useAuthStore();
console.log('iniciando vista');
const theUser = computed<User | null>(() => authStore.user);

const loggedUser = ref<User | null>(null);
watch(theUser, (newVal) => {
  loggedUser.value = newVal;
});

defineOptions({
  name: 'MainLayout',
});

const linksList: EssentialLinkProps[] = [
  {
    title: 'Publicaciones',
    caption: 'contenido público',
    icon: 'mdi-cards-outline',
    link: '/PostsPage',
  },
  {
    title: 'Mis Amigos',
    caption: 'contenido de mis amistades',
    icon: 'mdi-contacts',
    link: '/FriendsPage',
  },
  {
    title: 'Buscar',
    caption: 'encuentre todo lo que busca aquí',
    icon: 'mdi-eye-outline',
    link: '/SearchPage',
  },
  {
    title: 'Conversaciones',
    caption: 'converse con sus amigos',
    icon: 'mdi-chat',
    link: '/ChatPage',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const onLogOut = () => {
  authStore.logout();
  $q.notify({ type: 'warning', message: 'Vuelva pronto', position: 'top' });
};
</script>
