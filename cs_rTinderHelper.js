(function() {
    'use strict';	

	console.log('Display information in the console log!');
	chrome.storage.local.get("rTinderHelperSwitch", function (result) {
		if(result.rTinderHelperSwitch == true) run();
	});

	function run(){	 
        var oldSource; //global variable to hold previous advertiser link

		//Extension interface
		var zNode = document.createElement('div');
		zNode.setAttribute ('id', 'myContainer');
		zNode.className = "md_card";
		document.body.appendChild(zNode);

		var titleBar = document.createElement('div');
		titleBar.id = "titleBar";
		zNode.appendChild(titleBar);
		
		var title = document.createElement('H2');
		title.id = "title";
		var titleText = document.createTextNode("rTinderHelper");
		title.appendChild(titleText);
		titleBar.appendChild(title);

        var b_regionPage = createButton("b_regionPage","myButton","Region page");
        var b_cJudge = createButton("b_cJudge","myButton","Can't Judge");
        var b_itemPage = createButton("b_itemPage","myButton","Item Page");
        zNode.appendChild(b_regionPage);
        zNode.appendChild(b_cJudge);
        zNode.appendChild(b_itemPage);

        b_regionPage.onclick = function(){ //Extension interface button
            var buttonArray = [1,0,0];
            chrome.storage.local.set({"buttonArray": buttonArray});                           
            close();
        };
        b_cJudge.onclick = function(){ //Extension interface button
            var buttonArray = [0,1,0];
            chrome.storage.local.set({"buttonArray": buttonArray});
            close();                            
        };
        b_itemPage.onclick = function(){ //Extension interface button
            var buttonArray = [0,0,1];
            chrome.storage.local.set({"buttonArray": buttonArray});
            close();                                       
        };
        function createButton(id, cn, value){
            var b = document.createElement("input");
            b.id = id;
            b.className = cn;
            b.type = "button";
            b.value = value;
            return b;
        }

        //rTinder buttons
        var cJudge = document.getElementsByClassName("btn-warning")[0]; 
        cJudge.onclick = function(){
            loop();
        };
        var regionPage = document.getElementsByClassName("btn-danger")[0];
        regionPage.onclick = function(){
            loop();
        };
        var itemPage = document.getElementsByClassName("btn-success")[0];
        itemPage.onclick = function(){
            loop();
        };
        //var openTab = document.getElementsByClassName("btn-warning")[1];

        //Should be initialized after zNode. Hides extension on rTinder and sets up a button loop.
        if(window.location == "http://rtinder.trivago.mpl/"){
            zNode.style.display = "none";
            buttonLoop();
        }
        
        //Waits for advertiser urls and stops redirects
        loop();
        
        function loop(){
            var lDiv = document.getElementsByClassName("landing_page")[0];
            //Waits for advertiser url to be fetched
            if(lDiv){
                var iFrame = document.getElementsByClassName("lp_display")[0];
                var source = iFrame.src;
                if(source != oldSource && source != "about:blank"){
                    oldSource = document.getElementsByClassName("lp_display")[0].src;
                    console.log(source);
                    window.onbeforeunload = function(){
                        return false;
                    };
                    window.open(source);
                    iFrame.stop(); //this may not be necessary, or could be harmful to current rTinder
                    return;
                }
            }
            setTimeout(loop, 1000);
        }

        function buttonLoop(){
            chrome.storage.local.get("buttonArray", function(result){
                var buttonArray = result.buttonArray;
                if(buttonArray != undefined){
                    for(var i = 0; i < buttonArray.length; i++){
                        if(buttonArray[i] == 1){
                            console.log("regionPage " + buttonArray[0]);
                            console.log("can't judge " + buttonArray[1]);
                            console.log("itemPage " + buttonArray[2]);
                            buttonArray[i] = 0;
                            chrome.storage.local.set({"buttonArray": buttonArray})        
                            switch(i){
                                case 0: regionPage.click(); break;
                                case 1: cJudge.click();  break;
                                case 2: itemPage.click(); break;
                            }                          
                        }
                    }
                }else{
                    buttonArray = [0,0,0];
                    chrome.storage.local.set({"buttonArray": buttonArray})
                }
            });
            setTimeout(buttonLoop, 500); //TODO check and reduce timeout to 0
        }
    }
})();