<script setup lang="ts">
import { ref, watch } from 'vue';
import { fetchData } from './main.js';
import 'vue-json-pretty/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const searchTerm = ref('');
const searchCategory = ref('/authors/');
const searchQuery = ref('');
const searchCategoryQuery = ref('/authors/');
const data = ref<any[]>([]); 
const isLoading = ref(false);

watch([searchQuery, searchCategoryQuery], async ([newTerm, newCategory]) => {
  if (newTerm.trim()) {
    isLoading.value = true;
    data.value = await fetchData(newTerm, newCategory);
    isLoading.value = false;
    console.log("Search performed, data received:", data.value);
  } else {
    data.value = [];
  }
}, { immediate: true });

const performSearch = () => {
  searchQuery.value = searchTerm.value;
  searchCategoryQuery.value = searchCategory.value;
};
</script>

<template>
  <div class="app-ultra-minimal text-light min-vh-100 d-flex flex-column align-items-center justify-content-center px-3">
    <div class="col-12 col-md-10 col-lg-8">
        <h1 class="text-custom-red fw-light fs-3 mb-2 text-center text-uppercase tracking-wide">Cdex-pages</h1>
        <p class="text-muted small mb-5 text-center">
            The first API call may take a moment.
        </p>

        <div class="input-group input-group-lg search-line-minimal mb-4">
            <select 
                v-model="searchCategory"
                class="form-select bg-transparent text-custom-red border-end-0 fw-bold minimal-select-ultra"
                style="max-width: 150px;"
            >
                <option value="/authors/">Authors</option>
                <option value="/worlds/">Worlds</option>
                <option value="/series/">Series</option>
                <option value="/characters/">Characters</option>
                <option value="/quotes/">Quotes</option>
            </select>
            
            <input
                type="text"
                v-model="searchTerm"
                placeholder="Search entries..."
                class="form-control bg-transparent text-light border-start-0 border-end-0 minimal-input-ultra"
                @keyup.enter="performSearch" 
            />

            <button 
                @click="performSearch" 
                class="btn btn-outline-custom-red px-4 fw-light minimal-btn-ultra"
                :disabled="!searchTerm.trim() || isLoading"
            >
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ isLoading ? 'Loading...' : 'Search' }}
            </button>
        </div>

        <div v-if="isLoading" class="text-center text-custom-red py-4">
            <div class="spinner-border text-custom-red" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 small text-muted">Fetching data...</p>
        </div>

        <ul v-else-if="data && data.length" class="list-group list-group-flush border-top border-bottom border-secondary mt-3">
            <li 
                v-for="(item, index) in data" 
                :key="item.id" 
                :class="['list-group-item bg-transparent text-muted px-2 py-3', { 'border-top-0': index !== 0 }]"
            >
                <pre class="d-block text-break text-light p-2 mb-0 result-pre">{{ Object.entries(item).map(([key, value]) => `${key}: ${value}`).join('\n') }}</pre>
            </li>
        </ul> 

        <p v-else-if="searchQuery.trim() && !data.length && !isLoading" class="text-center text-muted p-5">
            No results found for "<span class="text-custom-red fw-bold">{{ searchQuery }}</span>".
        </p>
    </div>
  </div>
</template>

<style>
.app-ultra-minimal {
  background-color: #000000 !important;
}

.bg-transparent {
    background-color: #111111 !important;
}

.text-custom-red {
    color: #7b0000 !important;
}
.btn-outline-custom-red {
    color: #7b0000;
    border-color: #7b0000;
}
.btn-outline-custom-red:hover {
    color: #fff;
    background-color: #7b0000;
    border-color: #7b0000;
}
.spinner-border.text-custom-red {
    color: #7b0000 !important;
}

.search-line-minimal .form-control,
.search-line-minimal .form-select,
.search-line-minimal .btn {
    border-color: #333333 !important;
    border-radius: 0 !important;
}

.minimal-input-ultra:focus, 
.minimal-select-ultra:focus,
.minimal-btn-ultra:hover {
  box-shadow: none !important;
  border-color: #7b0000 !important;
}

.search-line-minimal .form-select {
    border-top-left-radius: 6px !important;
    border-bottom-left-radius: 6px !important;
}

.search-line-minimal .minimal-btn-ultra {
    border-top-right-radius: 6px !important;
    border-bottom-right-radius: 6px !important;
}

.tracking-wide {
    letter-spacing: 0.25em;
}

.result-pre {
    background-color: #0c0c0c !important;
    border: 1px solid #1a1a1a;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
    padding: 1rem !important;
    line-height: 1.4;
}
.list-group-item {
    border-color: #1a1a1a !important;
}
</style>
