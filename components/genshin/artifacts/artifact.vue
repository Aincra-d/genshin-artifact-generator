<template>
    <div>
        <div v-if="client">
            <div
            v-if="view != 'images'"
            :class="'stars-'+artifact.info.stars+' '+view+' '+(view == 'full' ? 'align-top' : '')"
            class="d-inline-block p-0 border border-light text-light border-0 artifact contain-info">

                <div class="w-100 text-left set-name">
                    <h5 class="ml-4 d-inline">
                        {{
                            artifact.info.piece.name.length > 25 ? artifact.info.piece.name.substring(0, 22)+'...' : artifact.info.piece.name
                        }}
                    </h5>

                    <button
                    v-if="inventory && !delete_artifacts"
                    type="button"
                    class="btn text-light d-inline rounded-0 btn-md float-right py-0 px-1"
                    @click="$emit('open-modal','artifactModal',artifact.id)">
                        <i class="fas fa-edit fa-sm"></i>
                    </button>

                    <b-form-checkbox
                    v-if="inventory && delete_artifacts"
                    :checked="delete_ids.includes(artifact.id)"
                    size="lg"
                    type="button"
                    class="btn text-light d-inline rounded-0 btn-md float-right py-0 px-1"
                    @change="addDeleteId(artifact.id)">
                    </b-form-checkbox>
                </div>

                <div class="w-100 text-right artifact-main-info position-relative">
                    <img
                    class="mr-1"
                    style="height:150px;width:150px;"
                    v-lazy="artifact.info.piece.image"
                    :alt="artifact.info.piece.name">

                    <h6 class="position-absolute top-0 left-0 artifact-type ml-4">
                        {{ artifact.info.piece.type }}
                    </h6>

                    <div class="artifact-main-stat position-absolute bottom-0 left-0 text-left">
                        <!-- {{ artifact.info.set.name }} -->

                        <span class="font-15 font-weight-bold artifact-main-stat ml-4 mb-0">
                            {{ artifact.stats.main.name.replace('%','') }}
                        </span>

                        <h2 class="font-weight-bold text-light artifact-main-value ml-4 mt-0">
                            {{ artifact.stats.main.value }}
                        </h2>

                        <span class="ml-4 mt-2">
                            <i
                            :key="i"
                            v-for="(star,i) in artifact.info.stars"
                            class="fas fa-star text-warning fa-md mr-1"></i>
                        </span>
                    </div>
                </div>

                <div class="artifact-sub-info m-0 p-0">
                    

                    <ul class="list-unstyled text-left font-weight-bold artifact-sub-stats ml-4 pt-3">
                        <li>
                            <h6
                            class="d-inline text-light bg-dark rounded font-weight-bold px-1">
                                <h5 class="d-inline">+</h5>{{ artifact.info.level }}
                            </h6>
                        </li>

                        <li
                        :class="desired_subs ?
                        (desired_subs.includes(sub.name) ? 'text-success font-weight-bold' : '') : ''"
                        :key="i"
                        v-for="(sub,i) in artifact.stats.subs">
                            {{ sub.name.replace('%','') }} <i class="fas fa-plus fa-xs"></i> {{ (Math.round(sub.value * 100) / 100)+(sub.name.includes('%') ? '%' : '') }}
                        </li>
                    </ul>

                    <div class="artifact-set-info text-left">
                        <h6 class="artifact-set-name font-weight-bold ml-4">
                            {{ artifact.info.set.name }}:
                        </h6>

                        <ul class="list-unstyled font-weight-bold text-left ml-4 artifact-set-effects w-90">
                            <li>
                                2-Piece Set: {{ artifact.info.set.effects['2_piece'] }}
                            </li>

                            <li class="mt-1">
                                4-Piece Set: {{ artifact.info.set.effects['4_piece'] }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div v-else>
                <div
                class="artifact images-only d-inline-block rounded position-relative"
                :class="'stars-'+artifact.info.stars">
                    <button
                    v-if="inventory && !delete_artifacts"
                    type="button"
                    class="btn text-light artifact-main-info d-inline
                    rounded btn-md float-left py-0 px-1 mx-1"
                    @click="$emit('open-modal','artifactModal',artifact.id)">
                        <img
                        class="mr-1 artifact-image"
                        v-lazy="artifact.info.piece.image"
                        :alt="artifact.info.piece.name">
                    </button>

                    <button
                    v-if="inventory && delete_artifacts"
                    type="button"
                    class="btn text-light artifact-main-info d-inline
                    rounded btn-md float-left py-0 px-1 mx-1">
                        <img
                        class="mr-1 artifact-image"
                        v-lazy="artifact.info.piece.image"
                        :alt="artifact.info.piece.name">

                        <b-form-checkbox
                        :checked="delete_ids.includes(artifact.id)"
                        type="button"
                        size="lg"
                        class="btn text-light d-inline rounded-0 btn-md position-absolute top-0 right-0 py-0 px-1"
                        @change="addDeleteId(artifact.id)">
                        </b-form-checkbox>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'artifact',
        props: {
            artifact: Object,
            inventory: Boolean,
            editing: Boolean,
            desired_subs: Array,
            view: String
        },
        computed: {
            delete_artifacts(){
                return this.$store.state.artifacts.delete_artifacts
            },
            delete_ids(){
                return this.$store.state.artifacts.delete_ids
            }
        },
        data(){
            return {
                client: process.client ? true : false
            }
        },
        methods: {
            addDeleteId(id){
                this.$store.commit('artifacts/setDeleteIds',id);
            }
        }
}
</script>

