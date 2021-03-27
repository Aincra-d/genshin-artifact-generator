<template>
    <div>
        <ui-modal
        @close="restoreScroll"
        style="height:100vh;"
        alignTop
        :alignTopMargin="screen < 576 ? 0 : 50"
        :max-height="100"
        removeHeader
        title="Search artifacts"
        ref="artifactSearchModal"
        class="text-light text-center search-modal">
            <div class="w-100 bg-dark text-center text-light p-1 search-container">
                <h6>Select artifact rarity</h6>
                <filter-by-stars
                stack
                class="mb-4"></filter-by-stars>
                <hr :class="hr_styles">

                <h6>Select main stats</h6>
                <filter-by-main-stats
                stack
                class="mb-4"></filter-by-main-stats>
                <hr :class="hr_styles">

                <h6>Select sub stats</h6>
                <filter-by-sub-stats
                stack
                class="mb-4"></filter-by-sub-stats>
                <hr :class="hr_styles">

                <h6>Select artifact types</h6>
                <filter-by-types
                stack
                class="mb-4"></filter-by-types>
                <hr :class="hr_styles">

                <h6>Select artifact sets</h6>
                <filter-by-sets
                stack
                class="mb-4"></filter-by-sets>
                <hr :class="hr_styles">

                <div slot="footer" class="mt-3 p-2">
                    <button
                    type="button"
                    class="btn btn-primary btn-sm px-4"
                    @click="applyFilters">
                        Apply filters
                    </button>

                    <b-form-checkbox
                    v-model="exclude_filters"
                    button
                    button-variant="outline-light"
                    class="d-inline rounded-0"
                    size="sm"
                    name="buttons-2">
                        <i
                        class="fa-sm"
                        :class="exclude_filters ? 'fas fa-check-square' : 'far fa-square'"></i>
                        Exclude filters
                    </b-form-checkbox>
                </div>
            </div>
        </ui-modal>
    </div>
</template>

<script>
    import filterByStars from './filterByStars.vue';
    import filterByMainStats from './filterByMainStats.vue';
    import filterBySubStats from './filterBySubStats.vue';
    import filterByTypes from './filterByTypes.vue';
    import filterBySets from './filterBySets.vue';
    export default{
        name: 'artifactSearchModal',
        components: {
            'filter-by-stars': filterByStars,
            'filter-by-main-stats': filterByMainStats,
            'filter-by-sub-stats': filterBySubStats,
            'filter-by-types': filterByTypes,
            'filter-by-sets': filterBySets
        },
        computed: {
            active_filters(){
                return this.$store.state.artifacts.active_filters
            },
            exclude_filters: {
                get(){
                    return this.$store.state.artifacts.exclude_filters
                },
                set(value){
                    this.$store.commit('artifacts/setFilterType',value);

                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: '<h6>Changed filter type to '+(value ? 'exclude' : 'include')+'</h6>'
                    });
                }
            },
            match_subs: {
                get(){
                    return this.$store.state.artifacts.match_subs
                },
                set(value){
                    this.$store.commit('artifacts/setMatchSubs',value);
                }
            },
            screen(){
                return this.$store.state.artifacts.screen
            }
        },
        data(){
            return {
                hr_styles: 'bg-light w-60 mx-auto'
            }
        },
        methods: {
            openModal() {
                this.$refs['artifactSearchModal'].open();
            },
            applyFilters(){
                let artifacts=JSON.parse(localStorage.artifacts).reverse();
                this.$store.commit('artifacts/setArtifacts',artifacts);

                if(this.active_filters['stars'].length!=0){
                    artifacts=artifacts.filter(artifact => this.exclude_filters
                        ? !this.active_filters['stars'].includes(artifact.info.stars)
                        : this.active_filters['stars'].includes(artifact.info.stars));

                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }
                if(this.active_filters['main_stats'].length!=0){
                    artifacts=artifacts.filter(artifact => this.exclude_filters
                        ? !this.active_filters['main_stats'].includes(artifact.stats.main.name)
                        : this.active_filters['main_stats'].includes(artifact.stats.main.name));

                    this.$store.commit('artifacts/setArtifacts', artifacts);
                }
                if(this.active_filters['sub_stats'].length!=0){
                    if(!this.exclude_filters){
                            if(!this.match_subs){
                                artifacts=artifacts.filter(artifact => artifact.stats.subs.filter(sub => this.active_filters['sub_stats'].includes(sub.name)).length > 0);

                                this.$store.commit('artifacts/setArtifacts', artifacts);
                            }
                            else{
                                artifacts=artifacts.filter(artifact => this.active_filters['sub_stats'].every(sub => artifact.stats.subs.map(stat => stat.name).includes(sub)));

                                this.$store.commit('artifacts/setArtifacts', artifacts);
                            }
                        }
                        else{
                            artifacts=artifacts.filter(artifact => this.active_filters['sub_stats'].every(sub => !artifact.stats.subs.map(stat => stat.name).includes(sub)));

                            this.$store.commit('artifacts/setArtifacts', artifacts);
                        }
                }
                if(this.active_filters['types'].length!=0){
                    artifacts=artifacts.filter(artifact => this.exclude_filters
                        ? !this.active_filters['types'].includes(artifact.info.piece.type)
                        : this.active_filters['types'].includes(artifact.info.piece.type));

                    this.$store.commit('artifacts/setArtifacts', artifacts);
                }
                if(this.active_filters['sets'].length!=0){
                    artifacts=artifacts.filter(artifact => this.exclude_filters
                        ? !this.active_filters['sets'].includes(artifact.info.set.name)
                        : this.active_filters['sets'].includes(artifact.info.set.name));

                    this.$store.commit('artifacts/setArtifacts', artifacts);
                }

                console.log(this.active_filters)
            },
            restoreScroll(){
                document.getElementsByTagName('body')[0].style.overflowY = 'auto';
            }
        }
    }
</script>

<style scoped>
    .search-container{
        max-height:80vh;
    }
</style>