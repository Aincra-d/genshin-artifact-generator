<template>
    <div>
        <ui-modal
        v-if="client"
        @close="restoreScroll"
        style="height:100vh;"
        alignTop
        removeHeader
        :alignTopMargin="screen < 991 ? 50 : 50"
        :max-height="100"
        ref="rollModal"
        class="text-light text-center roll-modal">
            <div class="w-100 header position-relative pt-2 text-left roll-container px-2 py-3">
                <div
                :key="artifact.id"
                v-for="artifact in artifacts"
                :class="'stars-'+artifact.info.stars"
                class="rounded artifact-container d-inline-block mx-1">
                    <button
                    type="button"
                    class="btn text-light artifact-main-info d-inline
                    rounded btn-md float-left py-0 px-1 mx-1"
                    @click="showArtifact(artifact.id)">
                        <img
                        :src="artifact.info.piece.image"
                        alt="Artifact image"
                        class="rounded artifact-image">
                    </button>
                </div>
            </div>

            <div class="artifact-container w-100 text-center mt-3">
                <artifact
                v-if="toggled"
                :inventory="false"
                :editing="false"
                class="d-inline-block col-12"
                :artifact="current_artifact">
                </artifact>
            </div>

            <div
            v-if="toggled"
            class="w-100 text-center action-container">
                <button
                v-if="single"
                type="button"
                class="btn btn-link text-light d-inline rounded-0 my-1"
                :class="screen < 576 ? 'btn-sm' : 'btn-md'"
                :disabled="current_artifact.info.level === current_artifact.info.max_level"
                @click="current_artifact.info.level!=current_artifact.info.max_level && upgrade(1)">
                    <i class="fas fa-arrow-up fa-sm"></i> Upgrade
                </button>

                <b-dropdown
                v-else
                :disabled="current_artifact.info.level == current_artifact.info.max_level"
                id="dropdown-left"
                text="Upgrade"
                :size="screen < 576 ? 'sm' : 'md'"
                variant="link"
                class="m-2">
                    <b-dropdown-item
                    :disabled="current_artifact.info.level == current_artifact.info.max_level"
                    @click="current_artifact.info.level != current_artifact.info.max_level && upgrade(1)"
                    href="#">
                        +{{ current_artifact.info.level+4 }}
                    </b-dropdown-item>

                    <div
                    :key="i"
                    v-for="(up,i) in 4">
                        <b-dropdown-item
                        v-if="current_artifact.info.stars > 1 && (current_artifact.info.max_level - current_artifact.info.level)/4 >= i+2"
                        @click="current_artifact.info.level != current_artifact.info.max_level && upgrade(i+2)"
                        href="#">
                            +{{ current_artifact.info.level+((i+2))*4 }}
                        </b-dropdown-item>
                    </div>
                </b-dropdown>

                <button
                type="button"
                class="btn btn-link text-light d-inline rounded-0 my-1"
                :class="screen < 576 ? 'btn-sm' : 'btn-md'"
                :disabled="current_artifact.info.rerolls.main.count != 0 || ['Flower of Life','Plume of Death'].includes(current_artifact.info.piece.type)"
                @click="current_artifact.info.rerolls.main.count === 0 && rerollMainStat()">
                    <i class="fas fa-redo fa-sm mr-1"></i>Reroll main
                </button>

                <button
                type="button"
                class="btn btn-link text-light d-inline rounded-0 my-1"
                :class="screen < 576 ? 'btn-sm' : 'btn-md'"
                :disabled="current_artifact.info.rerolls.subs.count != 0"
                @click="current_artifact.info.rerolls.subs.count === 0 && rerollSubStats()">
                    <i class="fas fa-redo fa-sm mr-1"></i>Reroll subs
                </button>

                <button
                type="button"
                class="btn btn-link text-light d-inline rounded-0 mx-1"
                :class="screen < 576 ? 'btn-sm' : 'btn-md'"
                @click="add()">
                    <i class="fas fa-plus fa-sm mr-1"></i>Add
                </button>
            </div>
        </ui-modal>
    </div>
</template>

