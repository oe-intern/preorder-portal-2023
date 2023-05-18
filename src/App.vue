<template lang="pug">
AppProvider
  Frame
    // If app is ready
    .portal(v-if="isAppReady")
      router-view

    // If app is not ready
    .processing-section
      .error-section(v-if="isAppError")
        // TODO: handle error
      .loading-section
        // TODO: handle loading section (Spinner, loading icon...)
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useAuthStore } from '@/stores';
import { AUTH_STATUS } from '@/configs';
import { AppProvider } from '@ownego/polaris-vue';
//appBridge
import createApp from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge/utilities';

const scaffoldingEmbeddedData = inject('scaffoldingEmbeddedData');
const axios = inject('axios');

const app = createApp({
  apiKey: scaffoldingEmbeddedData.apiKey,
  host: scaffoldingEmbeddedData.host,
});

const authStore = useAuthStore();

const initialize = async () => {
  const sessionToken = await getSessionToken(app);

  authStore.loadedToken(sessionToken);
  setTimeout(initialize, 60000);
};

initialize();

const isAppReady = computed<boolean>(() => authStore.status === AUTH_STATUS.success);
const isAppError = computed<boolean>(() => authStore.status === AUTH_STATUS.error);

// TODO: install global services, trigger login method...
</script>

<style lang="scss">
@import "@/scss/app.scss";
@import "@/scss/variables.scss";
</style>
