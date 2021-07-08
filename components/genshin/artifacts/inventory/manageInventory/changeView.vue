<template>
    <div>
        <b-dropdown
        class="m-0 set-inventory-view"
        :size="screen < 576 ? 'md' : 'lg'"
        variant="link">
            <template v-slot:button-content>
                <i class="fas fa-th sort-icon"></i>
            </template>

            <b-dropdown-item
            :key="i"
            v-for="(view,i) in views"
            @click="changeView(view.name)">
                <i
                class="fas mr-2"
                :class="view.icon">
                </i>
                
                <span :class="view.name == inventory_view && 'text-primary'">
                    {{view.title}}
                </span>
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
    export default{
        name: 'changeView',
        computed: {
            screen(){
                return this.$store.state.artifacts.screen
            }
        },
        data(){
            return {
                inventory_view: process.client && (sessionStorage.inventoryView || (this.screen < 776 ? 'images' : 'compressed')),
                views: [
                    {
                        name: 'full',
                        title: 'Full cards',
                        icon: 'fas fa-square'
                    },
                    {
                        name: 'compressed',
                        title: 'Compressed cards',
                        icon: 'fas fa-th-large'
                    },
                    {
                        name: 'images',
                        title: 'Tiles',
                        icon: 'fas fa-th'
                    },
                ]
            }
        },
        methods: {
            changeView(name){
                this.inventory_view=name;
                process.client && sessionStorage.setItem('inventoryView', name);
                this.$store.commit('artifacts/setView',name);
            },
        }
    }
</script>