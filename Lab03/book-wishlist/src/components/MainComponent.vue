<template>
	<div class="book-wishlist">
		<NavbarComponent/>
		<div class="container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import ShopComponent from '@/components/ShopComponent.vue';
import WishlistComponent from '@/components/WishlistComponent.vue';

export default {
	name: 'MainComponent',
	components: {
		NavbarComponent,
		ShopComponent,
		WishlistComponent
	}
}
</script>
