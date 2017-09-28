chrome.storage.local.get("toolboxSwitch", function (result) {
    if(result.toolboxSwitch == true) run();
});

function run(){	
        
    function createTextBox(id, cn, value){
        var t = document.createElement("input");
        t.id = id;
        t.className = cn;
        t.type = "text";
        return t;
    }

    function createButton(id, cn, value){
        var b = document.createElement("input");
        b.id = id;
        b.className = cn;
        b.type = "button";
        b.value = value;
        return b;
    }

    function createSelect(id, cn, optionsArray){
        var sel = document.createElement("select");
        sel.id = id;
        sel.className = cn;
        for(var i = 0; i < optionsArray.length; i++){
            var op = document.createElement("option");
            op.value = optionsArray[i];
            op.text = optionsArray[i];
            sel.appendChild(op);
        }
        return sel;
    }

    //create the background znode div for the toolbox
    var zToolbox = document.createElement('div');
    zToolbox.setAttribute ('id', 'myZToolbox');
    zToolbox.className = "md_card";
    document.body.appendChild(zToolbox);

    var myClose = document.createElement("span");
    myClose.id = "myClose";
    myClose.innerHTML = "x";
    myClose.onclick = function(){
    zToolbox.appendChild(myClose);
        zToolbox.style.display = 'none';
    };
    zToolbox.appendChild(myClose);

    var targetTypeArray = ["className", "id"];
    var selectTargetType = createSelect("targetTypeSelect", "select", targetTypeArray);
    zToolbox.appendChild(selectTargetType);

    var actionArray = ["click", "innerHTML"];
    var selectAction = createSelect("actionSelect", "select", actionArray);
    zToolbox.appendChild(selectAction);



    //this button will be the main click for any action selected
    var mainClick = createButton("clickButton","button", "click");
    zToolbox.appendChild(mainClick);
    mainClick.onclick = function(){
        var textBoxString = textBox.value;
        var element;
        if(textBoxString.length > 0){
            chrome.storage.local.set({"toolbox": textBoxString});
            switch(selectTargetType.selectedIndex){
                case 0: element = document.getElementsByClassName(textBoxString)[0]; break;
                case 1: element = document.getElementById(textBoxString); break;
            }
            if(element != undefined){
                switch(actionSelect.selectedIndex){
                    case 0: 
                        element.click(); 
                        console.log("elm targeted was clicked");
                        alert("click"); 
                        break;
                    case 1: 
                        console.log(element.innerHTML);
                        alert(element.innerHTML);
                        break;
                }
            }else{
                console.log("elm targeted undefined!");   
            }
        }
    }

    function actionClick(element){ 
            
    }



    //this text box will take any string inputed and test it. it will also save its value in storage
    var textBox = createTextBox("textBox", "textBox", "Test strings here.")
    zToolbox.appendChild(textBox);

    //loads in last text box click from storage
    chrome.storage.local.get("toolbox", function(result){
        if(result.toolbox != undefined){
            textBox.value = result.toolbox;
        }
    });
}