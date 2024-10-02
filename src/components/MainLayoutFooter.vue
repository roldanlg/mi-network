<template>
  <footer class="flex justify-between p-10 text-grey-4 align-items-center q-pa-md">
    <div>Copyright 2024.</div>
    <div>
      hecho por
      <q-chip clickable icon="email" color="teal" text-color="white" @click="sendMeMail">
        roldán l.g.
      </q-chip>
    </div>
    <div class="logos-container">
      con
      <q-btn flat round dense icon="img:src/assets/quasar-logo.svg" size="md" href="https://quasar.dev" target="_blank" class="bg-blue-1"></q-btn>
      <q-btn flat round dense :icon="mdiVuejs" size="md" text-color="red" href="https://vuejs.org" target="_blank" class="bg-blue-1"></q-btn>
      <q-btn flat round dense :icon="mdiLaravel" size="md"  text-color="orange" href="https://laravel.com" target="_blank" class="bg-blue-1"></q-btn>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { mdiLaravel, mdiVuejs } from '@quasar/extras/mdi-v7';

const sendMeMail = () => {
  console.log('send support message')
}
</script>

<style lang="scss" scoped>
.logos-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
.quasar-logo-footer-icon {
  width: 32px;
  height: 32px;
}
</style>
