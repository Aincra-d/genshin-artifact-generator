<template>
    <div>
        <collapse-transition>
            <filter-by-stars v-if="filters.by_star">
            </filter-by-stars>
        </collapse-transition>

        <collapse-transition>
            <filter-by-main-stats v-if="filters.by_main">
            </filter-by-main-stats>
        </collapse-transition>

        <collapse-transition>
            <filter-by-sub-stats v-if="filters.by_sub">
            </filter-by-sub-stats>
        </collapse-transition>

        <collapse-transition>
            <filter-by-types v-if="filters.by_type">
            </filter-by-types>
        </collapse-transition>

        <collapse-transition>
            <filter-by-sets v-if="filters.by_set">
            </filter-by-sets>
        </collapse-transition>

        <collapse-transition>
            <filter-by-equipped v-if="filters.by_character">
            </filter-by-equipped>
        </collapse-transition>

        <button
        v-if="delete_artifacts"
        type="button"
        class="btn btn-sm btn-outline-danger rounded-0 mt-3"
        @click="confirm_delete = !confirm_delete">
            <i class="fas fa-times"></i> Delete selected artifacts
        </button>

        <button
        v-if="delete_artifacts"
        type="button"
        class="btn btn-sm btn-outline-light rounded-0 mt-3"
        @click="selectAllArtifacts">
            Select all
        </button>

        <div v-if="delete_artifacts && confirm_delete">
            <h6 class="text-warning font-weight-bold">
                Are you sure you want to delete {{ delete_ids.length }} selected artifacts?
            </h6>

            <ul class="list-unstyled">
                <li class="d-inline">
                    <button
                    type="button"
                    class="btn btn-sm btn-danger rounded-0"
                    @click="deleteArtifacts">
                        <i class="fas fa-times"></i> Delete
                    </button>
                </li>

                <li class="d-inline">
                    <button
                    type="button"
                    class="btn btn-sm btn-secondary text-light d-inline rounded-0 mx-1"
                    @click="confirm_delete = false">
                        <i class="fas fa-times fa-sm mr-1"></i> Cancel
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    const filterByStars = () => import('./filters/filterByStars.vue');
    const filterByMainStats = () => import('./filters/filterByMainStats.vue');
    const filterBySubStats = () => import('./filters/filterBySubStats.vue');
    const filterByTypes = () => import('./filters/filterByTypes.vue');
    const filterBySets = () => import('./filters/filterBySets.vue');
    const filterByEquipped = () => import('./filters/filterByEquipped.vue');
    export default{
        name: 'inventoryFilters',
        components: {
            'filter-by-stars': filterByStars,
            'filter-by-main-stats': filterByMainStats,
            'filter-by-sub-stats': filterBySubStats,
            'filter-by-types': filterByTypes,
            'filter-by-sets': filterBySets,
            'filter-by-equipped': filterByEquipped
        },
        data(){
            return {
                confirm_delete: false,
                ids: []
            }
        },
        computed: {
            filters(){
                return this.$store.state.artifacts.filters
            },
            screen(){
                return this.$store.state.artifacts.screen
            },
            artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            delete_ids(){
                return this.$store.state.artifacts.delete_ids
            },
            delete_artifacts(){
                return this.$store.state.artifacts.delete_artifacts
            },
        },
        methods: {
            selectAllArtifacts(){
                if(this.artifacts.length == this.delete_ids.length){
                    this.$store.commit('artifacts/setDeleteIdsAll',null);
                }
                else{
                    this.$store.commit('artifacts/setDeleteIdsAll',1);
                }
            },
            deleteArtifacts(){
                let artifacts=JSON.parse(localStorage.artifacts) || [];
                let original_size=artifacts.length;

                artifacts=artifacts.filter(artifact => !this.delete_ids.includes(artifact.id));

                this.$store.commit('artifacts/setArtifacts',this.artifacts.filter(artifact => !this.delete_ids.includes(artifact.id)));
                
                localStorage.setItem('artifacts',JSON.stringify(artifacts));

                this.$store.commit('artifacts/setDeleteArtifacts',false);

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Deleted '+(original_size - artifacts.length)+' artifacts from inventory!</h6>'
                });

                this.$store.commit('artifacts/setInventorySize');
            }
        }
    }
</script>

<style>
    /*.select .ui-select__content *{
        max-width: 100vw !important;
    }*/

    .filter-select label{
        border-radius: 0;
    }

    .filter-select .dropdown-toggle{
        color:black;
        border-radius: 0;
    }

    .filter-select .dropdown-menu{
        max-height:300px;
        overflow-y: auto;
    }

    @media(max-width: 576px){
        .filter-select .dropdown-menu{
            /*left:-50%;*/
        }
    }

    .ui-select.is-multiple .ui-select__display-value{
        white-space: nowrap;
        max-width: 250px;
        overflow-x: auto;
    }

    .select{
        background-color: white;
        /*border-radius: 10px;*/
    }

    .sub-filter-type .btn{
        border-radius: 10px;
    }

    .select .ui-select__display-value, .select .ui-select__content *{
        color: black !important;
    }

    .stars-filter, .type-filter{
        text-shadow: 0px 0px 2px black;
    }

    .stars-filter label span:after{
        content: '⭐';
    }
</style>