export const state = () => ({
    artifacts: [],
    screen: 0,
    view: '',
    match_subs: false,
    stack_filters: false,
    exclude_filters: false,
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

    setFilterType: (state,exclude) => state.exclude_filters=exclude,

    setFilters: (state,filters) => state.filters=filters,

    setActiveFilter(state,type){
        Object.keys(state.filters).forEach(v => state.filters[v] = false);
        state.filters[type]=true
    }
};