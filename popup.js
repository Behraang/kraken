
function partnerFinderSwitch() {
		chrome.storage.local.set({"partnerFinderSwitch": checkboxPF.checked});  
		  //pop-up execute script example
		  /*chrome.tabs.executeScript({
			file: 'trv2Debugger.js'
		  }); */
}

function rogerBoxSwitch() {
   		chrome.storage.local.set({"rogerBoxSwitch": checkboxRB.checked});
}


function rTinderHelperSwitch() {
	chrome.storage.local.set({"rTinderHelperSwitch": checkboxTH.checked});
}


var checkboxPF = document.getElementById('partnerFinderSwitch');
checkboxPF.addEventListener('click', partnerFinderSwitch);
chrome.storage.local.get('partnerFinderSwitch', function (result) {
		checkboxPF.checked = result.partnerFinderSwitch;				
});


var checkboxRB = document.getElementById('rogerBoxSwitch');
checkboxRB.addEventListener('click', rogerBoxSwitch);
chrome.storage.local.get('rogerBoxSwitch', function (result) {
		checkboxRB.checked = result.rogerBoxSwitch;		
});

var checkboxTH = document.getElementById('rTinderHelperSwitch');
checkboxTH.addEventListener('click', rTinderHelperSwitch);
chrome.storage.local.get('rTinderHelperSwitch', function (result) {
	checkboxTH.checked = result.rTinderHelperSwitch;		
});