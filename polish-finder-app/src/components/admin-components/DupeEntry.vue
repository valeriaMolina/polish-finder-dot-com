<template>
    <tr>
        <th scope="row">
            {{ submissionId }}
        </th>
        <td>
            <router-link
                :to="`/polishes/${props.polishId}`"
                target="_blank"
                rel="noopener noreferrer"
                >{{ polish }}
            </router-link>
        </td>
        <td>
            <router-link
                :to="`/polishes/${props.dupeId}`"
                target="_blank"
                rel="noopener noreferrer"
                >{{ dupe }}</router-link
            >
        </td>
        <td>{{ user }}</td>
        <td>{{ status }}</td>
        <td>{{ createdAt }}</td>
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
import { reviewDupe } from '@/apis/reviewsAPI';
import { ref } from 'vue';

const props = defineProps({
    submissionId: {
        type: Number,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    polish: {
        type: String,
        required: true,
    },
    dupe: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    polishId: {
        type: Number,
        required: true,
    },
    dupeId: {
        type: Number,
        required: true,
    },
});
const emit = defineEmits(['updated-submission']);

const updateSubmission = async (status) => {
    try {
        const id = props.submissionId;
        const res = await reviewDupe(id, status);
        if (res) {
            // emit a notification
            emit('updated-submission');
        }
    } catch (error) {
        console.error('Error updating submission:', error);
    }
};

const isSubmissionReviewed = ref(props.status === 'pending' ? true : false);
</script>
