document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) { 
        var clickedEl = event.target;
		var elItem = findAncestor(clickedEl, "item-order__list-item");
		chrome.runtime.sendMessage({ debuggerURL: createURL(elItem.getAttribute('data-item'))});
    }
}, true);

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

var locale = 'de';
var from;
var to;
var path;
var room = '';
var formatFrom;
var formatTo;

function createURL(itemid){
	var u = document.URL;
	var usplitted = u.substring(u.lastIndexOf('?') + 1, u.length);
	var params = usplitted.split('&');
	loadParam(params);
	locale = u.substring(u.indexOf('trivago.')+8, u.lastIndexOf('/'));
	var localeCode = document.getElementsByName("trv-localization")[0].getAttribute("data-locale");
	var languageCode = document.getElementsByName("trv-localization")[0].getAttribute("data-lang");
	return '&localeCode=' + localeCode + '&languageCode=' +
	languageCode + '&categoryId=&itemId=' + itemid + '&arrivalDay=' +
	formatFrom + '&departureDay=' +  formatTo + room + '&i2p=&pathId=' + path;
}

function loadParam(params){
	for (var i = 0; i < params.length; i++) {
		var paramdetail = params[i].split('=');
		if (paramdetail[0] == 'iPathId') {
			path = paramdetail[1];
		} else if (paramdetail[0] == 'iRoomType') {
			var roomType = paramdetail[1];

			if(roomType == 7){
				room = '&room=2';
			}
			else if(roomType == 1){
				room = '&room=1';
			}

		} else if (paramdetail[0].startsWith('aDateRange') && paramdetail[0].indexOf("arr") != -1) {
			from = paramdetail[1].split('-');
			formatFrom = from[2] + '-' + from[1] + '-' + from[0];
		} else if (paramdetail[0].startsWith('aDateRange') && paramdetail[0].indexOf("dep") != -1) {
			to = paramdetail[1].split('-');
			formatTo = to[2] + '-' + to[1] + '-' + to[0];
		}
		else if(paramdetail[0].startsWith('aRooms')){
			room = room + '&room=' + paramdetail[1];
		}
	}
}


