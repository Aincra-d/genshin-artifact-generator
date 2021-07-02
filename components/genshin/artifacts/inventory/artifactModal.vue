<template>
    <div>
        <ui-modal
        v-if="client"
        transition="scale-up"
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
                fromModal
                class="d-inline-block col-12"
                :artifact="current_artifact">
                </artifact>

                <div slot="footer">
                    <b-dropdown
                    menu-class="w-100"
                    :disabled="current_artifact.info.level == current_artifact.info.max_level"
                    id="dropdown-left"
                    text="Upgrade"
                    :size="screen < 576 ? 'sm' : 'md'"
                    variant="link"
                    class="my-2 mx-0 w-23">
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
                    :disabled="current_artifact.info.locked"
                    menu-class="w-100"
                    id="dropdown-left"
                    text="Reroll"
                    :size="screen < 576 ? 'sm' : 'md'"
                    variant="link"
                    class="my-2 mx-0 w-23">
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

                    <b-dropdown
                    menu-class="w-100"
                    id="dropdown-left"
                    text="Equip"
                    :size="screen < 576 ? 'sm' : 'md'"
                    variant="link"
                    class="my-2 mx-0 w-23 character-select">
                        <div class="text-center mt-1 mb-2">
                            <img
                            class="pointer mr-1"
                            :class="toggled_element == element.name && 'toggled'"
                            style="width:20px; height:20px;"
                            v-lazy="element.image"
                            :alt="element.name"
                            :key="i"
                            v-for="(element,i) in elements"
                            @click="filterElements(element.name)">
                        </div>

                        <b-dropdown-group
                        :key="i"
                        v-for="(element,i) in all_elements">
                            <b-dropdown-header id="dropdown-header-label">
                                <img
                                style="width:20px; height:20px;"
                                v-lazy="element.image"
                                :alt="element.name">

                                {{ element.name }}
                            </b-dropdown-header>

                            <b-dropdown-item
                            :key="i"
                            v-for="(character,i) in characters.filter(char => char.element == element.name)"
                            @click="equipArtifact(character)"
                            href="#">
                                <img
                                :src="character.image"
                                :alt="character.name"
                                style="width:25px; height:25px;">

                                <span :class="current_artifact.info.equipped !== false && (current_artifact.info.equipped.name == character.name && 'text-primary font-weight-bold')">
                                    {{ character.name }}
                                </span>
                            </b-dropdown-item>
                        </b-dropdown-group>
                    </b-dropdown>

                    <button
                    type="button"
                    class="btn btn-link text-light d-inline rounded-0 my-1 mx-0 w-23 shadowed"
                    :class="screen < 576 ? 'btn-sm' : 'btn-md'"
                    :disabled="removed || current_artifact.info.locked"
                    @click="confirm_remove = !confirm_remove">
                        <!-- <i class="fas fa-times fa-sm mr-1"></i> --> Remove
                    </button>

                    <div
                    v-if="confirm_remove && !current_artifact.info.locked"
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
    const artifact = () => import('@/components/genshin/artifacts/artifact.vue');
    import substatsJSON from '~/static/substats.json';
    import mainstatsJSON from '~/static/mainstats.json';
    import elements from '~/static/elements.json';
    import charactersJSON from '~/static/characters.json';
    // import { updateAchievements } from '../updateAchievements.js';
    // import { artifactMethods } from '../artifactMethods.js';

    const updateAchievements = () => import('../updateAchievements.js');
    const artifactMethods = () => import('../artifactMethods.js');

    export default{
        name: 'artifactModal',
        components: {
            artifact
        },
        created(){
            this.current_artifact=this.artifacts[0];
            this.all_elements=this.elements;
        },
        data(){
            return {
                current_artifact: {},
                max_upgrades: process.client && (localStorage.max_upgrades || 0),
                // modal_bg_class: '',
                all_subs: [],
                main_stats: mainstatsJSON,
                sub_stats: substatsJSON,
                characters: charactersJSON,
                max_sub_counts: [1,2,4,4,4],
                removed: false, 
                confirm_remove: false,
                client: process.client ? true : false,
                screen: 0,
                upgrades: [],
                elements: elements,
                toggled_element: ''
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
            async openModal(ref,id) {
                await artifactMethods().then(method => method.artifactMethods.setSubs(this));
                this.artifact_id=id;
                this.screen=this.$store.state.artifacts.screen;

                if(this.client){
                    this.current_artifact=this.artifacts.filter(artifact => artifact.id === id)[0];
                }
                
                this.$refs[ref].open();
                this.ref=ref;
            },
            async rerollMainStat(){
                await artifactMethods().then(method => method.artifactMethods.rerollMainStat(this,true));
            },
            async rerollSubStats(){
                await artifactMethods().then(method => method.artifactMethods.rerollSubStats(this,false));
            },
            async equipArtifact(character){
                await artifactMethods().then( method  => method.artifactMethods.equipArtifact(this,true,character)); 
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

                this.$store.commit('artifacts/setInventorySize');
            },
            async upgrade(upgrade_count){
                await artifactMethods().then(method => method.artifactMethods.upgrade(this,true,false,upgrade_count));
                await updateAchievements().then(update => update.updateAchievements.updateUpgrades(this));
            },
            updateInventory(artifact){
                let artifacts=JSON.parse(localStorage.artifacts);
                artifacts[artifacts.findIndex(artifact => artifact.id === this.artifact_id)]=artifact;

                localStorage.setItem('artifacts',JSON.stringify(artifacts));
            },
            filterElements(name){
                if(this.toggled_element == name){
                    this.toggled_element='';
                    this.all_elements=this.elements
                    return
                }

                this.all_elements=this.elements;
                this.all_elements=this.all_elements.filter(element => element.name == name);
                this.toggled_element=name;
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
    .artifact-modal .shadowed,.artifact-modal .dropdown-toggle{
        box-shadow: inset 0px 0px 2px white;
        text-shadow: inset 0px 0px 2px white;
    }

    .artifact-modal .ui-modal__body{
        color:white;
        padding-left:0 !important;
        padding-right:0 !important;
        /*max-width: 350px;*/
        /*margin:auto;*/
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

    .character-select .dropdown-menu{
        max-height:300px;
        overflow-y: auto;
    }

    .toggled{
        border-bottom:2px solid black;
    }
</style>