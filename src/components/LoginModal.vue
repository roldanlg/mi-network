<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from 'stores/auth-store';
import { useDialogPluginComponent, useQuasar } from 'quasar';

defineEmits([...useDialogPluginComponent.emits]);

const $q = useQuasar();
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
const authStore = useAuthStore();
const isPwd = ref(true);
const email = ref('');
const password = ref('');
const loading = ref(false);
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const emailRules = [
  (val: string) => !!val || 'El campo es obligatorio',
  (val: string) =>
    emailRegex.test(val) || 'La dirección de correo no es válida',
];

const passwordRules = [(val: string) => !!val || 'El campo es obligatorio'];

const isFormValid = computed(() => {
  return (
    emailRules.every((rule) => rule(email.value) === true) &&
    passwordRules.every((rule) => rule(password.value) === true)
  );
});

const onOKClick = async () => {
  loading.value = true;
  try {
    await authStore
      .login({ email: email.value, password: password.value })
      .then(() => {
        if (authStore.error) {
          console.log(authStore.error);
          $q.notify({
            type: 'negative',
            message: authStore.error,
            position: 'top-right',
          });
        } else {
          $q.notify({
            type: 'positive',
            message: 'Hola ' + authStore.user?.name,
            position: 'bottom-right',
          });
          setTimeout(() => {
            onDialogOK();
          }, 2000);
        }
      });
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  }
};

const handleDialogHide = () => {
  authStore.clearError();
  onDialogHide();
};
</script>

<template>
  <q-dialog
    ref="dialogRef"
    @hide="handleDialogHide"
    position="top"
    transition-show="slide-down"
  >
    <q-card class="q-pa-lg">
      <q-card-section
        horizontal
        class="flex justify-between align-items-center"
      >
        <div>Ingrese a su red</div>
        <q-btn
          flat
          dense
          outline
          round
          icon="close"
          @click="onDialogCancel"
        ></q-btn>
      </q-card-section>
      <q-card-section horizontal>
        <q-form :on-submit="onOKClick" class="q-gutter-md">
          <q-input
            v-model="email"
            type="email"
            hint="myself@gmail.com"
            :rules="emailRules"
            item-aligned
            label="Email"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            hint="contraseña"
            :rules="passwordRules"
            item-aligned
            label="Contraseña"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions align="right" class="q-mt-lg">
        <q-btn
          flat
          dense
          @click="onOKClick"
          :loading="loading"
          :disable="!isFormValid"
          >login</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss"></style>
