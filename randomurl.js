//(c) Soixante circuits 2011

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Setup
  window.soixanteprojects = [ {url:'http://www.fondationchirac.eu'},
                              {url:'http://www.afinejewel.com'},
                              {url:'http://www.dailymotion.com/video/x83zi8_rm001-pour-remy-martin_creation'},
                              {url:'http://www.cpp-luxury.com/en/christian-dior-inaugurate-flagship-in-beijing-with-lady-dior-exhibit_1942.html'},
                              {url:'http://itunes.apple.com/us/app/leauparkenzo/id434401875?mt=8'},
                              {url:'http://www.ensci.com/fr/masteres-specialises/creation-et-technologie-contemporaine/presentation/mission/'},
                              {url:'http://babiole.net/spip.php?article62'},
                              {url:'http://www.licence.elec.upmc.fr/fr/02_Licences_alternance/04-L3_IOVIS/'},
                              {url:'http://www.celsa-misc.fr/'},
                              {url:'http://itunes.apple.com/us/app/pwc-story/id408374360?mt=8'},
                              {url:'http://www.collectifr.fr/1pourcent/c-rivalin-f-bragigand'},
                              {url:'http://franklinazzi.com/dotclear/index.php?renard'},
                              {url:'http://babiole.net/spip.php?article5'},
                              {url:'http://www.leguide.ma/voyages/voy-articles.cfm?prod=197'},
                              {url:'http://www.artdaily.com/index.asp?int_sec=11&int_new=33583&int_modo=2'},
                              {url:'http://franklinazzi.com/dotclear/index.php?ratp'},
                              {url:'http://babiole.net/spip.php?article4'},
                              {url:'http://www.dailymotion.com/video/x83zm1_section-amour-ballons-d-amour_creation'},
                              {url:'http://www.dailymotion.com/video/x83zf1_magnifique-de-lancome-ecran-de-led_creation#rel-page-under-4'},
                              {url:'http://www.babiole.net/spip.php?article9'},
                              {url:'http://www.be-art-website.com/index.php?in=10198'},
                              {url:'http://www.galeriefrankelbaz.com/wp/artists/davide-balula/davide-balula-shows/#DB-show2007-4'},
                              {url:'http://bouchrajarrar.com/'},
                              //{url:''},
                              //{url:''},
                              //{url:''},
                            ]; 
  
  //  Model
  // ----------

  window.Project = Backbone.Model.extend({
  });

  //  Collection
  // ---------------

  window.Projects = Backbone.Collection.extend({
    model: Project,
  });

  // The Application
  // ---------------

  // Create our global collection.
  window.projects = new Projects;
  
  // Our overall **AppView** is the top-level piece of UI.
  window.AppView = Backbone.View.extend({

    initialize: function() {
      projects.add(soixanteprojects);
      $("#logo").bind('click', function(){
        App.randProject();
      });
      this.randProject();
    },

    randProject: function(){
      this.addOne(projects.at(Math.floor(Math.random() * projects.length)));
    },

    addOne: function(proj) {
      $("#url").html('<iframe src="' + proj.get('url') + '" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="100%" scrolling="auto"><a href="' + proj.get('url') + '">' + proj.get('url') + '</a></iframe>');
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});
