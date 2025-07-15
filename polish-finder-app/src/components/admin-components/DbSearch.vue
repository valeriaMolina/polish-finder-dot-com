<template>
    <div class="db-search">
        <form action="" class="container-fluid">
            <div v-for="(filter, index) in filters" :key="index">
                <div class="row">
                    <DbFilter class="col"></DbFilter>
                    <button
                        class="col-md-auto mt-4 btn btn-danger"
                        @click.prevent="removeFilter(index)"
                        :hidden="isHidden"
                    >
                        <i class="bi bi-x-circle"></i>
                    </button>
                </div>
            </div>
            <div class="nice-form-group">
                <button
                    class="btn btn-primary rounded-pill align-items-end mt-4"
                    @click.prevent="addFilter()"
                >
                    Add filter
                </button>
                <button class="btn btn-success rounded-pill mt-4">Search</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import DbFilter from './DbFilter.vue';
import { ref, computed } from 'vue';

// initialize filters array
const filters = ref([{ id: 1 }]);

const addFilter = () => {
    filters.value.push({ id: filters.value.length } + 1);
};
const removeFilter = (index) => {
    filters.value.splice(index, 1);
};

const isHidden = computed(() => {
    if (filters.value.length === 1) {
        return true;
    }
    return false;
});

const isSubmitDisabled = computed(() => {});
// todo: finalize
</script>
