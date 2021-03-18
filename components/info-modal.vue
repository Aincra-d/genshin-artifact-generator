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
                </b-tabs>
            </div>
        </ui-modal>
    </div>
</template>

<script>
    import guide from '@/components/info/guide.vue';
    import changeLog from '@/components/info/change-log.vue';
    export default{
        name: 'infoModal',
        components: {
            guide,
            'change-log': changeLog
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