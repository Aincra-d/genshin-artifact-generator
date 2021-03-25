<template>
    <div>
        <sort-inventory class="d-inline"></sort-inventory>

        <filter-inventory class="d-inline"></filter-inventory>

        <change-view class="d-inline"></change-view>

        <inventory-settings class="d-inline"></inventory-settings>
    </div>
</template>

<script>
    import sortInventory from './manageInventory/sortInventory.vue';
    import filterInventory from './manageInventory/filterInventory.vue';
    import changeView from './manageInventory/changeView.vue';
    import inventorySettings from './manageInventory/inventorySettings.vue';
    export default{
        name: 'manageInventory',
        components:{
            'sort-inventory': sortInventory,
            'filter-inventory': filterInventory,
            'change-view': changeView,
            'inventory-settings': inventorySettings
        }
    }
</script>

<style>
    .sort-icon, .filter-icon{
        text-shadow: inset 0px 0px 10px black;
    }

    legend{
        text-shadow: 0px 0px 2px black;
    }

    .sort-inventory .dropdown-menu{
        max-height: 250px !important;
        height: 250px !important;
        overflow-y: auto !important;
    }
</style>