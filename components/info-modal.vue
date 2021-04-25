<template>
    <div>
        <ui-modal
        transition="scale-up"
        @close="restoreScroll"
        style="height:100vh;"
        alignTop
        removeHeader
        :alignTopMargin="0"
        :max-height="100"
        title="App info"
        ref="infoModal"
        class="text-center info-modal">
            <div class="w-100 text-left text-light p-1 info-container">
                <b-tabs class="info-tabs">
                    <b-tab title-link-class="text-light bg-transparent font-xs-12" title="About" active lazy>
                        <about></about>
                    </b-tab>

                    <b-tab disabled title-link-class="text-secondary bg-transparent font-xs-12" title="Guide" lazy>
                        <guide></guide>
                    </b-tab>

                    <b-tab title-link-class="text-light bg-transparent font-xs-12" title="Updates" lazy>
                        <change-log></change-log>
                    </b-tab>

                    <b-tab title-link-class="text-light bg-transparent font-xs-12" title="Plans" lazy>
                        <future-plans></future-plans>
                    </b-tab>

                    <b-tab title-link-class="text-light bg-transparent font-xs-12" title="Notices" lazy>
                        <notices></notices>
                    </b-tab>
                </b-tabs>

                <b>© 2021 Copyright: <i class="fab fa-discord"></i> The Cooler Smirnoff 😎#6672 at
                    <a href="https://discord.gg/genshinimpact" target="blank">
                        Genshin Impact Official
                    </a>
                    <br>

                    <i class="fas fa-envelope"></i>

                    <a href="mailto:aincrad.mb@gmail.com" target="blank">
                        aincrad.mb@gmail.com
                    </a>

                    <br>
                    <br>
                </b>
            </div>
        </ui-modal>
    </div>
</template>

<script>
    import about from '@/components/info/about.vue';
    import guide from '@/components/info/guide.vue';
    import changeLog from '@/components/info/change-log.vue';
    import futurePlans from '@/components/info/future-plans.vue';
    import notices from '@/components/info/notices.vue';
    export default{
        name: 'infoModal',
        components: {
            about,
            guide,
            'change-log': changeLog,
            'future-plans': futurePlans,
            notices
        },
        methods: {
            openModal() {
                this.$refs['infoModal'].open();
            },
            restoreScroll(){
                document.getElementsByTagName('body')[0].style.overflowY = 'auto';
            }
        }
    }
</script>

<style>
    @media(max-width: 576px){
        .info-modal .ui-modal__body{
            max-height:80vh;
        }
    }

    @media(min-width: 576px){
        .info-modal .ui-modal__body{
            max-height:100vh;
        }
    }

    .info-modal .nav-tabs{
        /*white-space: nowrap;*/
        overflow-x: auto;
        flex-wrap: nowrap;
        overflow-y: hidden;
    }
</style>

<style>
    .info-modal .ui-modal__body,.info-modal .ui-modal__header{
        background: #353b49 !important;
    }

    .info-modal .ui-modal__header{
        color:white;
    }
</style>