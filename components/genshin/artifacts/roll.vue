<template>
    <div>
        <div
        class="artifact-actions text-center mb-2">
            <upgrade-modal
            v-if="artifacts.length!=0"
            :screen="screen"
            :artifact="current_artifact"
            :old_main="old_main_value || 0"
            ref="upgradeModal"
            :upgrades="upgrades">    
            </upgrade-modal>

            <b-form-checkbox
            class="text-light mb-3 include-low-stars d-inline"
            v-model="include_low_stars"
            :size="screen < 1200 ? 'sm' : 'lg'">
                Include 1-3 <i class="fas fa-star fa-xs"></i>
            </b-form-checkbox>

            <b-form-checkbox
            class="text-light mb-3 include-low-stars d-inline"
            v-model="single_upgrades"
            :size="screen < 1200 ? 'sm' : 'lg'">
                Single upgrades
            </b-form-checkbox>

            <b-form-checkbox
            class="text-light mb-3 include-low-stars d-inline"
            v-model="show_upgrades"
            :size="screen < 1200 ? 'sm' : 'lg'">
                Show upgrades
            </b-form-checkbox>


            <br><br>

            <button
            v-if="artifacts.length === 0"
            @click="rollArtifact()"
            class="btn text-light btn-link d-inline mx-1 rounded-0 mt-2"
            style="box-shadow: 0px 0px 10px gray;text-shadow: 0px 0px 10px gray;"
            :class="screen < 576 ? 'btn-sm' : 'btn-md'">
                <i class="fas fa-redo fa-sm mr-1"></i> Roll artifact
            </button>

            <artifact-actions
            v-else
            :single="single_upgrades"
            :screen="screen"
            :artifact="current_artifact"
            @upgrade="upgrade"
            @roll-artifact="rollArtifact"
            @add="add"
            @reroll-main-stat="rerollMainStat"
            @reroll-sub-stats="rerollSubStats">
            </artifact-actions>
        </div>

        <div>
            <artifact
            style="max-width:500px"
            class="p-3 mx-auto"
            :key="artifact.id"
            v-for="artifact in artifacts"
            :desired_subs="desired_subs"
            :artifact="artifact">
            </artifact>

            <div class="d-inline text-center w-100">
                <ui-select
                class="mt-1 mb-2 ml-3 select pt-1 px-1"
                placeholder="Select domain"
                :options="domain_names"
                v-model="selected_domain">
                </ui-select>

                <button
                @click="selected_domain=''"
                type="button"
                class="btn btn-danger d-inline-block text-light btn-sm mb-2 ml-1 pt-1 pb-1 rounded">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <h5 class="text-light roll-counter">
                Number of rolls: {{ roll_counter }}

                <button
                type="button"
                class="btn btn-light btn-sm py-0"
                @click="roll_stats_toggled = !roll_stats_toggled">
                    <i
                    class="fas"
                    :class="roll_stats_toggled ? 'fa-angle-up' : 'fa-angle-down' "></i>
                </button>
            </h5>

            <ul
            v-if="roll_stats_toggled"
            class="text-light text-center mx-auto list-unstyled">
               <li
               :key="i"
               v-for="(stat,i) in roll_stats"
               style="text-shadow: 0px 0px 10px black;">
                   {{ stat.name+' - '+stat.counter }}
               </li> 
            </ul>
        </div>
    </div>
</template>

