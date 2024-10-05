<template>
  <q-page class="row items-center justify-evenly">
    <q-card flat bordered class="col-10">
      <q-item>
        <q-item-section avatar top>
          <q-avatar
            :icon="avatar"
            size="xl"
            font-size="1em"
            @click="showChangeAvatar"
            class="cursor-pointer"
          ></q-avatar>
          <q-slide-transition appear>
            <q-file
              outlined
              bottom-slots
              v-model="file"
              label="actualiza tu avatar"
              counter
              dense
              v-if="wantToChangeAvatar"
              class="q-mt-xs"
            >
              <template v-slot:append>
                <q-icon
                  v-if="file !== null"
                  name="close"
                  @click.stop.prevent="file = null"
                  class="cursor-pointer"
                />
              </template>
              <template v-slot:hint> hasta 1MB </template>
              <template v-slot:after>
                <q-btn
                  round
                  dense
                  flat
                  icon="mdi-upload"
                  @click="uploadAvatar"
                  :loading="isUploadingAvatar"
                />
              </template>
            </q-file>
          </q-slide-transition>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ user?.name }}</q-item-label>
          <q-item-label caption> {{ user?.email }} </q-item-label>
          <q-item-label caption>{{ activeFrom }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="col-6">
          <p class="flex text-weight-bold align-items-center justify-between">
            administrar publicaciones
            <q-badge
              rounded
              outline
              label="2"
              class="text-blue-7 text-weight-bold"
            ></q-badge>
          </p>
          <q-scroll-area
            style="
              min-height: 200px;
              max-height: 400px;
              height: 200px;
              min-width: 200px;
              max-width: 400px;
              width: auto;
              margin-left: auto;
              margin-right: auto;
            "
          >
            <q-card flat bordered class="q-mt-md">
              <q-img
                src="/src/assets/quasar-logo-vertical.svg"
                img-class="q-pa-sm"
              ></q-img>
              <q-card-section>
                <div class="text-overline text-orange-9">Privado</div>
                <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                <div class="text-caption text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>
              <q-separator></q-separator>
              <q-card-actions
                align="evenly"
                class="flex-inline no-wrap bg-grey-1"
              >
                <q-btn-group rounded unelevated>
                  <q-btn
                    size="sm"
                    dense
                    flat
                    rounded
                    color="red"
                    icon="mdi-heart-outline"
                    label="15"
                  />
                  <q-btn
                    size="sm"
                    dense
                    flat
                    rounded
                    color="teal"
                    icon="mdi-comment-outline"
                    label="4"
                  />
                  <q-btn
                    size="sm"
                    dense
                    flat
                    rounded
                    color="primary"
                    icon="share"
                    label="12"
                  />
                </q-btn-group>
              </q-card-actions>
            </q-card>
            <q-card flat bordered class="q-mt-md">
              <q-img src="/src/assets/quasar-logo.svg"></q-img>
              <q-card-section>
                <div class="text-overline text-blue-9">Público</div>
                <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                <div class="text-caption text-grey">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </q-card-section>
              <q-separator></q-separator>
              <q-card-actions
                align="evenly"
                class="flex-inline no-wrap bg-grey-1"
              >
                <q-btn-group rounded unelevated>
                  <q-btn
                    size="sm"
                    dense
                    flat
                    rounded
                    color="red"
                    icon="mdi-heart-outline"
                    label="115"
                  />
                  <q-btn
                    size="sm"
                    dense
                    flat
                    rounded
                    color="teal"
                    icon="mdi-comment-outline"
                    label="24"
                  />
                  <q-btn
                    size="sm"
                    dense
                    flat
                    rounded
                    color="primary"
                    icon="share"
                    label="132"
                  />
                </q-btn-group>
              </q-card-actions>
            </q-card>
          </q-scroll-area>
        </q-card-section>
        <q-separator vertical />
        <q-card-section>
          <p class="text-weight-bold">solicitudes enviadas</p>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right"> dsadsa</q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'stores/auth-store';
import { computed, ref, watch } from 'vue';
import { User } from 'components/models';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

const authStore = useAuthStore();
const $q = useQuasar();
const user = computed<User | null>(() => authStore.user);
const avatar = ref(
  `img:http://mi-net-api/storage/avatars/${user?.value?.avatar}` ||
    'mdi-emoticon-outline'
);
const file = ref(null);
const isUploadingAvatar = ref(false);
const wantToChangeAvatar = ref(false);

const getTimeDifference = (startDate: Date, endDate: Date) => {
  let diffInMs = endDate.getTime() - startDate.getTime();
  let diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  let years = Math.floor(diffInDays / 365);
  let months = Math.floor((diffInDays % 365) / 30);
  let days = (diffInDays % 365) % 30;
  let message = '';
  let messageYears = '';
  let messageMonths = '';
  let messageDays = '';
  if (years > 0) {
    messageYears = ` ${years} años`;
  }
  if (months > 0) {
    messageMonths = ` ${months} meses`;
  }
  if (days > 0) {
    messageDays = ` ${days} días`;
  } else if (days === 0 && years === 0 && months === 0) {
    messageDays = ' hoy';
  }

  message = [messageYears, messageMonths, messageDays]
    .filter(Boolean)
    .join(', ');

  if (!message) {
    message = 'cuenta activa desde hoy.';
  } else {
    message = `cuenta activa desde hace ${message}`;
  }

  return message;
};

const activeDate = new Date(user?.value?.email_verified_at ?? Date.now());
const todayDate = new Date(Date.now());
const activeFrom = getTimeDifference(activeDate, todayDate);

watch(user, (newVal) => {
  newVal?.avatar !== undefined
    ? (avatar.value = `img:http://mi-net-api/storage/avatars/${newVal.avatar}`)
    : 'mid-emoticon-outline';
});

const showChangeAvatar = () => {
  wantToChangeAvatar.value = !wantToChangeAvatar.value;
};

const uploadAvatar = () => {
  isUploadingAvatar.value = true;
  if (file.value && user.value) {
    const formData = new FormData();
    formData.append('avatar', file.value);
    formData.append('user_id', user.value.id.toString());
    api
      .post('/user/change/avatar', formData)
      .then((response) => {
        if (user.value) {
          user.value.avatar = response.data.avatar;
          authStore.updateUserData(user.value);
          $q.notify({
            type: 'positive',
            message: 'Su avatar ha cambiado',
            position: 'top',
          });
        }
      })
      .catch((error) => {
        console.log('error al cambiar avatar', error);
        $q.notify({
          type: 'negative',
          message: 'Error al subir su avatar, intente de nuevo',
          position: 'top',
        });
      })
      .finally(() => {
        isUploadingAvatar.value = false;
        wantToChangeAvatar.value = false;
      });
  } else {
    return;
  }
};
</script>
