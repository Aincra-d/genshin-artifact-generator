<template>
	<div>
		<ul class="list-unstyled">
			<li class="d-inline">
				<i class="fas fa-circle text-secondary"></i> Inessential
			</li>

			<li class="d-inline">
				<i class="fas fa-circle text-warning"></i> In plan
			</li>

			<li class="d-inline">
				<i class="fas fa-circle text-danger"></i> Important
			</li>

			<li class="d-inline">
				<i class="fas fa-check-square text-success"></i> Done
			</li>
		</ul>

		<ul class="list-unstyled">
			<li
			:key="i"
			v-for="(plan,i) in plans"
			:class="plan.done && 'done'">
				<i
				v-if="!plan.done"
				class="fas fa-circle"
				:class="{'text-secondary': plan.priority == 'low', 'text-warning': plan.priority == 'medium', 'text-danger': plan.priority == 'high'}"
				>
				</i>

				<i
				v-else
				class="fas fa-check-square text-success"></i>

				{{ plan.summary }}
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
					{
						done: true,
						priority: 'high',
						summary: 'Add different views to inventory'
					},
					{
						done: true,
						priority: 'medium',
						summary: 'Exclude option for inventory filters'
					},
					{
						done: true,
						priority: 'medium',
						summary: 'Option to equip artifacts on characters'
					},
					{
						done: true,
						priority: 'medium',
						summary: 'Filter artifacts equipped on selected character(s)'
					},
					{
						done: false,
						priority: 'low',
						summary: 'Filter sub stats by value'
					},
					{
						done: true,
						priority: 'high',
						summary: 'Add pagination to inventory'
					},
					{
						done: true,
						priority: 'medium',
						summary: 'Add counters to filter dropdowns'
					},
					{
						done: true,
						priority: 'high',
						summary: 'Add game-like upgrades to artifact roll'
					},
					{
						done: true,
						priority: 'medium',
						summary: 'Option to delete multiple artifacts from inventory'
					},
					{
						done: true,
						priority: 'high',
						summary: 'Add artifact search option with all filters available'
					},
					{
						done: true,
						priority: 'high',
						summary: 'Add 10x artifact roll option'
					},
					{
						done: true,
						priority: 'high',
						summary: 'Create achievement system'
					},
					{
						done: true,
						priority: 'high',
						summary: 'Add option to view achievements'
					},
					{
						done: false,
						priority: 'medium',
						summary: 'Add feedback/contact form'
					},
					{
						done: true,
						priority: 'medium',
						summary: 'Add more achievement options'
					},
					{
						done: false,
						priority: 'low',
						summary: 'Add user statistics'
					}
				]
			}
		},
		created(){
			this.plans.sort((a,b) => b.done - a.done);
		}
	}
</script>