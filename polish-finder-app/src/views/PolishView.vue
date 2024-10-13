<template>
  <div class="background-color container-fluid py-5">
    <div class="container white-bg border shadow rounded g-2 py-3">
      <div v-if="isLoading">
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div v-else class="row row-cols-2">
        <div class="col d-flex align-items-center">
          <img
            v-if="polish.image_url"
            :src="polish.image_url"
            class="img-fluid"
            alt="polish name"
          />
          <div v-else class="container-fluid text-center">
            <i class="bi bi-image large-icon"></i>
            <p class="large-text">Image not available</p>
          </div>
        </div>
        <div class="col">
          <div>
            <h2>{{ polish.name }}</h2>
            <p>{{ polish.brand.name }}</p>
            <hr />
            <div v-if="polish.description">
              <p>{{ polish.description }}</p>
            </div>
            <div v-else>
              <p>No description available</p>
            </div>
          </div>
          <div>
            <table class="table">
              <tbody>
                <tr>
                  <td>Color</td>
                  <td>color tags</td>
                </tr>
                <tr>
                  <td>Formula</td>
                  <td>formula tags</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td>type tag</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findOnePolish } from '@/apis/polishAPI'

const route = useRoute()
const router = useRouter()
const polish = ref({})
const isLoading = ref(true)

onMounted(async () => {
  const fetchedPolish = await findOnePolish(route.params.polishId)
  if (fetchedPolish) {
    polish.value = fetchedPolish
    isLoading.value = false
  } else {
    // redirect to not found
    router.push({ name: 'not-found' })
  }
})

onUnmounted(() => {
  // cleanup resources here (e.g., cancel API requests)
  isLoading.value = true
  polish.value = {}
})
</script>

<style scoped>
.background-color {
  background: linear-gradient(
    106.5deg,
    rgba(255, 215, 185, 0.91) 23%,
    rgba(223, 159, 247, 0.8) 93%
  );
}

.white-bg {
  background-color: #f8f9fa;
}

.large-icon {
  font-size: 5rem;
}

.large-text {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>
