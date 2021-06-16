<template>
    <div>
        <b-tabs
        class="text-light font-weight-bold page-container"
        v-if="screen <= 776"
        align="center"
        content-class="mt-3 border-0">
            <b-tab
            title-link-class="text-light bg-transparent font-xs-12"
            title="Generator"
            active>
                <div class="position-relative d-block artifact-roll-container-tabs p-0
                text-center col-12">
                    <artifact-roll>
                    </artifact-roll>
                </div>
            </b-tab>

            <b-tab
            title-link-class="text-light bg-transparent font-xs-12"
            title="Inventory"
            :lazy="!$store.state.artifacts.inventory_loaded"
            @click="$store.commit('artifacts/setInventoryLoaded')">
                <div class="position-relative d-block inventory-container-tabs
                p-0 text-center col-12">
                    <artifact-inventory>
                    </artifact-inventory>
                </div>
            </b-tab>

            <b-tab
            title-link-class="text-light bg-transparent font-xs-12"
            title="Achievements"
            :lazy="!$store.state.artifacts.achievements_loaded"
            @click="$store.commit('artifacts/setAchievementsLoaded')">
                <div class="position-relative d-block inventory-container-tabs
                p-0 text-center col-12">
                    <achievements>
                    </achievements>
                </div>
            </b-tab>
        </b-tabs>

        <div v-else>
            <div class="position-absolute top-0 left-0 d-inline-block
            page-artifact-roll-container
            p-0 text-center col-12 col-sm-12 col-md-5 col-lg-4 col-xl-5">
                <artifact-roll>
                </artifact-roll>
            </div>

            <div class="position-absolute top-0 right-0 d-inline-block
            page-inventory-container
            p-0 text-left col-12 col-sm-12 col-md-7 col-lg-8 col-xl-7">
                <b-tabs
                class="text-light font-weight-bold"
                align="center">
                    <b-tab
                    title-link-class="text-light bg-transparent font-xs-12"
                    title="Inventory"
                    active>
                        <artifact-inventory>
                        </artifact-inventory>
                    </b-tab>

                    <b-tab
                    title-link-class="text-light bg-transparent font-xs-12"
                    title="Achievements"
                    lazy>
                        <achievements>
                        </achievements>
                    </b-tab>
                </b-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import artifactRoll from '@/components/genshin/artifacts/roll.vue';
    const artifactInventory = () => import('@/components/genshin/artifacts/inventory.vue');
    const achievements = () => import('@/components/genshin/artifacts/achievements.vue');
    import substatsJSON from '~/static/substats.json';
    import domainsJSON from '~/static/domains.json';
    export default{
         name: 'artifacts',
         components: {
            'artifact-roll': artifactRoll,
            'artifact-inventory': artifactInventory,
            achievements
         },
         data(){
            return {
                screen: 0,
                sub_stats: substatsJSON,
                domain_names: domainsJSON.map(domain => domain.name),
                roll_numbers: [],
                upgrades: {}
            }
         },
         computed: {
            achievements(){
                return this.$store.state.artifacts.achievements
            }
         },
         methods: {
            onResize(){
                let screen=process.client && window.innerWidth;

                this.$store.commit('artifacts/setScreen',screen);
                this.screen=this.$store.state.artifacts.screen;

                let view=(sessionStorage.inventoryView || (screen < 776 ? 'images' : 'compressed'));
                this.$store.commit('artifacts/setView',view);
            },
            setRollNumbers(){
                let roll_numbers=[];
                this.roll_numbers=[];

                for(let i=1; i<=60; i++){
                    roll_numbers.push({
                        value:(
                            i<=10 ? i*100
                            : i<=28 ? 1000+(i-10)*500
                            : i<=38 ? 10000+(i-28)*1000
                            : i<=50 ? 20000+(i-38)*2500
                            : 50000+(i-50)*5000
                        ),
                        done: false
                    });
                }

                this.roll_numbers=roll_numbers;
            },
            setUpgrades(){
                let upgrades={
                    subs: {},
                    max_level_numbers: []
                }

                this.sub_stats.forEach(sub => {
                    let name=sub.name;
                    let values=[];

                    for(let i=2; i<8; i++){
                        values.push({
                            value: name.includes('%')
                            ? (sub.values['4'][3]*i).toFixed(1)
                            : sub.values['4'][3]*i,
                            done: false
                        });
                    }

                    // upgrades.subs.push({
                    //     name: sub.name,
                    //     values
                    // })

                    upgrades.subs[sub.name]=values;
                });

                let max_level_numbers=[];

                for(let i=1; i<=61; i++){
                    max_level_numbers.push({
                        value:(
                            i<=10 ? i*50
                            : i<=25 ? 500+(i-10)*100
                            : i<=40 ? 2000+(i-25)*500
                            : 10000+(i-41)*1000
                        ),
                        done: false
                    });
                }

                upgrades.max_level_numbers=max_level_numbers;

                this.upgrades=upgrades;
            },
            setAchievements(){
                if(!localStorage.achievements || (localStorage.achievements && !JSON.parse(localStorage.achievements).upgrades.max_level_numbers)){
                    let domain_rolls=[];
                    let inventory_numbers=[];

                    for(let i=1; i<41; i++){
                        inventory_numbers.push({
                            value: i*25,
                            done: false
                        });
                    }

                    this.domain_names.forEach((name,ind) => {
                        this.setRollNumbers();

                        domain_rolls.push({
                            name,
                            values: this.roll_numbers
                        });
                    });

                    this.setUpgrades();

                    this.setRollNumbers();

                    let achievements={
                        rolls: {
                            overall: this.roll_numbers,
                            domains: domain_rolls
                        },
                        upgrades: this.upgrades,
                        inventory: inventory_numbers
                    }

                    localStorage.setItem('achievements',JSON.stringify(achievements));
                    this.$store.commit('artifacts/setAchievements',achievements);
                }
                else{
                    let achievements=JSON.parse(localStorage.achievements);
                    this.$store.commit('artifacts/setAchievements',achievements);
                }
            },
            setLocked(){
                let artifacts=JSON.parse(localStorage.artifacts);
                // console.log(('locked' in artifacts[0].info))
                if(artifacts.length === 0 || ('locked' in artifacts[0].info)) return
                
                if(!('locked' in artifacts[0].info)){
                    artifacts.forEach(artifact => {
                        artifact.info.locked=false;
                    });

                    localStorage.setItem('artifacts', JSON.stringify(artifacts))
                }

                console.log(artifacts);
            },
            setEquipped(){
                let artifacts=JSON.parse(localStorage.artifacts);
                // console.log(('equipped' in artifacts[0].info))
                if(artifacts.length === 0 || ('equipped' in artifacts[0].info)) return
                
                if(!('equipped' in artifacts[0].info)){
                    artifacts.forEach(artifact => {
                        artifact.info.equipped=false;
                    });

                    localStorage.setItem('artifacts', JSON.stringify(artifacts))
                }

                console.log(artifacts);
            }
         },
         mounted(){
            window.addEventListener('resize',this.onResize);
            let artifacts=(localStorage.artifacts ? JSON.parse(localStorage.artifacts) : []).reverse();
            let screen=window.innerWidth;

            this.$store.commit('artifacts/setArtifacts',artifacts);
            this.$store.commit('artifacts/setScreen',screen);
            this.screen=this.$store.state.artifacts.screen;

            let view=(sessionStorage.inventoryView || (screen < 776 ? 'images' : 'compressed'));
            this.$store.commit('artifacts/setView',view);

            if(!localStorage.artifacts) localStorage.setItem('artifacts', JSON.stringify([]));
            this.setLocked();
            this.setEquipped();

            let roll_stats=localStorage.roll_stats && JSON.parse(localStorage.roll_stats);

            if(roll_stats && !roll_stats.map(stat => stat.name).includes('Ridge Watch')){
                roll_stats.push({
                    name: 'Ridge Watch',
                    counter: 0
                });

                localStorage.setItem("roll_stats", JSON.stringify(roll_stats));
            }

            let achievements=localStorage.achievements && JSON.parse(localStorage.achievements);

            if(achievements && !achievements.rolls.domains.map(domain => domain.name).includes('Ridge Watch')){
                this.setRollNumbers();

                achievements.rolls.domains.push({
                    name: 'Ridge Watch',
                    values: this.roll_numbers
                });

                localStorage.setItem("achievements", JSON.stringify(achievements));
            }
        },
        beforeMount(){
            this.setAchievements();
            this.$store.commit('artifacts/setInventorySize');
        }
    }
</script>

<style>
    body{
        background-image: url('../../static/background-image.jpg');
        /*background-image: url('../../static/site-background.jpg');*/
        background-size: cover;
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>

<style>
    .page-artifact-roll-container::-webkit-scrollbar {
        display: none;
        background: transparent;
    }

    @media(max-width: 776px){
        .page-artifact-roll-container, .page-inventory-container{
            height: 100vh;
            overflow-y: auto;
        }
    }

    .page-artifact-roll-container, .page-inventory-container{
        height: 100vh;
        overflow-y: auto;
    }

    .page-container .nav-tabs{
        position: fixed;
        top:0;
        width: 100%;
        z-index: 10;
        background-image: url('../../static/background-image.jpg');
        background-size: cover;
        border: 0;
    }

    .page-container .nav-tabs .nav-tabs{
        color:red!important;
    }

    .page-container .tab-pane .artifact-roll-container-tabs, .page-container .tab-pane .inventory-container-tabs{
        margin-top: 55px !important;

/*        overflow-y: auto;
        height: 90vh;
*/    }
</style>