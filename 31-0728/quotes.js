

var DB = require("./db.js");
var json = require("../quotes.json");



exports.getElementByIndexElseRandom = function getElementByIndexElseRandom(array , index)
{
	var result = 0 ;

	if(index === undefined)
		result = Math.floor((Math.random() * array.length));	

	else 
		result = index;

	return array[result];
}



exports.getQuotesFromJSON = function getQuotesFromJSON()
{
	return json;
}



exports.getQuoteFromJSON = function getQuoteFromJSON(index)
{
	var jsonArray = getQuotesFromJSON();

	var quote = getElementByIndexElseRandom(jsonArray , index);

	return quote;
}



exports.seed = function seed(callback)
{	
	var json = getQuotesFromJSON();

	DB.db().collection("quotes").insert(json);

	callback(null , true);
}



exports.getQuotesFromDB = function getQuotesFromDB (callback)
{
	DB.db().collection("quotes").find().toArray(function(err , result){

		if(err)
			callback(err , null);
		else
			callback(null , result);
	});
}



exports.getQuoteFromDB = function getQuoteFromDB(callback , index)
{
	var quote;
	DB.db().collectoin("quotes").find().toArray(function(err , result){

		if(err)
			callback(err , null)
		else
		{
			quote = getElementByIndexElseRandom(result , index);
			callback(null , quote);
		}
	});
} 