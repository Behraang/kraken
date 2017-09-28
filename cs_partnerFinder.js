(function() {
	'use strict';	
	console.log('Display information in the console log!');
	chrome.storage.local.get("partnerFinderSwitch", function (result) {
		if(result.partnerFinderSwitch == true) run();
	});

	function run(){	
		// Variables	
		var loopDelay = 0;
		var msgDisplay = 0;
		var itemArrayTracker = [];
		var partnerName;
		var partnerNameLength;
		var dots = ".";
	
		//Tool's main div
		var zNode = document.createElement('div');
		zNode.setAttribute ('id', 'myContainer');
		zNode.className = "md_card";
		
		document.body.appendChild(zNode);
		
		// Create and append text input to zNode
		var myTextBox = document.createElement("input");
		myTextBox.id = "myTxtBox";
		myTextBox.type = "text";
		zNode.appendChild(myTextBox);
		chrome.storage.local.get("currentSearch", function (result) {
			if(result.currentSearch == undefined){
				//alert('undefined');
			}else{
				var currentSearch = result.currentSearch;
				//alert(currentSearch[0] + " " + currentSearch[1]);
				var s = currentSearch[0].split("[");
				myTextBox.value = s[0];				
			}
		});
		
		// Create and append search button to zNode
		var mySearch = document.createElement("input");
		mySearch.id = "mySearch";
		mySearch.type = "button";
		mySearch.value = "search";
		mySearch.onclick = function(){
			if(document.readyState === 'ready' || document.readyState === 'complete'){
				partnerName = myTextBox.value; //gets partnerName from textbox value
				partnerName = partnerName.replace(/\s/g, ''); //removes spacing in partner name (global value)
				partnerName = partnerName.toUpperCase(); //changes all characters in partner name to upper case
				partnerNameLength = partnerName.length; //gets partner name length for substring matching (global value)
				//TODO disable textbox on active search
				loadLoop();
			}else{
				loadDiv.innerHTML = "Wait for page to load.";
			}
		};
		zNode.appendChild(mySearch);

		// Create and append close box to zNode
		var myClose = document.createElement("span");
		myClose.id = "myClose";
		myClose.innerHTML = "x";
		myClose.onclick = function(){
			zNode.style.display = 'none';
		};
		zNode.appendChild(myClose);

		// Create div to show loop status
		var loadDiv = document.createElement('div');
		loadDiv.id = "myMessage";
		zNode.appendChild(loadDiv);

		function loadLoop(){
			msgDisplay++; 
			message("Running")
			if(window.innerWidth < 720) var mobile = true;
			var itemList = document.getElementById("js_itemlist");
			if(!checkValue(itemList, "Loading item list")) return;
			var itemArray = getItemArray(itemList);
			if(!checkValue(itemArray, "Loading items"))return;
			
			//create and maintain itemArrayTracker
			for(var i = 0; i < itemArray.length; i++){
				var itemMatched = false;
				var name = itemArray[i].getElementsByClassName("name__copytext")[0].innerHTML;
				for(var j = 0; j < itemArrayTracker.length; j++){
					if(itemArrayTracker[j].itemName == name){
						itemMatched = true;
					}
				}
				if(!itemMatched){
					itemArrayTracker.push({
						itemName: name, 
						partnerFound: false,
						itemExpanded: false,
						mobileTab: false,
						itemLevelDiv: ""
					});

				}
			}
			console.log(itemArrayTracker.length);
			console.log(itemArrayTracker[0].itemName);

			//conduct search
			for(var i = 0; i < itemArray.length; i++){
				var currentItem = itemArray[i];
				var name = currentItem.getElementsByClassName("name__copytext")[0].innerHTML;
				var mIndex;	//matchedIndex
				for(var j = 0; j < itemArrayTracker.length; j++){
					if(itemArrayTracker[j].itemName == name){
						mIndex = j;
					}
				}
				if(!itemArrayTracker[mIndex].itemExpanded){
					if(mobile){
						currentItem.getElementsByClassName("name__copytext m-0 item__slideout-toggle")[0].click();
					}else{
						currentItem.getElementsByClassName("deal-other__more btn--reset item__slideout-toggle")[0].click();
					}
					itemArrayTracker[mIndex].itemExpanded = true;
				}
				if(mobile){
					var tabs = currentItem.getElementsByClassName("tabs__item");
					if(!itemArrayTracker[mIndex].mobileTab && tabs[3] != undefined){
						if(tabs[3].className != "tabs__item tabs__item--active"){
							tabs[3].getElementsByClassName("tabs__label")[0].click();
						}
						itemArrayTracker[mIndex].mobileTab = true;					
					}
				}
				var nl_partnerDiv = currentItem.getElementsByClassName("sl-deal js_co_deal js_co_link js_co_ctx-menu");
				if(!itemArrayTracker[mIndex].partnerFound && nl_partnerDiv != undefined){
					for(var y = 0; y < nl_partnerDiv.length; y++){
						var nl_images = nl_partnerDiv[y].getElementsByClassName("sl-deal__logo-name");
						if(nl_images == undefined){
						}
						var price = nl_partnerDiv[y].getElementsByClassName("sl-deal__btn-lbl sl-deal__btn-lbl--size-default")[0].innerText;
						var imageText = nl_images[0].innerText; // partner string
						imageText = imageText.replace(/\s/g, ''); // removes space
						imageText = imageText.substring(0,partnerNameLength).toUpperCase(); // characters to uppercase
						if(imageText == partnerName && price.length !== 0){
							itemArrayTracker[mIndex].partnerName = partnerName;
							itemArrayTracker[mIndex].partnerFound = true; //global variable
							itemArrayTracker[mIndex].itemLevelDiv = nl_partnerDiv[y];
						}
					}
				}
			}
			var height = 58;
			var width = 0;
			for(var i = 0; i < itemArray.length; i++){
				if(itemArrayTracker[i].partnerFound == true){
					var nl_images = itemArrayTracker[i].itemLevelDiv.getElementsByClassName("sl-deal__logo-name");
					var imageText = nl_images[0].innerText; // partner string
					imageText = imageText.replace(/\s/g, ''); // removes space
					imageText = imageText.substring(0,partnerNameLength).toUpperCase();
					if(itemArrayTracker[i].partnerName == imageText){
						loadDiv.appendChild(itemArrayTracker[i].itemLevelDiv); //move item to zNode
						height = height + itemArrayTracker[i].itemLevelDiv.clientHeight;
						if(itemArrayTracker[i].itemLevelDiv.clientWidth > width){
							width = itemArrayTracker[i].itemLevelDiv.clientWidth;
							zNode.style.width = width + "px";
						}
						zNode.style.height = height + "px";
						zNode.style.opacity = 1;
					}else{
						itemArrayTracker[i].partnerFound = false; 
					}
				}
			}

			console.log("loop reached bottom");			
			setTimeout(loadLoop, loopDelay);		
			/*
				if(!dummyLoaderComplete(currentItem)) return;
				if(!expandItemLevel(currentItem)) return;
			*/
		}
	

		function checkValue(value, string){
			console.log("s_checkValue: " + string);
			if(value === undefined){
				setTimeout(loadLoop, loopDelay);
				return false;
			}
			return true;
		}
 

		function message(msg){
			switch(msgDisplay){
				case 0: dots = " "; break;
				case 1: dots = "."; break;
				case 2: dots = ".."; break;
				case 3:
					dots = "...";
					msgDisplay = 0;
					break;
			}
			loadDiv.innerText = msg + dots;
		}


		function getItemArray(itemList){
			var nl_items = itemList.children;
			//there is sometimes a phantom divider that need to be removed from item list
			var phantomRemoval = 0;
			var itemArray = [];
			for(var i = 0; i < nl_items.length; i++){
				if(!hasPhantomClass(nl_items[i], "item-order__list-item js_phantom_pain")){
					itemArray[i - phantomRemoval] = nl_items[i];
				}else{
					phantomRemoval++;
				}
			}
			return itemArray;
		}
		//called by getItemArray()
		function hasPhantomClass(element, cls) {
			return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
		}



		function dummyLoaderComplete(cItem){
			var nl_dummies = cItem.getElementsByClassName("dummy-loader");
			message("Waiting for item level to load");
			if(nl_dummies.length === 0) return true;
			bool_itemLoad = false;
			setTimeout(loadLoop, loopDelay);
			return false;
		}

		
		function fullyExpandItemLevel(cItem){
			var nl_buttonsShowLess = cItem.getElementsByClassName("sl-box__arrow--expanded");
			var nl_buttonsShowMore = cItem.getElementsByClassName("sl-box__expand-btn");
			if(nl_buttonsShowLess.length === 0 && nl_buttonsShowMore.length > 0){
				bool_itemLoad = false;
				message('Expanding items');
				nl_buttonsShowMore[0].click();
			}
			if(!bool_itemLoad){
				timer_startItemLoad = new Date();
				bool_itemLoad = true;
			}
			var endTime = new Date();
			if((endTime - timer_startItemLoad) > loadTimer){
				return true;
			}
			setTimeout(loadLoop, loopDelay);
			return false;
		}			
	}
})();

