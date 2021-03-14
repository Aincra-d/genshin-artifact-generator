<template>
  <div class="container">
    <notifications
        width="350"
        position="top center"
        group="foo">
        </notifications>
    <genshin/>
  </div>
</template>


title: 'Genshin Impact Artifact Generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Generate artifacts from the popular Genshin Impact game, upgrade them, add to your inventory, play with RNG' },
      { hid: 'og:title', property: 'og:title', content: 'Genshin Impact Artifact Generator'},
      { hid: 'og:url', property: 'og:url', content: 'https://genshin-artifact-generator.netlify.app/'},
      { hid: 'og:image', property: 'og:image', content: `https://genshinartifacts.netlify.app/site-icon.png`},
      { hid: 'og:type', property: 'og:type', content: 'website'},
      { hid: 'og:description', property: 'og:description', content: 'Experience the RNG hell of artifacts.'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/site-icon.png' }
    ]


<script>
    import genshin from '@/components/genshin.vue';
    export default {
        components: {
            genshin
        },
        head () {
            return {
                title: 'Genshin Impact Artifact Generator',
                meta: [
                    {
                        charset: 'utf-8'
                    },
                    {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1' 
                    },
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'Generate artifacts from the popular Genshin Impact game, upgrade them, add to your inventory, play with RNG' 
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
                        content: 'https://genshinartifacts.netlify.app/'
                    },
                    {
                        hid: 'og:image',
                        property: 'og:image',
                        content: `https://genshinartifacts.netlify.app/og-site-icon.png`
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