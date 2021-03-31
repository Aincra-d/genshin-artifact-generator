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
            <div class="w-100 header position-relative pt-2 text-left roll-container px-2 py-4">
                <div
                :key="artifact.id"
                v-for="artifact in artifacts"
                :class="'stars-'+artifact.info.stars"
                class="rounded artifact-container d-inline-block mx-1">
                    <button
                    type="button"
                    class="btn text-light artifact-main-info d-inline
                    rounded btn-md float-left py-0 px-1 mx-1"
                    @click="$emit('open-artifact','artifactModal',artifact.id)">
                        <img
                        :src="artifact.info.piece.image"
                        alt="Artifact image"
                        class="rounded artifact-image">
                    </button>
                </div>
            </div>
        </ui-modal>
    </div>
</template>

<script>
    export default{
        name: 'rollModal',
        props: {
            artifacts: Array
        },
        data(){
            return {
                client: process.client
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
            },
            restoreScroll(){
                document.getElementsByTagName('body')[0].style.overflowY = 'auto';
            }
        }
    }
</script>

<style>
    @media(max-width:1200px){
        .artifact-image{
            width:100px;
            height:100px;
        }
    }

    @media(min-width:1200px){
        .artifact-image{
            width:100px;
            height:100px;
        }
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