<template>
    <div id="main-div-polish-submit" class="d-flex flex-column align-items-center px-3 py-5">
        <AlreadyInDB ref="alreadyInDb"></AlreadyInDB>
        <NotLoggedInModal ref="thisModal"></NotLoggedInModal>
        <SubmissionAlreadyExists ref="subAlreadyExists"></SubmissionAlreadyExists>
        <SubmissionSuccessModal ref="successModal"></SubmissionSuccessModal>
        <ErrorModal ref="errorModal"></ErrorModal>
        <div class="container-fluid row justify-content-md-center">
            <div class="col-6 pt-2">
                <form id="form-register" class="border shadow rounded px-1 py-4" novalidate>
                    <div class="my-3 px-5 text-center">
                        <h2>Submit a new polish</h2>
                    </div>
                    <div class="my-4 px-4">
                        <h4>Submission Guidelines</h4>
                        <p>Before submitting a new nail polish, please make sure:</p>
                        <ul>
                            <li>
                                The polish is not already in our database. You can search for
                                existing polishes
                                <a href="">here.</a>
                            </li>
                            <li>
                                You provide as much information as possible to help us accurately
                                add the polish.
                            </li>
                            <li>
                                The brand is already in our database. You can search for existing
                                brands here!
                            </li>
                        </ul>
                    </div>
                    <div class="d-flex flex-column mb-3 mx-2" id="polish-name-div">
                        <label
                            for="polish-name"
                            class="form-label custom-label-size"
                            id="polish-name-label"
                            >Name of the polish</label
                        >
                        <input
                            type="text"
                            class="custom-input"
                            id="polish-name"
                            @focus="focus('polish-name-div')"
                            @blur="blur('polish-name-div')"
                            required
                            v-model="polish.polishName"
                        />
                        <small>Enter the full name of the polish</small>
                    </div>
                    <div class="d-flex flex-column mb-3 mx-2">
                        <small>Choose a brand</small>
                        <AutoCompletion
                            v-if="!polish.brandName"
                            :suggestions="brands"
                            :onSelect="selectBrand"
                            placeholder="Choose a brand"
                        ></AutoCompletion>
                        <Selection
                            v-if="polish.brandName"
                            :text="polish.brandName"
                            @remove-selection-click="removeBrand"
                        ></Selection>
                    </div>
                    <div class="d-flex flex-column mb-3 mx-2">
                        <select class="custom-input" id="polish-type" v-model="polish.polishType">
                            <option value="">Select a type</option>
                            <option value="Lacquer">Lacquer</option>
                            <option value="Gel">Gel</option>
                        </select>
                        <small>Select the type of polish (lacquer or gel)</small>
                    </div>
                    <div class="d-flex flex-column mb-3 mx-2">
                        <small>Select a primary color</small>
                        <AutoCompletion
                            v-if="!polish.primaryColor"
                            :suggestions="colors"
                            :onSelect="selectPrimaryColors"
                            placeholder="Choose a primary color"
                        ></AutoCompletion>
                        <Selection
                            :color="getHexCode(polish.primaryColor)"
                            v-if="polish.primaryColor"
                            :text="polish.primaryColor.name"
                            @remove-selection-click="removePrimaryColor"
                        ></Selection>
                    </div>

                    <div class="d-flex flex-column mb-3 mx-2">
                        <p>List any secondary colors (optional)</p>
                        <div class="d-flex flex-row flex-wrap column-gap-1">
                            <div v-for="color in polish.secondaryColors" :key="color.color_id">
                                <Selection
                                    :color="getHexCode(color)"
                                    :text="color.name"
                                    @remove-selection-click="removeEffectColor(color)"
                                ></Selection>
                            </div>
                        </div>

                        <AutoCompletion
                            :suggestions="colors"
                            placeholder="Select effect colors"
                            :onSelect="addEffectColor"
                        ></AutoCompletion>
                    </div>
                    <div class="d-flex flex-column mb-3 mx-2">
                        <p>Choose a formula</p>
                        <div class="d-flex flex-row flex-wrap column-gap-1">
                            <div
                                v-for="formula in polish.selectedFormulas"
                                :key="formula.formula_id"
                            >
                                <Selection
                                    :text="formula.name"
                                    @remove-selection-click="removeFormula(formula)"
                                ></Selection>
                            </div>
                        </div>
                        <AutoCompletion
                            placeholder="Enter formula name"
                            :suggestions="formulas"
                            :onSelect="addFormula"
                        ></AutoCompletion>
                        <small>At least one formula must be chosen</small>
                    </div>
                    <div id="description-div" class="d-flex flex-column mb-3 mx-2">
                        <label id="description-label" for="" class="form-label form-label-size"
                            >Write a description
                        </label>
                        <input
                            type="text"
                            class="custom-input"
                            @focus="focus('description-div')"
                            @blur="blur('description-div')"
                            v-model="polish.description"
                        />
                        <small>Tell us more! (Optional)</small>
                    </div>
                    <div class="d-flex flex-column mb-3 mx-2">
                        <b>Upload a clear picture</b>
                        <input type="file" class="custom-input" @change="handleFileChange" />
                        <small
                            >By uploading a picture, you are giving us permission to store it in our
                            database.</small
                        >
                        <div v-if="fileError" class="alert alert-danger" role="alert">
                            {{ fileError }}
                        </div>
                    </div>
                    <div class="d-flex flex-row mb-3 mx-2 column-gap-1">
                        <button class="btn btn-success" @click.prevent="send()">
                            Submit
                            <span class="spinner-border spinner-border-sm" :hidden="hiddenSpinner">
                            </span>
                        </button>
                        <button class="btn btn-secondary" @click.prevent="clearPolish()">
                            Clear
                        </button>
                    </div>
                    <div class="alert alert-danger" role="alert" :hidden="!showErrorMessage">
                        {{ errorMessage }}
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import AlreadyInDB from '@/components/modals/AlreadyInDB.vue';
import AutoCompletion from '@/components/AutoCompletion.vue';
import Selection from '@/components/Selection.vue';
import NotLoggedInModal from '@/components/modals/NotLoggedInModal.vue';
import SubmissionAlreadyExists from '@/components/modals/SubmissionAlreadyExists.vue';
import SubmissionSuccessModal from '@/components/modals/SubmissionSuccessModal.vue';
import ErrorModal from '@/components/modals/ErrorModal.vue';

