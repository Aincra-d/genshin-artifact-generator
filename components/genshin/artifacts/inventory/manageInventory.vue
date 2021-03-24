<template>
    <div>
        <b-dropdown
        class="m-0 sort-inventory"
        :size="screen < 576 ? 'md' : 'lg'"
        variant="link">
            <template v-slot:button-content>
                <i class="fas fa-sort sort-icon"></i>
            </template>

            <b-dropdown-item
            :key="i"
            v-for="(sort,i) in sorts"
            @click="sortInventory(sorts[i].name,sorts[i].type)">
                <i
                class="fas mr-2"
                :class="sort.icon">
                </i>
                
                <span>{{sort.title}}</span>
            </b-dropdown-item>
        </b-dropdown>

        <b-dropdown
        class="m-0"
        :size="screen < 576 ? 'md' : 'lg'"
        variant="link">
            <template v-slot:button-content>
                <i class="fas fa-filter filter-icon"></i>
            </template>

            <b-dropdown-item
            :key="i"
            v-for="(filter,i) in filters"
            @click="filterInventory(filter.type)">

                <span>{{filter.title}}</span>

            </b-dropdown-item>
        </b-dropdown>

        <b-dropdown
        class="m-0 set-inventory-view"
        :size="screen < 576 ? 'md' : 'lg'"
        variant="link">
            <template v-slot:button-content>
                <i class="fas fa-th sort-icon"></i>
            </template>

            <b-dropdown-item
            :key="i"
            v-for="(view,i) in views"
            @click="changeView(view.name)">
                <i
                class="fas mr-2"
                :class="view.icon">
                </i>
                
                <span :class="view.name == inventory_view && 'text-primary'">
                    {{view.title}}
                </span>
            </b-dropdown-item>
        </b-dropdown>

        <b-dropdown
        class="m-0 set-inventory-view"
        :size="screen < 576 ? 'md' : 'lg'"
        variant="link">
            <template v-slot:button-content>
                <i class="fas fa-ellipsis-v sort-icon"></i>
            </template>

            <b-dropdown-item
            @click="stack_filters=!stack_filters">
                <i
                class="fa-sm"
                :class="stack_filters ? 'fas fa-check-square' : 'far fa-square'"></i>
                Stack Filters
            </b-dropdown-item>

            <b-dropdown-item
            @click="exclude_filters=!exclude_filters">
                <i
                class="fa-sm"
                :class="exclude_filters ? 'fas fa-check-square' : 'far fa-square'"></i>
                Exclude filters
            </b-dropdown-item>
        </b-dropdown>

        <!-- <b-form-checkbox
        class="text-light d-inline-block"
        v-model="stack_filters"
        :size="screen < 576 ? 'md' : 'lg'">
            Stack
        </b-form-checkbox>

        <b-form-checkbox
        class="text-light d-inline-block"
        v-model="exclude_filters"
        :size="screen < 576 ? 'md' : 'lg'">
            Exclude
        </b-form-checkbox> -->

        <!-- @click.native.capture.stop -->
    </div>
</template>

