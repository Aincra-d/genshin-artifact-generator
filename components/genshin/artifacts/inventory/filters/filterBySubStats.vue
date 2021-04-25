<template>
    <div>
        <div>
            <b-input-group class="w-100 d-inline-block filter-select"
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
                :text="sub_stats.length!=0 ? sub_stats.length+' stat(s) selected' : 'Select sub stat(s)'"
                variant="light"
                class="text-dark rounded-0">
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
                        @click="filterBySubStats">
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
                        type="button"
                        :class="stack ? 'w-34' : 'w-30'"
                        class="btn btn-dark btn-sm d-inline float-left rounded-0"
                        @click="match_subs=!match_subs">
                            <i
                            class="fa-sm"
                            :class="match_subs ? 'fas fa-check-square' : 'far fa-square'"></i>
                            Match
                        </button> -->

                    <b-dropdown-item
                    :key="i"
                    v-for="(sub,i) in artifact_sub_stats"
                    @click.native.capture.stop="addSubStat(sub.name)"
                    class="font-xs-15">
                        <i
                        class="fa-sm"
                        :class="sub_stats.includes(sub.name) ?
                        'fas fa-check-square' : 'far fa-square'">
                        </i>

                        {{ sub.icon+' '+sub.name }} ({{ sub.count }})
                    </b-dropdown-item>
                </b-dropdown>
                
                <b-input-group-append class="d-inline">
                    <b-form-checkbox
                    :size="screen < 576 ? 'sm' : 'md'"
                    v-if="!exclude_filter"
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
                    :size="screen < 576 ? 'sm' : 'md'"
                    style="margin-left:-5px"
                    variant="danger"
                    @click="emptySubStats"
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
                        v-for="(sub,i) in sub_stats"
                        class="d-inline pointer"
                        @click="sub_stats.splice(sub_stats.findIndex(_sub => _sub == sub),1)">
                            {{ sub }} |
                        </li>
                    </ul>
                </div>
            </zoom-y-transition>
        </div>
    </div>
</template>

<script>
    import substatsJ from '~/static/substats.json';
    import staticons from '~/static/staticons.json';

    export default{
        name: 'filterBySubStats',
        props: {
            stack: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                artifact_sub_stats: substatsJ.map(sub => sub.name),
                sub_stats: [],
                toggled: false,
                sub_icons: staticons.sub_icons
            }
        },
        computed: {
            artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            exclude_filter: {
                get(){
                    return this.$store.state.artifacts.active_filters[this.$store.state.artifacts.active_filters.findIndex(filt => filt.type == 'sub_stats')].exclude;
                },
                set(value){
                    this.$store.commit('artifacts/setExcludeFilter',{type: 'sub_stats',value: value});
                }
            },
            screen(){
                return this.$store.state.artifacts.screen
            },
            match_subs: {
                get(){
                    return this.$store.state.artifacts.match_subs
                },
                set(value){
                    this.$store.commit('artifacts/setMatchSubs',value);
                }
            }
        },
        methods: {
            setSubStats(){
                let sub_stats=[];
                this.artifact_sub_stats.forEach(sub_stat => {
                    sub_stats.push({
                        name: sub_stat,
                        icon: this.sub_icons[this.sub_icons.findIndex(icon => icon.name == sub_stat)].icon,
                        count: this.artifacts.filter(artifact => artifact.stats.subs.map(sub => sub.name).includes(sub_stat)).length
                    });

                    this.artifact_sub_stats=sub_stats;
                });
            },
            setSubFilterType(){
                if(this.sub_stats.length !== 0) this.filterBySubStats();
            },
            addSubStat(sub){
                this.$store.commit('artifacts/setActiveFilters',{type: 'sub_stats', value: sub})

                if(this.sub_stats.includes(sub)){
                    this.sub_stats.splice(
                        this.sub_stats.findIndex(item => item == sub),1);
                }
                else{
                    this.sub_stats.push(sub);
                }
            },
            filterBySubStats(){
                if(!this.stack){
                    this.resetArtifacts();
                    if(this.sub_stats.length!=0){
                        if(!this.exclude_filter){
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
            emptySubStats(){
                this.resetArtifacts();
                this.$store.commit('artifacts/setActiveFilters',{type: 'sub_stats', value: null});
                this.sub_stats=[];
            },
            resetArtifacts(){
                if(!this.stack){
                    let artifacts=JSON.parse(localStorage.artifacts).reverse();
                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }
            },
            selectAll(){
                this.artifact_sub_stats.forEach(sub => {
                    this.addSubStat(sub.name);
                });
            }
        },
        created(){
            this.setSubStats();
        }
    }
</script>

<style>
    .stars-filter div label{
        border-radius: 0;
    }
</style>