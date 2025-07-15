<template>
    <div class="autocomplete">
        <input
            class="custom-input"
            type="text"
            v-model="inputValue"
            :placeholder="props.placeholder"
            @input="onInput"
            @focus="showSuggestions = true"
            @blur="showSuggestions = false"
        />
        <ul class="suggestions" v-if="matches.length && showSuggestions">
            <li
                class="option"
                v-for="match in matches"
                :key="match.id"
                @mousedown.prevent="selectSuggestion(match)"
            >
                {{ match.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');
const matches = ref([]);
const showSuggestions = ref(false);

const props = defineProps({
    suggestions: {
        type: Array,
        required: true,
    },
    onSelect: {
        type: Function,
        required: true,
    },
    placeholder: {
        type: String,
        required: false,
        default: 'Search...',
    },
});

const selectSuggestion = (suggestion) => {
    inputValue.value = suggestion.name;
    showSuggestions.value = true;
    matches.value = [];
    inputValue.value = '';
    props.onSelect(suggestion);
};

const onInput = () => {
    if (inputValue.value) {
        matches.value = props.suggestions.filter((suggestion) => {
            const name = suggestion.name;
            const query = inputValue.value.toLowerCase();
            return name.toLowerCase().includes(query);
        });
    } else {
        matches.value = [];
    }
};
</script>

<style scoped>
.custom-input {
    padding-bottom: 10px;
    border: none;
    outline: none;
    border-bottom: 2px solid #c0c0c0;
    background-color: #ececec;
    width: 100%;
}
.custom-input:focus {
    border-bottom: 2px solid #8c92ac;
}
.autocomplete {
    position: relative;
}

.suggestions {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    list-style: none;
    padding: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
}

.option:hover {
    background: #f1f1f1;
}
</style>
