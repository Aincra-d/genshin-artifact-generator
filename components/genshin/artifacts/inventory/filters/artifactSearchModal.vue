<template>
    <div>
        <ui-modal
        transition="scale-up"
        @close="restoreScroll"
        style="height:100vh;"
        alignTop
        :alignTopMargin="screen < 576 ? 0 : 50"
        :max-height="100"
        removeHeader
        title="Search artifacts"
        ref="artifactSearchModal"
        class="text-light text-center search-modal">
            <div class="w-100 text-center text-light p-1 search-container">
                <h3 class="mb-3">
                    Search artifacts
                </h3>

                <p>
                    Apply multiple conditions to filter your inventory.
                </p>



                <h6>Select artifact rarity</h6>

                <filter-by-stars stack class="mb-4">
                </filter-by-stars>

                <hr :class="hr_styles">



                <h6>Select main stats</h6>

                <filter-by-main-stats stack class="mb-4">
                </filter-by-main-stats>

                <hr :class="hr_styles">



                <h6>Select sub stats</h6>

                <filter-by-sub-stats stack class="mb-4">
                </filter-by-sub-stats>

                <hr :class="hr_styles">



                <h6>Select artifact types</h6>

                <filter-by-types stack class="mb-4">
                </filter-by-types>

                <hr :class="hr_styles">



                <h6>Select artifact sets</h6>

                <filter-by-sets stack class="mb-4">
                </filter-by-sets>

                <hr :class="hr_styles">



                <h6>Select characters</h6>

                <filter-by-equipped stack class="mb-4">
                </filter-by-equipped>

                <hr :class="hr_styles">

                <div slot="footer" class="mt-3 p-2">
                    <button
                    type="button"
                    class="btn btn-primary btn-sm px-5"
                    @click="applyFilters">
                        Apply filters
                    </button>
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
    import filterByEquipped from './filterByEquipped.vue';
    export default{
        name: 'artifactSearchModal',
        components: {
            'filter-by-stars': filterByStars,
            'filter-by-main-stats': filterByMainStats,
            'filter-by-sub-stats': filterBySubStats,
            'filter-by-types': filterByTypes,
            'filter-by-sets': filterBySets,
            'filter-by-equipped': filterByEquipped
        },
        computed: {
            active_filters(){
                return this.$store.state.artifacts.active_filters.map(filter => filter.data);
            },
            exclude_filters(type){
                return this.$store.state.artifacts.active_filters.map(filter => filter.exclude);
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

                if(this.active_filters[0].length!=0){
                    artifacts=artifacts.filter(artifact => this.exclude_filters[0]
                        ? !this.active_filters[0].includes(artifact.info.stars)
                        : this.active_filters[0].includes(artifact.info.stars));

                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }

                if(this.active_filters[1].length!=0){
                    artifacts=artifacts.filter(artifact => this.exclude_filters[1]
                        ? !this.active_filters[1].includes(artifact.stats.main.name)
                        : this.active_filters[1].includes(artifact.stats.main.name));

                    this.$store.commit('artifacts/setArtifacts', artifacts);
                }

                if(this.active_filters[2].length!=0){
                    if(!this.exclude_filters[2]){
                            if(!this.match_subs){
                                artifacts=artifacts.filter(artifact => artifact.stats.subs.filter(sub => this.active_filters[2].includes(sub.name)).length > 0);

                                this.$store.commit('artifacts/setArtifacts', artifacts);
                            }
                            else{
                                artifacts=artifacts.filter(artifact => this.active_filters[2].every(sub => artifact.stats.subs.map(stat => stat.name).includes(sub)));

                                this.$store.commit('artifacts/setArtifacts', artifacts);
                            }
                        }
                        else{
                            artifacts=artifacts.filter(artifact => this.active_filters[2].every(sub => !artifact.stats.subs.map(stat => stat.name).includes(sub)));

                            this.$store.commit('artifacts/setArtifacts', artifacts);
                        }
                }

                if(this.active_filters[3].length!=0){
                    artifacts=artifacts.filter(artifact => this.exclude_filters[3]
                        ? !this.active_filters[3].includes(artifact.info.piece.type)
                        : this.active_filters[3].includes(artifact.info.piece.type));

                    this.$store.commit('artifacts/setArtifacts', artifacts);
                }

                if(this.active_filters[4].length!=0){
                    artifacts=artifacts.filter(artifact => this.exclude_filters[4]
                        ? !this.active_filters[4].includes(artifact.info.set.name)
                        : this.active_filters[4].includes(artifact.info.set.name));

                    this.$store.commit('artifacts/setArtifacts', artifacts);
                }

                if(this.active_filters[5].length!=0){
                    artifacts=artifacts.filter(artifact => artifact.info.equipped !== false && this.exclude_filters[5]
                        ? !this.active_filters[5].includes(artifact.info.equipped.name)
                        : this.active_filters[5].includes(artifact.info.equipped.name));

                    this.$store.commit('artifacts/setArtifacts', artifacts);
                }

                this.$refs.artifactSearchModal.close();
            },
            restoreScroll(){
                document.getElementsByTagName('body')[0].style.overflowY = 'auto';
            }
        }
    }
</script>

<style>
    .search-modal .ui-modal__body,.search-modal .ui-modal__header{
        background: #353b49 !important;
    }

    @media(max-width: 576px){
        .search-modal .ui-modal__body{
            max-height:80vh;
        }
    }

    @media(min-width: 576px){
        .search-modal .ui-modal__body{
            max-height:100vh;
        }
    }

    .search-modal .ui-modal__body{
        overflow-x: hidden;
    }
</style>