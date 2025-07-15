<template>
    <div class="my-2">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Brand Name</th>
                    <th scope="col">Website</th>
                    <th scope="col">Submitted by</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody v-for="submission in props.submissions" :key="submission.submission_id">
                <BrandEntry
                    :submissionId="submission.submission_id"
                    :brandName="submission.brand_name"
                    :website="submission.website"
                    :user="submission.user.username"
                    :status="submission.status"
                    @updated-submission="updateSubmissionsList()"
                />
            </tbody>
        </table>
    </div>
</template>

<script setup>
import BrandEntry from './BrandEntry.vue';

const props = defineProps({
    submissions: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['update-list']);

const updateSubmissionsList = () => {
    emit('update-list');
};
</script>
