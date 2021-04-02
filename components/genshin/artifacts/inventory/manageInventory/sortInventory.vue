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
                <span>
                	{{sort.title}}
                	({{ sort.type }} <i :class="sort.icon"></i>)
                </span>
            </b-dropdown-item>
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
                        type: 'desc',
                        icon: 'fas fa-angle-down',
                        title: '❤️ Sort by HP'
                    },
                    {
                        name: 'HP',
                        type: 'asc',
                        icon: 'fas fa-angle-up',
                        title: '❤️ Sort by HP'
                    },
                    {
                        name: 'HP%',
                        type: 'desc',
                        icon: 'fas fa-angle-down',
                        title: '❤️ Sort by HP%'
                    },
                    {
                        name: 'HP%',
                        type: 'asc',
                        icon: 'fas fa-angle-up',
                        title: '❤️ Sort by HP%'
                    },
                    {
                        name: 'DEF',
                        type: 'desc',
                        icon: 'fas fa-angle-down',
                        title: '🛡️ Sort by DEF'
                    },
                    {
                        name: 'DEF',
                        type: 'asc',
                        icon: 'fas fa-angle-up',
                        title: '🛡️ Sort by DEF'
                    },
                    {
                        name: 'DEF%',
                        type: 'desc',
                        icon: 'fas fa-angle-down',
                        title: '🛡️ Sort by DEF%'
                    },
                    {
                        name: 'DEF%',
                        type: 'asc',
                        icon: 'fas fa-angle-upext-primary',
                        title: '🛡️ Sort by DEF%'
                    },
                    {
                        name: 'ATK',
                        type: 'desc',
                        icon: 'fas fa-angle-down',
                        title: '⚔️ Sort by ATK'
                    },
                    {
                        name: 'ATK',
                        type: 'asc',
                        icon: 'fas fa-angle-up',
                        title: '⚔️ Sort by ATK'
                    },
                    {
                        name: 'ATK%',
                        type: 'desc',
                        icon: 'fas fa-angle-down',
                        title: '⚔️ Sort by ATK%'
                    },
                    {
                        name: 'ATK%',
                        type: 'asc',
                        icon: 'fas fa-angle-upext-primary',
                        title: '⚔️ Sort by ATK%'
                    },
                    {
                        name: 'Energy Recharge%',
                        type: 'desc',
                        icon: 'fas fa-angle-down',
                        title: '⚡ Sort by Energy Recharge%'
                    },
                    {
                        name: 'Energy Recharge%',
                        type: 'asc',
                        icon: 'fas fa-angle-down',
                        title: '⚡ Sort by Energy Recharge%'
                    },
                    {
                        name: 'Elemental Mastery',
                        type: 'desc',
                        icon: 'fas fa-angle-down',
                        title: '🔥 Sort by Elemental Mastery'
                    },
                    {
                        name: 'Elemental Mastery',
                        type: 'asc',
                        icon: 'fas fa-angle-down',
                        title: '🔥 Sort by Elemental Mastery'
                    },
                    {
                        name: 'CRIT Rate%',
                        type: 'desc',
                        icon: 'fas fa-angle-down',
                        title: '🎯 Sort by CRIT Rate%'
                    },
                    {
                        name: 'CRIT Rate%',
                        type: 'asc',
                        icon: 'fas fa-angle-down',
                        title: '🎯 Sort by CRIT Rate%'
                    },
                    {
                        name: 'CRIT DMG%',
                        type: 'desc',
                        icon: 'fas fa-angle-down',
                        title: '🎯 Sort by CRIT DMG%'
                    },
                    {
                        name: 'CRIT DMG%',
                        type: 'asc',
                        icon: 'fas fa-angle-down',
                        title: '🎯 Sort by CRIT DMG%'
                    },
                ]
			}
		}
	}
</script>