<template>
    <div>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                style="box-shadow: inset 0px 0px 40px black"
                block
                v-b-toggle.upgrade-achievements
                variant="outline-light">
                    Artifact upgrade achievements
                </b-button>
            </b-card-header>

            <b-collapse
            id="upgrade-achievements"
            accordion="my-accordion"
            role="tabpanel"
            class="text-light">
                <b-card-body>
                    <b-tabs
                    class="text-light font-weight-bold achievement-tabs"
                    align="center">
                        <b-tab
                        title-link-class="text-light bg-transparent font-xs-12"
                        :title="'Max upgrades ('+
                        Math.round((achievements.upgrades.max_level_numbers.filter(upgrade => upgrade.done).length*100/achievements.upgrades.max_level_numbers.length))
                        +'%)'"
                        active lazy>
                            <max-upgrades>
                            </max-upgrades>
                        </b-tab>

                        <b-tab
                        title-link-class="text-light bg-transparent font-xs-12"
                        :title="'Sub upgrades ('+Math.round(sub_progress)+'%)'"
                        lazy>
                            <sub-upgrades>
                            </sub-upgrades>
                        </b-tab>
                    </b-tabs>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    import maxUpgrades from './upgradeAchievements/maxUpgrades.vue';
    import subUpgrades from './upgradeAchievements/subUpgrades.vue';

    export default{
        name: 'upgradeAchievements',
        components: {
            'max-upgrades': maxUpgrades,
            'sub-upgrades': subUpgrades
        },
        computed: {
            achievements(){
                return this.$store.state.artifacts.achievements
            },
            sub_progress(){
                let all=60;
                let done=0;
                let progress=0;

                Object.keys(this.achievements.upgrades.subs).map(sub => sub).forEach(sub_name => {
                    this.achievements.upgrades.subs[sub_name].forEach(sub => {
                        if(sub.done) done+=1;
                    });
                });

                progress=done*100/all;
                return progress;
            }
        },
    }
</script>

<style>
    .accordion, .accordion .card, .accordion .card .card-body{
        background:transparent;
        border:none;
    }
</style>