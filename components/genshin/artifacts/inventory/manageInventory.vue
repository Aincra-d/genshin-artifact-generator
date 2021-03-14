<template>
    <div>
        <b-dropdown
        class="m-0 sort-inventory"
        size="md"
        variant="link">
            <template v-slot:button-content>
                <i class="fas fa-sort sort-icon"></i>
            </template>

            <b-dropdown-item
            :key="i"
            v-for="(sort,i) in sorts"
            @click="$emit('sort-inventory',sorts[i].name,sorts[i].type)">
                <i
                class="fas mr-2"
                :class="sort.icon">
                </i>
                
                <span>{{sort.title}}</span>
            </b-dropdown-item>

           <!--  <b-dropdown-item
            @click="$emit('sort-bystats')">

                <span>
                    Sort by sub stats
                </span>

            </b-dropdown-item> -->
        </b-dropdown>

        <b-dropdown
        class="m-0"
        size="md"
        variant="link">
            <template v-slot:button-content>
                <i class="fas fa-filter filter-icon"></i>
            </template>

            <b-dropdown-item
            :key="i"
            v-for="(filter,i) in filters"
            @click="$emit('filter-inventory',filter.type)">

                <span>{{filter.title}}</span>

            </b-dropdown-item>
        </b-dropdown>

        <b-form-checkbox
        class="text-light d-inline-block"
        v-model="stack_filters"
        @input="$emit('set-stack-filters',stack_filters)"
        size="md">
            Stack filters
        </b-form-checkbox>

        <button
        type="button"
        class="btn btn-light btn-sm d-inline-block ml-2 py-0"
        @click="$emit('reset-inventory')">
            <i class="fas fa-redo mr-1"></i> Reset inventory
        </button>
    </div>
</template>

<script>
    export default{
        name: 'manageInventory',
        data(){
            return {
                stack_filters: false,
                sorts: [
                    // {
                    //     type: 'stars',
                    //     sort: 'desc',
                    //     icon:'fa-star text-warning',
                    //     title: 'Sort by stars (desc 5-1)'
                    // },
                    // {
                    //     type: 'stars',
                    //     sort: 'asc',
                    //     icon:'fa-star text-warning',
                    //     title: 'Sort by stars (asc 1-5)'
                    // },
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
                ]
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