<style scoped>
    .artifact{
        /*max-height: 400px;*/
        overflow-y: auto;
        overflow-x: hidden;
    }

    ::-webkit-scrollbar {
      width: 2.5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    @media(min-width: 1200px){
        .artifact.contain-info{
            max-width: 350px;
        }
    }

    @media(min-width: 370px) and (max-width:1200px){
        .artifact-image{
            width:100px;
            height:100px;
        }
    }

    @media(min-width:1200px){
        .artifact-image{
            width:120px;
            height:120px;
        }
    }

     @media(max-width: 370px){
        .artifact-image{
            width:80px;
            height:80px;
        }
    }

    .artifact.images-only{
        overflow-x: hidden;
    }

    .artifact.stars-5 .set-name{
        background-color: #be6c32;
    }

    .artifact.stars-4 .set-name{
        background-color: #a256e1;
    }

    .artifact.stars-3 .set-name{
        background-color: #5180cc;
    }

    .artifact.stars-2 .set-name{
        background-color: #288f72;
    }

    .artifact.stars-1 .set-name{
        background-color: #72778b;
    }

    .set-name{
        padding: 3px 0px 3px 0px;
    }

    .set-name h5, .artifact-type{
        color: #f7f1e5;
    }

    .artifact.stars-5 .artifact-main-info{
        background: #dca451;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #7c5b52,#ac7b53, #dca451);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #7c5b52,#ac7b53, #dca451); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-4 .artifact-main-info{
        background: #a17bb9;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #675b8f,#675b8f, #a17bb9);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #675b8f,#675b8f, #a17bb9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-3 .artifact-main-info{
        background: #5599af;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #51597a,#517d97, #5599af);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #51597a,#517d97, #5599af); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-2 .artifact-main-info{
        background: #609674;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #496162,#48736a, #609674);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #496162,#48736a, #609674); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-1 .artifact-main-info{
        background: #7d8995;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #525965,#6c7480, #7d8995);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #525965,#6c7480, #7d8995); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact-sub-info{
        background-color: #ede5d8;
        color: #74737b;
        font-family: 'Arvo', serif;
    }

    .artifact-main-stat{
        color: #b7a59b;
    }

    .artifact-sub-stats{
        color: #66697a;
    }

    .artifact-sub-stats li:not(:first-child):before {
        content:"·";
        font-size:20px;
        vertical-align:middle;
        line-height:20px;
    }

    .artifact-set-name{
        color: #67b05e;
    }

    .artifact-set-effects{
        color: #909291;
    }

    .artifact.compressed{
        max-height: 185px;
        overflow-y: auto;
    }
</style>