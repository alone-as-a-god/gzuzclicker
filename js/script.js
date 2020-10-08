var points = 0;
var upgrade = 1;

function initiateSite(){
    points = Number(getCookie("score"));
    document.getElementById("pointAmount").innerHTML = points + " Cookies";
}

function updateScore(){
    document.getElementById("pointAmount").innerHTML = points + " Cookies";
}

function manualClick(clickValue){
    points = points + clickValue;
    updateScore();
    setCookie("score", points, 100);
}

function setCookie(cname, cvalue, exdays){
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires"+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function calculateClicks(){
    uclick = upgrade * 1;
    return uclick;
}

function autoClick(){
    amount = calculateClicks();
    points = points + amount;
    updateScore();
}

window.setInterval(function(){
    autoClick();
}, 1000);

