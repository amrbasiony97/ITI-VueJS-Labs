import { defineStore } from 'pinia';
import { useBookStore } from '@/stores/bookStore';

export const useWishlistStore = defineStore('sishlistStore', {
	state: () => ({
		wishlist: [],
		bookStore: useBookStore()
	}),
	getters: {
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
		},
        getWishlistLength: function() {
            return this.wishlist.length;
        }
	},
	actions: {
		async fetchWishlist() {
			try {
				let response = await fetch('http://localhost:4000/wishlist');
				this.wishlist = await response.json();
			}
			catch (error) {
				console.error(error);
			}
		},
		addToWishlist: async function (book) {
			let newBook = {
				isbn: book.isbn,
				name: book.name,
				category: book.category,
				image: book.image,
				noOfPages: book.noOfPages,
				author: book.author,
				price: book.price,
				quantity: 1
			};
			try {
				await fetch('http://localhost:4000/wishlist', {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newBook)
				});
				this.wishlist.push(newBook);
				this.bookStore.decreaseQuantity(book.isbn);
			}
			catch (error) {
				console.error(error);
			}
		},
		removeFromWishlist: async function (book) {
			for (let item of this.wishlist) {
				if (item.isbn === book.isbn) {
					try {
						await fetch(`http://localhost:4000/wishlist/${item.id}`, {
							method: 'DELETE'
						});
						this.wishlist.splice(this.wishlist.indexOf(item), 1);
						this.bookStore.increaseQuantity(book.isbn);
					}
					catch (error) {
						console.error(error);
					}
				}
			}
		}
	}
});
