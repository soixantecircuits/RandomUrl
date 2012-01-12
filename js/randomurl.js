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
      $("#logo img").bind('click', function(e){
        e.preventDefault();
        $("#url").fadeOut('slow',function(){
          App.randProject();          
        });
      });


      $("#scenographie").bind('click', function(e){
        e.preventDefault();
        $("#url").fadeOut('slow',function(){
          App.randProject('scenographie');
        });
      });
      $("#enseignement").bind('click', function(e){
        e.preventDefault();
        $("#url").fadeOut('slow',function(){
          App.randProject('enseignement');
        });
      });
      $("#application").bind('click', function(e){
        e.preventDefault();
        $("#url").fadeOut('slow',function(){
          App.randProject('application');
        });
      });
      $("#internet").bind('click', function(e){
        e.preventDefault();
        $("#url").fadeOut('slow',function(){
          App.randProject('internet');
        });
      });
      this.randProject();
    },

    randProject: function(type){
      
      if(projects.length < 1){
        console.log("GOOD");
        projects.add(soixanteprojects);
      }
      
      if (type){
        var projectstype = _.filter(projects.models, function(proj){ return proj.get('type') == type;});
        if (projectstype.length == 0){
          projectstype = _.filter(soixanteprojects, function(proj){ return proj.type == type;});
          projects.add(projectstype);
          projectstype = _.filter(projects.models, function(proj){ return proj.get('type') == type;});
        }
        if (projectstype.length > 0){
          var rand = Math.floor(Math.random()*projectstype.length);
          this.addOne( projectstype[rand]);    
          projects.remove(projectstype[rand]); 
        }
      } 
      else { 
        var rand = Math.floor(Math.random()*projects.length);
        this.addOne( projects.at(rand));    
        projects.remove( projects.at(rand));
      } 
    },

    addOne: function(proj) {
        $("#url").html('<iframe src="' + proj.get('url') + '" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="100%" scrolling="auto"><a href="' + proj.get('url') + '">' + proj.get('url') + '</a></iframe>');          
        $("#url").fadeIn("5500");
        $(".blue").removeClass("blue");
        $("#"+proj.get('type')).addClass("blue");
        Cufon.refresh();
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView();

});
