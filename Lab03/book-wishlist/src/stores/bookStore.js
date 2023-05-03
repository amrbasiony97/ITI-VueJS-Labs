import { defineStore } from 'pinia';

export const useBookStore = defineStore('bookStore', {
    state: () => ({
        books: []
    }),
    actions: {
        async fetchBooks() {
            try {
                let response = await fetch('http://localhost:4000/books');
                this.books = await response.json();
            }
            catch (error) {
                console.error(error);
            }
        },
        async increaseQuantity(isbn) {
            for (let book of this.books) {
                if (book.isbn === isbn) {
                    book.quantity++;
                    try {
                        await fetch(`http://localhost:4000/books/${book.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(book)
                        })
                    }
                    catch (error) {
                        console.error(error);
                    }
                    break;
                }
            }
        },
        async decreaseQuantity(isbn) {
            for (let book of this.books) {
                if (book.isbn === isbn) {
                    book.quantity--;
                    try {
                        await fetch(`http://localhost:4000/books/${book.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(book)
                        })
                    }
                    catch (error) {
                        console.error(error);
                    }
                    break;
                }
            }
        }
    }
});
