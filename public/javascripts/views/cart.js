let CartView = Backbone.View.extend({
	template: App.templates.cart,
	el: $('#cart').get(0),
	events: {
		'click a': 'destroy',
	},
	render: function() {
		this.$el.html(this.template({
			quantity: this.collection.getQuantity(),
			items: this.collection.toJSON(),
			total: this.collection.getTotal(),
		}));
	},

	destroy: function(e) {
		e.preventDefault();
		let id = $(e.target).attr('data-id');

		this.collection.trigger('destroy', +id);
	},

	initialize: function() {
		this.render();
		this.listenTo(this.collection, 'cart_updated', this.render);
	},
});
