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
                @input="!stack && $emit('filter-by-stars',stars)"
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
                @input="!stack && $emit('filter-by-types',types)"
                button-variant="outline-light"
                :size="screen < 991 ? 'sm' :'md'"
                name="buttons-2">
                </b-form-checkbox-group>
            </b-form-group>

            <div v-if="filters.by_set">
                <ui-select
                @change="!stack && $emit('filter-by-set-names',sets)"
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
                @input="!stack && $emit('filter-by-main-stats',main_stats)"
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
                        @change="!stack && $emit('filter-by-sub-stats')"
                        @input="!stack && $emit('set-sub-stats',sub_stats)"
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
                            @input="!stack && $emit('set-sub-filter-type',sub_filter_type)"
                            button-variant="outline-light"
                            size="  "
                            name="buttons-2">
                            </b-form-checkbox-group>
                        </b-form-group>
                    </td>
                </tr>
            </table>
        <!-- </slide-y-up-transition> -->

        <h6
        v-if="stack"
        class="text-light">
            Filters:
        </h6>

        <div
        v-if="stack"
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
                <div v-if="stack && active_filter.filters.length!=0">
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
                        @click="$emit('update-filters',active_filter.type)">
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
    export default{
        name: 'inventoryFilters',
        props: {
            filters: Object,
            stack: Boolean,
            screen: Number
        },
        data(){
            return {
                stars: [],
                main_stats: [],
                sub_stats: [],
                sub_filter_type: 'Contain',
                types: [],
                sets: [],
                artifact_types: ["Flower of Life","Plume of Death","Sands of Eon","Goblet of Eonothem","Circlet of Logos"],
                artifact_main_stats: require('../mainstats.json').map(main => main.name),
                artifact_sets: require('../sets.json').map(set => set.name),
                artifact_sub_stats: require('../substats.json').map(sub => sub.name)
            }
        },
        methods: {
            emptySets(){
                this.sets=[];
                this.$emit('filter-by-set-names',this.sets);
            },
            emptyStars(){
                this.stars=[];
                this.$emit('filter-by-stars',this.stars);
            },
            emptyTypes(){
                this.types=[];
                this.$emit('filter-by-types',this.types);
            },
            emptyMainStats(){
                this.main_stats=[];
                this.$emit('filter-by-main-stats',this.main_stats);
            },
            emptySubStats(){
                this.sub_stats=[];
                this.$emit('set-sub-stats',this.sub_stats);
                this.$emit('filter-by-sub-stats');
            },
            applyFilters(){
                let filters={
                    stars: this.stars,
                    main_stats: this.main_stats,
                    sub_stats: this.sub_stats,
                    types: this.types,
                    sets: this.sets
                };
                this.$emit('apply-filters',filters);
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
        },
        updated(){
            if(!this.stack) this.resetFilters();
        }
    }
</script>

<style>
    .select .ui-select__content *{
        max-width: 100vw !important;
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