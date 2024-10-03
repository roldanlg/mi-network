<template>
  <q-page class="row items-center justify-evenly">
    <q-card flat bordered class="col-10">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ user?.name }}</q-item-label>
          <q-item-label caption> {{ user?.email }} </q-item-label>
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
import { computed } from 'vue';
import { User } from 'components/models';

const authStore = useAuthStore();
const user = computed<User | null>(() => authStore.user);
</script>
