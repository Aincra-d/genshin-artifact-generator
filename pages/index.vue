<template>
    <div class="w-100 mx-auto p-0 m-0">
        <notifications
        width="350"
        position="top center"
        group="foo">      
        </notifications>

        <genshin/>

        <info-modal
        v-show="opened"
        ref="infoModal">
        </info-modal>

        <button
        type="button"
        class="btn btn-light position-fixed bottom-2 left-2 px-3 rounded-circle"
        @click="openInfoModal">
            <i class="fas fa-info fa-md"></i>
        </button>

        <noscript>
            Genshin Impact Artifact Generator <b>requires</b> Javascript to work. Please enable it.
        </noscript>
    </div>
</template>

<script>
    import genshin from '@/components/genshin.vue';
    import infoModal from '@/components/info-modal.vue';
    export default {
        components: {
            genshin,
            'info-modal': infoModal
        },
        data(){
            return {
                opened: false
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
                    }
                ]
            }
        },
        methods: {
            openInfoModal(){
                this.opened=true;
                this.$refs.infoModal.openModal();
            }
        }
    }
</script>

<!-- <style lang="css">
@import 'static/positioning.css';
@import 'https://use.fontawesome.com/releases/v5.11.2/css/all.css';
</style> -->

<style>
  *,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    font-size: 100%;
    overflow-y: hidden;
}


.ui-collapsible__header{
  background-color: rgba(209, 207, 207, 0.2) !important;
  color:white;
}

.ui-select__content *{
    color:white !important;
    max-width: 200px;
}

.ui-select{
    display: inline-block!important;
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
    color:white !important;
}
</style>