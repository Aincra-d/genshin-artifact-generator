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
    selected_domain: '',
    roll_settings: {
        include_low_stars: false,
        single_upgrades: false,
        roll_10x: false,
        show_upgrades: true
    },
    achievements: []
    // rolled_artifacts: []
});

export const mutations = {
    setAchievements(state,achievements){
        state.achievements=achievements;
        localStorage.setItem('achievements',JSON.stringify(achievements));
    },

    setRollSettings(state,name){
        state.roll_settings[name]=!state.roll_settings[name];
    },
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

    sortInventory(state,{name,type}){
        state.artifacts.sort((a, b) => type == 'desc'
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

    setDeleteIdsAll(state,asd){
        if(asd === null) state.delete_ids=[];
        else{
            let ids=[];

            state.artifacts.forEach(artifact => {
                if(!state.delete_ids.includes(artifact.id)){
                    ids.push(artifact.id)
                }
            });
            state.delete_ids=ids;
        }
    },

    setFilterType: (state,exclude) => state.exclude_filters=exclude,

    setFilters: (state,filters) => state.filters=filters,

    setActiveFilter(state,type){
        if(state.filters[type]) state.filters[type]=false
        else{
            Object.keys(state.filters).forEach(v => state.filters[v] = false);
            state.filters[type]=true
        }
    },

    setSelectedDomain: (state,name) => state.selected_domain=name
};