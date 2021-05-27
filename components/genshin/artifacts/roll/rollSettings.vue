<template>
	<div>
		<b-dropdown
        menu-class="w-100"
        text="Artifact roll settings"
        variant="outline-light"
        class="text-dark rounded-0 border-0 outline-0 mx-auto">
            <b-dropdown-item
            v-tooltip="{content: 'Roll 1-3 star artifacts too when rolling', delay: {show:250}, hideOnTargetClick: true}"
            @click.native.capture.stop="setRollSettings('include_low_stars')">
                <i
                class="fa-sm"
                :class="roll_settings.include_low_stars ?
                'fas fa-check-square' : 'far fa-square'">
                </i>

                Include 1-3 star
            </b-dropdown-item>

            <b-dropdown-item
            v-tooltip="{content: 'Only do one upgrade at a time, no option to choose levels', delay: {show:250}, hideOnTargetClick: true}"
            @click.native.capture.stop="setRollSettings('single_upgrades')">
                <i
                class="fa-sm"
                :class="roll_settings.single_upgrades ?
                'fas fa-check-square' : 'far fa-square'">
                </i>
                
                Single upgrades
            </b-dropdown-item>

            <b-dropdown-item
            v-tooltip="{content: 'Show upgrade results in a window', delay: {show:250}, hideOnTargetClick: true}"
            @click.native.capture.stop="setRollSettings('show_upgrades')">
                <i
                class="fa-sm"
                :class="roll_settings.show_upgrades ?
                'fas fa-check-square' : 'far fa-square'">
                </i>
                
                Show upgrades
            </b-dropdown-item>

            <b-dropdown-item
            v-tooltip="{content: 'Only do 10x artifact rolls', delay: {show:250}, hideOnTargetClick: true}"
            @click.native.capture.stop="setRollSettings('roll_10x')">
                <i
                class="fa-sm"
                :class="roll_settings.roll_10x ?
                'fas fa-check-square' : 'far fa-square'">
                </i>
                
                10x rolls
            </b-dropdown-item>
        </b-dropdown>
	</div>
</template>

<script>
	export default{
		name: 'rollSettings',
		computed: {
			roll_settings(){
				return this.$store.state.artifacts.roll_settings
			}
		},
		methods: {
			setRollSettings(name){
				this.$store.commit('artifacts/setRollSettings',name);

				name == 'roll_10x' && this.$emit('emptyArtifacts');
			}
		}
	}
</script>