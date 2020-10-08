var points = 0;

var upgrade = {
    price:25,
    exponent:1.3,
    amount:0,
    id:"upgrade1display",
    priceId:"upgrade-price"
};

var clickUpgrade = {
    price: 500,
    exponent: 1.95,
    amount: 0,
    id:"upgradeClickDisplay",
    priceId:"clickUpgrade-price"
};

function initiateSite(){
    points = parseFloat(getCookie("score"));
    if(isNaN(points)){
        points = 0;
    }
    upgrade.amount = parseFloat(getCookie("upgrade"));
    if(isNaN(upgrade.amount)){
        upgrade.amount = 0;
    }
    document.getElementById(upgrade.id).innerHTML = upgrade.amount;
    clickUpgrade.amount = parseFloat(getCookie("clickUpgrade"));
    if(isNaN(clickUpgrade.amount)){
        clickUpgrade.amount = 0;
    }
    document.getElementById(clickUpgrade.id).innerHTML = clickUpgrade.amount;
    updateScore();
    displayPrice(clickUpgrade, calculatePrice(clickUpgrade));
    displayPrice(upgrade, calculatePrice(upgrade));
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
    document.getElementById("pointAmount").innerHTML = points + " Hiebe";
}

function manualClick(){
    clickValue = 2**Number(clickUpgrade.amount);
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
    uclick = upgrade.amount;
    return uclick;
}

function autoClick(){
    amount = calculateClicks();
    points = points + amount;
    updateScore();
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



window.setInterval(function(){
    autoClick();
}, 1000);


window.setInterval(function(){
    
    setCookie("score", parseFloat(points), 100);
    setCookie("upgrade", parseFloat(upgrade.amount), 100);
    setCookie("clickUpgrade", parseFloat(clickUpgrade.amount), 100);
    
    
}, 3000);


