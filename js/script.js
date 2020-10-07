var points = 0;

function initiateSite(){
    points = document.cookie;
}

function manualClick(clickValue){
    points = points + clickValue;
    document.getElementById("pointAmount").innerHTML = points + " Cookies"
}

