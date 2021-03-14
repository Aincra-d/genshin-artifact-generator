<template>
    <div>
        <artifact-modal
        :screen="screen"
        ref="artifactModal"
        :artifacts="artifacts"
        @update-inventory="resetInventory()">    
        </artifact-modal>

        <div class="text-left manage-inventory">
            <manage-inventory
            :screen="screen"
            @sort-inventory="sortInventory"
            @set-stack-filters="setStackFilters"
            @reset-inventory="resetInventory"
            @filter-inventory="filterInventory">
            </manage-inventory>
        </div>

        
        <inventory-filters
        class="ml-0 ml-md-3 mb-2"
        :screen="screen"
        :filters="filters"
        :stack="stack_filters"
        @filter-by-stars="filterByStars"
        @filter-by-types="filterByTypes"
        @filter-by-main-stats="filterByMainStats"
        @filter-by-sub-stats="filterBySubStats"
        @filter-by-set-names="filterBySetNames"
        @set-sub-stats="setSubStats"
        @set-sub-filter-type="setSubFilterType"
        @apply-filters="applyFilters"
        @update-filters="updateFilters">
        </inventory-filters>

        <artifact
        :inventory="true"
        class="d-inline-block col-12 col-sm-8 col-md-9 col-lg-6 col-xl-4"
        :key="artifact.id"
        v-for="artifact in artifacts"
        :artifact="artifact"
        @remove-artifact="removeArtifact"
        @open-modal="openModal">
        </artifact>
    </div>
</template>

<script>
    import artifact from '@/components/genshin/artifacts/artifact.vue';
    import manageInventory from '@/components/genshin/artifacts/inventory/manageInventory.vue';
    import inventoryFilters from '@/components/genshin/artifacts/inventory/filters.vue';
    import artifactModal from '@/components/genshin/artifacts/inventory/artifactModal.vue';
    export default{
        name: 'artifactInventory',
        props: {
            artifacts: Array
        },
        components: {
            artifact,
            'manage-inventory': manageInventory,
            'inventory-filters': inventoryFilters,
            'artifact-modal': artifactModal
        },
        data(){
            return {
                filters: {
                    by_star: false,
                    by_main: false,
                    by_sub: false,
                    by_type: false,
                    by_set: false
                },
                sub_filter_type: 'Contain',
                sub_stats: [],
                stack_filters: false,
                screen: process.client && window.innerWidth
            }
        },
        methods: {
            removeArtifact(id){
                this.artifacts.splice(this.artifacts.findIndex(artifact => artifact.id === id),1);
                localStorage.setItem('artifacts', JSON.stringify(this.artifacts));
            },
            sortInventory(name,type){
                this.artifacts.sort((a, b) => type == 'desc'
                    ? parseFloat(b.stats.subs.filter(sub => sub.name == name)[0]
                        ? b.stats.subs.filter(sub => sub.name == name)[0].value : 0)
                    -
                    parseFloat(a.stats.subs.filter(sub => sub.name == name)[0]
                        ? a.stats.subs.filter(sub => sub.name == name)[0].value : 0)

                    : parseFloat(a.stats.subs.filter(sub => sub.name == name)[0]
                        ? a.stats.subs.filter(sub => sub.name == name)[0].value : 0)
                    -
                    parseFloat(b.stats.subs.filter(sub => sub.name == name)[0]
                        ? b.stats.subs.filter(sub => sub.name == name)[0].value : 0)
                    );
            },
            filterInventory(type){
                Object.keys(this.filters).forEach(v => this.filters[v] = false);
                this.filters[type]=!this.filters[type];
            },
            filterByStars(stars){
                this.resetArtifacts();
                if(stars.length!=0){
                    this.artifacts=this.artifacts.filter(artifact => stars.includes(artifact.info.stars));
                }
            },
            filterByTypes(types){
                this.resetArtifacts();
                if(types.length!=0){
                    this.artifacts=this.artifacts.filter(artifact => types.includes(artifact.info.piece.type));
                }
            },
            filterByMainStats(main_stats){
                this.resetArtifacts();
                if(main_stats.length!=0){
                    this.artifacts=this.artifacts.filter(artifact => main_stats.includes(artifact.stats.main.name));
                }
            },
            filterBySubStats(){
                this.resetArtifacts();
                if(this.sub_stats.length!=0){
                    if(this.sub_filter_type == 'Contain'){
                        this.artifacts=this.artifacts.filter(artifact => artifact.stats.subs.filter(sub => this.sub_stats.includes(sub.name)).length > 0);
                    }
                    else{
                        this.artifacts=this.artifacts.filter(artifact => this.sub_stats.every(sub => artifact.stats.subs.map(stat => stat.name).includes(sub)));
                    }
                }
            },
            filterBySetNames(sets){
                this.resetArtifacts();
                if(sets.length!=0){
                    this.artifacts=this.artifacts.filter(artifact => sets.includes(artifact.info.set.name));
                }
            },
            setSubStats(sub_stats){
                this.sub_stats=sub_stats;
            },
            setSubFilterType(type){
                this.sub_filter_type=type;
                if(this.sub_stats.length !== 0) this.filterBySubStats();
            },
            setStackFilters(stack){
                this.stack_filters=stack;
                // if(this.stack_filters) this.resetInventory();
                // this.artifacts=JSON.parse(localStorage.artifacts);
            },
            resetArtifacts(){
                if(!this.stack_filters) this.artifacts=JSON.parse(localStorage.artifacts);
            },
            resetInventory(){
                this.artifacts=JSON.parse(localStorage.artifacts);
            },
            applyFilters(filters){
                let artifacts=JSON.parse(localStorage.artifacts);
                if(filters.stars.length!=0){
                    artifacts=artifacts.filter(artifact => filters.stars.includes(artifact.info.stars))
                }
                if(filters.main_stats.length!=0){
                    artifacts=artifacts.filter(artifact => filters.main_stats.includes(artifact.stats.main.name))
                }
                if(filters.sub_stats.length!=0){
                    if(this.sub_filter_type == 'Contain'){
                        artifacts=artifacts.filter(artifact => artifact.stats.subs.filter(sub => filters.sub_stats.includes(sub.name)).length > 0);
                    }
                    else{
                        artifacts=artifacts.filter(artifact => filters.sub_stats.every(sub => artifact.stats.subs.map(stat => stat.name).includes(sub)));
                    }
                }
                if(filters.types.length!=0){
                    artifacts=artifacts.filter(artifact => filters.types.includes(artifact.info.piece.type))
                }
                if(filters.sets.length!=0){
                    artifacts=artifacts.filter(artifact => filters.sets.includes(artifact.info.set.name))
                }

                this.artifacts=artifacts;
            },
            updateFilters(filter){
                this.filterInventory(filter);
            },
            openModal(ref,id) {
                this.$refs.artifactModal.openModal(ref,id)
            },
            onResize(){
                if(process.client) this.screen=window.innerWidth
            }
        },
        mounted(){
            if(process.client) window.addEventListener('resize',this.onResize)
        }
    }
</script>