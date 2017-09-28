var requestedQuery;

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "all";
  var title = "Debugger Link";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});  
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);
// The onClicked callback function.
function onClickHandler(info, tab) {
	//checks that trv2Degger message was received successfully.
	if(requestedQuery === undefined){
		alert("Select an item by right-clicking it on the platform.");
		return;
	}
	var partner = prompt("Partner ID","");
	if (partner === null) {
		requestedQuery = undefined;
		return; //break out of the function early
	}
	var url = 'http://javadebugger.trivago.trv:8383/index.html?environment=live&partnerId=' + 
	partner  + requestedQuery;
	requestedQuery = undefined;
	window.open(url, '_blank');
};

// listens for a message from trv2Debugger content script.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.debuggerURL !== null){
		requestedQuery = request.debuggerURL;
	}
  });


  