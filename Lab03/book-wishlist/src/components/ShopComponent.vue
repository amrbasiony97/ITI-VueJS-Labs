<template>
    <div class="d-flex justify-content-center flex-wrap gap-5 my-5">
        <div class="card mt-4" style="width: 20rem" v-for="book in bookStore.books">
            <img class="card-img-top" :src="book.image" alt="book.name" />
            <div class="card-body">
                <h5 class="card-title text-center text-primary">{{ book.name }}</h5>
                <div class="table-responsive">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>{{ book.category }}</td>
                                <td>{{ book.author }}</td>
                            </tr>
                            <tr>
                                <td :class="[book.noOfPages < 50 ? 'less' : 'more']">{{ book.noOfPages }}</td>
                                <td>{{ operationStore.formatCurrency(book.price) }}</td>
                            </tr>
                            <tr>
                                <td>{{ book.isbn }}</td>
                                <td>
                                    <button class="btn btn-primary" :disabled="book.quantity == 0"
                                        @click="wishlistStore.addToWishlist(book)">AddToList</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useBookStore } from '@/stores/bookStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useOperationStore } from '@/stores/operationStore';

export default {
    name: 'ShopComponent',
    data: () => ({
        bookStore: useBookStore(),
        wishlistStore: useWishlistStore(),
        operationStore: useOperationStore()
    }),
    created() {
        this.bookStore.fetchBooks();
    }
}
</script>

<style scoped>
.card {
    background-image: linear-gradient(to bottom, #fff, #f7f7f7);
    border: 0 !important;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: all 0.25s ease-in-out;
}

.card:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    transform: translateY(-10px);
}

.card h5 {
    height: 3rem;
}

.card img {
    height: 20rem;
    object-fit: contain;
}

.card td {
    text-align: center
}

.card tr {
    vertical-align: middle;
}

.less {
    color: red;
}

.more {
    color: green;
}
</style>