<template>
    <div>
        <filter-by-stars v-if="filters.by_star"></filter-by-stars>

        <filter-by-main-stats v-if="filters.by_main"></filter-by-main-stats>

        <filter-by-sub-stats v-if="filters.by_sub"></filter-by-sub-stats>

        <filter-by-types v-if="filters.by_type"></filter-by-types>

        <filter-by-sets v-if="filters.by_set"></filter-by-sets>

        <h6
        v-if="stack_filters"
        class="text-light">
            Filters:
        </h6>

        <div
        v-if="stack_filters"
        class="font-italic text-light">
            <div
            :key="i"
            v-for="(active_filter,i) in [
                    {
                        title: 'Stars',
                        type: Object.keys(filters)[0],
                        filters: this.stars,
                        method: emptyStars
                    },
                    {
                        title: 'Main stats',
                        type: Object.keys(filters)[1],
                        filters: this.main_stats,
                        method: emptyMainStats
                    },
                    {
                        title: 'Sub stats',
                        type: Object.keys(filters)[2],
                        filters: this.sub_stats,
                        method: emptySubStats
                    },
                    {
                        title: 'Types',
                        type: Object.keys(filters)[3],
                        filters: this.types,
                        method: emptyTypes
                    },
                    {
                        title: 'Sets',
                        type: Object.keys(filters)[4],
                        filters: this.sets,
                        method: emptySets
                    }
                ]">
                <div v-if="stack_filters && active_filter.filters.length!=0">
                    <span class="font-weight-bold">
                        {{ active_filter.title }}:
                    </span>

                    <ul class="list-unstyled d-inline">
                        <li
                        :key="i"
                        v-for="(filter,i) in active_filter.filters"
                        style="text-shadow: 0px 0px 2px black;"
                        class="d-inline">
                            {{
                                filter+((active_filter.filters.length > 1 && i!=active_filter.filters.length-1) ? ',' : '')
                            }}
                        </li>

                        <button
                        style="font-size:10px"
                        class="btn py-0 px-1 mb-1 ml-1 mr-1 btn-primary d-inline"
                        @click="updateFilters(active_filter.type)">
                            <i class="fas fa-pen"></i>
                        </button>

                        <button
                        style="font-size:12px"
                        class="btn py-0 px-1 mb-1 ml-2 btn-danger d-inline"
                        @click="active_filter.method">
                            <i class="fas fa-times"></i>
                        </button>
                    </ul>
                </div>
            </div>

            <button
            class="btn btn-primary btn-sm mt-2"
            @click="applyFilters">
                Apply filters
            </button>
        </div>

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
    import filterByStars from './filters/filterByStars.vue';
    import filterByMainStats from './filters/filterByMainStats.vue';
    import filterBySubStats from './filters/filterBySubStats.vue';
    import filterByTypes from './filters/filterByTypes.vue';
    import filterBySets from './filters/filterBySets.vue';
    export default{
        name: 'inventoryFilters',
        components: {
            'filter-by-stars': filterByStars,
            'filter-by-main-stats': filterByMainStats,
            'filter-by-sub-stats': filterBySubStats,
            'filter-by-types': filterByTypes,
            'filter-by-sets': filterBySets
        },
        data(){
            return {
                confirm_delete: false,
                ids: []
            }
        },
        computed: {
            stack_filters(){
                return this.$store.state.artifacts.stack_filters
            },
            exclude_filters(){
                return this.$store.state.artifacts.exclude_filters
            },
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
                    this.$store.commit('artifacts/setDeleteIdsAll',[]);
                    this.ids=[];
                }
                else{
                    this.artifacts.forEach(artifact => {
                        if(!this.$store.state.artifacts.delete_ids.includes(artifact.id)){
                            this.ids.push(artifact.id)
                        }
                    });
                }

                this.$store.commit('artifacts/setDeleteIdsAll',this.ids);
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
            },
            applyFilters(){
                let artifacts=JSON.parse(localStorage.artifacts).reverse();
                this.$store.commit('artifacts/setArtifacts',artifacts);

                if(this.stars.length!=0){
                    this.$store.commit('artifacts/setArtifacts',
                        this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.stars.includes(artifact.info.stars)
                            : this.stars.includes(artifact.info.stars)));
                }
                if(this.main_stats.length!=0){
                    this.$store.commit('artifacts/setArtifacts',
                        this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.main_stats.includes(artifact.stats.main.name)
                            : this.main_stats.includes(artifact.stats.main.name)));
                }
                if(this.sub_stats.length!=0){
                    if(!this.exclude_filters){
                            if(!this.match_subs){
                                let artifacts=this.artifacts.filter(artifact => artifact.stats.subs.filter(sub => this.sub_stats.includes(sub.name)).length > 0);
                                this.$store.commit('artifacts/setArtifacts',artifacts);
                            }
                            else{
                                let artifacts=this.artifacts.filter(artifact => this.sub_stats.every(sub => artifact.stats.subs.map(stat => stat.name).includes(sub)));
                                this.$store.commit('artifacts/setArtifacts',artifacts);
                            }
                        }
                        else{
                            let artifacts=this.artifacts.filter(artifact => this.sub_stats.every(sub => !artifact.stats.subs.map(stat => stat.name).includes(sub)));
                            this.$store.commit('artifacts/setArtifacts',artifacts);
                        }
                }
                if(this.types.length!=0){
                    this.$store.commit('artifacts/setArtifacts',
                        this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.types.includes(artifact.info.piece.type)
                            : this.types.includes(artifact.info.piece.type)));
                }
                if(this.sets.length!=0){
                    this.$store.commit('artifacts/setArtifacts',
                        this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.sets.includes(artifact.info.set.name)
                            : this.sets.includes(artifact.info.set.name)));
                }

            },
            updateFilters(type){
                this.$store.commit('artifacts/setActiveFilter',type);
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