<template>
    <div class="w-100 mx-auto p-0 m-0 content-container">
        <notifications
        width="350"
        position="top center"
        group="foo">      
        </notifications>

        <genshin/>

        <br><br><br>

        <info-modal
        v-if="loaded"
        ref="infoModal">
        </info-modal>

        <button
        type="button"
        class="btn btn-light position-fixed bottom-2 left-2 px-3 rounded-circle"
        @click="$refs.infoModal.openModal()">
            <i class="fas fa-info fa-md"></i>
        </button>

        <noscript>
            Genshin Impact Artifact Generator <b>requires</b> Javascript to work. Please enable it.
        </noscript>
    </div>
</template>

<script>
    import genshin from '@/components/genshin.vue';
    // const infoModal = () => import('@/components/info-modal.vue');
    import infoModal from '@/components/info-modal.vue';
    export default {
        components: {
            genshin,
            'info-modal': infoModal
        },
        data(){
            return {
                loaded: false
            }
        },
        head () {
            return {
                title: 'Genshin Impact Artifact Generator',
                meta: [
                    {
                        charset: 'utf-8'
                    },
                    {
                        name: 'google-site-verification',
                        content: '4u8ejyeDpEKLjrGw47QLWOik7IsGDyCLk4gLbd6yY-c'
                    },
                    {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1' 
                    },
                    {
                        name: 'theme-color',
                        content: '#1c1c22'
                    },
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'An artifact generator for the popular open world game, Genshin Impact. Roll and upgrade artifacts from any sets and domains, and save them to your inventory.'
                    },
                    {
                        hid: 'og:title',
                        property: 'og:title',
                        content: 'Genshin Impact Artifact Generator'
                    },
                    {
                        hid: 'og:site_name',
                        property: 'og:site_name',
                        content: 'Genshin Impact Artifact Generator'
                    },
                    {
                        hid: 'og:url',
                        property: 'og:url',
                        content: '/'
                    },
                    {
                        hid: 'og:image',
                        property: 'og:image',
                        content: `/og-site-icon.png`
                    },
                    {
                        hid: 'og:type',
                        property: 'og:type',
                        content: 'website'
                    },
                    {
                        hid: 'og:description',
                        property: 'og:description',
                        content: 'Experience the RNG hell of artifacts.'
                    },
                    {
                        hid: 'twitter:title',
                        property: 'twitter:title',
                        content: 'Genshin Impact Artifact Generator'
                    },
                    {
                        hid: 'twitter:site_name',
                        property: 'twitter:site_name',
                        content: 'Genshin Impact Artifact Generator'
                    },
                    {
                        hid: 'twitter:url',
                        property: 'twitter:url',
                        content: '/'
                    },
                    {
                        hid: 'twitter:image',
                        property: 'twitter:image',
                        content: `/og-site-icon.png`
                    },
                    {
                        hid: 'twitter:type',
                        property: 'twitter:type',
                        content: 'website'
                    },
                    {
                        hid: 'twitter:description',
                        property: 'twitter:description',
                        content: 'Experience the RNG hell of artifacts.'
                    }
                ],
                link: [
                    {
                        rel: 'stylesheet',
                        href: 'https://use.fontawesome.com/releases/v5.11.2/css/all.css'
                    },
                    {
                        rel: 'stylesheet',
                        href: '/positioning.css'
                    },
                    {
                        rel: 'icon',
                        type: 'image/x-icon',
                        href: '/favicon.ico'
                    },
                    {
                        rel: 'shortcut icon',
                        href: '/favicon.ico'
                    },
                    {
                        rel: 'apple-touch-icon',
                        href: '/favicon.ico'
                    },
                    {
                        rel: 'apple-touch-icon-precomposed',
                        href: '/favicon.ico'
                    }
                ]
            }
        },
        // methods: {
        //     openModal(){
        //         this.opened=true;
        //         let self=this;
        //         setTimeout(function() {
        //             self.$refs.infoModal.openModal();
        //         }, 25);
        //     }
        // }
        created(){
            let self=this;
            setTimeout(function() {
                self.loaded=true;
            }, 2000);
        }
    }
</script>

<style>
    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
        height:100vh !important;
        overflow:hidden;
        background-image: url('../static/background-image.png');
        margin: 0px;
        padding: 0px;
        overflow-x: hidden;
        overscroll-behavior-y:none;
        background-color:black;
    }
    body{
        background-image: url('../static/background-image.png');
        height: 100vh;
        overflow-y:auto;
        overscroll-behavior-y:none;
    }

    /*@media(min-width: 776px){
        html{
            overflow-y: hidden;
        }
    }*/

    .ui-collapsible__header{
      background-color: rgba(209, 207, 207, 0.2) !important;
      color:white;
    }

    .ui-select__content *{
        color:white !important;
        /*max-width: 200px;*/
    }

    .ui-select{
        display: inline-block!important;
    }

    .ui-modal{
        overflow-y: hidden;
        overscroll-behavior-y:none;
    }

    @media(min-width: 992px){
      ::-webkit-scrollbar {
        color:black;
        width:15px;
        height:10px;
      }

      ::-webkit-scrollbar-track {
        background: rgba(255,255,255,0.5);
      }


      ::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.3);
      }
    }

    body{
        overflow-x: hidden;
    }

    .dropdown-toggle{
        color:white;
        border-radius: 0;
    }

    /*@media(max-width: 576px){
        .ui-modal__body{
            max-height:80vh !important;
            overflow-y: auto;
        }
    }

    @media(min-width: 576px){
        .ui-modal__body{
            max-height:100vh;
            overflow-y: auto;
        }
    }*/
    
    .tooltip {
      display: block !important;
      z-index: 10000;
    }

    .tooltip .tooltip-inner {
      background: black;
      color: white;
      border-radius: 16px;
      padding: 5px 10px 4px;
    }

    .tooltip .tooltip-arrow {
      width: 0;
      height: 0;
      border-style: solid;
      position: absolute;
      margin: 5px;
      border-color: black;
    }

    .tooltip[x-placement^="top"] {
      margin-bottom: 5px;
    }

    .tooltip[x-placement^="top"] .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }

    .tooltip[x-placement^="bottom"] {
      margin-top: 5px;
    }

    .tooltip[x-placement^="bottom"] .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }

    .tooltip[x-placement^="right"] {
      margin-left: 5px;
    }

    .tooltip[x-placement^="right"] .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }

    .tooltip[x-placement^="left"] {
      margin-right: 5px;
    }

    .tooltip[x-placement^="left"] .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }

    .tooltip[aria-hidden='true'] {
      visibility: hidden;
      opacity: 0;
      transition: opacity .15s, visibility .15s;
    }

    .tooltip[aria-hidden='false'] {
      visibility: visible;
      opacity: 1;
      transition: opacity .15s;
    }
</style>