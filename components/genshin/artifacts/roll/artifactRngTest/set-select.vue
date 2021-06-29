<template>
    <div>
        <div>
            <b-input-group class="w-100 d-inline-block filter-select text-center">
                <b-dropdown
                :size="screen < 576 ? 'sm' : 'md'"
                :text="selected_set!= '' ? selected_set : 'Choose artifact set'"
                variant="light"
                class="text-dark rounded-0 set-filter"
                :disabled="artifact_type != ''">
                    <b-dropdown-item
                    :key="i"
                    v-for="(set,i) in artifact_set_names"
                    @click="selectSet(set.name)"
                    class="font-xs-15">
                        <i
                        class="fa-sm"
                        :class="set.name == selected_set ?
                        'fas fa-circle' : 'far fa-circle'">
                        </i>

                        <img
                        v-lazy="set.image"
                        :alt="set.name"
                        style="width:25px; height:25px;"
                        class="rounded">

                        {{set.name}}
                    </b-dropdown-item>
                </b-dropdown>
            </b-input-group>
        </div>
    </div>
</template>

<script>
    import setsJSON from '~/static/sets.json';

    export default{
        name: 'setSelect',
        props: {
            stack: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                artifact_set_names: setsJSON.map(set => set.name),
                all_sets: setsJSON,
                selected_set: '',
                sets: [],
                toggled: false
            }
        },
        computed: {
            screen(){
                return this.$store.state.artifacts.screen
            },
            artifact_type(){
                return this.$store.state.artifacts.gold_artifact.selected_type
            },
        },
        methods: {
            setSets(){
                let sets=[];
                this.all_sets.filter(set => set.stars.includes(5)).forEach(set => {
                    sets.push({
                        name: set.name,
                        image: set.image
                    });
                });

                this.artifact_set_names=sets;
            },
            selectSet(name){
                this.$store.commit('artifacts/setGoldArtifact',{type: 'set', value: name == this.selected_set ? '' : name});
                name == this.selected_set ? this.selected_set = '' : this.selected_set=name;
            }
        },
        created(){
            this.setSets();
        }
    }
</script>

<style>
    .stars-filter div label{
        border-radius: 0;
    }

    @media(max-width: 576px){
        .filter-select .dropdown-menu{
            left:-25% !important;
        }
    }

    .set-filter .dropdown-menu{
        min-width: 230px;
    }
</style>