<template>
	<div>
		<h5 class="text-light">
			Test the RNG and see how many rolls it would take to have your desired artifact rolled.
		</h5>

		<set-select>
		</set-select>

		<br>

		<main-select>
		</main-select>

		<br>

		<sub-select>
		</sub-select>
	</div>
</template>

<script>
	import setSelect from './artifactRngTest/set-select.vue';
	import mainSelect from './artifactRngTest/main-select.vue';
	import subSelect from './artifactRngTest/sub-select.vue';

	export default{
		name: 'artifactRngTest',
		components: {
			'set-select': setSelect,
			'main-select': mainSelect,
			'sub-select': subSelect,
		}
	}
</script>