import { useAuthStore } from '@/stores/auth';
import { fetchBrands } from '@/apis/brandAPI';
import * as yup from 'yup';
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { fetchAllColors, fetchAllFormulas } from '@/apis/polishAPI';
import { submitPolish, submitPolishImage } from '@/apis/submissionsAPI';
import { formatPolishSubmission } from '@/utils/format';

const router = useRouter();
const authStore = useAuthStore();
const hiddenSpinner = ref(true);

const brands = ref([]);
const colors = ref([]);
const formulas = ref([]);

// modal definitions
const thisModal = ref(null);
const errorModal = ref(null);
const successModal = ref(null);

// error messages
const errorMessage = ref('');
const showErrorMessage = ref(false);

const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

const schema = yup.object({
    polishName: yup.string().required('Name of the polish is required'),
    brandName: yup.string().required('Brand is required'),
    polishType: yup.string().required('Type of polish is required'),
    primaryColor: yup.object().required('Primary color is required'),
    secondaryColors: yup.array(),
    selectedFormulas: yup.array().min(1, 'At least one formula is required'),
    description: yup.string(),
    image: yup.mixed().required('Image is required'),
});

const polish = reactive({
    polishName: '',
    brandName: '',
    polishType: '',
    primaryColor: null,
    secondaryColors: [],
    selectedFormulas: [],
    description: '',
    image: null,
});

/**
 * Clear the polish object
 */
const clearPolish = () => {
    polish.polishName = '';
    polish.brandName = '';
    polish.polishType = '';
    polish.primaryColor = null;
    polish.secondaryColors = [];
    polish.selectedFormulas = [];
    polish.description = '';
    polish.image = null;
    // clear the file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.value = '';
    }
    reset('polish-name-div');
};

// holds the message if there is an error with the file uploaded
const fileError = ref(null);

const getHexCode = (primaryColor) => {
    if (primaryColor.hex_code) {
        return primaryColor.hex_code;
    } else {
        return '#000000'; // default to black if no hex_code is provided
    }
};

onMounted(async () => {
    // check if user is logged in
    if (!authStore.getIsLoggedIn) {
        showModal();
    } else {
        // fetch brands from API
        try {
            const fetchedBrands = await fetchBrands();
            brands.value = fetchedBrands;
            colors.value = await fetchAllColors();
            formulas.value = await fetchAllFormulas();
        } catch (error) {
            console.error(error);
            displayErrorModal();
        }
    }
});

