<template>
	<div>
        <div style="overflow: hidden;"
        class="artifact images-only d-inline-block rounded position-relative"
        :class="'stars-'+artifact.info.stars">
            <button
            v-if="inventory && !delete_artifacts"
            type="button"
            class="btn d-flex text-light artifact-main-info artifact-thumb d-inline
            rounded btn-md float-left py-0 px-2 mx-1"
            @click="/*$emit('open-modal','artifactModal',artifact.id)*/ toggled=!toggled">
                <collapse-transition :duration="250" group>
                    <img
                    :key="artifact.id"
                    v-if="!toggled"
                    class="mr-1 artifact-thumb"
                    v-lazy="artifact.info.piece.image"
                    :alt="artifact.info.piece.name">

                    <div
                    v-else
                    :key="artifact.id"
                    class="text-light text-left w-100">
                        <button
                        style="margin-right:-20px"
                        type="button"
                        class="btn btn-sm text-light d-inline rounded-0 btn-md float-right py-0 pr-1"
                        @click="$emit('open-modal','artifactModal',artifact.id)">
                            <i class="fas fa-edit fa-sm"></i>
                        </button>

                        <span
                        :class="screen < 370 && 'font-xs-10'"
                        class="font-12 font-weight-bold">
                        	<span v-if="icons.main_icons[icons.main_icons.findIndex(main => main.name == artifact.stats.main.name)].icon">
	                            {{
	                                icons.main_icons[icons.main_icons.findIndex(main => main.name == artifact.stats.main.name)].icon
	                            }}
	                        </span>

                            <img
                            v-else
                            style="height:15px;width:15px;"
                            :src="icons.main_icons[icons.main_icons.findIndex(main => main.name == artifact.stats.main.name)].image"
                            :alt="artifact.stats.main.name">

                            <span>
                                {{ artifact.stats.main.value }}
                            </span>
                        </span>

                        <ul
                        :class="screen < 370 && 'font-xs-10'"
                        class="p-0 mt-1 font-12 list-unstyled">
                            <li
                            :key="i"
                            v-for="(sub,i) in artifact.stats.subs">
                                <span>
                                    {{ icons.sub_icons[icons.sub_icons.findIndex(icon => icon.name == sub.name)].icon }}        
                                </span>

                                <span>
                                    {{ (Math.round(sub.value * 100) / 100)+(sub.name.includes('%') ? '%' : '') }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </collapse-transition>
            </button>

            <button
            v-if="inventory && delete_artifacts && !artifact.info.locked"
            type="button"
            class="btn text-light artifact-main-info d-inline
            rounded btn-md float-left py-0 px-1 mx-1"
            @click="addDeleteId(artifact.id)">
                <img
                class="mr-1 artifact-thumb"
                v-lazy="artifact.info.piece.image"
                :alt="artifact.info.piece.name">

                <b-form-checkbox
                :checked="delete_ids.includes(artifact.id)"
                type="button"
                size="lg"
                class="btn text-light d-inline rounded-0 btn-md position-absolute top-0 right-0 py-0 px-1"
                @change="addDeleteId(artifact.id)">
                </b-form-checkbox>
            </button>
        </div>
	</div>
</template>

<script>
	import staticons from '~/static/staticons.json';

	export default{
		name: 'artifactImage',
		props: {
			artifact: Object,
			inventory: {
				type: Boolean,
				default: false
			}
		},
		computed: {
            delete_artifacts(){
                return this.$store.state.artifacts.delete_artifacts
            },
            delete_ids(){
                return this.$store.state.artifacts.delete_ids
            },
            screen(){
                return this.$store.state.artifacts.screen
            }
        },
		data(){
			return {
				toggled: false,
				icons: staticons
			}
		},
		methods: {
			addDeleteId(id){
                this.$store.commit('artifacts/setDeleteIds',id);
            }
		}
	}
</script>