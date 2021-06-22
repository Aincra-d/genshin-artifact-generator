<template>
	<div>
		<div :disabled="delete_artifacts && artifact.info.locked">
            <div class="w-100 text-left set-name">
                <h5 
                :class="(artifact.info.locked || delete_artifacts && artifact.info.equipped && !artifact.info.locked) ? 'ml-1' : 'ml-4'"
                class="d-inline">
                	<span
	        		v-if="artifact.info.locked"
	        		class="float-left ml-1">
	            		<i class="fas fa-lock fa-sm text-danger"></i>
	            	</span>

	            	<img
	            	v-if="artifact.info.equipped && delete_artifacts && !artifact.info.locked"
	            	:src="artifact.info.equipped.image"
	            	:alt="artifact.info.equipped.name"
	            	style="width: 25px; height:25px;"
	        		class="float-left character-image ml-1"
	        		:class="inventory && 'pointer'"
	        		v-tooltip.top-center="inventory && ('Show artifacts equipped on '+artifact.info.equipped.name)"
        			@click="inventory && filterBycharacters(artifact.info.equipped)">

                    <span>
                    	{{
	                        artifact.info.piece.name.length > 25 ? artifact.info.piece.name.substring(0, 22)+'...' : artifact.info.piece.name
	                    }}
                    </span>
                </h5>

                <img
            	v-if="artifact.info.equipped && (!delete_artifacts || delete_artifacts && artifact.info.equipped && artifact.info.locked)"
            	:src="artifact.info.equipped.image"
            	:alt="artifact.info.equipped.name"
            	style="width: 25px; height:25px;"
        		class="float-right character-image mr-1"
        		:class="inventory && 'pointer'"
        		v-tooltip.top-center="inventory && ('Show artifacts equipped on '+artifact.info.equipped.name)"
        		@click="inventory && filterBycharacters(artifact.info.equipped)">

               <!--  <button
                v-if="inventory && !delete_artifacts"
                type="button"
                class="btn text-light d-inline rounded-0 btn-md float-right py-0 px-1"
                @click="$emit('open-modal','artifactModal',artifact.id)">
                    <i class="fas fa-edit fa-sm"></i>
                </button> -->

                <b-form-checkbox
                v-if="inventory && delete_artifacts && !artifact.info.locked"
                :checked="delete_ids.includes(artifact.id)"
                size="lg"
                type="button"
                class="btn text-light d-inline rounded-0 btn-md float-right py-0 px-0 pointer"
                @change="addDeleteId(artifact.id)">
                </b-form-checkbox>
            </div>

            <div class="w-100 text-right artifact-main-info position-relative">
            	<div class="artifact-main-info-content">
	                <img
	                class="mr-1"
	                :class="!delete_artifacts && inventory && 'pointer'"
	                style="height:150px;width:150px;"
	                v-lazy="artifact.info.piece.image"
	                :alt="artifact.info.piece.name"
	                @click="(inventory && !delete_artifacts) && $emit('open-modal','artifactModal',artifact.id)"
	                v-tooltip="inventory && !delete_artifacts && {content: 'Manage artifact', delay: {show:500}, hideOnTargetClick: true}">

	                <h6 class="position-absolute top-0 left-0 artifact-type ml-4">
	                    {{ artifact.info.piece.type }}
	                </h6>

	                <div class="artifact-main-stat position-absolute bottom-0 left-0 text-left">
	                    <!-- {{ artifact.info.set.name }} -->

	                    <span class="font-15 font-weight-bold artifact-main-stat ml-4 mb-0">
	                        {{ artifact.stats.main.name.replace('%','') }}
	                    </span>

	                    <h2 class="font-weight-bold text-light artifact-main-value ml-4 mt-0">
	                        {{ artifact.stats.main.value }}
	                    </h2>

	                    <span class="ml-4 mt-2">
	                        <i
	                        :key="i"
	                        v-for="(star,i) in artifact.info.stars"
	                        class="fas fa-star text-warning fa-md mr-1"></i>
	                    </span>
	                </div>
	            </div>
            </div>

            <div class="artifact-sub-info m-0 p-0">
            	<button
            	:disabled="delete_artifacts"
            	class="float-right border rounded m-2"
            	:class="artifact.info.locked ? 'bg-dark border-0' : 'bg-light border-secondary'"
            	@click="setLock()">
            		<i
            		class="fas"
            		:class="artifact.info.locked ? 'fa-lock text-danger' : 'fa-lock text-secondary'"></i>
            	</button>

                <ul class="list-unstyled text-left font-weight-bold artifact-sub-stats ml-4 pt-3">
                    <li>
                        <h6
                        class="d-inline text-light bg-dark rounded font-weight-bold px-1">
                            <h5 class="d-inline">+</h5>{{ artifact.info.level }}
                        </h6>
                    </li>

                    <li
                    :key="i"
                    v-for="(sub,i) in artifact.stats.subs">
                        {{ sub.name.replace('%','') }} <i class="fas fa-plus fa-xs"></i> {{ (Math.round(sub.value * 100) / 100)+(sub.name.includes('%') ? '%' : '') }}
                    </li>
                </ul>

                <div
                class="artifact-set-info text-left"
                :class="!show_set_effects && screen < 576 && (!inventory && (!toggled && 'hidden'))">
                    <h6
                    :class="!show_set_effects && screen < 576 && (!inventory && 'pointer')"
                    class="artifact-set-name font-weight-bold ml-4"
                    @click="toggled=!toggled">
                        {{ artifact.info.set.name }}:

                        <i
                        v-if="!show_set_effects && screen < 576 && (!inventory)"
                        class="fas fa-sm"
                        :class="toggled ? 'fa-angle-up' : 'fa-angle-down'"></i>
                    </h6>

                    <ul
                    :class="!show_set_effects && screen < 576 && (!inventory && (!toggled && 'invisible'))"
                    class="list-unstyled font-weight-bold text-left ml-4 artifact-set-effects w-90">
                        <li>
                            2-Piece Set: {{ artifact.info.set.effects['2_piece'] }}
                        </li>

                        <li class="mt-1">
                            4-Piece Set: {{ artifact.info.set.effects['4_piece'] }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
	export default{
		name: 'artifactBody',
		props: {
			artifact: Object,
			inventory: {
				type: Boolean,
				default: false
			},
			fromModal: {
				type: Boolean,
				default: false
			}
		},
		data(){
			return {
				toggled: false
			}
		},
		computed: {
            delete_artifacts(){
                return this.$store.state.artifacts.delete_artifacts
            },
            delete_ids(){
                return this.$store.state.artifacts.delete_ids
            },
            artifacts(){
            	return this.$store.state.artifacts.artifacts
            },
            view(){
            	return this.$store.state.artifacts.view
            },
            screen(){
            	return this.$store.state.artifacts.screen
            },
            show_set_effects(){
            	return this.$store.state.artifacts.settings.show_set_effects
            }
        },
        methods: {
        	addDeleteId(id){
                this.$store.commit('artifacts/setDeleteIds',id);
            },
            setLock(){
            	this.artifact.info.locked=!this.artifact.info.locked;
            	let artifacts=JSON.parse(localStorage.artifacts);

            	if(this.inventory || this.fromModal){
            		artifacts[artifacts.findIndex(artifact => artifact.id === this.artifact.id)].info.locked=!artifacts[artifacts.findIndex(artifact => artifact.id === this.artifact.id)].info.locked;

	            	localStorage.setItem('artifacts', JSON.stringify(artifacts));
	            	// this.$store.commit('artifacts/setArtifacts',this.artifacts.reverse());
	            }
            },
            filterBycharacters(character){
                this.$store.commit('artifacts/setActiveFilters',{type: 'characters', value: character});

                this.resetArtifacts();
                let artifacts=this.artifacts.filter(artifact => artifact.info.equipped.name == character.name);
                this.$store.commit('artifacts/setArtifacts',artifacts);
            },
            resetArtifacts(){
                let artifacts=JSON.parse(localStorage.artifacts).reverse();
                this.$store.commit('artifacts/setArtifacts',artifacts);
            },
        }
	}
</script>

<style scoped>
    .artifact{
        /*max-height: 400px;*/
        overflow: hidden;
    }

    ::-webkit-scrollbar {
      width: 2.5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    .hidden{
    	max-height:25px;
    }

    @media(min-width: 1200px){
        .artifact.contain-info{
            max-width: 350px;
        }
    }

    @media(min-width: 370px) and (max-width:1200px){
        .artifact-image{
            width:100px;
            height:100px;
        }
    }

    @media(min-width:1200px){
        .artifact-image{
            width:120px;
            height:120px;
        }
    }

     @media(max-width: 370px){
        .artifact-image{
            width:80px;
            height:80px;
        }
    }

    .artifact.images-only{
        overflow-x: hidden;
    }

    .artifact.stars-5 .set-name{
        background-color: #be6c32;
        outline: 2px solid #a05c2e;
    }

    .artifact.stars-4 .set-name{
        background-color: #a256e1;
        outline: 2px solid #8749bb;
    }

    .artifact.stars-3 .set-name{
        background-color: #5180cc;
        outline: 2px solid #466aad;
    }

    .artifact.stars-2 .set-name{
        background-color: #288f72;
        outline: 2px solid #267461;
    }

    .artifact.stars-1 .set-name{
        background-color: #72778b;
        outline: 2px solid #606675;
    }

    .set-name{
        padding: 3px 0px 3px 0px;
        outline-offset: -3.5px;
    }

    .set-name h5, .artifact-type{
        color: #f7f1e5;
    }

    .artifact.stars-5 .artifact-main-info{
        background: #dca451;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #7c5b52,#ac7b53, #dca451);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #7c5b52,#ac7b53, #dca451); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-4 .artifact-main-info{
        background: #a17bb9;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #675b8f,#675b8f, #a17bb9);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #675b8f,#675b8f, #a17bb9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-3 .artifact-main-info{
        background: #5599af;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #51597a,#517d97, #5599af);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #51597a,#517d97, #5599af); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-2 .artifact-main-info{
        background: #609674;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #496162,#48736a, #609674);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #496162,#48736a, #609674); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-1 .artifact-main-info{
        background: #7d8995;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #525965,#6c7480, #7d8995);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #525965,#6c7480, #7d8995); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact-sub-info{
        background-color: #ede5d8;
        color: #74737b;
        font-family: 'Arvo', serif;
    }

    .artifact-main-stat{
        color: #b7a59b;
    }

    .artifact{
    	max-width: 350px;
    }

    .artifact-sub-stats{
        color: #66697a;
    }

    .artifact-sub-stats li:not(:first-child):before {
        content:"·";
        font-size:20px;
        vertical-align:middle;
        line-height:20px;
    }

    .artifact-set-name{
        color: #67b05e;
    }

    .artifact-set-effects{
        color: #909291;
    }

    .artifact.compressed{
        max-height: 185px;
        overflow-y: auto;
    }
</style>