<template>
  <div id="polishes" class="d-flex flex-column py-5">
    <div class="row">
      <div class="col-2 ms-2">
        <div class="white-bg container border shadow rounded row g-2 py-3">
          <h4>Refine results</h4>
          <div class="accordion accordion-flush" id="filterAccordion">
            <div class="accordion-item">
              <h4 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  Brand
                </button>
              </h4>
              <div id="collapseOne" class="accordion-collapse collapse">
                <div class="accordion-body">
                  <div class="nice-form-group">
                    <input type="text" placeholder="Brand name" value="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h4 class="acordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Color
                </button>
              </h4>
              <div id="collapseTwo" class="accordion-collapse collapse">
                <div class="accordion-body">
                  <fieldset>
                    <div class="nice-form-group">
                      <input type="checkbox" id="whiteColor" />
                      <label for="whiteColor"> <span class="color-dot"></span> White</label>
                    </div>
                    <div class="nice-form-group">
                      <input type="checkbox" id="greyColor" />
                      <label for="greyColor">
                        <span class="color-dot" style="background-color: grey"></span> Grey</label
                      >
                    </div>
                    <div class="nice-form-group">
                      <input type="checkbox" id="blackColor" />
                      <label for="blackColor"
                        ><span class="color-dot" style="background-color: black"></span>
                        Black</label
                      >
                    </div>
                    <div class="nice-form-group">
                      <input type="checkbox" id="redColor" />
                      <label for="redColor"
                        ><span class="color-dot" style="background-color: red"></span> Red</label
                      >
                    </div>
                    <div class="nice-form-group">
                      <input type="checkbox" id="orangeColor" />
                      <label for="orangeColor"
                        ><span class="color-dot" style="background-color: orange"></span>
                        Orange</label
                      >
                    </div>
                    <div class="nice-form-group">
                      <input type="checkbox" id="yellowColor" />
                      <label for="yellowColor"
                        ><span class="color-dot" style="background-color: yellow"></span>
                        Yellow</label
                      >
                    </div>
                    <div class="nice-form-group">
                      <input type="checkbox" id="greenColor" />
                      <label for="greenColor"
                        ><span class="color-dot" style="background-color: green"></span>
                        Green</label
                      >
                    </div>
                    <div class="nice-form-group">
                      <input type="checkbox" id="blueColor" />
                      <label for="blueColor"
                        ><span class="color-dot" style="background-color: blue"></span> Blue</label
                      >
                    </div>
                    <div class="nice-form-group">
                      <input type="checkbox" id="indigoColor" />
                      <label for="indigoColor"
                        ><span class="color-dot" style="background-color: indigo"></span>
                        Indigo</label
                      >
                    </div>
                    <div class="nice-form-group">
                      <input type="checkbox" id="purpleColor" />
                      <label for="purpleColor"
                        ><span class="color-dot" style="background-color: purple"></span>
                        Purple</label
                      >
                    </div>
                    <div class="nice-form-group">
                      <input type="checkbox" id="pinkColor" />
                      <label for="pinkColor"
                        ><span class="color-dot" style="background-color: pink"></span> Pink</label
                      >
                    </div>
                    <div class="nice-form-group">
                      <input type="checkbox" id="brownColor" />
                      <label for="brownColor"
                        ><span class="color-dot" style="background-color: brown"></span>
                        Brown</label
                      >
                    </div>
                    <div class="nice-form-group">
                      <input type="checkbox" id="goldColor" />
                      <label for="goldColor"
                        ><span class="color-dot" style="background-color: gold"></span> Gold</label
                      >
                    </div>
                    <div class="nice-form-group">
                      <input type="checkbox" id="silverColor" />
                      <label for="silverColor"
                        ><span class="color-dot" style="background-color: silver"></span>
                        Silver</label
                      >
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="white-bg container border shadow rounded row row-cols-md-6 g-2 px-3 py-3">
          <div
            v-for="polish in polishes"
            :key="polish.polish_id"
            class="d-flex align-items-stretch"
          >
            <PolishCard
              :brand-name="polish.brand.name"
              :picture-url="polish.image_url"
              :polish-name="polish.name"
            ></PolishCard>
          </div>
          <div class="container mt-4 text-center">
            <div class="spinner-border" role="status" :hidden="!isLoading">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
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
const isLoading = ref(false)

const loadMorePolishes = async () => {
  isLoading.value = true
  let newLoad = await fetchPolish(page + 1, 60)
  polishes.value.push(...newLoad.polishes)
  isLoading.value = false
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
  let element = document.getElementById('polishes')
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    setTimeout(async () => {
      await loadMorePolishes()
      page++ // Increment page number for next fetch request.
    }, '1000') // Delay the execution of the function to prevent unnecessary API calls.
  }
}

const debounceHandleScroll = debounce(handleScroll, timeout)

onMounted(async () => {
  window.addEventListener('scroll', debounceHandleScroll)
  const polishesFetched = await fetchPolish(page, 60)
  polishes.value = polishesFetched.polishes
})

onUnmounted(() => {
  //window.removeEventListener('scroll', debounceHandleScroll)
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

.color-dot {
  height: 12px;
  width: 12px;
  background-color: white;
  border-radius: 50%;
  border: 1px solid black;
  display: inline-block;
}
</style>
