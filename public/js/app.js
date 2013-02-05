(function ($){
  
    var books  = [
    {
        title:"JS the good parts",
        author:"john Doe",
        releaseDate:"2011",
        keywords:"Javascripts"
    },

    {
        title:"JS the good parts",
        author:"john Doe",
        releaseDate:"2011",
        keywords:"Javascripts"
    },

    {
        title:"JS the good parts",
        author:"john Doe",
        releaseDate:"2011",
        keywords:"Javascripts"
    },

    {
        title:"JS the good parts",
        author:"john Doe",
        releaseDate:"2011",
        keywords:"Javascripts"
    },

    {
        title:"JS the good parts",
        author:"john Doe",
        releaseDate:"2011",
        keywords:"Javascripts"
    }
    ];

    var Book = Backbone.Model.extend({
        defaults:{
            coverImage: "http://dummyimage.com/120X180/000/fff&text=Book",
            title: "No Title",
            Author: "Unknown",
            releaseDate: "Unknown",
            keywords: "None"
        }
    });
   
    var BookView = Backbone.View.extend({
        tagName: "div",
        className: "bookContainer",
        template: $("#bookTemplate").html(),
        events:{
          "click .delete":"deleteBook"  
        },
        render: function(){
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        },
        deleteBook: function(){
            this.model.destroy();
            this.remove();
        }
        
    });
    
    var Library = Backbone.Collection.extend({
        model:Book
    });
    
    var LibraryView = Backbone.View.extend({
        el:$("#books"),
        events:{
            "click #add" : "addBook"  
        },
        initialize: function(){
            this.collection = new Library(books);
            this.render();
            
            this.collection.on("add", this.renderBook, this);
            this.collection.on("remove",this.removeBook, this);
        },
        render: function(){
            var that = this;
            _.each(this.collection.models, function(item){
                that.renderBook(item);
            }, this);
        },
        addBook: function(e){
            e.preventDefault();
            var formData = {};
          
            $("#addBook div").children("input").each(function(i, el){
                if($(el).val() !== ""){
                formData[el.id] = $(el).val(); 
                }
            });
            
            books.push(formData);
          
            this.collection.add(new Book(formData));
          
        },
        removeBook: function(){
          var removedBookData = removedBook.attributes;  
          
          _.each(removedBookData, function(val, key){
              if(removedBookData[key] === removedBook.defaults[key]){
                  delete removedBookData[key];
              }
          });
          
          _.each(books, function(book){
              if(_.isEqual(book, removedBookData)){
                  books.splice(_.indexOf(books, book), 1);
              }
          })
        },
        renderBook: function(item){
            var bookView = new BookView({
                model:item
            });
            this.$el.append(bookView.render().el);
        }
    });
    
    var libraryView = new LibraryView();
    
})(jQuery);