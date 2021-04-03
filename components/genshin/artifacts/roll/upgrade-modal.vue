<template>
    <div>
        <ui-modal
        v-if="client"
        @close="restoreScroll"
        style="height:100vh;z-index: 999;"
        alignTop
        removeHeader
        :alignTopMargin="screen < 991 ? 0 : 150"
        :max-height="100"
        ref="upgradeModal"
        :class="'stars-'+artifact.info.stars"
        class="text-light text-center upgrade-modal">
            <div class="w-100 header position-relative pt-2 text-center">
                <div
                style="width: 80px; height: 105px;"
                class="mx-auto rounded artifact-container">
                    <img
                    style="width: 80px; height: 80px;"
                    :src="artifact.info.piece.image"
                    alt="Artifact image"
                    class="rounded artifact-image">

                    <i
                    style="top: -15px"
                    class="fas fa-star text-warning font-weight-bold position-relative z"
                    :key="i"
                    v-for="i in artifact.info.stars"></i>

                    <div
                    style="background: #fcf4e1;top: -20px;font-weight: 900;"
                    class="text-dark text-center position-relative artifact-level-container">
                        +{{ artifact.info.level }}
                    </div>
                </div>

                <h4 class="level-up mt-2 pb-2">
                    Level Up!
                </h4>
            </div>

            <div class="w-100 text-left text-light p-1 upgrade-container">
                <table
                class="table table-striped border-0 upgrades text-light text-center">
                    <tbody>
                        <tr :class="screen < 991 ? 'font-14' : 'font-17'">
                            <td style="width: 130px" class="text-left">
                                <ul class="list-unstyled">
                                    <li>
                                        <span :class="old_main === null && 'text-warning'">
                                            ✧ {{ artifact.stats.main.name }}
                                        </span>
                                    </li>
                                </ul>
                            </td>

                            <td style="width: 100px" v-if="old_main === null"></td>

                            <td style="width: 100px" v-else>
                                <div style="width: 50px;" class="d-inline-block">
                                    {{ old_main }}
                                </div>

                                <i class="fas fa-arrow-right text-secondary ml-4 d-inline"></i>
                            </td>

                            <td style="width: 100px">
                                <div style="width: 50px;" class="text-warning d-inline-block">
                                    {{ artifact.stats.main.value }}
                                </div>

                                <i class="fas fa-arrow-up text-success ml-1 d-inline"></i>
                            </td>
                        </tr>

                        <tr
                        :key="i"
                        v-for="(upgrade,i) in upgrades"
                        :class="screen < 991 ? 'font-12' : 'font-15'">
                            <td style="width: 130px" class="text-left">
                                <ul class="pl-3 ml-1">
                                    <li>
                                        <span :class="upgrade.old_value === null && 'text-warning'">
                                            {{ upgrade.name }}
                                        </span>
                                    </li>
                                </ul>
                            </td>

                            <td style="width: 100px" v-if="upgrade.old_value === null"></td>

                            <td style="width: 100px" v-else>
                                <div style="width: 50px;" class="d-inline-block">
                                    {{ upgrade.old_value+(upgrade.name.includes('%') && '%') }}
                                </div>

                                <i class="fas fa-arrow-right text-secondary ml-4 d-inline"></i>
                            </td>

                            <td style="width: 100px">
                                <div style="width: 50px;" class="text-warning d-inline-block">
                                    {{ upgrade.new_value+(upgrade.name.includes('%') && '%') }}
                                </div>

                                <i class="fas fa-arrow-up text-success ml-1 d-inline"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ui-modal>
    </div>
</template>

<script>
    export default{
        name: 'upgradeModal',
        props: [
            'artifact',
            'upgrades',
            'old_main'
        ],
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
                this.$refs['upgradeModal'].open();
            },
            restoreScroll(){
                document.getElementsByTagName('body')[0].style.overflowY = 'auto';
            }
        }
    }
</script>

<style>
    .upgrade-modal .ui-modal__body{
        max-height: 80vh !important;
        overflow-y: auto;
    }

    .upgrade-modal.stars-5 .header{
        background: #dca451;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #7c5b52,#ac7b53, #dca451);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #7c5b52,#ac7b53, #dca451); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .upgrade-modal.stars-4 .header{
        background: #a17bb9;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #675b8f,#675b8f, #a17bb9);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #675b8f,#675b8f, #a17bb9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .upgrade-modal.stars-3 .header{
        background: #5599af;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #51597a,#517d97, #5599af);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #51597a,#517d97, #5599af); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .upgrade-modal.stars-2 .header{
        background: #609674;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #496162,#48736a, #609674);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #496162,#48736a, #609674); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .upgrade-modal.stars-1 .header{
        background: #7d8995;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #525965,#6c7480, #7d8995);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #525965,#6c7480, #7d8995); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .upgrade-modal .ui-modal__body{
        background: #353b49 !important;
        padding: 0;
    }
    .ui-modal:not(.has-footer) .ui-modal__body{
        padding: 0;
    }

    .level-up{
        font-family: 'Arvo', serif;
        font-weight: 900;
    }

    .upgrade-modal.stars-5 .header .artifact-container, .upgrade-modal.star-5 .header .artifact-container .artifact-image{
        box-shadow: #ffaf39 0 -4px 5px 1px;
    }

    .upgrade-modal.stars-4 .header .artifact-container, .upgrade-modal.star-4 .header .artifact-container .artifact-image{
        box-shadow: #b39cff 0 -4px 5px 1px;
    }

    .upgrade-modal.stars-3 .header .artifact-container, .upgrade-modal.star-3 .header .artifact-container .artifact-image{
        box-shadow: #78bcbf 0 -4px 5px 1px;
    }

    .upgrade-modal.stars-2 .header .artifact-container, .upgrade-modal.star-2 .header .artifact-container .artifact-image{
        box-shadow: #89a0ff 0 -4px 5px 1px;
    }

    .upgrade-modal.stars-1 .header .artifact-container, .upgrade-modal.star-1 .header .artifact-container .artifact-image{
        box-shadow: #b7b7b7 0 -4px 5px 1px;
    }

    .upgrade-modal .upgrade-container .upgrades{
        font-weight: 700;
    }

    .artifact-level-container{
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }

    .upgrade-container .table th, .table td{
        padding-left: 0;
        padding-right: 0;
        border: 0;
    }
</style>