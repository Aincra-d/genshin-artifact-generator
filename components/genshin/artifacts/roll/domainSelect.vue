<template>
	<div>
		<div class="w-100 text-center">
            <b-button-group class="my-3">
                <b-button
                v-b-toggle.domain-select
                class="rounded-0"
                variant="light"
                :size="screen < 576 ? 'sm' : 'md' ">
                    {{ selected_domain == '' ? 'Select domain' : selected_domain }}
                </b-button>

                <b-button
                variant="danger"
                :size="screen < 576 ? 'sm' : 'md' "
                @click="selected_domain=''"
                class="text-light pr-2">
                    <i class="fas fa-times mr-1"></i>
                </b-button>
            </b-button-group>

            <b-collapse
            id="domain-select"
            class="bg-transparent text-light"
            style="max-height: 45vh; overflow-y: auto;">
                <b-card
                v-b-toggle.domain-select
                :key="i"
                v-for="(domain,i) in domains"
                class="bg-transparent p-0 text-light d-block pointer border-light border-left-0 border-right-0 border-top-0 col-12 col-sm-6 mx-auto"
                @click="selected_domain=(selected_domain == '' ? domain.name
                : selected_domain == domain.name ? '' : domain.name)">
                    <h5>
                        {{ domain.name }}
                    </h5>

                    <img
                    :key="j"
                    v-for="(img,j) in domain.images"
                    :src="img"
                    :alt="domain.sets[i]"
                    style="width:40px; height:40px"
                    class="d-inline-block mx-1">

                    <span
                    v-if="selected_domain == domain.name"
                    class="position-absolute top-0 right-0">
                        <i class="fas fa-check-square fa-lg"></i>
                    </span>
                </b-card>
            </b-collapse>
        </div>
	</div>
</template>

<script>
	export default{
		name: 'domainSelect',
		props: {
			domains: Array
		},
		computed: {
            screen(){
                return this.$store.state.artifacts.screen
            },
            selected_domain: {
            	get(){
            		return this.$store.state.artifacts.selected_domain
            	},
            	set(name){
            		this.$store.commit('artifacts/setSelectedDomain',name)
            	}
            }
        }
	}
</script>