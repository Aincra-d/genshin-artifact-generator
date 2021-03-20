<template>
	<div>
		<ul class="list-unstyled">
			<li class="d-inline">
				<i class="fas fa-circle text-secondary"></i> - low priority
			</li>

			<li class="d-inline">
				<i class="fas fa-circle text-warning"></i> - medium priority
			</li>

			<li class="d-inline">
				<i class="fas fa-circle text-danger"></i> - high priority
			</li>

			<li class="d-inline">
				<i class="fas fa-check-square text-success"></i> - done
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
						done: false,
						priority: 'medium',
						summary: 'Exclude option for inventory filters'
					},
					{
						done: false,
						priority: 'low',
						summary: 'Option to equip artifacts on characters'
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
				]
			}
		},
		created(){
			this.plans.sort((a,b) => b.done - a.done);
		}
	}
</script>