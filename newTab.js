var array = [
    ["freedcamp","https://freedcamp.com/dashboard" ,"/img/newTab/freedcamp.png"],
    ["Schedule",  "https://teamup.com/ksceafcd8837a3f0be/", "/img/newTab/schedule.png"],
    ["Debugger", "http://javadebugger.trivago.trv/index.html", "/img/newTab/debugger.png"],
    ["Pit", "https://admin.trivago.com/advertiser/advertiser/0/dashboard/", "/img/newTab/pit.png"],
    ["Jira", "https://tasks.trivago.com/secure/Dashboard.jspa", "/img/newTab/jira.png"],
    ["Knowledge", "https://knowledge.trivago.com/", "/img/newTab/knowledge.png"],
    ["Google Survey", "https://docs.google.com/forms/d/e/1FAIpQLSfexWlYnCqKEzH85xtFTAQPxBUdobFgqxB4X1i3tI7aWKOGOg/viewform", "/img/newTab/survey.png"],
    ["rTinder","http://rtinder.trivago.mpl/","/img/newTab/rTinder.png"]
];

for(var i = 0; i < array.length; i++){
    autoCard(array[i][0], array[i][1], array[i][2]);
}

var fileInput = document.getElementById("inputFileToLoad");
fileInput.addEventListener('change', encodeImageFileAsURL, false);

var roundButton = document.getElementById("roundButton");
roundButton.addEventListener('click', function(){
	var addCard = document.getElementById("addCard");
	addCard.style.visibility = "visible";
});

var myClose = document.getElementById("myClose");
myClose.addEventListener("click", function(){
    addCard.style.visibility = "hidden";

});


function setCard(id, url){
	var card = document.getElementById(id);
	card.addEventListener("click", function(){
		location.href = url;
	});
}

var base64Img;
function encodeImageFileAsURL() {
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            base64Img = fileLoadedEvent.target.result; // <--- data: base64
            var newImage = document.createElement('img');
            newImage.src = base64Img;
            document.getElementById("imgHolder").innerHTML = newImage.outerHTML;
        }   
        fileReader.readAsDataURL(fileToLoad);
    }
}

var imgHolder = document.getElementById("imgHolder");

chrome.storage.local.get("customCards", function(result){
    var objectArray = result.customCards;
    if(objectArray !== undefined){
        for(var i = 0; i < objectArray.length; i++){
            card = autoCard(objectArray[i].description, objectArray[i].url, objectArray[i].img);
            card.id = objectArray[i].id;
            addDelete(card);
        }
    }
});

var createCardButton = document.getElementById("createCardButton");
createCardButton.addEventListener("click", function(){
    var addDescription = document.getElementById("addDescription");
    var addURL = document.getElementById("addURL");
    if(base64Img == null){
        alert("Please choose an image");
    }
    else if(addDescription.value.length == 0){
        alert("Please fill in the description.");
    }else if( addURL.value.length == 0){
        alert("Please fill in the URL.");        
    }else{
        chrome.storage.local.get("customCards", function(result){
            var objectArray;
            if(result.customCards == undefined){
                objectArray = [];
            }else{
                objectArray = result.customCards;
            }
            objectArray.push({id: objectArray.length, description: addDescription.value, url : addURL.value, img: base64Img});
            chrome.storage.local.set({"customCards": objectArray});        
            var card = autoCard(addDescription.value,addURL.value,base64Img);
            card.id = objectArray.length - 1;
            addDelete(card);
            addCard.style.visibility = "hidden";  
        }); 
    }
}); 

function addDelete(card){
    var deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "x";
    deleteButton.className = "deleteButton";
    deleteButton.addEventListener("click", function(){
        if(confirm("Delete")){
            card.style.display = "none";
            chrome.storage.local.get("customCards", function(result){
                var objectArray = result.customCards;
                var cardFound = false;
                for(var i = 0; i < objectArray.length; i++){                                     
                    if(objectArray[i].id == card.id && !cardFound){
                        objectArray.splice(i,1);
                        cardFound = true;
                    }
                    if(cardFound && objectArray[i] != undefined){
                        objectArray[i].id = objectArray[i].id -1; 
                    }
                }
                chrome.storage.local.set({"customCards": objectArray});
            });
        }
    });
    card.appendChild(deleteButton);
    card.onmouseover = function(){deleteButton.style.visibility = "visible";};
    card.onmouseout = function(){deleteButton.style.visibility = "hidden";};
    
}

function autoCard(desc, url, imgSrc){
    var card = document.createElement("div"); 
    card.className = "card md_card md_hoverCard";

    document.getElementById("container").appendChild(card);

    var content  = document.createElement("div");
    content.className = "content";
    content.addEventListener("click", function(){
		location.href = url;
    });
    card.appendChild(content);

    var img = document.createElement("img");
    img.src = imgSrc;
    content.appendChild(img);


    
    var description  = document.createElement("div");
    description.className = "description";
    description.addEventListener("click", function(){
		location.href = url;
	});
    card.appendChild(description);

    var p = document.createElement("p");
    description.appendChild(p);

    var textNode = document.createTextNode(desc);
    p.appendChild(textNode);
    return card;
} 

/*
	chrome.downloads.download({
	  url: "https://vignette4.wikia.nocookie.net/shakugan/images/0/0a/Kraken.jpg/revision/latest?cb=20120531060742",
	  //filename: "suggested/filename/with/relative.path" // Optional
    });

var a = document.getElementById("test1");
a.onclick = function() {
	readTextFile("test.txt");
};

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
*/