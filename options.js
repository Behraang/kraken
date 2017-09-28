var test1 = document.getElementById('test1');
test1.onclick = function() {
	var img = document.getElementById('testImg');
	img.style.visibility = 'visible';
	img.style.display = 'block';
}

function toolboxSwitch() {
	chrome.storage.local.set({"toolboxSwitch": checkboxTB.checked});
}

var checkboxTB = document.getElementById('toolboxSwitch');
checkboxTB.addEventListener('click', toolboxSwitch);
chrome.storage.local.get('toolboxSwitch', function (result) {
	checkboxTB.checked = result.toolboxSwitch;				
});