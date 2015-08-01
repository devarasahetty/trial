Router.configure({
    layoutTemplate:'layout',
    loadingTemplate:'loading'
    });

Posts=new Mongo.Collection('posts');

Posts.insert({title:"automobile",
             url:"www.reddit.com"
});

Posts.insert({title:"industrial",
    url:"www.reddit.com"
});

Posts.insert({title:"integral mathematics",
    url:"www.reddit.com"
});

Template.homepage.helpers({
    posts:function(){
        return Posts.find();
    }
});


Router.route('/',{name:'login'});

Router.route('/homepage',{name:'homepage'});
Router.route('/english',{name:'englishmovies'},function(){$('.english').css('color','green')});
Router.route('/telugu',{name:'telugumovies'},function(){$('.telugu').css('color','blue')});
Router.route('/hindi',{name:'hindimovies'},function(){  $('.hindi').css('color', 'red');});


Template.comments.events({
    'submit form':function(event){
        event.preventDefault();
        comment= {
          urcomment:$(event.target).find('[name=comment]').val()
        };

       comment._id=comments.insert(comment);
        console.log(this.url);
       Router.go('/english');
        event.setDefault();
    }
});

Template.commentdisplay.helpers({
    commentsshow:function(){
         return comments.find()
    }
});

Template.comments.helpers({
    display:function(){
return moment(this.created).format('MM/DD/YYYY,HH:MM');
    }
});

Meteor.autorun(function() {
    if (Router.current().route.path() == "/telugu") {
        $('.table').css('color', 'red');
    }
    else{
        $('.table').css('color', 'blue');
    }
});


Template.comments.helpers({
  commentnumber:function () {
      return comments.find().count();  // how does the commentnumber is changing atomatically ,even though i didn't give any (autorun or Session variable)
  }
});


Meteor.methods({
    postinsert: function () {
        var post = {
            submitted: new Date()
        };
        var postid = posts.insert(post);
        return {_id: postid};
    }
});

