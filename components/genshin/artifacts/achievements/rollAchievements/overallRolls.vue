<template>
	<div>
        <p class="font-italic">
            Roll artifacts a certain amount of times to unlock new achievements.
        </p>

        <ul class="list-unstyled">
        	<li
        	:key="i"
        	v-for="(roll,i) in overall"
        	style="background-color: #282c38;border-left: 3px solid white;"
			class="col-6 col-sm-4 col-md-3 col-xl-2 d-inline-block my-1 px-0 py-2 px-sm-1 px-md-3 font-12 rounded">
        		<h6 :class="roll.done ? 'font-weight-bold' : 'text-secondary'">
        			{{ roll.value }}
        			<i
        			v-if="roll.done"
        			class="fas fa-check-circle text-success"></i>
        		</h6>
        	</li>
        </ul>
	</div>
</template>

<script>
	export default{
		name: 'overallRolls',
		computed: {
            overall(){
                return this.$store.state.artifacts.achievements.rolls.overall
            }
        }
	}
</script>