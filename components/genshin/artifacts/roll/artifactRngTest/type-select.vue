<template>
    <div>
        <div>
            <b-input-group class="w-100 d-inline-block filter-select text-center">
                <b-dropdown
                :size="screen < 576 ? 'sm' : 'md'"
                :text="selected_type!= '' ? selected_type : 'Choose artifact type'"
                variant="light"
                class="text-dark rounded-0"
                :disabled="artifact_main != ''">
                    <b-dropdown-item
                    :key="i"
                    v-for="(type,i) in artifact_types"
                    @click="selectType(type.name)"
                    class="font-xs-15">
                        <i
                        class="fa-sm"
                        :class="type.name == selected_type ?
                        'fas fa-circle' : 'far fa-circle'">
                        </i>

                        <img
                        v-lazy="type.image"
                        :alt="type.name"
                        style="width:25px; height:25px;"
                        class="rounded">

                        {{ type.name }} <i class="fas fa-type text-warning fa-sm"></i>
                    </b-dropdown-item>
                </b-dropdown>
            </b-input-group>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'typeSelect',
        data(){
            return {
                artifact_types: [
                { name : "Flower of Life", image: 'https://static.wikia.nocookie.net/gensin-impact/images/2/2d/Icon_Flower_of_Life.png' },
                { name : "Plume of Death", image: 'https://static.wikia.nocookie.net/gensin-impact/images/8/8b/Icon_Plume_of_Death.png' },
                { name : "Sands of Eon", image: 'https://static.wikia.nocookie.net/gensin-impact/images/9/9f/Icon_Sands_of_Eon.png' },
                { name : "Goblet of Eonothem", image: 'https://static.wikia.nocookie.net/gensin-impact/images/3/37/Icon_Goblet_of_Eonothem.png' },
                { name : "Circlet of Logos", image: 'https://static.wikia.nocookie.net/gensin-impact/images/6/64/Icon_Circlet_of_Logos.png' }],
                selected_type: '',
                toggled: false
            }
        },
        computed: {
            screen(){
                return this.$store.state.artifacts.screen
            },
            artifact_type(){
                return this.$store.state.artifacts.gold_artifact.selected_type
            },
            artifact_main(){
                return this.$store.state.artifacts.gold_artifact.selected_main
            }
        },
        methods: {
            setTypes(){
                let types=[];

                this.artifact_types.forEach(type => {
                    types.push({
                        name: type.name,
                        image: type.image
                    });

                    this.artifact_types=types;
                });

                if(this.artifact_type != ''){
                    this.selected_type=this.artifact_type;
                }
            },
            selectType(name){
                this.$store.commit('artifacts/setGoldArtifact',{type: 'type', value: name == this.selected_type ? '' : name});
                name == this.selected_type ? this.selected_type = '' : this.selected_type=name;
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