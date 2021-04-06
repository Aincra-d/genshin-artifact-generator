<template>
	<div>
		<b-dropdown
        class="m-0 sort-inventory"
        :size="screen < 576 ? 'md' : 'lg'"
        variant="link">
            <template v-slot:button-content>
                <i class="fas fa-sort sort-icon"></i>
            </template>

            <b-dropdown-group
            :key="i"
            v-for="(sort,i) in sorts"
            :header="'Sort by '+sort.icon+sort.name">
            	<b-dropdown-item
	            @click="sortInventory(sorts[i].name,'asc')">
	                <span>
	                	Ascending <i class="fas fa-angle-up"></i>
	                </span>
	            </b-dropdown-item>

	            <b-dropdown-item
	            @click="sortInventory(sorts[i].name,'desc')">
	                <span>
	                	Descending <i class="fas fa-angle-down"></i>
	                </span>
	            </b-dropdown-item>
	        </b-dropdown-group>
        </b-dropdown>
	</div>
</template>

<script>
	export default{
		name: 'sortInventory',
		computed: {
			artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            screen(){
                return this.$store.state.artifacts.screen
            }
		},
		methods: {
			sortInventory(name,type){
				this.$store.commit('artifacts/sortInventory',{name,type});
            }
		},
		data(){
			return {
				sorts: [
                    {
                        name: 'HP',
                        icon: '❤️'
                    },
                    {
                        name: 'HP%',
                        icon: '❤️'
                    },
                    {
                        name: 'DEF',
                        icon: '🛡️'
                    },
                    {
                        name: 'DEF%',
                        icon: '🛡️'
                    },
                    {
                        name: 'ATK',
                        icon: '⚔️'
                    },
                    {
                        name: 'ATK%',
                        icon: '⚔️'
                    },
                    {
                        name: 'Energy Recharge%',
                        icon: '⚡'
                    },
                    {
                        name: 'Elemental Mastery',
                        icon: '🔥'
                    },
                    {
                        name: 'CRIT Rate%',
                        icon: '🎯'
                    },
                    {
                        name: 'CRIT DMG%',
                        icon: '🎯'
                    },
                ]
			}
		}
	}
</script>