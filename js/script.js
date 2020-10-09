var points = 0;
var progressBar = 0;
var autoClickBonus = 0;
var i = 0;
var c = 0;

var upgrade = {
    price: 10,
    exponent:1.1,
    amount:0,
    id:"upgrade1Display",
    priceId:"upgrade-price"
};

var clickUpgrade = {
    price: 500,
    exponent: 1.95,
    amount: 0,
    id:"upgradeClickDisplay",
    priceId:"clickUpgrade-price"
};

var cl500 = {
    price: 500,
    exponent: 1.1,
    amount: 0,
    id:"cl500Display",
    priceId:"cl500-price"
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function initiateSite(){

    points = parseFloat(getCookie("score1"));
    if(isNaN(points)){
        points = 0;
    }
    upgrade.amount = parseFloat(getCookie("upgrade1"));
    if(isNaN(upgrade.amount)){
        upgrade.amount = 0;
    }
    cl500.amount = parseFloat(getCookie("cl5001"));
    if(isNaN(cl500.amount)){
        cl500.amount = 0;
    }
    
    clickUpgrade.amount = parseFloat(getCookie("clickUpgrade1"));
    if(isNaN(clickUpgrade.amount)){
        clickUpgrade.amount = 0;
    }
    document.getElementById(clickUpgrade.id).innerHTML = clickUpgrade.amount;
    document.getElementById(upgrade.id).innerHTML = upgrade.amount;
    document.getElementById(cl500.id).innerHTML = cl500.amount;
    updateScore();
    displayPrice(clickUpgrade, calculatePrice(clickUpgrade));
    displayPrice(upgrade, calculatePrice(upgrade));
    displayPrice(cl500, calculatePrice(cl500));
}

function calculatePrice(chosenUpgrade){
    if(chosenUpgrade.amount == 0){                  //First purchase is always the base price of the ugprade
        newPrice = Number(chosenUpgrade.price);
    }else{
        newPrice = Number(Number(chosenUpgrade.price) * Number(chosenUpgrade.exponent) **  (Number(chosenUpgrade.amount)));
    }

    newPrice = Math.round(newPrice * 10) / 10
    //window.alert("New Price is: "+newPrice +  " of " + chosenUpgrade.id);
    return newPrice;
}

function displayPrice(chosenUpgrade, newPrice){
    //window.alert("New Price is: "+newPrice +  " of " + chosenUpgrade.id);
    document.getElementById(chosenUpgrade.priceId).innerHTML = newPrice;
}

function updateScore(){
    points = Math.round(points * 10) / 10
    document.getElementById("pointAmount").innerHTML = numberWithCommas(points) + " Hiebe";
}

function manualClick(){
    clickValue = 2**Number(clickUpgrade.amount);
    points = points + clickValue;
    updateScore();
    setCookie("score", points, 100);
}


function getManualClick(){
    if(clickUpgrade.amount != 0){
        clickValue = 2**Number(clickUpgrade.amount);
        return clickValue;
    }else{
        return 1;
    }
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
    uclick = cl500.amount * 20;
    return uclick;
}

function autoClick(){
    amount = calculateClicks();
    points = points + amount;
    updateScore();
}

function playSound(){
    new Audio("styles/audio/schwan.mp3").play();
}

function purchaseUpgrade(chosenUpgrade){            //Purchase the given upgrade

    newPrice = calculatePrice(chosenUpgrade);
    if(points >= newPrice){
        points = points - newPrice;
        updateScore();
        chosenUpgrade.amount = chosenUpgrade.amount + 1;
    }
    document.getElementById(chosenUpgrade.id).innerHTML = chosenUpgrade.amount;
    displayPrice(chosenUpgrade, calculatePrice(chosenUpgrade));
}

function updateProgressBar(){

    if(progressBar>=100){
        progressBar = 0;
    }
}

function calculateAutoClicks(){ 
    if(upgrade.amount != 0){
        value = parseFloat((upgrade.amount) / 10);              //Every 10 second one click, means, 1 upgrade means 0.1 per second
        tempDec = value - Math.floor(value);
        tempDec = tempDec.toFixed(1);
        value = value + autoClickBonus;
        value = value.toFixed(1);
        
        if(value >= 1){  
            //window.alert(value); 
            decimal = value - Math.floor(value);
            decimal.toFixed(1);
            autoClickBonus = decimal;
            //window.alert("Value=" + Math.trunc(value) * getManualClick());
            return (Math.trunc(value) * getManualClick());   
        }else{
            
            decimal = value - Math.floor(value);
            decimal.toFixed(1);
            //window.alert("Decimal=" + decimal);
            autoClickBonus = decimal;
            return 0;
        }
    }else{
        return 0;
    }

    
}

window.setInterval(function(){
    points = points + calculateAutoClicks();
    updateScore();
}, 1000);


window.setInterval(function(){
    autoClick();
},1000);


window.setInterval(function(){
    
    setCookie("score1", parseFloat(points), 100);
    setCookie("upgrade1", parseFloat(upgrade.amount), 100);
    setCookie("clickUpgrade1", parseFloat(clickUpgrade.amount), 100);
    setCookie("cl5001", parseFloat(cl500.amount),100);
    
    
}, 3000);

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}