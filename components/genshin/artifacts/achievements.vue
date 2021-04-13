<template>
	<div>
		<div class="accordion text-light" role="tablist">
		    <roll-achievements>
		    </roll-achievements>

		    <upgrade-achievements>
		    </upgrade-achievements>

		    <inventory-achievements>
		    </inventory-achievements>
		</div>
	</div>
</template>

<script>
	import rollAchievements from './achievements/rollAchievements.vue';
	import upgradeAchievements from './achievements/upgradeAchievements.vue';
	import inventoryAchievements from './achievements/inventoryAchievements.vue';

	export default{
		name: 'achievements',
		components: {
			'roll-achievements': rollAchievements,
			'upgrade-achievements': upgradeAchievements,
			'inventory-achievements': inventoryAchievements,
		}
	}
</script>