import { createRouter, createWebHistory } from 'vue-router';

import ShopComponent from '@/components/ShopComponent.vue';
import WishlistComponent from '@/components/WishlistComponent.vue';

const routes = [
    {
        path: '/',
        component: ShopComponent
    },
    {
        path: '/shop',
        component: ShopComponent
    },
    {
        path: '/wishlist',
        component: WishlistComponent
    },
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;