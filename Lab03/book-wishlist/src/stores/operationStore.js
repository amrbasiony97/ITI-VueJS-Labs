import { defineStore } from 'pinia';

export const useOperationStore = defineStore('operationStore', {
	actions: {
		formatCurrency: value => {
			let fraction = value ? 0.01 : 0;
			return Intl.NumberFormat('en-SA', {
				style: 'currency',
				currency: 'SAR'
			}).format(value - fraction);
		}
	}
});