<script>
    export default{
        name: 'manageInventory',
        computed: {
            screen(){
                return this.$store.state.artifacts.screen
            },
            stack_filters: {
                get(){
                    return this.$store.state.artifacts.stack_filters
                },
                set(value){
                    this.$store.commit('artifacts/setStackFilters',value);
                }
            },
            exclude_filters: {
                get(){
                    return this.$store.state.artifacts.exclude_filters
                },
                set(value){
                    this.$store.commit('artifacts/setFilterType',value);
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: '<h6>Changed filter type to '+(value ? 'exclude' : 'include')+'</h6>'
                    });
                }
            },
            filter_types(){
                return this.$store.state.artifacts.filters
            },
            artifacts(){
                return this.$store.state.artifacts.artifacts
            }
        },
        data(){
            return {
                inventory_view: process.client && (sessionStorage.inventoryView || (this.screen < 776 ? 'images' : 'compressed')),
                sorts: [
                    {
                        name: 'HP',
                        type: 'desc',
                        icon: 'text-danger',
                        title: '❤️ Sort by HP (desc ⬇)'
                    },
                    {
                        name: 'HP',
                        type: 'asc',
                        icon: 'text-danger',
                        title: '❤️ Sort by HP (asc ⬆)'
                    },
                    {
                        name: 'HP%',
                        type: 'desc',
                        icon: 'text-danger',
                        title: '❤️ Sort by HP% (desc ⬇)'
                    },
                    {
                        name: 'HP%',
                        type: 'asc',
                        icon: 'text-danger',
                        title: '❤️ Sort by HP% (asc ⬆)'
                    },
                    {
                        name: 'DEF',
                        type: 'desc',
                        icon: 'text-primary',
                        title: '🛡️ Sort by DEF (desc ⬇)'
                    },
                    {
                        name: 'DEF',
                        type: 'asc',
                        icon: 'text-primary',
                        title: '🛡️ Sort by DEF (asc ⬆)'
                    },
                    {
                        name: 'DEF%',
                        type: 'desc',
                        icon: 'text-primary',
                        title: '🛡️ Sort by DEF% (desc ⬇)'
                    },
                    {
                        name: 'DEF%',
                        type: 'asc',
                        icon: 'text-primary',
                        title: '🛡️ Sort by DEF% (asc ⬆)'
                    },
                    {
                        name: 'ATK',
                        type: 'desc',
                        icon: 'text-primary',
                        title: '⚔️ Sort by ATK (desc ⬇)'
                    },
                    {
                        name: 'ATK',
                        type: 'asc',
                        icon: 'text-primary',
                        title: '⚔️ Sort by ATK (asc ⬆)'
                    },
                    {
                        name: 'ATK%',
                        type: 'desc',
                        icon: 'text-primary',
                        title: '⚔️ Sort by ATK% (desc ⬇)'
                    },
                    {
                        name: 'ATK%',
                        type: 'asc',
                        icon: 'text-primary',
                        title: '⚔️ Sort by ATK% (asc ⬆)'
                    },
                    {
                        name: 'Energy Recharge%',
                        type: 'desc',
                        icon: 'text-primary',
                        title: '⚡ Sort by Energy Recharge% (desc ⬇)'
                    },
                    {
                        name: 'Energy Recharge%',
                        type: 'asc',
                        icon: 'text-primary',
                        title: '⚡ Sort by Energy Recharge% (asc ⬆)'
                    },
                    {
                        name: 'Elemental Mastery',
                        type: 'desc',
                        icon: 'text-primary',
                        title: '🔥 Sort by Elemental Mastery (desc ⬇)'
                    },
                    {
                        name: 'Elemental Mastery',
                        type: 'asc',
                        icon: 'text-primary',
                        title: '🔥 Sort by Elemental Mastery (asc ⬆)'
                    },
                    {
                        name: 'CRIT Rate%',
                        type: 'desc',
                        icon: 'text-primary',
                        title: '🎯 Sort by CRIT Rate% (desc ⬇)'
                    },
                    {
                        name: 'CRIT Rate%',
                        type: 'asc',
                        icon: 'text-primary',
                        title: '🎯 Sort by CRIT Rate% (asc ⬆)'
                    },
                    {
                        name: 'CRIT DMG%',
                        type: 'desc',
                        icon: 'text-primary',
                        title: '🎯 Sort by CRIT DMG% (desc ⬇)'
                    },
                    {
                        name: 'CRIT DMG%',
                        type: 'asc',
                        icon: 'text-primary',
                        title: '🎯 Sort by CRIT DMG% (asc ⬆)'
                    },
                ],
                filters: [
                    {
                        type: 'by_star',
                        title: 'Filter by stars'
                    },
                    {
                        type: 'by_main',
                        title: 'Filter by main stat'
                    },
                    {
                        type: 'by_sub',
                        title: 'Filter by sub stats'
                    },
                    {
                        type: 'by_type',
                        title: 'Filter by type'
                    },
                    {
                        type: 'by_set',
                        title: 'Filter by set'
                    }
                ],
                views: [
                    {
                        name: 'full',
                        title: 'Full cards',
                        icon: 'fas fa-square'
                    },
                    {
                        name: 'compressed',
                        title: 'Compressed cards',
                        icon: 'fas fa-th-large'
                    },
                    {
                        name: 'images',
                        title: 'Images only',
                        icon: 'fas fa-th'
                    },
                ]
            }
        },
        methods: {
            asd(){
                bvEvent.preventDefault()
            },
            changeView(name){
                this.inventory_view=name;
                process.client && sessionStorage.setItem('inventoryView', name);
                this.$store.commit('artifacts/setView',name);
            },
            sortInventory(name,type){
                let artifacts=this.artifacts.sort((a, b) => type == 'desc'
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

                this.$store.commit('artifacts/setArtifacts',artifacts);
            },
            setStackFilters(){
                let stack=this.$store.state.artifacts.stack_filters;
                this.$store.commit('artifacts/setStackFilters',!stack)
                console.log(this.$store.state.artifacts.stack_filters)
            },
            filterInventory(type){
                this.$store.commit('artifacts/setActiveFilter',type);
            }
        }
    }
</script>

<style>
    .sort-icon, .filter-icon{
        text-shadow: inset 0px 0px 10px black;
    }

    legend{
        text-shadow: 0px 0px 2px black;
    }

    .sort-inventory .dropdown-menu{
        max-height: 250px !important;
        height: 250px !important;
        overflow-y: auto !important;
    }
</style>