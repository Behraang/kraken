document.onkeydown = checkKey;
var ball = document.getElementById("ball");
var ballStartCoords = getCoords(ball);

function getCoords(element) {
    var top = 11, left = 7;
    return {
        top: top,
        left: left
    };
};

function checkKey(e) {

    e = e || window.event;
    var distance = 12;
    if (e.keyCode == '38') {
        ballStartCoords.top = ballStartCoords.top - distance;
        ball.style.top  = ballStartCoords.top  + "px";
        // up arrow
    }
    else if (e.keyCode == '40') {
        ballStartCoords.top = ballStartCoords.top + distance;
        ball.style.top  = ballStartCoords.top  + "px";
        // down arrow
    }
    else if (e.keyCode == '37') {
        ballStartCoords.left = ballStartCoords.left - distance;
        ball.style.left  = ballStartCoords.left  + "px";        
       // left arrow
    }
    else if (e.keyCode == '39') {
        ballStartCoords.left = ballStartCoords.left + distance;
        ball.style.left  = ballStartCoords.left  + "px";
       // right arrow
    }

}