<template>
    <div class="my-2">
        <table class="table">
            <thead id="tabletop">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Primary Color</th>
                    <th scope="col">Type</th>
                </tr>
            </thead>
            <tbody v-for="polish in props.polishes" :key="polish.polish_id">
                <DbEntry
                    :itemName="polish.name"
                    :brandName="polish.brand.name"
                    :polishId="polish.polish_id"
                    :primaryColor="polish.color.name"
                    :type="polish.type.name"
                ></DbEntry>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import DbEntry from '@/components/admin-components/DbEntry.vue';
const props = defineProps({
    polishes: {
        type: Array,
        required: true,
    },
});
</script>
