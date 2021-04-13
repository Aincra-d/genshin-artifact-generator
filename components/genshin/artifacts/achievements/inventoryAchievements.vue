<template>
    <div>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                style="box-shadow: inset 0px 0px 40px black"
                block
                v-b-toggle.inventory-achievements
                variant="outline-light">
                    Inventory achievements
                </b-button>
            </b-card-header>

            <b-collapse
            id="inventory-achievements"
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
                        Math.round((achievements.inventory.filter(counter => counter.done).length*100/achievements.inventory.length))
                        +'%)'"
                        active lazy>
                            <inventory-size>
                            </inventory-size>
                        </b-tab>
                    </b-tabs>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    import inventorySize from './inventoryAchievements/inventorySize.vue';

    export default{
        name: 'inventoryAchievements',
        computed: {
            achievements(){
                return this.$store.state.artifacts.achievements
            }
        },
        components: {
            'inventory-size': inventorySize
        }
    }
</script>

<style>
    .accordion, .accordion .card, .accordion .card .card-body{
        background:transparent;
        border:none;
    }
</style>