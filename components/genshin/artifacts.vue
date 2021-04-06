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