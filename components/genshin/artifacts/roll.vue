<template>
    <div>
        <collapse-transition v-if="!gold_roll" :duration="250">
            <artifact-rolls></artifact-rolls>
        </collapse-transition>

        <!-- <collapse-transition v-else :duration="250">
            <artifact-rng-test></artifact-rng-test>
        </collapse-transition>

        <br>

        <button
        v-if="!gold_rolled && !gold_rolled_state"
        type="button"
        class="btn btn-light"
        @click="gold_roll=!gold_roll">
            {{
                gold_roll ? 'Back to artifact roll' : 'Gold roll(1 left today)'
            }}
        </button> -->
    </div>
</template>

<script>
    import artifactRolls from './roll/artifact-rolls.vue';
    // import artifactRngTest from './roll/artifact-rng-test.vue';

    export default{
        name: 'roll',
        components: {
            'artifact-rolls': artifactRolls,
            // 'artifact-rng-test': artifactRngTest
        },
        computed: {
            gold_rolled_state(){
                return this.$store.state.artifacts.gold_rolled
            }
        },
        data(){
            return {
                gold_roll: false,
                gold_rolled: localStorage.roll_date == ((new Date().getMonth()+1)+''+new Date().getDate()) ? true : false
            }
        },
        watch: {
            gold_rolled_state(new_value,old_value){
                if(new_value === true) this.gold_roll=false
            }
        }
    }
</script>