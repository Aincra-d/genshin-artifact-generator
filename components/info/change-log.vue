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
							'Small changes in the guide'
						]
					},
					{
						date: '2021.03.17',
						changes: [
							'Added different views in inventory',
							'Updated guide',
							'Limited the size of filters in inventory'
						]
					},
					{
						date: '2021.03.19',
						changes: [
							'Added future plans'
						]
					},
				]
			}
		}
	}
</script>