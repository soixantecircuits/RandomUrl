//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){
  
  //  Model
  // ----------

  window.Project = Backbone.Model.extend({
  });

  //  Collection
  // ---------------

  window.Projects = Backbone.Collection.extend({
    model: Project
  });

  // The Application
  // ---------------

  // Create our global collection.
  window.projects = new Projects();
  
  // Our overall **AppView** is the top-level piece of UI.
  window.AppView = Backbone.View.extend({

    initialize: function() {
      projects.add(soixanteprojects);
      $("#logo a").bind('click', function(e){
        e.preventDefault();
        
        $("#url").fadeOut('slow',function(){
          App.randProject();          
        });

      });
      this.randProject();
    },

    randProject: function(){
      
      if(projects.length < 1){
        console.log("GOOD");
        projects.add(soixanteprojects);
      }

      var rand = Math.random();
      this.addOne( projects.at( Math.floor(rand * projects.length) ) );    
      projects.remove( projects.at( Math.floor(rand * projects.length) ) ); 
    },

    addOne: function(proj) {
        $("#url").html('<iframe src="' + proj.get('url') + '" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="100%" scrolling="auto"><a href="' + proj.get('url') + '">' + proj.get('url') + '</a></iframe>');          
        $("#url").fadeIn("5500");
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView();

});
