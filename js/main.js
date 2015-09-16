var regSys = {

    views: {},

    models: {},

    loadTemplates: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (regSys[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    regSys[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

};

regSys.Router = Backbone.Router.extend({

    routes: {
        "a":                 "home",
        "contact":          "contact",
        "employees/:id":    "employeeDetails"
    },

    initialize: function () {
        regSys.homeView = new regSys.HomeView();
        $('.view1').html(regSys.homeView.render().el);
        // Close the search dropdown on click anywhere in the UI

        this.$content = $("#content");
    },

    home: function () {
        regSys.view2 = new regSys.View2();
        $('.view1').html(regSys.view2.render().el);
        /*// Since the home view never changes, we instantiate it and render it only once
        if (!regSys.homelView) {
            regSys.homelView = new regSys.HomeView();
            regSys.homelView.render();
        } else {
            console.log('reusing home view');
            regSys.homelView.delegateEvents(); // delegate events when the view is recycled
        }
        this.$content.html(directory.homelView.el);
        directory.shellView.selectMenuItem('home-menu');*/
    }

});

$(document).on("ready", function () {
    regSys.loadTemplates(["HomeView", "View2"],
        function () {
            regSys.router = new regSys.Router();
            Backbone.history.start();
        });
});






/*
(function($){

    var template1 = "<h1>hello</h1>";

    var ListView = Backbone.View.extend({
        el: $('body'), // attaches `this.el` to an existing element.

        initialize: function(){
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

            this.render(); // not all views are self-rendering. This one is.
        },



        render: function(){
            $(this.el).html(template1);
        }
    });

    var listView = new ListView();
})(jQuery);*/
