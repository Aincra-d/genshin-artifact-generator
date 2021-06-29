<template>
	<div>
		<h6 class="text-light">
			Generate one of your desired artifacts each day by selecting a 5* set, piece type, then main and sub stats manually.
		</h6>

		<div class="d-block d-sm-inline-block d-md-block d-xl-inline-block mb-3 mb-sm-0 mb-md-3 md-xl-0">
			<set-select></set-select>	
		</div>

		<div class="d-block d-sm-inline-block d-md-block d-xl-inline-block mb-3 mb-sm-0 mb-md-3 md-xl-0"
		v-if="selected_set != ''">
			<type-select></type-select>
		</div>

		<div class="d-block d-sm-inline-block d-md-block d-xl-inline-block mb-3 mb-sm-0 mb-md-3 md-xl-0"
		v-if="selected_type != ''">
			<main-select></main-select>
		</div>

		<div class="d-block d-sm-inline-block d-md-block d-xl-inline-block mb-3 mb-sm-0 mb-md-3 md-xl-0">
			<sub-select v-if="selected_main != ''"></sub-select>
		</div>

		<div class="text-center">
			<button
			type="button"
			class="btn btn-primary"
			:disabled="(selected_set == '' || selected_type == '' || selected_main == '' || selected_subs.length <3) || rolled"
			@click="selected_set != '' && selected_type != '' && selected_main != '' && selected_subs.length != 0 && generateArtifact()">
				<span>
					Generate artifact
				</span>
			</button>
		</div>
	</div>
</template>

<script>
    import { uuid } from 'vue-uuid';
	import typeSelect from './artifactRngTest/type-select.vue';
	import setSelect from './artifactRngTest/set-select.vue';
	import mainSelect from './artifactRngTest/main-select.vue';
	import subSelect from './artifactRngTest/sub-select.vue';
    import substatsJSON from '~/static/substats.json';
    import mainstatsJSON from '~/static/mainstats.json';
    import setsJSON from '~/static/sets.json';
	export default{
		name: 'artifactRngTest',
		components: {
			'type-select': typeSelect,
			'set-select': setSelect,
			'main-select': mainSelect,
			'sub-select': subSelect,
		},
		computed: {
			selected_set(){
				return this.$store.state.artifacts.gold_artifact.selected_set
			},
			selected_type(){
				return this.$store.state.artifacts.gold_artifact.selected_type
			},
			selected_main(){
				return this.$store.state.artifacts.gold_artifact.selected_main
			},
			selected_subs(){
				return this.$store.state.artifacts.gold_artifact.selected_subs
			}
		},
		data(){
            return {
                // artifacts: [],
                current_artifact: {},
                all_subs: [],
                sub_stats: substatsJSON,
                main_stats: mainstatsJSON,
                sub_stat_names: substatsJSON.map(sub => sub.name),
                sets: setsJSON,
                rolled: false
            }
        },
		methods: {
			generateArtifact(){
				let rerolls={
		            main: {
		                count: 0
		            },
		            subs: {
		                count: 0
		            }
		        };

		        let subs=[];

		        this.selected_subs.forEach(sub => {
		        	subs.push({
		        		name: sub,
		        		value: this.all_subs.filter(_sub => _sub.name == sub)[0].values[Math.floor(Math.random() * this.all_subs.filter(_sub => _sub.name == sub)[0].values.length)]
		        	});
		        });

		        let main={
		        	name: this.selected_main,
		        	value: this.main_stats.filter(main => main.name == this.selected_main)[0].values['5'][0]
		        }

				let artifact={
		            id: uuid.v1(),
		            stats: {
		                main: main,
		                subs: subs
		            },
		            info: {
		                'set': this.sets.filter(set => set.name == this.selected_set)[0],
		                piece: this.sets.filter(set => set.name == this.selected_set)[0].pieces.filter(piece => piece.type == this.selected_type)[0],
		                stars: 5,
		                level: 0,
		                max_level: 20,
		                rerolls,
		                locked: false,
		                equipped: false
		            }
		        };

		        this.$store.commit('artifacts/setGoldRoll',artifact);
		        let date=new Date();
		        let roll_date=(date.getMonth()+1)+''+date.getDate();
		        localStorage.setItem('roll_date', roll_date);

		        this.rolled=true;
		        this.$store.commit('artifacts/setGoldRolled',true);

		        this.$notify({
			        group: 'foo',
			        type: 'success',
			        duration: 1000,
			        title: '<h6>Artifact successfully generated!</h6>'
			    });
			},
		    setSubs(){
	        	this.all_subs=
		        [
		            {
		                "name": "HP",
		                "values": [209,239,269,299]
		            },
		            {
		                "name": "ATK",
		                "values": [14,16,18,19]
		            },
		            {
		                "name": "DEF",
		                "values": [16,  19,  21,  23]
		            },
		            {
		                "name": "Elemental Mastery",
		                "values": [16,  19,  21,  23]
		            },
		            {
		                "name": "HP%",
		                "values": [4.1,  4.7,  5.3,  5.8]
		            },
		            {
		                "name": "ATK%",
		                "values": [4.1,  4.7,  5.3,  5.8]
		            },
		            {
		                "name": "DEF%",
		                "values": [5.1,  5.8,  6.6,  7.3]
		            },
		            {
		                "name": "Energy Recharge%",
		                "values": [4.5,  5.2,  5.8,  6.5]
		            },
		            {
		                "name": "CRIT Rate%",
		                "values": [2.7,  3.1,  3.5,  3.9]
		            },
		            {
		                "name": "CRIT DMG%",
		                "values": [5.4,  6.2,  7,  7.8]
		            }
		        ];
		    }
		},
		created(){
			this.setSubs();
		}
	}
</script>