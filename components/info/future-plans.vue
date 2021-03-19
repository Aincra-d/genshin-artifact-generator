<template>
	<div>
		<ul>
			<li
			:key="i"
			v-for="(plan,i) in plans">
				{{ plan }}
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name: 'futurePlans',
		data(){
			return {
				plans: [
					'Exclude option for inventory filters',
					'Option to equip artifacts on characters',
					'Filter sub stats by value'
				]
			}
		}
	}
</script>