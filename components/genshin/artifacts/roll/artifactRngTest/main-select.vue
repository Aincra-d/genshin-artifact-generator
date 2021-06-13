<template>
    <div>
        <div>
            <b-input-group class="w-100 d-inline-block ml-3 ml-lg-0 filter-select text-center">
                <b-dropdown
                :size="screen < 576 ? 'sm' : 'md'"
                :text="selected_main!= '' ? selected_main : 'Choose main stat'"
                variant="light"
                class="text-dark rounded-0">
                    <div class="filter-options-container">
                        <b-dropdown-item
                        :key="i"
                        v-for="(main,i) in artifact_main_stats"
                        @click="selectMain(main.name)"
                        class="font-xs-15">
                            <i
                        class="fa-sm"
                        :class="main.name == selected_main ?
                        'fas fa-circle' : 'far fa-circle'">
                        </i>

                            <img
                            v-if="main.image"
                            v-lazy="main.image"
                            :alt="main.name"
                            style="width:20px; height:20px;">

                            {{ (main.icon ? main.icon+' ' : '') }} {{ main.name }}
                        </b-dropdown-item>
                    </div>
                </b-dropdown>
            </b-input-group>
        </div>
    </div>
</template>

<script>
    import mainstatsJ from '~/static/mainstats.json';
    import staticons from '~/static/staticons.json';

    export default{
        name: 'mainSelect',
        props: {
            stack: {
                type: Boolean,
                default: false,
            }
        },
        data(){
            return {
                artifact_main_stats: mainstatsJ.map(main => main.name),
                selected_main: '',
                toggled: false,
                main_icons: staticons.main_icons
            }
        },
        computed: {
            screen(){
                return this.$store.state.artifacts.screen
            },
        },
        methods: {
            setMainStats(){
                let main_stats=[];
                
                this.artifact_main_stats.forEach(main_stat => {
                    main_stats.push({
                        name: main_stat,
                        icon: this.main_icons[this.main_icons.findIndex(icon => icon.name == main_stat)].icon,
                        image: this.main_icons[this.main_icons.findIndex(icon => icon.name == main_stat)].image
                    });

                    this.artifact_main_stats=main_stats;
                });
            },
            selectMain(name){
                name == this.selected_main ? this.selected_main = '' : this.selected_main=name;

                this.$store.commit('artifacts/setRngTest',{type: 'main', value: name});
            }
        },
        created(){
            this.setMainStats();
        }
    }
</script>

<style>
    /*.select-all-filter{
        box-shadow: 0px 0px 5px black;
    }
*/
    .stars-filter div label{
        border-radius: 0;
    }
</style>