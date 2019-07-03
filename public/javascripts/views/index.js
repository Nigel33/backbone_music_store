let IndexView = Backbone.View.extend({
	template: App.templates.index,
	attributes: {
		id: 'index',
	},

	events: {
		"click footer a": "addAlbum",
	},

	render: function() {
		this.$el.html(this.template());
		App.$el.html(this.$el);
	},

	addAlbum: function(e) {
		e.preventDefault();
		this.trigger('add_album');
	},

	initialize: function() {
		this.render();
	},
});
