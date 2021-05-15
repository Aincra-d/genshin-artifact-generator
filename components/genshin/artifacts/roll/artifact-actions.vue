<template>
	<div>
		<div class="mb-3">
            <button
            type="button"
            class="btn btn-link text-light d-inline rounded-0 mx-1 shadowed"
            :class="screen < 576 ? 'btn-sm' : 'btn-md'"
            @click="$emit('add')">
                <!-- <i class="fas fa-plus fa-sm mr-1"></i> -->Add
            </button>

            <button
            v-if="single"
            :dropleft="screen < 360"
            type="button"
            class="btn btn-link text-light d-inline rounded-0 mx-1 shadowed"
            :class="screen < 576 ? 'btn-sm' : 'btn-md'"
            :disabled="artifact.info.level == artifact.info.max_level"
            @click="artifact.info.level!=artifact.info.max_level && $emit('upgrade',null)">
                <!-- <i class="fas fa-arrow-up fa-sm"></i> --> Upgrade
            </button>

            <b-dropdown
            v-else
            :disabled="artifact.info.level == artifact.info.max_level"
            id="dropdown-left"
            text="Upgrade"
            :size="screen < 576 ? 'sm' : 'md'"
            variant="link"
            class="shadowed">
                <b-dropdown-item
                :disabled="artifact.info.level == artifact.info.max_level"
                @click="artifact.info.level != artifact.info.max_level && $emit('upgrade',1)"
                href="#">
                    +{{ artifact.info.level+4 }}
                </b-dropdown-item>

                <div
                :key="i"
                v-for="(upgrade,i) in 4">
                    <b-dropdown-item
                    v-if="artifact.info.stars > 1 && (artifact.info.max_level - artifact.info.level)/4 >= i+2"
                    @click="artifact.info.level != artifact.info.max_level && $emit('upgrade',i+2)"
                    href="#">
                        +{{ artifact.info.level+((i+2))*4 }}
                    </b-dropdown-item>
                </div>
            </b-dropdown>

            <b-dropdown
            id="dropdown-left"
            text="Reroll"
            :dropright="screen < 360"
            :size="screen < 576 ? 'sm' : 'md'"
            variant="link"
            class="shadowed">
                <b-dropdown-item
                @click="artifact.info.rerolls.main.count == 0 && $emit('reroll-main-stat')"
                :disabled="artifact.info.rerolls.main.count == 1  || ['Flower of Life','Plume of Death'].includes(artifact.info.piece.type)"
                href="#">
                    Main stat(max: 1)
                </b-dropdown-item>

                <b-dropdown-item
                @click="artifact.info.rerolls.subs.count!=1 && $emit('reroll-sub-stats')"
                :disabled="artifact.info.rerolls.subs.count == 1"
                href="#">
                    Sub stats(max: 1)
                </b-dropdown-item>
            </b-dropdown>

            <b-dropdown
            menu-class="w-100"
            id="dropdown-left"
            text="Equip"
            :dropright="screen < 360"
            :size="screen < 576 ? 'sm' : 'md'"
            variant="link"
            class="mx-0 character-select shadowed">
                <b-dropdown-item
                :key="i"
                v-for="(character,i) in characters"
                @click="$emit('equip-artifact',character)"
                href="#">
                    <img
                    :src="character.image"
                    :alt="character.name"
                    style="width:25px; height:25px;">

                    <span :class="artifact.info.equipped !== false && (artifact.info.equipped.name == character.name && 'text-primary font-weight-bold')">
                        {{ character.name }}
                    </span>
                </b-dropdown-item>
            </b-dropdown>

            <button
            :disabled="artifact.info.locked"
            type="button"
            class="btn btn-link text-light d-inline rounded-0 mx-1 shadowed"
            :class="screen < 576 ? 'btn-sm' : 'btn-md'"
            @click="$emit('roll-artifact')">
                <!-- <i class="fas fa-redo fa-sm mr-1"></i> --> Roll
            </button>
        </div>
	</div>
</template>

<script>
    import charactersJSON from '~/static/characters.json';

	export default{
		name: 'artifactActions',
		props: {
			artifact: Object,
            single: Boolean
		},
        computed: {
            screen(){
                return this.$store.state.artifacts.screen
            }
        },
        data(){
            return {
                characters: charactersJSON
            }
        }
	}
</script>

<style scoped>
    .shadowed{
        box-shadow:inset 0px 0px 2px white;
        text-shadow:inset 0px 0px 2px white;
    }
</style>