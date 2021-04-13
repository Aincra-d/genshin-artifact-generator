<template>
	<div>
		<p class="font-italic">
            Roll artifacts in domains to unlock new achievements.    
        </p>

		<b-card
    	:key="i"
    	v-for="(domain,i) in domains"
    	no-body
    	class="mb-1">
	    	<b-card-header header-tag="header" class="p-1" role="tab">
	    		<b-button
	    		block
	    		style="box-shadow: inset 0px 0px 40px black"
	    		variant="outline-light"
	    		@click="toggleCollapses(domain.name)">
	    			{{ domain.name }}
	    			({{
	    				Math.round((domain.values.filter(roll => roll.done).length*100/domain.values.length))
	    			}}%)
	    		</b-button>
	    	</b-card-header>

	    	<b-collapse
	    	:id="domain.name"
	    	accordion="my-accordion2"
	    	role="tabpanel"
	    	class="text-light">
	    		<b-card-body>
	    			<ul class="list-unstyled">
                    	<li
			        	:key="i"
			        	v-for="(roll,i) in domain.values"
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
	    		</b-card-body>
	    	</b-collapse>
	    </b-card>
	</div>
</template>

<script>
	export default{
		name: 'domainRolls',
		computed: {
            domains(){
                return this.$store.state.artifacts.achievements.rolls.domains
            }
        },
        methods: {
        	toggleCollapses(id) {
        		this.$root.$emit('bv::toggle::collapse', id)
        	}
        }
	}
</script>