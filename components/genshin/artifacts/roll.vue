<template>
    <div>
        <div
        class="artifact-actions text-center mb-2">
            <upgrade-modal
            style="z-index: 99999 !important;"
            v-if="artifacts.length!=0"
            :artifact="current_artifact"
            :old_main="old_main_value || 0"
            ref="upgradeModal"
            :upgrades="upgrades">
            </upgrade-modal>

            <roll-modal
            v-if="roll_settings.roll_10x || !rolled"
            ref="rollModal"
            :show="roll_settings.show_upgrades"
            :single="roll_settings.single_upgrades"
            :artifacts="artifacts"
            @show-upgrades="showUpgrades">    
            </roll-modal>

            <roll-settings @emptyArtifacts="emptyArtifacts">
            </roll-settings>

            <br><br>

            <div v-if="artifacts.length === 0 && !rolled">
                <button
                @click="singleRoll()"
                class="btn text-light btn-link btn-md p-5 d-inline mx-1 rounded-0 mt-2"
                style="box-shadow: 0px 0px 10px gray;text-shadow: 0px 0px 10px gray;">
                    <i
                    class="fas fa-redo"
                    style="font-size: 35px;"></i>
                </button>

                <button
                @click="roll10x()"
                class="btn text-light btn-link btn-md p-5 d-inline mx-1 rounded-0 mt-2"
                style="box-shadow: 0px 0px 10px gray;text-shadow: 0px 0px 10px gray;">
                    <h4>
                        <i class="fas fa-redo fa-sm"></i> 10X
                    </h4>
                </button>
            </div>

            <div v-else>
                <button
                v-if="artifacts.length === 0 || roll_settings.roll_10x"
                @click="roll_settings.roll_10x ? roll10x() : singleRoll()"
                class="btn text-light btn-link btn-md p-5 d-inline mx-1 rounded-0 mt-2"
                style="box-shadow: 0px 0px 10px gray;text-shadow: 0px 0px 10px gray;">
                    <i
                    v-if="!roll_settings.roll_10x"
                    class="fas fa-redo"
                    style="font-size: 35px;"></i>

                    <h4 v-else>
                        <i class="fas fa-redo fa-sm"></i> 10X
                    </h4>
                </button>

                <artifact-actions
                v-else
                :single="roll_settings.single_upgrades"
                :artifact="current_artifact"
                @upgrade="upgrade"
                @roll-artifact="singleRoll"
                @add="add"
                @reroll-main-stat="rerollMainStat"
                @reroll-sub-stats="rerollSubStats">
                </artifact-actions>
            </div>
        </div>

        <div>
            <artifact
            v-if="!roll_settings.roll_10x"
            style="max-width:500px"
            class="p-3 mx-auto"
            :key="artifact.id"
            v-for="artifact in artifacts"
            :artifact="artifact">
            </artifact>

            <domain-select :domains="domains">
            </domain-select>

            <h5 class="text-light roll-counter">
                Number of rolls: {{ roll_counter }}

                <button
                type="button"
                class="btn btn-link text-light btn-sm py-0"
                @click="roll_stats_toggled = !roll_stats_toggled">
                    <i
                    class="fas fa-lg"
                    :class="roll_stats_toggled ? 'fa-angle-up' : 'fa-angle-down' "></i>
                </button>
            </h5>

            <zoom-y-transition :duration="250">
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
            </zoom-y-transition>
        </div>
    </div>
</template>

<script>
    import artifact from '@/components/genshin/artifacts/artifact.vue';
    import artifactActions from '@/components/genshin/artifacts/roll/artifact-actions.vue';
    import upgradeModal from '@/components/genshin/artifacts/roll/upgrade-modal.vue';
    import rollModal from '@/components/genshin/artifacts/roll/roll-modal.vue';
    import domainSelect from './roll/domainSelect.vue';
    import rollSettings from './roll/rollSettings.vue';
    import substatsJSON from '~/static/substats.json';
    import domainsJSON from '~/static/domains.json';
    import mainstatsJSON from '~/static/mainstats.json';
    import setsJSON from '~/static/sets.json';
    import { uuid } from 'vue-uuid';
    import { updateAchievements } from './updateAchievements.js';
    import { artifactMethods } from './artifactMethods.js';
    export default{
        name: 'roll',
        components: {
            artifact,
            'artifact-actions': artifactActions,
            'upgrade-modal': upgradeModal,
            'roll-modal': rollModal,
            'domain-select': domainSelect,
            'roll-settings': rollSettings,
        },
        computed: {
            screen(){
                return this.$store.state.artifacts.screen
            },
            selected_domain(){
                return this.$store.state.artifacts.selected_domain
            },
            roll_settings(){
                return this.$store.state.artifacts.roll_settings
            },
            achievements(){
                return this.$store.state.artifacts.achievements
            }
        },
        data(){
            return {
                artifacts: [],
                current_artifact: {},
                roll_counter: process.client && (localStorage.roll_counter || 0),
                all_subs: [],
                sub_stats: substatsJSON,
                domains: domainsJSON,
                main_stats: mainstatsJSON,
                sub_stat_names: substatsJSON.map(sub => sub.name),
                domain_names: domainsJSON.map(domain => domain.name),
                sets: setsJSON,
                max_sub_counts: [1,2,4,4,4],
                roll_stats_toggled: false,
                upgrades: [],
                old_main_value: 0,
                rolled: false,
                loaded: false,
                // achievements: process.client && (JSON.parse(localStorage.achievements) || {})
                // roll_count: 0
            }
        },
        methods: {
            showUpgrades(upgrades,artifact,old_main){
                this.upgrades=upgrades;
                this.current_artifact=artifact;
                this.old_main_value=old_main;

                this.$refs.upgradeModal.openModal();
            },
            emptyArtifacts(){
                this.artifacts=[];
            },
            roll10x(){
                this.artifacts=[];
                this.roll_settings.roll_10x=true;

                for(let i=0; i<10; i++){
                    this.singleRoll();
                }

                this.$refs.rollModal.openModal();
            },
            singleRoll(){
                this.rolled=true;
                if(!this.roll_settings.roll_10x) this.artifacts=[];
                this.sub_stats=this.all_subs;
                artifactMethods.setSubs(this);
                let sets = this.sets;

                if(!this.roll_settings.include_low_stars) sets=sets.filter(set => set.stars.includes(5));

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
                artifactMethods.setSubs(this);
                this.current_artifact=artifact;

                updateAchievements.updateRolls(this);
            },
            add(){
               artifactMethods.add(this,false);
               updateAchievements.updateInventory(this);
            },
            rerollMainStat(){
                artifactMethods.rerollMainStat(this,false);
            },
            rerollSubStats(){
                artifactMethods.rerollSubStats(this,false);
            },
            upgrade(upgrade_count){
                artifactMethods.upgrade(this,false,false,upgrade_count);
                updateAchievements.updateUpgrades(this);
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
            },
            setDomains(){
                let domains=[];

                this.domains.forEach(domain => {
                    let images=[];

                    domain.sets.forEach(domain_set => {
                        images.push(this.sets.filter(set => set.name == domain_set)[0].image);
                    });

                    domains.push({
                        name: domain.name,
                        sets: domain.sets,
                        images: images
                    });
                });

                this.domains=domains;
            }
        },
        created(){
            artifactMethods.setSubs(this);
            this.setRollStats();
            this.setDomains();

            let self=this;

            setTimeout(function() {
                self.loaded=true;
            }, 10);
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