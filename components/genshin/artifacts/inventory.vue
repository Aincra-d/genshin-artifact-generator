<template>
    <div>
        <artifact-modal
        v-if="artifacts.length!=0"
        ref="artifactModal">    
        </artifact-modal>

        <div
        class="manage-inventory"
        :class="screen > 576 && screen < 776 ? 'text-center' : 'text-left'">
            <manage-inventory></manage-inventory>
        </div>

        
        <inventory-filters class="ml-0 ml-md-3 mb-2">
        </inventory-filters>

        <div class="inventory-container">
            <zoom-x-transition group>
                <artifact
                :inventory="true"
                :view="view"
                :class="view != 'images'
                ? 'd-inline-block col-12 col-sm-8 col-md-9 col-lg-6 col-xl-4 my-2'
                : 'd-inline-block'"
                :key="artifact.id"
                v-for="artifact in artifacts.slice((current_page*per_page-per_page),(current_page*per_page))"
                :artifact="artifact"
                @open-modal="openModal">
                </artifact>
            </zoom-x-transition>

            <pagination
            v-if="all_pages > 1"
            :current_page="current_page"
            :all_pages="all_pages"
            @update-current-page="updateCurrentPage">
            </pagination>

            <p
            v-if="artifacts.length === 0"
            class="text-light h5">
                There are no artifacts in your inventory, or there are no results for your applied filter(s).
            </p>

            <div
            v-if="inventory_size != artifacts.length"
            class="w-100 text-center mt-3">
                <button
                v-tooltip="{content: 'Set inventory back to its original state', delay: {show:250}, hideOnTargetClick: true}"
                @click="resetInventory()"
                type="button"
                class="btn btn-light btn-sm">
                    Reset inventory
                </button>
            </div>

        </div>
    </div>
</template>

<script>
    const artifact = () => import('@/components/genshin/artifacts/artifact.vue');
    import manageInventory from '@/components/genshin/artifacts/inventory/manageInventory.vue';
    import inventoryFilters from '@/components/genshin/artifacts/inventory/filters.vue';
    const artifactModal = () => import('@/components/genshin/artifacts/inventory/artifactModal.vue');
    const pagination = () => import('@/components/genshin/artifacts/inventory/pagination.vue');

    export default{
        name: 'artifactInventory',
        components: {
            artifact,
            'manage-inventory': manageInventory,
            'inventory-filters': inventoryFilters,
            'artifact-modal': artifactModal,
            pagination
        },
        data(){
            return {
                current_page: 1,
                per_page: 50
            }
        },
        computed: {
            artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            view(){
                return this.$store.state.artifacts.view
            },
            screen(){
                return this.$store.state.artifacts.screen
            },
            all_pages(){
                return Math.ceil(this.artifacts.length/50);
            },
            inventory_size(){
                return this.$store.state.artifacts.inventory_size
            }
        },
        methods: {
            updatePages(){
                let artifacts=this.artifacts;
                this.all_pages = Math.ceil(artifacts.length/this.per_page);
            },
            updateCurrentPage(current_page){
                this.current_page=current_page;
            },
            resetInventory(){
                this.$store.commit('artifacts/setArtifacts',JSON.parse(localStorage.artifacts).reverse());
            },
            openModal(ref,id) {
                this.$refs.artifactModal.openModal(ref,id)
            }
        },
        mounted(){
            this.all_pages=Math.ceil(this.artifacts.length/50);
        }
    }
</script>