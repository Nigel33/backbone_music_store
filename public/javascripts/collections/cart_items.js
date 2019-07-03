let CartItems = Backbone.Collection.extend({
	addItem: function(item) {
		let existing = this.get(item.get('id'));

		if (existing) {
			existing.set('quantity', existing.get('quantity') + 1);
		} else {
			existing = item.clone();
			existing.set('quantity', 1);
			this.add(existing);
		}

		this.setTotal().setQuantity().updateStorage();
		this.trigger('cart_updated');
	},

	setTotal: function() {
		this.total = this.toJSON().reduce(function(a,b) {
			return a + (b.price * b.quantity);
		}, 0);

		return this;
	},

	setQuantity: function() {
		this.quantity = this.toJSON().reduce(function(a, b){
			return a + b.quantity;
		}, 0);

		return this;
	},

	destroy: function(id) {
		this.remove(id);
		this.setTotal().setQuantity().updateStorage();
		this.trigger('cart_updated');
	},

	readStorage: function() {
		let stored_cart = JSON.parse(localStorage.getItem('cart'));
		this.reset(stored_cart);
		this.setTotal().setQuantity();
	},

	updateStorage: function(item) {
		localStorage.setItem('cart', JSON.stringify(this.toJSON()));
	},

	initialize: function() {
		this.readStorage();
		this.on('destroy', this.destroy);
	},

	getTotal: function() {return this.total;},
	getQuantity: function() {return this.quantity;},
});
