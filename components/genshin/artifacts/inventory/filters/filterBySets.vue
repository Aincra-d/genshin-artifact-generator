<template>
    <div>
        <div>
            <b-input-group class="w-100 d-inline-block ml-3 ml-lg-0 filter-select"
            :class="screen < 776 ? 'text-center' : 'text-left'">
                <b-dropdown
                :text="sets.length!=0 ? sets.length+' set(s) selected' : 'Select artifact set(s)'"
                variant="light"
                class="text-dark rounded-0">
                    <button
                    type="button"
                    class="btn btn-secondary btn-sm w-50 d-inline float-left rounded-0"
                    @click="selectAll">
                        Select all
                    </button>

                    <button
                    type="button"
                    class="btn btn-info btn-sm w-50 d-inline float-right rounded-0"
                    @click="filterBySets">
                        Apply
                    </button>

                    <input
                    type="text"
                    class="w-100 py-1 mt-1"
                    placeholder="Search/filters sets"
                    v-model="set_name">

                    <b-dropdown-item
                    :key="i"
                    v-for="(set,i) in artifact_sets"
                    @click.native.capture.stop="addSet(set.name)">
                        <i
                        class="fa-sm"
                        :class="sets.includes(set.name) ?
                        'fas fa-check-square' : 'far fa-square'">
                        </i>

                        {{ set.name }} ({{ set.count }})
                    </b-dropdown-item>
                </b-dropdown>
                
                <b-input-group-append class="d-inline">
                    <b-button
                    style="margin-left:-5px"
                    variant="danger"
                    @click="emptySets"
                    class="text-light">
                        <i class="fas fa-times"></i>
                    </b-button>
                </b-input-group-append>
            </b-input-group>
        </div>
    </div>
</template>

<script>
    import setsJ from '~/static/sets.json';

    export default{
        name: 'filterBySets',
        data(){
            return {
                artifact_set_names: setsJ.map(set => set.name),
                set_name: '',
                sets: []
            }
        },
        computed: {
            artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            stack_filters(){
                return this.$store.state.artifacts.stack_filters
            },
            exclude_filters(){
                return this.$store.state.artifacts.exclude_filters
            },
            // sets(){
            //     return this.$store.state.artifacts.active_filters['sets']
            // },
            screen(){
                return this.$store.state.artifacts.screen
            },
            artifact_sets(){
                return this.artifact_set_names.filter(set => set.name.toLowerCase().includes(this.set_name.toLowerCase()))
            }
        },
        methods: {
            setSets(){
                let sets=[];
                this.artifact_set_names.forEach(set => {
                    sets.push({
                        name: set,
                        count: this.artifacts.filter(artifact => artifact.info.set.name == set).length
                    });

                    this.artifact_set_names=sets;
                });
            },
            filterBySets(){
                if(!this.stack_filters){
                    this.resetArtifacts();
                    if(this.sets.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.sets.includes(artifact.info.set.name)
                            : this.sets.includes(artifact.info.set.name));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }

                console.log(this.$store.state.artifacts.active_filters['sets'])
            },
            addSet(set){
                this.$store.commit('artifacts/setActiveFilters',{type: 'sets', value: set})

                if(this.sets.includes(set)){
                    this.sets.splice(
                        this.sets.findIndex(item => item == set),1);
                }
                else{
                    this.sets.push(set);
                }
            },
            emptySets(){
                this.resetArtifacts();
                this.$store.commit('artifacts/setActiveFilters',{type: 'sets', value: null});
                this.sets=[];
            },
            resetArtifacts(){
                if(!this.stack_filters){
                    let artifacts=JSON.parse(localStorage.artifacts).reverse();
                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }
            },
            selectAll(){
                this.artifact_sets.forEach(set => {
                    this.$store.commit('artifacts/setActiveFilters',{type: 'sets', value: set.name})
                    this.addSet(set.name)
                });
            }
        },
        created(){
            this.setSets();
        }
    }
</script>

<style>
    .stars-filter div label{
        border-radius: 0;
    }
</style>