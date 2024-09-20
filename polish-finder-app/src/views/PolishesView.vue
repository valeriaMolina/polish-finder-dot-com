<template>
  <div id="polishes" class="d-flex flex-column align-items-center px-3 py-5">
    <div class="container mb-3">
      <h1>Polishes</h1>
      <p>Browse all our available nail polish</p>
    </div>
    <div
      class="white-bg container border shadow rounded row row-cols-1 row-cols-md-6 g-2 px-3 py-3"
    >
      <div v-for="polish in polishes" :key="polish.polish_id" class="d-flex align-items-stretch">
        <PolishCard
          :brand-name="polish.brand.name"
          :picture-url="polish.image_url"
          :polish-name="polish.name"
        ></PolishCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import PolishCard from '@/components/PolishCard.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { fetchPolish } from '@/apis/polishAPI'

let page = 1
let timeout = 1000
const polishes = ref([])

const loadMorePolishes = async () => {
  let newLoad = await fetchPolish(page + 1, 60)
  polishes.value.push(...newLoad.polishes)
}

const debounce = (func, delay) => {
  let debounceTimer
  return function () {
    const context = this
    const args = arguments
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => func.apply(context, args), delay)
  }
}

const handleScroll = async (e) => {
  console.log('scrolled')
  let element = document.getElementById('polishes')
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    setTimeout(async () => {
      await loadMorePolishes()
      page++ // Increment page number for next fetch request.
    }, '1000') // Delay the execution of the function to prevent unnecessary API calls.
  }
}

const debounceHandleScroll = debounce(handleScroll, 1000)

onMounted(async () => {
  window.addEventListener('scroll', debounceHandleScroll)
  const polishesFetched = await fetchPolish(page, 60)
  polishes.value = polishesFetched.polishes
})

onUnmounted(() => {
  window.removeEventListener('scroll', debounceHandleScroll)
  polishes.value = [] // Clear polishes on unmount to prevent memory leakage.
})
</script>

<style scoped>
#polishes {
  background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
}

.white-bg {
  background-color: #f8f9fa;
}
</style>
