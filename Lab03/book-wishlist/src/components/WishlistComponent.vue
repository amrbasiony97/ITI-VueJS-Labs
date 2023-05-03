<template>
    <div class="mt-5">
        <h1 v-if="wishlistStore.getWishlistLength == 0" class="text-primary text-center">Wishlist is empty</h1>
        <div v-else class="table-responsive">
            <table class="table">
                <thead>
                    <th>ISBN</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Pages</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Operations</th>
                </thead>
                <tbody>
                    <tr v-for="item in wishlistStore.wishlist">
                        <td style="width: 15%;">{{ item.isbn }}</td>
                        <td style="width: 33%;">{{ item.name }}</td>
                        <td style="width: 15%;">{{ item.category }}</td>
                        <td style="width: 7%;">{{ item.noOfPages }}</td>
                        <td style="width: 10%;">{{ item.author }}</td>
                        <td style="width: 10%;">{{ operationStore.formatCurrency(item.price) }}</td>
                        <td style="width: 10%;">
                            <button class="btn btn-danger" @click="wishlistStore.removeFromWishlist(item)">Remove</button>
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th colspan="5" class="text-center">Total price</th>
                        <th colspan="2" class="text-primary">
                            {{ operationStore.formatCurrency(wishlistStore.getTotalPrice) }}
                        </th>
                    </tr>
                    <tr>
                        <th colspan="5" class="text-center">Total taxes</th>
                        <th colspan="2" class="text-primary">
                            {{ operationStore.formatCurrency(wishlistStore.calculateTaxes) }}
                        </th>
                    </tr>
                    <tr>
                        <th colspan="5" class="text-center">Total price</th>
                        <th colspan="2" class="text-primary">
                            {{ operationStore.formatCurrency(wishlistStore.getTotalPrice +
                                wishlistStore.calculateTaxes) }}</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</template>

<script>
import { useWishlistStore } from '@/stores/wishlistStore';
import { useOperationStore } from '@/stores/operationStore';

export default {
    name: 'WishlistComponent',
    data: () => ({
        wishlistStore: useWishlistStore(),
        operationStore: useOperationStore()
    }),
    created() {
        this.wishlistStore.fetchWishlist();
    }
}
</script>

<style scoped>
td, th {
    padding: 10px;
}
</style>