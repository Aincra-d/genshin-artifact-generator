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

<script>
    import genshin from '@/components/genshin.vue';
    export default {
        components: {
            genshin
        }
    }
</script>

<style lang="css">
@import 'static/positioning.css';
@import 'https://use.fontawesome.com/releases/v5.11.2/css/all.css';
</style>

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