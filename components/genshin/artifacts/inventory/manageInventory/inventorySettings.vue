<template>
    <div>
        <b-dropdown
        class="m-0 set-inventory-view"
        :size="screen < 576 ? 'md' : 'lg'"
        variant="link">
            <template v-slot:button-content>
                <i class="fas fa-ellipsis-v sort-icon"></i>
            </template>

            <b-dropdown-item
            @click="exclude_filters=!exclude_filters">
                <i
                class="fa-sm"
                :class="exclude_filters ? 'fas fa-check-square' : 'far fa-square'"></i>
                Exclude filters
            </b-dropdown-item>

            <b-dropdown-item
            @click="delete_artifacts=!delete_artifacts">
                <i
                class="fa-sm"
                :class="delete_artifacts ? 'fas fa-check-square' : 'far fa-square'"></i>
                Remove artifacts
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
    export default{
        name: 'inventorySettings',
        computed: {
            screen(){
                return this.$store.state.artifacts.screen
            },
            exclude_filters: {
                get(){
                    return this.$store.state.artifacts.exclude_filters
                },
                set(value){
                    this.$store.commit('artifacts/setFilterType',value);

                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: '<h6>Changed filter type to '+(value ? 'exclude' : 'include')+'</h6>'
                    });
                }
            },
            delete_artifacts: {
                get(){
                    return this.$store.state.artifacts.delete_artifacts
                },
                set(value){
                    this.$store.commit('artifacts/setDeleteArtifacts',value);
                }
            }
        }
    }
</script>