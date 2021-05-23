<template>
    <div>
        <artifact-search-modal
        ref="artifactSearchModal">    
        </artifact-search-modal>

        <sort-inventory
        v-tooltip="{content: 'Sort inventory', delay: {show:250}, hideOnTargetClick: true}"
        class="d-inline">
        </sort-inventory>

        <filter-inventory
        v-tooltip="{content: 'Filter inventory', delay: {show:250}, hideOnTargetClick: true}"
        class="d-inline">
        </filter-inventory>

        <change-view
        v-tooltip="{content: 'Change view', delay: {show:250}, hideOnTargetClick: true}"
        class="d-inline">
        </change-view>

        <!-- <inventory-settings class="d-inline"></inventory-settings> -->

        <button
        v-tooltip="{content: 'Search artifacts', delay: {show:250}, hideOnTargetClick: true}"
        type="button"
        class="btn text-light"
        @click="openModal">
            <i class="fas fa-search"></i>
        </button>

        <button
        v-tooltip="{content: 'Delete artifacts', delay: {show:250}, hideOnTargetClick: true}"
        type="button"
        class="btn text-light"
        @click="delete_artifacts=!delete_artifacts">
            <i
            :class="delete_artifacts && 'text-danger'"
            class="fas fa-trash"></i>
        </button>

        <button
        v-tooltip="{content: ('Show '+(!show_locked.show ? 'locked' : (show_locked.type == 'locked' ? 'unlocked' : 'all'))+' artifacts'), delay: {show:250}, hideOnTargetClick: true}"
        type="button"
        class="btn text-light"
        @click="showLocked(!show_locked.show ? 'locked' : (show_locked.type == 'locked' ? 'unlocked' : 'all'))">
            <i
            class="fas fa-lock"
            :class="show_locked.show && (show_locked.type == 'locked' ? 'text-danger' : 'text-secondary')"></i>
        </button>
    </div>
</template>

<script>
    import sortInventory from './manageInventory/sortInventory.vue';
    import filterInventory from './manageInventory/filterInventory.vue';
    import changeView from './manageInventory/changeView.vue';
    // import inventorySettings from './manageInventory/inventorySettings.vue';
    import artifactSearchModal from './filters/artifactSearchModal.vue';
    export default{
        name: 'manageInventory',
        components:{
            'sort-inventory': sortInventory,
            'filter-inventory': filterInventory,
            'change-view': changeView,
            // 'inventory-settings': inventorySettings,
            'artifact-search-modal': artifactSearchModal
        },
        data(){
            return {
                show_locked: {
                    show: false,
                    type: 'locked'
                }
            }
        },
        computed: {
            delete_artifacts: {
                get(){
                    return this.$store.state.artifacts.delete_artifacts
                },
                set(value){
                    this.$store.commit('artifacts/setDeleteArtifacts',value);
                }
            }
        },
        methods: {
            openModal() {
                this.$refs.artifactSearchModal.openModal();
            },
            showLocked(type){
                if(!this.show_locked.show){
                    this.show_locked.show=true;
                    let artifacts=JSON.parse(localStorage.artifacts).reverse().filter(artifact => artifact.info.locked);
                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }
                else{
                    if(this.show_locked.type == 'locked'){
                        this.show_locked.type='unlocked';
                        let artifacts=JSON.parse(localStorage.artifacts).reverse().filter(artifact => !artifact.info.locked);
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                    else{
                        this.show_locked.show=false;
                        this.show_locked.type='locked';
                        let artifacts=JSON.parse(localStorage.artifacts).reverse()
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            }
        }
    }
</script>

<style>
    .sort-icon, .filter-icon{
        text-shadow: inset 0px 0px 10px black;
    }

    legend{
        text-shadow: 0px 0px 2px black;
    }

    .sort-inventory .dropdown-menu{
        max-height: 250px !important;
        height: 250px !important;
        overflow-y: auto !important;
    }
</style>