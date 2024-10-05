<template>
  <div class="q-pa-md" v-if="!post">
    <q-card style="max-width: 300px">
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption
            >No hay publicaciones de momento
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-skeleton height="200px" square />

      <q-card-actions align="right" class="q-gutter-md">
        <q-skeleton type="QBtn" />
        <q-skeleton type="QBtn" />
      </q-card-actions>
    </q-card>
  </div>
  <div class="q-pa-md" v-else>
    <q-card style="max-width: 300px">
      <q-item>
        <q-item-section avatar>
          <q-avatar icon="mdi-emoticon"></q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label header>
            {{ post.title }}
          </q-item-label>
          <q-item-label caption>
            {{ post.owner.name }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-img
            :src="`http://mi-net-api/storage/post-media/${post.media[0]?.file}`"
          ></q-img>
        </q-item-section>
        <q-item-section>
          {{ post.content }}
        </q-item-section>
      </q-item>

      <q-card-actions align="right" class="q-gutter-md">
        <q-btn label="like"></q-btn>
        <q-btn label="comment"></q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { Post } from './models';

defineComponent({
  name: 'PostCard',
});
defineProps<{ post?: Post }>();
</script>
