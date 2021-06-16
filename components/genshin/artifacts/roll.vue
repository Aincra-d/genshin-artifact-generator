<template>
    <div>
        <collapse-transition v-if="!rng_test" :duration="250">
            <artifact-rolls></artifact-rolls>
        </collapse-transition>

        <!-- <collapse-transition v-else :duration="250">
            <artifact-rng-test></artifact-rng-test>
        </collapse-transition>

        <br>

        <button
        type="button"
        class="btn btn-light"
        @click="rng_test=!rng_test">
            {{
                rng_test ? 'Back to artifact roll' : 'Test artifact RNG'
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
        // data(){
        //     return {
        //         rng_test: false
        //     }
        // }
    }
</script>