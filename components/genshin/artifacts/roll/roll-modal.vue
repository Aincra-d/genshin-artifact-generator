<template>
    <div>
        <ui-modal
        v-if="client"
        transition="scale-up"
        @close="restoreScroll"
        style="height:100vh;"
        alignTop
        removeHeader
        :alignTopMargin="screen < 991 ? 0 : 50"
        :max-height="100"
        ref="rollModal"
        class="text-light text-center roll-modal">
            <div class="w-100 header position-relative pt-2 text-left roll-container px-2 py-3">
                <div
                :key="artifact.id"
                v-for="artifact in artifacts"
                :class="'stars-'+artifact.info.stars"
                class="rounded artifact-container d-inline-block mx-1">
                    <button
                    type="button"
                    class="btn text-light artifact-main-info d-inline
                    rounded btn-md float-left py-0 px-1 mx-1"
                    @click="showArtifact(artifact.id)">
                        <img
                        :src="artifact.info.piece.image"
                        alt="Artifact image"
                        class="rounded artifact-image">
                    </button>
                </div>
            </div>

            <div class="artifact-container w-100 text-center mt-3">
                <collapse-transition>
                    <artifact
                    v-if="toggled"
                    :inventory="false"
                    class="d-inline-block col-12"
                    :artifact="current_artifact">
                    </artifact>
                </collapse-transition>
            </div>

            <div
            v-if="toggled"
            class="w-100 text-center action-container">
                <button
                v-if="single"
                type="button"
                class="btn btn-link text-light d-inline rounded-0 my-1 ml-0 mr-0 w-23"
                :class="screen < 576 ? 'btn-sm' : 'btn-md'"
                :disabled="current_artifact.info.level === current_artifact.info.max_level"
                @click="current_artifact.info.level!=current_artifact.info.max_level && upgrade(1)">
                    <!-- <i class="fas fa-arrow-up fa-sm"></i>  -->Upgrade
                </button>

                <b-dropdown
                v-else
                menu-class="w-100"
                :disabled="current_artifact.info.level == current_artifact.info.max_level"
                id="dropdown-left"
                text="Upgrade"
                :size="screen < 576 ? 'sm' : 'md'"
                variant="link"
                class="my-2 ml-0 mr-1 w-23">
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
                menu-class="w-100"
                id="dropdown-left"
                text="Reroll"
                :size="screen < 576 ? 'sm' : 'md'"
                variant="link"
                class="my-2 mx-0 w-23">
                    <b-dropdown-item
                    @click="current_artifact.info.rerolls.main.count === 0 && rerollMainStat()"
                    :disabled="current_artifact.info.rerolls.main.count != 0 || ['Flower of Life','Plume of Death'].includes(current_artifact.info.piece.type)"
                    href="#">
                        Main stat(max: 1)
                    </b-dropdown-item>

                    <b-dropdown-item
                    @click="current_artifact.info.rerolls.subs.count === 0 && rerollSubStats()"
                    :disabled="current_artifact.info.rerolls.subs.count != 0"
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
                class="btn btn-link text-light d-inline rounded-0 mx-0 w-23"
                :class="screen < 576 ? 'btn-sm' : 'btn-md'"
                @click="add()">
                    Add
                </button>
            </div>
        </ui-modal>
    </div>
</template>

<script>
    const artifact = () => import('@/components/genshin/artifacts/artifact.vue');
    import substatsJ from '~/static/substats.json';
    import mainstatsJ from '~/static/mainstats.json';
    // import { updateAchievements } from '../updateAchievements.js';

    const updateAchievements = () => import('../updateAchievements.js');
    const artifactMethods = () => import('../artifactMethods.js');

    import elements from '~/static/elements.json';
    import charactersJSON from '~/static/characters.json';

    // import { artifactMethods } from '../artifactMethods.js';

    export default{
        name: 'rollModal',
        props: {
            artifacts: Array,
            single: Boolean,
            show: Boolean
        },
        components: {
            artifact
        },
        data(){
            return {
                client: process.client,
                max_upgrades: process.client && (localStorage.max_upgrades || 0),
                toggled: false,
                current_artifact: this.artifacts[0],
                main_stats: mainstatsJ,
                sub_stats: substatsJ,
                max_sub_counts: [1,2,4,4,4],
                all_subs: [],
                upgrades: [],
                old_main_value: 0,
                characters: charactersJSON,
                elements: elements,
                toggled_element: ''
            }
        },
        computed: {
            screen(){
                return this.$store.state.artifacts.screen
            },
            achievements(){
                return this.$store.state.artifacts.achievements
            }
        },
        methods: {
            openModal() {
                this.$refs['rollModal'].open();
                let self=this;
                setTimeout(function() {
                    self.showArtifact(self.artifacts[0].id)
                }, 100);
            },
            async showArtifact(id){
                this.current_artifact=this.artifacts.filter(artifact => artifact.id === id)[0];
                this.toggled=true;
                await artifactMethods().then( method  => method.artifactMethods.setSubs(this));
            },
            async rerollMainStat(){
                await artifactMethods().then( method  => method.artifactMethods.rerollMainStat(this,false));
            },
            async rerollSubStats(){
                await artifactMethods().then( method  => method.artifactMethods.rerollSubStats(this,false));
            },
            async add(){
                await artifactMethods().then( method  => method.artifactMethods.add(this,true));
                await updateAchievements().then(update => update.updateAchievements.updateInventory(this));
            },
            async upgrade(upgrade_count){
                await artifactMethods().then( method  => method.artifactMethods.upgrade(this,false,true,upgrade_count));
                await updateAchievements().then(update => update.updateAchievements.updateUpgrades(this));
            },
            showUpgrades(){
                this.$emit('show-upgrades',this.upgrades,this.current_artifact,this.old_main_value)
            },
            async equipArtifact(character){
                await artifactMethods().then( method  => method.artifactMethods.equipArtifact(this,false,character)); 
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
                this.toggled=false;
            }
        },
        created(){
            this.all_elements=this.elements;
        }
    }
</script>

<style>
    @media(max-width: 576px){
        .roll-modal .ui-modal__body{
            max-height:80vh;
        }
    }

    @media(min-width: 576px){
        .roll-modal .ui-modal__body{
            max-height:80vh;
        }
    }

    .roll-modal .roll-container{
        white-space: nowrap;
        overflow-x: auto;
    }

    @media(max-width:1200px){
        .roll-modal .artifact-image{
            width:60px;
            height:60px;
        }
    }

    @media(min-width:1200px){
        .roll-modal .artifact-image{
            width:70px;
            height:70px;
        }
    }


    @media(max-width: 991px){
        .roll-modal .roll-container::-webkit-scrollbar {
            color:black;
            width:2px;
            height:2px;
          }

          .roll-modal .roll-container::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.5);
          }


          .roll-modal .roll-container::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.3);
          }
      }

    .roll-modal .action-container button,.roll-modal .action-container .dropdown-toggle{
        box-shadow: inset 0px 0px 2px white;
        text-shadow: inset 0px 0px 2px white;
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
        overflow-x: hidden !important;
    }
    .ui-modal:not(.has-footer) .ui-modal__body{
        padding: 0;
    }

    .character-select .dropdown-menu{
        max-height:300px;
        overflow-y: auto;
    }

    .toggled{
        border-bottom:2px solid black;
    }
</style>