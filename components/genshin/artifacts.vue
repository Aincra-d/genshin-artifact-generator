<template>
    <div>
        <b-tabs
        class="text-light font-weight-bold page-container"
        v-if="screen <= 776"
        align="center"
        content-class="mt-3 border-0">
            <b-tab title-link-class="text-light bg-transparent font-xs-12" title="Artifact Generator" active>
                <div class="position-relative d-block artifact-roll-container-tabs p-0
                text-center col-12">
                    <artifact-roll>
                    </artifact-roll>
                </div>
            </b-tab>

            <b-tab title-link-class="text-light bg-transparent font-xs-12" title="Inventory">
                <div class="position-relative d-block inventory-container-tabs
                p-0 text-center col-12">
                    <artifact-inventory>
                    </artifact-inventory>
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
                <artifact-inventory>
                </artifact-inventory>
            </div>
        </div>
    </div>
</template>

<script>
    import artifactRoll from '@/components/genshin/artifacts/roll.vue';
    import artifactInventory from '@/components/genshin/artifacts/inventory.vue';
    import substatsJSON from '~/static/substats.json';
    import domainsJSON from '~/static/domains.json';
    export default{
         name: 'artifacts',
         components: {
            'artifact-roll': artifactRoll,
            'artifact-inventory': artifactInventory
         },
         data(){
            return {
                screen: 0,
                sub_stats: substatsJSON,
                domain_names: domainsJSON.map(domain => domain.name),
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
            setAchievements(){
                if(!localStorage.achievements){
                    let roll_numbers={ 100: false, 500: false, 1000: false, 2500: false, 5000: false, 10000: false, 20000: false, 30000: false, 40000: false, 50000: false, 60000: false, 70000: false, 80000: false, 90000: false, 100000: false
                    };

                    let domain_rolls={};

                    this.domain_names.forEach(name => {
                        domain_rolls[name]=roll_numbers;
                    });

                    let upgrades={
                        subs: {}
                    }

                    this.sub_stats.forEach(sub => {
                        let name=sub.name;
                        let values=[];

                        for(let i=2; i<8; i++){
                            values.push({
                                value: name.includes('%') ? (sub.values['4'][3]*i).toFixed(1) : sub.values['4'][3]*i,
                                done: false
                            });
                        }

                        upgrades.subs[sub.name]=values;
                    });

                    let achievements={
                        rolls: {
                            overall: roll_numbers,
                            domains: domain_rolls
                        },
                        upgrades: upgrades
                    }

                    localStorage.setItem('achievements',JSON.stringify(achievements));
                    this.$store.commit('artifacts/setAchievements',achievements);
                }
                else{
                    let achievements=JSON.parse(localStorage.achievements);
                    this.$store.commit('artifacts/setAchievements',achievements);
                }
            }
         },
         created(){
            console.log(this.artifacts)
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

            console.log('ach',this.$store.state.artifacts.achievements)
        },
        beforeMount(){
            this.setAchievements();
        }
    }
</script>

<style>
    body{
        background-image: url('../../static/background-image.png');
        /*background-image: url('../../static/site-background.png');*/
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
        background-image: url('../../static/background-image.png');
        background-size: cover;
        border: 0;
    }

    .page-container .tab-pane .artifact-roll-container-tabs, .page-container .tab-pane .inventory-container-tabs{
        margin-top: 55px !important;

/*        overflow-y: auto;
        height: 90vh;
*/    }
</style>