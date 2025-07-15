<template>
    <tr>
        <th scope="row">
            {{ submissionId }}
        </th>
        <td>
            {{ name }}
        </td>
        <td>
            {{ brand }}
        </td>
        <td>
            {{ type }}
        </td>
        <td>
            {{ primaryColor }}
        </td>
        <td>
            <div v-if="props.secondaryColors.length > 0">
                {{ secondaryColors }}
            </div>
            <div v-else>None</div>
        </td>
        <td>
            {{ formula }}
        </td>
        <td>
            <div v-if="props.description">
                {{ description }}
            </div>
            <div v-else>None</div>
        </td>
        <td>
            <div v-if="props.image">
                <a :href="props.image" target="_blank" rel="noopener noreferrer">Open Link</a>
            </div>
        </td>
        <td>
            {{ user }}
        </td>
        <td>
            {{ status.toUpperCase() }}
        </td>
        <td>
            <div class="dropdown">
                <button class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown">
                    Review
                </button>
                <ul class="dropdown-menu">
                    <li class="dropdown-item">Approve</li>
                    <li class="dropdown-item">Reject</li>
                </ul>
            </div>
        </td>
    </tr>
</template>

<script setup>
const props = defineProps({
    submissionId: { type: Number, required: true },
    name: { type: String },
    brand: { type: String },
    type: { type: String },
    primaryColor: { type: String },
    secondaryColors: { type: Array },
    formula: { type: Array },
    description: { type: String },
    image: { type: String },
    user: { type: String },
    status: { type: String },
});
</script>
