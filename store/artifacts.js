export const state = () => ({
    artifacts: [],
    screen: 0,
    view: '',
    sub_filter: 'Contain',
    stack_filters: false,
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
    setSubFilter: (state,sub_filter) => state.sub_filter=sub_filter,
    setStackFilters: (state,stack_filters) => state.stack_filters=stack_filters,
    setFilters: (state,filters) => state.filters=filters,
    setActiveFilter(state,type){
        Object.keys(state.filters).forEach(v => state.filters[v] = false);
        state.filters[type]=true
    }
};

export const getters = {
    getArtifacts(state){
        return state.artifacts
    },
    getScreen(state){
        return state.screen
    }
};