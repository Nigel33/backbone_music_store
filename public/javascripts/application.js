let App = {
	cart: null,
	albums: null,
	templates: JST,
	$el: $('main'),
	renderAlbums: function() {
		this.albums.each(this.renderAlbumView);
	},

	renderAlbumView: function(album) {
		new AlbumView({
			model: album,
		})
	},

	newAlbum: function() {
		new NewAlbumView();
	},

	createCart: function() {
		this.cart = new CartItems();
		this.cart.view = new CartView({
			collection: this.cart,
		});
	},

	bindEvents: function() {
		_.extend(this, Backbone.Events);
		this.listenTo(this.indexView, 'add_album', this.newAlbum);
		console.log(this.cart);
		this.on('add_to_cart', this.cart.addItem.bind(this.cart));
	},

	createIndexView: function() {
		this.indexView = new IndexView();
		this.renderAlbums();
		this.createCart();
		this.bindEvents();
	},
}

Handlebars.registerHelper('format_price', function(price) {
	return (+price).toFixed(2);
});


