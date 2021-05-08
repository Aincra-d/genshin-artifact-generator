<template>
    <div>
        <div>
            <b-input-group class="w-100 d-inline-block ml-3 ml-lg-0 filter-select"
            :class="!stack ? (screen < 776 ? 'text-center' : 'text-left') : 'text-center'">
                <b-input-group-prepend class="d-inline">
                    <b-button
                    :size="screen < 576 ? 'sm' : 'md'"
                    style="margin-right:-5px"
                    variant="secondary"
                    @click="toggled=!toggled"
                    class="text-light">
                        <i :class="toggled ? 'fas fa-angle-up' : 'fas fa-angle-down'"></i>
                    </b-button>
                </b-input-group-prepend>

                <b-dropdown
                :size="screen < 576 ? 'sm' : 'md'"
                :text="sets.length!=0 ? sets.length+' set(s) selected' : 'Select artifact set(s)'"
                variant="light"
                class="text-dark rounded-0 set-filter">
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
                    @click="filterBySets">
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

                    <input
                    type="text"
                    class="w-100 py-0 mt-1"
                    placeholder="Search/filter sets"
                    v-model="set_name">

                    <b-dropdown-item
                    :key="i"
                    v-for="(set,i) in artifact_sets"
                    @click.native.capture.stop="addSet(set.name)"
                    class="font-xs-15">
                        <i
                        class="fa-sm"
                        :class="sets.includes(set.name) ?
                        'fas fa-check-square' : 'far fa-square'">
                        </i>

                        <img
                        v-lazy="set.image"
                        :alt="set.name"
                        style="width:25px; height:25px;"
                        class="rounded">

                        {{ set.name }} ({{ set.count }})
                    </b-dropdown-item>
                </b-dropdown>
                
                <b-input-group-append class="d-inline">
                    <b-button
                    :size="screen < 576 ? 'sm' : 'md'"
                    style="margin-left:-5px"
                    variant="danger"
                    @click="emptySets"
                    class="text-light">
                        <i class="fas fa-times"></i>
                    </b-button>
                </b-input-group-append>
            </b-input-group>

            <zoom-y-transition :duration="250">
                <div
                v-if="toggled"
                class="text-light">
                    Selected sets: 
                    <ul class="d-inline ml-2 p-0">
                        <li
                        :key="i"
                        v-for="(set,i) in sets"
                        class="d-inline pointer"
                        @click="sets.splice(sets.findIndex(_set => _set == set),1)">
                            {{ set }} |
                        </li>
                    </ul>
                </div>
            </zoom-y-transition>
        </div>
    </div>
</template>

<script>
    import setsJSON from '~/static/sets.json';

    export default{
        name: 'filterBySets',
        props: {
            stack: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                artifact_set_names: setsJSON.map(set => set.name),
                all_sets: setsJSON,
                set_name: '',
                sets: [],
                toggled: false
            }
        },
        computed: {
            artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            exclude_filter: {
                get(){
                    return this.$store.state.artifacts.active_filters[this.$store.state.artifacts.active_filters.findIndex(filt => filt.type == 'sets')].exclude;
                },
                set(value){
                    this.$store.commit('artifacts/setExcludeFilter',{type: 'sets',value: value});
                }
            },
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
                this.all_sets.forEach(set => {
                    sets.push({
                        name: set.name,
                        image: set.image,
                        count: this.artifacts.filter(artifact => artifact.info.set.name == set.name).length
                    });

                    this.artifact_set_names=sets;
                });
            },
            filterBySets(){
                if(!this.stack){
                    this.resetArtifacts();
                    if(this.sets.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.exclude_filter
                            ? !this.sets.includes(artifact.info.set.name)
                            : this.sets.includes(artifact.info.set.name));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }

                // console.log(this.$store.state.artifacts.active_filters['sets'])
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
                if(!this.stack){
                    let artifacts=JSON.parse(localStorage.artifacts).reverse();
                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }
            },
            selectAll(){
                this.artifact_sets.forEach(set => {
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

    @media(max-width: 576px){
        .filter-select .dropdown-menu{
            left:-25% !important;
        }
    }

    .set-filter .dropdown-menu{
        min-width: 230px;
    }
</style>