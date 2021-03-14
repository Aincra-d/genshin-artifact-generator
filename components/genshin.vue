<template>
    <div>
        <client-only><artifacts></artifacts></client-only>
    </div>
</template>

<script>
import artifacts from '@/components/genshin/artifacts.vue'
export default {
    name: 'genshin',
    components: {
        artifacts
    },
}
</script>