<template>
    <div>
        <b-tabs
        class="text-light font-weight-bold"
        active-nav-item-class="btn-light border-0"
        v-if="screen <= 776"
        align="center"
        content-class="mt-3">
            <b-tab title="Artifact roll" active>
                <div class="position-relative d-block roll-container p-0 text-center col-12">
                    <artifact-roll
                    style="max-height:85vh; overflow-y: auto;">
                    </artifact-roll>
                </div>
            </b-tab>

            <b-tab title="Inventory">
                <div class="position-relative d-block inventory-container p-0 text-center col-12">
                    <artifact-inventory
                    style="max-height:90vh; overflow-y: auto;">
                    </artifact-inventory>
                </div>
            </b-tab>
        </b-tabs>

        <div v-else>
            <div
            style="height:100vh; overflow-y: auto;"
            class="position-absolute top-0 left-0 d-inline-block roll-container
            p-0 text-center col-12 col-sm-12 col-md-5 col-lg-4 col-xl-5">
                <artifact-roll>
                </artifact-roll>
            </div>

            <div class="position-absolute top-0 right-0 d-inline-block inventory-container
            p-0 text-left col-12 col-sm-12 col-md-7 col-lg-8 col-xl-7">
                <artifact-inventory
                style="max-height:100vh; overflow-y: auto;">
                </artifact-inventory>
            </div>
        </div>
    </div>
</template>

<script>
    import artifactRoll from '@/components/genshin/artifacts/roll.vue'
    import artifactInventory from '@/components/genshin/artifacts/inventory.vue'
    export default{
         name: 'artifacts',
         components: {
            'artifact-roll': artifactRoll,
            'artifact-inventory': artifactInventory
         },
         data(){
            return {
                screen: 0
            }
         },
         methods: {
            onResize(){
                let screen=process.client && window.innerWidth;

                this.$store.commit('artifacts/setScreen',screen);
                this.screen=this.$store.state.artifacts.screen;

                let view=(sessionStorage.inventoryView || (screen < 776 ? 'images' : 'compressed'));
                this.$store.commit('artifacts/setView',view);
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
            this.$store.commit('artifacts/setStackFilters',false);
        }
    }
</script>

<style>
    body{
        /*background-image: url('https://images8.alphacoders.com/111/1114939.jpg');*/
        background-image: url('../../static/site-background.png');
        background-size: cover;
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>