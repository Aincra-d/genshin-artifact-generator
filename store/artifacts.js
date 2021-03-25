export const state = () => ({
    artifacts: [],
    screen: 0,
    view: '',
    match_subs: false,
    stack_filters: false,
    exclude_filters: false,
    delete_artifacts: false,
    delete_ids: [],
    filters: {
        by_star: false,
        by_main: false,
        by_sub: false,
        by_type: false,
        by_set: false
    }
});

export const mutations = {
    setArtifacts: (state,artifacts) => state.artifacts=artifacts,

    setScreen: (state,screen) => state.screen=screen,

    setView: (state,view) => state.view=view,

    setMatchSubs: (state,match) => state.match_subs=match,

    setStackFilters: (state,stack_filters) => state.stack_filters=stack_filters,

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

    setFilterType: (state,exclude) => state.exclude_filters=exclude,

    setFilters: (state,filters) => state.filters=filters,

    setActiveFilter(state,type){
        Object.keys(state.filters).forEach(v => state.filters[v] = false);
        state.filters[type]=true
    }
};