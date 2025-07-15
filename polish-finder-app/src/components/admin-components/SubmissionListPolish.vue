<template>
    <div class="my-2">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Type</th>
                    <th scope="col">Primary Color</th>
                    <th scope="col">Secondary Color(s)</th>
                    <th scope="col">Formula(s)</th>
                    <th scope="col">Description</th>
                    <th scope="col">Image</th>
                    <th scope="col">Submitted By</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody v-for="submission in props.submissions" :key="submission.submission_id">
                <PolishEntry
                    :submissionId="submission.submission_id"
                    :name="submission.name"
                    :user="submission.user.username"
                    :brand="submission.brand.name"
                    :image="submission.image_url"
                    :type="submission.type.name"
                    :primaryColor="submission.color.name"
                    :secondaryColors="submission.secondary"
                    :formula="submission.formulas"
                    :status="submission.status"
                    :description="submission.description"
                ></PolishEntry>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import PolishEntry from './PolishEntry.vue';

const props = defineProps({
    submissions: {
        type: Array,
        required: true,
    },
});
</script>
