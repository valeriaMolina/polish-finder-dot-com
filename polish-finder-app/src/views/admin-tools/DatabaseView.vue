<template>
    <div>
        <AdminNav activeLink="database"></AdminNav>
        <div class="container-fluid">
            <div class="container"></div>
            <div class="border rounded px-3 py-3 mx-1 my-3">
                <h4>Database</h4>
                <p>
                    Here you can view and manage the database entries. You can add, edit, and delete
                    entries.
                </p>
            </div>
            <div class="row px-3 my-3">
                <DbSearch></DbSearch>
            </div>
            <div>
                <DbList :polishes="polishes"></DbList>
            </div>
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" @click="previousPage()">Previous</a>
                </li>
                <div id="pages-go-here" class="d-flex"></div>
                <li class="page-item"><a class="page-link" @click="nextPage()">Next</a></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import AdminNav from '@/components/admin-components/AdminNav.vue';
import DbSearch from '@/components/admin-components/DbSearch.vue';
import DbList from '@/components/admin-components/DbList.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { fetchPolish } from '@/apis/polishAPI';

let page = 1;
let timeout = 1000;
const polishes = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const isLoading = ref(false);

onMounted(async () => {
    const allPolish = await fetchPolish(page, 100);
    polishes.value = allPolish.polishes;
    totalPages.value = allPolish.totalPages;
    currentPage.value = allPolish.currentPage;
    populatePages();
});

const populatePages = () => {
    const pages = document.getElementById('pages-go-here');

    for (let i = 1; i <= totalPages.value; i++) {
        const pageLink = document.createElement('li');
        pageLink.classList.add('page-item');
        const link = document.createElement('a');
        link.classList.add('page-link');
        link.innerText = i;
        link.addEventListener('click', async () => {
            await changePage(i);
        });
        pageLink.appendChild(link);
        pages.appendChild(pageLink);
    }
};

const changePage = async (i) => {
    // get current page and remove the active class
    const div = document.getElementById('pages-go-here');
    div.querySelector(`li:nth-child(${currentPage.value})`).classList.remove('active');
    // set the new active page
    div.querySelector(`li:nth-child(${i})`).classList.add('active');
    currentPage.value = i;
    const pagePolishes = await fetchPolish(i, 100);
    polishes.value = pagePolishes.polishes;
};

const previousPage = async () => {
    if (currentPage.value > 1) {
        await changePage(currentPage.value - 1);
    }
};

const nextPage = async () => {
    if (currentPage.value < totalPages.value) {
        await changePage(currentPage.value + 1);
    }
};
</script>

<style scoped></style>
