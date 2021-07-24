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
            v-if="settings.roll_10x || !rolled"
            ref="rollModal"
            :show="settings.show_upgrades"
            :single="settings.single_upgrades"
            :artifacts="artifacts"
            @show-upgrades="showUpgrades">    
            </roll-modal>

            <roll-settings @emptyArtifacts="emptyArtifacts">
            </roll-settings>

            <br><br>

            <div v-if="artifacts.length === 0 && !rolled">
                <button
                @click="singleRoll()"
                class="btn text-light btn-link btn-md p-5 d-inline mx-1 rounded-0 mt-2 shadowed">
                    <i
                    class="fas fa-redo"
                    style="font-size: 35px;"></i>
                </button>

                <button
                @click="roll10x()"
                class="btn text-light btn-link btn-md p-5 d-inline mx-1 rounded-0 mt-2 shadowed">
                    <h4>
                        <i class="fas fa-redo fa-sm"></i> 10X
                    </h4>
                </button>
            </div>

            <div v-else>
                <button
                v-if="artifacts.length === 0 || settings.roll_10x"
                @click="settings.roll_10x ? roll10x() : singleRoll()"
                class="btn text-light btn-link btn-md p-5 d-inline mx-1 rounded-0 mt-2 shadowed">
                    <i
                    v-if="!settings.roll_10x"
                    class="fas fa-redo"
                    style="font-size: 35px;"></i>

                    <h4 v-else>
                        <i class="fas fa-redo fa-sm"></i> 10X
                    </h4>
                </button>

                <artifact-actions
                v-else
                :single="settings.single_upgrades"
                :artifact="current_artifact"
                @upgrade="upgrade"
                @roll-artifact="singleRoll"
                @add="add"
                @reroll-main-stat="rerollMainStat"
                @reroll-sub-stats="rerollSubStats"
                @equip-artifact="equipArtifact">
                </artifact-actions>
            </div>
        </div>

        <div>
            <!-- <collapse-transition> -->
                <artifact
                v-if="!settings.roll_10x"
                style="max-width:500px"
                class="p-3 mx-auto"
                :key="artifact.id"
                v-for="artifact in artifacts"
                :artifact="artifact">
                </artifact>
            <!-- </collapse-transition> -->

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
                   style="text-shadow:inset 0px 0px 2px white;">
                       {{ stat.name+' - '+stat.counter }}
                   </li> 
                </ul>
            </zoom-y-transition>
        </div>
    </div>
</template>

<script>
    const artifact = () => import('@/components/genshin/artifacts/artifact.vue');
    import artifactActions from '@/components/genshin/artifacts/roll/artifact-actions.vue';
    const upgradeModal = () => import('@/components/genshin/artifacts/roll/upgrade-modal.vue');
    const rollModal = () => import('@/components/genshin/artifacts/roll/roll-modal.vue');
    import domainSelect from './domainSelect.vue';
    import rollSettings from './rollSettings.vue';
    import substatsJSON from '~/static/substats.json';
    import domainsJSON from '~/static/domains.json';
    import mainstatsJSON from '~/static/mainstats.json';
    import setsJSON from '~/static/sets.json';
    import { uuid } from 'vue-uuid';
    // import { updateAchievements } from './updateAchievements.js';
    const updateAchievements = () => import('../updateAchievements.js');

    //artifactMethods().then( method  => method.artifactMethods.setSubs(this));
    const artifactMethods = () => import('../artifactMethods.js');
    // import { artifactMethods } from './artifactMethods.js';
    export default{
        name: 'artifactRolls',
        components: {
            artifact,
            'artifact-actions': artifactActions,
            'upgrade-modal': upgradeModal,
            'roll-modal': rollModal,
            'domain-select': domainSelect,
            'roll-settings': rollSettings
        },
        computed: {
            screen(){
                return this.$store.state.artifacts.screen
            },
            selected_domain(){
                return this.$store.state.artifacts.selected_domain
            },
            settings(){
                return this.$store.state.artifacts.settings
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
                max_upgrades: process.client && (localStorage.max_upgrades || 0),
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
                loaded: false
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
                this.settings.roll_10x=true;

                for(let i=0; i<10; i++){
                    this.singleRoll();
                }

                this.$refs.rollModal.openModal();
            },
            async singleRoll(){
                await artifactMethods().then(method => method.artifactMethods.singleRoll(this,uuid));

                await updateAchievements().then(update => update.updateAchievements.updateRolls(this));
            },
            async add(){
               await artifactMethods().then( method  => method.artifactMethods.add(this,false));
               await updateAchievements().then(update => update.updateAchievements.updateInventory(this));
            },
            async rerollMainStat(){
                await artifactMethods().then( method  => method.artifactMethods.rerollMainStat(this,false));
            },
            async rerollSubStats(){
                await artifactMethods().then( method  => method.artifactMethods.rerollSubStats(this,false));
            },
            async upgrade(upgrade_count){
                await artifactMethods().then( method  => method.artifactMethods.upgrade(this,false,false,upgrade_count));
                await updateAchievements().then(update => update.updateAchievements.updateUpgrades(this));
            },
            async equipArtifact(character){
                await artifactMethods().then( method  => method.artifactMethods.equipArtifact(this,false,character)); 
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
                                name: "Ridge Watch",
                                counter: 0
                            },
                            {
                                name: "Momiji-Dyed Court",
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
                        name: "Ridge Watch",
                        counter: 0
                    },
                    {
                        name: "Momiji-Dyed Court",
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
        async created(){
            // await artifactMethods().then( method  => method.artifactMethods.setSubs(this));
            this.setSubs();
            this.setRollStats();
            this.setDomains();

            let self=this;

            setTimeout(function() {
                self.loaded=true;
            }, 10);

            if(this.$store.state.artifacts.gold_roll.id){
                this.rolled=true;
                this.artifacts.push(this.$store.state.artifacts.gold_roll);
                this.current_artifact=this.$store.state.artifacts.gold_roll;
            }
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
        text-shadow:inset 0px 0px 2px black;
    }

    .shadowed{
        box-shadow:inset 0px 0px 2px white;
        text-shadow:inset 0px 0px 2px white;
    }
</style>