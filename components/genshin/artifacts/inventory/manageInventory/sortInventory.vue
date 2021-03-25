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
            }
		},
		data(){
			return {
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
                ]
			}
		}
	}
</script>