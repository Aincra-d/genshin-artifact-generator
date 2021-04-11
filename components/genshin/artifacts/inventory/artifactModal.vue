<template>
    <div>
        <ui-modal
        v-if="client"
        @close="restoreScroll"
        style="height:100vh;"
        alignTop
        :alignTopMargin="screen < 991 ? 0 : 50"
        removeHeader
        :max-height="100"
        title="Edit your artifact"
        ref="artifactModal"
        class="text-light text-center artifact-modal">
            <div
            class="w-100 text-center"
            style="/*{ backgroundImage: 'url(' + artifacts[0].info.piece.image + ')', backgroundSize: 'auto'}*/">
            <br>
                <artifact
                v-if="client"
                :inventory="false"
                class="d-inline-block col-12"
                :artifact="current_artifact">
                </artifact>

                <div slot="footer">
                   <!--  <button
                    type="button"
                    class="btn btn-link text-light d-inline rounded-0 my-1"
                    :class="screen < 576 ? 'btn-sm' : 'btn-md'"
                    :disabled="removed || current_artifact.info.level === current_artifact.info.max_level"
                    @click="current_artifact.info.level!=current_artifact.info.max_level && upgrade()">
                        <i class="fas fa-arrow-up fa-sm"></i> Upgrade
                    </button> -->

                    <b-dropdown
                    :disabled="current_artifact.info.level == current_artifact.info.max_level"
                    id="dropdown-left"
                    text="Upgrade"
                    :size="screen < 576 ? 'sm' : 'md'"
                    variant="link"
                    class="m-2">
                        <b-dropdown-item
                        :disabled="current_artifact.info.level == current_artifact.info.max_level"
                        @click="current_artifact.info.level != current_artifact.info.max_level && upgrade(1)"
                        href="#">
                            +{{ current_artifact.info.level+4 }}
                        </b-dropdown-item>

                        <div
                        :key="i"
                        v-for="(up,i) in 4">
                            <b-dropdown-item
                            v-if="current_artifact.info.stars > 1 && (current_artifact.info.max_level - current_artifact.info.level)/4 >= i+2"
                            @click="current_artifact.info.level != current_artifact.info.max_level && upgrade(i+2)"
                            href="#">
                                +{{ current_artifact.info.level+((i+2))*4 }}
                            </b-dropdown-item>
                        </div>
                    </b-dropdown>

                    <b-dropdown
                    id="dropdown-left"
                    text="Reroll"
                    :size="screen < 576 ? 'sm' : 'md'"
                    variant="link"
                    class="m-2">
                        <b-dropdown-item
                        @click="current_artifact.info.rerolls.main.count === 0 && rerollMainStat()"
                        :disabled="removed || current_artifact.info.rerolls.main.count != 0 || ['Flower of Life','Plume of Death'].includes(current_artifact.info.piece.type)"
                        href="#">
                            Main stat(max: 1)
                        </b-dropdown-item>

                        <b-dropdown-item
                        @click="current_artifact.info.rerolls.subs.count === 0 && rerollSubStats()"
                        :disabled="removed || current_artifact.info.rerolls.subs.count != 0"
                        href="#">
                            Sub stats(max: 1)
                        </b-dropdown-item>
                    </b-dropdown>

                    <button
                    type="button"
                    class="btn btn-link text-light d-inline rounded-0 my-1"
                    :class="screen < 576 ? 'btn-sm' : 'btn-md'"
                    :disabled="removed"
                    @click="confirm_remove = !confirm_remove">
                        <i class="fas fa-times fa-sm mr-1"></i> Remove
                    </button>

                    <div
                    v-if="confirm_remove"
                    class="text-center text-light">
                        <h6 class="text-warning font-weight-bold">
                            Are you sure you want to delete this artifact from your inventory?
                        </h6>

                        <ul class="list-unstyled">
                            <li class="d-inline">
                                <button
                                type="button"
                                class="btn btn-sm btn-danger text-light d-inline rounded-0 mx-1"
                                :disabled="removed"
                                @click="!removed && remove()">
                                    <i class="fas fa-times fa-sm mr-1"></i>Remove
                                </button>
                            </li>

                            <li class="d-inline">
                                <button
                                type="button"
                                class="btn btn-sm btn-secondary text-light d-inline rounded-0 mx-1"
                                @click="confirm_remove = false">
                                    <i class="fas fa-times fa-sm mr-1"></i> Cancel
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </ui-modal>
    </div>
