<template>
	<div>
		<b-dropdown
        class="m-0"
        :size="screen < 576 ? 'md' : 'lg'"
        variant="link">
            <template v-slot:button-content>
                <i class="fas fa-filter filter-icon"></i>
            </template>

            <!-- <button
            type="button"
            class="btn btn-secondary btn-sm w-100 rounded-0"
            @click="exclude_filters=!exclude_filters">
                <i
                class="fa-sm"
                :class="exclude_filters ? 'fas fa-check-square' : 'far fa-square'"></i>
                Exclude filters
            </button> -->

            <b-dropdown-item
            :key="i"
            v-for="(filter,i) in filter"
            @click="filterInventory(filter.type)">
<!--                 <i
                class="fa-sm"
                :class="filter_types[filter.type] ? 'fas fa-check-square' : 'far fa-square'"></i>
 -->
                <span :class="filter_types[filter.type] ? 'text-primary' : 'text-dark'">
                    {{filter.title}}
                </span>

            </b-dropdown-item>
        </b-dropdown>
	</div>
</template>

<script>
	export default{
		name: 'filterInventory',
		computed: {
            filter_types(){
                return this.$store.state.artifacts.filters
            },
            screen(){
                return this.$store.state.artifacts.screen
            },
            // exclude_filters: {
            //     get(){
            //         return this.$store.state.artifacts.exclude_filters
            //     },
            //     set(value){
            //         this.$store.commit('artifacts/setFilterType',value);
            //     }
            // }
		},
        data(){
            return {
                filter: [
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
                    },
                    {
                        type: 'by_character',
                        title: 'Filter by characters'
                    }
                ]
            }
        },
		methods: {
			filterInventory(type){
                this.$store.commit('artifacts/setActiveFilter',type);
            }
		}
	}
</script>