$(document).ready(function(){
	
	var key = "api_key=2c8a02fa36fb5299dcd97bbc84609899";

	$("#send-quote").click(function(){

		
		$.ajax({
		    beforeSend: function(request) {
		        request.setRequestHeader('X-Mashape-Key','TlvNc1hxCImsh9BoP55V4UZOdXWxp1JnqhGjsntAL2dPQ9EJtH');
		    },
		    dataType: "json",
		    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies',
		    success: function(data) {
		    	
		        quote = data.quote;
		        author = data.author;
		        var html = "<h3>"+author+"</h3><br><br>"+"<p>"+quote+"</p>";
		        
		     $('.quote').html(html);
		    },
		    error: function(err) { console.log(err); }
		}).done(function(){
			
			$.ajax({
			    dataType: "json",
			    url: "https://api.themoviedb.org/3/search/movie?" + key + "&query="+encodeURIComponent(author),
			    success: function(movies) {
			    	
			        movies = movies.results.filter(function(movie){
						return movie.original_title.toLowerCase() == author.toLowerCase();
					});
					
					console.log(movies);
	
					$('.img-thumbnail').removeClass("invisible").attr('src', 'https://image.tmdb.org/t/p/w500' + movies[0].poster_path);
					
					console.log($('.img-thumbnail'));
			    },
			    error: function(err) { console.log(err); }
			})	
			
		});
	});
	
	$("#tweet").click(function(){

		var twtLink = 'https://twitter.com/home?status=' +encodeURIComponent(quote);
		if(quote.length < 140){
			window.open(twtLink,'_blank');
		} else alert ("The message is too long");
	});
});
