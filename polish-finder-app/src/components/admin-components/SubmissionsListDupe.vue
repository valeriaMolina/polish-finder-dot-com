<template>
    <div class="my-2">
        <table class="table">
            <thead id="tabletop">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Polish</th>
                    <th scope="col">Dupe</th>
                    <th scope="col">Submitted By</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody v-for="submission in props.submissions" :key="submission.submission_id">
                <DupeEntry
                    :submissionId="submission.submission_id"
                    :polish="submission.polish.name"
                    :dupe="submission.dupe.name"
                    :user="submission.user.username"
                    :status="submission.status"
                    :createdAt="submission.created_at"
                    :polishId="submission.polish_id"
                    :dupeId="submission.similar_to_polish_id"
                    @updated-submission="updateSubmissionsList()"
                ></DupeEntry>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import DupeEntry from './DupeEntry.vue';

const emit = defineEmits(['update-list']);

const updateSubmissionsList = () => {
    emit('update-list');
};

const props = defineProps({
    submissions: {
        type: Array,
        required: true,
    },
});
</script>
