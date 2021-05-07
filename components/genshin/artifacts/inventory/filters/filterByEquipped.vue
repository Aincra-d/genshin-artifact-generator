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
                :text="characters.length!=0 ? characters.length+' character(s) selected' : 'Select characters'"
                variant="light"
                class="text-dark rounded-0 character-filter">
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
                    @click="filterBycharacters">
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
                    @click="filterBycharacters">
                        Delete
                    </button> -->

                    <b-dropdown-item
                    :key="i"
                    v-for="(character,i) in all_characters"
                    @click.native.capture.stop="addCharacter(character.name)"
                    class="font-xs-15">
                        <i
                        class="fa-sm"
                        :class="characters.includes(character.name) ?
                        'fas fa-check-square' : 'far fa-square'">
                        </i>

                        <img
                        v-lazy="character.image"
                        :alt="character.name"
                        style="width:25px; height:25px;"
                        class="rounded">

                        {{ character.name }} <i class="fas fa-type text-warning fa-sm"></i>({{ character.count }})
                    </b-dropdown-item>
                </b-dropdown>
                
                <b-input-group-append class="d-inline">
                    <b-button
                    :size="screen < 576 ? 'sm' : 'md'"
                    style="margin-left:-5px"
                    variant="danger"
                    @click="emptycharacters"
                    class="text-light">
                        <i class="fas fa-times"></i>
                    </b-button>
                </b-input-group-append>
            </b-input-group>

            <zoom-y-transition :duration="250">
                <div
                v-if="toggled"
                class="text-light">
                    Selected characters: 
                    <ul class="d-inline ml-2 p-0">
                        <li
                        :key="i"
                        v-for="(character,i) in characters"
                        class="d-inline pointer"
                        @click="characters.splice(characters.findIndex(_character => _character == character),1)">
                            {{ character }} |
                        </li>
                    </ul>
                </div>
            </zoom-y-transition>
        </div>
    </div>
</template>

<script>
    import charactersJSON from '~/static/characters.json';

    export default{
        name: 'filterBycharacters',
        props: {
            stack: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                all_characters: charactersJSON,
                characters: [],
                toggled: false
            }
        },
        computed: {
            artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            exclude_filter: {
                get(){
                    return this.$store.state.artifacts.active_filters[this.$store.state.artifacts.active_filters.findIndex(filt => filt.type == 'characters')].exclude;
                },
                set(value){
                    this.$store.commit('artifacts/setExcludeFilter',{type: 'characters',value: value});
                }
            },
            screen(){
                return this.$store.state.artifacts.screen
            },
        },
        methods: {
            setCharacters(){
                let characters=[];

                this.all_characters.forEach(character => {
                    characters.push({
                        name: character.name,
                        image: character.image,
                        count: this.artifacts.filter(artifact => artifact.info.equipped.name && artifact.info.equipped.name == character.name).length
                    });

                    this.all_characters=characters;
                });
            },
            addCharacter(character){
                this.$store.commit('artifacts/setActiveFilters',{type: 'characters', value: character})

                if(this.characters.includes(character)){
                    this.characters.splice(
                        this.characters.findIndex(item => item == character),1);
                }
                else{
                    this.characters.push(character);
                }
            },
            filterBycharacters(character){
                this.$store.commit('artifacts/setActiveFilters',{type: 'characters', value: character});

                if(!this.stack){
                    this.resetArtifacts();
                    if(this.characters.length!=0){
                        let artifacts=this.artifacts.filter(artifact => artifact.info.equipped !== false && this.exclude_filter
                            ? !this.characters.includes(artifact.info.equipped.name)
                            : this.characters.includes(artifact.info.equipped.name));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            },
            emptycharacters(){
                this.resetArtifacts();
                this.$store.commit('artifacts/setActiveFilters',{type: 'characters', value: null});
                this.characters=[];
            },
            resetArtifacts(){
                if(!this.stack){
                    let artifacts=JSON.parse(localStorage.artifacts).reverse();
                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }
            },
            selectAll(){
                this.all_characters.forEach(type => {
                    this.addCharacter(type.name);
                });
            }
        },
        created(){
            this.setCharacters();
        }
    }
</script>

<style>
    /*.select-all-filter{
        box-shadow: 0px 0px 5px black;
    }
*/
    .characters-filter div label{
        border-radius: 0;
    }

    .character-filter .dropdown-menu{
        width: 230px;
    }
</style>