const send = async () => {
    try {
        schema.validateSync(polish);
        errorMessage.value = '';
        showErrorMessage.value = false;
        hiddenSpinner.value = false;
        const req = formatPolishSubmission(polish);
        const res = await submitPolish(req);
        if (res) {
            console.log(res);
            const submissionId = res.submission_id;
            // upload the file as well
            await submitPolishImage(polish.image, submissionId);
            hiddenSpinner.value = true;
            clearPolish();
            reset('polish-name-div');
            reset('description-div');
            displaySuccessModal();
        }
    } catch (error) {
        if (error.message === 'InvalidTokenError') {
            authStore.clearSessionData();
            router.push('/login');
        }
        errorMessage.value = error.message;
        showErrorMessage.value = true;
        hiddenSpinner.value = true;
    }
};

const focus = (divId) => {
    const div = document.getElementById(divId);
    const label = div.getElementsByTagName('label')[0];
    const input = div.getElementsByTagName('input')[0];
    input.style.borderBottom = '2px solid #212529';
    label.classList.add('custom-focus');
};

const blur = (divId) => {
    const div = document.getElementById(divId);
    const label = div.getElementsByTagName('label')[0];
    const input = div.getElementsByTagName('input')[0];
    const span = div.getElementsByTagName('small')[0];
    // check for input
    if (input.value.trim() === '') {
        label.classList.remove('custom-focus');
    }
    // check the validity of the input
    if (!input.checkValidity()) {
        input.style.borderBottom = '2px solid red';
        span.style.color = 'red';
    } else {
        input.style.borderBottom = '2px solid green';
        span.style.color = 'green';
    }
};

const reset = (divId) => {
    const div = document.getElementById(divId);
    const label = div.getElementsByTagName('label')[0];
    const input = div.getElementsByTagName('input')[0];
    const span = div.getElementsByTagName('small')[0];
    label.classList.remove('custom-focus');
    input.style.borderBottom = '2px solid #c0c0c0';
    span.style.color = 'black';
};

function showModal() {
    thisModal.value.show();
}

function displaySuccessModal() {
    successModal.value.show();
}

function displayErrorModal() {
    errorModal.value.show();
}

function displayAlreadyExistsModal() {
    subAlreadyExists.value.show();
}

function displayAlreadyExistsInDbModal() {
    alreadyInDb.value.show();
}

const selectBrand = async (brand) => {
    polish.brandName = brand.name;
};

const removeBrand = () => {
    polish.brandName = null;
};

const selectPrimaryColors = async (color) => {
    polish.primaryColor = color;
};

const removePrimaryColor = () => {
    polish.primaryColor = null;
};

const addEffectColor = async (color) => {
    polish.secondaryColors.push(color);
};

const removeEffectColor = async (color) => {
    polish.secondaryColors = polish.secondaryColors.filter((c) => c !== color);
};

const addFormula = async (formula) => {
    polish.selectedFormulas.push(formula);
};

const removeFormula = async (formula) => {
    polish.selectedFormulas = polish.selectedFormulas.filter((f) => f !== formula);
};

const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        fileError.value = 'Invalid file type. Please upload an image file (jpg, jpeg, png, gif)';
        polish.image = null;
    } else {
        fileError.value = null;
        polish.image = selectedFile;
    }
};
</script>

<style scoped>
@import url('../../../node_modules/nice-forms.css/dist/nice-forms.css');

label {
    position: absolute;
    transition: all 0.2s ease-in-out 0s;
    transform: translate3d(1px, 4px, 0px);
    font-size: medium;
    z-index: 1;
}

#main-div-polish-submit {
    background: linear-gradient(
        113.5deg,
        rgb(234, 234, 234) 22.3%,
        rgb(201, 234, 211) 56.6%,
        rgb(255, 180, 189) 90.9%
    );
}

#form-register {
    background-color: #ececec;
    color: black;
}

#override-btn:active {
    border-color: #a145ed;
    box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
}

.custom-input {
    padding-bottom: 10px;
    border: none;
    outline: none;
    border-bottom: 2px solid #c0c0c0;
    background-color: #ececec;
}
.custom-input:focus {
    border-bottom: 2px solid #8c92ac;
}

.custom-focus {
    position: absolute;
    transition: all 0.2s ease-in-out 0s;
    transform: translate3d(1px, -12px, 0px);
    font-size: 0.77rem;
    z-index: 1;
}
</style>
