<template>
	<div>
		<h5 class="text-light">
			Test the RNG and see how many rolls it would take to have your desired artifact rolled.
		</h5>

		<!-- <div>
		<set-select></set-select><br>	
		</div> -->

		<div class="d-block d-sm-inline-block d-md-block d-xl-inline-block mb-3 mb-sm-0 mb-md-3 md-xl-0">
			<type-select></type-select>
		</div>

		<div class="d-block d-sm-inline-block d-md-block d-xl-inline-block mb-3 mb-sm-0 mb-md-3 md-xl-0" v-if="artifact_type != ''">
			<main-select></main-select>
		</div>

		<div class="d-block d-sm-inline-block d-md-block d-xl-inline-block mb-3 mb-sm-0 mb-md-3 md-xl-0">
			<sub-select v-if="artifact_main != ''"></sub-select>
		</div>
	</div>
</template>

<script>
	import typeSelect from './artifactRngTest/type-select.vue';
	// import setSelect from './artifactRngTest/set-select.vue';
	import mainSelect from './artifactRngTest/main-select.vue';
	import subSelect from './artifactRngTest/sub-select.vue';


	// const artifact = () => import('@/components/genshin/artifacts/artifact.vue');
 //    import artifactActions from '@/components/genshin/artifacts/roll/artifact-actions.vue';
 //    const upgradeModal = () => import('@/components/genshin/artifacts/roll/upgrade-modal.vue');
 //    const rollModal = () => import('@/components/genshin/artifacts/roll/roll-modal.vue');
 //    import domainSelect from './domainSelect.vue';
 //    import rollSettings from './rollSettings.vue';
 //    import substatsJSON from '~/static/substats.json';
 //    import domainsJSON from '~/static/domains.json';
 //    import mainstatsJSON from '~/static/mainstats.json';
 //    import setsJSON from '~/static/sets.json';
 //    import { uuid } from 'vue-uuid';
 //    // import { updateAchievements } from './updateAchievements.js';
 //    const updateAchievements = () => import('../updateAchievements.js');

 //    //artifactMethods().then( method  => method.artifactMethods.setSubs(this));
 //    const artifactMethods = () => import('../artifactMethods.js');

	export default{
		name: 'artifactRngTest',
		components: {
			'type-select': typeSelect,
			// 'set-select': setSelect,
			'main-select': mainSelect,
			'sub-select': subSelect,
		},
		computed: {
			artifact_type(){
				return this.$store.state.artifacts.rng_test.selected_type
			},
			artifact_main(){
				return this.$store.state.artifacts.rng_test.selected_main
			},
		}
		// data(){
  //           return {
  //               artifacts: [],
  //               current_artifact: {},
  //               roll_counter: process.client && (localStorage.roll_counter || 0),
  //               max_upgrades: process.client && (localStorage.max_upgrades || 0),
  //               all_subs: [],
  //               sub_stats: substatsJSON,
  //               domains: domainsJSON,
  //               main_stats: mainstatsJSON,
  //               sub_stat_names: substatsJSON.map(sub => sub.name),
  //               domain_names: domainsJSON.map(domain => domain.name),
  //               sets: setsJSON,
  //               max_sub_counts: [1,2,4,4,4],
  //               roll_stats_toggled: false,
  //               upgrades: [],
  //               old_main_value: 0,
  //               rolled: false,
  //               loaded: false,
  //               // achievements: process.client && (JSON.parse(localStorage.achievements) || {})
  //               // roll_count: 0
  //           }
  //       },
	}
</script>