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
                <b-input-group class="w-100 d-inline-block filter-select"
                :class="screen < 576 ? 'text-center' : 'text-left'">
                    <!-- <ui-select
                    @change="filterBySets"
                    multipleDelimiter=" | "
                    hasSearch
                    class="mb-0 mt-1 select pt-1 px-1 d-inline-block"
                    placeholder="Select artifact set"
                    searchPlaceholder="Enter set name"
                    :options="artifact_sets"
                    multiple
                    v-model="sets">
                    </ui-select> -->

                    <b-dropdown
                    :text="sets.length!=0 ? sets.length+' set(s) selected' : 'Select artifact set(s)'"
                    variant="light"
                    class="text-dark rounded-0">
                        <b-dropdown-item
                        :key="i"
                        v-for="(set,i) in artifact_sets"
                        @click.native.capture.stop="filterBySets(set.name)">
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

           <!--  <div v-if="filters.by_set">
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
            </div> -->

            <div v-if="filters.by_main">
                <b-input-group class="w-100 d-inline-block ml-3 ml-lg-0 filter-select"
                :class="screen < 776 ? 'text-center' : 'text-left'">
                    <b-dropdown
                    :text="main_stats.length!=0 ? main_stats.length+' stat(s) selected' : 'Select main stat(s)'"
                    variant="light"
                    class="text-dark rounded-0">
                        <b-dropdown-item
                        :key="i"
                        v-for="(main,i) in artifact_main_stats"
                        @click.native.capture.stop="filterByMainStats(main.name)">
                            <i
                            class="fa-sm"
                            :class="main_stats.includes(main.name) ?
                            'fas fa-check-square' : 'far fa-square'">
                            </i>

                            {{ main.name }} ({{ main.count }})
                        </b-dropdown-item>
                    </b-dropdown>
                    
                    <b-input-group-append class="d-inline">
                        <b-button
                        style="margin-left:-5px"
                        variant="danger"
                        @click="emptyMainStats"
                        class="text-light">
                            <i class="fas fa-times"></i>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </div>

            <table
            class="mx-auto mx-md-0"
            v-if="filters.by_sub">
                <tr>
                    <td>
                        <b-input-group class="w-100 d-inline-block filter-select"
                        :class="screen < 776 ? 'text-center' : 'text-left'">
                            <b-dropdown
                            :text="sub_stats.length!=0 ? sub_stats.length+' stat(s) selected' : 'Select sub stat(s)'"
                            variant="light"
                            class="text-dark rounded-0">
                                <b-dropdown-item
                                :key="i"
                                v-for="(sub,i) in artifact_sub_stats"
                                @click.native.capture.stop="filterBySubStats(sub.name)">
                                    <i
                                    class="fa-sm"
                                    :class="sub_stats.includes(sub.name) ?
                                    'fas fa-check-square' : 'far fa-square'">
                                    </i>

                                    {{ sub.name }} ({{ sub.count }})
                                </b-dropdown-item>
                            </b-dropdown>
                            
                            <b-input-group-append class="d-inline">
                                <b-form-checkbox
                                v-if="!exclude_filters"
                                v-model="match_subs"
                                style="margin-left:-5px;"
                                name="check-button"
                                class="rounded-0"
                                button-variant="outline-light"
                                @input="setSubFilterType"
                                button>
                                    Match
                                </b-form-checkbox>

                                <b-button
                                style="margin-left:-5px"
                                variant="danger"
                                @click="emptySubStats"
                                class="text-light">
                                    <i class="fas fa-times"></i>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </td>

                    <!-- <td v-if="!exclude_filters">
                        <b-form-group
                        class="text-light p-0 m-0 sub-filter-type">
                            <b-form-checkbox-group
                            v-model="match_subs"
                            :options="'Match'"
                            buttons
                            @input="setSubFilterType"
                            button-variant="outline-light"
                            size="md"
                            name="buttons-2">
                            </b-form-checkbox-group>
                        </b-form-group>
                    </td> -->
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
            exclude_filters(){
                return this.$store.state.artifacts.exclude_filters
            },
            filters(){
                return this.$store.state.artifacts.filters
            },
            screen(){
                return this.$store.state.artifacts.screen
            },
            artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            match_subs: {
                get(){
                    return this.$store.state.artifacts.match_subs
                },
                set(value){
                    this.$store.commit('artifacts/setMatchSubs',value);
                }
            },
        },
        methods: {
            setMainStats(){
                let main_stats=[];
                this.artifact_main_stats.forEach(main_stat => {
                    main_stats.push({
                        name: main_stat,
                        count: this.artifacts.filter(artifact => artifact.stats.main.name == main_stat).length
                    });

                    this.artifact_main_stats=main_stats;
                });
            },
            setSubStats(){
                let sub_stats=[];
                this.artifact_sub_stats.forEach(sub_stat => {
                    sub_stats.push({
                        name: sub_stat,
                        count: this.artifacts.filter(artifact => artifact.stats.subs.map(sub => sub.name).includes(sub_stat)).length
                    });

                    this.artifact_sub_stats=sub_stats;
                });
            },
            setSets(){
                let sets=[];
                this.artifact_sets.forEach(set => {
                    sets.push({
                        name: set,
                        count: this.artifacts.filter(artifact => artifact.info.set.name == set).length
                    });

                    this.artifact_sets=sets;
                });
            },
            filterByStars(){
                if(!this.stack_filters){
                    this.resetArtifacts();
                    if(this.stars.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.stars.includes(artifact.info.stars)
                            : this.stars.includes(artifact.info.stars));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            },
            filterByTypes(){
                if(!this.stack_filters){
                    this.resetArtifacts();
                    if(this.types.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.types.includes(artifact.info.piece.type)
                            : this.types.includes(artifact.info.piece.type));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            },
            filterByMainStats(main){
                this.setSelectData(this.main_stats,main);

                if(!this.stack_filters){
                    this.resetArtifacts();
                    if(this.main_stats.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.main_stats.includes(artifact.stats.main.name)
                            : this.main_stats.includes(artifact.stats.main.name));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            },
            filterBySubStats(sub){
                if(sub !==null) this.setSelectData(this.sub_stats,sub);

                if(!this.stack_filters){
                    this.resetArtifacts();
                    if(this.sub_stats.length!=0){
                        if(!this.exclude_filters){
                            if(!this.match_subs){
                                let artifacts=this.artifacts.filter(artifact => artifact.stats.subs.filter(sub => this.sub_stats.includes(sub.name)).length > 0);
                                this.$store.commit('artifacts/setArtifacts',artifacts);
                            }
                            else{
                                let artifacts=this.artifacts.filter(artifact => this.sub_stats.every(sub => artifact.stats.subs.map(stat => stat.name).includes(sub)));
                                this.$store.commit('artifacts/setArtifacts',artifacts);
                            }
                        }
                        else{
                            let artifacts=this.artifacts.filter(artifact => this.sub_stats.every(sub => !artifact.stats.subs.map(stat => stat.name).includes(sub)));
                            this.$store.commit('artifacts/setArtifacts',artifacts);
                        }
                    }
                }
            },
            filterBySets(set){
                this.setSelectData(this.sets,set);

                if(!this.stack_filters){
                    this.resetArtifacts();
                    if(this.sets.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.sets.includes(artifact.info.set.name)
                            : this.sets.includes(artifact.info.set.name));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            },
            setSelectData(array,item){
                array.includes(item) ? array.splice(array.findIndex(name => name == item),1) : array.push(item);
            },
            setSubFilterType(){
                if(this.sub_stats.length !== 0) this.filterBySubStats(null);
            },
            resetArtifacts(){
                if(!this.stack_filters){
                    let artifacts=JSON.parse(localStorage.artifacts).reverse();
                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }
            },
            applyFilters(){
                let artifacts=JSON.parse(localStorage.artifacts).reverse();
                this.$store.commit('artifacts/setArtifacts',artifacts);

                if(this.stars.length!=0){
                    this.$store.commit('artifacts/setArtifacts',
                        this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.stars.includes(artifact.info.stars)
                            : this.stars.includes(artifact.info.stars)));
                }
                if(this.main_stats.length!=0){
                    this.$store.commit('artifacts/setArtifacts',
                        this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.main_stats.includes(artifact.stats.main.name)
                            : this.main_stats.includes(artifact.stats.main.name)));
                }
                if(this.sub_stats.length!=0){
                    if(!this.exclude_filters){
                            if(!this.match_subs){
                                let artifacts=this.artifacts.filter(artifact => artifact.stats.subs.filter(sub => this.sub_stats.includes(sub.name)).length > 0);
                                this.$store.commit('artifacts/setArtifacts',artifacts);
                            }
                            else{
                                let artifacts=this.artifacts.filter(artifact => this.sub_stats.every(sub => artifact.stats.subs.map(stat => stat.name).includes(sub)));
                                this.$store.commit('artifacts/setArtifacts',artifacts);
                            }
                        }
                        else{
                            let artifacts=this.artifacts.filter(artifact => this.sub_stats.every(sub => !artifact.stats.subs.map(stat => stat.name).includes(sub)));
                            this.$store.commit('artifacts/setArtifacts',artifacts);
                        }
                }
                if(this.types.length!=0){
                    this.$store.commit('artifacts/setArtifacts',
                        this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.types.includes(artifact.info.piece.type)
                            : this.types.includes(artifact.info.piece.type)));
                }
                if(this.sets.length!=0){
                    this.$store.commit('artifacts/setArtifacts',
                        this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.sets.includes(artifact.info.set.name)
                            : this.sets.includes(artifact.info.set.name)));
                }

            },
            updateFilters(type){
                this.$store.commit('artifacts/setActiveFilter',type);
            },
            emptySets(){
                this.sets=[];
                this.resetArtifacts();
            },
            emptyStars(){
                this.stars=[];
                this.resetArtifacts();
            },
            emptyTypes(){
                this.types=[];
                this.resetArtifacts();
            },
            emptyMainStats(){
                this.main_stats=[];
                this.resetArtifacts();
            },
            emptySubStats(){
                this.sub_stats=[];
                this.resetArtifacts();
            }
        },
        created(){
            this.setMainStats();
            this.setSubStats();
            this.setSets();
        }
    }
</script>

<style>
    /*.select .ui-select__content *{
        max-width: 100vw !important;
    }*/

    .filter-select label{
        border-radius: 0;
    }

    .filter-select .dropdown-toggle{
        color:black;
        border-radius: 0;
    }
    .filter-select .dropdown-menu{
        max-height:300px;
        overflow-y: auto;
    }

    .ui-select.is-multiple .ui-select__display-value{
        white-space: nowrap;
        max-width: 250px;
        overflow-x: auto;
    }

    .select{
        background-color: white;
        /*border-radius: 10px;*/
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