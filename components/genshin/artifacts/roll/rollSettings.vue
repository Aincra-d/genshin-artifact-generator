<template>
	<div>
		<b-dropdown
        menu-class="w-100"
        text="General site settings"
        variant="outline-light"
        class="text-dark rounded-0 border-0 outline-0 mx-auto">
            <b-dropdown-item
            class="position-relative"
            @click.native.capture.stop="setSettings('include_low_stars')">
                <i
                class="fa-sm"
                :class="settings.include_low_stars ?
                'fas fa-check-square' : 'far fa-square'">
                </i>

                <span>Include 1-3 star</span>

                <i
	            v-tooltip="{content: 'Roll 1-3 star artifacts too when rolling', delay: {show:250}, hideOnTargetClick: true}"
	            class="fas fa-question-circle position-absolute top-30 right-2 fa-sm d-inline-block"></i>
            </b-dropdown-item>

            <b-dropdown-item
            class="position-relative"
            @click.native.capture.stop="setSettings('single_upgrades')">
                <i
                class="fa-sm"
                :class="settings.single_upgrades ?
                'fas fa-check-square' : 'far fa-square'">
                </i>
                
                <span>Single upgrades</span>

                <i
            	v-tooltip="{content: 'Only do one upgrade at a time, no option to choose levels', delay: {show:250}, hideOnTargetClick: true}"
	            class="fas fa-question-circle position-absolute top-30 right-2 fa-sm d-inline-block"></i>
            </b-dropdown-item>

            <b-dropdown-item
            class="position-relative"
            @click.native.capture.stop="setSettings('show_upgrades')">
                <i
                class="fa-sm"
                :class="settings.show_upgrades ?
                'fas fa-check-square' : 'far fa-square'">
                </i>
                
                <span>Show upgrades</span>

                <i
            	v-tooltip="{content: 'Show upgrade results in a window', delay: {show:250}, hideOnTargetClick: true}"
	            class="fas fa-question-circle position-absolute top-30 right-2 fa-sm d-inline-block"></i>
            </b-dropdown-item>

            <b-dropdown-item
            class="position-relative"
            @click.native.capture.stop="setSettings('roll_10x')">
                <i
                class="fa-sm"
                :class="settings.roll_10x ?
                'fas fa-check-square' : 'far fa-square'">
                </i>
                
                <span>10x rolls</span>

                <i
                v-tooltip="{content: 'Only do 10x artifact rolls', delay: {show:250}, hideOnTargetClick: true}"
	            class="fas fa-question-circle position-absolute top-30 right-2 fa-sm d-inline-block"></i>
            </b-dropdown-item>

            <b-dropdown-item
            class="position-relative"
            @click.native.capture.stop="setSettings('show_set_effects')">
                <i
                class="fa-sm"
                :class="settings.show_set_effects ?
                'fas fa-check-square' : 'far fa-square'">
                </i>
                
                <span>Show set effects</span>

                <i
                v-tooltip="{content: 'Show set effects by default', delay: {show:250}, hideOnTargetClick: true}"
	            class="fas fa-question-circle position-absolute top-30 right-2 fa-sm d-inline-block"></i>
            </b-dropdown-item>
        </b-dropdown>
	</div>
</template>

<script>
	export default{
		name: 'rollSettings',
		computed: {
			settings(){
				return this.$store.state.artifacts.settings
			}
		},
		methods: {
			setSettings(name){
				this.$store.commit('artifacts/setSettings',name);

				name == 'roll_10x' && this.$emit('emptyArtifacts');
			}
		}
	}
</script>