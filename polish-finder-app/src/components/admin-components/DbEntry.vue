<template>
    <tr>
        <th scope="row">
            {{ polishId }}
        </th>
        <td>{{ itemName }}</td>
        <td>{{ brandName }}</td>
        <td>{{ primaryColor }}</td>
        <td>{{ type }}</td>
        <td><i class="bi bi-pencil-square"></i></td>
    </tr>
</template>

<script setup>
const props = defineProps({
    polishId: {
        type: Number,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    brandName: {
        type: String,
        required: true,
    },
    primaryColor: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});
</script>
