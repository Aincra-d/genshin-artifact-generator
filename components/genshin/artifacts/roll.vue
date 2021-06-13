<template>
    <div>
        <artifact-rolls v-if="!rng_test">
        </artifact-rolls>

        <artifact-rng-test v-else>
        </artifact-rng-test>

        <br>

        <button
        type="button"
        class="btn btn-light"
        @click="rng_test=!rng_test">
            {{
                rng_test ? 'Back to artifact roll' : 'Test artifact RNG'
            }}
        </button>
    </div>
</template>

<script>
    import artifactRolls from './roll/artifact-rolls.vue';
    import artifactRngTest from './roll/artifact-rng-test.vue';

    export default{
        name: 'roll',
        components: {
            'artifact-rolls': artifactRolls,
            'artifact-rng-test': artifactRngTest
        },
        data(){
            return {
                rng_test: false
            }
        }
    }
</script>