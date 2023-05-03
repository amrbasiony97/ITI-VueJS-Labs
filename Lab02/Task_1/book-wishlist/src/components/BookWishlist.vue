<template>
  <div class="book-wishlist">
    <nav class="nav d-flex justify-content-between align-items-baseline bg-dark px-4 py-2">
      <a href="#" style="text-decoration: none; color: orange" @click.prevent="hideWishlist">BookStore</a>
      <div class="d-flex justify-content-end align-items-baseline">
        <p class="text-light m-0 me-3">
          <b style="color: orange; font-size: 1.5rem;">{{ wishlist.length }}</b> items &nbsp; | &nbsp; Total
          Price: <b style="color: orange; font-size: 1.2rem;">{{ formatCurrency(getTotalPrice()) }}</b>
        </p>
        <button class="btn btn-primary" @click="showWishlist">
          Display Wishlist
        </button>
      </div>
    </nav>
    <div class="container">
      <!-- <ul>
        <li v-for="book in books" :title="book.author">{{ book.name }}</li>
      </ul> -->
      <div class="d-flex justify-content-center flex-wrap gap-5 my-5" v-if="!wishlistVisible">
        <div class="card mt-4" style="width: 20rem" v-for="book in books">
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
                    <td>{{ formatCurrency(book.price) }}</td>
                  </tr>
                  <tr>
                    <td>{{ book.isbn }}</td>
                    <td>
                      <button class="btn btn-primary" :disabled="book.quantity == 0"
                        @click="addToWishlist(book)">AddToList</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-if="wishlistVisible" class="mt-5">
        <h1 v-if="wishlist.length == 0" class="text-primary text-center">Wishlist is empty</h1>
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
              <tr v-for="item in wishlist">
                <td style="width: 15%;">{{ item.isbn }}</td>
                <td style="width: 33%;">{{ item.name }}</td>
                <td style="width: 15%;">{{ item.category }}</td>
                <td style="width: 7%;">{{ item.noOfPages }}</td>
                <td style="width: 10%;">{{ item.author }}</td>
                <td style="width: 10%;">{{ formatCurrency(item.price) }}</td>
                <td style="width: 10%;">
                  <button class="btn btn-danger" @click="removeFromWishlist(item)">Remove</button>
                </td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colspan="5" class="text-center">Total price</th>
                <th colspan="2" class="text-primary">{{ formatCurrency(getTotalPrice()) }}</th>
              </tr>
              <tr>
                <th colspan="5" class="text-center">Total taxes</th>
                <th colspan="2" class="text-primary">{{ formatCurrency(calculateTaxes()) }}</th>
              </tr>
              <tr>
                <th colspan="5" class="text-center">Total price</th>
                <th colspan="2" class="text-primary">{{ formatCurrency(getTotalPrice() + calculateTaxes()) }}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import books from './books.js';

export default {
  name: 'BookWishlist',
  data: () => ({
    books,
    wishlist: [],
    wishlistVisible: false
  }),
  methods: {
    formatCurrency: value => {
      let fraction = value ? 0.01 : 0;
      return Intl.NumberFormat('en-SA', {
        style: 'currency',
        currency: 'SAR'
      }).format(value - fraction);
    },
    showWishlist: function () {
      this.wishlistVisible = true;
    },
    hideWishlist: function () {
      this.wishlistVisible = false;
    },
    addToWishlist: function (book) {
      book.quantity--;
      this.wishlist.push(book);
    },
    removeFromWishlist: function (book) {
      book.quantity++;
      this.wishlist.splice(this.wishlist.indexOf(book), 1);
    },
    getTotalPrice: function () {
      let totalPrice = 0;
      for (let item of this.wishlist) {
        totalPrice += item.price;
      }
      return totalPrice;
    },
    calculateTaxes: function () {
      let taxes = 0;
      for (let item of this.wishlist) {
        taxes += item.price * 0.14;
      }
      return taxes;
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  font-family: 'Roboto', sans-serif;
}

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
