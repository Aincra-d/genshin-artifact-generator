<template>
	<div>
		<ul>
			<li
			:key="i"
			v-for="(log,i) in logs">
				<h6>
					{{ log.date }}
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
				logs: [
					{
						date: '2021.03.15',
						changes: [
							'Added site info modal',
							'Changed app loading screen',
							'Fixed bugs'
						]
					},
					{
						date: '2021.03.16',
						changes: [
							'Updated contact info',
							'Small changes in the guide',
							'Added future plans'
						]
					},
					{
						date: '2021.03.17',
						changes: [
							'Added different views to inventory',
							'Updated guide',
							'Limited the size of filters in inventory'
						]
					},
					{
						date: '2021.03.19',
						changes: [
							'Added more future plans'
						]
					},
					{
						date: '2021.03.20',
						changes: [
							'Added pagination support to inventory',
							'Added roll stats to artifact roll',
							"Fixed not working inventory view changing"
						]
					},
					{
						date: '2021.03.21',
						changes: [
							'Added game-like upgrade option to artifact roll'
						]
					},
					{
						date: '2021.03.22',
						changes: [
							'Updated guide',
							'Added more future plans'
						]
					},
					{
						date: '2021.03.24',
						changes: [
							'Improved background logic',
							'Added exclude option to inventory filters',
							'Updated guide'
						]
					},
					{
						date: '2021.03.25',
						changes: [
							'Design improvements',
							'Added counters to filter dropdown',
							'Added option to delete artifacts in inventory'
						]
					},
					{
						date: '2021.03.26',
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
						changes: [
							'Added "Notices" tab',
							'Added artifact search option'
						]
					},
					{
						date: '2021.03.28',
						changes: [
							'Changed delete artifacts option in inventory from dropdown option to a separate button'
						]
					},
					{
						date: '2021.03.30',
						changes: [
							'Moved "Exclude filters" option in inventory to filter dropdown',
							'Small design changes'
						]
					},
					{
						date: '2021.03.31',
						changes: [
							'Changed star and type filter into dropdowns',
							'Added "Exclude" option to each filter options, now you can separately set each filter type to include/exclude the selected options',
							'Added 10x roll option to artifact roll'
						]
					},
					{
						date: '2021.04.01',
						changes: [
							'Fixed upgrade and sub reroll issues when rolling 10x'
						]
					},
					{
						date: '2021.04.02',
						changes: [
							'Small design changes',
							'Both single and 10x options are available when opening the app',
							'Added more future plans',
							'After doing a 10x roll, the first artifact is already visible',
							'Design issue fixes'
						]
					},
					{
						date: '2021.04.03',
						changes: [
							'Design issue fixes',
							'Improved usability'
						]
					},
					{
						date: '2021.04.05',
						changes: [
							'Grouped sort options in inventory'
						]
					}
				]
			}
		},
		created(){
			this.logs.reverse();
		}
	}
</script>