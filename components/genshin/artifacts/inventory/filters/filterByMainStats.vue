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
                :text="main_stats.length!=0 ? main_stats.length+' stat(s) selected' : 'Select main stat(s)'"
                variant="light"
                class="text-dark rounded-0">
                    <div>
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
                        @click="filterByMainStats">
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
                    </div>

                    <!-- <button
                    v-if="!stack"
                    type="button"
                    class="btn btn-danger btn-sm w-33 d-inline float-left rounded-0"
                    @click="filterByMainStats">
                        Delete
                    </button> -->

                    <div class="filter-options-container">
                        <b-dropdown-item
                        :key="i"
                        v-for="(main,i) in artifact_main_stats"
                        @click.native.capture.stop="addMainStat(main.name)"
                        class="font-xs-15">
                            <i
                            class="fa-sm"
                            :class="main_stats.includes(main.name) ?
                            'fas fa-check-square' : 'far fa-square'">
                            </i>

                            <img
                            v-if="main.image"
                            v-lazy="main.image"
                            :alt="main.name"
                            style="width:20px; height:20px;">

                            {{ (main.icon ? main.icon+' ' : '') }} {{ main.name }} ({{ main.count }})
                        </b-dropdown-item>
                    </div>
                </b-dropdown>
                
                <b-input-group-append class="d-inline">
                    <b-button
                    :size="screen < 576 ? 'sm' : 'md'"
                    style="margin-left:-5px"
                    variant="danger"
                    @click="emptyMainStats"
                    class="text-light">
                        <i class="fas fa-times"></i>
                    </b-button>
                </b-input-group-append>
            </b-input-group>

            <zoom-y-transition :duration="250">
                <div
                v-if="toggled"
                class="text-light">
                    Selected stats: 
                    <ul class="d-inline ml-2 p-0">
                        <li
                        :key="i"
                        v-for="(main,i) in main_stats"
                        class="d-inline pointer"
                        @click="main_stats.splice(main_stats.findIndex(_main => _main == main),1)">
                            {{ main }} |
                        </li>
                    </ul>
                </div>
            </zoom-y-transition>
        </div>
    </div>
</template>

<script>
    import mainstatsJ from '~/static/mainstats.json';
    import staticons from '~/static/staticons.json';

    export default{
        name: 'filterByMainStats',
        props: {
            stack: {
                type: Boolean,
                default: false,
            }
        },
        data(){
            return {
                artifact_main_stats: mainstatsJ.map(main => main.name),
                main_stats: [],
                toggled: false,
                main_icons: staticons.main_icons
            }
        },
        computed: {
            artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            exclude_filter: {
                get(){
                    return this.$store.state.artifacts.active_filters[this.$store.state.artifacts.active_filters.findIndex(filt => filt.type == 'main_stats')].exclude;
                },
                set(value){
                    this.$store.commit('artifacts/setExcludeFilter',{type: 'main_stats',value: value});
                }
            },
            screen(){
                return this.$store.state.artifacts.screen
            },
        },
        methods: {
            setMainStats(){
                let main_stats=[];
                
                this.artifact_main_stats.forEach(main_stat => {
                    main_stats.push({
                        name: main_stat,
                        icon: this.main_icons[this.main_icons.findIndex(icon => icon.name == main_stat)].icon,
                        image: this.main_icons[this.main_icons.findIndex(icon => icon.name == main_stat)].image,
                        count: this.artifacts.filter(artifact => artifact.stats.main.name == main_stat).length
                    });

                    this.artifact_main_stats=main_stats;
                });
            },
            addMainStat(main){
                this.$store.commit('artifacts/setActiveFilters',{type: 'main_stats', value: main})

                if(this.main_stats.includes(main)){
                    this.main_stats.splice(
                        this.main_stats.findIndex(item => item == main),1);
                }
                else{
                    this.main_stats.push(main);
                }
            },
            filterByMainStats(){
                if(!this.stack){
                    this.resetArtifacts();
                    if(this.main_stats.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.exclude_filter
                            ? !this.main_stats.includes(artifact.stats.main.name)
                            : this.main_stats.includes(artifact.stats.main.name));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }
            },
            emptyMainStats(){
                this.resetArtifacts();
                this.$store.commit('artifacts/setActiveFilters',{type: 'main_stats', value: null});
                this.main_stats=[];
            },
            resetArtifacts(){
                if(!this.stack){
                    let artifacts=JSON.parse(localStorage.artifacts).reverse();
                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }
            },
            selectAll(){
                this.artifact_main_stats.forEach(main => {
                    this.addMainStat(main.name);
                });
            }
        },
        created(){
            this.setMainStats();
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
</style>