</template>

<script>
    import artifact from '@/components/genshin/artifacts/artifact.vue';
    import substatsJ from '~/static/substats.json';
    import mainstatsJ from '~/static/mainstats.json';
    import { updateAchievements } from '../updateAchievements.js';
    import { artifactMethods } from '../artifactMethods.js';

    export default{
        name: 'artifactModal',
        components: {
            artifact
        },
        created(){
            console.log(this.artifacts);
            this.current_artifact=this.artifacts[0]
        },
        data(){
            return {
                current_artifact: {},
                // modal_bg_class: '',
                all_subs: [],
                main_stats: mainstatsJ,
                sub_stats: substatsJ,
                max_sub_counts: [1,2,4,4,4],
                removed: false, 
                confirm_remove: false,
                client: process.client ? true : false,
                screen: 0,
                upgrades: [],
                // achievements: process.client && (JSON.parse(localStorage.achievements) || {})
            }
        },
        computed: {
            artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            achievements(){
                return this.$store.state.artifacts.achievements
            }
        },
        methods: {
            openModal(ref,id) {
                artifactMethods.setSubs(this);
                this.artifact_id=id;
                this.screen=this.$store.state.artifacts.screen;

                if(this.client){
                    this.current_artifact=this.artifacts.filter(artifact => artifact.id === id)[0];
                }
                // this.modal_bg_class='stars-'+this.artifacts[this.artifacts.findIndex(artifact => artifact.id === this.artifact_id)].info.stars;
                this.$refs[ref].open();
                this.ref=ref;
            },
            rerollMainStat(){
                artifactMethods.rerollMainStat(this,true);
            },
            rerollSubStats(){
                artifactMethods.rerollSubStats(this,false);
            },
            remove(){
                this.confirm_remove=false;
                this.removed=false;

                let artifacts=JSON.parse(localStorage.artifacts);
                let inventory=this.artifacts;

                artifacts.splice(artifacts.findIndex(artifact => artifact.id === this.artifact_id),1);
                inventory.splice(inventory.findIndex(artifact => artifact.id === this.artifact_id),1);

                localStorage.setItem('artifacts',JSON.stringify(artifacts));

                this.removed=true;
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    duration: 1000,
                    title: '<h6>Removed artifact from inventory!</h6>'
                });

                this.$refs[this.ref].close();
            },
            upgrade(upgrade_count){
                artifactMethods.upgrade(this,true,false,upgrade_count);
                updateAchievements.updateUpgrades(this);
            },
            updateInventory(artifact){
                let artifacts=JSON.parse(localStorage.artifacts);
                artifacts[artifacts.findIndex(artifact => artifact.id === this.artifact_id)]=artifact;

                localStorage.setItem('artifacts',JSON.stringify(artifacts));
            },
            restoreScroll(){
                document.getElementsByTagName('body')[0].style.overflowY = 'auto';
                this.removed=false;
                this.confirm_remove=false;
            }
        }
    }
</script>

<style>
    .artifact-modal button,.artifact-modal .dropdown-toggle{
        box-shadow: inset 0px 0px 10px black;
        text-shadow: 0px 0px 10px black;
    }

    .artifact-modal .ui-modal__body{
        color:white;
        padding-left:0 !important;
        padding-right:0 !important;
    }

    .artifact-modal .ui-modal__container, .artifact-modal .ui-modal__body,.artifact-modal .ui-modal__header{
        background: transparent !important;
        box-shadow: none;
    }

    .artifact-modal .ui-icon{
        color:white;
    }

    @media(max-width: 576px){
        .artifact-modal .ui-modal__body{
            max-height:80vh;
        }
    }

    @media(min-width: 576px){
        .artifact-modal .ui-modal__body{
            max-height:100vh;
        }
    }
</style>