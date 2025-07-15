<template>
    <h5>
        <span :style="{ backgroundColor: color }" class="badge"
            >{{ text }} <button @click.prevent="handleClick"><i class="bi bi-x"></i></button
        ></span>
    </h5>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#000000',
        required: false,
    },
});

const emit = defineEmits(['remove-selection-click']);

const handleClick = () => {
    emit('remove-selection-click');
};
</script>

<style scoped>
button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
    cursor: pointer;
    color: white;
}
</style>
