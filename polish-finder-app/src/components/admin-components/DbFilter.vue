<template>
    <div class="row">
        <div class="nice-form-group col-md-2">
            <select v-model="filter" name="" id="">
                <option value="name">name</option>
                <option value="brand_id">brand</option>
                <option value="color_id">primary color</option>
                <option value="color_id">secondary colors</option>
                <option value="formula_id">formula</option>
                <option value="type_id">type</option>
                <option value="created_at">created at</option>
            </select>
        </div>
        <div class="nice-form-group col-md-2">
            <select name="filter" id="filterSelect" v-model="selectOperator">
                <option value="eq">equals</option>
                <option value="in">contains</option>
                <option value="null">is null</option>
                <option value="notNull">is not null</option>
            </select>
        </div>
        <div class="nice-form-group col">
            <input
                :disabled="isDisabled"
                v-model="inputValue"
                type="text"
                placeholder="Enter Value"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const filter = ref('name');
const selectOperator = ref('eq');
const inputValue = ref('');

const isDisabled = computed(() => {
    if (selectOperator.value === 'null' || selectOperator.value === 'notNull') {
        return true;
    }
    return false;
});

// todo: this needs to be finalized
</script>

<style scoped>
@import url('../../../node_modules/nice-forms.css/dist/nice-forms.css');
</style>