<script>
    import artifact from '@/components/genshin/artifacts/artifact.vue';
    import artifactActions from '@/components/genshin/artifacts/roll/artifact-actions.vue';
    import upgradeModal from '@/components/genshin/artifacts/roll/upgrade-modal.vue';
    import substatsJ from '~/static/substats.json';
    import domainsJ from '~/static/domains.json';
    import mainstatsJ from '~/static/mainstats.json';
    import setsJ from '~/static/sets.json';
    import { uuid } from 'vue-uuid';
    export default{
        name: 'roll',
        components: {
            artifact,
            'artifact-actions': artifactActions,
            'upgrade-modal': upgradeModal
        },
        data(){
            return {
                artifacts: [],
                current_artifact: {},
                roll_counter: process.client && (localStorage.roll_counter || 0),
                all_subs: [],
                sub_stats: substatsJ,
                domains: domainsJ,
                main_stats: mainstatsJ,
                sub_stat_names: substatsJ.map(sub => sub.name),
                domain_names: domainsJ.map(domain => domain.name),
                sets: setsJ,
                desired_subs: [],
                selected_domain: '',
                max_sub_counts: [1,2,4,4,4],
                include_low_stars: true,
                single_upgrades: false,
                show_upgrades: true,
                screen: process.client && window.innerWidth,
                roll_stats_toggled: false,
                upgrades: [],
                old_main_value: 0
                // roll_count: 0
            }
        },
        methods: {
            clear(){
                this.artifacts=[];
                // this.roll_count=0;
            },
            rollArtifact(){
                this.artifacts=[];
                this.sub_stats=this.all_subs;
                this.setSubs();
                let sets = this.sets;

                if(!this.include_low_stars) sets=sets.filter(set => set.stars.includes(5));

                if(this.selected_domain !== ""){
                    let domain_sets=this.domains.filter(domain => domain.name === this.selected_domain)[0].sets;

                    sets=sets.filter(set => domain_sets.includes(set.name));
                    // console.log(sets.map(set => set.name))
                }

                //SET MAIN STATS BASED ON THE TYPE OF THE ARTIFACT
                let set=sets[Math.floor(Math.random() * sets.length)];
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
                    case 3: sub_rolls=Math.random() < 0.8 ? 2 : 1; break;
                    case 2: sub_rolls=Math.random() < 0.9 ? 1 : 0; break;
                    case 1: sub_rolls=0; break;
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

                let rerolls={
                    main: {
                        count: 0
                    },
                    subs: {
                        count: 0
                    }
                }

                let max_level=stars*4;

                //CREATE ARTIFACT OBJECT
                let artifact={
                    id: uuid.v1(),
                    stats: {
                        main,
                        subs
                    },
                    info: {
                        'set': set,
                        piece,
                        stars,
                        level: 0,
                        max_level,
                        rerolls
                    }
                    // rolls: 1
                };

                this.updateCounter();
                this.artifacts.push(artifact);
                this.sub_stats=this.all_subs;
                this.setSubs();
                this.current_artifact=artifact;
            },
            add(){
                if(process.client && localStorage.artifacts){
                    let artifacts=JSON.parse(localStorage.artifacts);

                    artifacts.push(this.current_artifact);
                    localStorage.setItem('artifacts',JSON.stringify(artifacts));
                }
                else{
                    if(process.client) localStorage.setItem('artifacts',JSON.stringify(this.artifacts));
                }

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Added artifact to inventory!</h6>'
                });

                this.$emit('update-inventory');

                this.rollArtifact();
            },
            rerollMainStat(){
                let artifact=this.current_artifact;

                let old_main=artifact.stats.main.name;

                //SET MAIN STATS BASED ON THE TYPE OF THE ARTIFACT
                let main_stats=this.main_stats.filter(main => main.types.includes(artifact.info.piece.type)).map(main => main.name);

                main_stats=main_stats.filter(main => main != old_main).filter(main => !artifact.stats.subs.map(sub => sub.name).includes(main));

                let random_main=main_stats[Math.floor(Math.random() * main_stats.length)];

                artifact.stats.main={
                    name: random_main,
                    value: this.main_stats.filter(main => main.name == random_main)[0].values[artifact.info.stars][artifact.info.level]
                };

                let new_main=artifact.stats.main.name;

                artifact.info.rerolls.main.count++;
                this.current_artifact=artifact;

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Changed main stat from <u>'+old_main+'</u> to <u>'+new_main+'</u></h6>'
                });
            },
            rerollSubStats(){
                let artifact=this.current_artifact;
                let old_subs=artifact.stats.subs.map(sub => sub.name);

                artifact.stats.subs=[];
                artifact.info.level=0;
                artifact.stats.main.value=this.main_stats.filter(main => main.name == artifact.stats.main.name)[0].values[+artifact.info.stars][artifact.info.level];
                let subs=[];

                this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === artifact.stats.main.name),1);

                //SET THE NUMBER OF SUBSTATS
                let sub_rolls;

                switch (artifact.info.stars) {
                    case 5: sub_rolls=Math.random() < 0.2 ? 4 : 3; break;
                    case 4: sub_rolls=Math.random() < 0.4 ? 3 : 2; break;
                    case 3: sub_rolls=Math.random() < 0.8 ? 2 : 1; break;
                    case 2: sub_rolls=Math.random() < 0.9 ? 1 : 0; break;
                    case 1: sub_rolls=0; break;
                }

                //ROLL RANDOM SUBSTATS
                for(let i=0; i<sub_rolls; i++){
                    let random_sub=this.sub_stats[Math.floor(Math.random() * this.sub_stats.length)];

                    subs.push({
                        name: random_sub.name,
                        value: random_sub.values[artifact.info.stars][Math.floor(
                            Math.random() * random_sub.values[artifact.info.stars].length)],
                        level: 0
                    });
                    this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === random_sub.name),1);
                }

                artifact.info.rerolls.subs.count++;
                artifact.stats.subs=subs;
                this.current_artifact=artifact;
                this.sub_stats=this.all_subs;
                this.setSubs();

                let new_subs=artifact.stats.subs.map(sub => sub.name);

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Changed sub stats from <u>'+old_subs+'</u> to <u>'+new_subs+'</u></h6>'
                });
            },
            upgrade(upgrade_count){
                if(upgrade_count === null) upgrade_count = 1;
                this.upgrades=[];

                let artifact=this.current_artifact;

                this.old_main_value=artifact.stats.main.value;

                for(let i=0; i<upgrade_count; i++){
                    if(artifact.stats.subs.length === this.max_sub_counts[artifact.info.stars-1]){
                        if(artifact.info.level !== artifact.info.max_level){
                            let random_sub=artifact.stats.subs[Math.floor(Math.random() * artifact.stats.subs.length)];

                            let sub_values=this.sub_stats.filter(sub => sub.name === random_sub.name)[0].values[artifact.info.stars];
                            let old_sub_value=random_sub.value;

                            random_sub.value+=sub_values[Math.floor(Math.random() * sub_values.length)];
                            random_sub.level+=1;
                            artifact.info.level+=4;

                            artifact.stats.main.value=this.main_stats.filter(main => main.name == artifact.stats.main.name)[0].values[+artifact.info.stars][artifact.info.level];

                            if(this.upgrades.filter(upgrade => upgrade.name == random_sub.name).length != 0){
                                this.upgrades[this.upgrades.findIndex(upgrade => upgrade.name == random_sub.name)].new_value=Math.round(random_sub.value*100)/100;
                            }
                            else{
                                this.upgrades.push({
                                    name: random_sub.name,
                                    old_value: Math.round(old_sub_value*100)/100,
                                    new_value: Math.round(random_sub.value*100)/100
                                });
                            }
                        }
                    }
                    else{
                        this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === artifact.stats.main.name),1);

                        let random_sub=this.sub_stats[Math.floor(Math.random() * this.sub_stats.length)];

                        let isSubFree=artifact.stats.subs.filter(sub => sub.name === random_sub.name).length === 0 ? true : false;

                        while(!isSubFree){
                            random_sub=this.sub_stats[Math.floor(Math.random() * this.sub_stats.length)];

                            if(artifact.stats.subs.filter(sub => sub.name === random_sub.name).length === 0)
                                isSubFree=true;
                        }

                        let random_sub_value=random_sub.values[artifact.info.stars][Math.floor(
                                Math.random() * random_sub.values[artifact.info.stars].length)];

                        artifact.stats.subs.push({
                            name: random_sub.name,
                            value: random_sub_value,
                            level: 0
                        });

                        this.upgrades.push({
                            name: random_sub.name,
                            old_value: null,
                            new_value: Math.round(random_sub_value*100)/100
                        });

                        artifact.info.level+=4;
                        artifact.stats.main.value=this.main_stats.filter(main => main.name == artifact.stats.main.name)[0].values[+artifact.info.stars][artifact.info.level];
                    }
                }
                // console.log(this.upgrades)
                this.upgrades.reverse();

                if(this.show_upgrades) this.openModal();
            },
            setSubs(){
                this.all_subs=[
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
            },
            onResize(){
                if(process.client) this.screen=window.innerWidth
            },
            updateCounter(){
                let counter=process.client && (localStorage.roll_counter || 0);
                counter++;

                if(this.selected_domain != ''){
                    if(process.client && localStorage.roll_stats){
                        let roll_stats=JSON.parse(localStorage.roll_stats);

                        roll_stats.filter(stat => stat.name == this.selected_domain)[0].counter++;

                        localStorage.setItem('roll_stats', JSON.stringify(roll_stats));
                        this.roll_stats=roll_stats;
                    }
                    else{
                        let roll_stats=[
                            {
                                name: "Domain of Guyun",
                                counter: 0
                            },
                            {
                                name: "Midsummer Courtyard",
                                counter: 0
                            },
                            {
                                name: "Valley of Remembrance",
                                counter: 0
                            },
                            {
                                name: "Hidden Palace of Zhou Formula",
                                counter: 0
                            },
                            {
                                name: "Peak of Vindagnyr",
                                counter: 0
                            },
                            {
                                name: "Clear Pool and Mountain Cavern",
                                counter: 0
                            },
                            {
                                name: "No domain",
                                counter: 0
                            }
                        ];

                        roll_stats.filter(stat => stat.name == this.selected_domain)[0].counter=1;

                        process.client && localStorage.setItem('roll_stats', JSON.stringify(roll_stats));
                        this.roll_stats=roll_stats;
                    }
                }

                process.client && localStorage.setItem('roll_counter', counter);
                this.roll_counter++;
            },
            setRollStats(){
                let roll_stats=[
                    {
                        name: "Domain of Guyun",
                        counter: 0
                    },
                    {
                        name: "Midsummer Courtyard",
                        counter: 0
                    },
                    {
                        name: "Valley of Remembrance",
                        counter: 0
                    },
                    {
                        name: "Hidden Palace of Zhou Formula",
                        counter: 0
                    },
                    {
                        name: "Peak of Vindagnyr",
                        counter: 0
                    },
                    {
                        name: "Clear Pool and Mountain Cavern",
                        counter: 0
                    },
                    {
                        name: "No domain",
                        counter: 0
                    }
                ];

                this.roll_stats = process.client && (localStorage.roll_stats && JSON.parse(localStorage.roll_stats) || roll_stats);
            },
            openModal() {
                this.$refs.upgradeModal.openModal();
            }
        },
        created(){
            this.setSubs();
            this.setRollStats();
        },
        mounted(){
            if(process.client) window.addEventListener('resize',this.onResize)
        }
    }
