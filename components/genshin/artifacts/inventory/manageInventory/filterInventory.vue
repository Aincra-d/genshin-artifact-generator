<template>
	<div>
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
	</div>
</template>

<script>
	export default{
		name: 'filterInventory',
		computed: {
            screen(){
                return this.$store.state.artifacts.screen
            }
		},
        data(){
            return {
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
        },
		methods: {
			filterInventory(type){
                this.$store.commit('artifacts/setActiveFilter',type);
            }
		}
	}
</script>