<script>
    import artifact from '@/components/genshin/artifacts/artifact.vue';
    import substatsJ from '~/static/substats.json';
    import mainstatsJ from '~/static/mainstats.json';

    export default{
        name: 'rollModal',
        props: {
            artifacts: Array,
            single: Boolean,
            show: Boolean
        },
        components: {
            artifact
        },
        data(){
            return {
                client: process.client,
                toggled: false,
                current_artifact: this.artifacts[0],
                main_stats: mainstatsJ,
                sub_stats: substatsJ,
                max_sub_counts: [1,2,4,4,4],
                all_subs: [],
                upgrades: [],
                old_main_value: 0
            }
        },
        computed: {
            screen(){
                return this.$store.state.artifacts.screen
            }
        },
        methods: {
            openModal() {
                this.$refs['rollModal'].open();
                let self=this;
                setTimeout(function() {
                    self.showArtifact(self.artifacts[0].id)
                }, 50);
            },
            showArtifact(id){
                this.current_artifact=this.artifacts.filter(artifact => artifact.id === id)[0];
                this.toggled=true;
                this.setSubs();
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
                artifact.stats.main.value=this.main_stats.filter(main => main.name == artifact.stats.main.name)[0].values[artifact.info.stars][artifact.info.level];
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
            add(){
                if(process.client && localStorage.artifacts){
                    let artifacts=JSON.parse(localStorage.artifacts);

                    artifacts.push(this.current_artifact);
                    localStorage.setItem('artifacts',JSON.stringify(artifacts));

                    this.$store.commit('artifacts/setArtifacts',artifacts.reverse());
                }
                else{
                    let artifacts=[this.current_artifact];

                    if(process.client) localStorage.setItem('artifacts',JSON.stringify(artifacts));
                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Added artifact to inventory!</h6>'
                });

                this.artifacts.splice(this.artifacts.findIndex(artifact => artifact.id === this.current_artifact.id),1);
                this.current_artifact=this.artifacts[0];
            },
            upgrade(upgrade_count){
                if(upgrade_count === null) upgrade_count = 1;
                this.upgrades=[];
                this.sub_stats=this.all_subs;
                this.setSubs();

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

                            artifact.stats.main.value=this.main_stats.filter(main => main.name == artifact.stats.main.name)[0].values[artifact.info.stars][artifact.info.level];

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
                        artifact.stats.main.value=this.main_stats.filter(main => main.name == artifact.stats.main.name)[0].values[artifact.info.stars][artifact.info.level];
                    }
                }
                // console.log(this.upgrades)
                this.upgrades.reverse();

                if(this.show) this.showUpgrades();
            },
            showUpgrades(){
                this.$emit('show-upgrades',this.upgrades,this.current_artifact,this.old_main_value)
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
            restoreScroll(){
                document.getElementsByTagName('body')[0].style.overflowY = 'auto';
                this.toggled=false;
            }
        }
    }
</script>

<style>
    .roll-modal .roll-container{
        white-space: nowrap;
        overflow-x: auto;
    }

    @media(max-width:1200px){
        .roll-modal .artifact-image{
            width:60px;
            height:60px;
        }
    }

    @media(min-width:1200px){
        .roll-modal .artifact-image{
            width:70px;
            height:70px;
        }
    }

    .roll-modal .action-container button,.roll-modal .action-container .dropdown{
        box-shadow: 0px 0px 10px black;
        text-shadow: 0px 0px 10px black;
    }

    .roll-modal .roll-container .stars-5{
        background: #dca451;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #7c5b52,#ac7b53, #dca451);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #7c5b52,#ac7b53, #dca451); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .roll-modal .roll-container .stars-4{
        background: #a17bb9;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #675b8f,#675b8f, #a17bb9);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #675b8f,#675b8f, #a17bb9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .roll-modal .roll-container .stars-3{
        background: #5599af;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #51597a,#517d97, #5599af);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #51597a,#517d97, #5599af); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .roll-modal .roll-container .stars-2{
        background: #609674;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #496162,#48736a, #609674);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #496162,#48736a, #609674); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .roll-modal .roll-container .stars-1{
        background: #7d8995;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #525965,#6c7480, #7d8995);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #525965,#6c7480, #7d8995); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .roll-modal .ui-modal__body{
        background: #353b49 !important;
        padding: 0;
        overflow: hidden !important;
    }
    .ui-modal:not(.has-footer) .ui-modal__body{
        padding: 0;
    }
</style>