</script>

<style scoped>
    .artifact{
        /*max-height: 400px;*/
        overflow-y: auto;
    }

    @media(min-width: 1200px){
        .artifact{
            max-width: 350px;
        }
    }

    .artifact.stars-5 .set-name{
        background-color: #be6c32;
    }

    .artifact.stars-4 .set-name{
        background-color: #a256e1;
    }

    .artifact.stars-3 .set-name{
        background-color: #5180cc;
    }

    .artifact.stars-2 .set-name{
        background-color: #288f72;
    }

    .artifact.stars-1 .set-name{
        background-color: #72778b;
    }

    .set-name{
        padding: 1.5px;
    }

    .set-name h5, .artifact-type{
        color: #f7f1e5;
    }

    .artifact.stars-5 .artifact-main-info{
        background: #dca451;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #7c5b52,#ac7b53, #dca451);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #7c5b52,#ac7b53, #dca451); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-4 .artifact-main-info{
        background: #a17bb9;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #675b8f,#675b8f, #a17bb9);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #675b8f,#675b8f, #a17bb9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-3 .artifact-main-info{
        background: #5599af;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #51597a,#517d97, #5599af);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #51597a,#517d97, #5599af); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-2 .artifact-main-info{
        background: #609674;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #496162,#48736a, #609674);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #496162,#48736a, #609674); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-1 .artifact-main-info{
        background: #7d8995;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #525965,#6c7480, #7d8995);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #525965,#6c7480, #7d8995); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact-sub-info{
        background-color: #ede5d8;
        color: #74737b;
        font-family: 'Crete Round', serif;
    }

    .artifact-main-stat{
        color: #b7a59b;
    }

    .artifact-sub-stats{
        color: #66697a;
    }

    .artifact-sub-stats li:before {
        content:"·";
        font-size:20px;
        vertical-align:middle;
        line-height:20px;
    }

    .artifact-set-name{
        color: #67b05e;
    }

    .artifact-set-effects{
        color: #909291;
    }

    .include-low-stars, .roll-counter{
        text-shadow: 0px 0px 2px black;
    }
</style>