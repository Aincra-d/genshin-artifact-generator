<template>
    <div>
        <div>
            <b-input-group class="w-100 d-inline-block filter-select text-center">
                <b-dropdown
                :size="screen < 576 ? 'sm' : 'md'"
                :text="selected_subs.length!=0 ? selected_subs.length+' stat(s) selected' : 'Select sub stat(s)'"
                variant="light"
                class="text-dark rounded-0"
                :disabled="artifact_main == ''">
                    <b-dropdown-item
                    :key="i"
                    v-for="(sub,i) in artifact_sub_stats"
                    @click.native.capture.stop="selectSub(sub.name)"
                    class="font-xs-15"
                    :disabled="(selected_subs.length === 4 && !selected_subs.includes(sub.name) || artifact_main == sub.name)">
                        <i
                        v-if="!selected_subs.includes(sub.name)"
                        class="far fa-square fa-sm">
                        </i>

                        <span v-else>
                            <b>{{ selected_subs.findIndex(_sub => _sub == sub.name)+1 }}</b>
                        </span>

                        {{ sub.icon+' '+sub.name }}
                    </b-dropdown-item>
                </b-dropdown>
            </b-input-group>
        </div>
    </div>
</template>

<script>
    import substatsJ from '~/static/substats.json';
    import staticons from '~/static/staticons.json';

    export default{
        name: 'subSelect',
        props: {
            stack: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                artifact_sub_stats: substatsJ.map(sub => sub.name),
                selected_subs: [],
                toggled: false,
                sub_icons: staticons.sub_icons
            }
        },
        computed: {
            screen(){
                return this.$store.state.artifacts.screen
            },
            artifact_main(){
                return this.$store.state.artifacts.rng_test.selected_main
            },
            artifact_subs(){
                return this.$store.state.artifacts.rng_test.selected_subs
            }
        },
        methods: {
            setSubStats(){
                let sub_stats=[];
                this.artifact_sub_stats.forEach(sub_stat => {
                    sub_stats.push({
                        name: sub_stat,
                        icon: this.sub_icons[this.sub_icons.findIndex(icon => icon.name == sub_stat)].icon
                    });

                    this.artifact_sub_stats=sub_stats;
                });

                if(this.artifact_subs.length != 0){
                    this.selected_subs=this.artifact_subs;
                }
            },
            selectSub(sub){
                if(this.selected_subs.length < 4 && sub!=this.artifact_main){
                    this.selected_subs.includes(sub)
                    ? this.selected_subs.splice(this.selected_subs.findIndex(_sub => _sub == sub),1)
                    : this.selected_subs.push(sub);

                    this.$store.commit('artifacts/setRngTest',{type: 'subs', value: this.selected_subs});
                }
                else{
                    if(this.selected_subs.includes(sub)){
                        this.selected_subs.splice(this.selected_subs.findIndex(_sub => _sub == sub),1);

                        this.$store.commit('artifacts/setRngTest',{type: 'subs', value: this.selected_subs});
                    }
                }
            }
        },
        created(){
            this.setSubStats();
        }
    }
</script>

<style>
    .stars-filter div label{
        border-radius: 0;
    }
</style>