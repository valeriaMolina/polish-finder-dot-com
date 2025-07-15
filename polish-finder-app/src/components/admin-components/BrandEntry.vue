<template>
    <tr>
        <th scope="row">
            {{ submissionId }}
        </th>
        <td>
            {{ brandName }}
        </td>
        <td>
            {{ website }}
        </td>
        <td>{{ user }}</td>
        <td>{{ status }}</td>
        <td>
            <button
                :disabled="!isSubmissionReviewed"
                type="button"
                class="btn btn-primary btn-sm dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Review
            </button>
            <ul class="dropdown-menu">
                <li>
                    <a class="dropdown-item" @click.prevent="updateSubmission('approved')"
                        >Accept</a
                    >
                </li>
                <li>
                    <a class="dropdown-item" @click.prevent="updateSubmission('rejected')"
                        >Reject</a
                    >
                </li>
            </ul>
        </td>
    </tr>
</template>

<script setup>
import { ref } from 'vue';
import { reviewBrand } from '@/apis/reviewsAPI';

const props = defineProps({
    submissionId: {
        type: Number,
        required: true,
    },
    brandName: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const isSubmissionReviewed = ref(props.status === 'pending' ? true : false);
const emit = defineEmits(['updated-submission']);

const updateSubmission = async (status) => {
    try {
        const id = props.submissionId;
        const res = await reviewBrand(id, status);
        if (res) {
            emit('updated-submission');
        }
    } catch (error) {
        console.error('Failed to update submission:', error.message);
    }
};
</script>
