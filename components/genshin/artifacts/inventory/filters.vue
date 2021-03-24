<template>
    <div>
        <!-- <slide-y-up-transition :duration="250"> -->
            <b-form-group
            v-if="filters.by_star"
            class="text-light stars-filter"
            label="Select artifact rarity to show">
                <b-form-checkbox-group
                v-model="stars"
                :options="[1,2,3,4,5]"
                buttons
                @input="filterByStars"
                button-variant="outline-light"
                size="md"
                name="buttons-2">
                </b-form-checkbox-group>
            </b-form-group>

            <b-form-group
            v-if="filters.by_type"
            class="text-light type-filter"
            label="Select artifact type to show">
                <b-form-checkbox-group
                v-model="types"
                :options="artifact_types"
                buttons
                @input="filterByTypes"
                button-variant="outline-light"
                :size="screen < 991 ? 'sm' :'md'"
                name="buttons-2">
                </b-form-checkbox-group>
            </b-form-group>

            <div v-if="filters.by_set">
                <ui-select
                @change="filterBySets"
                multipleDelimiter=" | "
                hasSearch
                class="mt-1 mb-2 select pt-1 px-1"
                placeholder="Select artifact set"
                searchPlaceholder="Enter set name"
                :options="artifact_sets"
                multiple
                v-model="sets">
                </ui-select>

                <button
                @click="emptySets"
                type="button"
                class="btn btn-danger d-inline-block text-light btn-sm mb-2 ml-1 pt-1 pb-1 rounded">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div v-if="filters.by_main">
                <ui-select
                @input="filterByMainStats"
                multipleDelimiter=" | "
                class="mt-0 mb-0 select pt-1 pb-0 px-1"
                placeholder="Select main stats"
                :options="artifact_main_stats"
                multiple
                v-model="main_stats">
                </ui-select>

                <button
                @click="emptyMainStats"
                type="button"
                class="btn btn-danger d-inline-block text-light btn-sm mb-2 ml-1 pt-1 pb-1 rounded">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <table
            class="mx-auto mx-md-0"
            v-if="filters.by_sub">
                <tr>
                    <td>
                        <ui-select
                        @input="filterBySubStats"
                        multipleDelimiter=" | "
                        class="mt-1 mb-2 select pt-1 px-1"
                        placeholder="Select sub stats"
                        :options="artifact_sub_stats"
                        multiple
                        v-model="sub_stats">
                        </ui-select>

                        <button
                        @click="emptySubStats"
                        type="button"
                        class="btn btn-danger d-inline-block text-light btn-sm mb-2 ml-1 pt-1 pb-1 rounded">
                            <i class="fas fa-times"></i>
                        </button>
                    </td>

                    <td>
                        <b-form-group
                        class="text-light p-0 m-0 sub-filter-type">
                            <b-form-checkbox-group
                            v-model="sub_filter_type"
                            :options="['Contain','Match']"
                            buttons
                            @input="setSubFilterType"
                            button-variant="outline-light"
                            size="md"
                            name="buttons-2">
                            </b-form-checkbox-group>
                        </b-form-group>
                    </td>
                </tr>
            </table>
        <!-- </slide-y-up-transition> -->

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
    </div>
</template>

