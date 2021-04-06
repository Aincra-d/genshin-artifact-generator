<template>
    <div>
        <div v-if="client">
            <artifact-body
            v-if="view != 'images'"
            :artifact="artifact"
            :inventory="inventory"
            :deleting="delete_artifacts"
            :class="'stars-'+artifact.info.stars+' '+view+' '+(view == 'full' ? 'align-top' : '')"
            class="d-inline-block p-0 border border-light text-light border-0 artifact contain-info"
            @open-modal="$emit('open-modal','artifactModal',artifact.id)">
            </artifact-body>

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

                    <!-- <b-button
                    v-if="inventory && !delete_artifacts"
                    :id="'artifact-'+artifact.id"
                    class="artifact-main-info">
                        <img
                        class="mr-1 artifact-image"
                        v-lazy="artifact.info.piece.image"
                        :alt="artifact.info.piece.name">
                    </b-button>

                    <b-popover
                    :target="'artifact-'+artifact.id"
                    triggers="focus"
                    class="bg-transparent p-3">
                        <artifact-body
                        :artifact="artifact"
                        :inventory="inventory"
                        :deleting="delete_artifacts"
                        :class="'stars-'+artifact.info.stars+' '+view+' '+(view == 'full' ? 'align-top' : '')"
                        class="d-inline-block p-0 border border-light text-light border-0 artifact contain-info">
                        </artifact-body>
                    </b-popover> -->

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
    import artifactBody from './artifact/artifactBody.vue';
    export default{
        name: 'artifact',
        props: {
            artifact: Object,
            inventory: Boolean,
            view: String
        },
        components: {
            'artifact-body': artifactBody
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

<style>
    .popover{
        background: transparent;
        border:0;
        border-radius: 0;
        /*max-width: 400px;*/
    }
</style>