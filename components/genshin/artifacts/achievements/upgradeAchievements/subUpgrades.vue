<template>
    <div>
        <p class="font-italic">
            Upgrade sub stats to a certain value to unlock new achievements.
        </p>

        <ul class="list-unstyled">
            <li
            :key="i"
            v-for="(upgrade,i) in upgrades"
            style="background-color: #282c38;border-left: 3px solid white;"
            class="col-6 col-sm-4 col-xl-3 d-inline-block my-1 px-0 py-2 px-sm-1 px-md-3 font-12 rounded">
                <h6 class="font-xs-12 font-md-12 font-xl-14">
                    {{ i }}

                    <ul class="list-unstyled mt-2">
                        <li
                        :key="j"
                        v-for="(value,j) in upgrade"
                        :class="value.done ? 'font-weight-bold' : 'text-secondary'">
                            {{ value.value+(i.includes('%') ? '%' : '') }}

                            <i
                            v-if="value.done"
                            class="fas fa-check-circle text-success"></i>
                        </li>
                    </ul>
                </h6>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        name: 'subUpgrades',
        computed: {
            upgrades(){
                return this.$store.state.artifacts.achievements.upgrades.subs
            }
        }
    }
</script>