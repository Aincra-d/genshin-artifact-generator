<template>
	<div>
		<div class="mb-3">
            <button
            v-if="single"
            type="button"
            class="btn btn-link text-light d-inline rounded-0 mx-1"
            style="box-shadow: 0px 0px 10px gray;text-shadow: 0px 0px 10px gray;"
            :class="screen < 576 ? 'btn-sm' : 'btn-md'"
            :disabled="artifact.info.level == artifact.info.max_level"
            @click="artifact.info.level!=artifact.info.max_level && $emit('upgrade',null)">
                <i class="fas fa-arrow-up fa-sm"></i> Upgrade
            </button>

            <b-dropdown
            v-else
            :disabled="artifact.info.level == artifact.info.max_level"
            id="dropdown-left"
            text="Upgrade"
            style="box-shadow: 0px 0px 10px gray;text-shadow: 0px 0px 10px gray;"
            :size="screen < 576 ? 'sm' : 'md'"
            variant="link"
            class="m-2">
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

            <button
            type="button"
            class="btn btn-link text-light d-inline rounded-0 mx-1"
            style="box-shadow: 0px 0px 10px gray;text-shadow: 0px 0px 10px gray;"
            :class="screen < 576 ? 'btn-sm' : 'btn-md'"
            @click="$emit('roll-artifact')">
                <i class="fas fa-redo fa-sm mr-1"></i> Reroll
            </button>

            <button
            type="button"
            class="btn btn-link text-light d-inline rounded-0 mx-1"
            style="box-shadow: 0px 0px 10px gray;text-shadow: 0px 0px 10px gray;"
            :class="screen < 576 ? 'btn-sm' : 'btn-md'"
            @click="$emit('add')">
                <i class="fas fa-plus fa-sm mr-1"></i>Add
            </button>

            <b-dropdown
            id="dropdown-left"
            text="Reroll"
            style="box-shadow: 0px 0px 10px gray;text-shadow: 0px 0px 10px gray;"
            :size="screen < 576 ? 'sm' : 'md'"
            variant="link"
            class="m-2">
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
        </div>
	</div>
</template>

<script>
	export default{
		name: 'artifactActions',
		props: {
			artifact: Object,
            screen: Number,
            single: Boolean
		}
	}
</script>