regSys.HomeView = Backbone.View.extend({

    events:{
        "click .btn":"showMeBtnClick"
    },

    render:function () {
        this.$el.html(this.template());
        return this;
    },

    showMeBtnClick:function () {
        var email = $("#inputEmail").val();
        $.post("http://localhost:3000/a2",{user: email,password: email}, function(data){
            if(data==='done')
            {
                alert("login success");
            }
            if (data) {
                //data = JSON.parse(data);
                alert(data);
            }
        });
       // alert(email);
    }

});