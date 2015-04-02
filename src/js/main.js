/*jshint node: true */
'use strict';
var underscore = require('underscore');
var Backbone = require('backbone');
var Store = require('backbone.localstorage');
var $ = Backbone.$ = require('jquery');

var AppView = Backbone.View.extend({
    el: '#container',
    initialize: function() {
        this.input = $('#new-scrap');
        this.scrapPile = new ScrapPile();
        this.scrapPile.on('add', this.addOne, this);
        this.scrapPile.on('reset', this.addAll, this);
        this.scrapPile.fetch();
    },
    events: {
        'keypress #new-scrap': 'createScrapOnEnter'
    },
    createScrapOnEnter: function(e) {
        if(e.which !== 13 || !this.input.val().trim()) {
            return;
        }
        this.scrapPile.create(this.newAttributes());
        this.input.val('');
    },
    addOne: function(scrap) {
        var view = new ScrapView({model: scrap });
        $('#scrap-pile').append(view.render().el);
    },
    addAll: function() {
        $('#scrap-pile').html('');
        this.scrapPile.each(this.addOne, this);
    },
    newAttributes: function() {
        return {
            title: this.input.val().trim(),
            visited: 1
        };
    }
});

var ScrapView = Backbone.View.extend({
    tagName: 'li',
    template: underscore.template($('#scrap-template').html()),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var Scrap = Backbone.Model.extend({
    defaults: {
        title: '',
        url: '',
        icon: '',
        tags: [],
        note: '',
        visited: 0
    }
});

var ScrapPile = Backbone.Collection.extend({
    model: Scrap,
    localStorage: new Store('backbone-scrappile')
});

var appView = new AppView();
