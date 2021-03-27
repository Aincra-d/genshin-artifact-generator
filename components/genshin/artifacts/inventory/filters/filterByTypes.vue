<template>
    <div>
        <b-form-group
        class="text-light stars-filter"
        :label="!stack && 'Select artifact type to show'">
            <b-form-checkbox
            :key="i"
            v-for="(type,i) in artifact_types"
            button
            @input="filterByTypes(type)"
            button-variant="outline-light"
            class="d-inline rounded-0 mt-1"
            :size="screen <576 ? 'sm' : (stack ? 'sm' : 'md')"
            name="buttons-2">
            {{ type }}
            </b-form-checkbox>
        </b-form-group>
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
        data (){
            return {
                artifact_types: ["Flower of Life","Plume of Death","Sands of Eon","Goblet of Eonothem","Circlet of Logos"],
                types: []
            }
        },
        computed: {
            artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            exclude_filters(){
                return this.$store.state.artifacts.exclude_filters
            },
            screen(){
                return this.$store.state.artifacts.screen
            },
        },
        methods: {
            filterByTypes(type){
                this.$store.commit('artifacts/setActiveFilters',{type: 'types', value: type});
                this.addType(type);

                if(!this.stack){
                    this.resetArtifacts();
                    if(this.types.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.types.includes(artifact.info.piece.type)
                            : this.types.includes(artifact.info.piece.type));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            },
            resetArtifacts(){
                if(!this.stack){
                    let artifacts=JSON.parse(localStorage.artifacts).reverse();
                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }
            },
            addType(type){
                if(this.types.includes(type)){
                    this.types.splice(
                        this.types.findIndex(item => item == type),1);
                }
                else{
                    this.types.push(type);
                }
            },
        }
    }
</script>

<style>
    .stars-filter div label{
        border-radius: 0;
    }
</style>