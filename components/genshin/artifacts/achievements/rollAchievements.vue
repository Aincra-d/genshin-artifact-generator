<template>
    <div>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                style="box-shadow: inset 0px 0px 40px black"
                block
                v-b-toggle.roll-achievements
                variant="outline-light">
                    Artifact roll achievements
                </b-button>
            </b-card-header>

            <b-collapse
            visible
            id="roll-achievements"
            accordion="my-accordion"
            role="tabpanel"
            class="text-light">
                <b-card-body>
                    <b-tabs
                    class="text-light font-weight-bold achievement-tabs"
                    align="center">
                        <b-tab
                        title-link-class="text-light bg-transparent font-xs-12"
                        :title="'Overall ('+
                        Math.round((achievements.rolls.overall.filter(roll => roll.done).length*100/achievements.rolls.overall.length))
                        +'%)'"
                        active lazy>
                            <overall-rolls>
                            </overall-rolls>
                        </b-tab>

                        <b-tab
                        title-link-class="text-light bg-transparent font-xs-12"
                        :title="'Domains ('+Math.round(domains_progress)+'%)'"
                        lazy>
                            <domain-rolls>
                            </domain-rolls>
                        </b-tab>
                    </b-tabs>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    import overallRolls from './rollAchievements/overallRolls.vue';
    import domainRolls from './rollAchievements/domainRolls.vue';

    export default{
        name: 'rollAchievements',
        components: {
            'overall-rolls': overallRolls,
            'domain-rolls': domainRolls
        },
        computed: {
            achievements(){
                return this.$store.state.artifacts.achievements
            }
        },
        created(){
            let progess=0;
            let all=420;
            let done=0;

            this.achievements.rolls.domains.forEach(domain => {
                domain.values.forEach(value => {
                    if(value.done) done+=1;
                });
            });

            this.domains_progress=done*100/all;
        }
    }
</script>

<style>
    .accordion, .accordion .card, .accordion .card .card-body{
        background:transparent;
        border:none;
    }
</style>