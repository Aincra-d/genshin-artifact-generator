<template>
    <div>
        <div class="pagination-container text-center mt-2 text-light">
            <h6>
                All pages: {{ all_pages }} | Current page: {{ current_page }}
            </h6>

            <button
            v-if="current_page > 2"
            type="button"
            class="btn btn-light"
            @click="updateCurrentPage(1)">
                <i class="fas fa-angle-double-left"></i> First
            </button>

            <button
            v-if="current_page > 1"
            type="button"
            class="btn btn-light"
            @click="updateCurrentPage(current_page - 1)">
                <i class="fas fa-angle-left"></i> Prev
            </button>

            <button
            v-if="current_page < all_pages"
            type="button"
            class="btn btn-light"
            @click="updateCurrentPage(current_page + 1)">
                Next <i class="fas fa-angle-right"></i>
            </button>

            <button
            v-if="all_pages > 2 && current_page < all_pages-1"
            type="button"
            class="btn btn-light"
            @click="updateCurrentPage(all_pages)">
                Last <i class="fas fa-angle-double-right"></i>
            </button>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'pagination',
        props: {
            all_pages: Number,
            current_page: Number
        },
        methods: {
            updateCurrentPage(current_page){
                this.$emit('update-current-page',current_page);
            }
        }
    }
</script>