var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config');

const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key='+config.apiKey;
const imageBaseUrl = 'http://image.tmdb.org/t/p';	

/* GET home page. */
router.get('/', function(req, res, next) {

	request.get(nowPlayingUrl,(error,response,movieData)=>{
		var movieData = JSON.parse(movieData);
  		res.render('index', { 
  			movieData: movieData.results,
  			imageBaseUrl : `${imageBaseUrl}/w300`,
  			title: 'Welcome to the Thunderdome. These are Now in Theaters'
  		});
	});

});

router.get('/movie/:id',(req,res)=>{
	var thisMovieId = req.params.id
	var thisMovieUrl = `${apiBaseUrl}/movie/${thisMovieId}?api_key=${config.apiKey}`;	
	request.get(thisMovieUrl, (error,response,movieData)=>{
		var movieData = JSON.parse(movieData);
		res.render('singleMovie',{
			movieData: movieData,
			imageBaseUrl: `${imageBaseUrl}/w600`,
		})
	});
});

router.post('/search',(req,res)=>{
	var termUserSearchedFor = req.body.searchString;
	var searchUrl = apiBaseUrl + '/search/movie?query='+termUserSearchedFor+'&api_key='+config.apiKey;
	request.get(searchUrl, (error,response,movieData)=>{
		var movieData = JSON.parse(movieData);
		res.render('index',{
			movieData: movieData.results,
			imageBaseUrl: `${imageBaseUrl}/w300`,
			title: `Ooo. Look at all the ${termUserSearchedFor} ...`
		})
	})
});

module.exports = router;
