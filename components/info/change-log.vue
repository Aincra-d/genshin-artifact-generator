<template>
	<div>
		<ul class="list-unstyled mt-2">
			<li class="d-inline">
				<button
				:class="type == 'fix' ? 'btn-secondary' : 'btn-outline-secondary'"
				class="btn btn-sm text-light w-32"
				@click="filterUpdates('fix')">
					<i class="fas fa-bug text-success"></i> Fix
				</button>
			</li>

			<li class="d-inline">
				<button
				:class="type == 'feature' ? 'btn-secondary' : 'btn-outline-secondary'"
				class="btn btn-sm text-light w-32"
				@click="filterUpdates('feature')">
					<b class="text-primary">{}</b> Feature
				</button>
			</li>

			<li class="d-inline">
				<button
				:class="type == 'update' ? 'btn-secondary' : 'btn-outline-secondary'"
				class="btn btn-sm text-light w-32"
				@click="filterUpdates('update')">
					<i class="fas fa-exclamation-circle text-info"></i> Update
				</button>
			</li>
		</ul>

		<ul class="list-unstyled py-1">
			<li
			:key="i"
			v-for="(log,i) in logs"
			style="background-color: #282c38;border-left: 3px solid white;"
			class="my-3 px-sm-4 py-1 font-xs-12 rounded">
				<h6 class="ml-2">
					{{ log.date }}

					<i
					v-if="log.types.includes('fix')"
					class="fas fa-bug text-success"></i>

					<b v-if="log.types.includes('feature')"
					class="text-primary">{}</b>

					<i v-if="log.types.includes('update')"
					class="fas fa-exclamation-circle text-info"></i>
				</h6>
				<ul>
					<li
					:key="j"
					v-for="(change,j) in log.changes">
						{{ change }}
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name: 'changeLog',
		data(){
			return {
				type: '',
				logs: [],
				changes: [
					{
						date: '2021.03.14',
						types: [],
						changes: [
							'Genshin Impact Artifact Generator has been deployed!'
						]
					},
					{
						date: '2021.03.15',
						types: ['feature','fix','update'],
						changes: [
							'Added site info modal',
							'Changed app loading screen',
							'Fixed bugs'
						]
					},
					{
						date: '2021.03.16',
						types: ['update'],
						changes: [
							'Updated contact info',
							'Small changes in the guide',
							'Added plans'
						]
					},
					{
						date: '2021.03.17',
						types: ['feature','update'],
						changes: [
							'Added different views to inventory',
							'Updated guide',
							'Limited the size of filters in inventory'
						]
					},
					{
						date: '2021.03.19',
						types: ['update'],
						changes: [
							'Updated plans'
						]
					},
					{
						date: '2021.03.20',
						types: ['feature','fix'],
						changes: [
							'Added pagination support to inventory',
							'Added roll stats to artifact generator',
							"Fixed not working inventory view changing"
						]
					},
					{
						date: '2021.03.21',
						types: ['feature'],
						changes: [
							'Added game-like upgrade option to artifact generator'
						]
					},
					{
						date: '2021.03.22',
						types: ['update','feature'],
						changes: [
							'Updated guide',
							'Updated plans'
						]
					},
					{
						date: '2021.03.24',
						types: ['update','feature'],
						changes: [
							'Improved background logic',
							'Added exclude option to inventory filters',
							'Updated guide'
						]
					},
					{
						date: '2021.03.25',
						types: ['update','feature'],
						changes: [
							'Design improvements',
							'Added counters to filter dropdown',
							'Added option to delete artifacts in inventory'
						]
					},
					{
						date: '2021.03.26',
						types: ['feature','update'],
						changes: [
							'Added select all option to deleting artifacts in inventory',
							'Design improvements',
							'Single filters no longer filter automatically when selecting from dropdown',
							'Added "Select all" and "Apply" option to filter dropdowns',
							'Added search option to sets filter dropdown'
						]
					},
					{
						date: '2021.03.27',
						types: ['feature'],
						changes: [
							'Added "Notices" tab',
							'Added artifact search option'
						]
					},
					{
						date: '2021.03.28',
						types: ['feature'],
						changes: [
							'Changed delete artifacts option in inventory from dropdown option to a separate button'
						]
					},
					{
						date: '2021.03.30',
						types: ['feature','update'],
						changes: [
							'Moved "Exclude filters" option in inventory to filter dropdown',
							'Small design changes'
						]
					},
					{
						date: '2021.03.31',
						types: ['update','feature'],
						changes: [
							'Changed star and type filter into dropdowns',
							'Added "Exclude" option to each filter options, now you can separately set each filter type to include/exclude the selected options',
							'Added 10x roll option to artifact generator'
						]
					},
					{
						date: '2021.04.01',
						types: ['fix'],
						changes: [
							'Fixed upgrade and sub reroll issues when rolling 10x'
						]
					},
					{
						date: '2021.04.02',
						types: ['update','feature','fix'],
						changes: [
							'Small design changes',
							'Both single and 10x options are available when opening the app',
							'Updated plans',
							'After doing a 10x roll, the first artifact is already visible',
							'Design issue fixes'
						]
					},
					{
						date: '2021.04.03',
						types: ['fix','update'],
						changes: [
							'Design issue fixes',
							'Improved usability'
						]
					},
					{
						date: '2021.04.05',
						types: ['feature'],
						changes: [
							'Grouped sort options in inventory'
						]
					},
					{
						date: '2021.04.06',
						types: ['feature'],
						changes: [
							'Changed domain select in artifact generator from select into a collapsable menu with the image of sets displayed'
						]
					},
					{
						date: '2021.04.07',
						types: ['feature'],
						changes: [
							'Clicking/touching an artifact in "Images only" view will show the main and sub stats. You can also edit your artifact from there',
							'Added option to display selected filters'
						]
					},
					{
						date: '2021.04.11',
						types: ['update','feature'],
						changes: [
							'Improved background logic',
							'Implemented achievement system! You can earn new achievements by rolling artifacts, upgrading and adding them to your inventory. Option to view them will also be added in the near future!',
							'Added labels to updates based on their type, and you can filter them',
							'Improved updates design',
							'Changed artifact window design',
							'Added upgrade level select option to artifact window in inventory'
						]
					},
					{
						date: '2021.04.13',
						types: ['feature','update'],
						changes: [
							'Added option to view your achievement progress',
							'Added more achievements. Earn new achievements by upgrading artifacts to their max level and adding different kind of artifacts to your inventory',
							'Added different kind of animations to inventory',
							'Updated plans'
						]
					},
					{
						date: '2021.04.14',
						types: ['update'],
						changes: [
							'Design improvements',
							"On touch devices, inventory and achievements won't load automatically when the app loads to improve performance"
						]
					},
					{
						date: '2021.04.15',
						types: ['fix'],
						changes: [
							"Fixed app crashing after trying to add artifact to inventory if it's empty. My apologies to everyone who couldn't use the app because of it."
						]
					},
					{
						date: '2021.04.18',
						types: ['update','fix'],
						changes: [
							'Improved background logic',
							'Improved performance',
							'Fixed wrong achievement notification when earning new "Overall" achievement while rolling in domain'
						]
					},
					{
						date: '2021.04.22',
						types: ['feature'],
						changes: [
							'Added option to lock artifacts when rolling and in inventory. Locked artifacts cannot be deleted from your inventory.'
						]
					},
				]
			}
		},
		methods: {
			filterUpdates(type){
				if(this.type == type){
					this.type='';
					this.logs=this.changes
					return
				}

				this.logs=this.changes;
				this.logs=this.logs.filter(log => log.types.includes(type));
				this.type=type;
			}
		},
		created(){
			this.changes.reverse();
			this.logs=this.changes;
		}
	}
</script>