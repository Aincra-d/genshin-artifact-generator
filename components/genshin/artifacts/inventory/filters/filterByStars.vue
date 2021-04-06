<template>
    <div>
        <div>
            <b-input-group class="w-100 d-inline-block ml-3 ml-lg-0 filter-select"
            :class="!stack ? (screen < 776 ? 'text-center' : 'text-left') : 'text-center'">
                <b-dropdown
                :size="screen < 576 ? 'sm' : 'md'"
                :text="stars.length!=0 ? /*stars.map(star => star)*/ stars.length+' rarity selected' : 'Select artifact rarity'"
                variant="light"
                class="text-dark rounded-0 star-filter">
                    <button
                    type="button"
                    :class="stack ? 'w-50' : 'w-30'"
                    class="btn btn-secondary btn-sm d-inline float-left rounded-0"
                    @click="selectAll">
                        All
                    </button>

                    <button
                    v-if="!stack"
                    type="button"
                    class="btn btn-info btn-sm w-30 d-inline float-left rounded-0"
                    @click="filterByStars">
                        Apply
                    </button>

                    <button
                    type="button"
                    :class="stack ? 'w-50' : 'w-40'"
                    class="btn btn-primary btn-sm d-inline float-left rounded-0"
                    @click="exclude_filter=!exclude_filter">
                        <i
                        class="fa-sm"
                        :class="exclude_filter ? 'fas fa-check-square' : 'far fa-square'"></i>
                        Exclude
                    </button>

                    <!-- <button
                    v-if="!stack"
                    type="button"
                    class="btn btn-danger btn-sm w-33 d-inline float-left rounded-0"
                    @click="filterByStars">
                        Delete
                    </button> -->

                    <b-dropdown-item
                    :key="i"
                    v-for="(star,i) in artifact_stars"
                    @click.native.capture.stop="addStar(star.name)"
                    class="font-xs-15">
                        <i
                        class="fa-sm"
                        :class="stars.includes(star.name) ?
                        'fas fa-check-square' : 'far fa-square'">
                        </i>

                        {{ star.name }} <i class="fas fa-star text-warning fa-sm"></i> ({{ star.count }})
                    </b-dropdown-item>
                </b-dropdown>
                
                <b-input-group-append class="d-inline">
                    <b-button
                    :size="screen < 576 ? 'sm' : 'md'"
                    style="margin-left:-5px"
                    variant="danger"
                    @click="emptyStars"
                    class="text-light">
                        <i class="fas fa-times"></i>
                    </b-button>
                </b-input-group-append>
            </b-input-group>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'filterByStars',
        props: {
            stack: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                artifact_stars: [1,2,3,4,5],
                stars: []
            }
        },
        computed: {
            artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            exclude_filter: {
                get(){
                    return this.$store.state.artifacts.active_filters[this.$store.state.artifacts.active_filters.findIndex(filt => filt.type == 'stars')].exclude;
                },
                set(value){
                    this.$store.commit('artifacts/setExcludeFilter',{type: 'stars',value: value});
                }
            },
            screen(){
                return this.$store.state.artifacts.screen
            },
        },
        methods: {
            setStars(){
                let stars=[];

                this.artifact_stars.forEach(star => {
                    stars.push({
                        name: star,
                        count: this.artifacts.filter(artifact => artifact.info.stars == star).length
                    });

                    this.artifact_stars=stars;
                });
            },
            addStar(star){
                this.$store.commit('artifacts/setActiveFilters',{type: 'stars', value: star})

                if(this.stars.includes(star)){
                    this.stars.splice(
                        this.stars.findIndex(item => item == star),1);
                }
                else{
                    this.stars.push(star);
                }
            },
            filterByStars(star){
                this.$store.commit('artifacts/setActiveFilters',{type: 'stars', value: star});

                if(!this.stack){
                    this.resetArtifacts();
                    if(this.stars.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.exclude_filter
                            ? !this.stars.includes(artifact.info.stars)
                            : this.stars.includes(artifact.info.stars));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            },
            emptyStars(){
                this.resetArtifacts();
                this.$store.commit('artifacts/setActiveFilters',{type: 'stars', value: null});
                this.stars=[];
            },
            resetArtifacts(){
                if(!this.stack){
                    let artifacts=JSON.parse(localStorage.artifacts).reverse();
                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }
            },
            selectAll(){
                this.artifact_stars.forEach(star => {
                    this.addStar(star.name);
                });
            }
        },
        created(){
            this.setStars();
        }
    }
</script>

<style>
    /*.select-all-filter{
        box-shadow: 0px 0px 5px black;
    }
*/
    .stars-filter div label{
        border-radius: 0;
    }

    .star-filter .dropdown-menu{
        width: 220px;
    }
</style>