<script>
    import substatsJ from '~/static/substats.json';
    import mainstatsJ from '~/static/mainstats.json';
    import setsJ from '~/static/sets.json';
    export default{
        name: 'inventoryFilters',
        data(){
            return {
                stars: [],
                main_stats: [],
                sub_stats: [],
                sub_filter_type: 'Contain',
                types: [],
                sets: [],
                artifact_types: ["Flower of Life","Plume of Death","Sands of Eon","Goblet of Eonothem","Circlet of Logos"],
                artifact_main_stats: mainstatsJ.map(main => main.name),
                artifact_sets: setsJ.map(set => set.name),
                artifact_sub_stats: substatsJ.map(sub => sub.name)
            }
        },
        computed: {
            stack_filters(){
                return this.$store.state.artifacts.stack_filters
            },
            filters(){
                return this.$store.state.artifacts.filters
            },
            screen(){
                return this.$store.state.artifacts.screen
            },
            artifacts(){
                return this.$store.state.artifacts.artifacts
            }
        },
        methods: {
            filterByStars(){
                if(!this.stack_filters){
                    this.resetArtifacts();
                    if(this.stars.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.stars.includes(artifact.info.stars));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            },
            filterByTypes(){
                if(!this.stack_filters){
                    this.resetArtifacts();
                    if(this.types.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.types.includes(artifact.info.piece.type));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            },
            filterByMainStats(){
                if(!this.stack_filters){
                    this.resetArtifacts();
                    if(this.main_stats.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.main_stats.includes(artifact.stats.main.name));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            },
            filterBySubStats(){
                if(!this.stack_filters){
                    this.resetArtifacts();
                    if(this.sub_stats.length!=0){
                        if(this.sub_filter_type == 'Contain'){
                            let artifacts=this.artifacts.filter(artifact => artifact.stats.subs.filter(sub => this.sub_stats.includes(sub.name)).length > 0);
                            this.$store.commit('artifacts/setArtifacts',artifacts);
                        }
                        else{
                            let artifacts=this.artifacts.filter(artifact => this.sub_stats.every(sub => artifact.stats.subs.map(stat => stat.name).includes(sub)));
                            this.$store.commit('artifacts/setArtifacts',artifacts);
                        }
                    }
                }
            },
            filterBySets(){
                if(!this.stack_filters){
                    this.resetArtifacts();
                    if(this.sets.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.sets.includes(artifact.info.set.name));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            },
            setSubFilterType(){
                if(this.sub_stats.length !== 0) this.filterBySubStats();
            },
            resetArtifacts(){
                if(!this.stack_filters){
                    let artifacts=JSON.parse(localStorage.artifacts).reverse();
                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }
            },
            applyFilters(){
                let artifacts=JSON.parse(localStorage.artifacts);
                this.$store.commit('artifacts/setArtifacts',artifacts);

                if(this.stars.length!=0){
                    this.$store.commit('artifacts/setArtifacts',this.artifacts.filter(artifact => this.stars.includes(artifact.info.stars)));
                }
                if(this.main_stats.length!=0){
                    this.$store.commit('artifacts/setArtifacts',this.artifacts.filter(artifact => this.main_stats.includes(artifact.stats.main.name)));
                }
                if(this.sub_stats.length!=0){
                    if(this.sub_filter_type == 'Contain'){
                        this.$store.commit('artifacts/setArtifacts',this.artifacts.filter(artifact => artifact.stats.subs.filter(sub => this.sub_stats.includes(sub.name)).length > 0));
                    }
                    else{
                        this.$store.commit('artifacts/setArtifacts',this.artifacts.filter(artifact => this.sub_stats.every(sub => artifact.stats.subs.map(stat => stat.name).includes(sub))));
                    }
                }
                if(this.types.length!=0){
                    this.$store.commit('artifacts/setArtifacts',this.artifacts.filter(artifact => this.types.includes(artifact.info.piece.type)));
                }
                if(this.sets.length!=0){
                    this.$store.commit('artifacts/setArtifacts',this.artifacts.filter(artifact => this.sets.includes(artifact.info.set.name)));
                }

            },
            updateFilters(type){
                this.$store.commit('artifacts/setActiveFilter',type);
            },
            emptySets(){
                this.sets=[];
            },
            emptyStars(){
                this.stars=[];
            },
            emptyTypes(){
                this.types=[];
            },
            emptyMainStats(){
                this.main_stats=[];
            },
            emptySubStats(){
                this.sub_stats=[];
            },
            resetFilters(){
                if(!this.filters.by_main){
                    this.main_stats=[];
                }
                if(!this.filters.by_type){
                    this.types=[];
                }
                if(!this.filters.by_sub){
                    this.sub_stats=[];
                    this.sub_filter_type='Contain';
                }
                if(!this.filters.by_star){
                    this.stars=[];
                }
                if(!this.filters.by_set){
                    this.sets=[];
                }
            }
        }
    }
</script>

<style>
    /*.select .ui-select__content *{
        max-width: 100vw !important;
    }*/

    .ui-select.is-multiple .ui-select__display-value{
        white-space: nowrap;
        max-width: 250px;
        overflow-x: auto;
    }

    .select{
        background-color: white;
        border-radius: 10px;
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