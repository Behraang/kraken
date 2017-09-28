
chrome.omnibox.setDefaultSuggestion({
	description: 'Type: Partner Name, Partner Id, Locale'
});
  
// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(function(text) {
	navigate("https://" + text);
});
	
chrome.omnibox.onInputChanged.addListener(
	function(text, suggest) {
	var localeURL = "knowledge.trivago.com/display/MD/Locale+Overview";
	
	text = text.replace(/\s/g, ''); //removes spaces from search text
	text = text.toUpperCase(); //capitalizes search text
	var i = text.length; //checks length for substring match prep
	if(text.length > 0){
		var letters = false;
		if (text.match(/[a-z]/i)) { //checks if string has letters
			var letters = true;
		}
		var maxSuggestions = 5; //prevents too many queries
		var currentSuggestions = 0;
		if(letters){ //text has letters
			if(text.length ==2){
				for(var x = 0; x < sd_locales.length; x++){ //locals first
					if(text === sd_locales[x].locale){
						var sDescription = sd_locales[x].locale + ": " + 
							sd_locales[x].domain + "; " +
							sd_locales[x].price_model + "; " +
							sd_locales[x].language_type + "; " +
							sd_locales[x].accepted_language_1 + sd_locales[x].accepted_language_2 + "; " +
							sd_locales[x].accepted_currency;
						suggest([{content: localeURL, description: sDescription}]);
						return; //exits search if locale matched (prevents clutter)
					}
				}
			} //sd_advertisers[x].advertiser_name,sd_advertisers[x].advertiser_id
			for(var x = 0; x < sd_advertisers.length; x++){ //checks main partner array for partner name match
				if(text === sd_advertisers[x].advertiser_name.substring(0,i).toUpperCase()){
					suggest([{
						content: "admin.trivago.com/advertiser/advertiser/" + sd_advertisers[x].advertiser_id + "/buckets/", 
						description: sd_advertisers[x].advertiser_name + " - " + sd_advertisers[x].advertiser_id
					}]);
					currentSuggestions++;
					if(currentSuggestions == maxSuggestions) return;
				}	
			}						
		}else{ //text contains no letters (numbers)
			for(var x = 0; x < advertisersHack.length; x++){ //checks secondary partner array for partner name match
				if(text === advertisersHack[x][1].substring(0,i).toUpperCase()){
					suggest([{content: "admin.trivago.com/advertiser/advertiser/" + advertisersHack[x][1] + "/buckets/", description: advertisersHack[x][0]+ " - " + advertisersHack[x][1]}]);
					currentSuggestions++;
					if(currentSuggestions == maxSuggestions) return;
				}
			}			
			for(var x = 0; x < sd_advertisers.length; x++){ //checks main partner array for partner id match
				if(text === sd_advertisers[x].advertiser_id.substring(0,i).toUpperCase()){
					suggest([{
						content: "admin.trivago.com/advertiser/advertiser/" + sd_advertisers[x].advertiser_id + "/buckets/", 
						description: sd_advertisers[x].advertiser_id + " - " + sd_advertisers[x].advertiser_name
					}]);
					currentSuggestions++;
					if(currentSuggestions == maxSuggestions) return;
				}
			}			
		}			
	}
});

//TODO
function find(text, array) {
	// The variable results needs var in this case (without 'var' a global variable is created)
	var results = [];
	for (var i = 0; i < array.length; i++) {
	if (array[i].indexOf(key) == 0) {
		results.push(array[i]);
	}
	}
	return results;
}

function navigate(url) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.tabs.update(tabs[0].id, {url: url});
	});
}

  
chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "http://stackoverflow.com/";
  chrome.tabs.create({ url: newURL });
});

