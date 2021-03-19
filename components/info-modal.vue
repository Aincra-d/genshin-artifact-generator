<template>
    <div>
        <ui-modal
        @close="restoreScroll"
        style="height:100vh;"
        alignTop
        :alignTopMargin="0"
        :max-height="100"
        title="About"
        ref="infoModal"
        class="text-dark text-center info-modal">
            <div class="w-100 text-left text-dark p-1">
                <b-tabs>
                    <b-tab title="Guide" active>
                        <guide></guide>
                    </b-tab>

                    <b-tab title="Change log">
                        <change-log></change-log>
                    </b-tab>

                    <b-tab title="Future plans">
                        <future-plans></future-plans>
                    </b-tab>
                </b-tabs>

                    <b>© 2021 Copyright: <i class="fab fa-discord"></i> Mommy Beidou❤️#3271 at
                    <a href="https://discord.gg/genshinimpact" target="blank">
                        Genshin Impact Official
                    </a>
                    <br>

                    <i class="fas fa-envelope"></i>

                    <a href="mailto:aincrad.mb@gmail.com" target="blank">
                        aincrad.mb@gmail.com
                    </a>
                </b>
            </div>
        </ui-modal>
    </div>
</template>

<script>
    import guide from '@/components/info/guide.vue';
    import changeLog from '@/components/info/change-log.vue';
    import futurePlans from '@/components/info/future-plans.vue';
    export default{
        name: 'infoModal',
        components: {
            guide,
            'change-log': changeLog,
            'future-plans': futurePlans
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