<template>
  <div class="card h-100 bg-color">
    <img
      v-if="!pictureUrl"
      :src="config.IMG_NOT_AVAILABLE"
      class="card-img-top"
      alt="Unavailable"
    />
    <img v-else :src="pictureUrl" class="card-img-top" alt="Polish" />
    <div class="card-body d-flex flex-column">
      <div class="mb-auto">
        <p class="fs-5">{{ polishName }}</p>
      </div>

      <div>
        <p class="brand-name my-0">{{ brandName }}</p>
      </div>
    </div>
    <div class="card-footer">
      <p class="text-start mb-0">
        <button class="like-button" @click.prevent="handleLike">
          <i id="heartIcon" :class="iconClass"></i>
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import config from '@/config'
import { ref } from 'vue'
const props = defineProps(['polishName', 'brandName', 'pictureUrl'])

const iconClass = ref('bi bi-heart')

const handleLike = () => {
  // if logged in, add to user's liked polishes array
  // else, prompt user to log in to like a polish
  iconClass.value = iconClass.value === 'bi bi-heart' ? 'bi bi-heart-fill' : 'bi bi-heart'
}
</script>

<style scoped>
.bg-color {
  background-color: #ececec;
}

.brand-name {
  font-weight: bold;
}

.like-button {
  border: none;
  background: none;
}

#heartIcon {
  font-size: 20px;
  color: #f00;
}
</style>
