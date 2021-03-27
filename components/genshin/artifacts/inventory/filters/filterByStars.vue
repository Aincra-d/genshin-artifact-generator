<template>
    <div>
        <b-form-group
        class="text-light stars-filter"
        label="Select artifact rarity to show">
            <b-form-checkbox
            :key="i"
            v-for="(star,i) in 5"
            button
            @input="filterByStars(star)"
            button-variant="outline-light"
            class="d-inline rounded-0"
            size="md"
            name="buttons-2">
            {{ star }} <i class="fas fa-star text-warning fa-sm"></i>
            </b-form-checkbox>
        </b-form-group>
    </div>
</template>

<script>
    export default{
        name: 'filterByStars',
        computed: {
            artifacts(){
                return this.$store.state.artifacts.artifacts
            },
            stack_filters(){
                return this.$store.state.artifacts.stack_filters
            },
            exclude_filters(){
                return this.$store.state.artifacts.exclude_filters
            },
            // stars(){
            //     return this.$store.state.artifacts.active_filters['stars']
            // }
        },
        data(){
            return {
                stars: []
            }
        },
        methods: {
            filterByStars(star){
                this.$store.commit('artifacts/setActiveFilters',{type: 'stars', value: star});
                this.addStar(star);

                if(!this.stack_filters){
                    this.resetArtifacts();
                    if(this.stars.length!=0){
                        let artifacts=this.artifacts.filter(artifact => this.exclude_filters
                            ? !this.stars.includes(artifact.info.stars)
                            : this.stars.includes(artifact.info.stars));
                        this.$store.commit('artifacts/setArtifacts',artifacts);
                    }
                }

                console.log(this.$store.state.artifacts.active_filters['stars'])
            },
            resetArtifacts(){
                if(!this.stack_filters){
                    let artifacts=JSON.parse(localStorage.artifacts).reverse();
                    this.$store.commit('artifacts/setArtifacts',artifacts);
                }
            },
            addStar(star){
                if(this.stars.includes(star)){
                    this.stars.splice(
                        this.stars.findIndex(item => item == star),1);
                }
                else{
                    this.stars.push(star);
                }
            }
        }
    }
</script>

<style>
    .stars-filter div label{
        border-radius: 0;
    }
</style>