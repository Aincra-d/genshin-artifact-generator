export const state = () => ({
    artifacts: [],
    screen: 0,
    view: '',
    match_subs: false,
    exclude_filters: false,
    delete_artifacts: false,
    delete_ids: [],
    filters: {
        by_star: false,
        by_main: false,
        by_sub: false,
        by_type: false,
        by_set: false
    },
    active_filters: [
        {
            type: 'stars',
            exclude: false,
            data: []
        },
        {
            type: 'main_stats',
            exclude: false,
            data: []
        },
        {
            type: 'sub_stats',
            exclude: false,
            data: []
        },
        {
            type: 'types',
            exclude: false,
            data: []
        },
        {
            type: 'sets',
            exclude: false,
            data: []
        }
    ],
    // rolled_artifacts: []
});

export const mutations = {
    setArtifacts: (state,artifacts) => state.artifacts=artifacts,

    setScreen: (state,screen) => state.screen=screen,

    setView: (state,view) => state.view=view,

    setMatchSubs: (state,match) => state.match_subs=match,

    setDeleteArtifacts(state,delete_artifacts){
        state.delete_artifacts=delete_artifacts;
        if(state.delete_artifacts === false) state.delete_ids=[]
    },

    setDeleteIds(state,id){
        if(state.delete_ids.includes(id)){
            state.delete_ids.splice(state.delete_ids.findIndex(delete_id => delete_id == id),1);
        }
        else{
            state.delete_ids.push(id);
        }
    },

    setActiveFilters(state,{type,value}){
        let active_filter=state.active_filters[state.active_filters.findIndex(filt => filt.type == type)];

        if(value === null){
            active_filter.data=[];
            return
        }

        if(active_filter.data.includes(value)){
            active_filter.data.splice(
                active_filter.data.findIndex(item => item == value),1);
        }
        else{
            active_filter.data.push(value);
        }
    },

    setExcludeFilter(state,{type,value}){
        state.active_filters[state.active_filters.findIndex(filt => filt.type == type)].exclude=value;
    },

    setDeleteIdsAll: (state,ids) => state.delete_ids=ids,

    setFilterType: (state,exclude) => state.exclude_filters=exclude,

    setFilters: (state,filters) => state.filters=filters,

    setActiveFilter(state,type){
        if(state.filters[type]) state.filters[type]=false
        else{
            Object.keys(state.filters).forEach(v => state.filters[v] = false);
            state.filters[type]=true
        }
    },

    // setRolledArtifacts(state,{artifact,id}){
    //     if(id === null){
    //         state.rolled_artifacts.push(artifact)
    //     }
    //     else{
    //         state.rolled_artifacts.splice(state.rolled_artifacts.findIndex(
    //             artifact => artifact.id === id),1);
    //     }
    // }
};