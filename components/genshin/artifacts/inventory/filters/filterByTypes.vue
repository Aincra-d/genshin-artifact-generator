<template>
    <div>
        <div>
            <b-input-group class="w-100 d-inline-block ml-3 ml-lg-0 filter-select"
            :class="!stack ? (screen < 776 ? 'text-center' : 'text-left') : 'text-center'">
                <b-dropdown
                :size="screen < 576 ? 'sm' : 'md'"
                :text="types.length!=0 ? types.length+' type(s) selected' : 'Select artifact types'"
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
                    @click="filterByTypes">
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
                    @click="filterBytypes">
                        Delete
                    </button> -->

                    <b-dropdown-item
                    :key="i"
                    v-for="(type,i) in artifact_types"
                    @click.native.capture.stop="addType(type.name)"
                    class="font-xs-15">
                        <i
                        class="fa-sm"
                        :class="types.includes(type.name) ?
                        'fas fa-check-square' : 'far fa-square'">
                        </i>

                        {{ type.name }} <i class="fas fa-type text-warning fa-sm"></i>({{ type.count }})
                    </b-dropdown-item>
                </b-dropdown>
                
                <b-input-group-append class="d-inline">
                    <b-button
                    :size="screen < 576 ? 'sm' : 'md'"
                    style="margin-left:-5px"
                    variant="danger"
                    @click="emptyTypes"
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
        name: 'filterByTypes',
        props: {
            stack: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                artifact_types: ["Flower of Life","Plume of Death","Sands of Eon","Goblet of Eonothem","Circlet of Logos"],
                types: []
            }
        },
        computed: {
            artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            exclude_filter: {
                get(){
                    return this.$store.state.artifacts.active_filters[this.$store.state.artifacts.active_filters.findIndex(filt => filt.type == 'types')].exclude;
                },
                set(value){
                    this.$store.commit('artifacts/setExcludeFilter',{type: 'types',value: value});
                }
            },
            screen(){
                return this.$store.state.artifacts.screen
            },
        },
        methods: {
            setTypes(){
                let types=[];

                this.artifact_types.forEach(type => {
                    types.push({
                        name: type,
                        count: this.artifacts.filter(artifact => artifact.info.piece.type == type).length
                    });

                    this.artifact_types=types;
                });
            },
            addType(type){
                this.$store.commit('artifacts/setActiveFilters',{type: 'types', value: type})

                if(this.types.includes(type)){
                    this.types.splice(
                        this.types.findIndex(item => item == type),1);
                }
                else{
                    this.types.push(type);
                }
            },
            filterByTypes(type){
                this.$store.commit('artifacts/setActiveFilters',{type: 'types', value: type});

                if(!this.stack){
                    this.resetArtifacts();
                    if(this.types.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.exclude_filter
                            ? !this.types.includes(artifact.info.piece.type)
                            : this.types.includes(artifact.info.piece.type));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            },
            emptyTypes(){
                this.resetArtifacts();
                this.$store.commit('artifacts/setActiveFilters',{type: 'types', value: null});
                this.types=[];
            },
            resetArtifacts(){
                if(!this.stack){
                    let artifacts=JSON.parse(localStorage.artifacts).reverse();
                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }
            },
            selectAll(){
                this.artifact_types.forEach(type => {
                    this.addType(type.name);
                });
            }
        },
        created(){
            this.setTypes();
        }
    }
</script>

<style>
    /*.select-all-filter{
        box-shadow: 0px 0px 5px black;
    }
*/
    .types-filter div label{
        border-radius: 0;
    }

    .star-filter .dropdown-menu{
        width: 230px;
    }
</style>