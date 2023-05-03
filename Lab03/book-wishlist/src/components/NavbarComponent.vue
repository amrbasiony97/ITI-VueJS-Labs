<template>
    <nav class="nav d-flex justify-content-between align-items-baseline bg-dark px-4 py-2">
        <router-link to="/shop" style="text-decoration: none;"><span class="logo">BookStore</span></router-link>
        <div class="d-flex justify-content-end align-items-baseline">
            <p class="text-light m-0 me-3">
                <b style="color: orange; font-size: 1.5rem;">{{ wishlistStore.getWishlistLength }}</b> items &nbsp; | &nbsp;
                Total
                Price: <b style="color: orange; font-size: 1.2rem;">{{
                    operationStore.formatCurrency(wishlistStore.getTotalPrice)
                }}</b>
            </p>
            <button class="btn btn-primary">
                <router-link to="/wishlist" style="text-decoration: none; color: #fff;">Display Wishlist</router-link>
            </button>
        </div>
    </nav>
</template>

<script>
import { useWishlistStore } from '@/stores/wishlistStore';
import { useOperationStore } from '@/stores/operationStore';

export default {
    name: 'NavbarComponent',
    data: () => ({
        wishlistStore: useWishlistStore(),
        operationStore: useOperationStore()
    })
}
</script>

<style scoped>
.logo {
    color: orange;
    font-size: 1.5rem;
    font-weight: bold;
    font-style: italic;
}
</style>