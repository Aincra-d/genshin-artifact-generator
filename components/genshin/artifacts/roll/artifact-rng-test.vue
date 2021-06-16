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

		<div class="d-block d-sm-inline-block d-md-block d-xl-inline-block mb-3 mb-sm-0 mb-md-3 md-xl-0" v-if="selected_type != ''">
			<main-select></main-select>
		</div>

		<div class="d-block d-sm-inline-block d-md-block d-xl-inline-block mb-3 mb-sm-0 mb-md-3 md-xl-0">
			<sub-select v-if="selected_main != ''"></sub-select>
		</div>

		<div class="text-center">
			<button
			type="button"
			class="btn btn-primary"
			:disabled="selected_type == '' || selected_main == '' || selected_subs.length <3"
			@click="selected_type != '' && selected_main != '' && selected_subs.length != 0 && startTest()">
				<span v-if="!counting">
					Start test
				</span>

				<i
				v-else
				class="fas fa-spinner fa-spin"></i>
			</button>
		</div>

		<h6 class="text-light">
			{{ counter }} rolls
		</h6>
	</div>
</template>

<script>
	import typeSelect from './artifactRngTest/type-select.vue';
	// import setSelect from './artifactRngTest/set-select.vue';
	import mainSelect from './artifactRngTest/main-select.vue';
	import subSelect from './artifactRngTest/sub-select.vue';
    import substatsJSON from '~/static/substats.json';
    import mainstatsJSON from '~/static/mainstats.json';
    import setsJSON from '~/static/sets.json';
	export default{
		name: 'artifactRngTest',
		components: {
			'type-select': typeSelect,
			// 'set-select': setSelect,
			'main-select': mainSelect,
			'sub-select': subSelect,
		},
		computed: {
			selected_type(){
				return this.$store.state.artifacts.rng_test.selected_type
			},
			selected_main(){
				return this.$store.state.artifacts.rng_test.selected_main
			},
			selected_subs(){
				return this.$store.state.artifacts.rng_test.selected_subs
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
                counter: 0,
                counting: false
            }
        },
		methods: {
			startTest(){
				this.counting=true;
				this.counter=0;

				let match=false;

				let self=this;
				setTimeout(function() {
					while(!match){
						self.roll();
						self.counter++;

						let artifact_subs=self.current_artifact.stats.subs.map(sub => sub.name);

						if(self.current_artifact.info.piece.type == self.selected_type
							&& self.current_artifact.stats.main.name == self.selected_main
							&& (
								artifact_subs.includes(self.selected_subs[0])
								&& artifact_subs.includes(self.selected_subs[1])
								&& artifact_subs.includes(self.selected_subs[2])
							)){
							match=true;
						}
					}
				}, 500);

				this.counting=false;
			},
			roll(){
		        this.sub_stats=this.all_subs;
		        this.setSubs();
		        let sets = this.sets;

		        //SET MAIN STATS BASED ON THE TYPE OF THE ARTIFACT
		        let set=sets.filter(set => set.stars.includes(5))[Math.floor(Math.random() * sets.filter(set => set.stars.includes(5)).length)];
		        let piece=set.pieces[Math.floor(Math.random() * set.pieces.length)];
		        let subs=[];

		        let main_stats=this.main_stats.filter(main => main.types.includes(piece.type)).map(main => main.name);

		        let stars=set.stars[Math.floor(Math.random() * set.stars.length)];
		        let random_main=main_stats[Math.floor(Math.random() * main_stats.length)];

		        let main={
		            name: random_main,
		            // value: this.main_stats[stars-1].stats[random_main][0]
		            value: this.main_stats.filter(main => main.name == random_main)[0].values[stars][0]

		        };

		        this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === main.name),1);


		        //SET THE NUMBER OF SUBSTATS
		        let sub_rolls;

		        switch (stars) {
		            case 5: sub_rolls=Math.random() < 0.2 ? 4 : 3; break;
		            case 4: sub_rolls=Math.random() < 0.4 ? 3 : 2; break;
		        }

		        //ROLL RANDOM SUBSTATS
		        for(let i=0; i<sub_rolls; i++){
		            let random_sub=this.sub_stats[Math.floor(Math.random() * this.sub_stats.length)];

		            subs.push({
		                name: random_sub.name,
		                value: random_sub.values[stars][Math.floor(
		                    Math.random() * random_sub.values[stars].length)],
		                level: 0
		            });
		            // this.sub_stats=this.sub_stats.filter(sub => sub.name != random_sub.name);
		            this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === random_sub.name),1);
		        }

		        //CREATE ARTIFACT OBJECT
		        let artifact={
		            stats: {
		                main,
		                subs
		            },
		            info: {
		                'set': set,
		                piece,
		                stars,
		                level: 0
		            }
		        };

		        // this.artifacts.push(artifact);
		        this.sub_stats=this.all_subs;
		        this.setSubs();
		        this.current_artifact=artifact;
		    },
		    setSubs(){
	        	this.all_subs=
		        [
		            {
		                "name": "HP",
		                "values": {
		                    "1": [24],
		                    "2": [50,61,72],
		                    "3": [100,115,129,143],
		                    "4": [167,191,215,239],
		                    "5": [209,239,269,299]
		                }
		            },
		            {
		                "name": "ATK",
		                "values": {
		                    "1": [2],
		                    "2": [3,4,5],
		                    "3": [7,8,9],
		                    "4": [11,12,14,16],
		                    "5": [14,16,18,19]
		                }
		            },
		            {
		                "name": "DEF",
		                "values": {
		                    "1": [2],
		                    "2": [4,5,6],
		                    "3": [8,9,10,11],
		                    "4": [13,  15,  17,  19],
		                    "5": [16,  19,  21,  23]
		                }
		            },
		            {
		                "name": "Elemental Mastery",
		                "values": {
		                    "1": [6],
		                    "2": [7,  8,  9],
		                    "3": [10,  11,  13,  14],
		                    "4": [13,  15,  17,  19],
		                    "5": [16,  19,  21,  23]
		                }
		            },
		            {
		                "name": "HP%",
		                "values": {
		                    "1": [1.2,  1.5],
		                    "2": [1.6,  2,  2.3],
		                    "3": [2.5,  2.8,  3.2,  3.5],
		                    "4": [3.3,  3.7,  4.2,  4.7],
		                    "5": [4.1,  4.7,  5.3,  5.8]
		                }
		            },
		            {
		                "name": "ATK%",
		                "values": {
		                    "1": [1.2,  1.5],
		                    "2": [1.6,  2,  2.3],
		                    "3": [2.5,  2.8,  3.2,  3.5],
		                    "4": [3.3,  3.7,  4.2,  4.7],
		                    "5": [4.1,  4.7,  5.3,  5.8]
		                }
		            },
		            {
		                "name": "DEF%",
		                "values": {
		                    "1": [1.8],
		                    "2": [2,  2.5,  2.9],
		                    "3": [3.1,  3.5,  3.8,  4.4],
		                    "4": [4.1,  4.7,  5.3,  5.8],
		                    "5": [5.1,  5.8,  6.6,  7.3]
		                }
		            },
		            {
		                "name": "Energy Recharge%",
		                "values": {
		                    "1": [1.3,  1.6],
		                    "2": [1.8,  2.2,  2.6],
		                    "3": [2.7,  3.1,  3.5,  3.9],
		                    "4": [3.6,  4.1,  4.7,  5.2],
		                    "5": [4.5,  5.2,  5.8,  6.5]
		                }
		            },
		            {
		                "name": "CRIT Rate%",
		                "values": {
		                    "1": [0.8,  1.6],
		                    "2": [1.1,  1.3,  1.6],
		                    "3": [1.6,  1.9,  2.1,  2.3],
		                    "4": [2.2,  2.5,  2.8,  3.1],
		                    "5": [2.7,  3.1,  3.5,  3.9]
		                }
		            },
		            {
		                "name": "CRIT DMG%",
		                "values": {
		                    "1": [1.6],
		                    "2": [2.2,  2.6,  3.1],
		                    "3": [3.3,  3.7,  4.2,  4.7],
		                    "4": [4.4,  5,  5.6,  6.2],
		                    "5": [5.4,  6.2,  7,  7.8]
		                }
		            }
		        ];
		    }
		},
		created(){
			this.setSubs();
		}
	}
</script>